export type LiveClassStatus = 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export interface LiveClass {
    id: string;
    title: string;
    description: string;
    courseId: string;
    instructorId: string;
    status: LiveClassStatus;
    startTime: Date;
    endTime: Date;
    meetingLink: string;
    recordingUrl?: string;
}

export interface LiveClassParticipant {
    id: string;
    liveClassId: string;
    userId: string;
    joinTime: Date;
    leaveTime?: Date;
} 