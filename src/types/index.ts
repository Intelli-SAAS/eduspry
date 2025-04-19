
// Tenant types
export interface Tenant {
  id: string;
  name: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
  logo?: string;
  settings: TenantSettings;
}

export interface TenantSettings {
  primaryColor?: string;
  secondaryColor?: string;
  allowRegistration: boolean;
  features: {
    analytics: boolean;
    fileUploads: boolean;
    questionBank: boolean;
    antiCheating: boolean;
  };
}

// User types
export enum UserRole {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  PRINCIPAL = "PRINCIPAL",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  phoneNumber?: string;
  className?: string; // For students
  section?: string; // For students
  subjects?: string[]; // For teachers
}

// Content types
export enum SubjectType {
  PHYSICS = "PHYSICS",
  CHEMISTRY = "CHEMISTRY",
  MATHEMATICS = "MATHEMATICS",
  BIOLOGY = "BIOLOGY",
  ENGLISH = "ENGLISH",
  OTHER = "OTHER",
}

export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  SHORT_ANSWER = "SHORT_ANSWER",
  NUMERICAL = "NUMERICAL",
  MATCH_THE_FOLLOWING = "MATCH_THE_FOLLOWING",
}

export enum DifficultyLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  VERY_HARD = "VERY_HARD",
}

export interface Topic {
  id: string;
  name: string;
  subjectType: SubjectType;
  description?: string;
  tenantId: string;
}

export interface Question {
  id: string;
  tenantId: string;
  createdBy: string; // User ID
  topicId: string;
  content: string;
  explanation?: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  options?: QuestionOption[];
  correctOptionIds?: string[]; // For multiple choice
  correctAnswer?: string; // For non-multiple choice
  marks: number;
  negativeMarks: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  timeRecommended?: number; // in seconds
  imageUrl?: string;
}

export interface QuestionOption {
  id: string;
  content: string;
  isCorrect: boolean;
  imageUrl?: string;
}

// Test types
export interface Test {
  id: string;
  tenantId: string;
  title: string;
  description?: string;
  createdBy: string; // User ID
  subjectType: SubjectType;
  topicIds: string[];
  questions: TestQuestion[];
  totalMarks: number;
  duration: number; // in minutes
  startDate?: string;
  endDate?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  allowedClasses?: string[];
  allowedSections?: string[];
  instructions?: string;
  passingPercentage?: number;
  randomizeQuestions: boolean;
  showResults: boolean; // Whether to show results immediately after test
}

export interface TestQuestion {
  questionId: string;
  order: number;
  marks?: number; // Override default marks if needed
}

// Submission types
export interface TestSubmission {
  id: string;
  tenantId: string;
  testId: string;
  userId: string;
  startedAt: string;
  submittedAt?: string;
  answers: QuestionAnswer[];
  score: number;
  maxScore: number;
  percentage: number;
  status: SubmissionStatus;
  timeSpentPerQuestion?: Record<string, number>; // questionId -> seconds spent
  ipAddress?: string;
  browserInfo?: string;
  fullscreenExits?: number;
}

export enum SubmissionStatus {
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  TIMED_OUT = "TIMED_OUT",
  ABANDONED = "ABANDONED",
}

export interface QuestionAnswer {
  questionId: string;
  selectedOptionIds?: string[];
  textAnswer?: string;
  isCorrect: boolean;
  score: number;
  timeSpent?: number; // in seconds
}

// Analytics types
export interface PerformanceMetric {
  userId: string;
  tenantId: string;
  testId?: string;
  topicId?: string;
  subjectType: SubjectType;
  score: number;
  maxScore: number;
  percentage: number;
  timeTaken?: number; // in seconds
  timestamp: string;
  difficulty?: DifficultyLevel;
}

export interface AnalyticsSummary {
  overallPerformance: {
    score: number;
    maxScore: number;
    percentage: number;
  };
  subjectPerformance: Record<SubjectType, {
    score: number;
    maxScore: number;
    percentage: number;
  }>;
  recentTests: {
    testId: string;
    title: string;
    score: number;
    maxScore: number;
    percentage: number;
    date: string;
  }[];
  weakTopics: {
    topicId: string;
    name: string;
    percentage: number;
    subjectType: SubjectType;
  }[];
  strongTopics: {
    topicId: string;
    name: string;
    percentage: number;
    subjectType: SubjectType;
  }[];
}

// Auth types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tenant: Tenant | null;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  tenantDomain: string;
}

export interface AuthResponse {
  user: User;
  tenant: Tenant;
  token: string;
  refreshToken: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

// Pagination and filtering
export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}
