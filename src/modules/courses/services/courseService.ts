import { Course, CourseEnrollment, CourseProgress } from '../types';

// This is a mock service that would be replaced with actual API calls in a real application
export const courseService = {
    // Get all courses
    async getCourses(): Promise<Course[]> {
        // In a real application, this would make an API call
        // For now, we'll return mock data
        return mockCourses;
    },

    // Get a course by ID
    async getCourseById(courseId: string): Promise<Course | undefined> {
        // In a real application, this would make an API call
        return mockCourses.find(course => course.id === courseId);
    },

    // Enroll a user in a course
    async enrollInCourse(userId: string, courseId: string): Promise<CourseEnrollment> {
        // In a real application, this would make an API call
        const enrollment: CourseEnrollment = {
            userId,
            courseId,
            enrollmentDate: new Date(),
            status: 'ACTIVE',
        };

        return enrollment;
    },

    // Get a user's enrollment for a course
    async getUserEnrollment(userId: string, courseId: string): Promise<CourseEnrollment | undefined> {
        // In a real application, this would make an API call
        return mockEnrollment.userId === userId && mockEnrollment.courseId === courseId
            ? mockEnrollment
            : undefined;
    },

    // Get a user's progress for a course
    async getCourseProgress(userId: string, courseId: string): Promise<CourseProgress | undefined> {
        // In a real application, this would make an API call
        return mockProgress.userId === userId && mockProgress.courseId === courseId
            ? mockProgress
            : undefined;
    },

    // Mark a lesson as completed
    async markLessonAsCompleted(userId: string, courseId: string, lessonId: string): Promise<void> {
        // In a real application, this would make an API call
        console.log(`Marking lesson ${lessonId} as completed for user ${userId} in course ${courseId}`);
    },
};

// Mock data
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
            }
        ],
        totalStudents: 2100,
        rating: 4.9,
        status: 'PUBLISHED',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-20')
    }
];

// Mock enrollment data
const mockEnrollment: CourseEnrollment = {
    userId: 'user1',
    courseId: '1',
    enrollmentDate: new Date('2024-02-01'),
    status: 'ACTIVE',
};

// Mock progress data
const mockProgress: CourseProgress = {
    userId: 'user1',
    courseId: '1',
    completedLessons: ['l1'],
    lastAccessedLesson: 'l1',
    progress: 25,
    startDate: new Date('2024-02-01'),
    lastAccessDate: new Date('2024-02-15')
}; 