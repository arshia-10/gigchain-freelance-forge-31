
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  Home,
  Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const stats = [
    { label: 'Total Users', value: '12,547', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Gigs', value: '2,341', icon: Briefcase, color: 'bg-green-500' },
    { label: 'Total Revenue', value: '$1.2M', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Reports', value: '23', icon: AlertTriangle, color: 'bg-red-500' },
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'alice.eth', time: '5 minutes ago', type: 'user-registration' },
    { action: 'Gig completed', user: 'bob.eth', time: '12 minutes ago', type: 'gig-completed' },
    { action: 'Dispute raised', user: 'charlie.eth', time: '1 hour ago', type: 'dispute-raised' },
    { action: 'Payment processed', user: 'diana.eth', time: '2 hours ago', type: 'payment-processed' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="w-4 h-4 text-blue-500" />;
      case 'gig': return <Briefcase className="w-4 h-4 text-green-500" />;
      case 'dispute': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'payment': return <DollarSign className="w-4 h-4 text-purple-500" />;
      default: return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleManageUsers = () => {
    navigate('/admin/users');
  };

  const handleReviewGigs = () => {
    navigate('/admin/gigs');
  };

  const handleDisputes = () => {
    navigate('/admin/disputes');
  };

  const handleSecurity = () => {
    navigate('/admin/security');
  };

  const handleSettings = () => {
    navigate('/admin/settings');
  };

  const handleActivityClick = (type: string) => {
    navigate(`/admin/activity/${type}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="backdrop-blur-md bg-card/80 border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GigChain
                </span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <span className="text-muted-foreground">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button variant="outline" onClick={handleSettings}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage the GigChain platform</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card border border-border shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">+5.2%</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors"
                      onClick={() => handleActivityClick(activity.type)}
                    >
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleManageUsers}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleReviewGigs}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Review Gigs
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleDisputes}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Handle Disputes
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleSecurity}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Platform Security
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Platform Status */}
          <Card className="bg-card border border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Platform Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    Operational
                  </Badge>
                  <p className="font-medium text-foreground">Smart Contracts</p>
                  <p className="text-sm text-muted-foreground">All systems operational</p>
                </div>
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    Operational
                  </Badge>
                  <p className="font-medium text-foreground">Payment Processing</p>
                  <p className="text-sm text-muted-foreground">99.9% uptime</p>
                </div>
                <div className="text-center">
                  <Badge className="bg-yellow-100 text-yellow-800 mb-2">
                    Maintenance
                  </Badge>
                  <p className="font-medium text-foreground">File Storage</p>
                  <p className="text-sm text-muted-foreground">Scheduled maintenance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
