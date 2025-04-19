
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SubjectType } from '@/types';
import { ArrowRight, BookOpen, Calendar, Clock, FileText } from 'lucide-react';

// Placeholder dashboard for student
const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  // Sample data - in a real app, these would come from API calls
  const upcomingTests = [
    { id: '1', title: 'Physics Mid-Term', date: '2023-10-10T10:00:00', subject: SubjectType.PHYSICS },
    { id: '2', title: 'Chemistry Unit Test', date: '2023-10-15T14:00:00', subject: SubjectType.CHEMISTRY },
  ];

  const recentTests = [
    { 
      id: '3', 
      title: 'Mathematics Practice Quiz', 
      date: '2023-09-30T09:00:00', 
      score: 85, 
      subject: SubjectType.MATHEMATICS 
    },
  ];

  const subjectPerformance = [
    { subject: SubjectType.PHYSICS, score: 78, testsCount: 5 },
    { subject: SubjectType.CHEMISTRY, score: 82, testsCount: 4 },
    { subject: SubjectType.MATHEMATICS, score: 85, testsCount: 6 },
    { subject: SubjectType.BIOLOGY, score: 76, testsCount: 3 },
  ];

  const getSubjectColor = (subject: SubjectType) => {
    switch (subject) {
      case SubjectType.PHYSICS: return 'bg-subject-physics';
      case SubjectType.CHEMISTRY: return 'bg-subject-chemistry';
      case SubjectType.MATHEMATICS: return 'bg-subject-mathematics';
      case SubjectType.BIOLOGY: return 'bg-subject-biology';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome, {user?.firstName}</h1>
        <Button asChild>
          <Link to="/tests">
            View Available Tests
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Tests
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {upcomingTests.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Next test in 3 days
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tests Completed
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {recentTests.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Last test 3 days ago
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {Math.round(subjectPerformance.reduce((acc, curr) => acc + curr.score, 0) / 
                subjectPerformance.length)}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Across all subjects
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Study Time
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              42h
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              This month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingTests.length > 0 ? (
              <div className="space-y-4">
                {upcomingTests.map(test => (
                  <div key={test.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center">
                      <div className={`mr-3 h-3 w-3 rounded-full ${getSubjectColor(test.subject)}`}></div>
                      <div>
                        <div className="font-medium">{test.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(test.date).toLocaleDateString()} at {new Date(test.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/tests/${test.id}`}>Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No upcoming tests scheduled.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Recent Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentTests.length > 0 ? (
              <div className="space-y-4">
                {recentTests.map(test => (
                  <div key={test.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center">
                      <div className={`mr-3 h-3 w-3 rounded-full ${getSubjectColor(test.subject)}`}></div>
                      <div>
                        <div className="font-medium">{test.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(test.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`mr-4 font-medium ${test.score >= 75 ? 'text-green-600' : test.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {test.score}%
                      </span>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/tests/${test.id}/result`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No recent test results.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Subject Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectPerformance.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`mr-2 h-3 w-3 rounded-full ${getSubjectColor(subject.subject)}`}></div>
                    <span className="font-medium">{subject.subject}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {subject.testsCount} tests
                  </span>
                </div>
                
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div 
                    className={`${getSubjectColor(subject.subject)} h-2`}
                    style={{ width: `${subject.score}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span>{subject.score}%</span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link to="/performance">
            View Detailed Performance
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StudentDashboard;
