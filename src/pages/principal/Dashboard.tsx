
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, User, BookOpen, TrendingUp, TrendingDown, BarChart } from 'lucide-react';

const PrincipalDashboard: React.FC = () => {
  const { user } = useAuth();

  // Top departments by performance
  const departmentPerformance = [
    { name: "Science", percentage: 88, trend: "up" },
    { name: "Mathematics", percentage: 92, trend: "up" },
    { name: "Languages", percentage: 85, trend: "down" },
    { name: "Humanities", percentage: 82, trend: "stable" },
    { name: "Computer Science", percentage: 94, trend: "up" }
  ];

  // Recent teacher activities
  const teacherActivities = [
    { teacher: "Sarah Johnson", activity: "Created Physics Test", date: "Apr 18, 2025" },
    { teacher: "Mark Wilson", activity: "Graded Chemistry Finals", date: "Apr 16, 2025" },
    { teacher: "Lisa Chen", activity: "Updated Question Bank", date: "Apr 15, 2025" },
    { teacher: "Robert Miller", activity: "Scheduled Math Quiz", date: "Apr 14, 2025" },
    { teacher: "Emily Davis", activity: "Submitted Performance Report", date: "Apr 12, 2025" }
  ];

  // Student enrollment trend data
  const enrollmentTrend = [
    { month: "Jan", count: 1180 },
    { month: "Feb", count: 1195 },
    { month: "Mar", count: 1210 },
    { month: "Apr", count: 1248 }
  ];

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Principal Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.firstName} {user?.lastName}
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <Link to="/analytics/school">
              School Analytics
              <BarChart className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full shadow-sm hover:shadow-md transition-all duration-300">
            <Link to="/settings">
              School Settings
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Students
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              1,248
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-blue-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +32 enrolled this month
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-green-50 to-emerald-50 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Teachers
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              42
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              2 new this semester
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-purple-50 to-fuchsia-50 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Departments
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              8
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-purple-600">
              All departments active
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-50 to-orange-50 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-600 flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Performance
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              87%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-amber-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.4% from last semester
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardHeader className="border-b bg-gray-50/80">
            <CardTitle className="text-gray-800">
              Department Performance
            </CardTitle>
            <CardDescription>
              Average scores across departments
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              {departmentPerformance.map((dept) => (
                <div key={dept.name} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800">{dept.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">
                        {dept.percentage}%
                      </span>
                      {getTrendIcon(dept.trend)}
                    </div>
                  </div>
                  
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div 
                      className={`bg-primary h-2 rounded-full`}
                      style={{ 
                        width: `${dept.percentage}%`,
                        transition: 'width 1s ease-in-out' 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="ghost" size="sm" className="text-primary" asChild>
                <Link to="/departments">
                  View All Departments
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardHeader className="border-b bg-gray-50/80">
            <CardTitle className="text-gray-800">
              Recent Teacher Activities
            </CardTitle>
            <CardDescription>Track teacher engagement and test creation</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {teacherActivities.map((item, i) => (
                <div key={i} className="grid grid-cols-3 p-4 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-800">{item.teacher}</div>
                  <div className="text-gray-600">{item.activity}</div>
                  <div className="text-gray-500">{item.date}</div>
                </div>
              ))}
            </div>
            <div className="p-4 flex justify-center border-t">
              <Button variant="ghost" size="sm" className="w-full text-primary" asChild>
                <Link to="/teachers">
                  View All Teachers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="border-b bg-gray-50/80">
          <CardTitle className="text-gray-800">
            Student Enrollment Trends
          </CardTitle>
          <CardDescription>
            Monthly enrollment statistics
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-64 flex items-end justify-between px-2">
            {enrollmentTrend.map((month, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div 
                  className="w-16 bg-primary rounded-t-lg transition-all duration-700"
                  style={{ 
                    height: `${(month.count / 1300) * 100}%`,
                    opacity: idx === enrollmentTrend.length - 1 ? 1 : 0.7
                  }}
                ></div>
                <div className="mt-2 text-sm">
                  <div className="font-medium text-gray-800">{month.month}</div>
                  <div className="text-gray-500 text-center">{month.count}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-all duration-300">
          <Link to="/analytics/school">
            View Comprehensive Analytics
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
