import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, FileText, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  // Recent activity data (would come from API in real app)
  const recentActivity = [
    { id: 1, type: 'test_created', title: 'Physics Midterm', date: 'Apr 19, 2025' },
    { id: 2, type: 'test_graded', title: 'Chemistry Quiz #3', date: 'Apr 18, 2025' },
    { id: 3, type: 'question_added', title: 'Added 12 questions to bank', date: 'Apr 17, 2025' },
  ];

  // Top performing students
  const topStudents = [
    { id: 1, name: 'Emma Wilson', score: 92, subject: 'Chemistry' },
    { id: 2, name: 'John Davis', score: 87, subject: 'Physics' },
    { id: 3, name: 'Sophia Martinez', score: 95, subject: 'Chemistry' },
  ];

  const activityIcon = (type: string) => {
    switch (type) {
      case 'test_created': return <FileText className="h-5 w-5 text-[#1a4480]" />;
      case 'test_graded': return <FileText className="h-5 w-5 text-green-500" />;
      case 'question_added': return <BookOpen className="h-5 w-5 text-purple-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityText = (type: string) => {
    switch (type) {
      case 'test_created': return 'Created';
      case 'test_graded': return 'Graded';
      case 'question_added': return 'Updated';
      default: return 'Activity';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#4d7cc7]">
            Teacher Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.firstName} {user?.lastName}
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-[#1a4480] hover:bg-[#142f59]">
            <Link to="/tests/create">
              Create New Test
              <FileText className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-[#1a4480] border-[#1a4480]">
            <Link to="/questions/bank">
              Question Bank
              <BookOpen className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Students
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              128
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-[#1a4480] flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +4 enrolled this week
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Tests Created
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              12
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-[#1a4480] flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              3 pending review
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Question Bank
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              247
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-[#1a4480] flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18 added this month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardHeader className="border-b bg-[#f0f4f9]">
            <CardTitle className="text-[#1a4480]">
              Recent Test Submissions
            </CardTitle>
            <CardDescription>
              View and analyze recent test submissions from your students
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[
                { test: "Physics Midterm", student: "John Davis", score: "87/100", date: "Apr 15, 2025" },
                { test: "Chemistry Quiz #3", student: "Emma Wilson", score: "92/100", date: "Apr 14, 2025" },
                { test: "Physics Midterm", student: "Michael Brown", score: "78/100", date: "Apr 14, 2025" },
                { test: "Chemistry Quiz #3", student: "Sophia Martinez", score: "95/100", date: "Apr 13, 2025" },
                { test: "Physics Weekly Quiz", student: "David Johnson", score: "85/100", date: "Apr 12, 2025" }
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-4 p-4 hover:bg-[#f0f4f9] transition-colors">
                  <div className="font-medium text-gray-800">{item.test}</div>
                  <div className="text-gray-600">{item.student}</div>
                  <div className="font-medium text-gray-800">{item.score}</div>
                  <div className="text-gray-500">{item.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardHeader className="border-b bg-[#f0f4f9]">
            <CardTitle className="text-[#1a4480]">
              Your Recent Activity
            </CardTitle>
            <CardDescription>
              Track your recent actions and modifications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center p-4 hover:bg-[#f0f4f9] transition-colors">
                  <div className="p-2 rounded-full bg-[#e6ebf2] mr-4">
                    {activityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-500">
                      {getActivityText(activity.type)} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 flex justify-center border-t">
              <Button variant="ghost" size="sm" className="w-full text-[#1a4480]" asChild>
                <Link to="/activity">
                  View All Activity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="border-b bg-[#f0f4f9]">
          <CardTitle className="text-[#1a4480]">
            Top Performing Students
          </CardTitle>
          <CardDescription>
            Students with the highest scores on recent assessments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {topStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 hover:bg-[#f0f4f9] transition-colors">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#1a4480]/10 flex items-center justify-center text-[#1a4480] mr-4">
                    {student.name.split(' ').map(part => part[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.subject}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-green-600 font-medium mr-6">{student.score}%</div>
                  <Button size="sm" variant="outline" className="rounded-full text-[#1a4480] border-[#1a4480]" asChild>
                    <Link to={`/students/${student.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-[#1a4480] hover:bg-[#142f59]">
          <Link to="/analytics">
            View Detailed Analytics
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
