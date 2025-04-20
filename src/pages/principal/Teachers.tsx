
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, UserPlus, Search } from 'lucide-react';

const TeachersPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Teachers Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Teachers Directory</CardTitle>
          <CardDescription>
            Manage and oversee all teachers in your institution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                className="pl-8"
              />
            </div>
            <select className="border border-input bg-background px-3 py-2 rounded-md">
              <option value="">All Departments</option>
              <option value="science">Science</option>
              <option value="mathematics">Mathematics</option>
              <option value="languages">Languages</option>
              <option value="humanities">Humanities</option>
            </select>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-5 bg-muted/50 p-3 font-medium">
              <div>Name</div>
              <div>Department</div>
              <div>Subjects</div>
              <div>Students</div>
              <div className="text-right">Actions</div>
            </div>
            {[
              { name: "Sarah Johnson", dept: "Science", subjects: "Physics, Chemistry", students: 87 },
              { name: "Mark Wilson", dept: "Science", subjects: "Chemistry, Biology", students: 92 },
              { name: "Lisa Chen", dept: "Mathematics", subjects: "Algebra, Calculus", students: 78 },
              { name: "Robert Miller", dept: "Mathematics", subjects: "Geometry, Statistics", students: 65 },
              { name: "Emily Davis", dept: "Languages", subjects: "English, Literature", students: 103 },
              { name: "James Anderson", dept: "Humanities", subjects: "History, Geography", students: 72 },
              { name: "Patricia Thomas", dept: "Computer Science", subjects: "Programming, Web Development", students: 54 }
            ].map((teacher, i) => (
              <div key={i} className="grid grid-cols-5 border-t p-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {teacher.name}
                </div>
                <div>{teacher.dept}</div>
                <div>{teacher.subjects}</div>
                <div>{teacher.students}</div>
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachersPage;
