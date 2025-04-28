import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BarChart3, 
  PlusCircle, 
  Trash2, 
  Play, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Save,
  X
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Progress } from '@/components/ui/progress';

// Types
interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  active: boolean;
  timeLimit?: number;
  correctOptionId?: string;
  responseCount: number;
}

interface LivePollProps {
  onPollCreated?: (poll: Poll) => void;
  onPollEnded?: (results: any) => void;
  onStudentVote?: (pollId: string, optionId: string) => void;
  className?: string;
  initialPolls?: Poll[];
  isTeacher?: boolean;
}

const LivePoll: React.FC<LivePollProps> = ({
  onPollCreated,
  onPollEnded,
  onStudentVote,
  className = '',
  initialPolls = [],
  isTeacher
}) => {
  // Auth context
  const { user } = useAuth();
  const teacherRole = isTeacher !== undefined ? isTeacher : user?.role === UserRole.TEACHER;
  
  // State
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [activePoll, setActivePoll] = useState<Poll | null>(null);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState<string[]>(['', '']);
  const [isCreatingPoll, setIsCreatingPoll] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voted, setVoted] = useState<Record<string, boolean>>({});
  const [timeLimit, setTimeLimit] = useState(30);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  // Timer for active poll
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    
    if (activePoll && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerId as NodeJS.Timeout);
            // Auto-end poll when time is up
            if (teacherRole) {
              handleEndPoll(activePoll.id);
            } else {
              setShowResults(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [activePoll, timeLeft, teacherRole]);
  
  // Check for active polls from initial polls
  useEffect(() => {
    const active = initialPolls.find(poll => poll.active);
    if (active) {
      setActivePoll(active);
      if (active.timeLimit) {
        setTimeLeft(active.timeLimit);
      }
    }
  }, [initialPolls]);
  
  // Create a new poll (teacher only)
  const handleCreatePoll = () => {
    if (!newPollQuestion.trim() || newPollOptions.some(opt => !opt.trim())) {
      toast({
        title: 'Invalid Poll',
        description: 'Please provide a question and all options',
        variant: 'destructive',
      });
      return;
    }
    
    // Create a new poll object
    const newPoll: Poll = {
      id: `poll-${Date.now()}`,
      question: newPollQuestion,
      options: newPollOptions.map((text, index) => ({
        id: `option-${Date.now()}-${index}`,
        text,
        votes: 0
      })),
      active: false,
      timeLimit: timeLimit > 0 ? timeLimit : undefined,
      correctOptionId: correctOptionIndex !== null 
        ? `option-${Date.now()}-${correctOptionIndex}` 
        : undefined,
      responseCount: 0
    };
    
    // Add to polls
    setPolls(prev => [...prev, newPoll]);
    
    // Reset form
    setNewPollQuestion('');
    setNewPollOptions(['', '']);
    setTimeLimit(30);
    setCorrectOptionIndex(null);
    setIsCreatingPoll(false);
    
    // Notify parent
    onPollCreated?.(newPoll);
    
    toast({
      title: 'Poll Created',
      description: 'Your poll has been created successfully',
    });
  };
  
  // Start a poll (teacher only)
  const handleStartPoll = (pollId: string) => {
    // Find the poll to activate
    const pollToActivate = polls.find(p => p.id === pollId);
    
    if (!pollToActivate) {
      toast({
        title: 'Poll Not Found',
        description: 'The selected poll does not exist',
        variant: 'destructive',
      });
      return;
    }
    
    // If another poll is already active, end it first
    if (activePoll) {
      handleEndPoll(activePoll.id);
    }
    
    // Update the polls list
    setPolls(prev => prev.map(poll => 
      poll.id === pollId 
        ? { ...poll, active: true } 
        : { ...poll, active: false }
    ));
    
    // Set as active poll
    setActivePoll(pollToActivate);
    
    // Start timer if applicable
    if (pollToActivate.timeLimit) {
      setTimeLeft(pollToActivate.timeLimit);
    }
    
    setShowResults(false);
    
    toast({
      title: 'Poll Started',
      description: 'Students can now respond to your poll',
    });
  };
  
  // End a poll (teacher only)
  const handleEndPoll = (pollId: string) => {
    // Find the poll to end
    const pollToEnd = polls.find(p => p.id === pollId);
    
    if (!pollToEnd) return;
    
    // Update the polls list
    setPolls(prev => prev.map(poll => 
      poll.id === pollId ? { ...poll, active: false } : poll
    ));
    
    // Clear active poll
    setActivePoll(null);
    
    // Show results
    setShowResults(true);
    
    // Notify parent
    onPollEnded?.(pollToEnd);
    
    toast({
      title: 'Poll Ended',
      description: 'The poll has been closed',
    });
  };
  
  // Delete a poll (teacher only)
  const handleDeletePoll = (pollId: string) => {
    setPolls(prev => prev.filter(poll => poll.id !== pollId));
    
    if (activePoll?.id === pollId) {
      setActivePoll(null);
    }
  };
  
  // Add option to new poll form
  const handleAddOption = () => {
    if (newPollOptions.length < 6) {
      setNewPollOptions([...newPollOptions, '']);
    } else {
      toast({
        title: 'Maximum Options Reached',
        description: 'You can have a maximum of 6 options',
        variant: 'destructive',
      });
    }
  };
  
  // Remove option from new poll form
  const handleRemoveOption = (index: number) => {
    if (newPollOptions.length <= 2) {
      toast({
        title: 'Minimum Options Required',
        description: 'A poll must have at least 2 options',
        variant: 'destructive',
      });
      return;
    }
    
    const updatedOptions = [...newPollOptions];
    updatedOptions.splice(index, 1);
    setNewPollOptions(updatedOptions);
    
    // Update correct option index if needed
    if (correctOptionIndex !== null) {
      if (correctOptionIndex === index) {
        setCorrectOptionIndex(null);
      } else if (correctOptionIndex > index) {
        setCorrectOptionIndex(correctOptionIndex - 1);
      }
    }
  };
  
  // Student vote on a poll
  const handleVote = (pollId: string, optionId: string) => {
    if (voted[pollId]) {
      toast({
        title: 'Already Voted',
        description: 'You have already submitted a response to this poll',
        variant: 'destructive',
      });
      return;
    }
    
    // Update local state
    setPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        // Increment votes for the selected option
        const updatedOptions = poll.options.map(opt => 
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        
        return { 
          ...poll, 
          options: updatedOptions,
          responseCount: poll.responseCount + 1
        };
      }
      return poll;
    }));
    
    // Mark as voted
    setVoted(prev => ({ ...prev, [pollId]: true }));
    setSelectedOption(optionId);
    
    // Notify parent
    onStudentVote?.(pollId, optionId);
    
    toast({
      title: 'Vote Recorded',
      description: 'Your response has been submitted',
    });
  };
  
  // Calculate result percentages
  const calculatePercentage = (poll: Poll, optionId: string) => {
    if (poll.responseCount === 0) return 0;
    
    const option = poll.options.find(opt => opt.id === optionId);
    if (!option) return 0;
    
    return Math.round((option.votes / poll.responseCount) * 100);
  };
  
  // Format time left
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-medium flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Live Polls &amp; Quizzes
            </h2>
            <p className="text-sm text-muted-foreground">
              {teacherRole ? 
                "Create and manage instant polls and quizzes for your class" : 
                "Respond to polls and quizzes from your teacher"}
            </p>
          </div>
          
          {teacherRole && !isCreatingPoll && (
            <Button
              onClick={() => setIsCreatingPoll(true)}
              className="whitespace-nowrap"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Poll
            </Button>
          )}
        </div>
      </div>
      
      {/* Poll creation form (teacher only) */}
      {teacherRole && isCreatingPoll && (
        <div className="p-4 border-b">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Poll Question</label>
            <Input
              placeholder="e.g., Solve this NEET question: What is the formula for..."
              value={newPollQuestion}
              onChange={(e) => setNewPollQuestion(e.target.value)}
              className="mb-2"
            />
            
            <div className="flex items-center gap-2 mt-3">
              <label className="block text-sm font-medium">Time Limit (seconds):</label>
              <Input
                type="number"
                min={0}
                max={300}
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
                className="w-20"
              />
              <span className="text-xs text-muted-foreground">(0 for no limit)</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Options</label>
            <p className="text-xs text-muted-foreground mb-2">
              Click the checkbox to mark the correct answer (optional)
            </p>
            
            {newPollOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const updated = [...newPollOptions];
                    updated[index] = e.target.value;
                    setNewPollOptions(updated);
                  }}
                  className="flex-1"
                />
                
                <button
                  type="button"
                  className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    correctOptionIndex === index 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 bg-transparent'
                  }`}
                  onClick={() => setCorrectOptionIndex(
                    correctOptionIndex === index ? null : index
                  )}
                  title="Mark as correct answer"
                >
                  {correctOptionIndex === index && <CheckCircle2 className="h-4 w-4" />}
                </button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveOption(index)}
                  disabled={newPollOptions.length <= 2}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddOption}
              disabled={newPollOptions.length >= 6}
              className="mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreatingPoll(false);
                setNewPollQuestion('');
                setNewPollOptions(['', '']);
                setTimeLimit(30);
                setCorrectOptionIndex(null);
              }}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleCreatePoll}
              disabled={!newPollQuestion.trim() || newPollOptions.some(opt => !opt.trim())}
            >
              <Save className="h-4 w-4 mr-2" />
              Create Poll
            </Button>
          </div>
        </div>
      )}
      
      {/* Active poll (for students) */}
      {!teacherRole && activePoll && (
        <div className="p-4 border-b bg-blue-50 dark:bg-blue-900/20">
          <div className="mb-3">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">{activePoll.question}</h3>
              
              {timeLeft > 0 && (
                <div className="flex items-center text-orange-600 dark:text-orange-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>
            
            {timeLeft > 0 && (
              <Progress value={(timeLeft / (activePoll.timeLimit || 30)) * 100} className="h-1 mb-3" />
            )}
          </div>
          
          <div className="space-y-2 mb-4">
            {activePoll.options.map((option) => (
              <button
                key={option.id}
                className={`w-full text-left px-4 py-3 rounded-lg border ${
                  selectedOption === option.id
                    ? 'bg-blue-100 border-blue-500 dark:bg-blue-900/50 dark:border-blue-400'
                    : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleVote(activePoll.id, option.id)}
                disabled={voted[activePoll.id]}
              >
                {option.text}
              </button>
            ))}
          </div>
          
          {voted[activePoll.id] && (
            <div className="text-center text-green-600 dark:text-green-400 text-sm">
              <CheckCircle2 className="h-4 w-4 inline mr-1" />
              Your response has been recorded
            </div>
          )}
        </div>
      )}
      
      {/* Poll results (when active poll ends) */}
      {showResults && activePoll && (
        <div className="p-4 border-b bg-gray-50 dark:bg-gray-900/50">
          <div className="mb-3">
            <h3 className="font-medium">{activePoll.question}</h3>
            <p className="text-sm text-muted-foreground">
              {activePoll.responseCount} responses
            </p>
          </div>
          
          <div className="space-y-3 mb-4">
            {activePoll.options.map((option) => {
              const percentage = calculatePercentage(activePoll, option.id);
              const isCorrect = activePoll.correctOptionId === option.id;
              
              return (
                <div key={option.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span>{option.text}</span>
                      {isCorrect && (
                        <CheckCircle2 className="h-4 w-4 ml-2 text-green-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        isCorrect 
                          ? 'bg-green-500' 
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-right text-muted-foreground">
                    {option.votes} votes
                  </div>
                </div>
              );
            })}
          </div>
          
          {teacherRole && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResults(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Close Results
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Poll list */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="font-medium mb-4">
          {teacherRole ? "Your Polls" : "Recent Polls"}
        </h3>
        
        {polls.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {teacherRole ? 
              "You haven't created any polls yet" : 
              "No polls available"
            }
          </div>
        ) : (
          <div className="space-y-4">
            {polls.map((poll) => (
              <div 
                key={poll.id} 
                className={`border rounded-lg p-4 ${
                  poll.active 
                    ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{poll.question}</h4>
                  
                  {teacherRole && (
                    <div className="flex items-center gap-2">
                      {!poll.active ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStartPoll(poll.id)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeletePoll(poll.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleEndPoll(poll.id)}
                        >
                          End Poll
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                
                {poll.active && (
                  <div className="text-sm mb-2 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{poll.responseCount} responses so far</span>
                    
                    {poll.timeLimit && timeLeft > 0 && (
                      <div className="ml-auto flex items-center text-orange-600 dark:text-orange-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatTime(timeLeft)}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {teacherRole && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {poll.options.length} options • 
                    {poll.timeLimit ? ` ${poll.timeLimit}s time limit` : ' No time limit'} •
                    {poll.correctOptionId ? ' Has correct answer' : ' No correct answer'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePoll; 