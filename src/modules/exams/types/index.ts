export type ExamType = 'QUIZ' | 'TEST' | 'MIDTERM' | 'FINAL';
export type ExamStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Exam {
    id: string;
    title: string;
    description: string;
    courseId: string;
    type: ExamType;
    status: ExamStatus;
    startDate: Date;
    endDate: Date;
    duration: number; // in minutes
}

export interface ExamQuestion {
    id: string;
    examId: string;
    question: string;
    options?: string[];
    answer: string;
    points: number;
}

export interface ExamSubmission {
    id: string;
    examId: string;
    userId: string;
    answers: Record<string, string>; // question id -> answer
    score?: number;
    submittedAt: Date;
} 