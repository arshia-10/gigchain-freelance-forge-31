
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  Home,
  Settings,
  Eye,
  BarChart3,
  Gavel,
  Lock,
  FileText,
  ChartLine
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import UserManagement from '@/components/admin/UserManagement';
import GigManagement from '@/components/admin/GigManagement';
import PaymentMonitoring from '@/components/admin/PaymentMonitoring';
import PlatformAnalytics from '@/components/admin/PlatformAnalytics';
import SecurityReports from '@/components/admin/SecurityReports';
import PlatformSettings from '@/components/admin/PlatformSettings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '12,547', icon: Users, color: 'bg-blue-500', change: '+5.2%' },
    { label: 'Active Gigs', value: '2,341', icon: Briefcase, color: 'bg-green-500', change: '+12.1%' },
    { label: 'Total Volume', value: '$1.2M', icon: DollarSign, color: 'bg-purple-500', change: '+8.3%' },
    { label: 'Security Reports', value: '23', icon: AlertTriangle, color: 'bg-red-500', change: '-2.1%' },
  ];

  const quickActions = [
    { title: 'User Management', icon: Users, description: 'Manage user accounts and permissions', tab: 'users' },
    { title: 'Gig Oversight', icon: Briefcase, description: 'Review and moderate gigs', tab: 'gigs' },
    { title: 'Payment Monitoring', icon: DollarSign, description: 'Track payments and escrow', tab: 'payments' },
    { title: 'Analytics', icon: BarChart3, description: 'View platform analytics', tab: 'analytics' },
    { title: 'Security & Reports', icon: Shield, description: 'Handle security issues', tab: 'security' },
    { title: 'Platform Settings', icon: Settings, description: 'Configure platform settings', tab: 'settings' },
  ];

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
                  GigChain Admin
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Main App
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Comprehensive platform management and monitoring</p>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Eye className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
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
                        <TrendingUp className={`w-4 h-4 mr-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
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

          {/* Admin Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="gigs">Gigs</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <Card 
                    key={index} 
                    className="bg-card border border-border shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setActiveTab(action.tab)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="gigs">
              <GigManagement />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentMonitoring />
            </TabsContent>

            <TabsContent value="analytics">
              <PlatformAnalytics />
            </TabsContent>

            <TabsContent value="security">
              <SecurityReports />
            </TabsContent>
          </Tabs>

          {/* Platform Settings Modal/Tab */}
          <PlatformSettings />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
