
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SchoolAnalytics: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">School Analytics</h1>
        <div className="flex items-center gap-2">
          <select className="border border-input bg-background px-3 py-2 rounded-md">
            <option value="current">Current Semester</option>
            <option value="previous">Previous Semester</option>
            <option value="yearly">Yearly Overview</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Overall Performance Trend</CardTitle>
                <CardDescription>School-wide performance metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  [Performance Chart Visualization]
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Subject Performance Comparison</CardTitle>
                <CardDescription>Average scores across key subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Physics", percentage: 87 },
                    { name: "Chemistry", percentage: 85 },
                    { name: "Mathematics", percentage: 92 },
                    { name: "Biology", percentage: 88 },
                    { name: "Computer Science", percentage: 94 },
                    { name: "English", percentage: 89 },
                    { name: "History", percentage: 82 }
                  ].map((subject) => (
                    <div key={subject.name} className="flex items-center">
                      <div className="w-1/3 font-medium">{subject.name}</div>
                      <div className="w-2/3">
                        <div className="flex-1 space-y-1">
                          <div className="h-2 w-full rounded-full bg-gray-100">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${subject.percentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>{subject.percentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Overall school performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { metric: "Attendance Rate", value: "94.7%", change: "+1.2%" },
                  { metric: "Graduation Rate", value: "98.2%", change: "+0.8%" },
                  { metric: "Avg. Test Score", value: "87/100", change: "+2.1" },
                  { metric: "Student Satisfaction", value: "4.6/5", change: "+0.3" }
                ].map((kpi, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">{kpi.metric}</div>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className="text-xs text-green-600">{kpi.change} from last semester</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Departments Performance Analysis</CardTitle>
              <CardDescription>Detailed metrics for each department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-3 font-medium">
                  <div>Department</div>
                  <div>Avg. Score</div>
                  <div>Teachers</div>
                  <div>Students</div>
                  <div>Pass Rate</div>
                  <div>YoY Change</div>
                </div>
                {[
                  { dept: "Science", score: "87%", teachers: 12, students: 345, passRate: "92%", change: "+2.1%" },
                  { dept: "Mathematics", score: "92%", teachers: 8, students: 276, passRate: "95%", change: "+3.4%" },
                  { dept: "Languages", score: "85%", teachers: 10, students: 312, passRate: "89%", change: "+1.2%" },
                  { dept: "Humanities", score: "82%", teachers: 7, students: 198, passRate: "87%", change: "-0.8%" },
                  { dept: "Computer Science", score: "94%", teachers: 5, students: 117, passRate: "97%", change: "+4.2%" }
                ].map((dept, i) => (
                  <div key={i} className="grid grid-cols-6 border-t p-3">
                    <div className="font-medium">{dept.dept}</div>
                    <div>{dept.score}</div>
                    <div>{dept.teachers}</div>
                    <div>{dept.students}</div>
                    <div>{dept.passRate}</div>
                    <div className={dept.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {dept.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teachers">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Performance Insights</CardTitle>
              <CardDescription>Performance metrics for teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-3 font-medium">
                  <div>Teacher</div>
                  <div>Department</div>
                  <div>Students Passing</div>
                  <div>Avg. Class Score</div>
                  <div>Rating</div>
                </div>
                {[
                  { name: "Sarah Johnson", dept: "Science", passing: "93%", avgScore: "87/100", rating: "4.8/5" },
                  { name: "Mark Wilson", dept: "Science", passing: "91%", avgScore: "85/100", rating: "4.7/5" },
                  { name: "Lisa Chen", dept: "Mathematics", passing: "94%", avgScore: "91/100", rating: "4.9/5" },
                  { name: "Robert Miller", dept: "Mathematics", passing: "89%", avgScore: "84/100", rating: "4.5/5" },
                  { name: "Emily Davis", dept: "Languages", passing: "87%", avgScore: "82/100", rating: "4.6/5" },
                  { name: "James Anderson", dept: "Humanities", passing: "85%", avgScore: "80/100", rating: "4.3/5" },
                  { name: "Patricia Thomas", dept: "Computer Science", passing: "96%", avgScore: "93/100", rating: "4.9/5" }
                ].map((teacher, i) => (
                  <div key={i} className="grid grid-cols-5 border-t p-3">
                    <div>{teacher.name}</div>
                    <div>{teacher.dept}</div>
                    <div>{teacher.passing}</div>
                    <div>{teacher.avgScore}</div>
                    <div>{teacher.rating}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Analytics</CardTitle>
              <CardDescription>Analyze student performance data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                [Student Performance Analytics Dashboard]
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolAnalytics;
