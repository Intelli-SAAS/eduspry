import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mic, MicOff, Volume2, Loader2, BrainCircuit } from 'lucide-react';
import { 
  voiceCommandService, 
  UserRole, 
  CommandResult 
} from '@/services/voiceCommandService';
import { useTheme } from 'next-themes';

// Types for the Web Speech API
// Since the Web Speech API isn't fully typed in TypeScript, we create simplified interfaces
interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: {
    transcript: string;
  };
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognitionInterface extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

// Types for component props
export interface VoiceAssistantProps {
  userRole: UserRole;
  onCommandProcessed: (result: CommandResult) => void;
  selectedModel: string;
  className?: string;
}

/**
 * Voice Assistant Component
 * 
 * This component provides a voice interface for users to interact with the application.
 * It's designed to be scalable and handle millions of active users.
 */
const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  userRole,
  onCommandProcessed,
  selectedModel,
  className = ''
}) => {
  // Component state
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  
  // Refs for speech recognition and synthesis
  const recognitionRef = useRef<SpeechRecognitionInterface | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const transcriptTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Theme for styling
  const { theme } = useTheme();
  
  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check browser support for speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Use any because TypeScript doesn't know about these interfaces
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || 
                                  (window as any).webkitSpeechRecognition;
      
      recognitionRef.current = new SpeechRecognitionAPI() as SpeechRecognitionInterface;
      
      // Configure speech recognition
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US'; // Set language
      
      // Handle recognition results
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = '';
        
        // Extract the transcript from the results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result[0]) {
            transcript += result[0].transcript;
          }
        }
        
        setTranscript(transcript);
        
        // Process completed phrases
        if (event.results[event.resultIndex]?.isFinal) {
          processVoiceCommand(transcript);
        }
      };
      
      // Handle recognition errors
      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'no-speech') {
          // Don't show an error for no speech detected
          setIsListening(false);
          return;
        }
        
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive"
        });
        setIsListening(false);
      };
      
      // Handle recognition end
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setVoiceSupported(false);
      toast({
        title: "Voice Assistant Unavailable",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
    }
    
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    
    // Clean up on unmount
    return () => {
      stopListening();
      
      // Cancel any ongoing speech
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);
  
  // Update transcript visibility with a delay for smoother UX
  useEffect(() => {
    if (transcript) {
      setShowTranscript(true);
      
      // Clear any existing timeout
      if (transcriptTimerRef.current) {
        clearTimeout(transcriptTimerRef.current);
      }
      
      // Set a timeout to hide the transcript after 5 seconds of inactivity
      transcriptTimerRef.current = setTimeout(() => {
        if (!isListening && !processing) {
          setShowTranscript(false);
        }
      }, 5000);
    } else {
      setShowTranscript(false);
    }
    
    return () => {
      if (transcriptTimerRef.current) {
        clearTimeout(transcriptTimerRef.current);
      }
    };
  }, [transcript, isListening, processing]);
  
  // Clear transcript when done processing
  useEffect(() => {
    if (!isListening && !processing && !isSpeaking) {
      // Clear transcript after command processing is complete
      const timer = setTimeout(() => {
        setTranscript('');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isListening, processing, isSpeaking]);
  
  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  // Start listening for voice commands
  const startListening = () => {
    if (!recognitionRef.current || !voiceSupported) return;
    
    try {
      // Reset transcript
      setTranscript('');
      
      // First check if microphone permission was denied previously
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'microphone' as PermissionName })
          .then(permissionStatus => {
            if (permissionStatus.state === 'denied') {
              // Microphone access was previously denied
              toast({
                title: "Microphone Access Required",
                description: "Please allow microphone access in your browser settings and try again.",
                variant: "destructive"
              });
              return;
            }
            
            // Permission is granted or prompt will appear, try to start recognition
            startRecognition();
          })
          .catch(() => {
            // If permissions API isn't available or fails, just try to start recognition
            startRecognition();
          });
      } else {
        // Permissions API not available, just try to start
        startRecognition();
      }
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      handleRecognitionError();
    }
  };
  
  // Actual function to start the recognition after permission check
  const startRecognition = () => {
    try {
      // Make sure any previous sessions are stopped
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // Ignore errors from stopping
      }
      
      // Start recognition immediately without additional delays
      recognitionRef.current?.start();
      setIsListening(true);
      
      // Simple voice feedback without auto-restart
      speakResponse('I\'m listening.', false);
    } catch (error) {
      console.error('Error in recognition start:', error);
      handleRecognitionError();
    }
  };
  
  // Centralized handler for recognition errors
  const handleRecognitionError = () => {
    // Set listening state to false
    setIsListening(false);
    
    // Check if this is likely a permission issue
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          // If we can get audio, it's not a permission issue but something else
          toast({
            title: "Voice Recognition Error",
            description: "Failed to start listening. Please try again or reload the page.",
            variant: "destructive"
          });
        })
        .catch((err) => {
          // This is likely a permission issue
          console.error("Media devices error:", err);
          
          let message = "Microphone access is required for voice commands.";
          
          // Add specific instructions based on the error message
          if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
            message += " Please allow microphone access in your browser and try again.";
          } else if (err.name === "NotFoundError") {
            message += " No microphone detected. Please connect a microphone and try again.";
          }
          
          toast({
            title: "Microphone Access Required",
            description: message,
            variant: "destructive"
          });
        });
    } else {
      // If mediaDevices API isn't available
      toast({
        title: "Voice Recognition Error",
        description: "Failed to start listening. Your browser may not support this feature.",
        variant: "destructive"
      });
    }
  };
  
  // Stop listening for voice commands
  const stopListening = () => {
    if (!recognitionRef.current || !voiceSupported) return;
    
    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };
  
  // Process the voice command using the voice command service
  const processVoiceCommand = async (command: string) => {
    if (!command.trim()) return;
    
    // Stop listening while processing
    stopListening();
    setProcessing(true);
    
    console.log("Processing voice command:", command);
    
    try {
      // Process the command using the voice command service
      const result = await voiceCommandService.processCommand(command, userRole, selectedModel);
      
      console.log("Command processing result:", result);
      
      // Notify parent component about the processed command
      onCommandProcessed(result);
      
      // Provide voice feedback to the user
      speakResponse(result.response);
    } catch (error) {
      console.error('Error processing voice command:', error);
      
      // Create a fallback response
      const fallbackResult = {
        action: 'error' as const,
        response: "Sorry, I couldn't process that command. Please try again or check your internet connection."
      };
      
      // Try to notify parent component even in case of error
      try {
        onCommandProcessed(fallbackResult);
      } catch (e) {
        console.error("Error notifying parent about command failure:", e);
      }
      
      // Try to give voice feedback about the error
      speakResponse(fallbackResult.response);
    } finally {
      setProcessing(false);
    }
  };
  
  // Speak a response to the user
  const speakResponse = (text: string, shortPause = false) => {
    if (!synthRef.current || !text) return;
    
    // Cancel any ongoing speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume
    
    // Voice selection (if available)
    const voices = synthRef.current.getVoices();
    const englishVoices = voices.filter(voice => voice.lang.includes('en-'));
    
    if (englishVoices.length > 0) {
      // Prefer a natural-sounding voice if available
      const preferredVoice = englishVoices.find(voice => 
        voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Samantha')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      } else {
        utterance.voice = englishVoices[0];
      }
    }
    
    // Event listeners
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };
    
    // Speak the response
    synthRef.current.speak(utterance);
  };
  
  // If voice is not supported, show a disabled button
  if (!voiceSupported) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button 
          size="icon" 
          variant="outline"
          disabled={true}
          title="Voice assistant not available in this browser"
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <Mic className="h-6 w-6 text-gray-400" />
        </Button>
      </div>
    );
  }
  
  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      {/* Vectal.ai-style floating chat bubble */}
      <div 
        className={`
          absolute bottom-20 right-0
          w-80 rounded-2xl overflow-hidden
          shadow-lg border transition-all duration-300
          ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          ${showTranscript ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Voice Assistant</span>
          </div>
          <button 
            onClick={() => setShowTranscript(false)}
            className="text-xs opacity-60 hover:opacity-100 transition-opacity p-1"
            aria-label="Close transcript"
          >
            ✕
          </button>
        </div>
        
        <div className="p-3 max-h-60 overflow-y-auto">
          {/* When listening */}
          {isListening && (
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Mic className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Listening...</div>
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-sm">
                  {transcript || "Speak now..."}
                </div>
              </div>
            </div>
          )}
          
          {/* Last command if not listening */}
          {!isListening && transcript && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <BrainCircuit className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {processing ? 'Processing...' : 'Last command'}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-sm break-words">
                  {transcript}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Quick instructions */}
        <div className="p-2 text-xs text-center text-gray-500 bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
          Try: "Create a test" • "Show analytics" • "Generate flashcards"
        </div>
      </div>
      
      {/* Voice assistant floating button - Vectal.ai style */}
      <div className="relative">
        <Button 
          size="icon" 
          variant={isListening ? "destructive" : (isSpeaking ? "secondary" : "default")}
          onClick={toggleListening}
          disabled={processing}
          title={isListening ? "Stop listening" : "Use voice to chat"}
          className="h-12 w-12 rounded-full shadow-lg"
        >
          {isListening ? (
            <MicOff className="h-5 w-5" />
          ) : processing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : isSpeaking ? (
            <Volume2 className="h-5 w-5 animate-pulse" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
        
        {/* Small floating label - Vectal.ai style */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] text-white px-4 py-2 rounded-lg whitespace-nowrap shadow-md">
          {isListening ? "Listening..." : "Use voice to chat"}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant; 