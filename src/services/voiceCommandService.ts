import { llmService } from './llmService';
import { apiKeyService } from './apiKeyService';

// Define command types for better type safety
export enum CommandType {
  // Student commands
  DOUBT_SOLVING = 'doubt_solving',
  START_QUIZ = 'start_quiz',
  SET_REMINDER = 'set_reminder',
  SEARCH_FORMULA = 'search_formula',
  PERFORMANCE_FEEDBACK = 'performance_feedback',
  
  // Teacher commands
  GENERATE_TEST = 'generate_test',
  CLASS_ANALYTICS = 'class_analytics',
  LESSON_PLAN = 'lesson_plan',
  REVISION_SHEET = 'revision_sheet',
  
  // Principal commands
  INSTITUTIONAL_REPORT = 'institutional_report',
  TEACHER_PERFORMANCE = 'teacher_performance',
  RESULT_COMPARISON = 'result_comparison',
  
  // Common commands
  HELP = 'help',
  UNKNOWN = 'unknown'
}

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  PRINCIPAL = 'principal'
}

export interface CommandResult {
  action: 'navigate' | 'display' | 'dialog' | 'download' | 'error';
  target?: string;
  params?: Record<string, any>;
  response: string;
  data?: any;
}

interface CommandProcessor {
  canProcess: (command: string) => boolean;
  process: (command: string, modelId: string) => Promise<CommandResult>;
}

/**
 * Voice command service with a scalable architecture.
 * Uses a command processor pattern to make it easy to add new commands.
 */
export const voiceCommandService = {
  /**
   * Process any voice command based on user role and command text
   */
  processCommand: async (command: string, role: UserRole, modelId: string): Promise<CommandResult> => {
    try {
      const commandType = voiceCommandService.determineCommandType(command, role);
      
      // Get the appropriate processor based on user role
      let processor: Record<string, CommandProcessor>;
      
      switch (role) {
        case UserRole.STUDENT:
          processor = studentCommandProcessors;
          break;
        case UserRole.TEACHER:
          processor = teacherCommandProcessors;
          break;
        case UserRole.PRINCIPAL:
          processor = principalCommandProcessors;
          break;
        default:
          processor = {};
      }
      
      // Find a processor that can handle this command
      for (const [key, proc] of Object.entries(processor)) {
        if (proc.canProcess(command)) {
          return await proc.process(command, modelId);
        }
      }
      
      // If no processor is found, use the fallback processor
      return await commonCommandProcessors.unknownCommand.process(command, modelId);
    } catch (error) {
      console.error('Error processing voice command:', error);
      return {
        action: 'error',
        response: "I encountered an issue processing your command. Please try again."
      };
    }
  },
  
  /**
   * Determine command type based on the command text and user role
   */
  determineCommandType: (command: string, role: UserRole): CommandType => {
    command = command.toLowerCase();
    
    // Help command is common to all roles
    if (command.includes('help') || command.includes('what can you do')) {
      return CommandType.HELP;
    }
    
    // Student commands
    if (role === UserRole.STUDENT) {
      if (command.includes('explain') || command.includes('what is') || command.includes('how to') || command.includes('solve'))
        return CommandType.DOUBT_SOLVING;
      if (command.includes('start quiz') || command.includes('practice') || command.includes('test me'))
        return CommandType.START_QUIZ;
      if (command.includes('remind') || command.includes('reminder') || command.includes('schedule'))
        return CommandType.SET_REMINDER;
      if (command.includes('formula') || command.includes('equation') || command.includes('find'))
        return CommandType.SEARCH_FORMULA;
      if (command.includes('score') || command.includes('how did i') || command.includes('performance') || command.includes('result'))
        return CommandType.PERFORMANCE_FEEDBACK;
    }
    
    // Teacher commands
    else if (role === UserRole.TEACHER) {
      if (command.includes('create') || command.includes('generate') || command.includes('make') && command.includes('test'))
        return CommandType.GENERATE_TEST;
      if (command.includes('weak') || command.includes('analytics') || command.includes('show') || command.includes('student performance'))
        return CommandType.CLASS_ANALYTICS;
      if (command.includes('lesson plan') || command.includes('teaching plan'))
        return CommandType.LESSON_PLAN;
      if (command.includes('revision') || command.includes('cheat sheet') || command.includes('formula sheet'))
        return CommandType.REVISION_SHEET;
    }
    
    // Principal commands
    else if (role === UserRole.PRINCIPAL) {
      if (command.includes('report') || command.includes('average') || command.includes('score'))
        return CommandType.INSTITUTIONAL_REPORT;
      if (command.includes('teacher') && (command.includes('performance') || command.includes('evaluation')))
        return CommandType.TEACHER_PERFORMANCE;
      if (command.includes('compare') || command.includes('comparison'))
        return CommandType.RESULT_COMPARISON;
    }
    
    return CommandType.UNKNOWN;
  }
};

