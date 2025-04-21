import axios from 'axios';

// Types for AI Assistant endpoints
export interface AIAssistantParams {
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  content?: string;
  questionCount?: number;
  examDuration?: number;
  includeExplanations?: boolean;
  format?: 'concise' | 'detailed' | 'simplified' | 'advanced';
  documentFile?: File;
  questionTypes?: string[];
}

export interface AIAssistantResponse {
  success: boolean;
  data?: {
    content: string;
    meta?: {
      questionCount?: number;
      difficulty?: string;
      subject?: string;
    }
  };
  error?: string;
}

export interface DoubtSolvingParams {
  subject: string;
  question: string;
  includeSteps: boolean;
}

class AIAssistantService {
  private apiUrl = '/api/ai-assistant';

  // Mock API call for generating tests
  async generateTest(params: AIAssistantParams): Promise<AIAssistantResponse> {
    try {
      // In a real implementation, this would be an API call to your backend
      // For demonstration, we'll mock a successful response
      
      // Create form data to handle file upload
      const formData = new FormData();
      if (params.documentFile) {
        formData.append('file', params.documentFile);
      }
      
      if (params.subject) formData.append('subject', params.subject);
      if (params.difficulty) formData.append('difficulty', params.difficulty);
      if (params.questionCount) formData.append('questionCount', params.questionCount.toString());
      if (params.examDuration) formData.append('examDuration', params.examDuration.toString());
      if (params.questionTypes) formData.append('questionTypes', JSON.stringify(params.questionTypes));
      
      // Mock response for demo purposes
      return {
        success: true,
        data: {
          content: this.mockTestContent(params),
          meta: {
            questionCount: params.questionCount || 10,
            difficulty: params.difficulty || 'medium',
            subject: params.subject,
          }
        }
      };
      
      // Real implementation would be:
      // const response = await axios.post(`${this.apiUrl}/generate-test`, formData);
      // return response.data;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to generate test. Please try again.'
      };
    }
  }
  
  // Mock API call for generating notes
  async generateNotes(params: AIAssistantParams): Promise<AIAssistantResponse> {
    try {
      // Mock response for demo purposes
      return {
        success: true,
        data: {
          content: this.mockNotesContent(params),
          meta: {
            subject: params.subject,
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to generate notes. Please try again.'
      };
    }
  }
  
  // Mock API call for generating MCQs
  async generateMCQs(params: AIAssistantParams): Promise<AIAssistantResponse> {
    try {
      // Mock response for demo purposes
      return {
        success: true,
        data: {
          content: this.mockMCQContent(params),
          meta: {
            questionCount: params.questionCount || 10,
            difficulty: params.difficulty || 'medium',
            subject: params.subject,
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to generate MCQs. Please try again.'
      };
    }
  }
  
  // Mock API call for solving doubts
  async solveDoubt(params: DoubtSolvingParams): Promise<AIAssistantResponse> {
    try {
      return {
        success: true,
        data: {
          content: this.mockDoubtSolution(params),
          meta: {
            subject: params.subject,
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to solve doubt. Please try again.'
      };
    }
  }
  
  // Mock methods for generating demo content
  private mockTestContent(params: AIAssistantParams): string {
    const subject = params.subject || 'Physics';
    const difficulty = params.difficulty || 'medium';
    const count = params.questionCount || 10;
    
    return `# ${subject} Test (${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} difficulty)
Duration: ${params.examDuration} minutes
Total questions: ${count}

${Array.from({ length: count }, (_, i) => {
  return `## Question ${i + 1}
${this.getQuestionBySubject(subject, difficulty)}
`;
}).join('\n')}`;
  }
  
  private mockNotesContent(params: AIAssistantParams): string {
    const subject = params.subject || 'Physics';
    const format = params.format || 'concise';
    
    return `# ${subject} Study Notes (${format} format)

## Introduction
This document contains key concepts and explanations for ${subject}.

## Key Concepts
1. [Concept 1] - Detailed explanation would be here
2. [Concept 2] - Detailed explanation would be here
3. [Concept 3] - Detailed explanation would be here

## Summary
These notes cover the fundamental principles of ${subject} in a ${format} format.

## Additional Resources
- Textbook references
- Website links
- Practice problems
`;
  }
  
  private mockMCQContent(params: AIAssistantParams): string {
    const subject = params.subject || 'Physics';
    const difficulty = params.difficulty || 'medium';
    const count = params.questionCount || 10;
    const includeExplanations = params.includeExplanations !== false;
    
    return `# ${subject} Multiple Choice Questions (${difficulty} difficulty)
Total questions: ${count}

${Array.from({ length: count }, (_, i) => {
  return `## Question ${i + 1}
${this.getMCQBySubject(subject, difficulty)}

${includeExplanations ? '**Explanation**: The correct answer is (A) because...' : ''}
`;
}).join('\n')}`;
  }
  
  private mockDoubtSolution(params: DoubtSolvingParams): string {
    const { subject, question, includeSteps } = params;
    
    if (subject === 'mathematics') {
      return `# Solution to Your Math Problem

${question}

${includeSteps ? `## Step-by-Step Solution:
1. First, we identify that this is a quadratic equation
2. We use the formula x = (-b ± √(b²-4ac))/2a
3. Substituting the values, we get x = 2 or x = -3

` : ''}
## Answer: 
The solution to the equation is x = 2 or x = -3.

## Additional Notes:
- This is an example of a quadratic equation
- You can verify the answer by substituting back into the original equation`;
    } else {
      return `# Solution to Your ${subject.charAt(0).toUpperCase() + subject.slice(1)} Question

${question}

${includeSteps ? `## Detailed Explanation:
The concept you're asking about relates to [relevant principle]. Here's how we approach this:

1. First principle to consider
2. Second principle to apply
3. Final calculation or conclusion

` : ''}
## Answer:
Based on the principles of ${subject}, the answer is [detailed answer].

## Study Tips:
- Related concepts to explore
- Common misconceptions to avoid
- Practice problem suggestions`;
    }
  }
  
  // Helper methods for generating mock questions
  private getQuestionBySubject(subject: string, difficulty: string): string {
    const questions: Record<string, Record<string, string[]>> = {
      physics: {
        easy: [
          "What is the formula for calculating velocity?",
          "Define Newton's First Law of Motion."
        ],
        medium: [
          "A 2kg object is accelerating at 5 m/s². What force is acting on it?",
          "Explain how electromagnetic induction works."
        ],
        hard: [
          "A particle is moving in a circular path with a constant speed. Is the particle in equilibrium? Justify your answer.",
          "Derive the equation for the magnetic field at the center of a current-carrying loop."
        ]
      },
      mathematics: {
        easy: [
          "Solve for x: 2x + 3 = 7",
          "Find the derivative of f(x) = x²"
        ],
        medium: [
          "Solve the system of equations: 3x + 2y = 14, 2x - y = 1",
          "Integrate f(x) = 3x² + 2x - 5"
        ],
        hard: [
          "Prove that the sequence defined by a₁ = 1, aₙ₊₁ = 1 + 1/aₙ converges.",
          "Find the volume of the solid obtained by rotating the region bounded by y = x² and y = 1 about the y-axis."
        ]
      }
    };
    
    // Default to physics if subject not found
    const subjectQuestions = questions[subject.toLowerCase()] || questions.physics;
    const difficultyQuestions = subjectQuestions[difficulty] || subjectQuestions.medium;
    
    return difficultyQuestions[Math.floor(Math.random() * difficultyQuestions.length)];
  }
  
  private getMCQBySubject(subject: string, difficulty: string): string {
    const questions: Record<string, Record<string, string[]>> = {
      physics: {
        easy: [
          "What is the SI unit of force?\nA) Newton\nB) Joule\nC) Watt\nD) Pascal",
          "Which of the following is a vector quantity?\nA) Velocity\nB) Mass\nC) Time\nD) Temperature"
        ],
        medium: [
          "A body of mass 2kg moving with a velocity of 10m/s collides with a wall and bounces back with the same speed. The change in momentum of the body is:\nA) 40 kg m/s\nB) 20 kg m/s\nC) 0 kg m/s\nD) -40 kg m/s",
          "Which phenomenon explains why the sky appears blue?\nA) Rayleigh scattering\nB) Compton effect\nC) Photoelectric effect\nD) Pair production"
        ],
        hard: [
          "An electron and a proton are placed in a uniform electric field. The ratio of their accelerations is:\nA) mp/me\nB) me/mp\nC) 1\nD) -1",
          "In a Young's double-slit experiment, if the separation between the slits is halved and the distance between the screen and the slits is doubled, the fringe width will:\nA) Increase by a factor of 4\nB) Decrease by a factor of 4\nC) Increase by a factor of 2\nD) Decrease by a factor of 2"
        ]
      },
      mathematics: {
        easy: [
          "What is the value of x in the equation 3x + 7 = 22?\nA) 5\nB) 6\nC) 7\nD) 8",
          "Which of the following is equivalent to 0.25?\nA) 1/4\nB) 1/3\nC) 2/5\nD) 3/10"
        ],
        medium: [
          "The solution to the system of equations 2x + 3y = 12 and 3x - y = 2 is:\nA) x = 3, y = 2\nB) x = 2, y = 3\nC) x = 1, y = 5\nD) x = 5, y = 1",
          "The derivative of f(x) = e^(3x) is:\nA) 3e^(3x)\nB) e^(3x)\nC) 3xe^(3x)\nD) e^x"
        ],
        hard: [
          "The value of the limit lim(x→0) (sin³x)/x³ is:\nA) 0\nB) 1/3\nC) 1\nD) 3",
          "If z = 3 + 4i, then |z|² equals:\nA) 7\nB) 25\nC) 5\nD) 49"
        ]
      }
    };
    
    // Default to physics if subject not found
    const subjectQuestions = questions[subject.toLowerCase()] || questions.physics;
    const difficultyQuestions = subjectQuestions[difficulty] || subjectQuestions.medium;
    
    return difficultyQuestions[Math.floor(Math.random() * difficultyQuestions.length)];
  }
}

export const aiAssistantService = new AIAssistantService(); 