import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SubjectType } from '@/types';
import { 
  Search, Plus, Filter, MoreHorizontal, Calendar, 
  Download, Edit, Copy, Trash2, Eye, Share2, Clock,
  Users, CheckCircle2, XCircle
} from 'lucide-react';

// Mock data for tests
const MOCK_TESTS = [
  {
    id: '1',
    title: 'Physics Mid-Term Exam',
    subjectType: SubjectType.PHYSICS,
    topic: 'Mechanics, Waves, Optics',
    totalMarks: 100,
    totalQuestions: 25,
    duration: 120, // in minutes
    startDate: '2023-07-10T09:00:00',
    endDate: '2023-07-10T11:00:00',
    isPublished: true,
    createdAt: '2023-06-15',
    allowedClasses: ['12A', '12B'],
    submissions: 45,
    totalStudents: 50,
    averageScore: 78.5,
    passingPercentage: 70,
  },
  {
    id: '2',
    title: 'Chemistry Quiz - Periodic Table',
    subjectType: SubjectType.CHEMISTRY,
    topic: 'Periodic Table',
    totalMarks: 20,
    totalQuestions: 10,
    duration: 30, // in minutes
    startDate: '2023-07-12T14:00:00',
    endDate: '2023-07-12T14:30:00',
    isPublished: true,
    createdAt: '2023-06-18',
    allowedClasses: ['12A', '12B'],
    submissions: 48,
    totalStudents: 50,
    averageScore: 85.2,
    passingPercentage: 60,
  },
  {
    id: '3',
    title: 'Mathematics Assignment - Calculus',
    subjectType: SubjectType.MATHEMATICS,
    topic: 'Calculus, Limits, Derivatives',
    totalMarks: 50,
    totalQuestions: 15,
    duration: 60, // in minutes
    startDate: '2023-07-15T10:00:00',
    endDate: '2023-07-15T11:00:00',
    isPublished: false,
    createdAt: '2023-06-20',
    allowedClasses: ['12A', '12B'],
    submissions: 0,
    totalStudents: 50,
    averageScore: 0,
    passingPercentage: 60,
  },
  {
    id: '4',
    title: 'Biology Test - Plant Physiology',
    subjectType: SubjectType.BIOLOGY,
    topic: 'Plant Physiology, Photosynthesis',
    totalMarks: 80,
    totalQuestions: 20,
    duration: 90, // in minutes
    startDate: '2023-07-18T13:00:00',
    endDate: '2023-07-18T14:30:00',
    isPublished: true,
    createdAt: '2023-06-22',
    allowedClasses: ['12A'],
    submissions: 22,
    totalStudents: 25,
    averageScore: 72.4,
    passingPercentage: 65,
  },
  {
    id: '5',
    title: 'Physics Lab Test - Electricity',
    subjectType: SubjectType.PHYSICS,
    topic: 'Electricity, Circuits',
    totalMarks: 30,
    totalQuestions: 15,
    duration: 45, // in minutes
    startDate: '2023-07-20T09:00:00',
    endDate: '2023-07-20T09:45:00',
    isPublished: false,
    createdAt: '2023-06-25',
    allowedClasses: ['12B'],
    submissions: 0,
    totalStudents: 25,
    averageScore: 0,
    passingPercentage: 65,
  },
];

// Today's date for comparing with test dates
const TODAY = new Date();

const TestManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft' | 'completed' | 'upcoming'>('all');

  // Filter tests based on search and filters
  const filteredTests = MOCK_TESTS.filter(test => {
    const matchesSearch = 
      searchQuery === '' || 
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || test.subjectType === selectedSubject;
    
    let matchesStatus = true;
    if (selectedStatus !== 'all') {
      const testStartDate = new Date(test.startDate);
      const testEndDate = new Date(test.endDate);
      
      if (selectedStatus === 'published') {
        matchesStatus = test.isPublished;
      } else if (selectedStatus === 'draft') {
        matchesStatus = !test.isPublished;
      } else if (selectedStatus === 'completed') {
        matchesStatus = testEndDate < TODAY && test.isPublished;
      } else if (selectedStatus === 'upcoming') {
        matchesStatus = testStartDate > TODAY && test.isPublished;
      }
    }
    
    return matchesSearch && matchesSubject && matchesStatus;
  });
  
  // Get test status for display
  const getTestStatus = (test: typeof MOCK_TESTS[0]) => {
    const testStartDate = new Date(test.startDate);
    const testEndDate = new Date(test.endDate);
    
    if (!test.isPublished) {
      return { label: 'Draft', className: 'bg-muted text-muted-foreground' };
    } else if (testEndDate < TODAY) {
      return { label: 'Completed', className: 'bg-green-100 text-green-800' };
    } else if (testStartDate <= TODAY && testEndDate >= TODAY) {
      return { label: 'In Progress', className: 'bg-blue-100 text-blue-800' };
    } else {
      return { label: 'Upcoming', className: 'bg-yellow-100 text-yellow-800' };
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Calculate submission percentage
  const getSubmissionPercentage = (submissions: number, totalStudents: number) => {
    return totalStudents > 0 ? Math.round((submissions / totalStudents) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Management</h1>
          <p className="text-muted-foreground">Create, manage, and analyze your tests</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Results
          </Button>
          <Button className="perplexity-button" onClick={() => window.location.href = '/tests/create'}>
            <Plus className="mr-2 h-4 w-4" /> Create Test
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_TESTS.length}</div>
            <p className="text-xs text-muted-foreground">
              {MOCK_TESTS.filter(t => t.isPublished).length} published, {MOCK_TESTS.filter(t => !t.isPublished).length} drafts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_TESTS.reduce((sum, test) => sum + test.submissions, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(MOCK_TESTS.reduce((sum, test) => sum + test.submissions, 0) / 
              MOCK_TESTS.reduce((sum, test) => sum + test.totalStudents, 0) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(MOCK_TESTS.filter(t => t.submissions > 0).reduce((sum, test) => sum + test.averageScore, 0) / 
              MOCK_TESTS.filter(t => t.submissions > 0).length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all completed tests
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_TESTS.filter(t => t.isPublished && new Date(t.startDate) > TODAY).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Next: {MOCK_TESTS.filter(t => t.isPublished && new Date(t.startDate) > TODAY)
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0]?.title || 'None'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle>Your Tests</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tests..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                defaultValue="all"
                onValueChange={(value) => setSelectedSubject(value as SubjectType | 'all')}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Subject" />
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
              <Select 
                defaultValue="all"
                onValueChange={(value) => setSelectedStatus(value as typeof selectedStatus)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="grid" className="p-4">
            <div className="flex justify-between items-center pb-4">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="mt-0">
              {filteredTests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTests.map((test) => {
                    const status = getTestStatus(test);
                    const submissionPercentage = getSubmissionPercentage(test.submissions, test.totalStudents);
                    
                    return (
                      <Card key={test.id} className="overflow-hidden">
                        <div className={`h-1 w-full ${status.className.includes('bg-') ? status.className : 'bg-primary'}`}></div>
                        <CardHeader className="p-4 pb-0">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg line-clamp-1">{test.title}</CardTitle>
                            <Badge variant="outline" className={status.className}>
                              {status.label}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center mt-1">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {formatDate(test.startDate)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              {test.duration} mins
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              {test.totalMarks} marks
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Users className="h-3.5 w-3.5 mr-1" />
                              {test.allowedClasses.join(', ')}
                            </div>
                          </div>
                          
                          <div className="text-xs text-muted-foreground mb-4">
                            {test.topic}
                          </div>
                          
                          {test.isPublished && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <div>Submissions</div>
                                <div className="font-medium">
                                  {test.submissions}/{test.totalStudents}
                                </div>
                              </div>
                              <Progress value={submissionPercentage} className="h-2" />
                              
                              {test.submissions > 0 && (
                                <div className="flex items-center justify-between text-sm mt-2">
                                  <div>Average Score</div>
                                  <div className={`font-medium ${test.averageScore >= test.passingPercentage ? 'text-green-600' : 'text-red-600'}`}>
                                    {test.averageScore}%
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="flex space-x-2 mt-4">
                            {test.isPublished ? (
                              <>
                                <Button variant="outline" size="sm" className="flex-grow">
                                  <Eye className="h-3.5 w-3.5 mr-1" /> Results
                                </Button>
                                <Button variant="outline" size="sm" className="flex-grow">
                                  <Share2 className="h-3.5 w-3.5 mr-1" /> Share
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button variant="outline" size="sm" className="flex-grow">
                                  <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                                </Button>
                                <Button size="sm" className="flex-grow">
                                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Publish
                                </Button>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <XCircle className="mx-auto h-12 w-12 opacity-30 mb-2" />
                  <h3 className="font-medium text-lg mb-1">No tests found</h3>
                  <p>Try adjusting your filters or create a new test.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="table" className="mt-0">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Subject/Topic</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submissions</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.length > 0 ? (
                      filteredTests.map((test) => {
                        const status = getTestStatus(test);
                        
                        return (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">
                              {test.title}
                              <div className="text-xs text-muted-foreground">{test.totalMarks} marks • {test.duration} mins</div>
                            </TableCell>
                            <TableCell>
                              <div>{test.subjectType.charAt(0).toUpperCase() + test.subjectType.slice(1).toLowerCase()}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[150px]">{test.topic}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-xs">
                                <div>Start: {formatDate(test.startDate)}</div>
                                <div>End: {formatDate(test.endDate)}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={status.className}>
                                {status.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {test.isPublished ? (
                                <div>
                                  <div className="text-sm">{test.submissions}/{test.totalStudents}</div>
                                  <Progress 
                                    value={getSubmissionPercentage(test.submissions, test.totalStudents)} 
                                    className="h-2 mt-1" 
                                  />
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-sm">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {test.submissions > 0 ? (
                                <div className={`font-medium ${test.averageScore >= test.passingPercentage ? 'text-green-600' : 'text-red-600'}`}>
                                  {test.averageScore}%
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-sm">—</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {test.isPublished ? (
                                    <>
                                      <DropdownMenuItem>
                                        <Eye className="mr-2 h-4 w-4" /> View Results
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Share2 className="mr-2 h-4 w-4" /> Share Test
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Download className="mr-2 h-4 w-4" /> Export Results
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                                      </DropdownMenuItem>
                                    </>
                                  ) : (
                                    <>
                                      <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" /> Edit Test
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <CheckCircle2 className="mr-2 h-4 w-4" /> Publish
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-[100px] text-center">
                          No tests found. Try adjusting your filters or create a new test.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestManagementPage; 