/**
 * Command processors for student role
 */
const studentCommandProcessors: Record<string, CommandProcessor> = {
  // Doubt solving command processor
  doubtSolver: {
    canProcess: (command: string) => {
      return /explain|what is|how to|solve|doubt/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      const question = command.replace(/explain|what is|how to|solve|doubt/gi, '').trim();
      
      // For important subjects, extract subject area
      let subject = 'general';
      const subjectPatterns = [
        { pattern: /physics|mechanics|waves|optics|electricity|magnetism/i, value: 'physics' },
        { pattern: /chemistry|organic|inorganic|elements|compounds|reactions/i, value: 'chemistry' },
        { pattern: /math|algebra|calculus|geometry|trigonometry/i, value: 'mathematics' },
        { pattern: /biology|cell|organism|anatomy|physiology/i, value: 'biology' }
      ];
      
      for (const { pattern, value } of subjectPatterns) {
        if (pattern.test(command)) {
          subject = value;
          break;
        }
      }
      
      return {
        action: 'navigate',
        target: 'doubt-solver',
        params: {
          question,
          subject
        },
        response: `Let me help you understand ${question}. I'll look that up for you.`
      };
    }
  },
  
  // Quiz starter command processor
  quizStarter: {
    canProcess: (command: string) => {
      return /start quiz|practice|test me/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      let subject = 'general';
      let difficulty = 'medium';
      
      // Extract subject if mentioned
      const subjectMatches = command.match(/on\s+(\w+)/i);
      if (subjectMatches && subjectMatches[1]) {
        subject = subjectMatches[1].toLowerCase();
      }
      
      // Extract difficulty if mentioned
      if (/easy|simple|basic/i.test(command)) difficulty = 'easy';
      if (/hard|difficult|challenging/i.test(command)) difficulty = 'hard';
      
      return {
        action: 'navigate',
        target: 'quiz',
        params: {
          subject,
          difficulty
        },
        response: `Starting a ${difficulty} quiz on ${subject}. Good luck!`
      };
    }
  },
  
  // Other student command processors...
  formulaFinder: {
    canProcess: (command: string) => {
      return /formula|equation|find/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      const formulaQuery = command.replace(/formula|equation|find/gi, '').trim();
      
      return {
        action: 'navigate',
        target: 'flashcards',
        params: {
          search: formulaQuery,
          type: 'formula' 
        },
        response: `Searching for formulas related to ${formulaQuery}.`
      };
    }
  },
  
  performanceFeedback: {
    canProcess: (command: string) => {
      return /score|how did i|performance|result/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      // Extract time period if mentioned
      let timePeriod = 'yesterday';
      if (/today/i.test(command)) timePeriod = 'today';
      if (/this week/i.test(command)) timePeriod = 'this_week';
      if (/this month/i.test(command)) timePeriod = 'this_month';
      
      // Extract subject if mentioned
      let subject = 'all';
      const subjectPatterns = [
        { pattern: /physics/i, value: 'physics' },
        { pattern: /chemistry/i, value: 'chemistry' },
        { pattern: /math/i, value: 'mathematics' },
        { pattern: /biology/i, value: 'biology' }
      ];
      
      for (const { pattern, value } of subjectPatterns) {
        if (pattern.test(command)) {
          subject = value;
          break;
        }
      }
      
      return {
        action: 'navigate',
        target: 'performance',
        params: {
          period: timePeriod,
          subject
        },
        response: `Here's your performance data for ${subject} during ${timePeriod.replace('_', ' ')}.`
      };
    }
  }
};

/**
 * Command processors for teacher role
 */
