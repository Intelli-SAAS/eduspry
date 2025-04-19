
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Calendar, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Students',
      value: '124',
      icon: <Users className="h-5 w-5 text-blue-500" />,
      link: '/students'
    },
    {
      title: 'Active Tests',
      value: '8',
      icon: <FileText className="h-5 w-5 text-green-500" />,
      link: '/tests/manage'
    },
    {
      title: 'Upcoming Tests',
      value: '3',
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
      link: '/tests/manage'
    },
    {
      title: 'Average Score',
      value: '76%',
      icon: <BarChart className="h-5 w-5 text-orange-500" />,
      link: '/analytics'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName}</h2>
        <p className="text-muted-foreground">Here's an overview of your teaching dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index}>
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
