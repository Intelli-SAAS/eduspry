import React, { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
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
  appId: string;
  className?: string;
  isHost?: boolean;
  onUserJoined?: (userId: string) => void;
  onUserLeft?: (userId: string) => void;
  onScreenShareStart?: () => void;
  onScreenShareStop?: () => void;
}

// Define a type for the methods we want to expose via the ref
export interface VideoConferenceRefMethods {
  toggleMic: () => Promise<void>;
  toggleCamera: () => Promise<void>;
  toggleScreenShare: () => Promise<void>;
  leaveChannel: () => Promise<void>;
  reconnect: () => Promise<void>;
}

// Create the component using forwardRef
const VideoConferenceComponent = forwardRef<VideoConferenceRefMethods, VideoConferenceProps>(({
  channel,
  appId,
  className = '',
  isHost = false,
  onUserJoined,
  onUserLeft,
  onScreenShareStart,
  onScreenShareStop
}, ref) => {
  // References
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const screenVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteUserRefs = useRef<{[uid: string]: HTMLDivElement | null}>({});
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

    console.log(`Initializing Agora client with AppID: ${appId} for channel: ${channel}`);

    // Initialize Agora client
    clientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    
    const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      console.log(`Remote user ${user.uid} published ${mediaType} track`);
      
      // Subscribe to the remote user
      await clientRef.current?.subscribe(user, mediaType);
      
      if (mediaType === 'video' && user.videoTrack) {
        // Play the video track
        console.log(`Playing video track for user ${user.uid}`);
        setTimeout(() => {
          if (remoteUserRefs.current[user.uid]) {
            try {
              user.videoTrack?.play(remoteUserRefs.current[user.uid] as HTMLElement);
            } catch (error) {
              console.error('Error playing remote video:', error);
            }
          } else {
            console.warn(`DOM element for user ${user.uid} not found`);
          }
        }, 100);
      }
      
      if (mediaType === 'audio' && user.audioTrack) {
        // Play the audio track
        console.log(`Playing audio track for user ${user.uid}`);
        try {
          user.audioTrack?.play();
        } catch (error) {
          console.error('Error playing remote audio:', error);
        }
      }
      
      // Update remote users state to trigger a re-render
      setRemoteUsers(prevUsers => {
        // If user already exists, replace it, otherwise add it
        const exists = prevUsers.some(u => u.uid === user.uid);
        if (exists) {
          return prevUsers.map(u => u.uid === user.uid ? user : u);
        } else {
          return [...prevUsers, user];
        }
      });
    };
    
    const handleUserUnpublished = (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      console.log(`Remote user ${user.uid} unpublished ${mediaType} track`);
      // Update remote users to trigger re-render
      setRemoteUsers(prevUsers => {
        return prevUsers.map(u => u.uid === user.uid ? user : u);
      });
    };
    
    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      console.log(`Remote user ${user.uid} joined`);
      // Add the user to our remote users state if not already present
      setRemoteUsers(prevUsers => {
        if (!prevUsers.find(u => u.uid === user.uid)) {
          return [...prevUsers, user];
        }
        return prevUsers;
      });
      
      // Notify parent component
      onUserJoined?.(user.uid.toString());
    };
    
    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      console.log(`Remote user ${user.uid} left`);
      // Remove the user from our remote users state
      setRemoteUsers(prevUsers => prevUsers.filter(u => u.uid !== user.uid));
      
      // Remove from refs
      delete remoteUserRefs.current[user.uid];
      
      // Notify parent component
      onUserLeft?.(user.uid.toString());
    };
    
    // Set up event handlers
    if (clientRef.current) {
      clientRef.current.on('user-published', handleUserPublished);
      clientRef.current.on('user-unpublished', handleUserUnpublished);
      clientRef.current.on('user-joined', handleUserJoined);
      clientRef.current.on('user-left', handleUserLeft);
      
      clientRef.current.on('connection-state-change', (state) => {
        console.log(`Connection state changed to ${state}`);
      });
      
      clientRef.current.on('token-privilege-will-expire', async () => {
        console.log("Token is about to expire");
        // In a real application, you would fetch a new token here
      });
      
      clientRef.current.on('exception', (event) => {
        console.warn(`Agora exception: ${event.code} - ${event.msg}`);
      });
    }
    
    // Join the channel
    if (isHost) {
      joinAsHost();
    } else {
      joinAsViewer();
    }
    
    // Cleanup
    return () => {
      if (clientRef.current) {
        clientRef.current.removeAllListeners();
      }
      leaveChannel();
    };
  }, [appId, channel, isHost]);

  // Join the channel as a host (with camera and microphone)
  const joinAsHost = async () => {
    if (!clientRef.current || !appId) return;
    
    try {
      setIsLoading(true);
      console.log('Joining channel as host...');
      
      // Join the channel
      const uid = await clientRef.current.join(appId, channel, null, null);
      console.log(`Joined channel ${channel} as host with UID: ${uid}`);
      
      // Create media tracks with explicit device options
      console.log('Creating microphone and camera tracks...');
      let audioTrack: IMicrophoneAudioTrack | null = null;
      let videoTrack: ICameraVideoTrack | null = null;
      
      try {
        // Try creating audio and video tracks separately to better handle failures
        try {
          audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
            encoderConfig: 'music_standard'
          });
          console.log('Microphone track created successfully');
        } catch (audioErr) {
          console.error('Failed to create microphone track:', audioErr);
          toast({
            title: 'Microphone Access Error',
            description: 'Could not access your microphone. Please check permissions.',
            variant: 'destructive',
          });
        }
        
        try {
          videoTrack = await AgoraRTC.createCameraVideoTrack({
            encoderConfig: '480p_2',
            optimizationMode: 'motion'
          });
          console.log('Camera track created successfully');
        } catch (videoErr) {
          console.error('Failed to create camera track:', videoErr);
          toast({
            title: 'Camera Access Error',
            description: 'Could not access your camera. Please check permissions.',
            variant: 'destructive',
          });
        }
        
        // If we failed to create both tracks, throw error
        if (!audioTrack && !videoTrack) {
          throw new Error('Failed to create both audio and video tracks');
        }
        
        // Publish available tracks
        const tracksToPublish: ILocalTrack[] = [];
        if (audioTrack) tracksToPublish.push(audioTrack);
        if (videoTrack) tracksToPublish.push(videoTrack);
        
        if (tracksToPublish.length > 0) {
          console.log(`Publishing ${tracksToPublish.length} tracks...`);
          await clientRef.current.publish(tracksToPublish);
          console.log('Tracks published successfully');
        }
        
        // Store the tracks only if both were created successfully
        if (audioTrack && videoTrack) {
          setLocalTracks([audioTrack, videoTrack]);
        }
        
        // Display local video if available
        if (videoTrack && localVideoRef.current) {
          console.log('Playing local video track');
          videoTrack.play(localVideoRef.current);
        }
        
        setIsJoined(true);
        setIsLoading(false);
        
        toast({
          title: 'Joined Classroom',
          description: `Successfully joined the ${channel} classroom`,
        });
      } catch (mediaErr) {
        console.error('Error creating media tracks:', mediaErr);
        
        // Clean up any tracks that were created before failure
        if (audioTrack) audioTrack.close();
        if (videoTrack) videoTrack.close();
        
        // Leave the channel since we couldn't set up media
        await clientRef.current.leave();
        
        throw mediaErr;
      }
    } catch (error) {
      console.error('Error joining channel:', error);
      setIsLoading(false);
      
      toast({
        title: 'Join Error',
        description: 'Failed to join the classroom. Please check your camera and microphone permissions.',
        variant: 'destructive',
      });
    }
  };

  // Join the channel as a viewer (without publishing tracks)
  const joinAsViewer = async () => {
    if (!clientRef.current || !appId) return;
    
    try {
      setIsLoading(true);
      console.log('Joining channel as viewer...');
      
      // Join the channel
      const uid = await clientRef.current.join(appId, channel, null, null);
      console.log(`Joined channel ${channel} as viewer with UID: ${uid}`);
      
      setIsJoined(true);
      setIsLoading(false);
      
      toast({
        title: 'Joined Classroom',
        description: `Successfully joined the ${channel} classroom as a viewer`,
      });
    } catch (error) {
      console.error('Error joining channel as viewer:', error);
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
    console.log('Leaving channel...');
    
    // Stop and close all local tracks
    if (localTracks) {
      console.log('Closing local tracks');
      localTracks[0].close();
      localTracks[1].close();
    }
    
    // Stop screen sharing if active
    if (isScreenSharing) {
      console.log('Stopping screen sharing');
      await stopScreenSharing();
    }
    
    // Leave the channel
    if (clientRef.current) {
      console.log('Leaving Agora channel');
      await clientRef.current.leave();
    }
    
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
    
    try {
      if (isMicOn) {
        // Mute microphone
        console.log('Muting microphone');
        await localTracks[0].setEnabled(false);
      } else {
        // Unmute microphone
        console.log('Unmuting microphone');
        await localTracks[0].setEnabled(true);
      }
      
      setIsMicOn(!isMicOn);
    } catch (error) {
      console.error('Error toggling microphone:', error);
      toast({
        title: 'Microphone Error',
        description: 'Failed to toggle microphone',
        variant: 'destructive',
      });
    }
  };

  // Toggle camera
  const toggleCamera = async () => {
    if (!localTracks) return;
    
    try {
      if (isCameraOn) {
        // Turn off camera
        console.log('Turning camera off');
        await localTracks[1].setEnabled(false);
      } else {
        // Turn on camera
        console.log('Turning camera on');
        await localTracks[1].setEnabled(true);
      }
      
      setIsCameraOn(!isCameraOn);
    } catch (error) {
      console.error('Error toggling camera:', error);
      toast({
        title: 'Camera Error',
        description: 'Failed to toggle camera',
        variant: 'destructive',
      });
    }
  };

  // Toggle screen sharing
  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // Start screen sharing
        console.log('Starting screen sharing');
        screenClientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        await screenClientRef.current.join(appId, channel, null, null);
        
        // Create screen share track
        console.log('Creating screen share track');
        const screenTrackResult = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: "1080p_1",
          optimizationMode: "detail"
        }, "disable");
        
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
          console.log('Playing screen share track');
          videoTrack.play(screenVideoRef.current);
        }
        
        // Handle when screen sharing stops
        videoTrack.on('track-ended', () => {
          console.log('Screen sharing ended by system');
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
        description: 'Failed to share your screen. Please make sure to allow screen sharing permission.',
        variant: 'destructive',
      });
    }
  };

  // Stop screen sharing
  const stopScreenSharing = async () => {
    if (!screenTrack || !screenClientRef.current) return;
    
    console.log('Stopping screen sharing');
    
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
      console.log('Reconnecting to channel...');
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

  // Set up remote user refs
  useEffect(() => {
    remoteUsers.forEach(user => {
      if (!remoteUserRefs.current[user.uid] && user.videoTrack) {
        setTimeout(() => {
          try {
            if (remoteUserRefs.current[user.uid]) {
              user.videoTrack?.play(remoteUserRefs.current[user.uid] as HTMLElement);
            }
          } catch (error) {
            console.error(`Error playing video for user ${user.uid}:`, error);
          }
        }, 100);
      }
    });
  }, [remoteUsers]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    leaveChannel,
    reconnect,
  }));

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      
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
                  remoteUserRefs.current[user.uid] = el;
                  // Attempt to play the video track if it exists
                  if (user.videoTrack) {
                    try {
                      user.videoTrack.play(`player-${user.uid}`);
                    } catch (error) {
                      console.error(`Error playing video for user ${user.uid}:`, error);
                    }
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
});

// Add display name for debugging purposes
VideoConferenceComponent.displayName = 'VideoConference';

// Export the component
export default VideoConferenceComponent; 