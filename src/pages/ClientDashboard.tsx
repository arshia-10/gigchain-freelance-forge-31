
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Plus, 
  Users, 
  Briefcase, 
  DollarSign, 
  Award,
  Home,
  Search,
  Bell,
  User,
  Calendar,
  Star,
  Shield,
  TrendingUp,
  MessageCircle,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Filter,
  Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import GigDetails from '../components/GigDetails';

const ClientDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [myGigs, setMyGigs] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [selectedGig, setSelectedGig] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    activeProjects: 0,
    totalSpent: 0,
    freelancersHired: 0,
    completedJobs: 0
  });
  
  // Load client data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const clientJobs = JSON.parse(localStorage.getItem('clientJobs') || '[]');
    const applications = JSON.parse(localStorage.getItem('gigApplications') || '[]');
    
    setMyGigs(clientJobs);
    setRecentApplications(applications.slice(0, 5));
    
    // Calculate stats
    const activeCount = clientJobs.filter((job: any) => job.status === 'active' || job.status === 'in_progress').length;
    const completedCount = clientJobs.filter((job: any) => job.status === 'completed').length;
    const totalSpent = clientJobs.reduce((sum: number, job: any) => 
      job.status === 'completed' ? sum + parseFloat(job.budget) : sum, 0
    );
    const uniqueWorkers = new Set(clientJobs.filter((job: any) => job.selectedWorker).map((job: any) => job.selectedWorker));
    
    setStats({
      activeProjects: activeCount,
      totalSpent: totalSpent,
      freelancersHired: uniqueWorkers.size,
      completedJobs: completedCount
    });
  };

  const handleUpdateGig = (gigId: number, updates: any) => {
    const updatedGigs = myGigs.map(gig => 
      gig.id === gigId ? { ...gig, ...updates } : gig
    );
    setMyGigs(updatedGigs);
    localStorage.setItem('clientJobs', JSON.stringify(updatedGigs));
    
    // Update selected gig if it's being viewed
    if (selectedGig && selectedGig.id === gigId) {
      setSelectedGig({ ...selectedGig, ...updates });
    }
    
    // Reload stats
    loadDashboardData();
  };

  const handleViewGig = (gig: any) => {
    setSelectedGig(gig);
  };

  const handleMessageWorker = (workerName: string) => {
    toast({
      title: "Opening Messages",
      description: `Starting conversation with ${workerName}...`,
    });
    navigate('/messages');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'post-gig':
        navigate('/post-job');
        break;
      case 'browse-workers':
        navigate('/find-talent');
        break;
      case 'payments':
        navigate('/payments');
        break;
      case 'credentials':
        navigate('/issue-credentials');
        break;
      default:
        toast({
          title: "Feature Coming Soon",
          description: `${action} functionality will be available soon.`,
        });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'disputed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/^\w/, c => c.toUpperCase());
  };

  const filteredGigs = filterStatus === 'all' 
    ? myGigs 
    : myGigs.filter(gig => gig.status === filterStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-white/20 sticky top-0 z-50">
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
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon" asChild>
                <Link to="/marketplace">
                  <Search className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link to="/messages">
                  <Bell className="w-4 h-4" />
                </Link>
              </Button>
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link to="/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your gigs and track progress</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
              <Link to="/post-job">
                <Plus className="w-4 h-4 mr-2" />
                Post New Gig
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeProjects}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+12.5%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalSpent.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+8.2%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Workers Hired</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.freelancersHired}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+15.3%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Completed Gigs</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedJobs}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+22.1%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Gigs & Recent Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">My Posted Gigs</CardTitle>
                  <div className="flex items-center space-x-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="h-8 px-2 py-1 border border-input bg-background rounded text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="disputed">Disputed</option>
                    </select>
                    <Button variant="outline" size="icon">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredGigs.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-300">
                        {filterStatus === 'all' ? 'No gigs posted yet' : `No ${filterStatus.replace('_', ' ')} gigs`}
                      </p>
                      {filterStatus === 'all' && (
                        <Button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                          <Link to="/post-job">Post Your First Gig</Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    filteredGigs.map((gig) => (
                      <div key={gig.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                           onClick={() => handleViewGig(gig)}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                              {gig.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-1">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span>${gig.budget}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(gig.deadline).toLocaleDateString()}</span>
                              </div>
                              {gig.selectedWorker && (
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>{gig.selectedWorker}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge className={getStatusColor(gig.status)}>
                            {formatStatus(gig.status)}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {gig.skills.slice(0, 3).map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {gig.skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{gig.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Posted {new Date(gig.postedDate).toLocaleDateString()}</span>
                            {gig.contractAddress && (
                              <div className="flex items-center space-x-1">
                                <Shield className="w-3 h-3" />
                                <span>Smart Contract</span>
                              </div>
                            )}
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewGig(gig);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-300">No applications yet</p>
                    </div>
                  ) : (
                    recentApplications.map((app, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{app.name}</h4>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{app.rating}</span>
                            </div>
                          </div>
                          <span className="font-medium text-green-600">{app.bid}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {app.skills.slice(0, 2).map((skill: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-blue-600 to-purple-600"
                            onClick={() => {
                              const gig = myGigs.find(g => g.id === app.gigId);
                              if (gig) handleViewGig(gig);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMessageWorker(app.name)}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover:bg-blue-50 dark:hover:bg-blue-950/30" 
                onClick={() => handleQuickAction('post-gig')}
              >
                <Plus className="w-6 h-6" />
                <span className="text-sm font-medium">Post New Gig</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover:bg-green-50 dark:hover:bg-green-950/30" 
                onClick={() => handleQuickAction('browse-workers')}
              >
                <Search className="w-6 h-6" />
                <span className="text-sm font-medium">Browse Workers</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover:bg-purple-50 dark:hover:bg-purple-950/30" 
                onClick={() => handleQuickAction('payments')}
              >
                <DollarSign className="w-6 h-6" />
                <span className="text-sm font-medium">Manage Payments</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover:bg-yellow-50 dark:hover:bg-yellow-950/30" 
                onClick={() => handleQuickAction('credentials')}
              >
                <Award className="w-6 h-6" />
                <span className="text-sm font-medium">Issue Credentials</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gig Details Modal */}
      {selectedGig && (
        <GigDetails
          gig={selectedGig}
          applications={recentApplications}
          onClose={() => setSelectedGig(null)}
          onUpdateGig={handleUpdateGig}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
