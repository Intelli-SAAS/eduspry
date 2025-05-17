export type ApplicationStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'WAITLISTED';

export interface Application {
    id: string;
    userId: string;
    programId: string;
    status: ApplicationStatus;
    submittedAt?: Date;
    reviewedAt?: Date;
    reviewerId?: string;
    notes?: string;
}

export interface Program {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    applicationDeadline: Date;
    capacity: number;
    enrolledCount: number;
} 