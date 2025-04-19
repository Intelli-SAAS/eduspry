
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubjectType } from '@/types';
import { ArrowUpRight, BookOpen, Calendar, ChevronDown, Zap } from 'lucide-react';

// Sample chart component (in real app would use recharts)
const PerformanceChart: React.FC = () => {
  return (
    <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center">
      <p className="text-muted-foreground">Performance Chart (Using recharts in real app)</p>
    </div>
  );
};

// Sample data
const subjectPerformance = [
  {
    subject: SubjectType.PHYSICS,
    percentage: 78,
    testsCount: 5,
    trend: 'up',
    recentScores: [65, 70, 75, 80, 78],
  },
  {
    subject: SubjectType.CHEMISTRY,
    percentage: 82,
    testsCount: 4,
    trend: 'up',
    recentScores: [75, 80, 85, 82],
  },
  {
    subject: SubjectType.MATHEMATICS,
    percentage: 85,
    testsCount: 6,
    trend: 'stable',
    recentScores: [84, 86, 83, 85, 87, 85],
  },
  {
    subject: SubjectType.BIOLOGY,
    percentage: 76,
    testsCount: 3,
    trend: 'down',
    recentScores: [80, 78, 76],
  },
];

const topicPerformance = [
  {
    id: '1',
    name: 'Kinematics',
    subject: SubjectType.PHYSICS,
    percentage: 85,
    testsCount: 3,
    difficulty: 'Medium',
  },
  {
    id: '2',
    name: 'Electrochemistry',
    subject: SubjectType.CHEMISTRY,
    percentage: 92,
    testsCount: 2,
    difficulty: 'Hard',
  },
  {
    id: '3',
    name: 'Calculus',
    subject: SubjectType.MATHEMATICS,
    percentage: 78,
    testsCount: 4,
    difficulty: 'Hard',
  },
  {
    id: '4',
    name: 'Optics',
    subject: SubjectType.PHYSICS,
    percentage: 65,
    testsCount: 2,
    difficulty: 'Medium',
  },
  {
    id: '5',
    name: 'Organic Chemistry',
    subject: SubjectType.CHEMISTRY,
    percentage: 72,
    testsCount: 2,
    difficulty: 'Hard',
  },
];

const recentTests = [
  {
    id: '1',
    title: 'Physics Mid-Term',
    date: '2023-10-05',
    subject: SubjectType.PHYSICS,
    score: 78,
    maxScore: 100,
  },
  {
    id: '2',
    title: 'Chemistry Weekly Quiz',
    date: '2023-10-02',
    subject: SubjectType.CHEMISTRY,
    score: 82,
    maxScore: 100,
  },
  {
    id: '3',
    title: 'Mathematics Practice Test',
    date: '2023-09-28',
    subject: SubjectType.MATHEMATICS,
    score: 85,
    maxScore: 100,
  },
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

const getPerformanceIndicator = (percentage: number) => {
  if (percentage >= 80) return { color: 'text-green-600', label: 'Excellent' };
  if (percentage >= 70) return { color: 'text-green-500', label: 'Good' };
  if (percentage >= 60) return { color: 'text-yellow-500', label: 'Average' };
  if (percentage >= 50) return { color: 'text-yellow-600', label: 'Fair' };
  return { color: 'text-red-500', label: 'Needs Improvement' };
};

const StudentPerformancePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Performance Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your progress across subjects and identify areas for improvement
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="tests">Test History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Overall Performance Trend</CardTitle>
              <CardDescription>Your performance over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Strong Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicPerformance
                    .filter(topic => topic.percentage >= 80)
                    .slice(0, 3)
                    .map(topic => (
                      <div key={topic.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center">
                          <div className={`mr-3 h-3 w-3 rounded-full ${getSubjectColor(topic.subject)}`}></div>
                          <div>
                            <div className="font-medium">{topic.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {topic.subject} • {topic.testsCount} tests
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold text-green-600">{topic.percentage}%</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicPerformance
                    .filter(topic => topic.percentage < 80)
                    .slice(0, 3)
                    .map(topic => (
                      <div key={topic.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center">
                          <div className={`mr-3 h-3 w-3 rounded-full ${getSubjectColor(topic.subject)}`}></div>
                          <div>
                            <div className="font-medium">{topic.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {topic.subject} • {topic.testsCount} tests
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold text-yellow-600">{topic.percentage}%</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTests.map(test => (
                  <div key={test.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center">
                      <div className={`mr-3 h-3 w-3 rounded-full ${getSubjectColor(test.subject)}`}></div>
                      <div>
                        <div className="font-medium">{test.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {test.subject} • {new Date(test.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {test.score} / {test.maxScore}
                      </div>
                      <div className={`text-xs ${getPerformanceIndicator(test.score).color}`}>
                        {Math.round((test.score / test.maxScore) * 100)}% - {getPerformanceIndicator(test.score).label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subjects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Your performance across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjectPerformance.map(subject => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`mr-2 h-3 w-3 rounded-full ${getSubjectColor(subject.subject)}`}></div>
                        <h3 className="font-medium">{subject.subject}</h3>
                        {subject.trend === 'up' && (
                          <ArrowUpRight className="ml-2 h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className={`font-semibold ${getPerformanceIndicator(subject.percentage).color}`}>
                          {subject.percentage}%
                        </span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div 
                        className={`${getSubjectColor(subject.subject)} h-2`}
                        style={{ width: `${subject.percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex text-xs text-muted-foreground">
                      <span>{subject.testsCount} tests taken</span>
                      <span className="ml-auto">{getPerformanceIndicator(subject.percentage).label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Test History</CardTitle>
              <CardDescription>Your complete test history and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded border">
                <div className="grid grid-cols-12 gap-4 bg-muted p-3 text-sm font-medium">
                  <div className="col-span-5">Test Name</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Subject</div>
                  <div className="col-span-3 text-right">Score</div>
                </div>
                
                <div className="divide-y">
                  {[...recentTests].reverse().map(test => (
                    <div key={test.id} className="grid grid-cols-12 gap-4 p-3 text-sm">
                      <div className="col-span-5 font-medium">{test.title}</div>
                      <div className="col-span-2">{new Date(test.date).toLocaleDateString()}</div>
                      <div className="col-span-2 flex items-center">
                        <div className={`mr-2 h-2 w-2 rounded-full ${getSubjectColor(test.subject)}`}></div>
                        {test.subject}
                      </div>
                      <div className="col-span-3 text-right">
                        <span className={`font-medium ${getPerformanceIndicator((test.score / test.maxScore) * 100).color}`}>
                          {test.score} / {test.maxScore}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((test.score / test.maxScore) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentPerformancePage;
