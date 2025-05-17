import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, LeaveType, LeaveStatus } from '@/types';
import { CalendarDays, Clock, CheckCircle2, XCircle, User, Calendar, PlusCircle, FileText, AlertCircle, ChevronRight, Filter, Search, FileCheck, FileX, Mail, Phone, Plus } from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';

// Types
interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  class?: string;
  startDate: string;
  endDate: string;
  type: LeaveType;
  reason: string;
  status: LeaveStatus;
  submittedDate: string;
  approvedBy?: string;
  approvalDate?: string;
  rejectionReason?: string;
  attachmentUrl?: string;
  parentContact?: string;
}

interface LeaveApplication {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  section: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
  reviewedBy?: string;
  reviewedOn?: string;
  documents?: string[];
}

interface LeaveManagementProps {
  className?: string;
  isTeacher?: boolean;
  studentId?: string; // If viewing as a student
  role?: 'teacher' | 'admin' | 'parent';
}

// Mock data
const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'leave-1',
    studentId: 'student-1',
    studentName: 'John Smith',
    class: '10-A',
    startDate: '2023-08-10',
    endDate: '2023-08-12',
    type: LeaveType.SICK,
    reason: 'Down with fever and cold. Doctor has advised 3 days rest.',
    status: LeaveStatus.APPROVED,
    submittedDate: '2023-08-09T10:30:00.000Z',
    approvedBy: 'Mr. Anderson',
    approvalDate: '2023-08-09T14:20:00.000Z',
    parentContact: 'parent@example.com'
  },
  {
    id: 'leave-2',
    studentId: 'student-1',
    studentName: 'John Smith',
    class: '10-A',
    startDate: '2023-09-05',
    endDate: '2023-09-07',
    type: LeaveType.FAMILY,
    reason: 'Family wedding out of town. Need to travel to another city.',
    status: LeaveStatus.PENDING,
    submittedDate: '2023-09-01T09:15:00.000Z',
    parentContact: 'parent@example.com'
  },
  {
    id: 'leave-3',
    studentId: 'student-2',
    studentName: 'Emily Johnson',
    class: '9-B',
    startDate: '2023-08-20',
    endDate: '2023-08-20',
    type: LeaveType.PERSONAL,
    reason: 'Dental appointment in the afternoon',
    status: LeaveStatus.REJECTED,
    submittedDate: '2023-08-18T11:00:00.000Z',
    rejectionReason: 'Too close to class test. Please reschedule appointment if possible.',
    approvedBy: 'Ms. Williams',
    approvalDate: '2023-08-18T16:45:00.000Z',
    parentContact: 'parent2@example.com'
  },
  {
    id: 'leave-4',
    studentId: 'student-3',
    studentName: 'Michael Brown',
    class: '11-C',
    startDate: '2023-09-12',
    endDate: '2023-09-16',
    type: LeaveType.VACATION,
    reason: 'Family vacation planned during the long weekend',
    status: LeaveStatus.PENDING,
    submittedDate: '2023-08-30T14:20:00.000Z',
    attachmentUrl: 'https://example.com/travel_itinerary.pdf',
    parentContact: '+1234567890'
  }
];

const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
const sectionOptions = ['A', 'B', 'C', 'D'];
const studentOptions = [
  { id: '101', name: 'Aarav Singh', class: 'Class 3', section: 'B' },
  { id: '102', name: 'Diya Patel', class: 'Class 3', section: 'B' },
  { id: '103', name: 'Rohan Kumar', class: 'Class 4', section: 'A' },
  { id: '104', name: 'Ananya Sharma', class: 'Class 4', section: 'A' },
  { id: '105', name: 'Vihaan Mehta', class: 'Class 5', section: 'C' },
];

