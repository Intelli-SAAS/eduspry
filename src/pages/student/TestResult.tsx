
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuestionType } from '@/types';
import { Check, X, ArrowLeft, BookOpen } from 'lucide-react';

// Sample test result data
const sampleTestResult = {
  id: '123',
  title: 'Physics Mid-Term Examination',
  score: 75,
  maxScore: 100,
  percentage: 75,
  timeTaken: 45, // minutes
  submittedAt: '2023-10-05T14:30:00',
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
      selectedOption: 'q1-a',
      isCorrect: true,
      explanation: 'Newton (N) is the SI unit of force. It is defined as the force required to accelerate a mass of one kilogram at a rate of one meter per second squared.',
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
      selectedOption: 'q2-c',
      isCorrect: true,
      explanation: 'Velocity is a vector quantity because it has both magnitude (speed) and direction.',
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
      selectedOption: 'q3-d',
      isCorrect: false,
      explanation: 'The boiling point of water at standard atmospheric pressure is 100°C (212°F or 373.15K).',
    },
  ],
};

const TestResultPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  
  // In a real app, would fetch test result from API using testId
  const result = sampleTestResult;
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{result.title} - Results</h1>
          <p className="text-muted-foreground">
            Submitted on {new Date(result.submittedAt).toLocaleDateString()} at{' '}
            {new Date(result.submittedAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/tests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tests
          </Link>
        </Button>
      </div>
      
      {/* Score summary */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {result.percentage}%
            </div>
            <p className="text-sm text-muted-foreground">
              {result.score} of {result.maxScore} points
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Time Taken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {result.timeTaken} min
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Correct Answers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {result.questions.filter(q => q.isCorrect).length}
              <span className="text-base font-normal text-muted-foreground">
                /{result.questions.length}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${
              result.percentage >= 75 ? 'text-green-600' :
              result.percentage >= 60 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {result.percentage >= 75 ? 'Good' :
               result.percentage >= 60 ? 'Average' :
               'Needs Improvement'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Questions review */}
      <div className="border rounded-lg">
        <div className="bg-muted p-4 rounded-t-lg border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Questions Review
          </h2>
        </div>
        
        <div className="divide-y">
          {result.questions.map((question, index) => (
            <div key={question.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex">
                  <div className="mr-4 bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{question.content}</h3>
                  </div>
                </div>
                <div>
                  {question.isCorrect ? (
                    <div className="bg-green-100 text-green-800 rounded-full py-1 px-3 flex items-center text-sm font-medium">
                      <Check className="mr-1 h-4 w-4" />
                      Correct
                    </div>
                  ) : (
                    <div className="bg-red-100 text-red-800 rounded-full py-1 px-3 flex items-center text-sm font-medium">
                      <X className="mr-1 h-4 w-4" />
                      Incorrect
                    </div>
                  )}
                </div>
              </div>
              
              {/* Options */}
              <div className="space-y-3 ml-12">
                {question.options?.map((option) => {
                  const isSelected = question.selectedOption === option.id;
                  let optionClass = '';
                  
                  if (option.isCorrect) {
                    optionClass = 'bg-green-50 border-green-200 text-green-800';
                  } else if (isSelected) {
                    optionClass = 'bg-red-50 border-red-200 text-red-800';
                  }
                  
                  return (
                    <div
                      key={option.id}
                      className={`flex items-center p-3 border rounded-md ${optionClass}`}
                    >
                      <div className="mr-2">
                        {option.isCorrect ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : isSelected ? (
                          <X className="h-5 w-5 text-red-600" />
                        ) : (
                          <div className="w-5 h-5" />
                        )}
                      </div>
                      <span>{option.content}</span>
                      {isSelected && (
                        <span className="ml-2 text-sm">
                          (Your answer)
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Explanation */}
              {question.explanation && (
                <div className="ml-12 mt-4 bg-blue-50 border border-blue-100 p-4 rounded-md text-sm">
                  <div className="font-medium mb-1">Explanation:</div>
                  {question.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestResultPage;
