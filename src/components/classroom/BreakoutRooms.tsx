import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Plus, Trash2, UserPlus, LogIn, ArrowRight, EyeIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from '@/components/ui/use-toast';

// Types
interface Student {
  id: string;
  name: string;
  avatar?: string;
}

interface BreakoutRoom {
  id: string;
  name: string;
  students: Student[];
  isActive: boolean;
}

interface BreakoutRoomsProps {
  students: Student[];
  onJoinRoom?: (roomId: string) => void;
  onMonitorRoom?: (roomId: string) => void;
  onEndAllRooms?: () => void;
  className?: string;
  isHost?: boolean;
}

const BreakoutRooms: React.FC<BreakoutRoomsProps> = ({
  students,
  onJoinRoom,
  onMonitorRoom,
  onEndAllRooms,
  className = '',
  isHost
}) => {
  // Auth context
  const { user } = useAuth();
  const isTeacher = isHost !== undefined ? isHost : user?.role === UserRole.TEACHER;
  
  // State
  const [rooms, setRooms] = useState<BreakoutRoom[]>([]);
  const [unassignedStudents, setUnassignedStudents] = useState<Student[]>(students);
  const [newRoomName, setNewRoomName] = useState('');
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  
  // Initialize with unassigned students when students prop changes
  useEffect(() => {
    setUnassignedStudents(students);
  }, [students]);
  
  // Create a new breakout room
  const createRoom = () => {
    if (!newRoomName.trim()) return;
    
    const newRoom: BreakoutRoom = {
      id: `room-${Date.now()}`,
      name: newRoomName,
      students: [],
      isActive: false
    };
    
    setRooms([...rooms, newRoom]);
    setNewRoomName('');
  };
  
  // Delete a breakout room
  const deleteRoom = (roomId: string) => {
    const roomToDelete = rooms.find(room => room.id === roomId);
    
    if (roomToDelete) {
      // Move students back to unassigned
      setUnassignedStudents([...unassignedStudents, ...roomToDelete.students]);
      
      // Remove the room
      setRooms(rooms.filter(room => room.id !== roomId));
    }
  };
  
  // Start all breakout rooms
  const startAllRooms = () => {
    if (rooms.length === 0) {
      toast({
        title: 'No Rooms Created',
        description: 'Please create at least one breakout room first.',
        variant: 'destructive',
      });
      return;
    }
    
    setRooms(rooms.map(room => ({ ...room, isActive: true })));
    
    toast({
      title: 'Breakout Sessions Started',
      description: `${rooms.length} breakout rooms are now active`,
    });
  };
  
  // End all breakout rooms
  const endAllRooms = () => {
    if (rooms.length === 0) return;
    
    // Move all students back to unassigned
    const allStudents = rooms.flatMap(room => room.students);
    setUnassignedStudents([...unassignedStudents, ...allStudents]);
    
    // Reset rooms
    setRooms([]);
    setActiveRoomId(null);
    
    // Call the prop callback
    onEndAllRooms?.();
    
    toast({
      title: 'Breakout Sessions Ended',
      description: 'All students have been returned to the main session',
    });
  };
  
  // Join a breakout room
  const joinRoom = (roomId: string) => {
    // Check if room exists and is active
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
      toast({
        title: 'Room Not Found',
        description: 'The selected breakout room does not exist',
        variant: 'destructive',
      });
      return;
    }
    
    if (!room.isActive) {
      toast({
        title: 'Room Not Active',
        description: 'This breakout room has not been started yet',
        variant: 'destructive',
      });
      return;
    }
    
    setActiveRoomId(roomId);
    onJoinRoom?.(roomId);
    
    toast({
      title: 'Joined Breakout Room',
      description: `You are now in ${room.name}`,
    });
  };
  
  // Monitor a breakout room (for teachers)
  const monitorRoom = (roomId: string) => {
    // Check if room exists and is active
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    if (!room.isActive) {
      toast({
        title: 'Room Not Active',
        description: 'This breakout room has not been started yet',
        variant: 'destructive',
      });
      return;
    }
    
    onMonitorRoom?.(roomId);
    
    toast({
      title: 'Monitoring Breakout Room',
      description: `You are now monitoring ${room.name}`,
    });
  };
  
  // Auto-assign students evenly to rooms
  const autoAssignStudents = () => {
    if (rooms.length === 0) return;
    
    // Make a copy of unassigned students to work with
    const studentsCopy = [...unassignedStudents];
    const roomsCopy = [...rooms];
    
    // Calculate how many students per room
    const studentsPerRoom = Math.ceil(studentsCopy.length / rooms.length);
    
    // Distribute students
    roomsCopy.forEach((room, index) => {
      const start = index * studentsPerRoom;
      const end = Math.min(start + studentsPerRoom, studentsCopy.length);
      const assignedStudents = studentsCopy.slice(start, end);
      
      room.students = [...room.students, ...assignedStudents];
    });
    
    // Update state
    setRooms(roomsCopy);
    setUnassignedStudents([]);
  };
  
  // Handle drag and drop
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    
    // Dropped outside any droppable area
    if (!destination) return;
    
    // Handle moving between lists
    if (source.droppableId !== destination.droppableId) {
      // Get the student being moved
      let student: Student | undefined;
      
      // Moving from unassigned to a room
      if (source.droppableId === 'unassigned') {
        const studentsCopy = [...unassignedStudents];
        [student] = studentsCopy.splice(source.index, 1);
        setUnassignedStudents(studentsCopy);
        
        // Add to the destination room
        if (student) {
          const roomsCopy = [...rooms];
          const roomIndex = roomsCopy.findIndex(r => r.id === destination.droppableId);
          
          if (roomIndex !== -1) {
            roomsCopy[roomIndex].students.splice(destination.index, 0, student);
            setRooms(roomsCopy);
          }
        }
      } 
      // Moving from a room to unassigned
      else if (destination.droppableId === 'unassigned') {
        const roomsCopy = [...rooms];
        const roomIndex = roomsCopy.findIndex(r => r.id === source.droppableId);
        
        if (roomIndex !== -1) {
          [student] = roomsCopy[roomIndex].students.splice(source.index, 1);
          setRooms(roomsCopy);
          
          // Add to unassigned
          if (student) {
            const studentsCopy = [...unassignedStudents];
            studentsCopy.splice(destination.index, 0, student);
            setUnassignedStudents(studentsCopy);
          }
        }
      } 
      // Moving from one room to another
      else {
        const roomsCopy = [...rooms];
        const sourceRoomIndex = roomsCopy.findIndex(r => r.id === source.droppableId);
        const destRoomIndex = roomsCopy.findIndex(r => r.id === destination.droppableId);
        
        if (sourceRoomIndex !== -1 && destRoomIndex !== -1) {
          [student] = roomsCopy[sourceRoomIndex].students.splice(source.index, 1);
          if (student) {
            roomsCopy[destRoomIndex].students.splice(destination.index, 0, student);
          }
          
          setRooms(roomsCopy);
        }
      }
    } 
    // Reordering within the same list
    else {
      // Reordering in unassigned list
      if (source.droppableId === 'unassigned') {
        const studentsCopy = [...unassignedStudents];
        const [removed] = studentsCopy.splice(source.index, 1);
        studentsCopy.splice(destination.index, 0, removed);
        
        setUnassignedStudents(studentsCopy);
      } 
      // Reordering in a room
      else {
        const roomsCopy = [...rooms];
        const roomIndex = roomsCopy.findIndex(r => r.id === source.droppableId);
        
        if (roomIndex !== -1) {
          const [removed] = roomsCopy[roomIndex].students.splice(source.index, 1);
          roomsCopy[roomIndex].students.splice(destination.index, 0, removed);
          
          setRooms(roomsCopy);
        }
      }
    }
  };
  
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header controls */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-medium">Breakout Rooms</h2>
            <p className="text-sm text-muted-foreground">
              {isTeacher ? 
                "Create and manage breakout rooms for group discussions" : 
                "Join a breakout room for group discussions"}
            </p>
          </div>
          
          {isTeacher && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={startAllRooms}
                disabled={rooms.length === 0 || rooms.every(r => r.isActive)}
              >
                Start All Rooms
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={endAllRooms}
                disabled={rooms.length === 0}
              >
                End All Rooms
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={autoAssignStudents}
                disabled={rooms.length === 0 || unassignedStudents.length === 0}
              >
                Auto-Assign Students
              </Button>
            </div>
          )}
        </div>
        
        {/* Room creation (teacher only) */}
        {isTeacher && (
          <div className="flex mt-4 gap-2">
            <Input
              placeholder="New room name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="max-w-xs"
            />
            <Button
              variant="outline"
              onClick={createRoom}
              disabled={!newRoomName.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Room
            </Button>
          </div>
        )}
      </div>
      
      {/* Breakout rooms drag and drop area */}
      <div className="flex-1 overflow-auto p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Unassigned students */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Unassigned Students ({unassignedStudents.length})
                </h3>
              </div>
              
              <Droppable droppableId="unassigned">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] space-y-2"
                  >
                    {unassignedStudents.map((student, index) => (
                      <Draggable
                        key={student.id}
                        draggableId={student.id}
                        index={index}
                        isDragDisabled={!isTeacher}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border rounded px-3 py-2 bg-white dark:bg-gray-800 flex justify-between items-center"
                          >
                            <span>{student.name}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    {unassignedStudents.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No unassigned students
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
            
            {/* Breakout rooms */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <h3 className="font-medium mb-3">Breakout Rooms ({rooms.length})</h3>
              
              {rooms.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {isTeacher ? 
                    "Create breakout rooms to organize students into groups" : 
                    "No breakout rooms available yet"}
                </div>
              ) : (
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <div key={room.id} className="border rounded-md bg-white dark:bg-gray-800 overflow-hidden">
                      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 flex justify-between items-center">
                        <h4 className="font-medium">{room.name} ({room.students.length})</h4>
                        
                        <div className="flex gap-1">
                          {isTeacher ? (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => monitorRoom(room.id)}
                                disabled={!room.isActive}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteRoom(room.id)}
                                disabled={room.isActive}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => joinRoom(room.id)}
                              disabled={!room.isActive || activeRoomId === room.id}
                            >
                              {activeRoomId === room.id ? (
                                <span className="flex items-center">
                                  <ArrowRight className="h-4 w-4 mr-1" />
                                  Current Room
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <LogIn className="h-4 w-4 mr-1" />
                                  Join
                                </span>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <Droppable droppableId={room.id}>
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="p-3 min-h-[100px] space-y-2"
                          >
                            {room.students.map((student, index) => (
                              <Draggable
                                key={student.id}
                                draggableId={student.id}
                                index={index}
                                isDragDisabled={!isTeacher || room.isActive}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 flex justify-between items-center"
                                  >
                                    <span>{student.name}</span>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            
                            {room.students.length === 0 && (
                              <div className="text-center py-4 text-muted-foreground text-sm">
                                Drag students here
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default BreakoutRooms; 