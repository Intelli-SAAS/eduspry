
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubjectType } from '@/types';
import { Calendar, Clock } from 'lucide-react';

const StudentTestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upcoming');

  // Sample data - in a real app would come from API
  const upcomingTests = [
    {
      id: '1',
      title: 'Physics Mid-Term Examination',
      subject: SubjectType.PHYSICS,
      date: '2023-10-15T10:00:00',
      duration: 60, // minutes
      questions: 25,
      totalMarks: 100,
    },
    {
      id: '2',
      title: 'Chemistry Unit Test',
      subject: SubjectType.CHEMISTRY,
      date: '2023-10-20T14:00:00',
      duration: 45, // minutes
      questions: 20,
      totalMarks: 80,
    },
  ];

  const availableTests = [
    {
      id: '3',
      title: 'Mathematics Practice Quiz',
      subject: SubjectType.MATHEMATICS,
      date: '2023-10-01T00:00:00',
      endDate: '2023-11-01T23:59:59',
      duration: 30, // minutes
      questions: 15,
      totalMarks: 60,
    },
    {
      id: '4',
      title: 'Biology Mock Test',
      subject: SubjectType.BIOLOGY,
      date: '2023-10-05T00:00:00',
      endDate: '2023-10-25T23:59:59',
      duration: 90, // minutes
      questions: 30,
      totalMarks: 120,
    },
  ];

  const pastTests = [
    {
      id: '5',
      title: 'Physics Practice Test',
      subject: SubjectType.PHYSICS,
      date: '2023-09-20T10:00:00',
      duration: 45,
      questions: 20,
      score: 75,
      totalMarks: 80,
    },
    {
      id: '6',
      title: 'Mathematics Weekly Quiz',
      subject: SubjectType.MATHEMATICS,
      date: '2023-09-25T14:00:00',
      duration: 30,
      questions: 15,
      score: 52,
      totalMarks: 60,
    },
  ];

  const getSubjectColor = (subject: SubjectType) => {
    switch (subject) {
      case SubjectType.PHYSICS: return 'border-l-subject-physics';
      case SubjectType.CHEMISTRY: return 'border-l-subject-chemistry';
      case SubjectType.MATHEMATICS: return 'border-l-subject-mathematics';
      case SubjectType.BIOLOGY: return 'border-l-subject-biology';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tests</h1>
      </div>

      <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="past">Past Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingTests.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingTests.map((test) => (
                <Card key={test.id} className={`border-l-4 ${getSubjectColor(test.subject)}`}>
                  <CardHeader>
                    <CardTitle>{test.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(test.date).toLocaleDateString()} at{' '}
                      {new Date(test.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {test.duration} minutes
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span>{test.questions} Questions</span>
                      <span>{test.totalMarks} Marks</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button disabled className="w-full">
                      Available on {new Date(test.date).toLocaleDateString()}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No Upcoming Tests</h3>
              <p className="mt-1 text-muted-foreground">
                You don't have any scheduled tests coming up.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="mt-6">
          {availableTests.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {availableTests.map((test) => (
                <Card key={test.id} className={`border-l-4 ${getSubjectColor(test.subject)}`}>
                  <CardHeader>
                    <CardTitle>{test.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      Available until {new Date(test.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {test.duration} minutes
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span>{test.questions} Questions</span>
                      <span>{test.totalMarks} Marks</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to={`/tests/${test.id}/take`}>Start Test</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No Available Tests</h3>
              <p className="mt-1 text-muted-foreground">
                There are no tests available for you to take right now.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastTests.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {pastTests.map((test) => (
                <Card key={test.id} className={`border-l-4 ${getSubjectColor(test.subject)}`}>
                  <CardHeader>
                    <CardTitle>{test.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(test.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {test.duration} minutes
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span>Score: {test.score} / {test.totalMarks}</span>
                      <span className={`font-medium ${
                        (test.score / test.totalMarks) * 100 >= 75
                          ? 'text-green-600'
                          : (test.score / test.totalMarks) * 100 >= 60
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {Math.round((test.score / test.totalMarks) * 100)}%
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/tests/${test.id}/result`}>View Results</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No Past Tests</h3>
              <p className="mt-1 text-muted-foreground">
                You haven't taken any tests yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentTestsPage;
