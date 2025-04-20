
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SubjectType } from '@/types';
import { ArrowRight, BookOpen, Calendar, Clock, FileText, TrendingUp, AlertTriangle } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Welcome, {user?.firstName}
          </h1>
          <p className="text-gray-500 mt-1">Here's an overview of your academic progress</p>
        </div>
        <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-all duration-300">
          <Link to="/tests">
            View Available Tests
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              Upcoming Tests
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              {upcomingTests.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-blue-600 flex items-center">
              <Calendar className="h-3 w-3 mr-1" /> 
              Next test in 3 days
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none bg-gradient-to-br from-green-50 to-emerald-50 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Tests Completed
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              {recentTests.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-600 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last test 3 days ago
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none bg-gradient-to-br from-purple-50 to-fuchsia-50 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">
              Average Score
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              {Math.round(subjectPerformance.reduce((acc, curr) => acc + curr.score, 0) / 
                subjectPerformance.length)}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-purple-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              Across all subjects
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-50 to-orange-50 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">
              Total Study Time
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              42h
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-amber-600 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              This month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardHeader className="border-b bg-gray-50/80">
            <CardTitle className="flex items-center text-gray-800">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Upcoming Tests
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {upcomingTests.length > 0 ? (
              <div>
                {upcomingTests.map(test => (
                  <div 
                    key={test.id} 
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-0"
                  >
                    <div className="flex items-center">
                      <div className={`mr-3 h-3 w-3 rounded-full ${getSubjectColor(test.subject)}`}></div>
                      <div>
                        <div className="font-medium text-gray-800">{test.title}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(test.date).toLocaleDateString()} at {new Date(test.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="rounded-full shadow-sm" asChild>
                      <Link to={`/tests/${test.id}`}>Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <Calendar className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">No upcoming tests scheduled</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardHeader className="border-b bg-gray-50/80">
            <CardTitle className="flex items-center text-gray-800">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Recent Test Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {recentTests.length > 0 ? (
              <div>
                {recentTests.map(test => (
                  <div 
                    key={test.id} 
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-0"
                  >
                    <div className="flex items-center">
                      <div className={`mr-3 h-3 w-3 rounded-full ${getSubjectColor(test.subject)}`}></div>
                      <div>
                        <div className="font-medium text-gray-800">{test.title}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(test.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`mr-4 font-medium ${test.score >= 75 ? 'text-green-600' : test.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {test.score}%
                      </span>
                      <Button size="sm" variant="outline" className="rounded-full" asChild>
                        <Link to={`/tests/${test.id}/result`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <FileText className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">No recent test results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b bg-gray-50/80">
          <CardTitle className="flex items-center text-gray-800">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Subject Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-5">
            {subjectPerformance.map((subject) => (
              <div key={subject.subject} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className={`mr-2 h-3 w-3 rounded-full ${getSubjectColor(subject.subject)}`}></div>
                    <span className="font-medium text-gray-800">{subject.subject}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">
                      {subject.score}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({subject.testsCount} tests)
                    </span>
                  </div>
                </div>
                
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div 
                    className={`${getSubjectColor(subject.subject)} h-2 rounded-full`}
                    style={{ 
                      width: `${subject.score}%`,
                      transition: 'width 1s ease-in-out' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" className="rounded-full shadow-sm hover:shadow-md transition-all duration-300" asChild>
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
