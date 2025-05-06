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
import EnhancedVideoConference from '@/components/classroom/EnhancedVideoConference';
import InteractiveWhiteboard from '@/components/classroom/InteractiveWhiteboard';
import BreakoutRooms from '@/components/classroom/BreakoutRooms';
import LivePoll from '@/components/classroom/LivePoll';
import AttendanceTracker from '@/components/classroom/AttendanceTracker';
import ManualAttendance from '@/components/classroom/ManualAttendance';
import QRCodeAttendance from '@/components/classroom/QRCodeAttendance';
import BiometricAttendance from '@/components/classroom/BiometricAttendance';
import FacialRecognitionAttendance from '@/components/classroom/FacialRecognitionAttendance';

// Services
import VideoConferenceService from '@/services/videoConference';

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
  const [showSettings, setShowSettings] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [attendanceMethod, setAttendanceMethod] = useState('manual');
  const [sessionData, setSessionData] = useState<any>(null);
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
    if (!classId) return;
    
    // First, try to find a scheduled video conference session
    const fetchSessionData = async () => {
      try {
        // In a real implementation, this would fetch the session by channel ID
        // For now, we're just getting user sessions and filtering
        const userSessions = await VideoConferenceService.getUserSessions(user?.id || '');
        const session = userSessions.find(s => s.channel === classId);
        
        if (session) {
          setSessionData(session);
          setClassroomData({
            title: session.title,
            description: session.description || '',
            teacher: session.hostName,
            startTime: session.startTime,
            endTime: session.endTime,
            id: session.channel,
            students: MOCK_STUDENTS
          });
          
          setIsRecording(session.isRecording);
          
          // Update session status if needed
          if (session.status === 'scheduled') {
            await VideoConferenceService.startSession(session.id);
          }
        }
        
        toast({
          title: 'Classroom Ready',
          description: 'You have joined the virtual classroom successfully',
        });
      } catch (error) {
        console.error('Error fetching session data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load classroom data',
          variant: 'destructive',
        });
      }
    };
    
    fetchSessionData();
  }, [classId, user?.id]);
  
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
  const endClass = async () => {
    if (sessionData?.id && isTeacher) {
      try {
        await VideoConferenceService.endSession(sessionData.id);
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }
    
    toast({
      title: 'Class Ended',
      description: 'The virtual classroom has been closed',
    });
    
    // Navigate back to dashboard
    setTimeout(() => {
      navigate(isTeacher ? '/teacher/dashboard' : '/dashboard');
    }, 1500);
  };
  
  const handleSessionEnd = () => {
    endClass();
  };
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'video':
        return (
          <EnhancedVideoConference
            sessionId={sessionData?.id}
            channel={classId || 'default-channel'}
            appId={AGORA_APP_ID}
            className="w-full h-full"
            isHost={isTeacher}
            onSessionEnd={handleSessionEnd}
          />
        );
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
        return (
          <EnhancedVideoConference
            sessionId={sessionData?.id}
            channel={classId || 'default-channel'}
            appId={AGORA_APP_ID}
            className="w-full h-full"
            isHost={isTeacher}
            onSessionEnd={handleSessionEnd}
          />
        );
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
            <Button
              variant="destructive"
              size="sm"
              onClick={endClass}
            >
              End Session
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-16 bg-gray-100 dark:bg-gray-800 border-r md:flex md:flex-col md:items-center py-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            orientation="vertical"
            className="w-full"
          >
            <TabsList className="w-full md:flex md:flex-col md:h-auto md:bg-transparent md:space-y-2">
              <TabsTrigger value="video" className="w-full md:w-12 h-12 flex flex-col items-center justify-center">
                <Video className="h-5 w-5" />
                <span className="text-xs mt-1 hidden md:inline-block">Video</span>
              </TabsTrigger>
              {sessionData?.features?.whiteboard && (
                <TabsTrigger value="whiteboard" className="w-full md:w-12 h-12 flex flex-col items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs mt-1 hidden md:inline-block">Board</span>
                </TabsTrigger>
              )}
              {isTeacher && sessionData?.features?.breakoutRooms && (
                <TabsTrigger value="breakout" className="w-full md:w-12 h-12 flex flex-col items-center justify-center">
                  <Users className="h-5 w-5" />
                  <span className="text-xs mt-1 hidden md:inline-block">Rooms</span>
                </TabsTrigger>
              )}
              {isTeacher && sessionData?.features?.polls && (
                <TabsTrigger value="poll" className="w-full md:w-12 h-12 flex flex-col items-center justify-center">
                  <BarChart className="h-5 w-5" />
                  <span className="text-xs mt-1 hidden md:inline-block">Polls</span>
                </TabsTrigger>
              )}
              {isTeacher && (
                <TabsTrigger value="attendance" className="w-full md:w-12 h-12 flex flex-col items-center justify-center">
                  <UserCheck className="h-5 w-5" />
                  <span className="text-xs mt-1 hidden md:inline-block">Attendance</span>
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 overflow-hidden">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default VirtualClassroom; 