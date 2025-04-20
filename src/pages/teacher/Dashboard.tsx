
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { SchoolIcon, BookOpen, Users, FileText } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome back, {user?.firstName} {user?.lastName}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              +4 enrolled this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Created</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Question Bank</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              +18 added this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Test Submissions</CardTitle>
            <CardDescription>
              View and analyze recent test submissions from your students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 bg-muted/50 p-3 font-medium">
                <div>Test</div>
                <div>Student</div>
                <div>Score</div>
                <div>Date</div>
              </div>
              {[
                { test: "Physics Midterm", student: "John Davis", score: "87/100", date: "Apr 15, 2025" },
                { test: "Chemistry Quiz #3", student: "Emma Wilson", score: "92/100", date: "Apr 14, 2025" },
                { test: "Physics Midterm", student: "Michael Brown", score: "78/100", date: "Apr 14, 2025" },
                { test: "Chemistry Quiz #3", student: "Sophia Martinez", score: "95/100", date: "Apr 13, 2025" },
                { test: "Physics Weekly Quiz", student: "David Johnson", score: "85/100", date: "Apr 12, 2025" }
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-4 border-t p-3">
                  <div>{item.test}</div>
                  <div>{item.student}</div>
                  <div className="font-medium">{item.score}</div>
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

export default TeacherDashboard;
