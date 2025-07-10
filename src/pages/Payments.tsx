
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  ArrowLeft, 
  DollarSign, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Shield,
  Home,
  User,
  Download,
  Eye,
  Search,
  Calendar,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const paymentStats = [
    { label: 'Total Spent', value: '$12,450', icon: DollarSign, color: 'bg-green-500', change: '+12.5%' },
    { label: 'Pending Payments', value: '$2,340', icon: Clock, color: 'bg-yellow-500', change: '-5.2%' },
    { label: 'Completed Payments', value: '28', icon: CheckCircle, color: 'bg-blue-500', change: '+8.3%' },
    { label: 'Wallet Balance', value: '$5,680', icon: Wallet, color: 'bg-purple-500', change: '+15.7%' },
  ];

  const transactions = [
    {
      id: 1,
      type: 'payment',
      description: 'Payment to alex.eth for Mobile App Development',
      amount: -2500,
      status: 'completed',
      date: '2024-01-15',
      txHash: '0x1234...5678',
      freelancer: 'alex.eth'
    },
    {
      id: 2,
      type: 'payment',
      description: 'Payment to sarah.eth for Logo Design',
      amount: -500,
      status: 'completed',
      date: '2024-01-14',
      txHash: '0x2345...6789',
      freelancer: 'sarah.eth'
    },
    {
      id: 3,
      type: 'escrow',
      description: 'Escrow deposit for Website Redesign',
      amount: -3200,
      status: 'pending',
      date: '2024-01-13',
      txHash: '0x3456...7890',
      freelancer: 'mike.eth'
    },
    {
      id: 4,
      type: 'refund',
      description: 'Refund from cancelled project',
      amount: 800,
      status: 'completed',
      date: '2024-01-12',
      txHash: '0x4567...8901',
      freelancer: 'emma.eth'
    },
    {
      id: 5,
      type: 'payment',
      description: 'Payment to john.eth for Content Writing',
      amount: -750,
      status: 'completed',
      date: '2024-01-10',
      txHash: '0x5678...9012',
      freelancer: 'john.eth'
    }
  ];

  const upcomingPayments = [
    {
      id: 1,
      project: 'E-commerce Platform',
      freelancer: 'alex.eth',
      amount: 2500,
      dueDate: '2024-01-20',
      status: 'due_soon'
    },
    {
      id: 2,
      project: 'Marketing Campaign',
      freelancer: 'sarah.eth',
      amount: 1200,
      dueDate: '2024-01-25',
      status: 'scheduled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTransactionIcon = (type: string, amount: number) => {
    if (amount > 0) return <ArrowDownRight className="w-4 h-4 text-green-600" />;
    return <ArrowUpRight className="w-4 h-4 text-red-600" />;
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
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/client-dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments & Wallet</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your payments, transactions, and wallet balance</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentStats.map((stat, index) => (
              <Card key={index} className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">{stat.change}</span>
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

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'transactions', label: 'Transactions' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'wallet', label: 'Wallet' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'transactions' && (
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Transaction History</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                          {getTransactionIcon(transaction.type, transaction.amount)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.description}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.freelancer}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.txHash}
                          </p>
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'upcoming' && (
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Upcoming Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {payment.project}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Payment to {payment.freelancer}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            ${payment.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Due {payment.dueDate}
                          </p>
                        </div>
                        <Badge className={payment.status === 'due_soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}>
                          {payment.status.replace('_', ' ')}
                        </Badge>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'wallet' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Wallet Balance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Available Balance</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">$5,680.00</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Funds
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Withdraw
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">**** **** **** 1234</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Primary</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            {getTransactionIcon(transaction.type, transaction.amount)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {transaction.freelancer}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <p className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Add Funds to Wallet
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Withdraw Funds
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Payment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Dispute Transaction
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
