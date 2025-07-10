
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  User, 
  Shield, 
  AlertTriangle,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Download,
  Star,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface FilterOptions {
  status: string;
  verified: string;
  riskLevel: string;
  minReputation: string;
  maxReputation: string;
  minGigs: string;
  maxGigs: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    verified: '',
    riskLevel: '',
    minReputation: '',
    maxReputation: '',
    minGigs: '',
    maxGigs: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const users = [
    {
      id: 1,
      walletAddress: '0x1234...5678',
      username: 'alice.eth',
      email: 'alice@example.com',
      joinDate: '2024-01-15',
      status: 'active',
      reputation: 4.8,
      gigsCompleted: 23,
      totalEarned: '$5,420',
      lastActive: '2 hours ago',
      isVerified: true,
      flags: 0
    },
    {
      id: 2,
      walletAddress: '0x9876...4321',
      username: 'bob.eth',
      email: 'bob@example.com',
      joinDate: '2024-02-20',
      status: 'flagged',
      reputation: 3.2,
      gigsCompleted: 8,
      totalEarned: '$1,200',
      lastActive: '1 day ago',
      isVerified: false,
      flags: 2
    },
    {
      id: 3,
      walletAddress: '0x4567...8901',
      username: 'charlie.eth',
      email: 'charlie@example.com',
      joinDate: '2024-03-10',
      status: 'suspended',
      reputation: 2.1,
      gigsCompleted: 3,
      totalEarned: '$450',
      lastActive: '1 week ago',
      isVerified: false,
      flags: 5
    }
  ];

  const exportUsers = () => {
    const filteredUsers = getFilteredUsers();
    
    // Create CSV content
    const headers = ['ID', 'Username', 'Email', 'Wallet Address', 'Status', 'Reputation', 'Gigs Completed', 'Total Earned', 'Verified', 'Flags', 'Join Date', 'Last Active'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.id,
        user.username,
        user.email,
        user.walletAddress,
        user.status,
        user.reputation,
        user.gigsCompleted,
        user.totalEarned,
        user.isVerified ? 'Yes' : 'No',
        user.flags,
        user.joinDate,
        user.lastActive
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `Exported ${filteredUsers.length} users to CSV file.`,
    });
  };

  const applyFilters = () => {
    setFilterOpen(false);
    toast({
      title: "Filters Applied",
      description: "User list has been filtered based on your criteria.",
    });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      verified: '',
      riskLevel: '',
      minReputation: '',
      maxReputation: '',
      minGigs: '',
      maxGigs: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const getRiskLevel = (flags: number) => {
    if (flags > 3) return 'high';
    if (flags > 0) return 'medium';
    return 'low';
  };

  const getFilteredUsers = () => {
    return users.filter(user => {
      // Search term filter
      if (searchTerm && !user.username.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !user.email.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status && user.status !== filters.status) return false;

      // Verified filter
      if (filters.verified) {
        const isVerified = filters.verified === 'true';
        if (user.isVerified !== isVerified) return false;
      }

      // Risk level filter
      if (filters.riskLevel && getRiskLevel(user.flags) !== filters.riskLevel) return false;

      // Reputation filters
      if (filters.minReputation && user.reputation < parseFloat(filters.minReputation)) return false;
      if (filters.maxReputation && user.reputation > parseFloat(filters.maxReputation)) return false;

      // Gigs filters
      if (filters.minGigs && user.gigsCompleted < parseInt(filters.minGigs)) return false;
      if (filters.maxGigs && user.gigsCompleted > parseInt(filters.maxGigs)) return false;

      return true;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'flagged':
        return <Badge className="bg-yellow-100 text-yellow-800">Flagged</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewHistory = (userId: number) => {
    navigate(`/admin/users/${userId}/history`);
  };

  const handleVerifyCredentials = (userId: number) => {
    navigate(`/admin/users/${userId}/verify-credentials`);
  };

  const handleSuspendUser = (userId: number) => {
    navigate(`/admin/users/${userId}/suspend`);
  };

  const UserProfileModal = ({ user }: { user: any }) => (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>User Profile: {user.username}</span>
        </DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div><strong>Wallet:</strong> {user.walletAddress}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Joined:</strong> {user.joinDate}</div>
              <div><strong>Status:</strong> {getStatusBadge(user.status)}</div>
              <div><strong>Verified:</strong> {user.isVerified ? '✅' : '❌'}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div><strong>Reputation:</strong> 
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{user.reputation}/5.0</span>
                </div>
              </div>
              <div><strong>Gigs Completed:</strong> {user.gigsCompleted}</div>
              <div><strong>Total Earned:</strong> {user.totalEarned}</div>
              <div><strong>Last Active:</strong> {user.lastActive}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security & Flags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div><strong>Flags:</strong> {user.flags}</div>
              <div><strong>Risk Level:</strong> 
                <Badge className={user.flags > 3 ? 'bg-red-100 text-red-800' : user.flags > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                  {user.flags > 3 ? 'High' : user.flags > 0 ? 'Medium' : 'Low'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewHistory(user.id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Full History
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleVerifyCredentials(user.id)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Verify Credentials
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleSuspendUser(user.id)}
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  );

  const filteredUsers = getFilteredUsers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportUsers}>
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Advanced Filters</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Verified Status</label>
                  <Select value={filters.verified} onValueChange={(value) => setFilters(prev => ({ ...prev, verified: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Verified</SelectItem>
                      <SelectItem value="false">Not Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Risk Level</label>
                  <Select value={filters.riskLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, riskLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">Min Reputation</label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      placeholder="0.0"
                      value={filters.minReputation}
                      onChange={(e) => setFilters(prev => ({ ...prev, minReputation: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Max Reputation</label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      placeholder="5.0"
                      value={filters.maxReputation}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxReputation: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">Min Gigs</label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={filters.minGigs}
                      onChange={(e) => setFilters(prev => ({ ...prev, minGigs: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Max Gigs</label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="100"
                      value={filters.maxGigs}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxGigs: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button onClick={applyFilters} className="flex-1">
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={() => setFilterOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search users by wallet address, username, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* User Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">12,547</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">11,892</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Flagged Users</p>
                <p className="text-2xl font-bold">234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold">421</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reputation</TableHead>
                <TableHead>Gigs Completed</TableHead>
                <TableHead>Total Earned</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{user.walletAddress}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{user.reputation}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.gigsCompleted}</TableCell>
                  <TableCell>{user.totalEarned}</TableCell>
                  <TableCell>
                    <Badge variant={user.flags > 0 ? "destructive" : "secondary"}>
                      {user.flags}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      {selectedUser && <UserProfileModal user={selectedUser} />}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
