
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Star, 
  Briefcase, 
  Clock, 
  Wallet,
  Award,
  Users,
  Target,
  ArrowUp,
  ArrowDown,
  Eye,
  MessageSquare,
  Shield,
  LogOut
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

const FreelancerDashboard = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'year'>('month');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here (clear tokens, etc.)
    navigate('/');
  };

  const earningsData = {
    week: [
      { name: 'Mon', earnings: 245 },
      { name: 'Tue', earnings: 180 },
      { name: 'Wed', earnings: 320 },
      { name: 'Thu', earnings: 290 },
      { name: 'Fri', earnings: 410 },
      { name: 'Sat', earnings: 180 },
      { name: 'Sun', earnings: 90 }
    ],
    month: [
      { name: 'Week 1', earnings: 1250 },
      { name: 'Week 2', earnings: 1800 },
      { name: 'Week 3', earnings: 2100 },
      { name: 'Week 4', earnings: 1950 },
    ],
    year: [
      { name: 'Jan', earnings: 4200 },
      { name: 'Feb', earnings: 3800 },
      { name: 'Mar', earnings: 5100 },
      { name: 'Apr', earnings: 4800 },
      { name: 'May', earnings: 5400 },
      { name: 'Jun', earnings: 6200 }
    ]
  };

  // Calculate totals based on selected time filter
  const getTotalEarnings = () => {
    const data = earningsData[timeFilter];
    return data.reduce((sum, item) => sum + item.earnings, 0);
  };

  const getEarningsChange = () => {
    switch (timeFilter) {
      case 'week': return '+8.2%';
      case 'month': return '+12.5%';
      case 'year': return '+24.8%';
      default: return '+12.5%';
    }
  };

  const skillDemandData = [
    { skill: 'React', demand: 85, color: '#3B82F6' },
    { skill: 'Node.js', demand: 72, color: '#10B981' },
    { skill: 'Python', demand: 68, color: '#F59E0B' },
    { skill: 'Design', demand: 61, color: '#8B5CF6' },
    { skill: 'Blockchain', demand: 45, color: '#EF4444' }
  ];

  const reputationData = [
    { category: 'Quality', score: 4.8 },
    { category: 'Communication', score: 4.6 },
    { category: 'Timeliness', score: 4.9 },
    { category: 'Professionalism', score: 4.7 }
  ];

  const activeGigs = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      client: 'TechCorp Inc.',
      budget: '$2,500',
      deadline: '2024-01-15',
      progress: 75,
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      client: 'StartupXYZ',
      budget: '$1,200',
      deadline: '2024-01-20',
      progress: 40,
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Smart Contract Audit',
      client: 'CryptoDAO',
      budget: '$3,000',
      deadline: '2024-01-25',
      progress: 90,
      status: 'Review'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="backdrop-blur-md bg-white/70 border-b border-white/20 sticky top-0 z-50">
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
              <div className="h-6 w-px bg-gray-300" />
              <span className="text-gray-600">Freelancer Dashboard</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <Link to="/wallet">
                  <Wallet className="w-4 h-4 mr-2" />
                  Wallet
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Link to="/certificates">
                  <Award className="w-4 h-4 mr-2" />
                  Certificates
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
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
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex! 👋</h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your freelance business</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                <Link to="/profile">
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Link>
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">${getTotalEarnings().toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{getEarningsChange()}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Gigs</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+2 this week</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">96%</p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+2%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                      <span className="text-sm text-gray-600">From 124 reviews</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Earnings Chart */}
            <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Earnings Overview</CardTitle>
                  <div className="flex space-x-2">
                    {(['week', 'month', 'year'] as const).map((period) => (
                      <Button
                        key={period}
                        variant={timeFilter === period ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTimeFilter(period)}
                        className={timeFilter === period ? 'bg-blue-600 text-white' : ''}
                      >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={earningsData[timeFilter]}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skill Demand */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Skill Demand Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillDemandData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-sm text-gray-600">{skill.demand}%</span>
                    </div>
                    <Progress value={skill.demand} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Active Gigs */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Active Gigs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeGigs.map((gig) => (
                  <div key={gig.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{gig.title}</h3>
                        <p className="text-gray-600">{gig.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-green-600">{gig.budget}</p>
                        <Badge className={getStatusColor(gig.status)}>
                          {gig.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due {gig.deadline}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {gig.progress}% Complete
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/messages?client=${encodeURIComponent(gig.client)}`}>
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message Client
                        </Link>
                      </Button>
                    </div>
                    <div className="mt-3">
                      <Progress value={gig.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reputation Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Reputation Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reputationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{item.category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= item.score ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                  <Link to="/marketplace">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Browse New Gigs
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/profile">
                    <Users className="w-4 h-4 mr-2" />
                    Update Profile
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/certificates">
                    <Award className="w-4 h-4 mr-2" />
                    View Certificates
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/analytics">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analytics Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
