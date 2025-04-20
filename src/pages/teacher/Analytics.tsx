import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, Bar, Pie } from '@/components/ui/chart';
import { ArrowUp, ArrowDown, Download, Users, BookOpen, Clock, Award } from 'lucide-react';

// Mock data for teacher analytics - using proper Recharts compatible types
const PERFORMANCE_DATA = {
  monthlyPerformance: [
    { name: 'Jan', average: 68 },
    { name: 'Feb', average: 72 },
    { name: 'Mar', average: 75 },
    { name: 'Apr', average: 82 },
    { name: 'May', average: 88 },
    { name: 'Jun', average: 85 },
  ],
  classWisePerformance: [
    { name: '12A', score: 78 },
    { name: '12B', score: 82 },
    { name: '11A', score: 68 },
    { name: '11B', score: 75 },
  ],
  topicPerformance: [
    { name: 'Mechanics', score: 85 },
    { name: 'Thermodynamics', score: 72 },
    { name: 'Waves', score: 78 },
    { name: 'Optics', score: 90 },
    { name: 'Electromagnetism', score: 65 },
  ],
  testPerformance: [
    { name: 'Mechanics Quiz', classAverage: 75, expectedAverage: 70 },
    { name: 'Mid-Term Exam', classAverage: 68, expectedAverage: 70 },
    { name: 'Waves Test', classAverage: 72, expectedAverage: 70 },
    { name: 'Optics Project', classAverage: 88, expectedAverage: 70 },
    { name: 'Final Exam', classAverage: 82, expectedAverage: 70 },
  ]
};

const CLASS_DISTRIBUTION = [
  { name: 'A+', value: 5, fill: 'rgba(75, 192, 192, 0.6)' },
  { name: 'A', value: 12, fill: 'rgba(54, 162, 235, 0.6)' },
  { name: 'B+', value: 18, fill: 'rgba(153, 102, 255, 0.6)' },
  { name: 'B', value: 25, fill: 'rgba(255, 159, 64, 0.6)' },
  { name: 'C+', value: 15, fill: 'rgba(255, 205, 86, 0.6)' },
  { name: 'C', value: 8, fill: 'rgba(255, 99, 132, 0.6)' },
  { name: 'D', value: 5, fill: 'rgba(201, 203, 207, 0.6)' },
  { name: 'F', value: 2, fill: 'rgba(100, 100, 100, 0.6)' },
];

const CHART_COLORS = {
  primary: 'rgba(3, 105, 225, 0.6)',
  secondary: 'rgba(255, 99, 132, 0.6)',
};

const IMPROVEMENT_STATS = [
  {
    title: 'Average Improvement',
    value: '15%',
    change: '+3.2%',
    isPositive: true,
    icon: ArrowUp,
  },
  {
    title: 'Top Performer',
    value: '95%',
    change: '+5%',
    isPositive: true,
    icon: Award,
  },
  {
    title: 'At-Risk Students',
    value: '8',
    change: '-2',
    isPositive: true,
    icon: Users,
  },
  {
    title: 'Average Time Spent',
    value: '35 min',
    change: '+5 min',
    isPositive: true,
    icon: Clock,
  },
];

const TeacherAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Monitor your classes' performance and progress</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="physics">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Performance overview cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {IMPROVEMENT_STATS.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                {stat.isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {stat.change} since last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overall">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overall">Overall Performance</TabsTrigger>
          <TabsTrigger value="classWise">Class-wise</TabsTrigger>
          <TabsTrigger value="topicWise">Topic-wise</TabsTrigger>
          <TabsTrigger value="testWise">Test-wise</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Monthly Performance Trend</CardTitle>
                <CardDescription>Average class performance over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PERFORMANCE_DATA.monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} label={{ value: 'Average Score (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="average" name="Average Score" stroke="hsl(var(--primary))" fill="rgba(3, 105, 225, 0.1)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Distribution of grades across all students</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CLASS_DISTRIBUTION}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="classWise">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Comparison</CardTitle>
                <CardDescription>Average performance of different classes</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_DATA.classWisePerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} label={{ value: 'Average Score (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Average Score (%)" fill={CHART_COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Participation Rate</CardTitle>
                <CardDescription>Assignment completion rate by class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Class 12A</p>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <div className="relative h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                      <div className="absolute h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Class 12B</p>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <div className="relative h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                      <div className="absolute h-full bg-primary rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Class 11A</p>
                      <span className="text-sm font-medium">76%</span>
                    </div>
                    <div className="relative h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                      <div className="absolute h-full bg-primary rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Class 11B</p>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <div className="relative h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                      <div className="absolute h-full bg-primary rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="topicWise">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Topic Performance Analysis</CardTitle>
                <CardDescription>Average performance across different topics</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={PERFORMANCE_DATA.topicPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Average Score (%)" fill={CHART_COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Topic Difficulty</CardTitle>
                <CardDescription>Average time spent and completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {PERFORMANCE_DATA.topicPerformance.map((topic, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                          <p className="text-sm font-medium">{topic.name}</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground mr-2">
                            {Math.floor(Math.random() * 20) + 20} min
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            topic.score > 80 
                              ? 'bg-green-100 text-green-800' 
                              : topic.score > 70
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {topic.score}%
                          </span>
                        </div>
                      </div>
                      <div className="relative h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                        <div 
                          className={`absolute h-full rounded-full ${
                            topic.score > 80 
                              ? 'bg-green-500' 
                              : topic.score > 70
                                ? 'bg-blue-500'
                                : 'bg-yellow-500'
                          }`} 
                          style={{ width: `${topic.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="testWise">
          <Card>
            <CardHeader>
              <CardTitle>Test Performance Analysis</CardTitle>
              <CardDescription>Average performance across different tests</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERFORMANCE_DATA.testPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} label={{ value: 'Average Score (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="classAverage" name="Class Average (%)" fill={CHART_COLORS.primary} />
                  <Bar dataKey="expectedAverage" name="Expected Average (%)" fill={CHART_COLORS.secondary} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>At-Risk Students</CardTitle>
            <CardDescription>Students who may need additional support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                      <span className="font-medium text-sm">{`S${i+1}`}</span>
                    </div>
                    <div>
                      <p className="font-medium">Student {i+1}</p>
                      <p className="text-xs text-muted-foreground">Class {i%2 === 0 ? '12A' : '11B'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">
                      {55 + i * 3}%
                    </span>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Students with exceptional performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="font-medium text-sm text-primary">{`S${i+1}`}</span>
                    </div>
                    <div>
                      <p className="font-medium">Student {10 - i}</p>
                      <p className="text-xs text-muted-foreground">Class {i%2 === 0 ? '12A' : '12B'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                      {95 - i * 2}%
                    </span>
                    <Award className="h-4 w-4 text-yellow-500 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherAnalyticsPage; 