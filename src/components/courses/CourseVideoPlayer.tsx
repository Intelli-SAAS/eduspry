import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { CourseLesson } from '@/types/course';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Maximize,
  CheckCircle,
} from 'lucide-react';

interface CourseVideoPlayerProps {
  lesson: CourseLesson;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CourseVideoPlayer: React.FC<CourseVideoPlayerProps> = ({
  lesson,
  onComplete,
  onNext,
  onPrevious,
}) => {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(lesson.isCompleted || false);
  const [showControls, setShowControls] = useState(true);
  
  // Format time (convert seconds to mm:ss format)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle seek
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.volume = value[0];
      setVolume(value[0]);
      
      if (value[0] === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      
      if (!isMuted) {
        // Save current volume before muting
        setVolume(videoRef.current.volume);
        videoRef.current.volume = 0;
      } else {
        // Restore volume when unmuting
        videoRef.current.volume = volume;
      }
    }
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!isFullscreen) {
        if (playerRef.current.requestFullscreen) {
          playerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };
  
  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Update time and check for completion
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Mark as completed when 95% of the video is viewed
      if (!isCompleted && videoRef.current.currentTime >= (videoRef.current.duration * 0.95)) {
        setIsCompleted(true);
        onComplete();
      }
    }
  };
  
  // Set duration when metadata is loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  // Handle video end
  const handleEnded = () => {
    setIsPlaying(false);
    if (!isCompleted) {
      setIsCompleted(true);
      onComplete();
    }
  };
  
  // Auto-hide controls after a period of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        playerElement.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timeout);
      };
    }
  }, [isPlaying]);
  
  return (
    <Card className="overflow-hidden relative" ref={playerRef}>
      <video
        ref={videoRef}
        src={lesson.content}
        className="w-full aspect-video bg-black"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onClick={togglePlay}
      />
      
      {/* Completed indicator */}
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
          <CheckCircle className="h-4 w-4" />
        </div>
      )}
      
      {/* Video controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="mb-2"
        />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20" 
              onClick={onPrevious}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20" 
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20" 
              onClick={onNext}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20" 
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            
            <div className="w-24 hidden md:block">
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20" 
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseVideoPlayer; 