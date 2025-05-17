
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  MoreHorizontal,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

// Mock data
const MOCK_STUDENTS = [
  { id: '1', name: 'John Doe', grade: '10A', studentId: 'S10001' },
  { id: '2', name: 'Jane Smith', grade: '10A', studentId: 'S10002' },
  { id: '3', name: 'Michael Johnson', grade: '10B', studentId: 'S10003' },
  { id: '4', name: 'Emily Williams', grade: '10B', studentId: 'S10004' },
  { id: '5', name: 'David Brown', grade: '11A', studentId: 'S11001' },
];

const MOCK_RECORDS = [
  {
    id: '1',
    studentId: '1',
    date: '2023-09-15',
    incidentType: 'Classroom Disruption',
    description: 'Repeatedly talking during silent reading time',
    actionTaken: 'Verbal warning',
    reporter: 'Ms. Johnson',
    severity: 'Low',
    status: 'Resolved',
  },
  {
    id: '2',
    studentId: '1',
    date: '2023-10-05',
    incidentType: 'Late Submission',
    description: 'Assignment submitted 3 days after deadline without valid reason',
    actionTaken: 'Deduction of marks',
    reporter: 'Mr. Williams',
    severity: 'Low',
    status: 'Resolved',
  },
  {
    id: '3',
    studentId: '2',
    date: '2023-10-10',
    incidentType: 'Unauthorized Absence',
    description: 'Skipped math class without permission',
    actionTaken: 'Detention',
    reporter: 'Ms. Adams',
    severity: 'Medium',
    status: 'Pending',
  },
  {
    id: '4',
    studentId: '3',
    date: '2023-10-08',
    incidentType: 'Academic Dishonesty',
    description: 'Caught using unauthorized notes during quiz',
    actionTaken: 'Zero grade for the quiz and parent notification',
    reporter: 'Mr. Thompson',
    severity: 'High',
    status: 'Under Review',
  },
];

const INCIDENT_TYPES = [
  'Classroom Disruption',
  'Late Submission',
  'Unauthorized Absence',
  'Academic Dishonesty',
  'Behavioral Issue',
  'Dress Code Violation',
  'Technology Misuse',
  'Property Damage',
  'Other',
];

const SEVERITY_LEVELS = [
  { value: 'Low', color: 'bg-blue-100 text-blue-800' },
  { value: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'High', color: 'bg-red-100 text-red-800' },
];

const STATUS_OPTIONS = [
  { value: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'Under Review', color: 'bg-purple-100 text-purple-800' },
  { value: 'Resolved', color: 'bg-green-100 text-green-800' },
  { value: 'Escalated', color: 'bg-red-100 text-red-800' },
];

