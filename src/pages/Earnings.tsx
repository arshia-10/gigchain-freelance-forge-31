
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  Home,
  Wallet,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Earnings = () => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month' | 'custom'>('month');

  const stats = [
    { 
      label: 'Total Earnings', 
      value: '$24,750', 
      change: '+15.3%', 
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500' 
    },
    { 
      label: 'This Month', 
      value: '$4,200', 
      change: '+8.2%', 
      trend: 'up',
      icon: Calendar,
      color: 'bg-blue-500' 
    },
    { 
      label: 'Pending', 
      value: '$1,500', 
      change: '-2.1%', 
      trend: 'down',
      icon: Clock,
      color: 'bg-yellow-500' 
    },
    { 
      label: 'Available', 
      value: '$3,250', 
      change: '+12.4%', 
      trend: 'up',
      icon: Wallet,
      color: 'bg-purple-500' 
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'payment',
      description: 'DeFi Platform Development',
      client: 'crypto.ventures',
      amount: '$5,000',
      status: 'completed',
      date: '2024-01-15',
      method: 'USDC'
    },
    {
      id: 2,
      type: 'payment',
      description: 'Smart Contract Audit',
      client: 'defi.protocol',
      amount: '$3,500',
      status: 'pending',
      date: '2024-01-14',
      method: 'ETH'
    },
    {
      id: 3,
      type: 'withdrawal',
      description: 'Withdraw to Bank Account',
      client: '',
      amount: '$2,000',
      status: 'completed',
      date: '2024-01-12',
      method: 'Bank Transfer'
    },
    {
      id: 4,
      type: 'payment',
      description: 'NFT Marketplace UI Design',
      client: 'nft.studio',
      amount: '$1,800',
      status: 'completed',
      date: '2024-01-10',
      method: 'USDT'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTransactionIcon = (type: string) => {
    return type === 'payment' ? 
      <ArrowUpRight className="w-4 h-4 text-green-500" /> : 
      <ArrowDownLeft className="w-4 h-4 text-blue-500" />;
  };

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
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link to="/freelancer-dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Earnings Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Track your payments and manage withdrawals</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Wallet className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>

          {/* Time Filter */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex space-x-2">
                {(['today', 'week', 'month', 'custom'] as const).map((filter) => (
                  <Button
                    key={filter}
                    variant={timeFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeFilter(filter)}
                    className="capitalize"
                  >
                    {filter === 'custom' ? 'Custom Range' : filter}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
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

          {/* Token Balances */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle>Token Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { token: 'USDC', amount: '2,450.00', value: '$2,450.00', change: '+0.1%' },
                  { token: 'ETH', amount: '0.85', value: '$2,125.00', change: '+3.2%' },
                  { token: 'USDT', amount: '1,200.00', value: '$1,200.00', change: '+0.0%' }
                ].map((balance, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{balance.token}</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{balance.amount}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{balance.value}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-green-600">{balance.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Transaction History</CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                          {transaction.client && <span>{transaction.client}</span>}
                          <span>•</span>
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span>{transaction.method}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">{transaction.amount}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Wallet className="w-5 h-5" />
                <span className="text-sm">Withdraw</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Download className="w-5 h-5" />
                <span className="text-sm">Export Data</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm">Tax Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Invoice</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
