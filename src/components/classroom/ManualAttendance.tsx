import React, { useState, useEffect } from 'react';
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
  UserCheck, 
  Clock, 
  Calendar, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Users,
  Save,
  Search,
  Download,
  Upload,
  Filter
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  className: string;
  section: string;
  rollNumber: string;
  scanStatus?: 'pending' | 'verified' | 'failed';
  lastScan?: string;
  photoUrl?: string;
  remarks?: string;
}

interface ManualAttendanceProps {
  className?: string;
}

export default function ManualAttendance({ className }: ManualAttendanceProps) {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [activeTab, setActiveTab] = useState<string>('mark');
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [remarks, setRemarks] = useState<string>('');

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
      photoUrl: '/students/student1.jpg',
      remarks: 'On time'
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
      photoUrl: '/students/student4.jpg',
      remarks: 'Late by 10 minutes'
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

  const resetAttendance = () => {
    const resetStudents = students.map(student => ({
      ...student,
      scanStatus: 'pending',
      lastScan: undefined,
      remarks: undefined
    }));
    
    setStudents(resetStudents);
    
    toast({
      title: "Attendance Reset",
      description: "All attendance records for today have been reset."
    });
  };

  const markAttendance = (studentId: string, status: 'verified' | 'failed', studentRemarks?: string) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          scanStatus: status,
          lastScan: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          remarks: studentRemarks
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    setSelectedStudent(null);
    setRemarks('');
    
    toast({
      title: status === 'verified' ? "Marked Present" : "Marked Absent",
      description: `Student has been marked as ${status === 'verified' ? 'present' : 'absent'}.`
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

  const filteredStudents = students.filter(student => {
    const matchesSearch = searchQuery 
      ? student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesStatus = selectedStatus 
      ? student.scanStatus === selectedStatus 
      : true;
    
    return matchesSearch && matchesStatus;
  });

  const summary = getAttendanceSummary();

  return (
    <div className={className}>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Manual Attendance</CardTitle>
              <CardDescription>Mark student attendance manually</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mark">
                <UserCheck className="h-4 w-4 mr-2" /> Mark Attendance
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="h-4 w-4 mr-2" /> Attendance History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mark" className="space-y-4">
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
                    
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by name or roll number..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="verified">Present</SelectItem>
                          <SelectItem value="failed">Absent</SelectItem>
                        </SelectContent>
                      </Select>
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
                                Time
                              </th>
                              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Remarks
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
                                  {getStatusBadge(student.scanStatus)}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {student.lastScan || '-'}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {student.remarks || '-'}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-1">
                                    {student.scanStatus !== 'verified' && (
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => {
                                          setSelectedStudent(student);
                                          setRemarks('');
                                        }}
                                        className="h-8 text-xs"
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" /> Mark Present
                                      </Button>
                                    )}
                                    {student.scanStatus !== 'failed' && (
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => {
                                          setSelectedStudent(student);
                                          setRemarks('');
                                        }}
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
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <div className="flex space-x-4 mt-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="history-class">Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger id="history-class">
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
                  <Label htmlFor="history-section">Section</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger id="history-section">
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
                  <Label htmlFor="history-date">Date</Label>
                  <Input
                    type="date"
                    id="history-date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" /> Import
                </Button>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Class
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Section
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Present
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Absent
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {new Date(attendanceDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {selectedClass}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {selectedSection}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {summary.present}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {summary.absent}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {summary.total}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="h-8 text-xs">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            {students.length > 0 ? (
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                {summary.pending} students pending attendance
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                No students selected
              </Badge>
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

      {/* Mark Attendance Dialog */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>
                Mark attendance for {selectedStudent.name} (Roll #{selectedStudent.rollNumber})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <Input
                  id="remarks"
                  placeholder="Add any remarks about attendance..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setSelectedStudent(null);
                setRemarks('');
              }}>
                Cancel
              </Button>
              <Button 
                variant="default" 
                onClick={() => markAttendance(selectedStudent.id, 'verified', remarks)}
              >
                Mark Present
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => markAttendance(selectedStudent.id, 'failed', remarks)}
              >
                Mark Absent
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
} 