const DisciplinaryRecords: React.FC = () => {
  const [records, setRecords] = useState(MOCK_RECORDS);
  const [students] = useState(MOCK_STUDENTS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');

  // New record form state
  const [formData, setFormData] = useState({
    studentId: '',
    date: '',
    incidentType: '',
    description: '',
    actionTaken: '',
    reporter: '',
    severity: '',
    status: 'Pending',
  });

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      studentId: '',
      date: '',
      incidentType: '',
      description: '',
      actionTaken: '',
      reporter: '',
      severity: '',
      status: 'Pending',
    });
  };

  // Submit new record
  const handleSubmitRecord = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.studentId || !formData.date || !formData.incidentType || 
        !formData.description || !formData.severity || !formData.status) {
      toast.error("Please fill all required fields");
      return;
    }

    const newRecord = {
      id: (records.length + 1).toString(),
      ...formData,
    };

    setRecords([...records, newRecord]);
    resetForm();
    setIsAddDialogOpen(false);
    toast.success("Disciplinary record added successfully");
  };

  // Handle update record
  const handleUpdateRecord = (e) => {
    e.preventDefault();
    
    // Update the record
    const updatedRecords = records.map(record => {
      if (record.id === selectedRecord.id) {
        return { ...formData, id: record.id };
      }
      return record;
    });

    setRecords(updatedRecords);
    setIsEditDialogOpen(false);
    toast.success("Disciplinary record updated successfully");
  };

  // Handle delete record
  const handleDeleteRecord = () => {
    const updatedRecords = records.filter(record => record.id !== selectedRecord.id);
    setRecords(updatedRecords);
    setIsDeleteDialogOpen(false);
    toast.success("Disciplinary record deleted successfully");
  };

  // Open view dialog
  const openViewDialog = (record) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  // Open edit dialog
  const openEditDialog = (record) => {
    setSelectedRecord(record);
    // Populate form data with the selected record
    setFormData({
      studentId: record.studentId,
      date: record.date,
      incidentType: record.incidentType,
      description: record.description,
      actionTaken: record.actionTaken || '',
      reporter: record.reporter,
      severity: record.severity,
      status: record.status,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (record) => {
    setSelectedRecord(record);
    setIsDeleteDialogOpen(true);
  };

  // Get student name by ID
  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  // Filter records based on search term, status, and severity
  const filteredRecords = records.filter(record => {
    const studentName = getStudentName(record.studentId).toLowerCase();
    const matchesSearch = searchTerm === '' ||
      studentName.includes(searchTerm.toLowerCase()) ||
      record.incidentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === '' || record.status === filterStatus;
    const matchesSeverity = filterSeverity === '' || record.severity === filterSeverity;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Disciplinary Records</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Record
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Records Management</CardTitle>
          <CardDescription>View and manage disciplinary records for students</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by student, incident type or description..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value)}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{filterStatus || "Filter by Status"}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {STATUS_OPTIONS.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterSeverity} onValueChange={(value) => setFilterSeverity(value)}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{filterSeverity || "Filter by Severity"}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Severities</SelectItem>
                  {SEVERITY_LEVELS.map(severity => (
                    <SelectItem key={severity.value} value={severity.value}>
                      {severity.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Records Table */}
          {filteredRecords.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Incident Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{getStudentName(record.studentId)}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.incidentType}</TableCell>
                      <TableCell>
                        <Badge className={
                          record.severity === 'Low' ? 'bg-blue-100 text-blue-800' : 
                          record.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }>
                          {record.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          record.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          record.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          record.status === 'Under Review' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openViewDialog(record)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(record)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit Record
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteDialog(record)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">No Records Found</h3>
              <p className="text-sm text-gray-500 max-w-sm mt-2">
                No disciplinary records match your search criteria. Try adjusting your filters or add a new record.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add New Record
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Record Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Disciplinary Record</DialogTitle>
            <DialogDescription>
              Create a new disciplinary record for a student.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitRecord}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student *</Label>
                <Select name="studentId" value={formData.studentId} onValueChange={(value) => handleSelectChange("studentId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.grade})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date of Incident *</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleFormChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentType">Incident Type *</Label>
                <Select name="incidentType" value={formData.incidentType} onValueChange={(value) => handleSelectChange("incidentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCIDENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reporter">Reported By *</Label>
                <Input 
                  id="reporter" 
                  name="reporter" 
                  value={formData.reporter} 
                  onChange={handleFormChange} 
                  placeholder="Name of the reporter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level *</Label>
                <Select name="severity" value={formData.severity} onValueChange={(value) => handleSelectChange("severity", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEVERITY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleFormChange} 
                  placeholder="Detailed description of the incident"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="actionTaken">Action Taken</Label>
                <Textarea 
                  id="actionTaken" 
                  name="actionTaken" 
                  value={formData.actionTaken} 
                  onChange={handleFormChange} 
                  placeholder="What actions have been taken to address this incident"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Record
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Record Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedRecord && (
            <>
              <DialogHeader>
                <DialogTitle>Disciplinary Record Details</DialogTitle>
                <DialogDescription>
                  Viewing details for {getStudentName(selectedRecord.studentId)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Student</h3>
                  <p className="text-base font-medium">{getStudentName(selectedRecord.studentId)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date of Incident</h3>
                  <p className="text-base">{selectedRecord.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Incident Type</h3>
                  <p className="text-base">{selectedRecord.incidentType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Reported By</h3>
                  <p className="text-base">{selectedRecord.reporter}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Severity</h3>
                  <Badge className={
                    selectedRecord.severity === 'Low' ? 'bg-blue-100 text-blue-800' : 
                    selectedRecord.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }>
                    {selectedRecord.severity}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                  <Badge className={
                    selectedRecord.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    selectedRecord.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    selectedRecord.status === 'Under Review' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {selectedRecord.status}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-base bg-gray-50 p-3 rounded-md">{selectedRecord.description}</p>
                </div>
                {selectedRecord.actionTaken && (
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Action Taken</h3>
                    <p className="text-base bg-gray-50 p-3 rounded-md">{selectedRecord.actionTaken}</p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  openEditDialog(selectedRecord);
                }}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Record
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Record Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Disciplinary Record</DialogTitle>
            <DialogDescription>
              Update disciplinary record for {selectedRecord && getStudentName(selectedRecord.studentId)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRecord && (
            <form onSubmit={handleUpdateRecord}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student *</Label>
                  <Select name="studentId" value={formData.studentId} onValueChange={(value) => handleSelectChange("studentId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.grade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date of Incident *</Label>
                  <Input 
                    id="date" 
                    name="date" 
                    type="date" 
                    value={formData.date} 
                    onChange={handleFormChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incidentType">Incident Type *</Label>
                  <Select name="incidentType" value={formData.incidentType} onValueChange={(value) => handleSelectChange("incidentType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      {INCIDENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reporter">Reported By *</Label>
                  <Input 
                    id="reporter" 
                    name="reporter" 
                    value={formData.reporter} 
                    onChange={handleFormChange} 
                    placeholder="Name of the reporter"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Level *</Label>
                  <Select name="severity" value={formData.severity} onValueChange={(value) => handleSelectChange("severity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEVERITY_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleFormChange} 
                    placeholder="Detailed description of the incident"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="actionTaken">Action Taken</Label>
                  <Textarea 
                    id="actionTaken" 
                    name="actionTaken" 
                    value={formData.actionTaken} 
                    onChange={handleFormChange} 
                    placeholder="What actions have been taken to address this incident"
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Update Record
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this disciplinary record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRecord && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-800">Warning: Permanent Deletion</h4>
                  <p className="text-sm text-red-700 mt-1">
                    You are about to delete the disciplinary record for <strong>{getStudentName(selectedRecord.studentId)}</strong> regarding <strong>{selectedRecord.incidentType}</strong> on <strong>{selectedRecord.date}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRecord}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisciplinaryRecords;
