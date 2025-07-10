
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  User,
  Edit,
  Trash2,
  Ban,
  Flag,
  Search,
  Shield,
  FileText,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserControls = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const users = [
    {
      id: 1,
      username: 'alice.eth',
      walletAddress: '0x1234...5678',
      email: 'alice@example.com',
      role: 'freelancer',
      status: 'active',
      flags: 0,
      reputation: 4.8,
      joinDate: '2024-01-15',
      credentials: 5,
      profileDescription: 'Experienced React developer with 5+ years in web development',
      tags: ['React', 'TypeScript', 'Node.js']
    }
  ];

  const handleEditProfile = (userId: number) => {
    toast({
      title: "Profile Updated",
      description: "User profile has been successfully updated.",
    });
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "User Account Deleted",
      description: "The user account has been permanently deleted.",
      variant: "destructive",
    });
  };

  const handleBanUser = (userId: number) => {
    toast({
      title: "User Banned",
      description: "User has been banned from the platform.",
      variant: "destructive",
    });
  };

  const handleFlagReview = (userId: number) => {
    toast({
      title: "Flag Review Initiated",
      description: "User has been marked for manual review.",
    });
  };

  const UserEditModal = ({ user }: { user: any }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Edit User Profile: {user.username}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue={user.username} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={user.email} />
          </div>
        </div>
        
        <div>
          <Label htmlFor="role">Role</Label>
          <Select defaultValue={user.role}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="freelancer">Freelancer</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Profile Description</Label>
          <Textarea 
            id="description" 
            defaultValue={user.profileDescription}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="tags">Skill Tags (comma separated)</Label>
          <Input id="tags" defaultValue={user.tags.join(', ')} />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="verified" />
          <Label htmlFor="verified">Verified Status</Label>
        </div>

        <div className="flex space-x-2">
          <Button onClick={() => handleEditProfile(user.id)} className="flex-1">
            Save Changes
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🔧 User Management Controls</h2>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search users by wallet address or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* User Management Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>🧑‍💼 Edit User Profiles</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View and edit profile details, role tags, descriptions, and linked credentials.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="w-full" 
                  onClick={() => setSelectedUser(users[0])}
                >
                  Edit Selected User
                </Button>
              </DialogTrigger>
              {selectedUser && <UserEditModal user={selectedUser} />}
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trash2 className="w-5 h-5" />
              <span>❌ Delete User Account</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Remove user accounts (marks as inactive to preserve on-chain data).
            </p>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => handleDeleteUser(1)}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Ban className="w-5 h-5" />
              <span>🚫 Ban / Suspend User</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Temporarily restrict wallet address from posting/applying for gigs.
            </p>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => handleBanUser(1)}
            >
              Ban User
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Flag className="w-5 h-5" />
              <span>⚠️ Flagged User Review</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View users flagged by multiple participants and decide on actions.
            </p>
            <Button 
              className="w-full"
              onClick={() => handleFlagReview(1)}
            >
              Review Flagged Users
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>🔍 Search by Wallet/Name</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Look up any registered user for auditing or investigation.
            </p>
            <Button className="w-full">
              Advanced User Search
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>🧾 Credential Audit Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View full list of credentials uploaded by any user, including IPFS proofs.
            </p>
            <Button className="w-full">
              Audit Credentials
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserControls;
