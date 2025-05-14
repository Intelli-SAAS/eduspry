import React from 'react';
import { Course, CourseEnrollment } from '@/types/course';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Clock, Users, CreditCard, CheckCircle } from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  userEnrollment?: CourseEnrollment;
  onEnroll: () => Promise<void>;
}

const CourseDetail: React.FC<CourseDetailProps> = ({
  course,
  userEnrollment,
  onEnroll,
}) => {
  const [enrolling, setEnrolling] = React.useState(false);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await onEnroll();
    } finally {
      setEnrolling(false);
    }
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
          
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400 mr-1" />
              <span className="font-medium">{course.rating}/5.0</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-1" />
              <span>{course.totalStudents} students</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{course.duration} hours</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {course.level}
            </Badge>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name}
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="font-medium">Instructor</p>
                <p className="text-lg">{course.instructor.name}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">About this course</h3>
              <p className="mb-4">{course.description}</p>
              
              <h4 className="font-bold mb-2">What you'll learn</h4>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Comprehensive understanding of the subject</li>
                <li>Practical applications and problem-solving skills</li>
                <li>Exam-specific strategies and techniques</li>
                <li>Access to supplementary learning materials</li>
              </ul>
              
              <h4 className="font-bold mb-2">Course Requirements</h4>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Basic knowledge of the subject</li>
                <li>Dedication and willingness to learn</li>
                <li>Internet connection for accessing the course materials</li>
              </ul>
            </Card>
          </TabsContent>
          
          <TabsContent value="curriculum">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Course Curriculum</h3>
              
              <div className="space-y-6">
                {course.chapters.map((chapter, chapterIndex) => (
                  <div key={chapter.id} className="border-b pb-4 last:border-0">
                    <h4 className="font-bold mb-2">
                      Chapter {chapterIndex + 1}: {chapter.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{chapter.description}</p>
                    <p className="text-sm mb-3">{chapter.duration} minutes • {chapter.lessons.length} lessons</p>
                    
                    <div className="ml-4 space-y-2">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex justify-between items-center">
                          <div>
                            <span className="text-gray-500 mr-2">{chapterIndex + 1}.{lessonIndex + 1}</span>
                            {lesson.title}
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration} min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <Card className="p-6 sticky top-4">
          <div 
            className="h-48 bg-cover bg-center mb-4 rounded-md" 
            style={{ 
              backgroundImage: `url(${course.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center', 
            }}
          />
          
          <div className="text-2xl font-bold mb-4">{formatPrice(course.price)}</div>
          
          {userEnrollment ? (
            <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center mb-4 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle className="h-5 w-5 mr-2" />
              You are enrolled in this course
            </div>
          ) : (
            <Button 
              className="w-full mb-4" 
              size="lg" 
              onClick={handleEnroll}
              disabled={enrolling}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {enrolling ? 'Enrolling...' : 'Enroll Now'}
            </Button>
          )}
          
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-1">This course includes:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  <span>{course.duration} hours of on-demand video</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  <span>Access on mobile and desktop</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  <span>Practice questions and assignments</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetail; 