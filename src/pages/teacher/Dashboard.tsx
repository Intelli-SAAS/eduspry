import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, FileText, TrendingUp, Clock, VideoIcon, Plus, Calendar, PlayCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Services
import VideoConferenceService from '@/services/videoConference';

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
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for video conferences
  const [upcomingConferences, setUpcomingConferences] = useState<any[]>([]);
  const [isLoadingConferences, setIsLoadingConferences] = useState(true);

  // Fetch upcoming video conferences
  useEffect(() => {
    const fetchUpcomingConferences = async () => {
      if (!user) return;

      try {
        setIsLoadingConferences(true);
        const sessions = await VideoConferenceService.getUserSessions(user.id);

        // Filter for sessions that are scheduled or active
        const activeOrUpcoming = sessions.filter(
          session => ['scheduled', 'active'].includes(session.status)
        );

        // Sort by start time (ascending)
        activeOrUpcoming.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

        setUpcomingConferences(activeOrUpcoming);
      } catch (error) {
        console.error('Error fetching video conferences:', error);
      } finally {
        setIsLoadingConferences(false);
      }
    };

    fetchUpcomingConferences();
  }, [user]);

  // Format date for display
  const formatDateTime = (date: Date) => {
    return format(date, 'MMM dd, yyyy - h:mm a');
  };

  // Calculate time until conference
  const getTimeUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();

    if (diff <= 0) return 'Now';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Join a video conference
  const joinConference = (channel: string) => {
    navigate(`/classroom/${channel}`);
  };

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
      case 'question_added': return <FileText className="h-5 w-5 text-purple-500" />;
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
    <div className="container mx-auto py-8">
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
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mt-8">
        <Card className="bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Total Students
            </CardTitle>
            <div className="flex items-center justify-between">
              <CardDescription className="text-2xl font-bold text-gray-900">128</CardDescription>
              <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">+16%</Badge>
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Tests Created
            </CardTitle>
            <div className="flex items-center justify-between">
              <CardDescription className="text-2xl font-bold text-gray-900">12</CardDescription>
              <div className="w-16 h-16 rounded-full bg-[#1a4480] flex items-center justify-center text-white font-bold">
                92%
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Question Bank
            </CardTitle>
            <div className="flex items-center justify-between">
              <CardDescription className="text-2xl font-bold text-gray-900">247</CardDescription>
              <div className="w-16 h-16 rounded-full bg-[#1a4480] flex items-center justify-center text-white font-bold">
                86%
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Average Performance
            </CardTitle>
            <div className="flex items-center justify-between">
              <CardDescription className="text-2xl font-bold text-gray-900">85%</CardDescription>
              <div className="w-16 h-16 rounded-full bg-[#1a4480] flex items-center justify-center text-white font-bold">
                94%
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b bg-[#f0f4f9]">
            <CardTitle className="text-[#1a4480] flex items-center justify-between">
              <span>Learning Paths Distribution</span>
              <Button variant="ghost" size="sm" className="text-[#1a4480]">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Math & Science</span>
                <span className="text-sm text-gray-500">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#1a4480] h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Humanities</span>
                <span className="text-sm text-gray-500">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#1a4480] h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Arts</span>
                <span className="text-sm text-gray-500">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#1a4480] h-2 rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b bg-[#f0f4f9]">
            <CardTitle className="text-[#1a4480]">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="min-w-[2rem] h-8 rounded-lg bg-[#1a4480]/10 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-[#1a4480]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Students Struggling</p>
                  <p className="text-xs text-gray-500 mt-1">5 students show declining performance in Physics</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="min-w-[2rem] h-8 rounded-lg bg-[#1a4480]/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-[#1a4480]" />
                </div>
                <div>
                  <p className="text-sm font-medium">High Performers</p>
                  <p className="text-xs text-gray-500 mt-1">3 students consistently scoring above 90%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-8">
        {/* Recent Test Submissions and Activity sections remain unchanged */}
        {/* ... */}
      </div>
    </div>
  );
};

export default TeacherDashboard;
