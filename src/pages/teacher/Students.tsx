import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, Plus, Mail } from 'lucide-react';

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
    avatar: null,
  },
  {
    id: '5',
    firstName: 'John',
    lastName: 'Miller',
    email: 'john.m@example.com',
    className: '12th Science',
    section: 'A',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    performance: 94,
    avatar: null,
  },
  {
    id: '6',
    firstName: 'Lisa',
    lastName: 'Wilson',
    email: 'lisa.w@example.com',
    className: '12th Science',
    section: 'B',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    performance: 89,
    avatar: null,
  },
];

// Mock class data
const MOCK_CLASSES = ['12th Science', '11th Science'];
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage and view your students' information.</p>
        </div>
        <Button className="perplexity-button">
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Class Overview</CardTitle>
            <CardDescription>Distribution of students across classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{MOCK_STUDENTS.length}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground">Average Performance</p>
                <p className="text-3xl font-bold">
                  {Math.round(MOCK_STUDENTS.reduce((sum, s) => sum + s.performance, 0) / MOCK_STUDENTS.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for student management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex-1">
                <Mail className="mr-2 h-4 w-4" /> Email All
              </Button>
              <Button variant="outline" className="flex-1">Export Data</Button>
              <Button variant="outline" className="flex-1">Import Data</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>View and manage all your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <select 
                className="border rounded-md px-3 py-2 bg-background"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="All">All Classes</option>
                {MOCK_CLASSES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select 
                className="border rounded-md px-3 py-2 bg-background"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="All">All Sections</option>
                {MOCK_SECTIONS.map(s => (
                  <option key={s} value={s}>Section {s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar || undefined} alt={`${student.firstName} ${student.lastName}`} />
                          <AvatarFallback>{getInitials(student.firstName, student.lastName)}</AvatarFallback>
                        </Avatar>
                        <span>{student.firstName} {student.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.className}</TableCell>
                    <TableCell>{student.section}</TableCell>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsPage; 