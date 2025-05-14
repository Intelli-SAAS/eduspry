import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, DisciplinaryType, DisciplinarySeverity } from '@/types';
import {
  AlertOctagon,
  CalendarClock,
  Clock,
  FileWarning,
  User,
  Search,
  Filter,
  PlusCircle,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  AlarmClock,
  BookX,
  MessageSquare,
  ThumbsDown,
  Info,
  BadgeAlert,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';

// Types
interface DisciplinaryRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  type: 'academic' | 'behavioral';
  category: string;
  description: string;
  date: string;
  severity: 'minor' | 'moderate' | 'serious';
  status: 'active' | 'resolved' | 'pending';
  assignedTo?: string;
  comments?: {
    user: string;
    role: string;
    text: string;
    date: string;
  }[];
  actions?: {
    description: string;
    date: string;
    by: string;
  }[];
}

interface DisciplinaryRecordsProps {
  className?: string;
  role?: 'teacher' | 'admin' | 'parent';
  studentId?: string;
}

// Mock data
const mockStudents = [
  { id: '101', name: 'Aarav Singh', class: 'Class 5', section: 'A', avatar: '/avatars/01.png' },
  { id: '102', name: 'Diya Patel', class: 'Class 5', section: 'B', avatar: '/avatars/02.png' },
  { id: '103', name: 'Rohan Kumar', class: 'Class 6', section: 'A', avatar: '/avatars/03.png' },
  { id: '104', name: 'Ananya Sharma', class: 'Class 6', section: 'B', avatar: '/avatars/04.png' },
  { id: '105', name: 'Ishaan Mehta', class: 'Class 7', section: 'A', avatar: '/avatars/05.png' },
];

const academicCategories = [
  'Missing Assignments',
  'Low Academic Performance',
  'Plagiarism',
  'Cheating on Tests',
  'Incomplete Homework',
  'Late Submissions',
  'Attendance Issues'
];

const behavioralCategories = [
  'Classroom Disruption',
  'Bullying',
  'Vandalism',
  'Dress Code Violation',
  'Inappropriate Language',
  'Tardiness',
  'Technology Misuse',
  'Fighting'
];

const mockDisciplinaryRecords: DisciplinaryRecord[] = [
  {
    id: 'DR001',
    studentId: '101',
    studentName: 'Aarav Singh',
    class: 'Class 5',
    section: 'A',
    type: 'academic',
    category: 'Missing Assignments',
    description: 'Student has not submitted 3 consecutive mathematics assignments this term.',
    date: '2023-09-10',
    severity: 'moderate',
    status: 'active',
    assignedTo: 'Mr. Gupta',
    comments: [
      {
        user: 'Mr. Gupta',
        role: 'teacher',
        text: 'I\'ve spoken to Aarav about this issue. He promised to submit all pending assignments by next week.',
        date: '2023-09-12'
      }
    ],
    actions: [
      {
        description: 'Parent notification sent via email',
        date: '2023-09-11',
        by: 'Ms. Sharma'
      }
    ]
  },
  {
    id: 'DR002',
    studentId: '103',
    studentName: 'Rohan Kumar',
    class: 'Class 6',
    section: 'A',
    type: 'behavioral',
    category: 'Classroom Disruption',
    description: 'Continuously talking and disrupting the science class.',
    date: '2023-09-15',
    severity: 'minor',
    status: 'resolved',
    assignedTo: 'Ms. Kapoor',
    comments: [
      {
        user: 'Ms. Kapoor',
        role: 'teacher',
        text: 'Had a discussion with Rohan about his behavior.',
        date: '2023-09-16'
      },
      {
        user: 'Mr. Kumar',
        role: 'parent',
        text: 'We have spoken to Rohan about this at home. He understands the importance of classroom discipline.',
        date: '2023-09-17'
      }
    ],
    actions: [
      {
        description: 'Verbal warning issued',
        date: '2023-09-15',
        by: 'Ms. Kapoor'
      },
      {
        description: 'Follow-up meeting with student',
        date: '2023-09-18',
        by: 'Ms. Kapoor'
      }
    ]
  },
  {
    id: 'DR003',
    studentId: '102',
    studentName: 'Diya Patel',
    class: 'Class 5',
    section: 'B',
    type: 'academic',
    category: 'Plagiarism',
    description: 'Submitted a history project with content directly copied from internet sources without citation.',
    date: '2023-09-20',
    severity: 'serious',
    status: 'pending',
    assignedTo: 'Mr. Sharma',
    comments: [
      {
        user: 'Mr. Sharma',
        role: 'teacher',
        text: 'This is a serious academic integrity violation. A meeting with parents has been scheduled.',
        date: '2023-09-21'
      }
    ],
    actions: [
      {
        description: 'Project marked for resubmission',
        date: '2023-09-20',
        by: 'Mr. Sharma'
      },
      {
        description: 'Parent-teacher meeting scheduled',
        date: '2023-09-22',
        by: 'Ms. Joshi'
      }
    ]
  }
];

