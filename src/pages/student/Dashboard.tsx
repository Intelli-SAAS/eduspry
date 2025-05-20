import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { SubjectType } from '@/types';
import { ArrowRight, BookOpen, Calendar, Clock, FileText, TrendingUp, AlertTriangle, VideoIcon, PlayCircle } from 'lucide-react';
import { format } from 'date-fns';
import VideoConferenceService from '@/services/videoConference';
import { Badge } from '@/components/ui/badge';

// Fade in animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Placeholder dashboard for student
const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for video conferences
  const [upcomingConferences, setUpcomingConferences] = useState<any[]>([]);
  const [isLoadingConferences, setIsLoadingConferences] = useState(true);

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

  // Add this after other useEffects
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

  // Helper functions
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

  return (
    <motion.div
      className="container mx-auto py-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
    >
      <motion.div 
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        variants={fadeIn}
        custom={0}
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1a4480]">
            Welcome, {user?.firstName}
          </h1>
          <p className="text-gray-500 mt-1">Here's an overview of your academic progress</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild className="rounded-full shadow-md bg-[#1a4480] hover:bg-[#0f2b50] transition-all duration-300">
            <Link to="/tests">
              View Available Tests
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-4 mt-8">
        {[
          {
            title: "Upcoming Tests",
            value: upcomingTests.length,
            subtitle: "Next test in 3 days",
            icon: <Calendar className="h-4 w-4 mr-2" />,
            improvement: "+16%",
            progress: 92
          },
          {
            title: "Tests Completed",
            value: recentTests.length,
            subtitle: "Last test 3 days ago",
            icon: <FileText className="h-4 w-4 mr-2" />,
            improvement: "+8%",
            progress: 86
          },
          {
            title: "Current Average",
            value: "85%",
            subtitle: "Up from last month",
            icon: <TrendingUp className="h-4 w-4 mr-2" />,
            improvement: "+12%",
            progress: 94
          },
          {
            title: "Study Hours",
            value: "28h",
            subtitle: "This week",
            icon: <Clock className="h-4 w-4 mr-2" />,
            improvement: "+20%",
            progress: 88
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={fadeIn}
            custom={index + 1}
          >
            <Card className="bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
                  {stat.icon}
                  {stat.title}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <CardDescription className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </CardDescription>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                      {stat.improvement}
                    </Badge>
                    <div className="w-16 h-16 rounded-full bg-[#1a4480] flex items-center justify-center text-white font-bold">
                      {stat.progress}%
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b bg-[#f0f4f9]">
            <CardTitle className="text-[#1a4480] flex items-center justify-between">
              <span>Learning Path Progress</span>
              <Button variant="ghost" size="sm" className="text-[#1a4480]">
                View Details
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
            <CardTitle className="text-[#1a4480]">AI Study Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="min-w-[2rem] h-8 rounded-lg bg-[#1a4480]/10 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-[#1a4480]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Focus Areas</p>
                  <p className="text-xs text-gray-500 mt-1">Physics concepts need more attention</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="min-w-[2rem] h-8 rounded-lg bg-[#1a4480]/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-[#1a4480]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Strong Subjects</p>
                  <p className="text-xs text-gray-500 mt-1">Excellent progress in Mathematics</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <motion.div className="mt-8" variants={fadeIn} custom={7}>
        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b bg-[#f0f4f9]">
            <CardTitle className="text-[#1a4480] flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Subject Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {subjectPerformance.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${getSubjectColor(subject.subject).replace('bg-', 'bg-opacity-20 bg-')}`}>
                    <div className={`w-12 h-12 rounded-full ${getSubjectColor(subject.subject)} flex items-center justify-center text-white font-bold`}>
                      {subject.score}%
                    </div>
                  </div>
                  <div className="font-medium text-center">{subject.subject}</div>
                  <div className="text-xs text-gray-500 mt-1">{subject.testsCount} tests</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Classes section remains unchanged */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Upcoming Classes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoadingConferences ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Loading classes...</p>
              </CardContent>
            </Card>
          ) : upcomingConferences.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="py-8 text-center">
                  <VideoIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium">No Upcoming Classes</h3>
                  <p className="text-muted-foreground mt-2">
                    There are currently no scheduled online classes.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            upcomingConferences.map(conference => (
              <Card key={conference.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex justify-between items-center">
                    <span className="truncate">{conference.title}</span>
                    {conference.status === 'active' && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Live</span>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {conference.status === 'active'
                      ? 'Started at ' + formatDateTime(conference.startTime)
                      : formatDateTime(conference.startTime)
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  {conference.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{conference.description}</p>
                  )}
                  <p className="text-sm font-medium mt-2">Host: {conference.hostName}</p>
                </CardContent>
                <CardFooter className="border-t pt-3 pb-3">
                  {conference.status === 'active' ? (
                    <Button className="w-full" onClick={() => joinConference(conference.channel)}>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Join Now
                    </Button>
                  ) : (
                    <div className="w-full flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-amber-500" />
                        <span className="text-sm">Starts in {getTimeUntil(conference.startTime)}</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => joinConference(conference.channel)}>
                        View Details
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
