import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar'; // Custom
import Footer from '@/components/layout/Footer'; // Custom

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft, CheckCircle, Edit3, KeyRound, Bell } from 'lucide-react';

const ProfileSettingsPage = () => {
  const navigate = useNavigate();
  console.log('ProfileSettingsPage loaded');

  // Personal Info State
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');
  const [personalInfoMessage, setPersonalInfoMessage] = useState('');

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // Notifications State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating personal info:', { name, email, phone, address });
    setPersonalInfoMessage('Personal information updated successfully!');
    setTimeout(() => setPersonalInfoMessage(''), 3000);
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage('');
    if (newPassword !== confirmPassword) {
      setPasswordMessage('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMessage('New password must be at least 8 characters long.');
      return;
    }
    console.log('Changing password...');
    // Simulate API call
    setPasswordMessage('Password changed successfully!');
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    setTimeout(() => setPasswordMessage(''), 3000);
  };
  
  const handleNotificationSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating notification settings:', { emailNotifications, smsNotifications });
    setNotificationMessage('Notification preferences updated successfully!');
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
         <header className="bg-white shadow-sm border-b border-gray-200 p-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <Breadcrumb>
                <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Profile & Settings</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Tabs defaultValue="personal-info" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="personal-info"><Edit3 className="mr-2 h-4 w-4 inline-block" />Personal Info</TabsTrigger>
              <TabsTrigger value="security"><KeyRound className="mr-2 h-4 w-4 inline-block" />Security</TabsTrigger>
              <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 inline-block" />Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="personal-info">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your contact details and address.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
                    {personalInfoMessage && (
                      <Alert className="bg-green-50 border-green-300 text-green-700">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{personalInfoMessage}</AlertDescription>
                      </Alert>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Change your password and manage account security.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChangeSubmit} className="space-y-6">
                    {passwordMessage && (
                      <Alert className={passwordMessage.includes('match') || passwordMessage.includes('least') ? "border-red-300 text-red-700" : "bg-green-50 border-green-300 text-green-700"}>
                        {passwordMessage.includes('Success') ? <CheckCircle className="h-4 w-4 text-green-600" /> : <KeyRound className="h-4 w-4" />}
                        <AlertTitle>{passwordMessage.includes('Success') ? 'Success' : 'Info'}</AlertTitle>
                        <AlertDescription>{passwordMessage}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <Button type="submit">Change Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive updates from us.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNotificationSettingsSubmit} className="space-y-6">
                    {notificationMessage && (
                        <Alert className="bg-green-50 border-green-300 text-green-700">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{notificationMessage}</AlertDescription>
                        </Alert>
                    )}
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive updates and alerts via email.</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <Label htmlFor="smsNotifications" className="font-medium">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive critical alerts via SMS.</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                     <Button type="submit">Save Preferences</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;