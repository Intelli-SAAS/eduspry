import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Camera,
  ChevronDown,
  UserCheck,
  UsersIcon,
  QrCode,
  Download,
  Calendar,
  Fingerprint
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import ManualAttendance from './ManualAttendance';
import BiometricAttendance from './BiometricAttendance';
import QRCodeAttendance from './QRCodeAttendance';
import FacialRecognitionAttendance from './FacialRecognitionAttendance';

interface AttendanceTrackerProps {
  className?: string;
  isTeacher?: boolean;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  className = '',
  isTeacher
}) => {
  // Auth context
  const { user } = useAuth();
  const teacherRole = isTeacher !== undefined ? isTeacher : user?.role === UserRole.TEACHER;
  
  // State
  const [attendanceMethod, setAttendanceMethod] = useState<'manual' | 'biometric' | 'qr' | 'facial'>('manual');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const exportAttendance = () => {
    // TODO: Implement attendance export
  };

  return (
    <div className={className}>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Attendance Tracker</CardTitle>
              <CardDescription>Track and manage student attendance</CardDescription>
            </div>
            
            {teacherRole && (
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40"
                  />
                </div>
                
                <div className="relative">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {attendanceMethod === 'facial' ? 
                      <Camera className="h-4 w-4" /> :
                      attendanceMethod === 'qr' ?
                      <QrCode className="h-4 w-4" /> :
                      attendanceMethod === 'biometric' ?
                      <Fingerprint className="h-4 w-4" /> :
                      <UsersIcon className="h-4 w-4" />
                    }
                    <span>
                      {attendanceMethod === 'facial' ? 'Facial Recognition' : 
                       attendanceMethod === 'qr' ? 'QR Code' : 
                       attendanceMethod === 'biometric' ? 'Biometric' :
                       'Manual'}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  
                  <div className="absolute z-10 mt-1 right-0 bg-white dark:bg-gray-800 rounded-md shadow-lg border w-48">
                    <div className="py-1">
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        onClick={() => setAttendanceMethod('facial')}
                      >
                        <Camera className="h-4 w-4" />
                        Facial Recognition
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        onClick={() => setAttendanceMethod('qr')}
                      >
                        <QrCode className="h-4 w-4" />
                        QR Code
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        onClick={() => setAttendanceMethod('biometric')}
                      >
                        <Fingerprint className="h-4 w-4" />
                        Biometric
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        onClick={() => setAttendanceMethod('manual')}
                      >
                        <UsersIcon className="h-4 w-4" />
                        Manual
                      </button>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={exportAttendance}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {attendanceMethod === 'manual' && (
            <ManualAttendance />
          )}
          {attendanceMethod === 'biometric' && (
            <BiometricAttendance />
          )}
          {attendanceMethod === 'qr' && (
            <QRCodeAttendance />
          )}
          {attendanceMethod === 'facial' && (
            <FacialRecognitionAttendance />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceTracker; 