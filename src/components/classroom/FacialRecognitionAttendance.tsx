import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Camera, 
  UserCheck, 
  Clock, 
  Calendar, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Users,
  UploadCloud,
  Scan,
  Save,
  Search
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  className: string;
  section: string;
  rollNumber: string;
  scanStatus?: 'pending' | 'verified' | 'failed';
  lastScan?: string;
  confidence?: number;
  photoUrl?: string;
}

interface FacialRecognitionAttendanceProps {
  className?: string;
}

export default function FacialRecognitionAttendance({ className }: FacialRecognitionAttendanceProps) {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [cameraStatus, setCameraStatus] = useState<'connected' | 'disconnected' | 'scanning'>('disconnected');
  const [activeTab, setActiveTab] = useState<string>('camera');
  const [students, setStudents] = useState<Student[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [scanningStudent, setScanningStudent] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock class and section data
  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sectionOptions = ['A', 'B', 'C', 'D'];

  // Mock student data
  const mockStudents: Student[] = [
    { 
      id: '1', 
      name: 'Aarav Singh', 
      className: 'Class 3', 
      section: 'B', 
      rollNumber: '301', 
      scanStatus: 'verified', 
      lastScan: '08:45 AM',
      confidence: 98.2,
      photoUrl: '/students/student1.jpg'
    },
    { 
      id: '2', 
      name: 'Diya Patel', 
      className: 'Class 3', 
      section: 'B', 
      rollNumber: '302', 
      scanStatus: 'pending',
      photoUrl: '/students/student2.jpg'
    },
    { 
      id: '3', 
      name: 'Rohan Kumar', 
      className: 'Class 3', 
      section: 'B', 
      rollNumber: '303', 
      scanStatus: 'pending',
      photoUrl: '/students/student3.jpg'
    },
    { 
      id: '4', 
      name: 'Ananya Sharma', 
      className: 'Class 3', 
      section: 'B', 
      rollNumber: '304', 
      scanStatus: 'failed', 
      lastScan: '08:52 AM',
      confidence: 45.7,
      photoUrl: '/students/student4.jpg'
    },
    { 
      id: '5', 
      name: 'Vihaan Mehta', 
      className: 'Class 3', 
      section: 'B', 
      rollNumber: '305', 
      scanStatus: 'pending',
      photoUrl: '/students/student5.jpg'
    },
  ];

  useEffect(() => {
    // Load students based on class and section
    if (selectedClass && selectedSection) {
      const filteredStudents = mockStudents.filter(
        student => student.className === selectedClass && student.section === selectedSection
      );
      setStudents(filteredStudents);
    } else {
      setStudents([]);
    }
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    // Simulate loading face-api.js models
    if (cameraStatus === 'connected' && !modelsLoaded) {
      let loadingProgress = 0;
      setProcessing(true);
      
      const interval = setInterval(() => {
        loadingProgress += 10;
        setProgress(loadingProgress);
        
        if (loadingProgress >= 100) {
          clearInterval(interval);
          setModelsLoaded(true);
          setProcessing(false);
          toast({
            title: "Face Recognition Models Loaded",
            description: "The system is ready to scan for attendance."
          });
        }
      }, 400);
      
      return () => clearInterval(interval);
    }
  }, [cameraStatus, modelsLoaded]);

  useEffect(() => {
    return () => {
      // Clean up camera stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const connectCamera = async () => {
    try {
      if (videoRef.current) {
        const constraints = {
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user"
          }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        setCameraStatus('connected');
        
        toast({
          title: "Camera Connected",
          description: "Face recognition camera is now ready to use."
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const disconnectCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setCameraStatus('disconnected');
    setProgress(0);
    
    toast({
      title: "Camera Disconnected",
      description: "Face recognition camera has been disconnected."
    });
  };

  const startScanning = () => {
    if (!modelsLoaded) {
      toast({
        title: "Models Not Ready",
        description: "Please wait for the face recognition models to load completely.",
        variant: "destructive"
      });
      return;
    }
    
    setCameraStatus('scanning');
    
    toast({
      title: "Scanning Initiated",
      description: "The system is now scanning for student faces."
    });
  };

  const stopScanning = () => {
    setCameraStatus('connected');
    setScanningStudent(null);
    
    toast({
      title: "Scanning Stopped",
      description: "Face recognition scanning has been stopped."
    });
  };

  const resetAttendance = () => {
    const resetStudents = students.map(student => ({
      ...student,
      scanStatus: 'pending' as const,
      lastScan: undefined,
      confidence: undefined
    }));
    
    setStudents(resetStudents);
    
    toast({
      title: "Attendance Reset",
      description: "All attendance records for today have been reset."
    });
  };

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current && cameraStatus === 'scanning') {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Process recognition
        processRecognition();
      }
    }
  };

  const processRecognition = () => {
    // In a real app, this would send the image to a face recognition API
    // or use face-api.js to process locally
    
    setProcessing(true);
    
    // Simulate processing delay and random student identification
    setTimeout(() => {
      const pendingStudents = students.filter(s => s.scanStatus === 'pending');
      
      if (pendingStudents.length > 0) {
        // Randomly select a student to mark as verified (simulating recognition)
        const randomIndex = Math.floor(Math.random() * pendingStudents.length);
        const studentToMark = pendingStudents[randomIndex];
        
        setScanningStudent(studentToMark.name);
        
        // Simulate confidence score
        const confidence = 70 + Math.random() * 30;
        
        setTimeout(() => {
          // Mark the student as present with confidence score
          const updatedStudents = students.map(student => {
            if (student.id === studentToMark.id) {
              return {
                ...student,
                scanStatus: confidence > 80 ? 'verified' as const : 'failed' as const,
                lastScan: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                confidence: parseFloat(confidence.toFixed(1))
              };
            }
            return student;
          });
          
          setStudents(updatedStudents);
          setScanningStudent(null);
          setProcessing(false);
          
          if (confidence > 80) {
            toast({
              title: "Student Recognized",
              description: `Attendance marked for ${studentToMark.name} with ${confidence.toFixed(1)}% confidence.`
            });
          } else {
            toast({
              title: "Low Confidence Match",
              description: `Failed to verify ${studentToMark.name} with only ${confidence.toFixed(1)}% confidence.`,
              variant: "destructive"
            });
          }
        }, 1500);
      } else {
        setProcessing(false);
        toast({
          title: "Scanning Complete",
          description: "All students have been processed.",
        });
      }
    }, 1000);
  };

  const manualMarkAttendance = (studentId: string, status: 'verified' | 'failed') => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          scanStatus: status,
          lastScan: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          confidence: status === 'verified' ? 100 : 0
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    
    toast({
      title: status === 'verified' ? "Marked Present" : "Marked Absent",
      description: `Student has been manually marked as ${status === 'verified' ? 'present' : 'absent'}.`
    });
  };

  const getStatusBadge = (status?: 'pending' | 'verified' | 'failed') => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Present</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Absent</Badge>;
      default:
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    }
  };

  const getAttendanceSummary = () => {
    const present = students.filter(s => s.scanStatus === 'verified').length;
    const absent = students.filter(s => s.scanStatus === 'failed').length;
    const pending = students.filter(s => s.scanStatus === 'pending').length;
    return { present, absent, pending, total: students.length };
  };

  const filteredStudents = students.filter(student => 
    searchQuery ? student.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  const summary = getAttendanceSummary();

  return (
    <div className={className}>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Facial Recognition Attendance</CardTitle>
              <CardDescription>Mark student attendance using facial recognition</CardDescription>
            </div>
            <div className="flex space-x-2">
              {cameraStatus === 'disconnected' ? (
                <Button variant="outline" onClick={connectCamera}>
                  <Camera className="h-4 w-4 mr-2" /> Connect Camera
                </Button>
              ) : cameraStatus === 'connected' ? (
                <div className="space-x-2">
                  <Button variant="outline" onClick={disconnectCamera}>
                    <XCircle className="h-4 w-4 mr-2" /> Disconnect
                  </Button>
                  <Button onClick={startScanning}>
                    <Scan className="h-4 w-4 mr-2" /> Start Scanning
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" onClick={stopScanning}>
                  <Clock className="h-4 w-4 mr-2" /> Stop Scanning
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera">
                <Camera className="h-4 w-4 mr-2" /> Live Camera
              </TabsTrigger>
              <TabsTrigger value="upload">
                <UploadCloud className="h-4 w-4 mr-2" /> Upload Photos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="camera" className="space-y-4">
              <div className="flex space-x-4 mt-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="class">Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classOptions.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="section">Section</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectionOptions.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    type="date"
                    id="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                    {cameraStatus === 'disconnected' ? (
                      <div className="text-center text-gray-400">
                        <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Camera disconnected</p>
                        <Button onClick={connectCamera} variant="outline" size="sm" className="mt-2">
                          Connect Camera
                        </Button>
                      </div>
                    ) : (
                      <>
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          muted 
                          className="w-full h-full object-cover"
                        />
                        {processing && (
                          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
                            <RefreshCw className="h-8 w-8 text-white animate-spin mb-2" />
                            <Progress value={progress} className="w-3/4 mb-2" />
                            <p className="text-white text-sm text-center">
                              {modelsLoaded 
                                ? scanningStudent 
                                  ? `Recognizing ${scanningStudent}...` 
                                  : 'Analyzing faces...' 
                                : `Loading models (${progress}%)...`}
                            </p>
                          </div>
                        )}
                        {cameraStatus === 'scanning' && !processing && (
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                            <Button onClick={takeSnapshot} variant="default" size="sm">
                              <Camera className="h-4 w-4 mr-2" /> Capture & Identify
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {cameraStatus !== 'disconnected' && (
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className={`h-2 w-2 rounded-full mr-1 ${cameraStatus === 'scanning' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                          <span>Camera Status: {cameraStatus === 'scanning' ? 'Active Scanning' : 'Ready'}</span>
                        </div>
                        
                        {modelsLoaded && (
                          <div className="text-sm text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Models loaded successfully
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Position students clearly facing the camera for best results.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {students.length > 0 ? (
                    <>
                      <div className="flex justify-between mb-2">
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-muted-foreground mr-2" />
                            <span>Total: {summary.total}</span>
                          </div>
                          <div className="flex items-center">
                            <UserCheck className="h-5 w-5 text-green-500 mr-2" />
                            <span>Present: {summary.present}</span>
                          </div>
                          <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                            <span>Absent: {summary.absent}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={resetAttendance}>
                          <RefreshCw className="h-4 w-4 mr-2" /> Reset
                        </Button>
                      </div>
                      
                      <div className="relative mb-2">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search students..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      
                      <div className="rounded-md border overflow-hidden">
                        <div className="max-h-[350px] overflow-y-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Student
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                        {student.photoUrl ? (
                                          <img src={student.photoUrl} alt={student.name} className="h-full w-full object-cover" />
                                        ) : (
                                          <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-800">
                                            {student.name.charAt(0)}
                                          </div>
                                        )}
                                      </div>
                                      <div className="ml-2">
                                        <div className="text-sm font-medium text-gray-900">
                                          {student.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          Roll #{student.rollNumber}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <div>
                                      {getStatusBadge(student.scanStatus)}
                                      {student.confidence && (
                                        <div className="text-xs mt-1 text-gray-500">
                                          {student.scanStatus === 'verified' 
                                            ? `Confidence: ${student.confidence}%` 
                                            : student.scanStatus === 'failed' 
                                              ? `Too low (${student.confidence}%)` 
                                              : ''}
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-1">
                                      {student.scanStatus !== 'verified' && (
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          onClick={() => manualMarkAttendance(student.id, 'verified')}
                                          className="h-8 text-xs"
                                        >
                                          <CheckCircle className="h-3 w-3 mr-1" /> Mark Present
                                        </Button>
                                      )}
                                      {student.scanStatus !== 'failed' && (
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          onClick={() => manualMarkAttendance(student.id, 'failed')}
                                          className="h-8 text-xs text-destructive hover:text-destructive"
                                        >
                                          <XCircle className="h-3 w-3 mr-1" /> Mark Absent
                                        </Button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <Users className="h-16 w-16 text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-medium">No students to display</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        Select a class and section to view students
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="upload" className="space-y-4">
              <div className="flex space-x-4 mt-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="upload-class">Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger id="upload-class">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classOptions.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="upload-section">Section</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger id="upload-section">
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectionOptions.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="upload-date">Date</Label>
                  <Input
                    type="date"
                    id="upload-date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="border-2 border-dashed rounded-lg p-10 text-center mt-6">
                <UploadCloud className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Class Photos</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a group photo of the class to automatically mark attendance
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  id="class-photo"
                  className="hidden"
                />
                <div className="space-y-2">
                  <Button asChild>
                    <label htmlFor="class-photo" className="cursor-pointer">
                      <UploadCloud className="h-4 w-4 mr-2" /> Select Photo
                    </label>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports JPG, PNG - Max file size 10MB
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            {cameraStatus === 'disconnected' ? (
              <Badge variant="outline" className="bg-gray-100 text-gray-700">Camera Disconnected</Badge>
            ) : cameraStatus === 'connected' ? (
              <Badge variant="outline" className="bg-green-100 text-green-700">Camera Connected</Badge>
            ) : (
              <Badge variant="outline" className="bg-blue-100 text-blue-700 animate-pulse">Scanning Active</Badge>
            )}
          </span>
          {students.length > 0 && (
            <Button onClick={() => {
              toast({
                title: "Attendance Data Saved",
                description: `Saved attendance for ${selectedClass} ${selectedSection} on ${attendanceDate}`
              });
            }}>
              <Save className="h-4 w-4 mr-2" />
              Save Attendance
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
