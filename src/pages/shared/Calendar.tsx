import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';

// Mock event data
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Physics Test - Class 12',
    date: '2023-06-15',
    startTime: '09:00',
    endTime: '11:00',
    type: 'test',
    description: 'Final term physics test covering all chapters from the syllabus.',
    location: 'Room 101',
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    date: '2023-06-18',
    startTime: '14:00',
    endTime: '17:00',
    type: 'meeting',
    description: 'Individual meetings with parents to discuss student progress.',
    location: 'Main Hall',
  },
  {
    id: '3',
    title: 'Chemistry Lab Session',
    date: '2023-06-20',
    startTime: '10:30',
    endTime: '12:30',
    type: 'class',
    description: 'Practical lab session on organic chemistry reactions.',
    location: 'Chemistry Lab',
  },
  {
    id: '4',
    title: 'Staff Meeting',
    date: '2023-06-22',
    startTime: '15:00',
    endTime: '16:30',
    type: 'meeting',
    description: 'Monthly staff meeting to discuss academic progress and upcoming events.',
    location: 'Conference Room',
  },
  {
    id: '5',
    title: 'Mathematics Quiz',
    date: '2023-06-25',
    startTime: '11:00',
    endTime: '12:00',
    type: 'test',
    description: 'Quiz on calculus and algebra for Class 12 students.',
    location: 'Room 105',
  },
];

// Event type colors
const EVENT_COLORS = {
  test: 'bg-red-100 text-red-800 border-red-200',
  meeting: 'bg-blue-100 text-blue-800 border-blue-200',
  class: 'bg-green-100 text-green-800 border-green-200',
  holiday: 'bg-purple-100 text-purple-800 border-purple-200',
  activity: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    type: '',
    description: '',
    location: '',
  });

  // Get current month and year
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  // Logic to get days for the current month view
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const getPreviousMonthDays = (year: number, month: number) => {
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const daysInPreviousMonth = getDaysInMonth(year, month - 1);
    
    const days = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPreviousMonth - i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };
  
  const getCurrentMonthDays = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    return days;
  };
  
  const getNextMonthDays = (year: number, month: number, currentDays: number) => {
    const totalCells = 42; // 6 rows of 7 days
    const remainingCells = totalCells - currentDays;
    
    const days = [];
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };
  
  // Get all days to display
  const previousMonthDays = getPreviousMonthDays(year, month);
  const currentMonthDays = getCurrentMonthDays(year, month);
  const totalDaysSoFar = previousMonthDays.length + currentMonthDays.length;
  const nextMonthDays = getNextMonthDays(year, month, totalDaysSoFar);
  
  const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  
  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };
  
  // Handle adding a new event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.type) {
      const newEventWithId = {
        ...newEvent,
        id: Date.now().toString(),
      };
      
      setEvents([...events, newEventWithId]);
      setIsAddEventOpen(false);
      setNewEvent({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: '',
        description: '',
        location: '',
      });
    }
  };
  
  // Format date for display in the sidebar
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events.</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button className="perplexity-button">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new event to your calendar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select 
                      onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                      value={newEvent.type}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="test">Test</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="class">Class</SelectItem>
                          <SelectItem value="holiday">Holiday</SelectItem>
                          <SelectItem value="activity">Activity</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Enter event description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>
                  Add Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-3/4">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-bold mx-4">
                  {MONTHS[month]} {year}
                </h2>
                <Button variant="outline" size="icon" onClick={goToNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" onClick={goToToday}>
                Today
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {DAYS.map((day) => (
                <div key={day} className="py-2 text-center font-medium text-sm text-muted-foreground">
                  {day}
                </div>
              ))}
              
              {allDays.map((day, index) => {
                const dateString = day.date.toISOString().split('T')[0];
                const dayEvents = events.filter(event => event.date === dateString);
                const isToday = 
                  day.date.getDate() === new Date().getDate() &&
                  day.date.getMonth() === new Date().getMonth() &&
                  day.date.getFullYear() === new Date().getFullYear();
                const isSelected = selectedDate && 
                  day.date.getDate() === selectedDate.getDate() &&
                  day.date.getMonth() === selectedDate.getMonth() &&
                  day.date.getFullYear() === selectedDate.getFullYear();
                
                return (
                  <div 
                    key={index} 
                    className={`aspect-square border p-1 flex flex-col transition-colors duration-200 relative
                    ${!day.isCurrentMonth ? 'bg-muted/50 text-muted-foreground' : ''}
                    ${isToday ? 'border-primary' : ''}
                    ${isSelected ? 'ring-2 ring-primary ring-offset-1' : 'hover:bg-muted cursor-pointer'}
                    `}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <div className={`text-right p-1 text-sm ${isToday ? 'font-bold text-primary' : ''}`}>
                      {day.date.getDate()}
                    </div>
                    <div className="flex-grow overflow-y-auto">
                      {dayEvents.slice(0, 2).map((event, idx) => (
                        <div 
                          key={idx} 
                          className={`text-xs mb-1 px-1 py-0.5 rounded border ${EVENT_COLORS[event.type as keyof typeof EVENT_COLORS] || 'bg-gray-100'} truncate`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground px-1">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:w-1/4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              {selectedDate ? formatDate(selectedDate) : 'Event Details'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Events</h3>
                  <Button variant="outline" size="sm" onClick={() => {
                    const formattedDate = selectedDate.toISOString().split('T')[0];
                    setNewEvent({...newEvent, date: formattedDate});
                    setIsAddEventOpen(true);
                  }}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                
                {getEventsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div key={event.id} className={`rounded-lg border p-3 ${EVENT_COLORS[event.type as keyof typeof EVENT_COLORS] || 'bg-gray-100'}`}>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm mt-1">
                          {event.startTime} - {event.endTime} | {event.location}
                        </div>
                        {event.description && (
                          <div className="text-sm mt-2 text-muted-foreground">
                            {event.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No events scheduled for this day</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => {
                        const formattedDate = selectedDate.toISOString().split('T')[0];
                        setNewEvent({...newEvent, date: formattedDate});
                        setIsAddEventOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Event
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarIcon className="mx-auto h-12 w-12 opacity-30 mb-2" />
                <p>Select a date to view events</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter(event => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map(event => (
                <div key={event.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className={`w-3 h-3 rounded-full mt-1.5 mr-3 ${EVENT_COLORS[event.type as keyof typeof EVENT_COLORS].split(' ')[0]}`}></div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        {' • '}
                        {event.startTime} - {event.endTime}
                        {' • '}
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={EVENT_COLORS[event.type as keyof typeof EVENT_COLORS]}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
              ))
            }
            
            {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <p>No upcoming events</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage; 