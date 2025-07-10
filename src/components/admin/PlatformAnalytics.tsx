
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Briefcase,
  Clock,
  Star,
  Activity,
  Target
} from 'lucide-react';

const PlatformAnalytics = () => {
  const userGrowthData = [
    { month: 'Jan', users: 1200, active: 980 },
    { month: 'Feb', users: 1600, active: 1340 },
    { month: 'Mar', users: 2100, active: 1780 },
    { month: 'Apr', users: 2800, active: 2350 },
    { month: 'May', users: 3500, active: 2980 },
    { month: 'Jun', users: 4200, active: 3650 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 120000 },
    { month: 'Mar', revenue: 165000 },
    { month: 'Apr', revenue: 210000 },
    { month: 'May', revenue: 285000 },
    { month: 'Jun', revenue: 340000 },
  ];

  const skillCategoryData = [
    { name: 'Development', value: 35, color: '#3B82F6' },
    { name: 'Design', value: 25, color: '#10B981' },
    { name: 'Writing', value: 15, color: '#F59E0B' },
    { name: 'Marketing', value: 12, color: '#EF4444' },
    { name: 'Data Science', value: 8, color: '#8B5CF6' },
    { name: 'Other', value: 5, color: '#6B7280' },
  ];

  const gigCompletionData = [
    { day: 'Mon', completed: 45, started: 52 },
    { day: 'Tue', completed: 52, started: 48 },
    { day: 'Wed', completed: 48, started: 61 },
    { day: 'Thu', completed: 61, started: 55 },
    { day: 'Fri', completed: 55, started: 49 },
    { day: 'Sat', completed: 38, started: 42 },
    { day: 'Sun', completed: 42, started: 38 },
  ];

  const chartConfig = {
    users: {
      label: "Total Users",
      color: "#3B82F6",
    },
    active: {
      label: "Active Users",
      color: "#10B981",
    },
    revenue: {
      label: "Revenue",
      color: "#8B5CF6",
    },
    completed: {
      label: "Completed",
      color: "#10B981",
    },
    started: {
      label: "Started",
      color: "#3B82F6",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Platform Analytics</h2>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border rounded-md">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Daily Active Users</p>
                <p className="text-2xl font-bold">8,234</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Time to Hire</p>
                <p className="text-2xl font-bold">2.4 days</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">-8.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Platform Fee Revenue</p>
                <p className="text-2xl font-bold">$45,230</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">4.8/5.0</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+0.2</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>User Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="users" stroke={chartConfig.users.color} strokeWidth={2} />
                  <Line type="monotone" dataKey="active" stroke={chartConfig.active.color} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Revenue Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill={chartConfig.revenue.color} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Skill Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Top Skill Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillCategoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {skillCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gig Completion Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Weekly Gig Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gigCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="started" fill={chartConfig.started.color} />
                  <Bar dataKey="completed" fill={chartConfig.completed.color} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Health Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Gig Success Rate</span>
                <span className="font-bold text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>User Retention (30d)</span>
                <span className="font-bold">76.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Dispute Rate</span>
                <span className="font-bold text-red-600">2.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Response Time</span>
                <span className="font-bold">3.2 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>North America</span>
                <span className="font-bold">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Europe</span>
                <span className="font-bold">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Asia</span>
                <span className="font-bold">22%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Others</span>
                <span className="font-bold">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>alice.eth</span>
                <span className="font-bold">$12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span>dev.eth</span>
                <span className="font-bold">$9,870</span>
              </div>
              <div className="flex justify-between items-center">
                <span>designer.eth</span>
                <span className="font-bold">$8,620</span>
              </div>
              <div className="flex justify-between items-center">
                <span>writer.eth</span>
                <span className="font-bold">$7,340</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