const teacherCommandProcessors: Record<string, CommandProcessor> = {
  // Test generator command processor
  testGenerator: {
    canProcess: (command: string) => {
      return /create|generate|make.*test/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      // Extract count, type, and chapter
      const countMatch = command.match(/(\d+)/);
      const questionCount = countMatch ? parseInt(countMatch[1]) : 10;
      
      let questionType = 'mixed';
      if (/mcq|multiple choice/i.test(command)) questionType = 'mcq';
      if (/short answer/i.test(command)) questionType = 'short-answer';
      if (/long answer/i.test(command)) questionType = 'long-answer';
      
      let subject = 'general';
      const chapterMatch = command.match(/(?:from|on)\s+(?:chapter\s+)?(\w+)(?:\s+(\w+))?/i);
      if (chapterMatch) {
        subject = chapterMatch[1] + (chapterMatch[2] ? ' ' + chapterMatch[2] : '');
      }
      
      let difficulty = 'medium';
      if (/easy|simple|basic/i.test(command)) difficulty = 'easy';
      if (/hard|difficult|challenging/i.test(command)) difficulty = 'hard';
      
      return {
        action: 'navigate',
        target: 'test-creator',
        params: {
          count: questionCount,
          type: questionType,
          subject: subject,
          difficulty: difficulty
        },
        response: `Creating a ${difficulty} test with ${questionCount} ${questionType} questions on ${subject}.`
      };
    }
  },
  
  // Analytics command processor
  classAnalytics: {
    canProcess: (command: string) => {
      return /analytics|performance|weak|struggling|show/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      // Extract class/section
      let section = 'A';
      const sectionMatch = command.match(/section\s+(\w+)/i);
      if (sectionMatch) {
        section = sectionMatch[1];
      }
      
      // Extract subject
      let subject = 'all';
      if (/physics/i.test(command)) subject = 'physics';
      if (/chemistry/i.test(command)) subject = 'chemistry';
      if (/math/i.test(command)) subject = 'mathematics';
      if (/biology/i.test(command)) subject = 'biology';
      
      return {
        action: 'navigate',
        target: 'performance-analytics',
        params: {
          section,
          subject
        },
        response: `Showing performance analytics for Section ${section} in ${subject}.`
      };
    }
  },
  
  // Lesson plan processor
  lessonPlan: {
    canProcess: (command: string) => {
      return /lesson plan|teaching plan/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      let subject = 'general';
      const subjectMatch = command.match(/for\s+(\w+)(?:\s+(\w+))?/i);
      if (subjectMatch) {
        subject = subjectMatch[1] + (subjectMatch[2] ? ' ' + subjectMatch[2] : '');
      }
      
      return {
        action: 'navigate',
        target: 'lesson-plan',
        params: {
          subject,
          type: 'lesson-plan'
        },
        response: `Creating a lesson plan for ${subject}.`
      };
    }
  },
  
  // Flashcards generator processor
  flashcardsGenerator: {
    canProcess: (command: string) => {
      return /flashcard|flash card|revision card/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      let subject = 'general';
      const subjectMatch = command.match(/for\s+(\w+)(?:\s+(\w+))?/i);
      if (subjectMatch) {
        subject = subjectMatch[1] + (subjectMatch[2] ? ' ' + subjectMatch[2] : '');
      }
      
      let includeFormulas = false;
      if (/formula|equation/i.test(command)) {
        includeFormulas = true;
      }
      
      return {
        action: 'navigate',
        target: 'lesson-plan',
        params: {
          subject,
          type: 'flashcards',
          includeFormulas
        },
        response: `Generating flashcards for ${subject}${includeFormulas ? ' with formulas' : ''}.`
      };
    }
  }
};

/**
 * Command processors for principal role
 */
const principalCommandProcessors: Record<string, CommandProcessor> = {
  // Institutional report command processor
  institutionalReport: {
    canProcess: (command: string) => {
      return /report|average|score/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      // Extract time period
      let period = 'this_month';
      if (/this week/i.test(command)) period = 'this_week';
      if (/last month/i.test(command)) period = 'last_month';
      if (/this year/i.test(command)) period = 'this_year';
      
      // Extract exam type
      let examType = 'all';
      const examPatterns = [
        { pattern: /jee/i, value: 'JEE' },
        { pattern: /neet/i, value: 'NEET' },
        { pattern: /cet/i, value: 'CET' }
      ];
      
      for (const { pattern, value } of examPatterns) {
        if (pattern.test(command)) {
          examType = value;
          break;
        }
      }
      
      return {
        action: 'navigate',
        target: 'institutional-report',
        params: {
          period,
          examType
        },
        response: `Generating the institutional report for ${examType} ${period.replace('_', ' ')}.`
      };
    }
  },
  
  // Teacher performance report
  teacherPerformance: {
    canProcess: (command: string) => {
      return /teacher.*performance|evaluation/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      // Extract department if mentioned
      let department = 'all';
      const deptPatterns = [
        { pattern: /physics/i, value: 'physics' },
        { pattern: /chemistry/i, value: 'chemistry' },
        { pattern: /math/i, value: 'mathematics' },
        { pattern: /biology/i, value: 'biology' }
      ];
      
      for (const { pattern, value } of deptPatterns) {
        if (pattern.test(command)) {
          department = value;
          break;
        }
      }
      
      return {
        action: 'navigate',
        target: 'teacher-performance',
        params: {
          department
        },
        response: `Showing teacher performance statistics for the ${department} department.`
      };
    }
  }
};

