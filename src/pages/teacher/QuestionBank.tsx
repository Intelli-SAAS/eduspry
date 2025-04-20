import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DifficultyLevel, QuestionType, SubjectType } from '@/types';
import { 
  Search, Plus, Filter, MoreHorizontal, BookOpen, BarChart3, 
  Clock, Check, Edit, Copy, Trash2, Download, Upload 
} from 'lucide-react';

// Mock data for question bank
const MOCK_QUESTIONS = [
  {
    id: '1',
    content: 'What is Newton\'s First Law of Motion?',
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: DifficultyLevel.MEDIUM,
    subjectType: SubjectType.PHYSICS,
    topic: 'Mechanics',
    marks: 2,
    createdAt: '2023-05-15',
    options: [
      { id: '1-1', content: 'An object at rest stays at rest unless acted upon by an external force', isCorrect: true },
      { id: '1-2', content: 'Force equals mass times acceleration', isCorrect: false },
      { id: '1-3', content: 'For every action, there is an equal and opposite reaction', isCorrect: false },
      { id: '1-4', content: 'Energy cannot be created or destroyed', isCorrect: false },
    ],
    used: 3,
  },
  {
    id: '2',
    content: 'What is the chemical formula for water?',
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: DifficultyLevel.EASY,
    subjectType: SubjectType.CHEMISTRY,
    topic: 'Chemical Formulas',
    marks: 1,
    createdAt: '2023-05-18',
    options: [
      { id: '2-1', content: 'H2O', isCorrect: true },
      { id: '2-2', content: 'CO2', isCorrect: false },
      { id: '2-3', content: 'NaCl', isCorrect: false },
      { id: '2-4', content: 'C6H12O6', isCorrect: false },
    ],
    used: 5,
  },
  {
    id: '3',
    content: 'Solve the equation: 2x + 5 = 15',
    type: QuestionType.NUMERICAL,
    difficulty: DifficultyLevel.EASY,
    subjectType: SubjectType.MATHEMATICS,
    topic: 'Algebra',
    marks: 2,
    createdAt: '2023-05-20',
    correctAnswer: '5',
    used: 2,
  },
  {
    id: '4',
    content: 'Describe the process of photosynthesis.',
    type: QuestionType.SHORT_ANSWER,
    difficulty: DifficultyLevel.HARD,
    subjectType: SubjectType.BIOLOGY,
    topic: 'Plant Physiology',
    marks: 5,
    createdAt: '2023-05-22',
    correctAnswer: 'Photosynthesis is the process by which plants convert light energy into chemical energy...',
    used: 1,
  },
  {
    id: '5',
    content: 'What is the value of acceleration due to gravity on Earth?',
    type: QuestionType.NUMERICAL,
    difficulty: DifficultyLevel.MEDIUM,
    subjectType: SubjectType.PHYSICS,
    topic: 'Gravitation',
    marks: 1,
    createdAt: '2023-05-25',
    correctAnswer: '9.8',
    used: 4,
  },
  {
    id: '6',
    content: 'Is the statement "All metals are good conductors of electricity" true or false?',
    type: QuestionType.TRUE_FALSE,
    difficulty: DifficultyLevel.EASY,
    subjectType: SubjectType.PHYSICS,
    topic: 'Electricity',
    marks: 1,
    createdAt: '2023-05-27',
    correctAnswer: 'False',
    used: 2,
  },
  {
    id: '7',
    content: 'Match the following elements with their symbols: Sodium, Potassium, Iron, Gold',
    type: QuestionType.MATCH_THE_FOLLOWING,
    difficulty: DifficultyLevel.MEDIUM,
    subjectType: SubjectType.CHEMISTRY,
    topic: 'Elements and Symbols',
    marks: 4,
    createdAt: '2023-05-29',
    options: [
      { id: '7-1', content: 'Na', isCorrect: true, match: 'Sodium' },
      { id: '7-2', content: 'K', isCorrect: true, match: 'Potassium' },
      { id: '7-3', content: 'Fe', isCorrect: true, match: 'Iron' },
      { id: '7-4', content: 'Au', isCorrect: true, match: 'Gold' },
    ],
    used: 1,
  },
];

// Mock data for topics
const MOCK_TOPICS = {
  [SubjectType.PHYSICS]: ['Mechanics', 'Thermodynamics', 'Waves', 'Optics', 'Electricity', 'Magnetism', 'Gravitation'],
  [SubjectType.CHEMISTRY]: ['Chemical Formulas', 'Periodic Table', 'Organic Chemistry', 'Inorganic Chemistry', 'Elements and Symbols'],
  [SubjectType.MATHEMATICS]: ['Algebra', 'Calculus', 'Geometry', 'Trigonometry', 'Statistics'],
  [SubjectType.BIOLOGY]: ['Cell Biology', 'Genetics', 'Plant Physiology', 'Human Anatomy', 'Ecology'],
};

const QuestionBankPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedType, setSelectedType] = useState<QuestionType | 'all'>('all');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  
  // Filter questions based on search and filters
  const filteredQuestions = MOCK_QUESTIONS.filter(question => {
    const matchesSearch = 
      searchQuery === '' || 
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || question.subjectType === selectedSubject;
    const matchesTopic = selectedTopic === 'all' || question.topic === selectedTopic;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || question.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesTopic && matchesDifficulty && matchesType;
  });
  
  // Toggle question selection
  const toggleQuestionSelection = (questionId: string) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    } else {
      setSelectedQuestions([...selectedQuestions, questionId]);
    }
  };
  
  // Select all questions
  const selectAllQuestions = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map(q => q.id));
    }
  };
  
  // Format question type for display
  const formatQuestionType = (type: QuestionType) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };
  
  // Format difficulty for display
  const formatDifficulty = (difficulty: DifficultyLevel) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
  };
  
  // Color mapping for difficulty levels
  const difficultyColors = {
    [DifficultyLevel.EASY]: 'bg-green-100 text-green-800',
    [DifficultyLevel.MEDIUM]: 'bg-blue-100 text-blue-800',
    [DifficultyLevel.HARD]: 'bg-orange-100 text-orange-800',
    [DifficultyLevel.VERY_HARD]: 'bg-red-100 text-red-800',
  };
  
  // Subject icon mapping
  const subjectIcons = {
    [SubjectType.PHYSICS]: <BarChart3 className="h-4 w-4" />,
    [SubjectType.CHEMISTRY]: <BookOpen className="h-4 w-4" />,
    [SubjectType.MATHEMATICS]: <Plus className="h-4 w-4" />,
    [SubjectType.BIOLOGY]: <BookOpen className="h-4 w-4" />,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Question Bank</h1>
          <p className="text-muted-foreground">Manage your questions for tests and quizzes</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="perplexity-button">
                <Plus className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Question</DialogTitle>
                <DialogDescription>
                  Create a new question to add to your question bank.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select defaultValue={SubjectType.PHYSICS}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(SubjectType).map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Select defaultValue={MOCK_TOPICS[SubjectType.PHYSICS][0]}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_TOPICS[SubjectType.PHYSICS].map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Question Type</Label>
                    <Select defaultValue={QuestionType.MULTIPLE_CHOICE}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(QuestionType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {formatQuestionType(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select defaultValue={DifficultyLevel.MEDIUM}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(DifficultyLevel).map((level) => (
                          <SelectItem key={level} value={level}>
                            {formatDifficulty(level)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Question Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter your question here..."
                    className="h-20"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="options">Options (for multiple choice)</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="h-3 w-3 mr-1" /> Add Option
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((optionNum) => (
                      <div key={optionNum} className="flex items-center space-x-2">
                        <Checkbox id={`option-${optionNum}`} />
                        <Input placeholder={`Option ${optionNum}`} />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Check the correct answer(s)
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="marks">Marks</Label>
                    <Input
                      id="marks"
                      type="number"
                      defaultValue="1"
                      min="1"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Estimated Time (seconds)</Label>
                    <Input
                      id="time"
                      type="number"
                      defaultValue="60"
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Question</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-1/4">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine your question search</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject-filter">Subject</Label>
              <Select 
                defaultValue="all"
                onValueChange={(value) => setSelectedSubject(value as SubjectType | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {Object.values(SubjectType).map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topic-filter">Topic</Label>
              <Select 
                defaultValue="all"
                onValueChange={(value) => setSelectedTopic(value)}
                disabled={selectedSubject === 'all'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {selectedSubject !== 'all' && MOCK_TOPICS[selectedSubject].map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty-filter">Difficulty</Label>
              <Select 
                defaultValue="all"
                onValueChange={(value) => setSelectedDifficulty(value as DifficultyLevel | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {Object.values(DifficultyLevel).map((level) => (
                    <SelectItem key={level} value={level}>
                      {formatDifficulty(level)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type-filter">Question Type</Label>
              <Select 
                defaultValue="all"
                onValueChange={(value) => setSelectedType(value as QuestionType | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.values(QuestionType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatQuestionType(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" className="w-full" onClick={() => {
              setSelectedSubject('all');
              setSelectedTopic('all');
              setSelectedDifficulty('all');
              setSelectedType('all');
              setSearchQuery('');
            }}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
        
        <div className="md:w-3/4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CardTitle>Questions</CardTitle>
                  <Badge className="ml-2 bg-secondary text-foreground">
                    {filteredQuestions.length}
                  </Badge>
                </div>
                <div className="relative w-[250px]">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]">
                        <Checkbox 
                          checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                          onCheckedChange={selectAllQuestions}
                        />
                      </TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Subject/Topic</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuestions.length > 0 ? (
                      filteredQuestions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedQuestions.includes(question.id)}
                              onCheckedChange={() => toggleQuestionSelection(question.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="max-w-md truncate">{question.content}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="mr-2">
                                {subjectIcons[question.subjectType as keyof typeof subjectIcons]}
                              </div>
                              <div>
                                <div>{question.subjectType.charAt(0).toUpperCase() + question.subjectType.slice(1).toLowerCase()}</div>
                                <div className="text-xs text-muted-foreground">{question.topic}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatQuestionType(question.type)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={difficultyColors[question.difficulty]}>
                              {formatDifficulty(question.difficulty)}
                            </Badge>
                          </TableCell>
                          <TableCell>{question.marks}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="mr-2 h-4 w-4" /> Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-[100px] text-center">
                          No questions found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {selectedQuestions.length > 0 && (
            <div className="flex justify-between items-center p-2 border rounded-lg bg-background">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium">{selectedQuestions.length} question{selectedQuestions.length > 1 ? 's' : ''} selected</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
                <Button size="sm">Add to Test</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBankPage; 