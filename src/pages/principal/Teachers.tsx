
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, UserPlus, Search, Filter, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  name: string;
  dept: string;
  subjects: string;
  students: number;
  avatar?: string;
}

const TeachersPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [sortBy, setSortBy] = useState<{ field: keyof Teacher | ''; direction: 'asc' | 'desc' }>({ field: '', direction: 'asc' });

  const departments = ["Science", "Mathematics", "Languages", "Humanities", "Computer Science"];

  const teachers: Teacher[] = [
    { name: "Sarah Johnson", dept: "Science", subjects: "Physics, Chemistry", students: 87 },
    { name: "Mark Wilson", dept: "Science", subjects: "Chemistry, Biology", students: 92 },
    { name: "Lisa Chen", dept: "Mathematics", subjects: "Algebra, Calculus", students: 78 },
    { name: "Robert Miller", dept: "Mathematics", subjects: "Geometry, Statistics", students: 65 },
    { name: "Emily Davis", dept: "Languages", subjects: "English, Literature", students: 103 },
    { name: "James Anderson", dept: "Humanities", subjects: "History, Geography", students: 72 },
    { name: "Patricia Thomas", dept: "Computer Science", subjects: "Programming, Web Development", students: 54 }
  ];

  const handleSort = (field: keyof Teacher) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredTeachers = teachers
    .filter(teacher => 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      teacher.subjects.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(teacher => selectedDepartment ? teacher.dept === selectedDepartment : true)
    .sort((a, b) => {
      if (!sortBy.field) return 0;
      
      const aValue = a[sortBy.field];
      const bValue = b[sortBy.field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortBy.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      } else {
        // For number comparisons
        return sortBy.direction === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

  const handleAddTeacher = () => {
    toast({
      title: "Teacher added successfully",
      description: "The new teacher has been added to the directory",
    });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-1">
            Teachers Management
          </h1>
          <p className="text-sm text-muted-foreground">Manage faculty and staff information</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-xl p-0 overflow-hidden">
            <DialogHeader className="bg-gray-50/80 p-6 border-b">
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Enter the details of the new teacher to add them to your institution.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 p-6">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" placeholder="John Doe" className="rounded-lg" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="department" className="text-sm font-medium">
                  Department
                </label>
                <select className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="subjects" className="text-sm font-medium">
                  Subjects
                </label>
                <Input id="subjects" placeholder="Mathematics, Physics" className="rounded-lg" />
              </div>
            </div>
            <DialogFooter className="p-6 pt-0">
              <Button variant="outline" className="rounded-full">Cancel</Button>
              <Button onClick={handleAddTeacher} className="rounded-full">Add Teacher</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-none">
        <CardHeader className="pb-4 bg-gray-50/80 border-b">
          <CardTitle>Teachers Directory</CardTitle>
          <CardDescription>
            Manage and oversee all teachers in your institution
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers or subjects..."
                className="pl-9 rounded-full bg-gray-50/50 transition-all focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 transition-all rounded-full bg-gray-50/50 hover:bg-white">
                    <Filter className="h-4 w-4" />
                    {selectedDepartment || "All Departments"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] rounded-xl">
                  <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => setSelectedDepartment('')}
                  >
                    All Departments
                  </DropdownMenuItem>
                  {departments.map(dept => (
                    <DropdownMenuItem 
                      key={dept}
                      className="cursor-pointer"
                      onClick={() => setSelectedDepartment(dept)}
                    >
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="rounded-lg border overflow-hidden shadow-sm animate-fade-in">
            <div className="grid grid-cols-5 bg-gray-50/80 py-4 px-4 font-medium text-gray-700">
              <div 
                className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('name')}
              >
                Name
                {sortBy.field === 'name' && (
                  sortBy.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                )}
              </div>
              <div 
                className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('dept')}
              >
                Department
                {sortBy.field === 'dept' && (
                  sortBy.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                )}
              </div>
              <div>Subjects</div>
              <div 
                className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('students')}
              >
                Students
                {sortBy.field === 'students' && (
                  sortBy.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                )}
              </div>
              <div className="text-right">Actions</div>
            </div>
            
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher, i) => (
                <div 
                  key={i} 
                  className="grid grid-cols-5 border-t p-4 hover:bg-gray-50/50 transition-colors animate-slide-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/80 to-purple-500/80 flex items-center justify-center text-white shadow-sm">
                      {teacher.name.split(' ').map(part => part[0]).join('')}
                    </div>
                    <span className="font-medium text-gray-800">{teacher.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-800 font-medium">
                      {teacher.dept}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">{teacher.subjects}</div>
                  <div className="flex items-center text-gray-800 font-medium">{teacher.students}</div>
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="h-8 rounded-full">View</Button>
                    <Button size="sm" variant="outline" className="h-8 rounded-full">Edit</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Contact Teacher</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Schedule Meeting</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive cursor-pointer">
                          Deactivate Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
                <User className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium mb-1">No teachers found</p>
                <p className="text-sm text-gray-400">Try changing your search criteria</p>
              </div>
            )}
          </div>

          {filteredTeachers.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredTeachers.length} of {teachers.length} teachers
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-full" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="rounded-full" disabled>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachersPage;
