import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Loader2, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const TeacherAITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('test-creator');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Test Creator States
  const [testParams, setTestParams] = useState({
    subject: 'physics',
    difficulty: 'medium',
    questionCount: 10,
    examDuration: 60,
    questionTypes: ['mcq', 'short-answer', 'numerical']
  });
  
  // Lesson Plan States
  const [lessonTopic, setLessonTopic] = useState('');
  const [lessonSubject, setLessonSubject] = useState('physics');
  const [lessonDuration, setLessonDuration] = useState(45);
  const [targetGradeLevel, setTargetGradeLevel] = useState('11');
  
  // Assignment Creator States
  const [assignmentSubject, setAssignmentSubject] = useState('physics');
  const [assignmentTopic, setAssignmentTopic] = useState('');
  const [assignmentDifficulty, setAssignmentDifficulty] = useState('medium');
  const [assignmentQuestionCount, setAssignmentQuestionCount] = useState(5);
  
  // Performance Analytics States
  const [performanceClass, setPerformanceClass] = useState('');
  const [testName, setTestName] = useState('');
  const [testDate, setTestDate] = useState('');
  
  // Flashcards & Formula Sheet States
  const [flashcardSubject, setFlashcardSubject] = useState('physics');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [includeFormulas, setIncludeFormulas] = useState(true);
  const [flashcardsGenerated, setFlashcardsGenerated] = useState(false);
  
  // Topic options by subject for flashcards and lesson plans
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
  
  const handleGenerate = () => {
    setIsLoading(true);
    setApiError(null);
    
    // Mock implementation - will be replaced with actual API calls
    setTimeout(() => {
      let mockContent = "This is a placeholder response for " + activeTab;
      setGeneratedContent(mockContent);
      setIsLoading(false);
      
      // Set appropriate states based on the active tab
      if (activeTab === 'flashcards') {
        setFlashcardsGenerated(true);
      }
    }, 1500);
  };
  
  const handleReset = () => {
    setGeneratedContent('');
    if (activeTab === 'flashcards') {
      setFlashcardsGenerated(false);
    }
  };
  
  const handleExport = (format: 'txt' | 'md' = 'txt') => {
    if (!generatedContent) return;
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileType = activeTab === 'test-creator' ? 'Test' : 
                     activeTab === 'lesson-plan' ? 'LessonPlan' : 
                     activeTab === 'flashcards' ? 'Flashcards' : 'Content';
    
    const fileName = `${fileType}_${timestamp}.${format}`;
    
    // Create file and trigger download
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <h1 className="text-3xl font-bold tracking-tight text-[#1a4480]">AI Teaching Tools</h1>
            <p className="text-gray-500">Leverage AI to enhance your teaching and assessment capabilities.</p>
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
          <TabsTrigger value="performance-analytics" className="data-[state=active]:bg-[#1a4480] data-[state=active]:text-white">
            Performance Analytics
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="data-[state=active]:bg-[#1a4480] data-[state=active]:text-white">
            Flashcards Generator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="test-creator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Test Creator</CardTitle>
              <CardDescription>
                Generate customized tests for your students with various question types.
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
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="test-subject">Subject</Label>
                    <Select 
                      value={testParams.subject} 
                      onValueChange={(value) => setTestParams({...testParams, subject: value})}
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
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="test-difficulty">Difficulty Level</Label>
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
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="question-count">Number of Questions</Label>
                    <Input
                      id="question-count"
                      type="number"
                      min={5}
                      max={50}
                      value={testParams.questionCount}
                      onChange={(e) => setTestParams({...testParams, questionCount: parseInt(e.target.value) || 10})}
                    />
                  </div>
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="exam-duration">Exam Duration (minutes)</Label>
                    <Input
                      id="exam-duration"
                      type="number"
                      min={15}
                      max={180}
                      value={testParams.examDuration}
                      onChange={(e) => setTestParams({...testParams, examDuration: parseInt(e.target.value) || 60})}
                    />
                  </div>
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="question-types">Question Types</Label>
                    <MultiSelect
                      options={[
                        {value: 'mcq', label: 'Multiple Choice'},
                        {value: 'short-answer', label: 'Short Answer'},
                        {value: 'numerical', label: 'Numerical'},
                        {value: 'long-answer', label: 'Long Answer'},
                        {value: 'true-false', label: 'True/False'}
                      ]}
                      selected={testParams.questionTypes}
                      onChange={(selected) => setTestParams({...testParams, questionTypes: selected})}
                      placeholder="Select question types"
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
                  Generating Test
                </Button>
              ) : (
                generatedContent ? (
                  <>
                    <Button variant="outline" onClick={handleReset} className="mr-2">
                      Create New Test
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
                    Generate Test
                  </Button>
                )
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="lesson-plan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Lesson Plans</CardTitle>
              <CardDescription>
                Create detailed lesson plans complete with objectives, activities and assessments.
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
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="lesson-subject">Subject</Label>
                    <Select 
                      value={lessonSubject} 
                      onValueChange={setLessonSubject}
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
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="lesson-topic">Topic</Label>
                    <Input
                      id="lesson-topic"
                      placeholder="e.g., Newton's Laws of Motion"
                      value={lessonTopic}
                      onChange={(e) => setLessonTopic(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="lesson-duration">Lesson Duration (minutes)</Label>
                    <Input
                      id="lesson-duration"
                      type="number"
                      min={30}
                      max={120}
                      value={lessonDuration}
                      onChange={(e) => setLessonDuration(parseInt(e.target.value) || 45)}
                    />
                  </div>
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="target-grade">Target Grade Level</Label>
                    <Select 
                      value={targetGradeLevel} 
                      onValueChange={setTargetGradeLevel}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">9th Grade</SelectItem>
                        <SelectItem value="10">10th Grade</SelectItem>
                        <SelectItem value="11">11th Grade</SelectItem>
                        <SelectItem value="12">12th Grade</SelectItem>
                      </SelectContent>
                    </Select>
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
                  Creating Plan
                </Button>
              ) : (
                generatedContent ? (
                  <>
                    <Button variant="outline" onClick={handleReset} className="mr-2">
                      Create New Lesson Plan
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
                  <Button onClick={handleGenerate} disabled={!lessonTopic.trim()}>
                    Generate Lesson Plan
                  </Button>
                )
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignment-creator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Creator</CardTitle>
              <CardDescription>
                Generate homework assignments, practice sheets and exercises.
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
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="assignment-subject">Subject</Label>
                    <Select 
                      value={assignmentSubject} 
                      onValueChange={setAssignmentSubject}
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
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="assignment-topic">Topic</Label>
                    <Input
                      id="assignment-topic"
                      placeholder="e.g., Integration by Parts"
                      value={assignmentTopic}
                      onChange={(e) => setAssignmentTopic(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="assignment-difficulty">Difficulty Level</Label>
                    <Select 
                      value={assignmentDifficulty} 
                      onValueChange={setAssignmentDifficulty}
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
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="assignment-question-count">Number of Questions</Label>
                    <Input
                      id="assignment-question-count"
                      type="number"
                      min={3}
                      max={20}
                      value={assignmentQuestionCount}
                      onChange={(e) => setAssignmentQuestionCount(parseInt(e.target.value) || 5)}
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
                  Creating Assignment
                </Button>
              ) : (
                generatedContent ? (
                  <>
                    <Button variant="outline" onClick={handleReset} className="mr-2">
                      Create New Assignment
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
                  <Button onClick={handleGenerate} disabled={!assignmentTopic.trim()}>
                    Generate Assignment
                  </Button>
                )
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance-analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Analyze student performance data to gain insights and recommendations.
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
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="performance-class">Class/Section</Label>
                    <Input
                      id="performance-class"
                      placeholder="e.g., 12-A"
                      value={performanceClass}
                      onChange={(e) => setPerformanceClass(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="test-name">Test Name</Label>
                    <Input
                      id="test-name"
                      placeholder="e.g., Mid-term Physics Assessment"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="test-date">Test Date</Label>
                    <Input
                      id="test-date"
                      type="date"
                      value={testDate}
                      onChange={(e) => setTestDate(e.target.value)}
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
                  Analyzing
                </Button>
              ) : (
                generatedContent ? (
                  <>
                    <Button variant="outline" onClick={handleReset} className="mr-2">
                      New Analysis
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
                  <Button onClick={handleGenerate} disabled={!performanceClass.trim() || !testName.trim()}>
                    Analyze Performance
                  </Button>
                )
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent key="flashcards" value="flashcards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flashcards & Formula Sheets</CardTitle>
              <CardDescription>
                Create teaching aids, revision materials and formula sheets for your students.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {flashcardsGenerated ? (
                <div className="mt-4 p-4 border rounded bg-white">
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid w-full max-w-xl items-center gap-1.5">
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
                  
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="selected-topics">Topics</Label>
                    <MultiSelect
                      options={
                        topicOptions[flashcardSubject]?.map(topic => ({
                          value: topic.toLowerCase().replace(/\s+/g, '-'),
                          label: topic
                        })) || []
                      }
                      selected={selectedTopics}
                      onChange={setSelectedTopics}
                      placeholder="Select topics"
                    />
                    <p className="text-xs text-gray-500">Select specific topics for your flashcards</p>
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
                    <Button variant="outline" onClick={handleReset} className="mr-2">
                      Create New Materials
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
                    Generate Materials
                  </Button>
                )
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default TeacherAITools; 