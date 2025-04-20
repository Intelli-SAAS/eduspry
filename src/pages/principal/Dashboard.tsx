
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { SchoolIcon, Users, User, BookOpen } from 'lucide-react';

const PrincipalDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Principal Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome back, {user?.firstName} {user?.lastName}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              +32 enrolled this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              2 new this semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              All departments active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last semester
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Average scores across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Science", percentage: 88 },
                { name: "Mathematics", percentage: 92 },
                { name: "Languages", percentage: 85 },
                { name: "Humanities", percentage: 82 },
                { name: "Computer Science", percentage: 94 }
              ].map((dept) => (
                <div key={dept.name} className="flex items-center">
                  <div className="w-1/3 font-medium">{dept.name}</div>
                  <div className="w-2/3">
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>{dept.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Teacher Activities</CardTitle>
            <CardDescription>Track teacher engagement and test creation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-3 bg-muted/50 p-3 font-medium">
                <div>Teacher</div>
                <div>Activity</div>
                <div>Date</div>
              </div>
              {[
                { teacher: "Sarah Johnson", activity: "Created Physics Test", date: "Apr 18, 2025" },
                { teacher: "Mark Wilson", activity: "Graded Chemistry Finals", date: "Apr 16, 2025" },
                { teacher: "Lisa Chen", activity: "Updated Question Bank", date: "Apr 15, 2025" },
                { teacher: "Robert Miller", activity: "Scheduled Math Quiz", date: "Apr 14, 2025" },
                { teacher: "Emily Davis", activity: "Submitted Performance Report", date: "Apr 12, 2025" }
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-3 border-t p-3">
                  <div>{item.teacher}</div>
                  <div>{item.activity}</div>
                  <div className="text-muted-foreground">{item.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
