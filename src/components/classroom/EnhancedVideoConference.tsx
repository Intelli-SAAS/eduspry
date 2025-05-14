import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Mic, MicOff, Video, VideoOff, ScreenShare, Users, Settings, MessageSquare,
  Share2, Phone, PhoneOff, Hand, Coffee, CircleSlash, PauseCircle, UserPlus, UserMinus,
  Layout, Monitor, Grid, ChevronUp, ChevronDown, Cog, X
} from 'lucide-react';
import VideoConferenceComponent, { VideoConferenceRefMethods } from './VideoConference';

// Import services
import VideoConferenceService from '@/services/videoConference';

interface EnhancedVideoConferenceProps {
  sessionId?: string;
  channel: string;
  appId: string;
  className?: string;
  isHost?: boolean;
  participantLimit?: number;
  onSessionEnd?: () => void;
}

const EnhancedVideoConference: React.FC<EnhancedVideoConferenceProps> = ({
  sessionId,
  channel,
  appId,
  className = '',
  isHost = false,
  participantLimit = 50,
  onSessionEnd
}) => {
  // State for video conference
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [remoteParticipants, setRemoteParticipants] = useState<any[]>([]);
  const [layout, setLayout] = useState<'gallery' | 'speaker' | 'sidebar'>('gallery');
  
  // State for UI components
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  
  // Refs
  const videoRef = useRef<React.ElementRef<typeof VideoConferenceComponent>>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Load session data if sessionId is provided
  useEffect(() => {
    if (sessionId) {
      const loadSessionData = async () => {
        try {
          const session = await VideoConferenceService.getSession(sessionId);
          if (session) {
            // Initialize component with session data
            console.log('Loaded session data:', session);
          }
        } catch (error) {
          console.error('Error loading session:', error);
          toast({
            title: 'Error',
            description: 'Failed to load video conference session data',
            variant: 'destructive',
          });
        }
      };
      
      loadSessionData();
    }
  }, [sessionId]);

  // Handlers for video conference
  const handleMicToggle = () => {
    setIsMicMuted(!isMicMuted);
    // Call the VideoConference's toggleMic method
    if (videoRef.current) {
      videoRef.current.toggleMic?.();
    }
  };

  const handleVideoToggle = () => {
    setIsVideoOff(!isVideoOff);
    // Call the VideoConference's toggleCamera method
    if (videoRef.current) {
      videoRef.current.toggleCamera?.();
    }
  };

  const handleScreenShareToggle = () => {
    setIsScreenSharing(!isScreenSharing);
    // Call the VideoConference's toggleScreenShare method
    if (videoRef.current) {
      videoRef.current.toggleScreenShare?.();
    }
  };

  const handleRecordingToggle = async () => {
    if (!sessionId) return;
    
    try {
      if (isRecording) {
        await VideoConferenceService.stopRecording(sessionId);
        toast({
          title: 'Recording Stopped',
          description: 'Meeting recording has been stopped',
        });
      } else {
        await VideoConferenceService.startRecording(sessionId);
        toast({
          title: 'Recording Started',
          description: 'Meeting is now being recorded',
        });
      }
      setIsRecording(!isRecording);
    } catch (error) {
      console.error('Error toggling recording:', error);
      toast({
        title: 'Error',
        description: 'Failed to toggle recording',
        variant: 'destructive',
      });
    }
  };

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    // In a real implementation, this would notify other participants
    
    if (!isHandRaised) {
      toast({
        title: 'Hand Raised',
        description: 'Other participants can see you have a question',
      });
    }
  };

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;
    
    // Add new message to chat
    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      text: newMessageText,
      timestamp: new Date(),
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setNewMessageText('');
    
    // Scroll to bottom of chat
    setTimeout(() => {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleEndCall = async () => {
    if (isHost && sessionId) {
      try {
        await VideoConferenceService.endSession(sessionId);
        toast({
          title: 'Meeting Ended',
          description: 'You have ended the meeting for all participants',
        });
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }
    
    onSessionEnd?.();
  };

  const generateMeetingInvite = () => {
    const meetingUrl = `${window.location.origin}/classroom/${channel}`;
    return {
      url: meetingUrl,
      details: `Join my classroom session at ${meetingUrl}\nMeeting ID: ${channel}`
    };
  };

  const handleCopyInvite = () => {
    const { details } = generateMeetingInvite();
    navigator.clipboard.writeText(details);
    
    toast({
      title: 'Copied to Clipboard',
      description: 'Meeting invitation copied to clipboard',
    });
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Main video area */}
      <div className="flex-1 bg-black relative">
        {/* Video component */}
        <VideoConferenceComponent
          ref={videoRef}
          channel={channel}
          appId={appId}
          isHost={isHost}
          className="w-full h-full"
          onUserJoined={(userId) => {
            console.log(`User joined: ${userId}`);
            // Update remote participants state
            setRemoteParticipants(prev => [...prev, { id: userId, name: `User ${userId}` }]);
          }}
          onUserLeft={(userId) => {
            console.log(`User left: ${userId}`);
            // Remove from remote participants state
            setRemoteParticipants(prev => prev.filter(p => p.id !== userId));
          }}
          onScreenShareStart={() => setIsScreenSharing(true)}
          onScreenShareStop={() => setIsScreenSharing(false)}
        />
        
        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            <CircleSlash className="w-4 h-4 mr-1 animate-pulse" />
            Recording
          </div>
        )}
        
        {/* Layout switcher */}
        <div className="absolute top-4 right-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-gray-800 text-white hover:bg-gray-700"
                  onClick={() => setLayout(layout === 'gallery' ? 'speaker' : layout === 'speaker' ? 'sidebar' : 'gallery')}
                >
                  {layout === 'gallery' ? (
                    <Grid className="h-4 w-4" />
                  ) : layout === 'speaker' ? (
                    <Layout className="h-4 w-4" />
                  ) : (
                    <Monitor className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change view layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Controls area */}
      <div className="bg-gray-900 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isMicMuted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  onClick={handleMicToggle}
                >
                  {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMicMuted ? 'Unmute' : 'Mute'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isVideoOff ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  onClick={handleVideoToggle}
                >
                  {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isVideoOff ? 'Start Video' : 'Stop Video'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isScreenSharing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  onClick={handleScreenShareToggle}
                >
                  <ScreenShare className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isParticipantsOpen ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                >
                  <Users className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Participants</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isChatOpen ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  onClick={() => setIsChatOpen(!isChatOpen)}
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {isHost && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full ${isRecording ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                    onClick={handleRecordingToggle}
                  >
                    {isRecording ? <PauseCircle className="h-5 w-5" /> : <CircleSlash className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isRecording ? 'Stop Recording' : 'Start Recording'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isHandRaised ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  onClick={handleRaiseHand}
                >
                  <Hand className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isHandRaised ? 'Lower Hand' : 'Raise Hand'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-700 text-white hover:bg-gray-600"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-700 text-white hover:bg-gray-600"
                  onClick={() => setIsInviteOpen(true)}
                >
                  <UserPlus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Invite</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full bg-red-600 text-white hover:bg-red-700"
                  onClick={handleEndCall}
                >
                  {isHost ? 'End Meeting' : 'Leave'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isHost ? 'End meeting for all' : 'Leave meeting'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Side panels */}
      {isChatOpen && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg flex flex-col z-10">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold">Chat</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4" ref={chatScrollRef}>
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <MessageSquare className="h-12 w-12 mx-auto opacity-20" />
                <p className="mt-2">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatMessages.map(message => (
                  <div key={message.id} className="flex flex-col">
                    <div className="flex items-center">
                      <span className="font-semibold text-sm">{message.sender}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{message.text}</p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input 
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </div>
      )}

      {isParticipantsOpen && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg flex flex-col z-10">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold">Participants (3)</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsParticipantsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    Y
                  </div>
                  <div className="ml-2">
                    <p className="font-medium text-sm">You (Host)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {!isMicMuted && <Mic className="h-4 w-4" />}
                  {isMicMuted && <MicOff className="h-4 w-4" />}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    S
                  </div>
                  <div className="ml-2">
                    <p className="font-medium text-sm">Student 1</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <MicOff className="h-4 w-4" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    S
                  </div>
                  <div className="ml-2">
                    <p className="font-medium text-sm">Student 2</p>
                    <div className="flex items-center">
                      <Hand className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-xs text-yellow-500">Hand raised</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Mic className="h-4 w-4" />
                </div>
              </div>
            </div>
          </ScrollArea>
          
          {isHost && (
            <div className="p-4 border-t">
              <Button className="w-full" onClick={() => setIsInviteOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Others
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="audio">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
            <TabsContent value="audio" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="microphone">Microphone</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="microphone">
                    <SelectValue placeholder="Select microphone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Microphone</SelectItem>
                    <SelectItem value="builtin">Built-in Microphone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="speaker">Speaker</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="speaker">
                    <SelectValue placeholder="Select speaker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Speaker</SelectItem>
                    <SelectItem value="builtin">Built-in Speaker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Test Audio</Label>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">Test Speaker</Button>
                  <Button variant="outline" className="flex-1">Test Microphone</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="video" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="camera">Camera</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="camera">
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Camera</SelectItem>
                    <SelectItem value="builtin">Built-in Camera</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-md bg-black aspect-video flex items-center justify-center text-white">
                  Video Preview
                </div>
              </div>
            </TabsContent>
            <TabsContent value="general" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" defaultValue="Your Name" />
              </div>
              {isHost && (
                <div className="space-y-2">
                  <Label htmlFor="meetingOptions">Meeting Options</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="muteOnEntry" className="rounded" defaultChecked />
                      <Label htmlFor="muteOnEntry" className="cursor-pointer">Mute participants on entry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="allowScreenShare" className="rounded" defaultChecked />
                      <Label htmlFor="allowScreenShare" className="cursor-pointer">Allow participants to screen share</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="allowChat" className="rounded" defaultChecked />
                      <Label htmlFor="allowChat" className="cursor-pointer">Allow chat</Label>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button onClick={() => setIsSettingsOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite to Meeting</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Meeting URL</Label>
              <div className="flex space-x-2">
                <Input value={generateMeetingInvite().url} readOnly />
                <Button variant="outline" onClick={handleCopyInvite}>Copy</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Invite by Email</Label>
              <Input placeholder="Enter email addresses separated by commas" />
              <Button className="w-full">Send Email Invites</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedVideoConference; 