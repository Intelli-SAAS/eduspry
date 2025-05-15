export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

export interface Attendance {
    id: string;
    userId: string;
    courseId: string;
    date: Date;
    status: AttendanceStatus;
    notes?: string;
} 