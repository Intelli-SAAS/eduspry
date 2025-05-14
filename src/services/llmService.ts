import axios from 'axios';

interface LLMRequestParams {
  prompt: string;
  model?: string;
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
}

interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export const llmService = {
  /**
   * Call OpenAI API (GPT models)
   */
  async callOpenAI(params: LLMRequestParams): Promise<LLMResponse> {
    try {
      const model = params.model || 'gpt-4o';
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model,
          messages: [{ role: 'user', content: params.prompt }],
          temperature: params.temperature ?? 0.7,
          max_tokens: params.maxTokens ?? 1500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${params.apiKey}`
          }
        }
      );
      
      return {
        content: response.data.choices[0].message.content,
        model: response.data.model,
        usage: {
          promptTokens: response.data.usage.prompt_tokens,
          completionTokens: response.data.usage.completion_tokens,
          totalTokens: response.data.usage.total_tokens,
        }
      };
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw new Error("Failed to get response from OpenAI");
    }
  },

  /**
   * Call Google Gemini API
   */
  async callGemini(params: LLMRequestParams): Promise<LLMResponse> {
    try {
      const model = params.model || 'gemini-1.5-pro';
      const apiVersion = '2024-05';
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          contents: [{ parts: [{ text: params.prompt }] }],
          generationConfig: {
            temperature: params.temperature ?? 0.7,
            maxOutputTokens: params.maxTokens ?? 1500,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            key: params.apiKey
          }
        }
      );
      
      return {
        content: response.data.candidates[0].content.parts[0].text,
        model: model,
        usage: {} // Gemini doesn't return detailed token usage in the same way
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to get response from Gemini");
    }
  },

  /**
   * Call Claude API
   */
  async callClaude(params: LLMRequestParams): Promise<LLMResponse> {
    try {
      const model = params.model || 'claude-3-sonnet-20240229';
      
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: model,
          messages: [{ role: 'user', content: params.prompt }],
          max_tokens: params.maxTokens ?? 1500,
          temperature: params.temperature ?? 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': params.apiKey,
            'anthropic-version': '2023-06-01'
          }
        }
      );
      
      return {
        content: response.data.content[0].text,
        model: response.data.model,
        usage: {
          promptTokens: response.data.usage.input_tokens,
          completionTokens: response.data.usage.output_tokens,
          totalTokens: response.data.usage.input_tokens + response.data.usage.output_tokens,
        }
      };
    } catch (error) {
      console.error("Claude API Error:", error);
      throw new Error("Failed to get response from Claude");
    }
  },
  
  /**
   * Call DeepSeek API
   */
  async callDeepSeek(params: LLMRequestParams): Promise<LLMResponse> {
    try {
      const model = params.model || 'deepseek-chat';
      
      const response = await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
          model: model,
          messages: [{ role: 'user', content: params.prompt }],
          temperature: params.temperature ?? 0.7,
          max_tokens: params.maxTokens ?? 1500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${params.apiKey}`
          }
        }
      );
      
      return {
        content: response.data.choices[0].message.content,
        model: response.data.model,
        usage: {
          promptTokens: response.data.usage.prompt_tokens,
          completionTokens: response.data.usage.completion_tokens,
          totalTokens: response.data.usage.total_tokens,
        }
      };
    } catch (error) {
      console.error("DeepSeek API Error:", error);
      throw new Error("Failed to get response from DeepSeek");
    }
  },
  
  /**
   * Select and call the appropriate LLM service based on model ID
   */
  async callLLM(modelId: string, prompt: string, apiKey: string, options: { temperature?: number, maxTokens?: number } = {}): Promise<LLMResponse> {
    if (modelId.startsWith('gpt-')) {
      return this.callOpenAI({ prompt, apiKey, model: modelId, ...options });
    } else if (modelId.startsWith('gemini-')) {
      return this.callGemini({ prompt, apiKey, model: modelId, ...options });
    } else if (modelId.startsWith('claude')) {
      return this.callClaude({ prompt, apiKey, model: modelId, ...options });
    } else if (modelId.startsWith('deepseek')) {
      return this.callDeepSeek({ prompt, apiKey, model: modelId, ...options });
    } else {
      throw new Error(`Unsupported model: ${modelId}`);
    }
  },
  
  /**
   * Create a prompt for solving educational questions
   */
  createSolvingPrompt(question: string, subject: string, includeSteps: boolean): string {
    return `I'm a teacher helping a student with a question in ${subject}. The student's question is:
    
"${question}"

${includeSteps 
  ? 'Please provide a detailed step-by-step explanation with the solution. Break down the concepts clearly for educational purposes.' 
  : 'Please provide a clear and concise answer.'}

Format your answer using markdown for better readability.`;
  },

  /**
   * Create a prompt for generating a personalized study plan
   */
  createPlannerPrompt(examDate: string, dailyHours: number): string {
    return `I have an exam scheduled on ${examDate}. I can study ${dailyHours} hours per day. Please create a day-by-day study plan covering all major topics for JEE & NEET, prioritizing my weakest areas, until the exam date. Provide the schedule in a markdown table format with dates, topics, and daily goals.`;
  },

  /**
   * Create a prompt for generating flashcards and formula sheets
   */
  createFlashcardsPrompt(subject: string, topics: string[], includeFormulas: boolean): string {
    const topicsText = topics && topics.length > 0 
      ? `specifically on the following topics: ${topics.join(', ')}`
      : 'covering the major concepts and topics';
    
    const formulasText = includeFormulas 
      ? 'Additionally, please create a comprehensive formula sheet with all relevant formulas organized by topic.'
      : '';
    
    return `Please create educational flashcards for ${subject} ${topicsText}. 
    
Each flashcard should have a clear front with a key concept or term, and a back with a detailed explanation.

${formulasText}

Please format the output in markdown with clear sections for flashcards and formula sheet.`;
  },

  /**
   * Create a prompt for generating a practice quiz
   */
  createQuizPrompt(subject: string, difficulty: string, questionCount: number, includeAnswers: boolean): string {
    return `Please create a practice quiz for ${subject} with ${questionCount} questions at ${difficulty} difficulty level.

Each question should be multiple choice with 4 options. ${includeAnswers ? 'Include the correct answer and a brief explanation for each question.' : 'Only include the questions and options, without answers.'}

Format the quiz as follows:
- Number each question
- Clearly mark options as A, B, C, D
${includeAnswers ? '- Include a section after each question labeled "Answer:" with the correct option' : ''}
${includeAnswers ? '- Include a brief explanation where appropriate' : ''}

Please ensure questions are appropriate for JEE/NEET level students and cover key concepts in ${subject}.`;
  },

  /**
   * Create a prompt for predicting exam rank
   */
  createRankPredictorPrompt(mockScores: number[], averageScore: number, examType: string): string {
    const scoresText = mockScores.join(', ');
    
    return `Based on the following mock test scores: [${scoresText}] with an average score of ${averageScore}, 
please predict a likely rank range for a student in the ${examType} exam.

In your analysis, please include:
1. Estimated percentile based on historical data
2. Projected rank range (upper and lower bound)
3. Comparison with previous years' cutoffs for top colleges
4. Brief analysis of performance based on the scores

Please format your response using markdown for readability.`;
  },

  /**
   * Create a prompt for generating a revision cheat sheet
   */
  createRevisionSheetPrompt(subject: string, topics: string[], examDate: string): string {
    const topicsText = topics && topics.length > 0 
      ? `focusing specifically on these topics: ${topics.join(', ')}`
      : 'covering all major topics';
    const timeConstraint = examDate ? `The exam is on ${examDate}, so please prioritize the most important concepts.` : '';
    
    return `Please create a concise revision cheat-sheet for ${subject} ${topicsText}. ${timeConstraint}

The cheat-sheet should include:
1. Key concepts and definitions
2. Important formulas and equations
3. Quick reference mnemonics
4. Common problem types with solution approaches
5. Most frequently tested topics

Format the sheet as a clear, well-organized markdown document that a student can quickly review before an exam.
Use bullet points, tables, and headers for better readability.`;
  },

  /**
   * Create a prompt for generating a performance dashboard
   */
  createPerformanceDashboardPrompt(examDate: string, subjects: string[]): string {
    const subjectsText = subjects.length > 0 
      ? `for these subjects: ${subjects.join(', ')}`
      : 'across all subjects';
    
    return `Please analyze the student's performance data ${subjectsText} up to the exam date ${examDate} and generate a comprehensive performance dashboard.

The dashboard should include:
1. Overall performance trends and progress tracking
2. Subject-wise performance breakdown with strengths and weaknesses
3. Topic-wise proficiency analysis highlighting areas that need improvement
4. Performance comparison with peers (percentile ranking)
5. Personalized recommendations for improvement
6. Projected score ranges based on current performance

Format the dashboard as a well-structured markdown document with clear sections, charts descriptions, and actionable insights.
Use headings, bullet points, and tables for better organization and readability.`;
  }
}; 