// Main Component
const DisciplinaryRecords: React.FC<DisciplinaryRecordsProps> = ({
  className = '',
  role = 'teacher',
  studentId
}) => {
  const { user } = useAuth();
  const teacherRole = role === 'teacher' || user?.role === UserRole.TEACHER;
  const currentStudentId = studentId || (user?.role === UserRole.STUDENT ? user.id : undefined);
  
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [viewingRecord, setViewingRecord] = useState<DisciplinaryRecord | null>(null);
  
  const [records, setRecords] = useState<DisciplinaryRecord[]>(mockDisciplinaryRecords);
  
  const filteredRecords = records.filter(record => {
    if (currentStudentId && record.studentId !== currentStudentId) return false;
    
    if (activeTab === 'academic' && record.type !== 'academic') return false;
    if (activeTab === 'behavioral' && record.type !== 'behavioral') return false;
    
    if (searchQuery && !record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !record.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !record.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedType && record.type !== selectedType) return false;
    
    if (selectedSeverity && record.severity !== selectedSeverity) return false;
    
    if (selectedStatus && record.status !== selectedStatus) return false;
    
    return true;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'minor':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Minor</Badge>;
      case 'moderate':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Moderate</Badge>;
      case 'serious':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Serious</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Active</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedSeverity('');
    setSelectedStatus('');
  };

  const handleAddRecord = () => {
    if (!newRecord.studentId || !newRecord.category || !newRecord.description) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    const student = mockStudents.find(s => s.id === newRecord.studentId);
    if (!student) return;

    const newDisciplinaryRecord: DisciplinaryRecord = {
      id: `DR${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      studentId: student.id,
      studentName: student.name,
      class: student.class,
      section: student.section,
      type: newRecord.type as 'academic' | 'behavioral',
      category: newRecord.category,
      description: newRecord.description,
      date: format(new Date(), 'yyyy-MM-dd'),
      severity: newRecord.severity as 'minor' | 'moderate' | 'serious',
      status: 'active',
      comments: [],
      actions: []
    };

    setRecords([newDisciplinaryRecord, ...records]);
    setShowAddDialog(false);
    setNewRecord({
      studentId: '',
      type: 'behavioral',
      category: '',
      description: '',
      severity: 'minor',
    });

    toast({
      title: "Record Added",
      description: "The disciplinary record has been added successfully."
    });
  };

  const handleResolveRecord = (id: string) => {
    const updatedRecords = records.map(record => 
      record.id === id 
        ? {
            ...record, 
            status: 'resolved',
            actions: [
              ...(record.actions || []),
              {
                description: 'Issue marked as resolved',
                date: format(new Date(), 'yyyy-MM-dd'),
                by: 'Current User'
              }
            ]
          } 
        : record
    );
    
    setRecords(updatedRecords);
    setViewingRecord(null);
    
    toast({
      title: "Record Updated",
      description: "The disciplinary record has been marked as resolved."
    });
  };

  const handleAddComment = (id: string, commentText: string) => {
    if (!commentText.trim()) return;

    const updatedRecords = records.map(record => 
      record.id === id 
        ? {
            ...record,
            comments: [
              ...(record.comments || []),
              {
                user: 'Current User',
                role: role,
                text: commentText,
                date: format(new Date(), 'yyyy-MM-dd')
              }
            ]
          } 
        : record
    );
    
    setRecords(updatedRecords);
    
    const updatedRecord = updatedRecords.find(r => r.id === id);
    if (updatedRecord && viewingRecord?.id === id) {
      setViewingRecord(updatedRecord);
    }
    
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the record."
    });
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <BadgeAlert className="mr-2 h-5 w-5" />
              Disciplinary Records
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {teacherRole ? "Track and manage student disciplinary issues" : "View your disciplinary records"}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {teacherRole && (
              <Button onClick={() => setShowAddDialog(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Record
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b">
        <div className="flex-grow">
          <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <FileWarning className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center gap-1">
                <BookX className="h-4 w-4" />
                <span>Academic</span>
              </TabsTrigger>
              <TabsTrigger value="behavioral" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Behavioral</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Select 
            value={selectedSeverity} 
            onValueChange={(value: any) => setSelectedSeverity(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="minor">Minor</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="serious">Serious</SelectItem>
            </SelectContent>
          </Select>
          
          {teacherRole && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                className="pl-10 w-full"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileWarning className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <h3 className="text-lg font-medium mb-1">No disciplinary records found</h3>
            <p className="text-sm">
              {teacherRole ? "There are no records matching your filters" : "You don't have any disciplinary records"}
            </p>
            
            {teacherRole && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setShowAddDialog(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Record
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setViewingRecord(record)}>
                <CardContent className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="flex items-center gap-2 mb-2 sm:mb-0">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{record.studentName}</span>
                        {record.class && (
                          <Badge variant="outline" className="ml-2">{record.class}</Badge>
                        )}
                      </div>
                      <Badge variant={record.type === 'academic' ? 'secondary' : 'default'}>
                        {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-sm mb-3">
                      {getSeverityBadge(record.severity)}
                      {getStatusBadge(record.status)}
                    </div>
                    
                    <p className="text-sm line-clamp-2">{record.category}</p>
                  </div>
                  
                  <div className="flex items-center self-end">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
      {/* New Record Dialog */}
      <Dialog open={showNewRecordDialog} onOpenChange={setShowNewRecordDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Disciplinary Record</DialogTitle>
            <DialogDescription>
              Fill out the form to create a new disciplinary record for a student.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name</Label>
              <Input
                id="student-name"
                placeholder="Enter student name"
                value={newRecord.studentName}
                onChange={(e) => setNewRecord({...newRecord, studentName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="student-class">Class/Section</Label>
              <Input
                id="student-class"
                placeholder="E.g., 10-A"
                value={newRecord.class}
                onChange={(e) => setNewRecord({...newRecord, class: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="incident-date">Incident Date</Label>
              <Input
                id="incident-date"
                type="date"
                value={newRecord.date}
                onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                max={new Date().toISOString().split('T')[0]} // Can't be in the future
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newRecord.type} 
                  onValueChange={(value: DisciplinaryType) => setNewRecord({...newRecord, type: value})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DisciplinaryType.TARDY}>Tardiness</SelectItem>
                    <SelectItem value={DisciplinaryType.ABSENCE}>Absence</SelectItem>
                    <SelectItem value={DisciplinaryType.BEHAVIOR}>Behavioral Issue</SelectItem>
                    <SelectItem value={DisciplinaryType.ACADEMIC}>Academic Issue</SelectItem>
                    <SelectItem value={DisciplinaryType.OTHER}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select 
                  value={newRecord.severity} 
                  onValueChange={(value: DisciplinarySeverity) => setNewRecord({...newRecord, severity: value})}
                >
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DisciplinarySeverity.LOW}>Low</SelectItem>
                    <SelectItem value={DisciplinarySeverity.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={DisciplinarySeverity.HIGH}>High</SelectItem>
                    <SelectItem value={DisciplinarySeverity.CRITICAL}>Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the incident in detail"
                value={newRecord.description}
                onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="action">Action Taken</Label>
              <Textarea
                id="action"
                placeholder="Describe any actions taken or consequences"
                value={newRecord.actionTaken}
                onChange={(e) => setNewRecord({...newRecord, actionTaken: e.target.value})}
                rows={2}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="parent-notified" 
                checked={newRecord.parentNotified}
                onCheckedChange={(checked) => {
                  const isChecked = Boolean(checked);
                  setNewRecord({
                    ...newRecord, 
                    parentNotified: isChecked,
                    parentNotificationDate: isChecked ? new Date().toISOString().split('T')[0] : ''
                  });
                }}
              />
              <Label htmlFor="parent-notified">Parent/Guardian has been notified</Label>
            </div>
            
            {newRecord.parentNotified && (
              <div className="space-y-2">
                <Label htmlFor="notification-date">Notification Date</Label>
                <Input
                  id="notification-date"
                  type="date"
                  value={newRecord.parentNotificationDate}
                  onChange={(e) => setNewRecord({...newRecord, parentNotificationDate: e.target.value})}
                  max={new Date().toISOString().split('T')[0]} // Can't be in the future
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRecordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateDisciplinaryRecord}>
              Create Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Record Details Dialog */}
      {selectedRecord && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Disciplinary Record Details</DialogTitle>
              <Badge variant={getSeverityBadgeVariant(selectedRecord.severity)} className="self-start mt-2">
                {selectedRecord.severity} Severity
              </Badge>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{selectedRecord.studentName}</h3>
                  {selectedRecord.class && (
                    <p className="text-sm text-gray-500">{selectedRecord.class}</p>
                  )}
                </div>
                
                <div className="text-right text-sm">
                  <p className="text-gray-500">Date of Incident</p>
                  <p>{new Date(selectedRecord.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                <div className="flex items-center">
                  {getDisciplinaryTypeIcon(selectedRecord.type)}
                  <p className="text-sm font-medium ml-2">
                    {getDisciplinaryTypeLabel(selectedRecord.type)}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-sm">Recorded on {new Date(selectedRecord.createdAt).toLocaleString()}</p>
                </div>
                
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-sm">Recorded by: {selectedRecord.createdBy}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">{selectedRecord.description}</p>
              </div>
              
              {selectedRecord.actionTaken && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Action Taken</h4>
                  <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">{selectedRecord.actionTaken}</p>
                </div>
              )}
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">Parent/Guardian Notification</h4>
                
                {selectedRecord.parentNotified ? (
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    <span>
                      Parents notified on {
                        selectedRecord.parentNotificationDate 
                          ? new Date(selectedRecord.parentNotificationDate).toLocaleDateString() 
                          : 'N/A'
                      }
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                    <AlertOctagon className="h-4 w-4 mr-2" />
                    <span>Parents have not been notified</span>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              {teacherRole && !selectedRecord.parentNotified && (
                <Button>
                  Mark as Notified
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DisciplinaryRecords; 