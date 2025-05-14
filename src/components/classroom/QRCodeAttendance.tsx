import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  QrCode, 
  Camera, 
  UserCheck, 
  Clock, 
  Calendar, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Users,
  Download,
  Scan,
  Save,
  Search,
  Copy,
  Share2,
  Smartphone
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Student {
  id: string;
  name: string;
  className: string;
  section: string;
  rollNumber: string;
  scanStatus: "pending" | "verified" | "failed";
  lastScan?: string;
  deviceInfo?: string;
  photoUrl?: string;
}

interface QRCodeAttendanceProps {
  className?: string;
}

export default function QRCodeAttendance({ className }: QRCodeAttendanceProps) {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [cameraStatus, setCameraStatus] = useState<'connected' | 'disconnected' | 'scanning'>('disconnected');
  const [activeTab, setActiveTab] = useState<string>('display');
  const [students, setStudents] = useState<Student[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [scanningStudent, setScanningStudent] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrValue, setQrValue] = useState<string>('');
  const [qrExpiry, setQrExpiry] = useState<number>(300); // 5 minutes in seconds
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock class and section data
  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sectionOptions = ['A', 'B', 'C', 'D'];

  // Student names for random generation
  const studentNames = [
    'Ananya Sharma', 'Arjun Patel', 'Aditi Singh', 'Aryan Mehta', 'Avni Joshi',
    'Dhruv Kumar', 'Diya Gupta', 'Divya Rao', 'Dev Sharma', 'Disha Verma',
    'Ishan Patel', 'Ishita Singh', 'Ishaan Gupta', 'Isha Reddy', 'Ira Desai',
    'Kabir Sharma', 'Kavya Patel', 'Krish Sharma', 'Kritika Singh', 'Kunal Verma',
    'Mira Desai', 'Manav Kumar', 'Mihir Patel', 'Maya Sharma', 'Mitul Singh',
    'Neha Gupta', 'Nikhil Singh', 'Nisha Patel', 'Neil Sharma', 'Navya Reddy',
    'Pranav Mehta', 'Priya Singh', 'Parth Patel', 'Pooja Sharma', 'Pranav Kumar',
    'Riya Patel', 'Rohan Sharma', 'Ritika Singh', 'Rajat Verma', 'Roshni Gupta',
    'Samar Joshi', 'Sneha Patel', 'Siddharth Singh', 'Sara Mehta', 'Shivam Kumar',
    'Tanvi Sharma', 'Tanish Patel', 'Tanya Singh', 'Tarun Mehta', 'Trisha Desai'
  ];

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
      deviceInfo: 'iPhone 13',
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
      deviceInfo: 'Samsung Galaxy S21',
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
    // Generate QR code value when class and section are selected
    if (selectedClass && selectedSection) {
      const qrData = {
        class: selectedClass,
        section: selectedSection,
        date: attendanceDate,
        timestamp: new Date().toISOString(),
        teacherId: user?.id || 'unknown'
      };
      setQrValue(JSON.stringify(qrData));
    } else {
      setQrValue('');
    }
  }, [selectedClass, selectedSection, attendanceDate, user]);

  useEffect(() => {
    // QR code expiry countdown
    if (qrValue && qrExpiry > 0) {
      const timer = setInterval(() => {
        setQrExpiry(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            generateNewQR();
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [qrValue, qrExpiry]);

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

  const generateNewQR = () => {
    if (selectedClass && selectedSection) {
      const qrData = {
        class: selectedClass,
        section: selectedSection,
        date: attendanceDate,
        timestamp: new Date().toISOString(),
        teacherId: user?.id || 'unknown'
      };
      setQrValue(JSON.stringify(qrData));
      setQrExpiry(300);
      
      toast({
        title: "New QR Code Generated",
        description: "A fresh QR code has been generated for attendance."
      });
    }
  };

  const connectCamera = async () => {
    try {
      if (videoRef.current) {
        const constraints = {
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "environment"
          }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        setCameraStatus('connected');
        
        toast({
          title: "Camera Connected",
          description: "QR code scanner is now ready to use."
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
    
    toast({
      title: "Camera Disconnected",
      description: "QR code scanner has been disconnected."
    });
  };

  const startScanning = () => {
    setCameraStatus('scanning');
    
    toast({
      title: "Scanning Initiated",
      description: "The system is now scanning for QR codes."
    });
  };

  const stopScanning = () => {
    setCameraStatus('connected');
    setScanningStudent(null);
    
    toast({
      title: "Scanning Stopped",
      description: "QR code scanning has been stopped."
    });
  };

  const resetAttendance = () => {
    const resetStudents = students.map(student => ({
      ...student,
      scanStatus: 'pending' as 'pending' | 'verified' | 'failed',
      lastScan: undefined,
      deviceInfo: undefined
    }));
    
    setStudents(resetStudents);
    
    toast({
      title: "Attendance Reset",
      description: "All attendance records for today have been reset."
    });
  };

  const processQRCode = (data: string) => {
    try {
      const qrData = JSON.parse(data);
      
      // Verify QR code data
      if (qrData.class !== selectedClass || qrData.section !== selectedSection) {
        toast({
          title: "Invalid QR Code",
          description: "This QR code is not for the selected class/section.",
          variant: "destructive"
        });
        return;
      }
      
      // Simulate student scanning
      const pendingStudents = students.filter(s => s.scanStatus === 'pending');
      
      if (pendingStudents.length > 0) {
        const randomIndex = Math.floor(Math.random() * pendingStudents.length);
        const studentToMark = pendingStudents[randomIndex];
        
        setScanningStudent(studentToMark.name);
        setProcessing(true);
        
        // Simulate processing delay
        setTimeout(() => {
          const updatedStudents = students.map(student => {
            if (student.id === studentToMark.id) {
              return {
                ...student,
                scanStatus: 'verified' as "pending" | "verified" | "failed",
                lastScan: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                deviceInfo: 'Student Device'
              };
            }
            return student;
          });
          
          setStudents(updatedStudents);
          setScanningStudent(null);
          setProcessing(false);
          
          toast({
            title: "Attendance Marked",
            description: `Attendance marked for ${studentToMark.name}`
          });
        }, 1000);
      } else {
        toast({
          title: "All Students Marked",
          description: "All students have already been marked present."
        });
      }
    } catch (error) {
      console.error('Error processing QR code:', error);
      toast({
        title: "Invalid QR Code",
        description: "Could not process the scanned QR code.",
        variant: "destructive"
      });
    }
  };

  const manualMarkAttendance = (studentId: string, status: 'verified' | 'failed') => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          scanStatus: status as "pending" | "verified" | "failed",
          lastScan: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          deviceInfo: status === 'verified' ? 'Manual Entry' : undefined
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const simulateQRScan = () => {
    // Simulate random student scanning in
    const pendingStudents = students.filter(s => s.scanStatus === 'pending');
    
    if (pendingStudents.length === 0) {
      toast({
        title: "All Students Marked",
        description: "All students have already been marked present."
      });
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * pendingStudents.length);
    const studentToMark = pendingStudents[randomIndex];
    
    setProcessing(true);
    setScanningStudent(studentToMark.name);
    
    setTimeout(() => {
      const updatedStudents = students.map(student => {
        if (student.id === studentToMark.id) {
          return {
            ...student,
            scanStatus: 'verified' as "pending" | "verified" | "failed",
            lastScan: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            deviceInfo: 'Simulated Scan'
          };
        }
        return student;
      });
      
      setStudents(updatedStudents);
      setScanningStudent(null);
      setProcessing(false);
      
      toast({
        title: "Simulated Scan Complete",
        description: `${studentToMark.name} has been marked present.`
      });
    }, 1500);
  };

  const addRandomStudent = () => {
    const id = Math.random().toString(36).substring(2, 10);
    const randomNameIndex = Math.floor(Math.random() * studentNames.length);
    const newStudent: Student = {
      id,
      name: studentNames[randomNameIndex],
      className: selectedClass,
      section: selectedSection,
      rollNumber: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
      scanStatus: 'pending'
    };

    setStudents([...students, newStudent]);
    
    toast({
      title: "Test Student Added",
      description: `${newStudent.name} has been added to the student list.`
    });
  };

  return (
    <div className={className}>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>QR Code Attendance</CardTitle>
              <CardDescription>Mark student attendance using QR codes</CardDescription>
            </div>
            <div className="flex space-x-2">
              {activeTab === 'scan' && (
                cameraStatus === 'disconnected' ? (
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
                )
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="display">
                <QrCode className="h-4 w-4 mr-2" /> Display QR
              </TabsTrigger>
              <TabsTrigger value="scan">
                <Camera className="h-4 w-4 mr-2" /> Scan QR
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="display" className="space-y-4">
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
                  {qrValue ? (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <QRCodeSVG 
                          value={qrValue} 
                          size={256}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Expires in: {formatTime(qrExpiry)}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={generateNewQR}>
                          <RefreshCw className="h-4 w-4 mr-2" /> Generate New
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          navigator.clipboard.writeText(qrValue);
                          toast({
                            title: "QR Code Data Copied",
                            description: "The QR code data has been copied to clipboard."
                          });
                        }}>
                          <Copy className="h-4 w-4 mr-2" /> Copy Data
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          // In a real app, this would share the QR code
                          toast({
                            title: "Share QR Code",
                            description: "QR code sharing functionality would be implemented here."
                          });
                        }}>
                          <Share2 className="h-4 w-4 mr-2" /> Share
                        </Button>
                      </div>
                      
                      <div className="text-center space-y-1">
                        <p className="text-sm font-medium">Instructions for Students</p>
                        <p className="text-xs text-muted-foreground">
                          Scan this QR code with your phone to mark attendance
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                      <QrCode className="h-16 w-16 text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-medium">No QR Code Generated</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        Select a class and section to generate QR code
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
                                      {student.deviceInfo && (
                                        <div className="text-xs mt-1 text-gray-500">
                                          {student.deviceInfo}
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
            
            <TabsContent value="scan" className="space-y-4">
              <div className="flex space-x-4 mt-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="scan-class">Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger id="scan-class">
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
                  <Label htmlFor="scan-section">Section</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger id="scan-section">
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
                  <Label htmlFor="scan-date">Date</Label>
                  <Input
                    type="date"
                    id="scan-date"
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
                            <p className="text-white text-sm text-center">
                              {scanningStudent 
                                ? `Processing attendance for ${scanningStudent}...` 
                                : 'Scanning for QR code...'}
                            </p>
                          </div>
                        )}
                        {cameraStatus === 'scanning' && !processing && (
                          <div className="absolute inset-0 border-2 border-dashed border-white/30 m-4 pointer-events-none">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white"></div>
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
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Position the QR code within the frame to scan
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            {activeTab === 'scan' ? (
              cameraStatus === 'disconnected' ? (
                <Badge variant="outline" className="bg-gray-100 text-gray-700">Camera Disconnected</Badge>
              ) : cameraStatus === 'connected' ? (
                <Badge variant="outline" className="bg-green-100 text-green-700">Camera Connected</Badge>
              ) : (
                <Badge variant="outline" className="bg-blue-100 text-blue-700 animate-pulse">Scanning Active</Badge>
              )
            ) : (
              qrValue ? (
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  QR Code Active - Expires in {formatTime(qrExpiry)}
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-100 text-gray-700">No QR Code Generated</Badge>
              )
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