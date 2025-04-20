
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, User } from 'lucide-react';

const DepartmentsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
        <Button>Add Department</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { 
            name: "Science", 
            head: "Dr. Sarah Johnson", 
            teachers: 12, 
            students: 345,
            subjects: ["Physics", "Chemistry", "Biology"],
            performanceScore: 88
          },
          { 
            name: "Mathematics", 
            head: "Prof. David Wilson", 
            teachers: 8, 
            students: 276,
            subjects: ["Algebra", "Calculus", "Geometry", "Statistics"],
            performanceScore: 92
          },
          { 
            name: "Languages", 
            head: "Dr. Emily Clark", 
            teachers: 10, 
            students: 312,
            subjects: ["English", "French", "Spanish", "Literature"],
            performanceScore: 85
          },
          { 
            name: "Humanities", 
            head: "Prof. Robert Brown", 
            teachers: 7, 
            students: 198,
            subjects: ["History", "Geography", "Political Science"],
            performanceScore: 82
          },
          { 
            name: "Computer Science", 
            head: "Dr. Michael Zhang", 
            teachers: 5, 
            students: 117,
            subjects: ["Programming", "Web Development", "Data Science"],
            performanceScore: 94
          }
        ].map((dept, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="bg-primary/5">
              <CardTitle>{dept.name}</CardTitle>
              <CardDescription>Head: {dept.head}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{dept.teachers} Teachers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{dept.students} Students</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium mb-1">Performance</div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div 
                      className="h-2 rounded-full bg-primary" 
                      style={{ width: `${dept.performanceScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end text-xs mt-1">{dept.performanceScore}%</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Subjects:</div>
                  <div className="flex flex-wrap gap-1">
                    {dept.subjects.map((subject, j) => (
                      <span 
                        key={j} 
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-muted/30 border-t flex justify-end">
                <Button size="sm" variant="outline" className="mr-2">View Details</Button>
                <Button size="sm">Manage</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsPage;
