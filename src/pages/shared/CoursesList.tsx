import React from 'react';
import CourseList from '../../components/courses/CourseList';
import { Course, CourseCategory } from '../../types/course';

// This would typically come from your API/database
const mockCourses: Course[] = [
  {
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
            order: 1
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
  },
  {
    id: '2',
    title: 'JEE Mathematics Complete Course',
    description: 'Comprehensive mathematics preparation for JEE Main and Advanced with detailed video lectures and practice problems.',
    category: 'COMPETITIVE_EXAMS',
    subCategory: 'JEE',
    level: 'ADVANCED',
    thumbnail: '/images/courses/jee-maths.jpg',
    price: 7999,
    duration: 72,
    instructor: {
      id: 'inst2',
      name: 'Prof. Amit Sharma',
      avatar: '/images/instructors/amit-sharma.jpg'
    },
    chapters: [
      {
        id: 'ch3',
        title: 'Calculus',
        description: 'Differential and Integral Calculus',
        order: 1,
        duration: 360,
        lessons: [
          {
            id: 'l5',
            title: 'Limits and Continuity',
            description: 'Understanding limits and continuity of functions',
            type: 'VIDEO',
            content: '/videos/calculus-1.mp4',
            duration: 60,
            order: 1
          },
          {
            id: 'l6',
            title: 'Differentiation',
            description: 'Rules and applications of differentiation',
            type: 'VIDEO',
            content: '/videos/calculus-2.mp4',
            duration: 65,
            order: 2
          }
        ]
      },
      {
        id: 'ch4',
        title: 'Algebra',
        description: 'Advanced algebraic concepts for JEE',
        order: 2,
        duration: 280,
        lessons: [
          {
            id: 'l7',
            title: 'Complex Numbers',
            description: 'Properties and operations of complex numbers',
            type: 'VIDEO',
            content: '/videos/algebra-1.mp4',
            duration: 55,
            order: 1
          },
          {
            id: 'l8',
            title: 'Matrices and Determinants',
            description: 'Operations and applications of matrices',
            type: 'VIDEO',
            content: '/videos/algebra-2.mp4',
            duration: 50,
            order: 2
          }
        ]
      }
    ],
    totalStudents: 2100,
    rating: 4.9,
    status: 'PUBLISHED',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    title: 'NEET Biology Mastery Program',
    description: 'Complete preparation for NEET Biology with thorough coverage of Botany and Zoology. Includes practice tests and NCERT-based content.',
    category: 'COMPETITIVE_EXAMS',
    subCategory: 'NEET',
    level: 'INTERMEDIATE',
    thumbnail: '/images/courses/neet-biology.jpg',
    price: 6999,
    duration: 60,
    instructor: {
      id: 'inst3',
      name: 'Dr. Priya Verma',
      avatar: '/images/instructors/priya-verma.jpg'
    },
    chapters: [
      {
        id: 'ch5',
        title: 'Cell Structure and Functions',
        description: 'Understanding the building blocks of life',
        order: 1,
        duration: 200,
        lessons: [
          {
            id: 'l9',
            title: 'Cell Theory and Types',
            description: 'Introduction to cell theory and cell types',
            type: 'VIDEO',
            content: '/videos/cell-1.mp4',
            duration: 45,
            order: 1
          },
          {
            id: 'l10',
            title: 'Cell Organelles',
            description: 'Structure and functions of cell organelles',
            type: 'VIDEO',
            content: '/videos/cell-2.mp4',
            duration: 55,
            order: 2
          }
        ]
      }
    ],
    totalStudents: 1850,
    rating: 4.7,
    status: 'PUBLISHED',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  }
];

const CoursesList = () => {
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
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="text-lg font-medium mb-2">{category.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
          </div>
        ))}
      </div>
      
      <CourseList courses={mockCourses} />
    </div>
  );
};

export default CoursesList; 