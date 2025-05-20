import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  TrendingUp,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 }
  }
};

const cardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(26, 68, 128, 0.5)",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// Sample data for demo
const departmentPerformance = [
  {
    name: 'Math',
    value: 82,
  },
  {
    name: 'Science',
    value: 75,
  },
  {
    name: 'English',
    value: 88,
  },
  {
    name: 'History',
    value: 79,
  },
  {
    name: 'Arts',
    value: 91,
  },
];

// Updated teacher activity data with fill colors
const teacherActivity = [
  {
    name: 'Assessments Created',
    value: 145,
    fill: '#1a4480'
  },
  {
    name: 'Feedback Sessions',
    value: 89,
    fill: '#4a76c4'
  },
  {
    name: 'Professional Development',
    value: 42,
    fill: '#89a7e0'
  },
  {
    name: 'Parent Meetings',
    value: 76,
    fill: '#ccdaf2'
  },
];

const studentEnrollmentTrend = [
  {
    name: 'Jan',
    students: 520,
  },
  {
    name: 'Feb',
    students: 528,
  },
  {
    name: 'Mar',
    students: 545,
  },
  {
    name: 'Apr',
    students: 559,
  },
  {
    name: 'May',
    students: 571,
  },
  {
    name: 'Jun',
    students: 582,
  },
  {
    name: 'Jul',
    students: 590,
  },
  {
    name: 'Aug',
    students: 612,
  },
  {
    name: 'Sep',
    students: 635,
  },
  {
    name: 'Oct',
    students: 641,
  },
  {
    name: 'Nov',
    students: 652,
  },
  {
    name: 'Dec',
    students: 674,
  },
];

const PrincipalDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="space-y-6 p-6 pb-16"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="flex flex-col space-y-4">
        <motion.h1
          className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#4d7cc7]"
          variants={fadeIn}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Principal Dashboard
        </motion.h1>
        <motion.p
          className="text-gray-500"
          variants={fadeIn}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          View and analyze school performance metrics and faculty data.
        </motion.p>
      </div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeIn}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <Card className="bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] border-none shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Total Students
              </CardTitle>
              <div className="flex items-center justify-between">
                <CardDescription className="text-2xl font-bold text-gray-900">674</CardDescription>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                    +3.4%
                  </Badge>
                  <div className="w-16 h-16 rounded-full bg-[#1a4480] flex items-center justify-center text-white font-bold">
                    92%
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeIn}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <Card className="bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] border-none shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
                <UserCheck className="h-4 w-4 mr-2" />
                Faculty Members
              </CardTitle>
              <div className="flex items-center justify-between">
                <CardDescription className="text-2xl font-bold text-gray-900">42</CardDescription>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                    +5%
                  </Badge>
                  <div className="w-16 h-16 rounded-full bg-[#1a4480] flex items-center justify-center text-white font-bold">
                    86%
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeIn}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <Card className="bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] border-none shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Overall Performance
              </CardTitle>
              <div className="flex items-center justify-between">
                <CardDescription className="text-2xl font-bold text-gray-900">88%</CardDescription>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                    +2.5%
                  </Badge>
                  <div className="w-16 h-16 rounded-full bg-[#1a4480] flex items-center justify-center text-white font-bold">
                    94%
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeIn}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <Card className="bg-gradient-to-br from-[#e6ebf2] to-[#d0dff5] border-none shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#1a4480] flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Departments
              </CardTitle>
              <div className="flex items-center justify-between">
                <CardDescription className="text-2xl font-bold text-gray-900">8</CardDescription>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                    +1
                  </Badge>
                  <div className="w-16 h-16 rounded-full bg-[#1a4480] flex items-center justify-center text-white font-bold">
                    88%
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          className="md:col-span-2"
          variants={chartVariants}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b bg-[#f0f4f9]">
              <CardTitle className="text-[#1a4480] flex items-center justify-between">
                <span>Department Distribution</span>
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
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b bg-[#f0f4f9]">
              <CardTitle className="text-[#1a4480]">AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="min-w-[2rem] h-8 rounded-lg bg-[#1a4480]/10 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-[#1a4480]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Attention Needed</p>
                    <p className="text-xs text-gray-500 mt-1">Physics department showing 15% decline in performance</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="min-w-[2rem] h-8 rounded-lg bg-[#1a4480]/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-[#1a4480]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">High Achievement</p>
                    <p className="text-xs text-gray-500 mt-1">Mathematics department leads with 95% success rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        variants={staggerContainer}
      >
        <motion.div
          className="col-span-4"
          variants={chartVariants}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="transition-all duration-300 h-full">
            <CardHeader>
              <CardTitle className="text-[#1a4480]">School Enrollment Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studentEnrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="#1a4480" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="col-span-3"
          variants={chartVariants}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="transition-all duration-300 h-full">
            <CardHeader>
              <CardTitle className="text-[#1a4480]">Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#1a4480" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={staggerContainer}
      >
        <motion.div
          variants={chartVariants}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="transition-all duration-300 h-full">
            <CardHeader>
              <CardTitle className="text-[#1a4480]">Faculty Activity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={teacherActivity}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  />
                  <Tooltip formatter={(value) => `${value} activities`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="transition-all duration-300 h-full">
            <CardHeader>
              <CardTitle className="text-[#1a4480]">Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div
                className="space-y-2 border-l-4 border-[#1a4480] pl-4"
                whileHover={{ x: 8, backgroundColor: "rgba(26, 68, 128, 0.05)" }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-semibold text-gray-900">Teacher Professional Development Day</h3>
                <p className="text-sm text-gray-500">Scheduled for November 15th. All teachers must attend.</p>
                <p className="text-xs text-gray-400">Posted 2 days ago</p>
              </motion.div>

              <motion.div
                className="space-y-2 border-l-4 border-[#1a4480] pl-4"
                whileHover={{ x: 8, backgroundColor: "rgba(26, 68, 128, 0.05)" }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-semibold text-gray-900">End of Semester Reports Due</h3>
                <p className="text-sm text-gray-500">All faculty must submit reports by December 10th.</p>
                <p className="text-xs text-gray-400">Posted 5 days ago</p>
              </motion.div>

              <motion.div
                className="space-y-2 border-l-4 border-[#1a4480] pl-4"
                whileHover={{ x: 8, backgroundColor: "rgba(26, 68, 128, 0.05)" }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-semibold text-gray-900">Winter Break Schedule</h3>
                <p className="text-sm text-gray-500">School will be closed from December 20th to January 5th.</p>
                <p className="text-xs text-gray-400">Posted 1 week ago</p>
              </motion.div>

              <motion.div
                className="flex justify-end"
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  size="sm"
                  className="bg-[#1a4480] hover:bg-[#0d2d5a] text-white flex items-center gap-1"
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    View All
                  </motion.span>
                  <motion.div
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3" />
                  </motion.div>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex space-x-2 mt-4 md:mt-0"
        variants={staggerContainer}
      >
        <Button variant="outline" onClick={() => navigate('/modules')}>
          Manage Modules
        </Button>
        <Button onClick={() => navigate('/onboarding/type')}>
          Test Onboarding Flow
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default PrincipalDashboard;
