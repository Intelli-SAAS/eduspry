import React, { useRef, useState, useCallback } from 'react';
import { Tldraw, getSvgAsImage } from 'tldraw';
import 'tldraw/tldraw.css';
import { Button } from '@/components/ui/button';
import { Download, Share2, Play, Pause, X, Calculator, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useTheme } from 'next-themes';

// Types
interface InteractiveWhiteboardProps {
  initialData?: {
    elements?: any[];
    appState?: any;
  };
  readOnly?: boolean;
  onSave?: (data: any) => void;
  onShare?: (svg: string) => void;
  className?: string;
}

const InteractiveWhiteboard: React.FC<InteractiveWhiteboardProps> = ({
  initialData,
  readOnly = false,
  onSave,
  onShare,
  className = ''
}) => {
  // Refs
  const editorRef = useRef<any>(null);
  
  // State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFrames, setRecordedFrames] = useState<any[]>([]);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const { theme } = useTheme();
  
  // Handle saving the whiteboard content
  const handleSave = useCallback(() => {
    if (!editorRef.current || !onSave) return;
    
    const editor = editorRef.current;
    const snapshot = editor.store?.getSnapshot();
    
    if (snapshot) {
      onSave(snapshot);
      
      toast({
        title: 'Whiteboard saved',
        description: 'Your whiteboard has been saved successfully.',
      });
    }
  }, [onSave]);
  
  // Handle sharing the whiteboard
  const handleShare = useCallback(async () => {
    if (!editorRef.current || !onShare) return;
    
    try {
      const editor = editorRef.current;
      // Get all shapes if none are selected
      const ids = editor.selectedShapeIds?.length 
        ? editor.selectedShapeIds 
        : editor.store?.allShapeIds;
        
      if (ids) {
        const svg = await editor.getSvg(ids);
        
        if (svg) {
          const svgString = svg.outerHTML;
          onShare(svgString);
          
          toast({
            title: 'Whiteboard shared',
            description: 'Your whiteboard has been shared successfully.',
          });
        }
      }
    } catch (error) {
      console.error('Error sharing whiteboard:', error);
      toast({
        title: 'Error sharing whiteboard',
        description: 'An error occurred while sharing the whiteboard.',
        variant: 'destructive',
      });
    }
  }, [onShare]);
  
  // Handle exporting the whiteboard as SVG
  const handleExport = useCallback(async () => {
    if (!editorRef.current) return;
    
    try {
      const editor = editorRef.current;
      // Get all shapes if none are selected
      const ids = editor.selectedShapeIds?.length 
        ? editor.selectedShapeIds 
        : editor.store?.allShapeIds;
        
      if (ids) {
        const svg = await editor.getSvg(ids);
        
        if (svg) {
          // Create a temporary link to download the SVG
          const link = document.createElement('a');
          const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
          link.href = URL.createObjectURL(blob);
          link.download = `whiteboard-${new Date().toISOString().split('T')[0]}.svg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast({
            title: 'Whiteboard exported',
            description: 'Your whiteboard has been exported as SVG.',
          });
        }
      }
    } catch (error) {
      console.error('Error exporting whiteboard:', error);
      toast({
        title: 'Error exporting whiteboard',
        description: 'An error occurred while exporting the whiteboard.',
        variant: 'destructive',
      });
    }
  }, []);
  
  // Toggle recording session
  const toggleRecording = useCallback(() => {
    if (!isRecording) {
      // Start recording
      const frames: any[] = [];
      
      // Add the initial frame
      if (editorRef.current) {
        const snapshot = editorRef.current.store?.getSnapshot();
        if (snapshot) {
          frames.push({
            snapshot,
            timestamp: Date.now()
          });
        }
      }
      
      setRecordedFrames(frames);
      
      // Set up the recording interval (capture frame every 2 seconds)
      const interval = setInterval(() => {
        if (editorRef.current) {
          const snapshot = editorRef.current.store?.getSnapshot();
          if (snapshot) {
            setRecordedFrames(prev => [
              ...prev,
              {
                snapshot,
                timestamp: Date.now()
              }
            ]);
          }
        }
      }, 2000);
      
      setRecordingInterval(interval);
      setIsRecording(true);
      
      toast({
        title: 'Recording started',
        description: 'Your whiteboard session is now being recorded.',
      });
    } else {
      // Stop recording
      if (recordingInterval) {
        clearInterval(recordingInterval);
        setRecordingInterval(null);
      }
      
      setIsRecording(false);
      
      toast({
        title: 'Recording stopped',
        description: `Recorded ${recordedFrames.length} frames.`,
      });
    }
  }, [isRecording, recordedFrames.length, recordingInterval]);
  
  // Play back the recorded session
  const playRecording = useCallback(() => {
    if (recordedFrames.length === 0 || isPlaying) {
      return;
    }
    
    setIsPlaying(true);
    setCurrentFrame(0);
    
    // Load the first frame
    if (editorRef.current && recordedFrames[0]) {
      editorRef.current.store?.loadSnapshot(recordedFrames[0].snapshot);
    }
    
    const intervalId = setInterval(() => {
      setCurrentFrame(prev => {
        const nextFrame = prev + 1;
        
        if (nextFrame >= recordedFrames.length) {
          clearInterval(intervalId);
          setIsPlaying(false);
          return prev;
        }
        
        // Load the next frame
        if (editorRef.current && recordedFrames[nextFrame]) {
          editorRef.current.store?.loadSnapshot(recordedFrames[nextFrame].snapshot);
        }
        
        return nextFrame;
      });
    }, 500); // Play at a constant rate
    
    return () => clearInterval(intervalId);
  }, [recordedFrames, isPlaying]);
  
  // Stop playing the recording
  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
  }, []);
  
  // Clean up recording interval on unmount
  React.useEffect(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [recordingInterval]);

  // Handle editor ref 
  const handleEditorMount = useCallback((editor: any) => {
    editorRef.current = editor;
  }, []);
  
  return (
    <div className={`flex flex-col h-full w-full rounded-md overflow-hidden shadow-sm border ${className}`}>
      {/* Toolbar */}
      <div className="flex justify-between items-center py-2 px-4 bg-gray-100 dark:bg-gray-800 border-b">
        <div className="flex items-center gap-2">
          {!readOnly && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        
        {!readOnly && (
          <div className="flex items-center gap-2">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={toggleRecording}
            >
              {isRecording ? 'Stop Recording' : 'Record Session'}
            </Button>
            
            {recordedFrames.length > 0 && !isRecording && (
              <>
                {isPlaying ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={stopPlayback}
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playRecording}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play ({recordedFrames.length} frames)
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Tldraw Editor */}
      <div className="flex-grow">
        <Tldraw
          onMount={handleEditorMount}
          hideUi={readOnly}
        />
      </div>
    </div>
  );
};

export default InteractiveWhiteboard; 