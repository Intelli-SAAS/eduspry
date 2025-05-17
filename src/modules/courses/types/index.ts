export type CourseCategory = 'SCHOOL_PREP' | 'COMPETITIVE_EXAMS' | 'SKILL_DEVELOPMENT';
export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type CourseEnrollmentStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type LessonType = 'VIDEO' | 'QUIZ' | 'TEXT' | 'ASSIGNMENT';

export interface CourseInstructor {
  id: string;
  name: string;
  avatar: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  content: string;
  duration: number; // in minutes
  order: number;
  isCompleted?: boolean;
}

export interface CourseChapter {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  subCategory: string;
  level: CourseLevel;
  thumbnail: string;
  price: number;
  duration: number; // in hours
  instructor: CourseInstructor;
  chapters: CourseChapter[];
  totalStudents: number;
  rating: number;
  status: CourseStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseEnrollment {
  userId: string;
  courseId: string;
  enrollmentDate: Date;
  status: CourseEnrollmentStatus;
  completionDate?: Date;
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  completedLessons: string[]; // lesson ids
  lastAccessedLesson: string; // lesson id
  progress: number; // percentage
  startDate: Date;
  lastAccessDate: Date;
  completionDate?: Date;
} 