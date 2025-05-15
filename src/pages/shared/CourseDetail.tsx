import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseDetailComponent from '@/modules/courses/components/CourseDetail';
import CourseVideoPlayer from '@/modules/courses/components/CourseVideoPlayer';
import CourseProgress from '@/modules/courses/components/CourseProgress';
import { useCourseById, useEnrollment, useCourseProgress } from '@/modules/courses/hooks/useCourses';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Use the hooks from the courses module
  const { course, loading: courseLoading, error: courseError } = useCourseById(courseId || '');
  const { enrollment, enrollInCourse } = useEnrollment('user1', courseId || '');
  const { progress } = useCourseProgress('user1', courseId || '');

  // Set initial lesson if course is loaded
  const [currentLesson, setCurrentLesson] = useState(
    course?.chapters?.[0]?.lessons?.[0] || null
  );

  // Update current lesson when course loads
  React.useEffect(() => {
    if (course?.chapters?.[0]?.lessons?.[0]) {
      setCurrentLesson(course.chapters[0].lessons[0]);
    }
  }, [course]);

  if (courseLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Details</h1>
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Details</h1>
          <p className="text-red-500">
            {courseError ? `Error loading course: ${courseError.message}` : 'Course not found'}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => navigate('/courses')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to courses
          </Button>
        </div>
      </div>
    );
  }

  // Handle enrollment
  const handleEnroll = async () => {
    // In a real application, this would make an API call to enroll the user
    try {
      await enrollInCourse();
      toast({
        title: 'Enrolled Successfully',
        description: `You have been enrolled in ${course.title}`,
      });
    } catch (error) {
      toast({
        title: 'Enrollment Failed',
        description: 'There was an error enrolling in this course',
        variant: 'destructive',
      });
    }
  };

  // Handle lesson completion
  const handleLessonComplete = () => {
    toast({
      title: 'Lesson Completed',
      description: `You have completed ${currentLesson?.title}`,
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

      {enrollment ? (
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
                  {currentLesson && (
                    <CourseVideoPlayer
                      lesson={currentLesson}
                      onComplete={handleLessonComplete}
                      onNext={() => { }}
                      onPrevious={() => { }}
                    />
                  )}

                  <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-2">{currentLesson?.title}</h2>
                    <p className="text-gray-600">{currentLesson?.description}</p>
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
                                className={`text-left w-full ${currentLesson?.id === lesson.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''
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
                userEnrollment={enrollment}
                onEnroll={handleEnroll}
              />
            </TabsContent>

            <TabsContent value="progress">
              {progress && (
                <CourseProgress
                  course={course}
                  progress={progress}
                />
              )}
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