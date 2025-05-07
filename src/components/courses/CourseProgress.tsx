import React from 'react';
import { Course, CourseProgress as ICourseProgress } from '@/types/course';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

interface CourseProgressProps {
  course: Course;
  progress: ICourseProgress;
}

const CourseProgress: React.FC<CourseProgressProps> = ({
  course,
  progress,
}) => {
  // Calculate total lessons
  const totalLessons = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.length, 
    0
  );
  
  // Format date
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Completion</h3>
            <div className="flex items-center gap-2">
              <Progress value={progress.progress} className="flex-grow" />
              <span className="font-bold">{progress.progress}%</span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Lessons</h3>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span>
                {progress.completedLessons.length} / {totalLessons} completed
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Last Accessed</h3>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{formatDate(progress.lastAccessDate)}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Time Spent</h3>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>You've spent approximately 5 hours learning this course</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Started on</h3>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{formatDate(progress.startDate)}</span>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Chapter Progress</h2>
        
        <div className="space-y-6">
          {course.chapters.map((chapter, index) => {
            // Calculate chapter progress
            const chapterLessonIds = chapter.lessons.map(lesson => lesson.id);
            const completedChapterLessons = progress.completedLessons.filter(
              id => chapterLessonIds.includes(id)
            );
            const chapterProgress = Math.round(
              (completedChapterLessons.length / chapter.lessons.length) * 100
            );
            
            return (
              <div key={chapter.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">
                    Chapter {index + 1}: {chapter.title}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={
                      chapterProgress === 100 
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }
                  >
                    {chapterProgress === 100 ? "Completed" : `${chapterProgress}%`}
                  </Badge>
                </div>
                
                <Progress value={chapterProgress} className="mb-3" />
                
                <div className="ml-4 space-y-2">
                  {chapter.lessons.map((lesson) => {
                    const isLessonCompleted = progress.completedLessons.includes(lesson.id);
                    
                    return (
                      <div key={lesson.id} className="flex items-center">
                        <div 
                          className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center
                            ${isLessonCompleted 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 dark:bg-gray-700'}`
                          }
                        >
                          {isLessonCompleted && (
                            <CheckCircle className="h-3 w-3" />
                          )}
                        </div>
                        <span 
                          className={isLessonCompleted ? 'text-green-600 dark:text-green-400' : ''}
                        >
                          {lesson.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default CourseProgress; 