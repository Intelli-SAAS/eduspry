import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUploader } from '@/components/ui/file-uploader';
import { Separator } from '@/components/ui/separator';
import { Loader2, Upload, BookOpen, FileText, HelpCircle, PlusCircle, BookText, Send, Clock, Download } from 'lucide-react';
import { ModelSelector, AIModel } from '@/components/ui/model-selector';
import { apiKeyService } from '@/services/apiKeyService';
import { downloadFile } from '@/lib/utils';
import { llmService } from '@/services/llmService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/components/ui/use-toast';
import { MultiSelect } from '@/components/ui/multi-select';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Available LLM models
const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'OpenAI\'s most advanced model'
  },
  {
    id: 'gemini-2.0',
    name: 'Gemini 2.0',
    description: 'Google\'s multimodal AI system'
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    description: 'Advanced reasoning model'
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    description: 'Vision-capable model'
  }
];

const AIAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState('test-creator');
  const [isLoading, setIsLoading] = useState(false);
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  
  // Doubts Clearing States
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [doubtSubject, setDoubtSubject] = useState('physics');
  const [includeSteps, setIncludeSteps] = useState('yes');
  
  // Test Creator States
  const [testParams, setTestParams] = useState({
    subject: '',
    difficulty: 'medium',
    questionCount: 10,
    examDuration: 60,
    questionTypes: ['mcq', 'short-answer', 'numerical']
  });
  
  // Study Planner States
  const [examDate, setExamDate] = useState<string>('');
  const [dailyHours, setDailyHours] = useState<number>(4);
  
  // Add error state for API calls
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Past-Paper Analyzer State
  const [pastPaperFiles, setPastPaperFiles] = useState<File[]>([]);
  const [pastPaperAnalysis, setPastPaperAnalysis] = useState('');
  
  // Flashcards & Formula Sheet States
  const [flashcardSubject, setFlashcardSubject] = useState('physics');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [includeFormulas, setIncludeFormulas] = useState(true);
  const [flashcardsGenerated, setFlashcardsGenerated] = useState(false);
  
  // Practice Quiz States
  const [quizSubject, setQuizSubject] = useState('physics');
  const [quizDifficulty, setQuizDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [quizGenerated, setQuizGenerated] = useState(false);
  
  // Rank Predictor States
  const [mockScores, setMockScores] = useState<string>('');
  const [averageScore, setAverageScore] = useState<number>(0);
  const [examType, setExamType] = useState<string>('JEE Main');
  const [rankPredicted, setRankPredicted] = useState(false);
  
  // Topic options by subject for flashcards
  const topicOptions: Record<string, string[]> = {
    physics: [
      'Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 
      'Modern Physics', 'Waves & Sound', 'Fluid Mechanics'
    ],
    chemistry: [
      'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry',
      'Coordination Compounds', 'Chemical Bonding', 'Electrochemistry'
    ],
    mathematics: [
      'Calculus', 'Algebra', 'Trigonometry', 'Coordinate Geometry',
      'Vectors', 'Probability', 'Statistics'
    ],
    biology: [
      'Cell Biology', 'Genetics', 'Human Physiology', 'Plant Physiology',
      'Ecology', 'Evolution', 'Molecular Biology'
    ]
  };
  
  // State for Revision Cheat-Sheet
  const [revisionSubject, setRevisionSubject] = useState<string>("");
  const [revisionTopics, setRevisionTopics] = useState<string[]>([]);
  const [revisionExamDate, setRevisionExamDate] = useState<string>("");
  
  // State for Performance Dashboard
  const [dashboardExamDate, setDashboardExamDate] = useState<string>("");
  const [dashboardSubjects, setDashboardSubjects] = useState<string[]>([]);
  const [dashboardGenerated, setDashboardGenerated] = useState(false);
  
  // Mock function for document upload
  const handleDocumentUpload = (files: File[]) => {
    setIsLoading(true);
    setTimeout(() => {
      setDocumentUploaded(true);
      setDocumentName(files[0].name);
      setIsLoading(false);
    }, 1500);
  };
  
  // Mock function for content generation
  const handleGenerate = () => {
    setIsLoading(true);
    setApiError(null); // Clear any previous errors
    
    // Study Planner tab comes first (we allow stub if no API key)
    if (activeTab === 'planner') {
      if (!examDate) {
        setIsLoading(false);
        setApiError('Please select your exam date.');
        return;
      }
      if (dailyHours < 1) {
        setIsLoading(false);
        setApiError('Please enter a valid number of study hours per day.');
        return;
      }
      const apiKey = apiKeyService.getApiKey(selectedModel) || '';
      callPlannerAPI(selectedModel, { examDate, dailyHours, apiKey })
        .then(plan => {
          setGeneratedContent(plan);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Planner API error', err);
          setApiError('Failed to generate study plan.');
          setIsLoading(false);
        });
      return;
    }
    // Next, ensure API key for other tools
    if (!apiKeyService.hasApiKey(selectedModel)) {
      setIsLoading(false);
      setApiError('API key not found. Please select a model and provide an API key.');
      return;
    }
    
    // Doubts Clearing tab
    if (activeTab === 'doubts') {
      if (!doubtQuestion.trim()) {
        setIsLoading(false);
        setApiError("Please enter a question.");
        return;
      }
      
      // Get the API key
      const apiKey = apiKeyService.getApiKey(selectedModel);
      
      // Call the appropriate API based on the selected model
      callModelAPI(selectedModel, {
        question: doubtQuestion,
        subject: doubtSubject,
        includeSteps: includeSteps === 'yes',
        apiKey
      }).then(response => {
        setGeneratedContent(response);
        setIsLoading(false);
      }).catch(error => {
        console.error("Error calling AI model:", error);
        setApiError("Failed to generate solution. Please check your API key and try again.");
        setGeneratedContent("");
        setIsLoading(false);
      });
      
      return;
    }
    
    // Past-Paper & Pattern Analyzer tab
    if (activeTab === 'past-paper') {
      if (pastPaperFiles.length === 0) {
        setIsLoading(false);
        setApiError('Please upload at least one past-paper PDF.');
        return;
      }
      setApiError(null);
      // Stub analysis
      callPastPaperAPI(pastPaperFiles)
        .then(analysis => {
          setPastPaperAnalysis(analysis);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Past-Paper API error', err);
          setApiError('Failed to analyze past papers.');
          setIsLoading(false);
        });
      return;
    }
    
    // Flashcards & Formula Sheet tab
    if (activeTab === 'flashcards') {
      if (!flashcardSubject) {
        setIsLoading(false);
        setApiError('Please select a subject.');
        return;
      }
      
      const apiKey = apiKeyService.getApiKey(selectedModel);
      
      // Call the API to generate flashcards and formula sheet
      callFlashcardsAPI(selectedModel, {
        subject: flashcardSubject,
        topics: selectedTopics,
        includeFormulas,
        apiKey
      }).then(response => {
        setGeneratedContent(response);
        setFlashcardsGenerated(true);
        setIsLoading(false);
      }).catch(error => {
        console.error("Error generating flashcards:", error);
        setApiError("Failed to generate flashcards and formula sheet.");
        setGeneratedContent("");
        setIsLoading(false);
      });
      
      return;
    }
    
    // Practice Quiz tab
    if (activeTab === 'practice-quiz') {
      if (!quizSubject) {
        setIsLoading(false);
        setApiError('Please select a subject for the quiz.');
        return;
      }
      
      const apiKey = apiKeyService.getApiKey(selectedModel);
      
      // Call the API to generate a practice quiz
      callQuizAPI(selectedModel, {
        subject: quizSubject,
        difficulty: quizDifficulty,
        questionCount,
        includeAnswers,
        apiKey
      }).then(response => {
        setGeneratedContent(response);
        setQuizGenerated(true);
        setIsLoading(false);
      }).catch(error => {
        console.error("Error generating quiz:", error);
        setApiError("Failed to generate practice quiz.");
        setGeneratedContent("");
        setIsLoading(false);
      });
      
      return;
    }
    
    // Rank Predictor tab
    if (activeTab === 'rank-predictor') {
      // Validate inputs
      if (!mockScores.trim()) {
        setIsLoading(false);
        setApiError('Please enter your mock test scores.');
        return;
      }
      
      if (averageScore <= 0 || averageScore > 100) {
        setIsLoading(false);
        setApiError('Please enter a valid average score between 1-100.');
        return;
      }
      
      // Parse the scores
      const scores = mockScores.split(',')
        .map(score => parseInt(score.trim()))
        .filter(score => !isNaN(score) && score >= 0 && score <= 100);
      
      if (scores.length === 0) {
        setIsLoading(false);
        setApiError('Please enter valid mock scores (comma-separated numbers between 0-100).');
        return;
      }
      
      const apiKey = apiKeyService.getApiKey(selectedModel) || '';
      
      // Call rank predictor API
      callRankPredictorAPI(selectedModel, {
        mockScores: scores,
        averageScore,
        examType,
        apiKey
      }).then(prediction => {
        setGeneratedContent(prediction);
        setRankPredicted(true);
        setIsLoading(false);
      }).catch(err => {
        console.error('Rank predictor API error', err);
        setApiError('Failed to predict rank. Please check your inputs.');
        setIsLoading(false);
      });
      
      return;
    }
    
    // Revision Cheat-Sheet tab
    if (activeTab === 'revision') {
      if (!revisionSubject) {
        setIsLoading(false);
        setApiError('Please enter a subject.');
        return;
      }
      
      if (revisionTopics.length === 0) {
        setIsLoading(false);
        setApiError('Please enter at least one topic.');
        return;
      }
      
      if (!revisionExamDate) {
        setIsLoading(false);
        setApiError('Please select an exam date.');
        return;
      }
      
      const apiKey = apiKeyService.getApiKey(selectedModel);
      
      // Call the API to generate revision sheet
      callRevisionSheetAPI(selectedModel, {
        subject: revisionSubject,
        topics: revisionTopics,
        examDate: revisionExamDate,
        apiKey
      }).then(response => {
        setGeneratedContent(response);
        setIsLoading(false);
      }).catch(error => {
        console.error("Error generating revision sheet:", error);
        setApiError("Failed to generate revision sheet.");
        setGeneratedContent("");
        setIsLoading(false);
      });
      
      return;
    }
    
    // Performance Dashboard tab
    if (activeTab === 'performance') {
      if (!dashboardExamDate) {
        setIsLoading(false);
        setApiError('Please select an exam date.');
        return;
      }
      
      if (dashboardSubjects.length === 0) {
        setIsLoading(false);
        setApiError('Please select at least one subject.');
        return;
      }
      
      const apiKey = apiKeyService.getApiKey(selectedModel);
      
      // Call the API to generate performance dashboard
      callPerformanceDashboardAPI(selectedModel, {
        examDate: dashboardExamDate,
        subjects: dashboardSubjects,
        apiKey
      }).then(response => {
        setGeneratedContent(response);
        setDashboardGenerated(true);
        setIsLoading(false);
      }).catch(error => {
        console.error("Error generating performance dashboard:", error);
        setApiError("Failed to generate performance dashboard.");
        setGeneratedContent("");
        setIsLoading(false);
      });
      
      return;
    }
    
    // For other tabs, use the existing mock implementation
    setTimeout(() => {
      const content = `Generated ${activeTab === 'test-creator' ? 'test' : activeTab === 'notes' ? 'notes' : activeTab === 'mcq-creator' ? 'MCQs' : 'solutions'} based on ${documentName} using ${selectedModel}`;
      setGeneratedContent(content);
      setIsLoading(false);
    }, 2000);
  };
  
  // Function to call the appropriate model API
  const callModelAPI = async (modelId: string, params: any): Promise<string> => {
    try {
      // Create the prompt for the LLM
      const prompt = llmService.createSolvingPrompt(
        params.question,
        params.subject,
        params.includeSteps
      );
      
      // In development mode, check if we should mock the response
      if (process.env.NODE_ENV === 'development' && params.question.toLowerCase().includes('virtual memory')) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Return mock response for virtual memory question
        const modelName = AVAILABLE_MODELS.find(m => m.id === modelId)?.name || modelId;
        let response = `# Virtual Memory Explanation\n\n`;
        response += `Virtual memory is a memory management technique that provides an "idealized abstraction of the storage resources that are actually available on a given machine" which "creates the illusion to users of a very large (main) memory."\n\n`;
        
        if (params.includeSteps) {
          response += `## How Virtual Memory Works:\n\n`;
          response += `1. **Paging System**: Virtual memory uses a paging system that divides memory into fixed-size blocks called pages.\n\n`;
          response += `2. **Page Table**: The system maintains a page table that maps virtual addresses to physical addresses.\n\n`;
          response += `3. **Demand Paging**: Pages are only loaded into physical memory when they are needed, allowing programs to use more memory than physically available.\n\n`;
          response += `4. **Page Faults**: When a program tries to access a page that isn't in physical memory, a page fault occurs, causing the OS to load the required page from secondary storage.\n\n`;
          response += `5. **Swapping**: If physical memory is full, the OS will move less-used pages to disk to make room for new pages (swapping or paging).\n\n`;
        }
        
        response += `## Benefits of Virtual Memory:\n\n`;
        response += `- Programs can use more memory than physically available\n`;
        response += `- Memory is used more efficiently through sharing\n`;
        response += `- Provides memory protection between processes\n`;
        response += `- Simplifies memory allocation for programmers\n\n`;
        
        response += `*Generated by ${modelName} on ${new Date().toLocaleDateString()}*`;
        
        return response;
      }
      
      // Call the appropriate LLM API
      const result = await llmService.callLLM(modelId, prompt, params.apiKey, {
        temperature: 0.3, // Lower temperature for more consistent educational responses
        maxTokens: 2000  // Allow for detailed explanations
      });
      
      return result.content;
    } catch (error) {
      console.error("Error calling model API:", error);
      return "Sorry, there was an error generating the solution. Please check your API key and try again.";
    }
  };
  
  const callPlannerAPI = async (_modelId: string, params: { examDate: string; dailyHours: number; apiKey: string }): Promise<string> => {
    // Stub plan for now (static or based on inputs)
    const today = new Date();
    const timeDiff = Date.parse(params.examDate) - today.getTime();
    const daysLeft = Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 1);
    const entries = Math.min(daysLeft, 7); // show up to a week
    let table = `| Date       | Topic Plan       | Study Hours |\n`;
    table += `|------------|------------------|-------------|\n`;
    for (let i = 0; i < entries; i++) {
      const d = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      table += `| ${dateStr} | Topic ${i + 1} | ${params.dailyHours} |\n`;
    }
    return `## Personalized Study Plan\n\n${table}\n*This is a sample plan based on your inputs.*`;
  };
  
  // Stub function for past-paper analysis
  const callPastPaperAPI = async (files: File[]): Promise<string> => {
    // Simulate processing delay
    await new Promise(res => setTimeout(res, 1500));
    // Stub output: frequency table
    return `## Past-Paper & Pattern Analysis
   
+| Subject     | Question Count |
+|-------------|----------------|
+| Physics     | 12             |
+| Chemistry   | 8              |
+| Mathematics | 10             |
+| Biology     | 7              |
+
+*This analysis is a stub. Replace with real parsing logic.*`;
  };
  
  // Reset for doubts clearing
  const handleNewQuestion = () => {
    setDoubtQuestion('');
    setGeneratedContent('');
  };
  
  // Copy solution to clipboard
  const handleCopySolution = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent)
        .catch(err => console.error('Failed to copy text: ', err));
    }
  };
  
  // Reset all form data
  const handleReset = () => {
    // Reset doubts section
    setDoubtQuestion('');
    setDoubtSubject('physics');
    setIncludeSteps('yes');
    setGeneratedContent('');
  };
  
  // Reset revision sheet state
  const handleResetRevisionSheet = () => {
    setRevisionSubject('');
    setRevisionTopics([]);
    setRevisionExamDate('');
    setGeneratedContent('');
  };
  
  // Handle export with download
  // Helper function to call the quiz API
  const callQuizAPI = async (modelId: string, params: any): Promise<string> => {
    try {
      // Create the prompt for the LLM
      const prompt = llmService.createQuizPrompt(
        params.subject,
        params.difficulty,
        params.questionCount,
        params.includeAnswers
      );
      
      // In development mode, return mock content
      if (process.env.NODE_ENV === 'development') {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Return mock response
        const modelName = AVAILABLE_MODELS.find(m => m.id === modelId)?.name || modelId;
        let response = `# ${params.subject} Practice Quiz (${params.difficulty} difficulty)\n\n`;
        
        // Generate mock questions
        for (let i = 1; i <= Math.min(params.questionCount, 5); i++) {
          response += `## Question ${i}\n`;
          response += `What is the correct answer to this ${params.subject} question?\n\n`;
          response += `A) First option\n`;
          response += `B) Second option\n`;
          response += `C) Third option\n`;
          response += `D) Fourth option\n\n`;
          
          if (params.includeAnswers) {
            response += `**Answer:** B\n\n`;
            response += `**Explanation:** This is the correct answer because of scientific reasons.\n\n`;
          }
        }
        
        response += `*Generated by ${modelName} on ${new Date().toLocaleDateString()}*`;
        
        return response;
      }
      
      // Call the appropriate LLM API
      const result = await llmService.callLLM(modelId, prompt, params.apiKey, {
        temperature: 0.7,
        maxTokens: 2500
      });
      
      return result.content;
    } catch (error) {
      console.error("Error calling quiz API:", error);
      return "Error generating practice quiz. Please check your API key and try again.";
    }
  };
  
  // Reset quiz state
  const handleResetQuiz = () => {
    setQuizGenerated(false);
    setGeneratedContent('');
  };

  // Helper function to call the rank predictor API
  const callRankPredictorAPI = async (modelId: string, params: { 
    mockScores: number[]; 
    averageScore: number; 
    examType: string; 
    apiKey: string;
  }): Promise<string> => {
    try {
      // In development or without API key, return mock content
      if (process.env.NODE_ENV === 'development' || !params.apiKey) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Calculate min and max scores for the analysis
        const mockScoresMin = Math.min(...params.mockScores);
        const mockScoresMax = Math.max(...params.mockScores);
        const percentile = params.averageScore + 10;
        const rankLow = 5000 - (params.averageScore * 50);
        const rankHigh = rankLow - 500;
        
        return `# ${params.examType} Rank Prediction Analysis

## Score Analysis
- Mock Test Scores: [${params.mockScores.join(', ')}]
- Average Score: ${params.averageScore}
- Score Range: ${mockScoresMin} - ${mockScoresMax}

## Percentile & Rank Prediction
- Estimated Percentile: **${percentile.toFixed(2)}**
- Predicted Rank Range: **${rankHigh} to ${rankLow}**

## College Prospects
Based on previous year cutoffs, you may qualify for:
- Tier 1 Colleges: ${params.averageScore > 85 ? 'High chance' : params.averageScore > 75 ? 'Moderate chance' : 'Low chance'}
- Tier 2 Colleges: ${params.averageScore > 70 ? 'High chance' : params.averageScore > 60 ? 'Moderate chance' : 'Low chance'}
- Tier 3 Colleges: ${params.averageScore > 55 ? 'High chance' : 'Moderate chance'}

## Improvement Areas
${params.averageScore < 70 ? '- Consider focusing on high-scoring topics to boost your percentile' : ''}
${mockScoresMax - mockScoresMin > 20 ? '- Work on consistency across different mock tests' : ''}
${params.averageScore > 85 ? '- Continue your current preparation strategy' : ''}

*This prediction is based on historical data and should be used as a reference only. Actual ranks may vary.*`;
      }
      
      // Create the prompt for the LLM
      const prompt = llmService.createRankPredictorPrompt(
        params.mockScores,
        params.averageScore,
        params.examType
      );
      
      // Call the appropriate LLM API
      const result = await llmService.callLLM(modelId, prompt, params.apiKey, {
        temperature: 0.4,
        maxTokens: 1500
      });
      
      return result.content;
    } catch (error) {
      console.error("Error calling rank predictor API:", error);
      return "Error predicting rank. Please check your API key and try again.";
    }
  };
  
  // Reset rank predictor state
  const handleResetRankPredictor = () => {
    setRankPredicted(false);
    setGeneratedContent('');
  };
  
  // Reset performance dashboard state
  const handleResetDashboard = () => {
    setDashboardGenerated(false);
    setGeneratedContent('');
  };

  // Helper function to call the revision sheet API
  const callRevisionSheetAPI = async (modelId: string, params: { 
    subject: string; 
    topics: string[]; 
    examDate: string; 
    apiKey: string;
  }): Promise<string> => {
    try {
      // In development or without API key, return mock content
      if (process.env.NODE_ENV === 'development' || !params.apiKey) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return `# Revision Cheat-Sheet for ${params.subject}

## Key Topics to Focus on
${params.topics.map((topic, i) => `${i+1}. **${topic}**
- Key Formula 1: E = mc²
- Important Concept: Energy and mass are interchangeable
- Must Remember: Conservation of energy applies in all scenarios
`).join('\n')}

## Time Management for ${params.examDate}
- **Days Left**: [Calculated from current date to ${params.examDate}]
- **Priority Topics**: ${params.topics.slice(0, 2).join(', ')}
- **Daily Revision Plan**: 
  - Spend 30 minutes on formulas
  - 1 hour on conceptual understanding
  - 1.5 hours on practice problems

## Quick Reference Guide
- Common terminology
- Essential equations
- Frequently tested topics
- Critical diagrams & illustrations

*Use this sheet during your final revision. Focus on understanding rather than memorization.*`;
      }
      
      // Create the prompt for the LLM
      const prompt = llmService.createRevisionSheetPrompt(
        params.subject,
        params.topics,
        params.examDate
      );
      
      // Call the appropriate LLM API
      const result = await llmService.callLLM(modelId, prompt, params.apiKey, {
        temperature: 0.5,
        maxTokens: 1500
      });
      
      return result.content;
    } catch (error) {
      console.error("Error calling revision sheet API:", error);
      return "Error generating revision sheet. Please check your API key and try again.";
    }
  };

  // Helper function to call the performance dashboard API
  const callPerformanceDashboardAPI = async (modelId: string, params: { 
    examDate: string; 
    subjects: string[]; 
    apiKey: string;
  }): Promise<string> => {
    try {
      // In development or without API key, return mock content
      if (process.env.NODE_ENV === 'development' || !params.apiKey) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return `# Performance Dashboard
        
## Overall Performance Summary
- **Average Score**: 78.5%
- **Percentile Ranking**: 87th percentile
- **Improvement**: +12% since last assessment
- **Projected Final Score**: 82-86%

## Subject-wise Performance Breakdown
| Subject | Current Score | Trend | Percentile | Status |
|---------|--------------|-------|------------|--------|
| Physics | 82% | ↑ | 92nd | Strong |
| Chemistry | 76% | → | 84th | Good |
| Mathematics | 68% | ↑ | 78th | Needs Improvement |

## Topic-wise Proficiency Analysis for ${params.subjects.join(', ')}
### Physics
- **Strengths**: Mechanics (94%), Optics (88%)
- **Weaknesses**: Thermodynamics (62%), Modern Physics (65%)

### Chemistry
- **Strengths**: Organic Chemistry (85%), Chemical Bonding (82%)
- **Weaknesses**: Electrochemistry (64%), Coordination Compounds (68%)

### Mathematics
- **Strengths**: Algebra (79%), Coordinate Geometry (76%)
- **Weaknesses**: Calculus (58%), Vectors (62%)

## Recommendations for Improvement
1. Focus on strengthening Calculus concepts, particularly integration techniques
2. Dedicate more time to Thermodynamics and Modern Physics
3. Practice more numerical problems in Electrochemistry
4. Maintain the strong performance in Mechanics and Organic Chemistry

## Practice Test Performance (Last 30 days)
- **Tests Taken**: 12
- **Average Score**: 75.8%
- **Highest Score**: 84% (Physics)
- **Lowest Score**: 64% (Mathematics - Calculus)

## Time Management Analysis
- **Average Time per Question**: 1.8 minutes
- **Time Spent on Difficult Questions**: 3.2 minutes
- **Recommendation**: Work on reducing time spent on difficult questions

*This dashboard is updated as of ${params.examDate}. Continue focusing on your weak areas for maximum improvement before the exam.*`;
      }
      
      // Create the prompt for the LLM
      const prompt = llmService.createPerformanceDashboardPrompt(
        params.examDate,
        params.subjects
      );
      
      // Call the appropriate LLM API
      const result = await llmService.callLLM(modelId, prompt, params.apiKey, {
        temperature: 0.5,
        maxTokens: 1500
      });
      
      return result.content;
    } catch (error) {
      console.error("Error calling performance dashboard API:", error);
      return "Error generating performance dashboard. Please check your API key and try again.";
    }
  };

  // Helper function to call the flashcards API
  const callFlashcardsAPI = async (modelId: string, params: {
    subject: string;
    topics: string[];
    includeFormulas: boolean;
    apiKey: string;
  }): Promise<string> => {
    try {
      // Create the prompt for the LLM
      const prompt = llmService.createFlashcardsPrompt(
        params.subject,
        params.topics,
        params.includeFormulas
      );
      
      // In development or without API key, return mock content
      if (process.env.NODE_ENV === 'development' || !params.apiKey) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate topic-specific content
        const topicContent = params.topics.length > 0 
          ? params.topics.map(topic => `## ${topic} Flashcards\n\n1. **Question**: What is the definition of ${topic}?\n   **Answer**: This is a key concept in ${params.subject}.\n\n2. **Question**: What are the applications of ${topic}?\n   **Answer**: ${topic} is applied in various scenarios.\n\n`).join('\n')
          : `## ${params.subject} Flashcards\n\n1. **Question**: What is an important concept in ${params.subject}?\n   **Answer**: This is a foundational concept.\n\n2. **Question**: How do we apply ${params.subject} principles?\n   **Answer**: Through careful analysis and application.\n\n`;
        
        // Add formula sheet if requested
        let formulaSheet = '';
        if (params.includeFormulas) {
          formulaSheet = `\n\n# ${params.subject} Formula Sheet\n\n`;
          formulaSheet += `## Key Formulas\n\n`;
          formulaSheet += `1. E = mc²\n`;
          formulaSheet += `2. F = ma\n`;
          formulaSheet += `3. PV = nRT\n\n`;
          formulaSheet += `*This is a sample formula sheet. In a real implementation, formulas would be specific to the selected subject and topics.*`;
        }
        
        return `# ${params.subject} Study Materials\n\n${topicContent}${formulaSheet}`;
      }
      
      // Call the appropriate LLM API
      const result = await llmService.callLLM(modelId, prompt, params.apiKey, {
        temperature: 0.5,
        maxTokens: 2000
      });
      
      return result.content;
    } catch (error) {
      console.error("Error calling flashcards API:", error);
      return "Error generating flashcards. Please check your API key and try again.";
    }
  };

  // Handle export with download
  const handleExport = (format: 'txt' | 'md' = 'txt') => {
    if (!generatedContent) return;
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let fileType = 'Export';
    
    // Determine file type based on active tab
    if (activeTab === 'test-creator') fileType = 'Test';
    else if (activeTab === 'notes') fileType = 'Notes';
    else if (activeTab === 'mcq-creator') fileType = 'MCQs';
    else if (activeTab === 'doubts') fileType = 'Solution';
    else if (activeTab === 'planner') fileType = 'StudyPlan';
    else if (activeTab === 'past-paper') fileType = 'Analysis';
    else if (activeTab === 'flashcards') fileType = 'Flashcards';
    else if (activeTab === 'practice-quiz') fileType = 'Quiz';
    else if (activeTab === 'rank-predictor') fileType = 'RankPrediction';
    else if (activeTab === 'revision') fileType = 'RevisionSheet';
    else if (activeTab === 'performance') fileType = 'Dashboard';
    
    const fileName = `${fileType}_${timestamp}.${format}`;
    
    // Create file and trigger download
    downloadFile(generatedContent, fileName, format === 'md' ? 'text/markdown' : 'text/plain');
  };

  // Reset flashcards state
  const handleResetFlashcards = () => {
    setFlashcardsGenerated(false);
    setGeneratedContent('');
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container py-8"
    >
      <motion.div 
        variants={fadeIn}
        className="mb-8 space-y-2"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1a4480]">AI Teaching Assistant</h1>
            <p className="text-gray-500">Leverage AI to create teaching materials, generate assessments, and help students.</p>
          </div>
          <div>
            <ModelSelector
              models={AVAILABLE_MODELS}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel} 
            />
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="test-creator" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="flex space-x-2 overflow-x-auto mb-8">
          <TabsTrigger value="test-creator" className="data-[state=active]:bg-[#1a4480] data-[state=active]:text-white">
            Test Creator
          </TabsTrigger>
          <TabsTrigger value="lesson-plan" className="data-[state=active]:bg-[#1a4480] data-[state=active]:text-white">
            Lesson Plans
          </TabsTrigger>
          <TabsTrigger value="assignment-creator" className="data-[state=active]:bg-[#1a4480] data-[state=active]:text-white">
            Assignment Creator
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-[#1a4480] data-[state=active]:text-white">
            Performance Analytics
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="data-[state=active]:bg-[#1a4480] data-[state=active]:text-white">
            Flashcards & Formulas
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <TabsContent value="test-creator" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1a4480]">AI Test Creator</CardTitle>
                  <CardDescription>
                    Upload a book or document and generate comprehensive tests with different difficulty levels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!documentUploaded ? (
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="subject">Subject</Label>
                        <Select 
                          value={testParams.subject} 
                          onValueChange={(value) => setTestParams({...testParams, subject: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                            <SelectItem value="computerScience">Computer Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <Select 
                          value={testParams.difficulty} 
                          onValueChange={(value) => setTestParams({...testParams, difficulty: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="questionCount">Number of Questions</Label>
                        <Input 
                          type="number" 
                          id="questionCount" 
                          min={1} 
                          max={50} 
                          value={testParams.questionCount} 
                          onChange={(e) => setTestParams({...testParams, questionCount: parseInt(e.target.value) || 10})}
                        />
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="examDuration">Exam Duration (minutes)</Label>
                        <Input 
                          type="number" 
                          id="examDuration" 
                          min={5} 
                          max={180} 
                          value={testParams.examDuration} 
                          onChange={(e) => setTestParams({...testParams, examDuration: parseInt(e.target.value) || 60})}
                        />
                      </div>
                      
                      <div className="border rounded-md p-4 space-y-2">
                        <Label>Upload Study Material</Label>
                        <FileUploader 
                          onFilesUploaded={handleDocumentUpload}
                          acceptedFileTypes={{
                            'application/pdf': ['.pdf'],
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                            'application/msword': ['.doc'],
                          }}
                          maxFiles={1}
                          maxSize={10 * 1024 * 1024} // 10MB
                        >
                          <div className="flex flex-col items-center justify-center py-8 px-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer">
                            <Upload className="h-10 w-10 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-600 mb-1">Drag & drop or click to upload</p>
                            <p className="text-xs text-gray-500">PDF, DOCX (Max 10MB)</p>
                          </div>
                        </FileUploader>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-blue-50 rounded-md">
                        <BookOpen className="h-6 w-6 text-[#1a4480] mr-3" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{documentName}</p>
                          <p className="text-xs text-gray-500">File uploaded successfully</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleReset}>Change</Button>
                      </div>
                      
                      {generatedContent ? (
                        <div className="p-4 border rounded-md bg-white">
                          <h3 className="font-semibold mb-2">Generated Test</h3>
                          <p>{generatedContent}</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">Click generate to create a test based on the uploaded document with your selected parameters:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Subject: <span className="font-medium">{testParams.subject || "Not specified"}</span></li>
                            <li>Difficulty: <span className="font-medium capitalize">{testParams.difficulty}</span></li>
                            <li>Questions: <span className="font-medium">{testParams.questionCount}</span></li>
                            <li>Duration: <span className="font-medium">{testParams.examDuration} minutes</span></li>
                            <li>Model: <span className="font-medium">{AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name || selectedModel}</span></li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  {!documentUploaded ? (
                    isLoading ? (
                      <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading
                      </Button>
                    ) : (
                      <Button disabled={!testParams.subject}>Upload Document</Button>
                    )
                  ) : (
                    generatedContent ? (
                      <>
                        <Button variant="outline" onClick={handleReset}>Reset</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Download Test
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleExport('txt')}>
                              Text File (.txt)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                              Markdown (.md)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      isLoading ? (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating
                        </Button>
                      ) : (
                        <Button onClick={handleGenerate}>Generate Test</Button>
                      )
                    )
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1a4480]">AI Notes Generator</CardTitle>
                  <CardDescription>
                    Transform your curriculum materials into comprehensive study notes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!documentUploaded ? (
                    <div className="border rounded-md p-4 space-y-2">
                      <Label>Upload Study Material</Label>
                      <FileUploader 
                        onFilesUploaded={handleDocumentUpload}
                        acceptedFileTypes={{
                          'application/pdf': ['.pdf'],
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                          'application/msword': ['.doc'],
                        }}
                        maxFiles={1}
                        maxSize={10 * 1024 * 1024} // 10MB
                      >
                        <div className="flex flex-col items-center justify-center py-8 px-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer">
                          <Upload className="h-10 w-10 text-gray-400 mb-3" />
                          <p className="text-sm text-gray-600 mb-1">Drag & drop or click to upload</p>
                          <p className="text-xs text-gray-500">PDF, DOCX (Max 10MB)</p>
                        </div>
                      </FileUploader>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-blue-50 rounded-md">
                        <BookOpen className="h-6 w-6 text-[#1a4480] mr-3" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{documentName}</p>
                          <p className="text-xs text-gray-500">File uploaded successfully</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleReset}>Change</Button>
                      </div>
                      
                      {generatedContent ? (
                        <div className="p-4 border rounded-md bg-white">
                          <h3 className="font-semibold mb-2">Generated Notes</h3>
                          <p>{generatedContent}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label>Notes Format</Label>
                          <Select defaultValue="concise">
                            <SelectTrigger>
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="concise">Concise</SelectItem>
                              <SelectItem value="detailed">Detailed</SelectItem>
                              <SelectItem value="simplified">Simplified (for beginners)</SelectItem>
                              <SelectItem value="advanced">Advanced (with examples)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  {!documentUploaded ? (
                    isLoading ? (
                      <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading
                      </Button>
                    ) : (
                      <Button>Upload Document</Button>
                    )
                  ) : (
                    generatedContent ? (
                      <>
                        <Button variant="outline" onClick={handleReset}>Reset</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Download Notes
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleExport('txt')}>
                              Text File (.txt)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                              Markdown (.md)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      isLoading ? (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating
                        </Button>
                      ) : (
                        <Button onClick={handleGenerate}>Generate Notes</Button>
                      )
                    )
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="mcq-creator" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1a4480]">MCQ Creator</CardTitle>
                  <CardDescription>
                    Create multiple choice questions with automatic answer generation and explanations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!documentUploaded ? (
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="subject">Subject</Label>
                        <Select defaultValue="physics">
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                            <SelectItem value="computerScience">Computer Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="mcq-count">Number of MCQs</Label>
                        <Input type="number" id="mcq-count" min={1} max={50} defaultValue={10} />
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Include Answer Explanations</Label>
                        <Select defaultValue="yes">
                          <SelectTrigger>
                            <SelectValue placeholder="Include explanations?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="border rounded-md p-4 space-y-2">
                        <Label>Upload Study Material (Optional)</Label>
                        <FileUploader 
                          onFilesUploaded={handleDocumentUpload}
                          acceptedFileTypes={{
                            'application/pdf': ['.pdf'],
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                            'application/msword': ['.doc'],
                          }}
                          maxFiles={1}
                          maxSize={10 * 1024 * 1024} // 10MB
                        >
                          <div className="flex flex-col items-center justify-center py-8 px-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer">
                            <Upload className="h-10 w-10 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-600 mb-1">Drag & drop or click to upload</p>
                            <p className="text-xs text-gray-500">PDF, DOCX (Max 10MB)</p>
                          </div>
                        </FileUploader>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-blue-50 rounded-md">
                        <BookOpen className="h-6 w-6 text-[#1a4480] mr-3" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{documentName}</p>
                          <p className="text-xs text-gray-500">File uploaded successfully</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleReset}>Change</Button>
                      </div>
                      
                      {generatedContent ? (
                        <div className="p-4 border rounded-md bg-white">
                          <h3 className="font-semibold mb-2">Generated MCQs</h3>
                          <p>{generatedContent}</p>
                        </div>
                      ) : null}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  {!documentUploaded ? (
                    isLoading ? (
                      <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading
                      </Button>
                    ) : (
                      <Button>Upload Document</Button>
                    )
                  ) : (
                    generatedContent ? (
                      <>
                        <Button variant="outline" onClick={handleReset}>Reset</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Download MCQs
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleExport('txt')}>
                              Text File (.txt)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                              Markdown (.md)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      isLoading ? (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating
                        </Button>
                      ) : (
                        <Button onClick={handleGenerate}>Generate MCQs</Button>
                      )
                    )
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="doubts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1a4480]">AI Doubts Clearing</CardTitle>
                  <CardDescription>
                    Help your students clear doubts on various subjects using AI assistance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="doubt-subject">Subject</Label>
                      <Select 
                        value={doubtSubject}
                        onValueChange={setDoubtSubject}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="computerScience">Computer Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="doubt-question">Student's Question</Label>
                      <Textarea 
                        id="doubt-question" 
                        placeholder="Type the student's question here..." 
                        className="min-h-[120px]"
                        value={doubtQuestion}
                        onChange={(e) => setDoubtQuestion(e.target.value)}
                      />
                      {apiError && doubtQuestion.trim() === '' && (
                        <p className="text-sm text-red-500 mt-1">{apiError}</p>
                      )}
                    </div>
                    
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Include Step-by-Step Solution</Label>
                      <Select 
                        value={includeSteps}
                        onValueChange={setIncludeSteps}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Include explanations?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {apiError && doubtQuestion.trim() !== '' && (
                      <div className="p-4 border border-red-200 bg-red-50 rounded-md">
                        <p className="text-sm text-red-500">{apiError}</p>
                      </div>
                    )}
                    
                    {generatedContent && (
                      <div className="mt-6 p-4 border rounded-md bg-white">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold">AI Solution</h3>
                          <div className="text-xs text-gray-500">
                            Using {AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name || selectedModel}
                          </div>
                        </div>
                        <div className="text-gray-600 whitespace-pre-line prose max-w-none">
                          {generatedContent}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  {isLoading ? (
                    <Button disabled className="min-w-[150px]">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Solution
                    </Button>
                  ) : (
                    generatedContent ? (
                      <>
                        <Button variant="outline" onClick={handleNewQuestion}>New Question</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button>
                              <FileText className="mr-2 h-4 w-4" />
                              Solution Options
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Solution Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleCopySolution}>
                              Copy to Clipboard
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('txt')}>
                              Download as Text
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                              Download as Markdown
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      <Button 
                        onClick={handleGenerate} 
                        className="flex items-center gap-2"
                        disabled={!doubtQuestion.trim()}
                      >
                        <Send className="h-4 w-4" />
                        <span>Get Solution</span>
                      </Button>
                    )
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="planner" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Study Planner</CardTitle>
                  <CardDescription>
                    Generate a day-by-day study schedule tailored to your exam date and availability.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 max-w-sm">
                    <div className="flex flex-col">
                      <Label htmlFor="examDate">Exam Date</Label>
                      <Input
                        id="examDate"
                        type="date"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="dailyHours">Daily Study Hours</Label>
                      <Input
                        id="dailyHours"
                        type="number"
                        min={1}
                        max={24}
                        value={dailyHours}
                        onChange={(e) => setDailyHours(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    {apiError && (
                      <p className="text-sm text-red-500">{apiError}</p>
                    )}
                  </div>
                  {generatedContent && (
                    <div className="mt-4 p-4 border rounded bg-white whitespace-pre-line">
                      {generatedContent}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating
                    </Button>
                  ) : (
                    <Button onClick={handleGenerate} disabled={isLoading}>
                      Generate Plan
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="past-paper" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Past-Paper & Pattern Analyzer</CardTitle>
                  <CardDescription>
                    Analyze past JEE/NEET papers to identify topic frequencies and patterns.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <FileUploader
                      onFilesUploaded={(files) => setPastPaperFiles(files)}
                      acceptedFileTypes={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={5}
                      maxSize={20 * 1024 * 1024} // 20MB each
                    >
                      <div className="flex flex-col items-center justify-center py-6 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Drag & drop PDFs or click to upload</p>
                        <p className="text-xs text-gray-500">Up to 5 files, max 20MB each</p>
                      </div>
                    </FileUploader>
                    {apiError && (
                      <p className="text-sm text-red-500">{apiError}</p>
                    )}
                    {pastPaperAnalysis && (
                      <div className="mt-4 p-4 border rounded bg-white whitespace-pre-line">
                        {pastPaperAnalysis}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing
                    </Button>
                  ) : (
                    <Button onClick={handleGenerate} disabled={pastPaperFiles.length === 0}>
                      Analyze Papers
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="flashcards" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Flashcards & Formula Sheet</CardTitle>
                  <CardDescription>
                    Generate key-concept flashcards and a consolidated formula sheet.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!flashcardsGenerated ? (
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="flashcard-subject">Subject</Label>
                        <Select 
                          value={flashcardSubject} 
                          onValueChange={setFlashcardSubject}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Select Topics (Optional)</Label>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {flashcardSubject && topicOptions[flashcardSubject]?.map((topic, index) => (
                            <Button
                              key={index}
                              variant={selectedTopics.includes(topic) ? "default" : "outline"}
                              className="text-xs py-1 h-auto"
                              onClick={() => {
                                setSelectedTopics(prev => 
                                  prev.includes(topic) 
                                    ? prev.filter(t => t !== topic) 
                                    : [...prev, topic]
                                );
                              }}
                            >
                              {topic}
                            </Button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">If no topics are selected, all topics will be covered.</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox" 
                          id="include-formulas"
                          checked={includeFormulas}
                          onChange={() => setIncludeFormulas(!includeFormulas)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="include-formulas">Include Formula Sheet</Label>
                      </div>
                      
                      {apiError && (
                        <p className="text-sm text-red-500">{apiError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {generatedContent && (
                        <div className="mt-4 p-4 border rounded bg-white">
                          <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating
                    </Button>
                  ) : (
                    flashcardsGenerated ? (
                      <>
                        <Button variant="outline" onClick={handleResetFlashcards} className="mr-2">
                          Create New Flashcards
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleExport('txt')}>
                              Text File (.txt)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                              Markdown (.md)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      <Button onClick={handleGenerate}>
                        Generate Flashcards
                      </Button>
                    )
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="practice-quiz" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Quiz & Mock Exam</CardTitle>
                  <CardDescription>
                    Create an adaptive practice quiz or full mock exam with scoring.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!quizGenerated ? (
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="quiz-subject">Subject</Label>
                        <Select 
                          value={quizSubject} 
                          onValueChange={setQuizSubject}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="quiz-difficulty">Difficulty Level</Label>
                        <Select 
                          value={quizDifficulty} 
                          onValueChange={setQuizDifficulty}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="question-count">Number of Questions</Label>
                        <Input
                          id="question-count"
                          type="number"
                          min={5}
                          max={50}
                          value={questionCount}
                          onChange={(e) => setQuestionCount(parseInt(e.target.value) || 10)}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox" 
                          id="include-answers"
                          checked={includeAnswers}
                          onChange={() => setIncludeAnswers(!includeAnswers)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="include-answers">Include Answers & Explanations</Label>
                      </div>
                      
                      {apiError && (
                        <p className="text-sm text-red-500">{apiError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {generatedContent && (
                        <div className="mt-4 p-4 border rounded bg-white">
                          <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating
                    </Button>
                  ) : (
                    quizGenerated ? (
                      <>
                        <Button variant="outline" onClick={handleResetQuiz} className="mr-2">
                          Create New Quiz
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleExport('txt')}>
                              Text File (.txt)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                              Markdown (.md)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      <Button onClick={handleGenerate}>
                        Generate Quiz
                      </Button>
                    )
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="rank-predictor" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rank Predictor</CardTitle>
                  <CardDescription>
                    Estimate your JEE/NEET ranking based on mock performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!rankPredicted ? (
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="exam-type">Exam Type</Label>
                        <Select 
                          value={examType} 
                          onValueChange={setExamType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select exam" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="JEE Main">JEE Main</SelectItem>
                            <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
                            <SelectItem value="NEET">NEET</SelectItem>
                            <SelectItem value="BITSAT">BITSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="mock-scores">
                          Mock Test Scores (comma separated)
                        </Label>
                        <Textarea 
                          id="mock-scores" 
                          placeholder="e.g., 75, 82, 79, 85" 
                          value={mockScores}
                          onChange={(e) => setMockScores(e.target.value)}
                        />
                        <p className="text-xs text-gray-500">Enter scores as numbers between 0-100, separated by commas.</p>
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="average-score">Average Score (0-100)</Label>
                        <Input
                          id="average-score"
                          type="number"
                          min={0}
                          max={100}
                          value={averageScore}
                          onChange={(e) => setAverageScore(parseInt(e.target.value) || 0)}
                        />
                      </div>
                      
                      {apiError && (
                        <p className="text-sm text-red-500">{apiError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {generatedContent && (
                        <div className="mt-4 p-4 border rounded bg-white">
                          <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing
                    </Button>
                  ) : (
                    rankPredicted ? (
                      <>
                        <Button variant="outline" onClick={handleResetRankPredictor} className="mr-2">
                          Try Different Scores
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleExport('txt')}>
                              Text File (.txt)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                              Markdown (.md)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      <Button onClick={handleGenerate}>
                        Predict Rank
                      </Button>
                    )
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="revision" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revision Cheat-Sheet</CardTitle>
                  <CardDescription>
                    Create a targeted revision sheet focusing on your weak areas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {generatedContent ? (
                    <div className="mt-4 p-4 border rounded bg-white">
                      <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="revision-subject">Subject</Label>
                        <Input 
                          id="revision-subject"
                          type="text"
                          placeholder="Physics, Chemistry, etc."
                          value={revisionSubject}
                          onChange={(e) => setRevisionSubject(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="revision-topics">Topics (comma separated)</Label>
                        <Textarea 
                          id="revision-topics"
                          placeholder="Kinematics, Thermodynamics, etc."
                          value={revisionTopics.join(', ')}
                          onChange={(e) => setRevisionTopics(e.target.value.split(',').map(t => t.trim()))}
                        />
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="revision-exam-date">Exam Date</Label>
                        <Input 
                          id="revision-exam-date"
                          type="date"
                          value={revisionExamDate}
                          onChange={(e) => setRevisionExamDate(e.target.value)}
                        />
                      </div>
                      
                      {apiError && (
                        <p className="text-sm text-red-500">{apiError}</p>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating
                    </Button>
                  ) : (
                    generatedContent ? (
                      <>
                        <Button variant="outline" onClick={handleResetRevisionSheet} className="mr-2">
                          Create New Sheet
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleExport('txt')}>
                              Text File (.txt)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                              Markdown (.md)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      <Button onClick={handleGenerate}>
                        Generate Sheet
                      </Button>
                    )
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Dashboard</CardTitle>
                  <CardDescription>
                    Visualize your progress, strengths, and weaknesses over time.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!dashboardGenerated ? (
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="dashboard-exam-date">Target Exam Date</Label>
                        <Input
                          id="dashboard-exam-date"
                          type="date"
                          value={dashboardExamDate}
                          onChange={(e) => setDashboardExamDate(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="dashboard-subjects">Subjects to Analyze</Label>
                        <MultiSelect
                          options={[
                            { value: "physics", label: "Physics" },
                            { value: "chemistry", label: "Chemistry" },
                            { value: "mathematics", label: "Mathematics" },
                            { value: "biology", label: "Biology" }
                          ]}
                          selected={dashboardSubjects}
                          onChange={setDashboardSubjects}
                          placeholder="Select subjects"
                        />
                      </div>
                      
                      {apiError && (
                        <p className="text-sm text-red-500">{apiError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {generatedContent && (
                        <div className="mt-4 p-4 border rounded bg-white">
                          <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating
                    </Button>
                  ) : (
                    dashboardGenerated ? (
                      <>
                        <Button variant="outline" onClick={handleResetDashboard} className="mr-2">
                          Create New Dashboard
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleExport('txt')}>
                              Text File (.txt)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                              Markdown (.md)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      <Button onClick={handleGenerate}>
                        Generate Dashboard
                      </Button>
                    )
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default AIAssistant; 