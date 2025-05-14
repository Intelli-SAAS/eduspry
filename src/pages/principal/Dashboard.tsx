import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, PieChart, LineChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowUpRight, Users, UserCheck, Presentation, PieChart as PieChartIcon, Activity } from 'lucide-react';

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

const teacherActivity = [
  {
    name: 'Assessments Created',
    value: 145,
  },
  {
    name: 'Feedback Sessions',
    value: 89,
  },
  {
    name: 'Professional Development',
    value: 42,
  },
  {
    name: 'Parent Meetings',
    value: 76,
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
  return (
    <motion.div 
      className="space-y-6 p-6 pb-16"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="flex flex-col space-y-4">
        <motion.h1 
          className="text-3xl font-bold tracking-tight text-[#1a4480]"
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

      <Separator />

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
          <motion.div variants={cardHover}>
            <Card className="transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
                <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
                  <Users className="h-4 w-4 text-[#1a4480]" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1a4480]">674</div>
                <p className="text-xs text-gray-500">+3.4% from last month</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <motion.div variants={cardHover}>
            <Card className="transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Faculty Members</CardTitle>
                <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
                  <UserCheck className="h-4 w-4 text-[#1a4480]" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1a4480]">42</div>
                <p className="text-xs text-gray-500">2 new hires this semester</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <motion.div variants={cardHover}>
            <Card className="transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Average GPA</CardTitle>
                <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
                  <Presentation className="h-4 w-4 text-[#1a4480]" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1a4480]">3.4</div>
                <p className="text-xs text-gray-500">+0.2 from previous year</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <motion.div variants={cardHover}>
            <Card className="transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
                <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
                  <Activity className="h-4 w-4 text-[#1a4480]" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1a4480]">94.2%</div>
                <p className="text-xs text-gray-500">+1.8% from last semester</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

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
              <LineChart
                data={studentEnrollmentTrend}
                categories={['students']}
                colors={['#1a4480']}
                index="name"
                yAxisWidth={40}
                showAnimation={true}
              />
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
              <BarChart
                data={departmentPerformance}
                categories={['value']}
                colors={['#1a4480']}
                index="name"
                yAxisWidth={40}
                showAnimation={true}
              />
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
              <PieChart
                data={teacherActivity}
                category="value"
                index="name"
                colors={['#1a4480', '#4a76c4', '#89a7e0', '#ccdaf2']}
                valueFormatter={(value) => `${value} activities`}
                showAnimation={true}
              />
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
    </motion.div>
  );
};

export default PrincipalDashboard;
