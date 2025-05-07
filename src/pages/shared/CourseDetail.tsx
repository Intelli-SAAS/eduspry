import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseDetailComponent from '../../components/courses/CourseDetail';
import CourseVideoPlayer from '../../components/courses/CourseVideoPlayer';
import CourseProgress from '../../components/courses/CourseProgress';
import { Course, CourseEnrollment, CourseProgress as ICourseProgress } from '../../types/course';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// In a real application, this would come from an API
const mockCourse: Course = {
  id: '1',
  title: 'Complete Physics for Class 12',
  description: 'Master Physics concepts for Class 12 board exams and competitive examinations like JEE Main and Advanced.',
  category: 'SCHOOL_PREP',
  subCategory: 'Class 12',
  level: 'INTERMEDIATE',
  thumbnail: '/images/courses/physics-12.jpg',
  price: 4999,
  duration: 48,
  instructor: {
    id: 'inst1',
    name: 'Dr. Rajesh Kumar',
    avatar: '/images/instructors/rajesh-kumar.jpg'
  },
  chapters: [
    {
      id: 'ch1',
      title: 'Electrostatics',
      description: 'Understanding electric charges and fields',
      order: 1,
      duration: 240,
      lessons: [
        {
          id: 'l1',
          title: 'Electric Charges and Fields',
          description: 'Introduction to electric charges and their properties',
          type: 'VIDEO',
          content: '/videos/electrostatics-1.mp4',
          duration: 45,
          order: 1,
          isCompleted: true
        },
        {
          id: 'l2',
          title: 'Electric Potential and Capacitance',
          description: 'Understanding electric potential and capacitors',
          type: 'VIDEO',
          content: '/videos/electrostatics-2.mp4',
          duration: 50,
          order: 2
        }
      ]
    },
    {
      id: 'ch2',
      title: 'Current Electricity',
      description: 'Understanding electric current and circuits',
      order: 2,
      duration: 180,
      lessons: [
        {
          id: 'l3',
          title: 'Electric Current and Resistance',
          description: 'Introduction to electric current and resistance',
          type: 'VIDEO',
          content: '/videos/current-1.mp4',
          duration: 45,
          order: 1
        },
        {
          id: 'l4',
          title: 'Electrical Circuits',
          description: 'Series and parallel combinations of resistors',
          type: 'VIDEO',
          content: '/videos/current-2.mp4',
          duration: 55,
          order: 2
        }
      ]
    }
  ],
  totalStudents: 1250,
  rating: 4.8,
  status: 'PUBLISHED',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15')
};

// Mock enrollment data
const mockEnrollment: CourseEnrollment = {
  userId: 'user1',
  courseId: '1',
  enrollmentDate: new Date('2024-02-01'),
  status: 'ACTIVE',
};

// Mock progress data
const mockProgress: ICourseProgress = {
  userId: 'user1',
  courseId: '1',
  completedLessons: ['l1'],
  lastAccessedLesson: 'l1',
  progress: 25,
  startDate: new Date('2024-02-01'),
  lastAccessDate: new Date('2024-02-15')
};

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLesson, setCurrentLesson] = useState(mockCourse.chapters[0].lessons[0]);
  
  // In a real application, you would fetch course data based on courseId
  const course = mockCourse;
  const userEnrollment = mockEnrollment;
  const progress = mockProgress;
  
  // Handle enrollment
  const handleEnroll = async () => {
    // In a real application, this would make an API call to enroll the user
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast({
          title: 'Enrolled Successfully',
          description: `You have been enrolled in ${course.title}`,
        });
        resolve();
      }, 1000);
    });
  };
  
  // Handle lesson completion
  const handleLessonComplete = () => {
    toast({
      title: 'Lesson Completed',
      description: `You have completed ${currentLesson.title}`,
    });
  };
  
  return (
    <div className="container mx-auto p-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => navigate('/courses')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to courses
      </Button>
      
      {userEnrollment ? (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">My Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="learn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <CourseVideoPlayer
                    lesson={currentLesson}
                    onComplete={handleLessonComplete}
                    onNext={() => {}}
                    onPrevious={() => {}}
                  />
                  
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                    <p className="text-gray-600">{currentLesson.description}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800">
                  <h3 className="font-bold mb-4">Course Content</h3>
                  <div className="space-y-4">
                    {course.chapters.map((chapter, chapterIndex) => (
                      <div key={chapter.id}>
                        <h4 className="font-medium mb-2">
                          {chapterIndex + 1}. {chapter.title}
                        </h4>
                        <ul className="space-y-2 ml-4">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <li key={lesson.id}>
                              <Button
                                variant="ghost"
                                className={`text-left w-full ${
                                  currentLesson.id === lesson.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''
                                }`}
                                onClick={() => setCurrentLesson(lesson)}
                              >
                                <span className="mr-2">{chapterIndex + 1}.{lessonIndex + 1}</span>
                                {lesson.title}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="overview">
              <CourseDetailComponent
                course={course}
                userEnrollment={userEnrollment}
                onEnroll={handleEnroll}
              />
            </TabsContent>
            
            <TabsContent value="progress">
              <CourseProgress
                course={course}
                progress={progress}
              />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <CourseDetailComponent
          course={course}
          onEnroll={handleEnroll}
        />
      )}
    </div>
  );
};

export default CourseDetailPage; 