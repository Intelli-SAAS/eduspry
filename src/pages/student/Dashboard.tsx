import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SubjectType } from '@/types';
import { ArrowRight, BookOpen, Calendar, Clock, FileText, TrendingUp, AlertTriangle } from 'lucide-react';

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
    <motion.div 
      initial="hidden"
      animate="visible"
      className="space-y-8"
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Upcoming Tests",
            value: upcomingTests.length,
            subtitle: "Next test in 3 days",
            icon: <Calendar className="h-3 w-3 mr-1" />,
            color: "[#1a4480]",
            bgColor: "from-[#1a4480]/5 to-[#1a4480]/10"
          },
          {
            title: "Tests Completed",
            value: recentTests.length,
            subtitle: "Last test 3 days ago",
            icon: <Clock className="h-3 w-3 mr-1" />,
            color: "[#1a4480]",
            bgColor: "from-[#1a4480]/10 to-[#1a4480]/20"
          },
          {
            title: "Average Score",
            value: `${Math.round(subjectPerformance.reduce((acc, curr) => acc + curr.score, 0) / subjectPerformance.length)}%`,
            subtitle: "Across all subjects",
            icon: <TrendingUp className="h-3 w-3 mr-1" />,
            color: "[#1a4480]",
            bgColor: "from-[#1a4480]/15 to-[#1a4480]/25"
          },
          {
            title: "Total Study Time",
            value: "42h",
            subtitle: "This month",
            icon: <Clock className="h-3 w-3 mr-1" />,
            color: "[#1a4480]",
            bgColor: "from-[#1a4480]/20 to-[#1a4480]/30"
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={fadeIn}
            custom={index + 1}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className={`overflow-hidden border-none bg-gradient-to-br ${stat.bgColor} shadow-md hover:shadow-lg transition-all duration-300`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-sm font-medium text-${stat.color}`}>
                  {stat.title}
                </CardTitle>
                <CardDescription className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`text-xs text-${stat.color} flex items-center`}>
                  {stat.icon} 
                  {stat.subtitle}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          variants={fadeIn}
          custom={5}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardHeader className="border-b bg-[#1a4480]/5">
              <CardTitle className="flex items-center text-gray-800">
                <Calendar className="mr-2 h-5 w-5 text-[#1a4480]" />
                Upcoming Tests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {upcomingTests.length > 0 ? (
                <div>
                  {upcomingTests.map((test, index) => (
                    <motion.div 
                      key={test.id} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + (index * 0.1) }}
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
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="sm" className="rounded-full shadow-sm bg-[#1a4480] hover:bg-[#0f2b50]" asChild>
                          <Link to={`/tests/${test.id}`}>Details</Link>
                        </Button>
                      </motion.div>
                    </motion.div>
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
        </motion.div>

        <motion.div
          variants={fadeIn}
          custom={6}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardHeader className="border-b bg-[#1a4480]/5">
              <CardTitle className="flex items-center text-gray-800">
                <FileText className="mr-2 h-5 w-5 text-[#1a4480]" />
                Recent Test Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {recentTests.length > 0 ? (
                <div>
                  {recentTests.map((test, index) => (
                    <motion.div 
                      key={test.id} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + (index * 0.1) }}
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
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" variant="outline" className="rounded-full border-[#1a4480] text-[#1a4480] hover:bg-[#1a4480]/10" asChild>
                            <Link to={`/tests/${test.id}/result`}>View</Link>
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
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
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn}
        custom={7}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b bg-[#1a4480]/5">
            <CardTitle className="flex items-center text-gray-800">
              <BookOpen className="mr-2 h-5 w-5 text-[#1a4480]" />
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
    </motion.div>
  );
};

export default StudentDashboard;
