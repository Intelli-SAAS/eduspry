import axios from 'axios';
import { nanoid } from 'nanoid';

// Types for video conferencing
export interface VideoConferenceSession {
  id: string;
  title: string;
  description?: string;
  hostId: string;
  hostName: string;
  startTime: Date;
  endTime: Date;
  channel: string;
  token?: string;
  password?: string;
  participants: string[];
  isRecording: boolean;
  recordingUrl?: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  features: {
    screenSharing: boolean;
    chat: boolean;
    recording: boolean;
    breakoutRooms: boolean;
    whiteboard: boolean;
    polls: boolean;
    handRaising: boolean;
  };
  recurring?: {
    pattern: 'daily' | 'weekly' | 'monthly';
    endDate: Date;
    daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoConferenceParticipant {
  userId: string;
  userName: string;
  role: 'host' | 'cohost' | 'participant';
  joinTime?: Date;
  leaveTime?: Date;
  hasMic: boolean;
  hasCamera: boolean;
  hasScreenShare: boolean;
  isHandRaised: boolean;
}

// Mock storage for video conferences in development
let mockVideoConferences: VideoConferenceSession[] = [];

// Configuration
const AGORA_APP_ID = 'bd8d0d649a6f40caabe31c357ed0e74d'; // Mock App ID - should come from environment in production
const BASE_URL = 'https://api.agora.io/v1';

/**
 * Service for managing video conferencing sessions
 */
export const VideoConferenceService = {
  /**
   * Create a new video conference session
   */
  createSession: async (
    title: string,
    hostId: string,
    hostName: string,
    startTime: Date,
    endTime: Date,
    description?: string,
    password?: string,
    features?: Partial<VideoConferenceSession['features']>,
    recurring?: VideoConferenceSession['recurring']
  ): Promise<VideoConferenceSession> => {
    // In a real implementation, this would make an API call to generate a token
    const channel = nanoid(10);
    
    const newSession: VideoConferenceSession = {
      id: nanoid(),
      title,
      description,
      hostId,
      hostName,
      startTime,
      endTime,
      channel,
      password,
      participants: [hostId],
      isRecording: false,
      status: 'scheduled',
      features: {
        screenSharing: true,
        chat: true,
        recording: true,
        breakoutRooms: true,
        whiteboard: true,
        polls: true,
        handRaising: true,
        ...features
      },
      recurring,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add to mock storage
    mockVideoConferences.push(newSession);
    
    return newSession;
  },
  
  /**
   * Get a video conference session by ID
   */
  getSession: async (sessionId: string): Promise<VideoConferenceSession | null> => {
    // In production, this would make an API call
    const session = mockVideoConferences.find(s => s.id === sessionId);
    return session || null;
  },
  
  /**
   * Get all video conference sessions for a user
   */
  getUserSessions: async (userId: string): Promise<VideoConferenceSession[]> => {
    // In production, this would make an API call
    return mockVideoConferences.filter(s => 
      s.hostId === userId || s.participants.includes(userId)
    );
  },
  
  /**
   * Update a video conference session
   */
  updateSession: async (
    sessionId: string, 
    updates: Partial<VideoConferenceSession>
  ): Promise<VideoConferenceSession | null> => {
    // In production, this would make an API call
    const sessionIndex = mockVideoConferences.findIndex(s => s.id === sessionId);
    
    if (sessionIndex === -1) return null;
    
    const updatedSession = {
      ...mockVideoConferences[sessionIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    mockVideoConferences[sessionIndex] = updatedSession;
    
    return updatedSession;
  },
  
  /**
   * Delete a video conference session
   */
  deleteSession: async (sessionId: string): Promise<boolean> => {
    // In production, this would make an API call
    const sessionIndex = mockVideoConferences.findIndex(s => s.id === sessionId);
    
    if (sessionIndex === -1) return false;
    
    mockVideoConferences.splice(sessionIndex, 1);
    
    return true;
  },
  
  /**
   * Start a video conference session
   */
  startSession: async (sessionId: string): Promise<VideoConferenceSession | null> => {
    // In production, this would make an API call to update the session status
    return VideoConferenceService.updateSession(sessionId, { status: 'active' });
  },
  
  /**
   * End a video conference session
   */
  endSession: async (sessionId: string): Promise<VideoConferenceSession | null> => {
    // In production, this would make an API call to update the session status
    return VideoConferenceService.updateSession(sessionId, { status: 'completed' });
  },
  
  /**
   * Generate an Agora token for a user to join a session
   */
  generateToken: async (channel: string, userId: string, role: 'publisher' | 'subscriber'): Promise<string> => {
    // In a real implementation, this would make an API call to a secure backend to generate a token
    // For development, we're returning a mock token
    return `agora-token-${channel}-${userId}-${role}-${Date.now()}`;
  },
  
  /**
   * Add a participant to a session
   */
  addParticipant: async (sessionId: string, userId: string): Promise<boolean> => {
    const session = await VideoConferenceService.getSession(sessionId);
    
    if (!session) return false;
    
    if (!session.participants.includes(userId)) {
      return !!(await VideoConferenceService.updateSession(sessionId, {
        participants: [...session.participants, userId]
      }));
    }
    
    return true;
  },
  
  /**
   * Start recording a session
   */
  startRecording: async (sessionId: string): Promise<VideoConferenceSession | null> => {
    // In production, this would call the Agora Cloud Recording API
    return VideoConferenceService.updateSession(sessionId, { 
      isRecording: true
    });
  },
  
  /**
   * Stop recording a session
   */
  stopRecording: async (sessionId: string): Promise<VideoConferenceSession | null> => {
    // In production, this would call the Agora Cloud Recording API and get the recording URL
    return VideoConferenceService.updateSession(sessionId, { 
      isRecording: false,
      recordingUrl: `https://storage.example.com/recordings/${sessionId}-${Date.now()}.mp4`
    });
  },
  
  /**
   * Schedule a calendar event for a video conference
   */
  scheduleCalendarEvent: async (
    sessionId: string, 
    userIds: string[]
  ): Promise<boolean> => {
    // In production, this would integrate with a calendar service
    const session = await VideoConferenceService.getSession(sessionId);
    
    if (!session) return false;
    
    console.log(`Calendar event created for session ${sessionId} for users: ${userIds.join(', ')}`);
    
    return true;
  }
};

export default VideoConferenceService; 