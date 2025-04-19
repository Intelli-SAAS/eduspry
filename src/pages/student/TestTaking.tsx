
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { QuestionType, QuestionOption } from '@/types';
import { AlertCircle, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

// Sample test data
const sampleTest = {
  id: '123',
  title: 'Physics Mid-Term Examination',
  duration: 60, // minutes
  questions: [
    {
      id: 'q1',
      content: 'What is the SI unit of force?',
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { id: 'q1-a', content: 'Newton', isCorrect: true },
        { id: 'q1-b', content: 'Joule', isCorrect: false },
        { id: 'q1-c', content: 'Watt', isCorrect: false },
        { id: 'q1-d', content: 'Pascal', isCorrect: false },
      ],
    },
    {
      id: 'q2',
      content: 'Which of the following is a vector quantity?',
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { id: 'q2-a', content: 'Mass', isCorrect: false },
        { id: 'q2-b', content: 'Temperature', isCorrect: false },
        { id: 'q2-c', content: 'Velocity', isCorrect: true },
        { id: 'q2-d', content: 'Energy', isCorrect: false },
      ],
    },
    {
      id: 'q3',
      content: 'The boiling point of water at standard pressure is:',
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { id: 'q3-a', content: '0°C', isCorrect: false },
        { id: 'q3-b', content: '100°C', isCorrect: true },
        { id: 'q3-c', content: '273K', isCorrect: false },
        { id: 'q3-d', content: '373°C', isCorrect: false },
      ],
    },
  ],
};

const TestTakingPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(sampleTest.duration * 60); // seconds
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [fullscreenExits, setFullscreenExits] = useState(0);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  
  const currentQuestion = sampleTest.questions[currentQuestionIndex];
  
  // Format remaining time as mm:ss
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle answer selection
  const handleSelectAnswer = (optionId: string) => {
    const questionId = currentQuestion.id;
    
    // For multiple choice, we replace the answer
    setAnswers((prev) => ({
      ...prev,
      [questionId]: [optionId],
    }));
  };
  
  // Check if an option is selected
  const isOptionSelected = (optionId: string) => {
    const questionId = currentQuestion.id;
    return answers[questionId]?.includes(optionId) || false;
  };
  
  // Navigate to next/previous question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < sampleTest.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Handle test submission
  const handleSubmitTest = () => {
    // In a real app, would send data to server
    navigate(`/tests/${testId}/result`);
  };
  
  // Check if question is answered
  const isQuestionAnswered = (questionIndex: number) => {
    const questionId = sampleTest.questions[questionIndex].id;
    return !!answers[questionId]?.length;
  };
  
  // Fullscreen detection and handling
  const handleFullscreenChange = useCallback(() => {
    const isDocumentFullscreen = document.fullscreenElement !== null;
    setIsFullScreen(isDocumentFullscreen);
    
    // If exited fullscreen, increment counter and show warning
    if (!isDocumentFullscreen && isFullScreen) {
      setFullscreenExits(prev => prev + 1);
      setShowFullscreenWarning(true);
      setTimeout(() => setShowFullscreenWarning(false), 3000);
    }
  }, [isFullScreen]);
  
  // Request fullscreen
  const requestFullScreen = () => {
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  };
  
  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  // Fullscreen detection effect
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    // Initial fullscreen request on component mount
    requestFullScreen();
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);
  
  // Prevent leaving test accidentally
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  
  return (
    <div className="exam-environment">
      {/* Header with timer */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm p-4 z-10">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div>
            <h2 className="font-bold">{sampleTest.title}</h2>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {sampleTest.questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={isFullScreen ? "ghost" : "destructive"}
              onClick={requestFullScreen}
              className="flex items-center"
            >
              {!isFullScreen && <AlertCircle className="w-4 h-4 mr-2" />}
              {isFullScreen ? "Fullscreen Mode" : "Return to Fullscreen"}
            </Button>
            <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-md">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-mono font-bold">{formatTimeLeft()}</span>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="question-progress mt-4">
          <div 
            className="question-progress-inner" 
            style={{ width: `${((currentQuestionIndex + 1) / sampleTest.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Fullscreen warning */}
      {showFullscreenWarning && (
        <div className="fullscreen-warning">
          Warning: Exiting fullscreen may be reported to your instructor
        </div>
      )}
      
      {/* Main content */}
      <div className="pt-24 pb-24 px-4 max-w-5xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">
              Q{currentQuestionIndex + 1}: {currentQuestion.content}
            </h3>
            
            {currentQuestion.type === QuestionType.MULTIPLE_CHOICE && (
              <RadioGroup
                value={answers[currentQuestion.id]?.[0] || ""}
                onValueChange={handleSelectAnswer}
                className="space-y-4"
              >
                {currentQuestion.options?.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="peer"
                    />
                    <Label htmlFor={option.id} className="flex-grow cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {option.content}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
        </Card>
        
        {/* Question navigation dots */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {sampleTest.questions.map((_, index) => (
            <Button
              key={index}
              variant={currentQuestionIndex === index ? "default" : isQuestionAnswered(index) ? "outline" : "ghost"}
              className={`w-10 h-10 p-0 ${isQuestionAnswered(index) && currentQuestionIndex !== index ? "border-primary text-primary" : ""}`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Footer with navigation buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
        <div className="flex justify-between max-w-5xl mx-auto">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowExitWarning(true)}
            >
              Exit Test
            </Button>
            <Button
              variant="destructive"
              onClick={() => setShowSubmitDialog(true)}
            >
              Submit Test
            </Button>
          </div>
          
          <Button
            variant={currentQuestionIndex === sampleTest.questions.length - 1 ? "default" : "outline"}
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === sampleTest.questions.length - 1}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
      
      {/* Exit warning dialog */}
      <Dialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to exit?</DialogTitle>
            <DialogDescription>
              Your progress will be lost and this will be recorded as an abandoned test.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitWarning(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => navigate('/tests')}>
              Exit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Submit confirmation dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit your test?</DialogTitle>
            <DialogDescription>
              You have answered {Object.keys(answers).length} out of {sampleTest.questions.length} questions.
              {Object.keys(answers).length < sampleTest.questions.length && (
                <p className="mt-2 text-destructive">
                  Warning: {sampleTest.questions.length - Object.keys(answers).length} questions are unanswered.
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Continue Test
            </Button>
            <Button onClick={handleSubmitTest}>
              Submit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestTakingPage;
