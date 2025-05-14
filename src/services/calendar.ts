import { nanoid } from 'nanoid';
import { VideoConferenceSession } from './videoConference';

// Calendar event interface
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  type: 'test' | 'meeting' | 'class' | 'holiday' | 'activity' | 'video-conference';
  createdBy: string;
  attendees: string[];
  videoConferenceId?: string;
  videoConferenceLink?: string;
  reminderMinutes?: number[];
  recurrence?: {
    pattern: 'daily' | 'weekly' | 'monthly';
    endDate?: Date;
    daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  };
  createdAt: Date;
  updatedAt: Date;
}

// Mock storage for calendar events in development
let mockCalendarEvents: CalendarEvent[] = [];

/**
 * Service for managing calendar events
 */
export const CalendarService = {
  /**
   * Create a new calendar event
   */
  createEvent: async (
    title: string,
    startTime: Date,
    endTime: Date,
    createdBy: string,
    attendees: string[],
    type: CalendarEvent['type'] = 'meeting',
    description?: string,
    location?: string,
    reminderMinutes: number[] = [10, 30],
    recurrence?: CalendarEvent['recurrence']
  ): Promise<CalendarEvent> => {
    const newEvent: CalendarEvent = {
      id: nanoid(),
      title,
      description,
      startTime,
      endTime,
      location,
      type,
      createdBy,
      attendees,
      reminderMinutes,
      recurrence,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add to mock storage
    mockCalendarEvents.push(newEvent);
    
    return newEvent;
  },
  
  /**
   * Create a calendar event for a video conference
   */
  createVideoConferenceEvent: async (
    videoConference: VideoConferenceSession,
    createdBy: string,
    attendees: string[],
    reminderMinutes: number[] = [10, 30]
  ): Promise<CalendarEvent> => {
    const videoLink = `${window.location.origin}/classroom/${videoConference.channel}`;
    
    const newEvent = await CalendarService.createEvent(
      videoConference.title,
      videoConference.startTime,
      videoConference.endTime,
      createdBy,
      attendees,
      'video-conference',
      videoConference.description,
      videoLink,
      reminderMinutes,
      videoConference.recurring
    );
    
    // Update with video conference info
    return CalendarService.updateEvent(newEvent.id, {
      videoConferenceId: videoConference.id,
      videoConferenceLink: videoLink
    });
  },
  
  /**
   * Get a calendar event by ID
   */
  getEvent: async (eventId: string): Promise<CalendarEvent | null> => {
    const event = mockCalendarEvents.find(e => e.id === eventId);
    return event || null;
  },
  
  /**
   * Update a calendar event
   */
  updateEvent: async (
    eventId: string, 
    updates: Partial<CalendarEvent>
  ): Promise<CalendarEvent> => {
    const eventIndex = mockCalendarEvents.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    
    const updatedEvent = {
      ...mockCalendarEvents[eventIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    mockCalendarEvents[eventIndex] = updatedEvent;
    
    return updatedEvent;
  },
  
  /**
   * Delete a calendar event
   */
  deleteEvent: async (eventId: string): Promise<boolean> => {
    const eventIndex = mockCalendarEvents.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) return false;
    
    mockCalendarEvents.splice(eventIndex, 1);
    
    return true;
  },
  
  /**
   * Get all events for a specific user
   */
  getUserEvents: async (userId: string, startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> => {
    let events = mockCalendarEvents.filter(e => 
      e.createdBy === userId || e.attendees.includes(userId)
    );
    
    if (startDate) {
      events = events.filter(e => e.startTime >= startDate);
    }
    
    if (endDate) {
      events = events.filter(e => e.startTime <= endDate);
    }
    
    return events;
  },
  
  /**
   * Get all events between two dates
   */
  getEventsBetweenDates: async (startDate: Date, endDate: Date): Promise<CalendarEvent[]> => {
    return mockCalendarEvents.filter(e => 
      e.startTime >= startDate && e.startTime <= endDate
    );
  },
  
  /**
   * Add attendees to an event
   */
  addAttendeesToEvent: async (eventId: string, attendeeIds: string[]): Promise<CalendarEvent> => {
    const event = await CalendarService.getEvent(eventId);
    
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    
    const newAttendees = [...new Set([...event.attendees, ...attendeeIds])];
    
    return CalendarService.updateEvent(eventId, {
      attendees: newAttendees
    });
  },
  
  /**
   * Remove attendees from an event
   */
  removeAttendeesFromEvent: async (eventId: string, attendeeIds: string[]): Promise<CalendarEvent> => {
    const event = await CalendarService.getEvent(eventId);
    
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    
    const newAttendees = event.attendees.filter(id => !attendeeIds.includes(id));
    
    return CalendarService.updateEvent(eventId, {
      attendees: newAttendees
    });
  }
};

export default CalendarService; 