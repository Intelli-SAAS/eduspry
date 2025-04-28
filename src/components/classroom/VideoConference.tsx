import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Camera, CameraOff, ScreenShare, MonitorOff, Users, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import AgoraRTC, { 
  IAgoraRTCClient, 
  IAgoraRTCRemoteUser, 
  ICameraVideoTrack, 
  IMicrophoneAudioTrack,
  ILocalTrack,
  ILocalVideoTrack,
  ILocalAudioTrack
} from 'agora-rtc-sdk-ng';

interface VideoConferenceProps {
  channel: string;
  appId: string; // Add appId prop
  className?: string;
  isHost?: boolean;
  onUserJoined?: (userId: string) => void;
  onUserLeft?: (userId: string) => void;
  onScreenShareStart?: () => void;
  onScreenShareStop?: () => void;
}

// Create and export the VideoConference component
const VideoConference: React.FC<VideoConferenceProps> = ({
  channel,
  appId,
  className = '',
  isHost = false,
  onUserJoined,
  onUserLeft,
  onScreenShareStart,
  onScreenShareStop
}) => {
  // References
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const screenVideoRef = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const screenClientRef = useRef<IAgoraRTCClient | null>(null);
  
  // State
  const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
  const [screenTrack, setScreenTrack] = useState<ILocalVideoTrack | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  // Initialize Agora client
  useEffect(() => {
    if (!appId) {
      toast({
        title: 'Configuration Error',
        description: 'Agora App ID is missing. Please check your configuration.',
        variant: 'destructive',
      });
      return;
    }

    // Initialize Agora client
    clientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    
    // Set up event handlers
    clientRef.current.on('user-published', handleUserPublished);
    clientRef.current.on('user-unpublished', handleUserUnpublished);
    clientRef.current.on('user-joined', handleUserJoined);
    clientRef.current.on('user-left', handleUserLeft);
    
    // Join the channel
    if (isHost) {
      joinAsHost();
    } else {
      joinAsViewer();
    }
    
    return () => {
      leaveChannel();
    };
  }, [appId, channel, isHost]);

  // Handle when a remote user publishes tracks
  const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
    await clientRef.current?.subscribe(user, mediaType);
    
    // Update remote users state
    setRemoteUsers(prevUsers => {
      return prevUsers.map(u => u.uid === user.uid ? user : u);
    });
  };

  // Handle when a remote user unpublishes tracks
  const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
    // Update remote users state
    setRemoteUsers(prevUsers => {
      return prevUsers.map(u => u.uid === user.uid ? user : u);
    });
  };

  // Handle when a remote user joins
  const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
    // Add the user to our remote users state
    setRemoteUsers(prevUsers => {
      if (!prevUsers.find(u => u.uid === user.uid)) {
        return [...prevUsers, user];
      }
      return prevUsers;
    });
    
    // Notify parent component
    onUserJoined?.(user.uid.toString());
  };

  // Handle when a remote user leaves
  const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
    // Remove the user from our remote users state
    setRemoteUsers(prevUsers => prevUsers.filter(u => u.uid !== user.uid));
    
    // Notify parent component
    onUserLeft?.(user.uid.toString());
  };

  // Join the channel as a host (with camera and microphone)
  const joinAsHost = async () => {
    try {
      setIsLoading(true);
      
      // Join the channel
      const uid = await clientRef.current?.join(appId, channel, null, null);
      
      // Create and publish audio and video tracks
      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      await clientRef.current?.publish([microphoneTrack, cameraTrack]);
      
      // Store the tracks
      setLocalTracks([microphoneTrack, cameraTrack]);
      
      // Display local video
      if (localVideoRef.current) {
        cameraTrack.play(localVideoRef.current);
      }
      
      setIsJoined(true);
      setIsLoading(false);
      
      toast({
        title: 'Joined Classroom',
        description: `Successfully joined the ${channel} classroom`,
      });
    } catch (error) {
      console.error('Error joining channel:', error);
      setIsLoading(false);
      
      toast({
        title: 'Join Error',
        description: 'Failed to join the classroom. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Join the channel as a viewer (without publishing tracks)
  const joinAsViewer = async () => {
    try {
      setIsLoading(true);
      
      // Join the channel
      await clientRef.current?.join(appId, channel, null, null);
      
      setIsJoined(true);
      setIsLoading(false);
      
      toast({
        title: 'Joined Classroom',
        description: `Successfully joined the ${channel} classroom as an observer`,
      });
    } catch (error) {
      console.error('Error joining channel:', error);
      setIsLoading(false);
      
      toast({
        title: 'Join Error',
        description: 'Failed to join the classroom. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Leave the channel
  const leaveChannel = async () => {
    // Stop and close all local tracks
    if (localTracks) {
      localTracks[0].close();
      localTracks[1].close();
    }
    
    // Stop screen sharing if active
    if (isScreenSharing) {
      await stopScreenSharing();
    }
    
    // Leave the channel
    await clientRef.current?.leave();
    
    // Reset state
    setLocalTracks(null);
    setRemoteUsers([]);
    setIsJoined(false);
    
    toast({
      title: 'Left Classroom',
      description: 'You have left the virtual classroom',
    });
  };

  // Toggle microphone
  const toggleMic = async () => {
    if (!localTracks) return;
    
    if (isMicOn) {
      // Mute microphone
      await localTracks[0].setEnabled(false);
    } else {
      // Unmute microphone
      await localTracks[0].setEnabled(true);
    }
    
    setIsMicOn(!isMicOn);
  };

  // Toggle camera
  const toggleCamera = async () => {
    if (!localTracks) return;
    
    if (isCameraOn) {
      // Turn off camera
      await localTracks[1].setEnabled(false);
    } else {
      // Turn on camera
      await localTracks[1].setEnabled(true);
    }
    
    setIsCameraOn(!isCameraOn);
  };

  // Toggle screen sharing
  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // Start screen sharing
        screenClientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        await screenClientRef.current.join(appId, channel, null, null);
        
        // Create screen share track
        const screenTrackResult = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: "1080p_1",
          optimizationMode: "detail"
        });
        
        // Handle potential array result (with audio track)
        let videoTrack: ILocalVideoTrack;
        if (Array.isArray(screenTrackResult)) {
          videoTrack = screenTrackResult[0];
          // Optionally publish audio track if needed
          await screenClientRef.current.publish(screenTrackResult);
        } else {
          videoTrack = screenTrackResult;
          await screenClientRef.current.publish(videoTrack);
        }
        
        // Store the track
        setScreenTrack(videoTrack);
        
        // Display screen share
        if (screenVideoRef.current) {
          videoTrack.play(screenVideoRef.current);
        }
        
        // Handle when screen sharing stops
        videoTrack.on('track-ended', () => {
          stopScreenSharing();
        });
        
        setIsScreenSharing(true);
        onScreenShareStart?.();
        
        toast({
          title: 'Screen Sharing Started',
          description: 'Your screen is now visible to others',
        });
      } else {
        // Stop screen sharing
        await stopScreenSharing();
      }
    } catch (error) {
      console.error('Error toggling screen share:', error);
      
      toast({
        title: 'Screen Sharing Error',
        description: 'Failed to share your screen. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Stop screen sharing
  const stopScreenSharing = async () => {
    if (!screenTrack || !screenClientRef.current) return;
    
    // Stop and close the screen track
    screenTrack.close();
    
    // Leave the screen share client
    await screenClientRef.current.leave();
    
    // Reset state
    setScreenTrack(null);
    setIsScreenSharing(false);
    onScreenShareStop?.();
    
    toast({
      title: 'Screen Sharing Stopped',
      description: 'Your screen is no longer shared',
    });
  };
  
  // Reconnect to the channel
  const reconnect = async () => {
    setIsReconnecting(true);
    
    try {
      // Leave the channel
      await leaveChannel();
      
      // Rejoin the channel
      if (isHost) {
        await joinAsHost();
      } else {
        await joinAsViewer();
      }
      
      setIsReconnecting(false);
      
      toast({
        title: 'Reconnected',
        description: 'You have reconnected to the classroom',
      });
    } catch (error) {
      console.error('Error reconnecting:', error);
      
      setIsReconnecting(false);
      
      toast({
        title: 'Reconnection Error',
        description: 'Failed to reconnect to the classroom. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Video grid */}
      <div className="flex flex-wrap gap-4 mb-4 flex-1 overflow-auto p-2">
        {/* Local video */}
        {isJoined && localTracks && !isScreenSharing && (
          <div className="relative bg-black rounded-lg overflow-hidden w-[calc(50%-0.5rem)] h-[calc(50%-0.5rem)]">
            <div
              ref={localVideoRef}
              className="w-full h-full"
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 text-xs rounded">
              You {!isMicOn && '(muted)'}
            </div>
          </div>
        )}
        
        {/* Screen share */}
        {isJoined && isScreenSharing && (
          <div className="relative bg-black rounded-lg overflow-hidden w-full h-[calc(100%-2rem)]">
            <div
              ref={screenVideoRef}
              className="w-full h-full"
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 text-xs rounded">
              Your Screen
            </div>
          </div>
        )}
        
        {/* Remote users */}
        {remoteUsers.map(user => (
          <div key={user.uid} className="relative bg-black rounded-lg overflow-hidden w-[calc(50%-0.5rem)] h-[calc(50%-0.5rem)]">
            <div
              id={`player-${user.uid}`}
              className="w-full h-full"
              ref={el => {
                if (el) {
                  // Play the user's video track if it exists
                  if (user.videoTrack) {
                    user.videoTrack.play(`player-${user.uid}`);
                  }
                }
              }}
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 text-xs rounded">
              User {user.uid} {!user.hasAudio && '(muted)'}
            </div>
          </div>
        ))}
        
        {/* Placeholders for empty grid positions */}
        {isJoined && remoteUsers.length === 0 && !isScreenSharing && (
          <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg w-[calc(50%-0.5rem)] h-[calc(50%-0.5rem)]">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Users className="h-10 w-10 mx-auto mb-2" />
              <p>Waiting for others to join...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Control bar */}
      <div className="flex justify-center items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Button
          variant={isMicOn ? "default" : "destructive"}
          size="icon"
          onClick={toggleMic}
          disabled={!isJoined || !isHost || !localTracks}
        >
          {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>
        
        <Button
          variant={isCameraOn ? "default" : "destructive"}
          size="icon"
          onClick={toggleCamera}
          disabled={!isJoined || !isHost || !localTracks || isScreenSharing}
        >
          {isCameraOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
        </Button>
        
        <Button
          variant={isScreenSharing ? "destructive" : "default"}
          size="icon"
          onClick={toggleScreenShare}
          disabled={!isJoined || !isHost}
        >
          {isScreenSharing ? <MonitorOff className="h-4 w-4" /> : <ScreenShare className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={reconnect}
          disabled={!isJoined || isReconnecting}
        >
          <RefreshCw className={`h-4 w-4 ${isReconnecting ? 'animate-spin' : ''}`} />
        </Button>
        
        <Button
          variant="destructive"
          onClick={leaveChannel}
          disabled={!isJoined}
        >
          Leave
        </Button>
      </div>
    </div>
  );
};

export default VideoConference; 