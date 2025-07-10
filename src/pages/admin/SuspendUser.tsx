
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Ban, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const SuspendUserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [suspensionType, setSuspensionType] = useState('');
  const [duration, setDuration] = useState('');
  const [reason, setReason] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const { toast } = useToast();

  const userData = {
    id: userId,
    username: 'alice.eth',
    walletAddress: '0x1234...5678',
    email: 'alice@example.com',
    currentStatus: 'active',
    reputation: 4.8,
    gigsCompleted: 23,
    flags: 2
  };

  const suspensionHistory = [
    {
      id: 1,
      type: 'Warning',
      reason: 'Late delivery',
      date: '2024-01-10',
      duration: 'N/A',
      admin: 'admin.eth',
      status: 'resolved'
    },
    {
      id: 2,
      type: 'Temporary Suspension',
      reason: 'Inappropriate communication',
      date: '2023-12-15',
      duration: '7 days',
      admin: 'admin.eth',
      status: 'completed'
    }
  ];

  const handleSuspend = () => {
    if (!suspensionType || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "User Suspended",
      description: `${userData.username} has been suspended successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/admin/users">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to User Management
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="text-3xl font-bold">Suspend User</h1>
              <p className="text-muted-foreground">User: {userData.username} ({userData.walletAddress})</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Ban className="w-5 h-5" />
                    <span>Suspension Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="suspensionType">Suspension Type *</Label>
                    <Select value={suspensionType} onValueChange={setSuspensionType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select suspension type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="temporary">Temporary Suspension</SelectItem>
                        <SelectItem value="permanent">Permanent Ban</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {suspensionType === 'temporary' && (
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1d">1 Day</SelectItem>
                          <SelectItem value="3d">3 Days</SelectItem>
                          <SelectItem value="7d">7 Days</SelectItem>
                          <SelectItem value="14d">14 Days</SelectItem>
                          <SelectItem value="30d">30 Days</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason *</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spam">Spam/Scam Activity</SelectItem>
                        <SelectItem value="inappropriate">Inappropriate Behavior</SelectItem>
                        <SelectItem value="fraud">Fraudulent Activity</SelectItem>
                        <SelectItem value="violation">Terms of Service Violation</SelectItem>
                        <SelectItem value="quality">Poor Work Quality</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Provide additional context or details..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleSuspend} className="bg-red-600 hover:bg-red-700">
                      <Ban className="w-4 h-4 mr-2" />
                      Apply Suspension
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Save as Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Current Status:</strong> {getStatusBadge(userData.currentStatus)}</div>
                  <div><strong>Reputation:</strong> {userData.reputation}/5.0</div>
                  <div><strong>Gigs Completed:</strong> {userData.gigsCompleted}</div>
                  <div><strong>Current Flags:</strong> {userData.flags}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Suspension History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suspensionHistory.map((suspension) => (
                      <div key={suspension.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{suspension.type}</p>
                            <p className="text-sm text-muted-foreground">{suspension.reason}</p>
                          </div>
                          <Badge variant={suspension.status === 'resolved' ? 'default' : 'secondary'}>
                            {suspension.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Date: {suspension.date}</p>
                          <p>Duration: {suspension.duration}</p>
                          <p>Admin: {suspension.admin}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspendUserPage;
