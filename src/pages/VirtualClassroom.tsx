import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video,
  Users,
  BarChart, 
  UserCheck, 
  Settings2,
  MessageSquare,
  Crown,
  BookOpen,
  QrCode,
  Fingerprint,
  Camera
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Components
import VideoConference from '@/components/classroom/VideoConference';
import InteractiveWhiteboard from '@/components/classroom/InteractiveWhiteboard';
import BreakoutRooms from '@/components/classroom/BreakoutRooms';
import LivePoll from '@/components/classroom/LivePoll';
import AttendanceTracker from '@/components/classroom/AttendanceTracker';
import ManualAttendance from '@/components/classroom/ManualAttendance';
import QRCodeAttendance from '@/components/classroom/QRCodeAttendance';
import BiometricAttendance from '@/components/classroom/BiometricAttendance';
import FacialRecognitionAttendance from '@/components/classroom/FacialRecognitionAttendance';

// Mock API key - In production, this would be from an environment variable
const AGORA_APP_ID = 'bd8d0d649a6f40caabe31c357ed0e74d';

// Mock data
const MOCK_STUDENTS = Array.from({ length: 20 }).map((_, index) => ({
  id: `student-${index + 1}`,
  name: `Student ${index + 1}`,
  profileImage: '',
}));

// Virtual Classroom page component
const VirtualClassroom: React.FC = () => {
  // Hooks
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State
  const [activeTab, setActiveTab] = useState('video');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingData, setRecordingData] = useState<Blob | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [attendanceMethod, setAttendanceMethod] = useState('manual');
  const [classroomData, setClassroomData] = useState({
    title: 'Physics Class',
    description: 'Advanced concepts in quantum mechanics',
    teacher: 'Prof. Einstein',
    startTime: new Date(),
    endTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    id: 'classroom-101',
    students: MOCK_STUDENTS
  });
  
  // Determine if user is a teacher
  useEffect(() => {
    setIsTeacher(user?.role === UserRole.TEACHER);
  }, [user]);
  
  // Load classroom data
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    console.log(`Loading class data for class ID: ${classId}`);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      toast({
        title: 'Classroom Ready',
        description: 'You have joined the virtual classroom successfully',
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [classId]);
  
  // Toggle recording state
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      
      // In a real app, you would save the recording to storage
      toast({
        title: 'Recording Stopped',
        description: 'Your class recording has been saved',
      });
      
      // Mock setting recording data
      setRecordingData(new Blob());
    } else {
      // Start recording
      setIsRecording(true);
      
      toast({
        title: 'Recording Started',
        description: 'This classroom session is now being recorded',
      });
    }
  };
  
  // Download recording
  const downloadRecording = () => {
    if (!recordingData) return;
    
    // Mock download functionality
    const url = URL.createObjectURL(recordingData);
    const a = document.createElement('a');
    a.href = url;
    a.download = `class-recording-${new Date().toISOString()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  // Handle attendance marked
  const handleAttendanceMarked = (record: any) => {
    console.log('Attendance recorded:', record);
    
    toast({
      title: 'Attendance Recorded',
      description: `Marked ${record.students.filter((s: any) => s.present).length} students present`,
    });
  };
  
  // Handle poll created
  const handlePollCreated = (poll: any) => {
    console.log('New poll created:', poll);
  };
  
  // Handle poll ended
  const handlePollEnded = (results: any) => {
    console.log('Poll ended with results:', results);
  };
  
  // Handle breakout room join
  const handleJoinBreakoutRoom = (roomId: string) => {
    console.log(`Joining breakout room: ${roomId}`);
    
    // In a real app, this would switch the video conference to the breakout room
    toast({
      title: 'Joined Breakout Room',
      description: 'You are now in a smaller discussion group',
    });
  };
  
  // End the class (teacher only)
  const endClass = () => {
    // In a real app, this would end the class for all participants
    toast({
      title: 'Class Ended',
      description: 'The virtual classroom has been closed',
    });
    
    // Navigate back to dashboard
    setTimeout(() => {
      navigate(isTeacher ? '/teacher/dashboard' : '/dashboard');
    }, 1500);
  };
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'video':
        return <VideoConference className="w-full h-full" appId={AGORA_APP_ID} channel={classroomData?.id || 'classroom'} isHost={isTeacher} />;
      case 'whiteboard':
        return <InteractiveWhiteboard className="w-full h-full" readOnly={!isTeacher} />;
      case 'breakout':
        return <BreakoutRooms className="w-full h-full" students={classroomData?.students || []} isHost={isTeacher} />;
      case 'poll':
        return <LivePoll className="w-full h-full" isTeacher={isTeacher} />;
      case 'attendance':
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Select 
                defaultValue={attendanceMethod} 
                onValueChange={setAttendanceMethod}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select attendance method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Attendance</SelectItem>
                  <SelectItem value="qr">QR Code Attendance</SelectItem>
                  <SelectItem value="biometric">Biometric Attendance</SelectItem>
                  <SelectItem value="facial">Facial Recognition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              {attendanceMethod === 'manual' && (
                <ManualAttendance className="h-full" />
              )}
              {attendanceMethod === 'qr' && (
                <QRCodeAttendance className="h-full" />
              )}
              {attendanceMethod === 'biometric' && (
                <BiometricAttendance className="h-full" />
              )}
              {attendanceMethod === 'facial' && (
                <FacialRecognitionAttendance className="h-full" />
              )}
            </div>
          </div>
        );
      case 'chat':
        return <div className="flex items-center justify-center h-full">Chat functionality coming soon...</div>;
      default:
        return <VideoConference className="w-full h-full" appId={AGORA_APP_ID} channel={classroomData?.id || 'classroom'} isHost={isTeacher} />;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{classroomData.title}</h1>
            <p className="text-gray-500 dark:text-gray-400">{classroomData.description}</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            {/* Recording controls */}
            <div className="flex items-center">
              {isRecording && (
                <div className="flex items-center mr-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-1"></div>
                  <span className="text-sm text-red-500">Recording</span>
                </div>
              )}
              
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={toggleRecording}
              >
                {isRecording ? 'Stop Recording' : 'Record Session'}
              </Button>
              
              {recordingData && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadRecording}
                  className="ml-2"
                >
                  Download Recording
                </Button>
              )}
            </div>
            
            {/* End class button (teacher only) */}
            {isTeacher && (
              <Button
                variant="destructive"
                size="sm"
                onClick={endClass}
              >
                End Class
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 container mx-auto p-4 overflow-hidden flex flex-col">
        <Tabs
          defaultValue="video"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <div className="border-b mb-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span>Video</span>
              </TabsTrigger>
              <TabsTrigger value="whiteboard" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Whiteboard</span>
              </TabsTrigger>
              <TabsTrigger value="breakout" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Breakout Rooms</span>
              </TabsTrigger>
              <TabsTrigger value="poll" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                <span>Polls & Quizzes</span>
              </TabsTrigger>
              <TabsTrigger value="attendance" className="flex items-center gap-1">
                <UserCheck className="h-4 w-4" />
                <span>Attendance</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <TabsContent value="video" className="m-0 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden h-full">
                {renderActiveTab()}
              </div>
            </TabsContent>
            
            <TabsContent value="whiteboard" className="m-0 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden h-full">
                {renderActiveTab()}
              </div>
            </TabsContent>
            
            <TabsContent value="breakout" className="m-0 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden h-full">
                {renderActiveTab()}
              </div>
            </TabsContent>
            
            <TabsContent value="poll" className="m-0 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden h-full">
                {renderActiveTab()}
              </div>
            </TabsContent>
            
            <TabsContent value="attendance" className="m-0 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden h-full">
                {renderActiveTab()}
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="m-0 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden h-full p-4">
                {renderActiveTab()}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default VirtualClassroom; 