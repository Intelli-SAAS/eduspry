import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoreHorizontal, Search, Plus, Download, Upload, Filter } from 'lucide-react';

// Mock student data
const MOCK_STUDENTS = [
  {
    id: '1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.j@example.com',
    className: '12th Science',
    section: 'A',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    performance: 87,
    attendance: 95,
    avatar: null,
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.w@example.com',
    className: '12th Science',
    section: 'A',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    performance: 92,
    attendance: 98,
    avatar: null,
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.b@example.com',
    className: '12th Science',
    section: 'B',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    performance: 78,
    attendance: 85,
    avatar: null,
  },
  {
    id: '4',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.d@example.com',
    className: '12th Science',
    section: 'B',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    performance: 85,
    attendance: 92,
    avatar: null,
  },
  {
    id: '5',
    firstName: 'John',
    lastName: 'Miller',
    email: 'john.m@example.com',
    className: '11th Science',
    section: 'A',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    performance: 94,
    attendance: 99,
    avatar: null,
  },
  {
    id: '6',
    firstName: 'Lisa',
    lastName: 'Wilson',
    email: 'lisa.w@example.com',
    className: '11th Science',
    section: 'B',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    performance: 89,
    attendance: 91,
    avatar: null,
  },
  {
    id: '7',
    firstName: 'Daniel',
    lastName: 'Taylor',
    email: 'daniel.t@example.com',
    className: '11th Science',
    section: 'A',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    performance: 82,
    attendance: 88,
    avatar: null,
  },
  {
    id: '8',
    firstName: 'Olivia',
    lastName: 'Anderson',
    email: 'olivia.a@example.com',
    className: '11th Science',
    section: 'B',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    performance: 90,
    attendance: 96,
    avatar: null,
  },
];

// Mock data for class and section
const MOCK_CLASSES = ['12th Science', '11th Science', '12th Commerce', '11th Commerce'];
const MOCK_SECTIONS = ['A', 'B', 'C'];

const StudentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');

  // Filter students based on search query and selected filters
  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = 
      searchQuery === '' || 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = selectedClass === 'All' || student.className === selectedClass;
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    
    return matchesSearch && matchesClass && matchesSection;
  });

  // Get student initials for avatar
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get performance color
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'bg-green-100 text-green-800';
    if (performance >= 80) return 'bg-blue-100 text-blue-800';
    if (performance >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Get attendance color
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return 'bg-green-100 text-green-800';
    if (attendance >= 85) return 'bg-blue-100 text-blue-800';
    if (attendance >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Stats data
  const totalStudents = MOCK_STUDENTS.length;
  const avgPerformance = Math.round(MOCK_STUDENTS.reduce((sum, s) => sum + s.performance, 0) / totalStudents);
  const avgAttendance = Math.round(MOCK_STUDENTS.reduce((sum, s) => sum + s.attendance, 0) / totalStudents);
  const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.performance - a.performance).slice(0, 3);

  // Class distribution data
  const classDistribution = MOCK_STUDENTS.reduce((acc, student) => {
    acc[student.className] = (acc[student.className] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage and monitor all student data across the institution.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="perplexity-button">
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{avgPerformance}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{avgAttendance}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Class Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              {Object.entries(classDistribution).map(([className, count]) => (
                <div key={className} className="flex justify-between">
                  <span>{className}:</span>
                  <span className="font-medium">{count} students</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="topPerformers">Top Performers</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="mb-2 text-sm font-medium">Class</p>
                  <select 
                    className="w-full border rounded-md px-2 py-1 text-sm bg-background"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="All">All Classes</option>
                    {MOCK_CLASSES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="p-2">
                  <p className="mb-2 text-sm font-medium">Section</p>
                  <select 
                    className="w-full border rounded-md px-2 py-1 text-sm bg-background"
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                  >
                    <option value="All">All Sections</option>
                    {MOCK_SECTIONS.map(s => (
                      <option key={s} value={s}>Section {s}</option>
                    ))}
                  </select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" /> Import
            </Button>
          </div>
        </div>

        <Card>
          <TabsContent value="all" className="m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class & Section</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar || undefined} alt={`${student.firstName} ${student.lastName}`} />
                          <AvatarFallback>{getInitials(student.firstName, student.lastName)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.firstName} {student.lastName}</div>
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{student.className}</span>
                        <span className="text-xs text-muted-foreground">Section {student.section}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getPerformanceColor(student.performance)}`}>
                        {student.performance}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </Badge>
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
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Performance</DropdownMenuItem>
                          <DropdownMenuItem>Email Student</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="topPerformers" className="m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class & Section</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...filteredStudents]
                  .sort((a, b) => b.performance - a.performance)
                  .map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-bold">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar || undefined} alt={`${student.firstName} ${student.lastName}`} />
                            <AvatarFallback>{getInitials(student.firstName, student.lastName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.firstName} {student.lastName}</div>
                            <div className="text-xs text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{student.className}</span>
                          <span className="text-xs text-muted-foreground">Section {student.section}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getPerformanceColor(student.performance)}`}>
                          {student.performance}%
                        </Badge>
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Performance</DropdownMenuItem>
                            <DropdownMenuItem>Email Student</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="attendance" className="m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class & Section</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...filteredStudents]
                  .sort((a, b) => b.attendance - a.attendance)
                  .map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar || undefined} alt={`${student.firstName} ${student.lastName}`} />
                            <AvatarFallback>{getInitials(student.firstName, student.lastName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.firstName} {student.lastName}</div>
                            <div className="text-xs text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{student.className}</span>
                          <span className="text-xs text-muted-foreground">Section {student.section}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getAttendanceColor(student.attendance)}`}>
                          {student.attendance}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getPerformanceColor(student.performance)}`}>
                          {student.performance}%
                        </Badge>
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Attendance</DropdownMenuItem>
                            <DropdownMenuItem>Email Student</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default StudentsPage; 