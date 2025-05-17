
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
  Fingerprint, 
  UserCheck, 
  Clock, 
  Calendar, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Users,
  Scan,
  Save,
  Search,
  Shield,
  RotateCw,
  Plus,
  Trash2
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
  fingerprintEnrolled?: boolean;
}

interface BiometricAttendanceProps {
  className?: string;
}

export default function BiometricAttendance({ className }: BiometricAttendanceProps) {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [deviceStatus, setDeviceStatus] = useState<'connected' | 'disconnected' | 'scanning'>('disconnected');
  const [activeTab, setActiveTab] = useState<string>('scan');
  const [students, setStudents] = useState<Student[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [scanningStudent, setScanningStudent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [enrollingStudent, setEnrollingStudent] = useState<Student | null>(null);
  const [showEnrollDialog, setShowEnrollDialog] = useState<boolean>(false);

  // Mock class and section data
  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sectionOptions = ['A', 'B', 'C', 'D'];

  // Mock student data with fingerprint enrollment status
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
      photoUrl: '/students/student1.jpg',
      fingerprintEnrolled: true
    },
    { 
      id: '2', 
      name: 'Diya Patel', 
      className: 'Class 3', 
      section: 'B', 
      rollNumber: '302', 
      scanStatus: 'pending',
      photoUrl: '/students/student2.jpg',
      fingerprintEnrolled: true
    },
    { 
      id: '3', 
      name: 'Rohan Kumar', 
      className: 'Class 3', 
      section: 'B', 
      rollNumber: '303', 
      scanStatus: 'pending',
      photoUrl: '/students/student3.jpg',
      fingerprintEnrolled: false
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
      photoUrl: '/students/student4.jpg',
      fingerprintEnrolled: true
    },
    { 
      id: '5', 
      name: 'Vihaan Mehta', 
      className: 'Class 3', 
      section: 'B', 
      rollNumber: '305', 
      scanStatus: 'pending',
      photoUrl: '/students/student5.jpg',
      fingerprintEnrolled: false
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

  const connectDevice = () => {
    setProcessing(true);
    setProgress(0);
    
    // Simulate connection progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDeviceStatus('connected');
          setProcessing(false);
          
          toast({
            title: "Device Connected",
            description: "Biometric scanner is now ready to use."
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const disconnectDevice = () => {
    setDeviceStatus('disconnected');
    toast({
      title: "Device Disconnected",
      description: "Biometric scanner has been disconnected."
    });
  };

  const startScanning = () => {
    setDeviceStatus('scanning');
    toast({
      title: "Scanning Started",
      description: "Place finger on the scanner to record attendance."
    });
  };

  const stopScanning = () => {
    setDeviceStatus('connected');
    setScanningStudent(null);
    toast({
      title: "Scanning Stopped",
      description: "Fingerprint scanning has been stopped."
    });
  };

  const resetAttendance = () => {
    const resetStudents = students.map(student => ({
      ...student,
      scanStatus: 'pending' as const, // Use const assertion to fix the type
      lastScan: undefined,
      confidence: undefined
    }));
    
    setStudents(resetStudents);
    
    toast({
      title: "Attendance Reset",
      description: "All attendance records for today have been reset."
    });
  };

  const simulateFingerprintScan = () => {
    if (deviceStatus !== 'scanning') return;
    
    setProcessing(true);
    
    // Simulate scanning delay and random student identification
    setTimeout(() => {
      const enrolledStudents = students.filter(s => 
        s.scanStatus === 'pending' && s.fingerprintEnrolled
      );
      
      if (enrolledStudents.length > 0) {
        // Randomly select a student to mark as verified (simulating recognition)
        const randomIndex = Math.floor(Math.random() * enrolledStudents.length);
        const studentToMark = enrolledStudents[randomIndex];
        
        setScanningStudent(studentToMark.name);
        
        // Simulate confidence score
        const confidence = 70 + Math.random() * 30;
        
        setTimeout(() => {
          // Mark the student as present with confidence score
          const updatedStudents = students.map(student => {
            if (student.id === studentToMark.id) {
              return {
                ...student,
                scanStatus: confidence > 65 ? 'verified' as const : 'failed' as const, // Use const assertion to fix the type
                lastScan: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                confidence: parseFloat(confidence.toFixed(1))
              };
            }
            return student;
          });
          
          setStudents(updatedStudents);
          setScanningStudent(null);
          setProcessing(false);
          
          if (confidence > 65) {
            toast({
              title: "Fingerprint Matched",
              description: `Attendance marked for ${studentToMark.name} with ${confidence.toFixed(1)}% confidence.`
            });
          } else {
            toast({
              title: "Low Confidence Match",
              description: `Failed to verify ${studentToMark.name}'s fingerprint with only ${confidence.toFixed(1)}% confidence.`,
              variant: "destructive"
            });
          }
        }, 1000);
      } else {
        setProcessing(false);
        toast({
          title: "No Pending Students",
          description: "All enrolled students have been processed or no enrolled students found.",
        });
      }
    }, 800);
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

  const handleEnrollFingerprint = (student: Student) => {
    setEnrollingStudent(student);
    setShowEnrollDialog(true);
  };

  const completeEnrollment = () => {
    if (!enrollingStudent) return;
    
    const updatedStudents = students.map(student => {
      if (student.id === enrollingStudent.id) {
        return {
          ...student,
          fingerprintEnrolled: true
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    setEnrollingStudent(null);
    setShowEnrollDialog(false);
    
    toast({
      title: "Enrollment Complete",
      description: "Fingerprint has been successfully enrolled."
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
    const enrolled = students.filter(s => s.fingerprintEnrolled).length;
    return { present, absent, pending, total: students.length, enrolled };
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
              <CardTitle>Biometric Attendance</CardTitle>
              <CardDescription>Mark student attendance using fingerprint scanning</CardDescription>
            </div>
            <div className="flex space-x-2">
              {activeTab === 'scan' && (
                deviceStatus === 'disconnected' ? (
                  <Button variant="outline" onClick={connectDevice}>
                    <Shield className="h-4 w-4 mr-2" /> Connect Device
                  </Button>
                ) : deviceStatus === 'connected' ? (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={disconnectDevice}>
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
              <TabsTrigger value="scan">
                <Shield className="h-4 w-4 mr-2" /> Scan Attendance
              </TabsTrigger>
              <TabsTrigger value="enroll">
                <Plus className="h-4 w-4 mr-2" /> Enroll Students
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scan" className="space-y-4">
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
                    {deviceStatus === 'disconnected' ? (
                      <div className="text-center text-gray-400">
                        <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Device disconnected</p>
                        <Button onClick={connectDevice} variant="outline" size="sm" className="mt-2">
                          Connect Device
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full border-2 border-white/30 flex items-center justify-center">
                            <Fingerprint className="h-16 w-16 text-white/50" />
                          </div>
                        </div>
                        {processing && (
                          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
                            <RefreshCw className="h-8 w-8 text-white animate-spin mb-2" />
                            <Progress value={progress} className="w-3/4 mb-2" />
                            <p className="text-white text-sm text-center">
                              {deviceStatus === 'scanning' 
                                ? scanningStudent 
                                  ? `Verifying ${scanningStudent}...` 
                                  : 'Waiting for fingerprint...' 
                                : `Initializing scanner (${progress}%)...`}
                            </p>
                          </div>
                        )}
                        {deviceStatus === 'scanning' && !processing && (
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                            <Button onClick={simulateFingerprintScan} variant="default" size="sm">
                              <Fingerprint className="h-4 w-4 mr-2" /> Scan Fingerprint
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {deviceStatus !== 'disconnected' && (
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className={`h-2 w-2 rounded-full mr-1 ${deviceStatus === 'scanning' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                          <span>Device Status: {deviceStatus === 'scanning' ? 'Active Scanning' : 'Ready'}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Place your finger on the scanner to mark attendance
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
                                      {!student.fingerprintEnrolled && (
                                        <div className="text-xs mt-1 text-amber-600">
                                          Not enrolled
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-1">
                                      {!student.fingerprintEnrolled ? (
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          onClick={() => handleEnrollFingerprint(student)}
                                          className="h-8 text-xs"
                                        >
                                          <Plus className="h-3 w-3 mr-1" /> Enroll
                                        </Button>
                                      ) : (
                                        <>
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
                                        </>
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
            
            <TabsContent value="enroll" className="space-y-4">
              {showEnrollDialog ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Enrolling {enrollingStudent?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Step 1 of 3: Place your finger on the scanner
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowEnrollDialog(false)}>
                      <XCircle className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                  </div>
                  
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-2 border-white/30 flex items-center justify-center">
                        <Fingerprint className="h-16 w-16 text-white/50" />
                      </div>
                    </div>
                    {processing && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
                        <RefreshCw className="h-8 w-8 text-white animate-spin mb-2" />
                        <Progress value={progress} className="w-3/4 mb-2" />
                        <p className="text-white text-sm text-center">
                          Capturing fingerprint...
                        </p>
                      </div>
                    )}
                    {!processing && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <Button onClick={completeEnrollment} variant="default" size="sm">
                          <Fingerprint className="h-4 w-4 mr-2" /> Capture Fingerprint
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${progress >= 10 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">First scan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${progress >= 20 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Second scan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${progress >= 30 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Final scan</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex space-x-4 mt-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="enroll-class">Class</Label>
                      <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger id="enroll-class">
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
                      <Label htmlFor="enroll-section">Section</Label>
                      <Select value={selectedSection} onValueChange={setSelectedSection}>
                        <SelectTrigger id="enroll-section">
                          <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                          {sectionOptions.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="rounded-md border overflow-hidden">
                    <div className="max-h-[500px] overflow-y-auto">
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
                                  {student.fingerprintEnrolled ? (
                                    <Badge className="bg-green-500">
                                      <CheckCircle className="h-3 w-3 mr-1" /> Enrolled
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">
                                      <AlertCircle className="h-3 w-3 mr-1" /> Not Enrolled
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-1">
                                  {!student.fingerprintEnrolled ? (
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      onClick={() => handleEnrollFingerprint(student)}
                                      className="h-8 text-xs"
                                    >
                                      <Plus className="h-3 w-3 mr-1" /> Enroll
                                    </Button>
                                  ) : (
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      onClick={() => {
                                        // In a real app, this would delete the fingerprint data
                                        toast({
                                          title: "Fingerprint Deleted",
                                          description: `Fingerprint data for ${student.name} has been deleted.`
                                        });
                                      }}
                                      className="h-8 text-xs text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-3 w-3 mr-1" /> Delete
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
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            {deviceStatus === 'disconnected' ? (
              <Badge variant="outline" className="bg-gray-100 text-gray-700">Device Disconnected</Badge>
            ) : deviceStatus === 'connected' ? (
              <Badge variant="outline" className="bg-green-100 text-green-700">Device Connected</Badge>
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
