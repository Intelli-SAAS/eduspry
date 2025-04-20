
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Teachers Management</h1>
          <p className="text-sm text-muted-foreground">Manage faculty and staff information</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="shadow-sm transition-all duration-200 hover:shadow-md">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Enter the details of the new teacher to add them to your institution.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="department" className="text-sm font-medium">
                  Department
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
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
                <Input id="subjects" placeholder="Mathematics, Physics" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button onClick={handleAddTeacher}>Add Teacher</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-3">
          <CardTitle>Teachers Directory</CardTitle>
          <CardDescription>
            Manage and oversee all teachers in your institution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers or subjects..."
                className="pl-9 bg-gray-50/50 transition-all focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 transition-all bg-gray-50/50 hover:bg-white">
                    <Filter className="h-4 w-4" />
                    {selectedDepartment || "All Departments"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
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
          
          <div className="rounded-md border overflow-hidden">
            <div className="grid grid-cols-5 bg-gray-50/80 p-3 font-medium">
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
                  className="grid grid-cols-5 border-t p-3 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {teacher.name.split(' ').map(part => part[0]).join('')}
                    </div>
                    <span>{teacher.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                      {teacher.dept}
                    </span>
                  </div>
                  <div className="flex items-center">{teacher.subjects}</div>
                  <div className="flex items-center">{teacher.students}</div>
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="h-8">View</Button>
                    <Button size="sm" variant="outline" className="h-8">Edit</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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
              <div className="p-8 text-center text-muted-foreground">
                No teachers found matching your search criteria
              </div>
            )}
          </div>

          {filteredTeachers.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredTeachers.length} of {teachers.length} teachers
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachersPage;
