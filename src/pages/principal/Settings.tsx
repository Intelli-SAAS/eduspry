
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const SettingsPage: React.FC = () => {
  const { tenant } = useAuth();
  const [schoolName, setSchoolName] = useState(tenant?.name || '');
  const [domain, setDomain] = useState(tenant?.domain || '');

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">School Settings</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Institution Details</CardTitle>
              <CardDescription>Update your school information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input 
                    id="schoolName" 
                    value={schoolName} 
                    onChange={e => setSchoolName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input 
                    id="domain" 
                    value={domain} 
                    onChange={e => setDomain(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="School Address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Contact Number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" placeholder="admin@school.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://school.edu" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Academic Settings</CardTitle>
              <CardDescription>Configure academic year and grading system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Current Academic Year</Label>
                  <Input id="academicYear" placeholder="2024-2025" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Current Semester/Term</Label>
                  <select 
                    id="semester" 
                    className="w-full border border-input bg-background px-3 py-2 rounded-md"
                  >
                    <option value="fall">Fall Semester</option>
                    <option value="spring">Spring Semester</option>
                    <option value="summer">Summer Term</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradingSystem">Grading System</Label>
                  <select 
                    id="gradingSystem" 
                    className="w-full border border-input bg-background px-3 py-2 rounded-md"
                  >
                    <option value="percentage">Percentage (0-100%)</option>
                    <option value="letter">Letter Grade (A-F)</option>
                    <option value="gpa">GPA (0.0-4.0)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passingScore">Minimum Passing Score</Label>
                  <Input id="passingScore" placeholder="e.g., 40%" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the look and feel of your school portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input id="primaryColor" defaultValue="#9b87f5" className="flex-1" />
                    <input 
                      type="color" 
                      defaultValue="#9b87f5" 
                      className="h-10 w-10 rounded border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input id="secondaryColor" defaultValue="#f97316" className="flex-1" />
                    <input 
                      type="color" 
                      defaultValue="#f97316" 
                      className="h-10 w-10 rounded border"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded border flex items-center justify-center">
                    {tenant?.logo ? (
                      <img src={tenant.logo} alt="School logo" className="max-h-14 max-w-14" />
                    ) : (
                      <span className="text-muted-foreground">No logo</span>
                    )}
                  </div>
                  <Button variant="outline">Upload Logo</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Management</CardTitle>
              <CardDescription>Enable or disable platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Analytics Dashboard</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable advanced analytics for performance tracking
                    </p>
                  </div>
                  <Switch defaultChecked id="analytics" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">File Uploads</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow teachers to upload files for tests and assignments
                    </p>
                  </div>
                  <Switch defaultChecked id="fileUploads" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Question Bank</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable shared question bank across teachers
                    </p>
                  </div>
                  <Switch defaultChecked id="questionBank" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Anti-Cheating Features</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable AI-powered proctoring and test monitoring
                    </p>
                  </div>
                  <Switch id="antiCheating" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Student Registration</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow students to self-register on the platform
                    </p>
                  </div>
                  <Switch id="studentRegistration" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies for your institution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for administrative accounts
                    </p>
                  </div>
                  <Switch id="twoFactorAuth" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Password Policy</h4>
                    <p className="text-sm text-muted-foreground">
                      Enforce strong password requirements
                    </p>
                  </div>
                  <Switch defaultChecked id="passwordPolicy" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" className="w-32" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">IP Restrictions</h4>
                    <p className="text-sm text-muted-foreground">
                      Limit access to specific IP addresses
                    </p>
                  </div>
                  <Switch id="ipRestrictions" />
                </div>
                
                <div className="space-y-2 pt-2">
                  <Button variant="destructive">Reset All Security Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
