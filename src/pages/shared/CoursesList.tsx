import React from 'react';
import CourseList from '@/modules/courses/components/CourseList';
import { useCourses } from '@/modules/courses/hooks/useCourses';

const CoursesList = () => {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Courses</h1>
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Courses</h1>
          <p className="text-red-500">Error loading courses: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Courses</h1>
        <p className="text-muted-foreground">
          Browse our courses to enhance your knowledge and skills
        </p>
      </div>

      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: 'School Preparation',
            description: 'Class 6-12 courses aligned with your board syllabus',
            icon: '🏫'
          },
          {
            title: 'JEE & NEET',
            description: 'Comprehensive preparation for engineering and medical entrances',
            icon: '📚'
          },
          {
            title: 'Competitive Exams',
            description: 'Courses for various competitive examinations',
            icon: '🎯'
          },
          {
            title: 'Skill Development',
            description: 'Enhance your skills with specialized courses',
            icon: '💡'
          }
        ].map((category) => (
          <div
            key={category.title}
            className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow dark:bg-gray-800"
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <h3 className="font-bold text-lg mb-2">{category.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
          </div>
        ))}
      </div>

      <CourseList courses={courses} />
    </div>
  );
};

export default CoursesList; 