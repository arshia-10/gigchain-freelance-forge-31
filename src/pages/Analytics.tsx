
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  DollarSign, 
  Star,
  Home,
  Download,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Data for different time ranges
  const dataByTimeRange = {
    week: {
      earnings: [
        { name: 'Mon', earnings: 800, proposals: 2, completed: 1 },
        { name: 'Tue', earnings: 1200, proposals: 3, completed: 2 },
        { name: 'Wed', earnings: 900, proposals: 2, completed: 1 },
        { name: 'Thu', earnings: 1500, proposals: 4, completed: 3 },
        { name: 'Fri', earnings: 1100, proposals: 3, completed: 2 },
        { name: 'Sat', earnings: 600, proposals: 1, completed: 1 },
        { name: 'Sun', earnings: 400, proposals: 1, completed: 0 },
      ],
      profileViews: [
        { name: 'Mon', views: 32 },
        { name: 'Tue', views: 45 },
        { name: 'Wed', views: 38 },
        { name: 'Thu', views: 52 },
        { name: 'Fri', views: 41 },
        { name: 'Sat', views: 28 },
        { name: 'Sun', views: 18 },
      ],
      totalRevenue: 6500,
      totalViews: 254,
      avgRating: 4.7,
      responseRate: 96
    },
    month: {
      earnings: [
        { name: 'Jan', earnings: 4200, proposals: 12, completed: 8 },
        { name: 'Feb', earnings: 3800, proposals: 10, completed: 7 },
        { name: 'Mar', earnings: 5100, proposals: 15, completed: 11 },
        { name: 'Apr', earnings: 4800, proposals: 13, completed: 9 },
        { name: 'May', earnings: 5400, proposals: 16, completed: 12 },
        { name: 'Jun', earnings: 6200, proposals: 18, completed: 14 },
      ],
      profileViews: [
        { name: 'Week 1', views: 145 },
        { name: 'Week 2', views: 167 },
        { name: 'Week 3', views: 189 },
        { name: 'Week 4', views: 203 },
      ],
      totalRevenue: 34500,
      totalViews: 1284,
      avgRating: 4.8,
      responseRate: 94
    },
    quarter: {
      earnings: [
        { name: 'Q1', earnings: 13100, proposals: 37, completed: 26 },
        { name: 'Q2', earnings: 16400, proposals: 47, completed: 35 },
        { name: 'Q3', earnings: 18200, proposals: 52, completed: 38 },
        { name: 'Q4', earnings: 21800, proposals: 61, completed: 45 },
      ],
      profileViews: [
        { name: 'Q1', views: 1450 },
        { name: 'Q2', views: 1780 },
        { name: 'Q3', views: 2100 },
        { name: 'Q4', views: 2340 },
      ],
      totalRevenue: 69500,
      totalViews: 7670,
      avgRating: 4.9,
      responseRate: 91
    },
    year: {
      earnings: [
        { name: '2021', earnings: 45000, proposals: 120, completed: 89 },
        { name: '2022', earnings: 58000, proposals: 155, completed: 118 },
        { name: '2023', earnings: 72000, proposals: 190, completed: 145 },
        { name: '2024', earnings: 89000, proposals: 235, completed: 182 },
      ],
      profileViews: [
        { name: '2021', views: 5200 },
        { name: '2022', views: 7800 },
        { name: '2023', views: 12400 },
        { name: '2024', views: 18600 },
      ],
      totalRevenue: 264000,
      totalViews: 44000,
      avgRating: 4.9,
      responseRate: 89
    }
  };

  // Get current data based on selected time range
  const currentData = useMemo(() => dataByTimeRange[timeRange], [timeRange]);

  // Calculate percentage changes (simplified for demo)
  const getPercentageChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const skillPerformance = [
    { skill: 'React Development', earnings: 15600, projects: 12, rate: 4.9 },
    { skill: 'UI/UX Design', earnings: 8900, projects: 8, rate: 4.7 },
    { skill: 'Node.js Backend', earnings: 12300, projects: 9, rate: 4.8 },
    { skill: 'Blockchain Development', earnings: 18200, projects: 6, rate: 5.0 },
  ];

  const clientSatisfaction = [
    { category: 'Excellent', value: 65, color: '#10B981' },
    { category: 'Good', value: 25, color: '#3B82F6' },  
    { category: 'Average', value: 8, color: '#F59E0B' },
    { category: 'Poor', value: 2, color: '#EF4444' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="backdrop-blur-md bg-white/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GigChain Analytics
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" asChild>
                <Link to="/freelancer-dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
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
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your performance and growth</p>
            </div>
            <div className="flex space-x-2">
              {['week', 'month', 'quarter', 'year'].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${currentData.totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+15.3% from last period</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold text-gray-900">{currentData.totalViews.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+8.2% this {timeRange}</span>
                    </div>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{currentData.avgRating}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                      <span className="text-sm text-gray-600">From 156 reviews</span>
                    </div>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{currentData.responseRate}%</p>
                    <div className="flex items-center mt-1">
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-600">-2.1% this {timeRange}</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="earnings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="satisfaction">Client Satisfaction</TabsTrigger>
              <TabsTrigger value="visibility">Profile Visibility</TabsTrigger>
            </TabsList>

            <TabsContent value="earnings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Earnings Trend ({timeRange})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={currentData.earnings}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="earnings" 
                          stroke="#3B82F6" 
                          fill="#3B82F6" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Skill Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillPerformance.map((skill, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{skill.skill}</h3>
                            <span className="text-lg font-bold text-green-600">${skill.earnings.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{skill.projects} projects</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                              {skill.rate}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Projects & Proposals ({timeRange})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={currentData.earnings}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="proposals" fill="#3B82F6" name="Proposals Sent" />
                      <Bar dataKey="completed" fill="#10B981" name="Projects Completed" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="satisfaction" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Client Satisfaction Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={clientSatisfaction}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ category, value }) => `${category}: ${value}%`}
                        >
                          {clientSatisfaction.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">2 days ago</span>
                        </div>
                        <p className="text-sm">"Excellent work on the e-commerce platform. Delivered on time and exceeded expectations."</p>
                        <p className="text-xs text-gray-500 mt-1">- TechCorp Inc.</p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[1,2,3,4].map(star => (
                              <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                          <span className="ml-2 text-sm text-gray-600">1 week ago</span>
                        </div>
                        <p className="text-sm">"Great communication and solid technical skills. Will hire again!"</p>
                        <p className="text-xs text-gray-500 mt-1">- StartupXYZ</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="visibility" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Profile Views Over Time ({timeRange})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={currentData.profileViews}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
