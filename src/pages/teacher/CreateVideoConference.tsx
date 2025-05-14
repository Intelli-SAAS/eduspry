import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { format, addHours, addDays, addWeeks, isAfter, set, parse } from 'date-fns';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock, Users, Video, Copy, Calendar as CalendarIcon2, CircleSlash } from 'lucide-react';

// Services
import VideoConferenceService, { VideoConferenceSession } from '@/services/videoConference';
import CalendarService from '@/services/calendar';

const CreateVideoConference: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState('60');
  const [password, setPassword] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [pattern, setPattern] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [endDate, setEndDate] = useState<Date | undefined>(addWeeks(new Date(), 4));
  const [weekdays, setWeekdays] = useState([1, 3, 5]); // Monday, Wednesday, Friday
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [showClassOptions, setShowClassOptions] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  
  // Feature toggles
  const [enableChat, setEnableChat] = useState(true);
  const [enableScreenShare, setEnableScreenShare] = useState(true);
  const [enableRecording, setEnableRecording] = useState(true);
  const [enableWhiteboard, setEnableWhiteboard] = useState(true);
  const [enablePolls, setEnablePolls] = useState(true);
  const [enableBreakoutRooms, setEnableBreakoutRooms] = useState(true);
  const [enableHandRaising, setEnableHandRaising] = useState(true);
  
  // Mock data for classes, sections, and students
  const [classes, setClasses] = useState([
    { id: '1', name: '12th Science' },
    { id: '2', name: '12th Commerce' },
    { id: '3', name: '11th Science' },
    { id: '4', name: '11th Commerce' },
  ]);
  
  const [sections, setSections] = useState([
    { id: '1', name: 'A', classId: '1' },
    { id: '2', name: 'B', classId: '1' },
    { id: '3', name: 'A', classId: '2' },
    { id: '4', name: 'B', classId: '2' },
    { id: '5', name: 'A', classId: '3' },
    { id: '6', name: 'B', classId: '3' },
    { id: '7', name: 'A', classId: '4' },
    { id: '8', name: 'B', classId: '4' },
  ]);
  
  const [students, setStudents] = useState([
    { id: '1', name: 'Student 1', classId: '1', sectionId: '1' },
    { id: '2', name: 'Student 2', classId: '1', sectionId: '1' },
    { id: '3', name: 'Student 3', classId: '1', sectionId: '2' },
    { id: '4', name: 'Student 4', classId: '1', sectionId: '2' },
    { id: '5', name: 'Student 5', classId: '2', sectionId: '3' },
    { id: '6', name: 'Student 6', classId: '2', sectionId: '3' },
  ]);
  
  // Filtered sections based on selected class
  const filteredSections = sections.filter(section => section.classId === selectedClass);
  
  // Filtered students based on selected class and section
  const filteredStudents = students.filter(student => {
    if (!showClassOptions) return true;
    if (!selectedClass) return true;
    if (selectedClass && !selectedSection) return student.classId === selectedClass;
    return student.classId === selectedClass && student.sectionId === selectedSection;
  });

  // Calculate end time based on start time and duration
  const calculateEndTime = (): Date => {
    if (!date) return addHours(new Date(), 1);
    
    // Parse start time and add duration
    const startHour = parseInt(startTime.split(':')[0], 10);
    const startMinute = parseInt(startTime.split(':')[1], 10);
    const startDateTime = set(new Date(date), { hours: startHour, minutes: startMinute, seconds: 0 });
    
    return addHours(startDateTime, parseInt(duration, 10) / 60);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a video conference.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!title) {
      toast({
        title: 'Error',
        description: 'Please enter a title for your meeting.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!date) {
      toast({
        title: 'Error',
        description: 'Please select a date for your meeting.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const startDateTime = new Date(date);
      const [hours, minutes] = startTime.split(':').map(Number);
      startDateTime.setHours(hours, minutes, 0);
      
      const endDateTime = calculateEndTime();
      
      // Validate times
      if (isAfter(startDateTime, endDateTime)) {
        toast({
          title: 'Error',
          description: 'End time must be after start time.',
          variant: 'destructive',
        });
        return;
      }
      
      // Prepare recurring settings if enabled
      let recurringSettings = undefined;
      if (recurring && endDate) {
        recurringSettings = {
          pattern,
          endDate,
          daysOfWeek: pattern === 'weekly' ? weekdays : undefined
        };
      }
      
      // Prepare features object
      const features = {
        chat: enableChat,
        screenSharing: enableScreenShare,
        recording: enableRecording,
        whiteboard: enableWhiteboard,
        polls: enablePolls,
        breakoutRooms: enableBreakoutRooms,
        handRaising: enableHandRaising,
      };
      
      // Create the session
      const session = await VideoConferenceService.createSession(
        title,
        user.id,
        `${user.firstName} ${user.lastName}`,
        startDateTime,
        endDateTime,
        description,
        password || undefined,
        features,
        recurringSettings
      );
      
      // Create a calendar event for the session
      const participants = showClassOptions 
        ? students
            .filter(student => 
              (selectedClass ? student.classId === selectedClass : true) && 
              (selectedSection ? student.sectionId === selectedSection : true)
            )
            .map(student => student.id)
        : selectedParticipants;
      
      await CalendarService.createVideoConferenceEvent(
        session,
        user.id,
        participants
      );
      
      toast({
        title: 'Success',
        description: 'Video conference created and scheduled successfully!',
      });
      
      // Redirect to the virtual classroom page
      navigate(`/classroom/${session.channel}`);
    } catch (error) {
      console.error('Error creating video conference:', error);
      toast({
        title: 'Error',
        description: 'Failed to create video conference. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  // Toggle participant selection
  const toggleParticipant = (studentId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };
  
  // Toggle weekday selection for recurring meetings
  const toggleWeekday = (day: number) => {
    setWeekdays(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    );
  };
  
  // Format date for display
  const formatDate = (date?: Date) => {
    return date ? format(date, 'PPP') : '';
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Video Conference</h1>
          <p className="text-muted-foreground">Schedule a new virtual classroom session</p>
        </div>
        <Button onClick={() => navigate('/teacher/dashboard')}>Cancel</Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main settings panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Details</CardTitle>
                <CardDescription>
                  Set the basic information for your video conference.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input 
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Physics Class - Electromagnetic Waves"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details about this meeting..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? formatDate(date) : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger id="startTime" className="w-full">
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, hour) => (
                          <React.Fragment key={hour}>
                            <SelectItem value={`${hour.toString().padStart(2, '0')}:00`}>
                              {`${hour.toString().padStart(2, '0')}:00`}
                            </SelectItem>
                            <SelectItem value={`${hour.toString().padStart(2, '0')}:30`}>
                              {`${hour.toString().padStart(2, '0')}:30`}
                            </SelectItem>
                          </React.Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password (Optional)</Label>
                    <Input
                      id="password"
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Leave blank for no password"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="recurring" checked={recurring} onCheckedChange={setRecurring} />
                  <Label htmlFor="recurring" className="cursor-pointer">
                    Recurring Meeting
                  </Label>
                </div>
                
                {recurring && (
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pattern">Recurrence Pattern</Label>
                      <Select value={pattern} onValueChange={(value: any) => setPattern(value)}>
                        <SelectTrigger id="pattern">
                          <SelectValue placeholder="Select pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {pattern === 'weekly' && (
                      <div className="space-y-2">
                        <Label>Repeat on</Label>
                        <div className="flex flex-wrap gap-2">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                            <Button
                              key={day}
                              type="button"
                              variant={weekdays.includes(index) ? "default" : "outline"}
                              className="h-10 w-10 p-0 rounded-full"
                              onClick={() => toggleWeekday(index)}
                            >
                              {day.charAt(0)}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? formatDate(endDate) : "Select an end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Meeting Features</CardTitle>
                <CardDescription>
                  Customize which features are enabled for this meeting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <Label htmlFor="enableChat">Chat</Label>
                    </div>
                    <Switch id="enableChat" checked={enableChat} onCheckedChange={setEnableChat} />
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Video className="h-5 w-5 text-primary" />
                      <Label htmlFor="enableScreenShare">Screen Sharing</Label>
                    </div>
                    <Switch id="enableScreenShare" checked={enableScreenShare} onCheckedChange={setEnableScreenShare} />
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <CircleSlash className="h-5 w-5 text-primary" />
                      <Label htmlFor="enableRecording">Recording</Label>
                    </div>
                    <Switch id="enableRecording" checked={enableRecording} onCheckedChange={setEnableRecording} />
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Copy className="h-5 w-5 text-primary" />
                      <Label htmlFor="enableWhiteboard">Whiteboard</Label>
                    </div>
                    <Switch id="enableWhiteboard" checked={enableWhiteboard} onCheckedChange={setEnableWhiteboard} />
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon2 className="h-5 w-5 text-primary" />
                      <Label htmlFor="enablePolls">Polls</Label>
                    </div>
                    <Switch id="enablePolls" checked={enablePolls} onCheckedChange={setEnablePolls} />
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <Label htmlFor="enableBreakoutRooms">Breakout Rooms</Label>
                    </div>
                    <Switch id="enableBreakoutRooms" checked={enableBreakoutRooms} onCheckedChange={setEnableBreakoutRooms} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Participants panel */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Participants</CardTitle>
                <CardDescription>
                  Select who can join this video conference.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="showClassOptions" checked={showClassOptions} onCheckedChange={setShowClassOptions} />
                  <Label htmlFor="showClassOptions" className="cursor-pointer">
                    Invite entire class
                  </Label>
                </div>
                
                {showClassOptions && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger id="class">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map(cls => (
                            <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedClass && (
                      <div className="space-y-2">
                        <Label htmlFor="section">Section (Optional)</Label>
                        <Select value={selectedSection} onValueChange={setSelectedSection}>
                          <SelectTrigger id="section">
                            <SelectValue placeholder="All sections" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All sections</SelectItem>
                            {filteredSections.map(section => (
                              <SelectItem key={section.id} value={section.id}>{section.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="border rounded-md p-2">
                      <p className="text-sm font-medium mb-2">
                        {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} will be invited
                      </p>
                    </div>
                  </div>
                )}
                
                {!showClassOptions && (
                  <div className="border rounded-md p-2 max-h-[300px] overflow-y-auto">
                    <p className="text-sm font-medium mb-2">Select individual participants:</p>
                    <div className="space-y-2">
                      {students.map(student => (
                        <div key={student.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`student-${student.id}`}
                            checked={selectedParticipants.includes(student.id)}
                            onCheckedChange={() => toggleParticipant(student.id)}
                          />
                          <Label htmlFor={`student-${student.id}`} className="cursor-pointer">
                            {student.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Create Meeting
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateVideoConference; 