const mockLeaveApplications: LeaveApplication[] = [
  {
    id: 'LA001',
    studentName: 'Aarav Singh',
    studentId: '101',
    class: 'Class 3',
    section: 'B',
    startDate: '2023-09-15',
    endDate: '2023-09-18',
    reason: 'Family function',
    status: 'pending',
    appliedOn: '2023-09-10',
  },
  {
    id: 'LA002',
    studentName: 'Diya Patel',
    studentId: '102',
    class: 'Class 3',
    section: 'B',
    startDate: '2023-09-20',
    endDate: '2023-09-22',
    reason: 'Medical appointment',
    status: 'approved',
    appliedOn: '2023-09-12',
    reviewedBy: 'Mrs. Sharma',
    reviewedOn: '2023-09-13',
  },
  {
    id: 'LA003',
    studentName: 'Rohan Kumar',
    studentId: '103',
    class: 'Class 4',
    section: 'A',
    startDate: '2023-09-05',
    endDate: '2023-09-10',
    reason: 'Viral fever',
    status: 'rejected',
    appliedOn: '2023-09-03',
    reviewedBy: 'Mr. Patel',
    reviewedOn: '2023-09-04',
  }
];

// Main Component
const LeaveManagement: React.FC<LeaveManagementProps> = ({
  className = '',
  isTeacher,
  studentId,
  role = 'teacher'
}) => {
  // Auth context
  const { user } = useAuth();
  const teacherRole = isTeacher !== undefined ? isTeacher : user?.role === UserRole.TEACHER;
  const currentStudentId = studentId || (user?.role === UserRole.STUDENT ? user.id : undefined);
  
  // State
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>(teacherRole ? 'pending' : 'all');
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  
  // New leave request form state
  const [newRequest, setNewRequest] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    type: LeaveType.SICK,
    reason: '',
    attachmentUrl: '',
    parentContact: ''
  });
  
  // For new application form
  const [startDate, setStartDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string>(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [isShowingForm, setIsShowingForm] = useState<boolean>(false);
  const [reason, setReason] = useState<string>(''); // Added missing state
  const [filterClass, setFilterClass] = useState<string>(''); // Added missing state
  const [filterSection, setFilterSection] = useState<string>(''); // Added missing state

  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>(mockLeaveApplications);

  // Get the leave requests relevant to the current user role and filter by tab
  const filteredLeaveRequests = leaveRequests
    .filter(request => {
      // If student, only show their own requests
      if (currentStudentId && request.studentId !== currentStudentId) {
        return false;
      }
      
      // Filter by tab/status
      if (activeTab !== 'all' && request.status.toLowerCase() !== activeTab) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery && !request.studentName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());

  const filteredApplications = leaveApplications.filter(app => {
    if (activeTab !== 'all' && app.status !== activeTab) return false;
    if (filterClass && app.class !== filterClass) return false;
    if (filterSection && app.section !== filterSection) return false;
    return true;
  });
  
  // Submit new leave request
  const handleSubmitLeaveRequest = () => {
    // Validate form
    if (!newRequest.reason.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please provide a reason for your leave request.',
      });
      return;
    }
    
    // Create new leave request
    const newLeaveRequest: LeaveRequest = {
      id: `leave-${Date.now()}`,
      studentId: currentStudentId || 'student-1',
      studentName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Demo Student',
      class: user?.className || '10-A',
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      type: newRequest.type,
      reason: newRequest.reason,
      status: LeaveStatus.PENDING,
      submittedDate: new Date().toISOString(),
      attachmentUrl: newRequest.attachmentUrl,
      parentContact: newRequest.parentContact
    };
    
    // Add to state
    setLeaveRequests([newLeaveRequest, ...leaveRequests]);
    
    // Reset form and close dialog
    setNewRequest({
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      type: LeaveType.SICK,
      reason: '',
      attachmentUrl: '',
      parentContact: ''
    });
    setShowNewRequestDialog(false);
    
    toast({
      title: 'Leave Request Submitted',
      description: 'Your leave request has been submitted for approval.',
    });
  };
  
  // Approve leave request
  const handleApproveLeaveRequest = (id: string) => {
    setLeaveRequests(prev => 
      prev.map(request => {
        if (request.id === id) {
          return {
            ...request,
            status: LeaveStatus.APPROVED,
            approvedBy: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Demo Teacher',
            approvalDate: new Date().toISOString()
          };
        }
        return request;
      })
    );
    
    setShowDetailsDialog(false);
    
    toast({
      title: 'Leave Approved',
      description: 'The leave request has been approved successfully.',
    });
  };
  
  // Reject leave request
  const handleRejectLeaveRequest = (id: string) => {
    if (!rejectionReason.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please provide a reason for rejecting this leave request.',
      });
      return;
    }
    
    setLeaveRequests(prev => 
      prev.map(request => {
        if (request.id === id) {
          return {
            ...request,
            status: LeaveStatus.REJECTED,
            approvedBy: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Demo Teacher',
            approvalDate: new Date().toISOString(),
            rejectionReason
          };
        }
        return request;
      })
    );
    
    setRejectionReason('');
    setShowDetailsDialog(false);
    
    toast({
      title: 'Leave Rejected',
      description: 'The leave request has been rejected with a reason.',
    });
  };
  
  // View request details
  const handleViewDetails = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setShowDetailsDialog(true);
  };
  
  // Format date range for display
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (startDate === endDate) {
      return start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };
  
  // Calculate number of days
  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };
  
  // Get human-readable leave type
  const getLeaveTypeLabel = (type: LeaveType) => {
    switch (type) {
      case LeaveType.SICK: return 'Sick Leave';
      case LeaveType.PERSONAL: return 'Personal Leave';
      case LeaveType.FAMILY: return 'Family Event';
      case LeaveType.VACATION: return 'Vacation';
      case LeaveType.OTHER: return 'Other';
      default: return 'Leave';
    }
  };
  
  // Get status badge color
  const getStatusBadgeVariant = (status: LeaveStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case LeaveStatus.PENDING: return 'secondary';
      case LeaveStatus.APPROVED: return 'default';
      case LeaveStatus.REJECTED: return 'destructive';
      case LeaveStatus.CANCELLED: return 'outline';
      default: return 'outline';
    }
  };

  const handleApproveLeave = (id: string) => {
    const updatedApplications = leaveApplications.map(app => 
      app.id === id 
        ? {
            ...app, 
            status: 'approved' as const, 
            reviewedBy: 'Current User', 
            reviewedOn: format(new Date(), 'yyyy-MM-dd')
          } 
        : app
    );
    setLeaveApplications(updatedApplications);
    toast({
      title: "Leave Approved",
      description: "The leave application has been approved successfully."
    });
  };

  const handleRejectLeave = (id: string) => {
    const updatedApplications = leaveApplications.map(app => 
      app.id === id 
        ? {
            ...app, 
            status: 'rejected' as const, 
            reviewedBy: 'Current User', 
            reviewedOn: format(new Date(), 'yyyy-MM-dd')
          } 
        : app
    );
    setLeaveApplications(updatedApplications);
    toast({
      title: "Leave Rejected",
      description: "The leave application has been rejected."
    });
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || !startDate || !endDate || !reason) {
      toast({
        title: "Missing Information",
        description: "Please fill all the required fields.",
        variant: "destructive"
      });
      return;
    }

    const student = studentOptions.find(s => s.id === selectedStudent);
    if (!student) return;

    const newApplication: LeaveApplication = {
      id: `LA${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      studentName: student.name,
      studentId: student.id,
      class: student.class,
      section: student.section,
      startDate,
      endDate,
      reason,
      status: 'pending',
      appliedOn: format(new Date(), 'yyyy-MM-dd'),
    };

    setLeaveApplications([newApplication, ...leaveApplications]);
    setIsShowingForm(false);
    setReason('');
    setStartDate(format(new Date(), 'yyyy-MM-dd'));
    setEndDate(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
    setSelectedStudent('');

    toast({
      title: "Leave Application Submitted",
      description: "Your leave application has been submitted successfully."
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    }
  };

  const getLeaveDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = differenceInDays(endDate, startDate) + 1;
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Leave Management
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {teacherRole 
                ? "Review and manage student leave requests" 
                : "Submit and track your leave requests"}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {!teacherRole && (
              <Button onClick={() => setShowNewRequestDialog(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Leave Request
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b">
        <div className="flex-grow">
          <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
            <TabsList className="grid grid-cols-4">
              {teacherRole && (
                <TabsTrigger value="pending" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Pending</span>
                </TabsTrigger>
              )}
              <TabsTrigger value="approved" className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                <span>Approved</span>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                <span>Rejected</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {teacherRole && (
          <div className="relative w-full sm:w-auto">
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
      
      {/* Leave requests list */}
      <div className="flex-1 overflow-auto p-4">
        {filteredLeaveRequests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <h3 className="text-lg font-medium mb-1">No leave requests found</h3>
            <p className="text-sm">
              {teacherRole 
                ? "There are no leave requests matching your filters" 
                : "You haven't submitted any leave requests yet"}
            </p>
            
            {!teacherRole && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setShowNewRequestDialog(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit a Leave Request
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeaveRequests.map((request) => (
              <Card key={request.id} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => handleViewDetails(request)}>
                <CardContent className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="flex items-center gap-2 mb-2 sm:mb-0">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{request.studentName}</span>
                        {teacherRole && request.class && (
                          <Badge variant="outline" className="ml-2">{request.class}</Badge>
                        )}
                      </div>
                      <Badge variant={getStatusBadgeVariant(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm mb-1">
                      <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span>{formatDateRange(request.startDate, request.endDate)}</span>
                        <span className="hidden sm:inline text-gray-400 mx-1">•</span>
                        <span className="text-gray-500">{calculateDays(request.startDate, request.endDate)} day(s)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Submitted on {new Date(request.submittedDate).toLocaleDateString()}</span>
                    </div>
                    
                    <Badge variant="outline">{getLeaveTypeLabel(request.type)}</Badge>
                    
                    <p className="mt-2 text-sm line-clamp-2">{request.reason}</p>
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
      
      {/* New Leave Request Dialog */}
      <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Submit Leave Request</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit a new leave request.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={newRequest.startDate}
                  onChange={(e) => setNewRequest({...newRequest, startDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={newRequest.endDate}
                  onChange={(e) => setNewRequest({...newRequest, endDate: e.target.value})}
                  min={newRequest.startDate}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leave-type">Leave Type</Label>
              <Select 
                value={newRequest.type} 
                onValueChange={(value: LeaveType) => setNewRequest({...newRequest, type: value})}
              >
                <SelectTrigger id="leave-type">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={LeaveType.SICK}>Sick Leave</SelectItem>
                  <SelectItem value={LeaveType.PERSONAL}>Personal Leave</SelectItem>
                  <SelectItem value={LeaveType.FAMILY}>Family Event</SelectItem>
                  <SelectItem value={LeaveType.VACATION}>Vacation</SelectItem>
                  <SelectItem value={LeaveType.OTHER}>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea
                id="reason"
                placeholder="Please explain the reason for your leave request"
                value={newRequest.reason}
                onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parent-contact">Parent Contact Information</Label>
              <Input
                id="parent-contact"
                placeholder="Email or phone number"
                value={newRequest.parentContact}
                onChange={(e) => setNewRequest({...newRequest, parentContact: e.target.value})}
              />
              <p className="text-xs text-gray-500">This will be used for any follow-up communication</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment (Optional)</Label>
              <Input
                id="attachment"
                placeholder="URL to supporting document"
                value={newRequest.attachmentUrl}
                onChange={(e) => setNewRequest({...newRequest, attachmentUrl: e.target.value})}
              />
              <p className="text-xs text-gray-500">E.g., medical certificate, invitation, etc.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRequestDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitLeaveRequest}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Leave Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Leave Request Details</DialogTitle>
              <Badge variant={getStatusBadgeVariant(selectedRequest.status)} className="self-start mt-2">
                {selectedRequest.status}
              </Badge>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{selectedRequest.studentName}</h3>
                  {selectedRequest.class && (
                    <p className="text-sm text-gray-500">{selectedRequest.class}</p>
                  )}
                </div>
                
                <div className="text-right text-sm">
                  <p className="text-gray-500">Submitted on</p>
                  <p>{new Date(selectedRequest.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-sm font-medium">
                    {formatDateRange(selectedRequest.startDate, selectedRequest.endDate)}
                    <span className="text-gray-500 ml-2">({calculateDays(selectedRequest.startDate, selectedRequest.endDate)} days)</span>
                  </p>
                </div>
                
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-sm">{getLeaveTypeLabel(selectedRequest.type)}</p>
                </div>
                
                {selectedRequest.parentContact && (
                  <div className="flex items-center">
                    {selectedRequest.parentContact.includes('@') ? (
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    ) : (
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    )}
                    <p className="text-sm">{selectedRequest.parentContact}</p>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Reason for Leave</h4>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">{selectedRequest.reason}</p>
              </div>
              
              {selectedRequest.attachmentUrl && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Attachment</h4>
                  <a 
                    href={selectedRequest.attachmentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                  >
                    <FileCheck className="h-4 w-4 mr-1" />
                    View Attachment
                  </a>
                </div>
              )}
              
              {selectedRequest.status === LeaveStatus.APPROVED && selectedRequest.approvalDate && (
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-sm">
                  <p className="flex items-center text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approved
                  </p>
                  
                  <div className="mt-1 text-gray-600 dark:text-gray-300">
                    <p><span className="font-medium">By:</span> {selectedRequest.approvedBy}</p>
                    <p><span className="font-medium">On:</span> {new Date(selectedRequest.approvalDate).toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              {selectedRequest.status === LeaveStatus.REJECTED && selectedRequest.rejectionReason && (
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm">
                  <p className="flex items-center text-red-600 dark:text-red-400 font-medium">
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejected
                  </p>
                  
                  <div className="mt-1 text-gray-600 dark:text-gray-300">
                    {selectedRequest.approvedBy && (
                      <p><span className="font-medium">By:</span> {selectedRequest.approvedBy}</p>
                    )}
                    {selectedRequest.approvalDate && (
                      <p><span className="font-medium">On:</span> {new Date(selectedRequest.approvalDate).toLocaleString()}</p>
                    )}
                    <p className="mt-1"><span className="font-medium">Reason:</span> {selectedRequest.rejectionReason}</p>
                  </div>
                </div>
              )}
              
              {teacherRole && selectedRequest.status === LeaveStatus.PENDING && (
                <div>
                  {rejectionReason ? (
                    <div className="space-y-2">
                      <Label htmlFor="rejection-reason">Reason for Rejection</Label>
                      <Textarea
                        id="rejection-reason"
                        placeholder="Provide reason for rejecting this leave request"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows={2}
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {teacherRole && selectedRequest.status === LeaveStatus.PENDING ? (
                <>
                  {!rejectionReason ? (
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto"
                      onClick={() => setRejectionReason("Please provide a reason")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  ) : (
                    <Button 
                      variant="destructive" 
                      className="w-full sm:w-auto"
                      onClick={() => handleRejectLeaveRequest(selectedRequest.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Confirm Rejection
                    </Button>
                  )}
                  
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={() => handleApproveLeaveRequest(selectedRequest.id)}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => setShowDetailsDialog(false)}
                >
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LeaveManagement;