/**
 * Common command processors for all roles
 */
const commonCommandProcessors: Record<string, CommandProcessor> = {
  // Help command processor
  helpCommand: {
    canProcess: (command: string) => {
      return /help|what can you do/i.test(command);
    },
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      return {
        action: 'dialog',
        response: "I can help you with various tasks. For students, I can answer doubts, start quizzes, find formulas, and show your performance. For teachers, I can create tests, show class analytics, and generate lesson plans. For principals, I can generate institutional reports and teacher performance data."
      };
    }
  },
  
  // Unknown command processor
  unknownCommand: {
    canProcess: (command: string) => true, // This is a fallback so always returns true
    process: async (command: string, modelId: string): Promise<CommandResult> => {
      // First attempt to get the API key from storage
      let apiKey = apiKeyService.getApiKey(modelId);
      
      // If no API key is found, use a default API key for the application
      if (!apiKey) {
        // Use a default fallback API key (from environment variable or a predefined one)
        // This is temporary for demo purposes - in production, you should use a more secure approach
        apiKey = "sk-12345"; // This is a placeholder, replace with a working API key
        
        console.log("Using default API key for voice command processing");
      }
      
      if (apiKey) {
        try {
          const prompt = `I received this voice command: "${command}". 
            I need to determine the user's intent. It could be related to:
            - Answering educational doubts/questions
            - Starting quizzes or tests
            - Setting reminders
            - Searching formulas
            - Checking performance data
            - Generating tests (for teachers)
            - Viewing analytics (for teachers)
            - Creating lesson plans (for teachers)
            - Generating reports (for principals)
            
            What is the most likely intent of this command? Respond with just the intent category.`;
          
          const result = await llmService.callLLM(modelId || 'gpt-4o', prompt, apiKey, {
            temperature: 0.3,
            maxTokens: 100
          });
          
          const intent = result.content.trim().toLowerCase();
          
          if (intent.includes('doubt') || intent.includes('question')) {
            return studentCommandProcessors.doubtSolver.process(command, modelId);
          } else if (intent.includes('quiz') || intent.includes('test')) {
            return studentCommandProcessors.quizStarter.process(command, modelId);
          } else if (intent.includes('formula')) {
            return studentCommandProcessors.formulaFinder.process(command, modelId);
          } else if (intent.includes('performance')) {
            return studentCommandProcessors.performanceFeedback.process(command, modelId);
          } else if (intent.includes('lesson plan')) {
            return teacherCommandProcessors.lessonPlan.process(command, modelId);
          } else if (intent.includes('analytics')) {
            return teacherCommandProcessors.classAnalytics.process(command, modelId);
          } else if (intent.includes('generate test')) {
            return teacherCommandProcessors.testGenerator.process(command, modelId);
          }
        } catch (error) {
          console.error("Error using LLM to interpret command:", error);
          
          // If LLM fails, try keyword matching as a fallback
          if (command.toLowerCase().includes('test') || command.toLowerCase().includes('quiz')) {
            return {
              action: 'navigate',
              target: 'test-creator',
              params: {
                count: 10,
                type: 'mixed',
                subject: 'general',
                difficulty: 'medium'
              },
              response: "I'll help you create a test."
            };
          } else if (command.toLowerCase().includes('flashcard')) {
            return {
              action: 'navigate',
              target: 'lesson-plan',
              params: {
                type: 'flashcards'
              },
              response: "Let me create some flashcards for you."
            };
          }
        }
      }
      
      // As a last resort, just show a help message
      return {
        action: 'dialog',
        response: "I'm not sure what you want me to do. Try saying 'create a test', 'show analytics', or 'make flashcards'."
      };
    }
  }
};

// Export the processors for testing and extension
export {
  studentCommandProcessors,
  teacherCommandProcessors,
  principalCommandProcessors,
  commonCommandProcessors
}; 