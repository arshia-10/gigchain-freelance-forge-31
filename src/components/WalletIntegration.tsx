import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Send, 
  ArrowDownLeft, 
  ArrowUpRight,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Coins,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'escrow';
  amount: string;
  token: 'ETH' | 'USDC' | 'GIGI';
  address: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  description: string;
}

const WalletIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState({
    ETH: '2.45',
    USDC: '1,250.00',
    GIGI: '500.00'
  });

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'received',
      amount: '0.5',
      token: 'ETH',
      address: '0x742d35...5e3',
      status: 'completed',
      timestamp: '2024-01-15 14:30',
      description: 'Payment for E-commerce Development'
    },
    {
      id: '2',
      type: 'escrow',
      amount: '1,200',
      token: 'USDC',
      address: '0x892d35...5e4',
      status: 'pending',
      timestamp: '2024-01-14 10:15',
      description: 'Escrow for Mobile App Design'
    },
    {
      id: '3',
      type: 'sent',
      amount: '50',
      token: 'GIGI',
      address: '0x442d35...5e5',
      status: 'completed',
      timestamp: '2024-01-13 16:45',
      description: 'Staking for Premium Features'
    },
    {
      id: '4',
      type: 'received',
      amount: '2,500',
      token: 'USDC',
      address: '0x112d35...5e6',
      status: 'completed',
      timestamp: '2024-01-12 09:20',
      description: 'Payment for Smart Contract Audit'
    }
  ]);

  const connectWallet = async () => {
    // Simulate wallet connection
    setIsConnected(true);
    setWalletAddress('0x742d35Cc6634C0532925a3b8D4d8E9e0C2e1d5e3');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sent': return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case 'received': return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case 'escrow': return <Shield className="w-4 h-4 text-blue-500" />;
      default: return <Wallet className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
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
              <span className="text-gray-600">Wallet Dashboard</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <Link to="/freelancer-dashboard">
                  Dashboard
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
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Wallet Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your crypto assets and transactions</p>
            </div>
            {!isConnected ? (
              <Button 
                onClick={connectWallet}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <Button 
                onClick={disconnectWallet}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Disconnect Wallet
              </Button>
            )}
          </div>

          {!isConnected ? (
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg text-center p-12">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Web3 Wallet</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Connect your wallet to view balances, manage transactions, and participate in the GigChain ecosystem.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-blue-50/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">🦊</div>
                    <h3 className="font-semibold">MetaMask</h3>
                    <p className="text-sm text-gray-600">Most popular</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-blue-50/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">🔗</div>
                    <h3 className="font-semibold">WalletConnect</h3>
                    <p className="text-sm text-gray-600">Mobile friendly</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-blue-50/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">🔵</div>
                    <h3 className="font-semibold">Coinbase</h3>
                    <p className="text-sm text-gray-600">Easy to use</p>
                  </CardContent>
                </Card>
              </div>
            </Card>
          ) : (
            <>
              {/* Wallet Info */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Connected Wallet</p>
                        <div className="flex items-center space-x-2">
                          <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                          </code>
                          <Button size="sm" variant="outline" onClick={copyAddress}>
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Balances */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">ETH</span>
                        </div>
                        <span className="font-medium">Ethereum</span>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{balance.ETH}</p>
                    <p className="text-sm text-gray-600">≈ $4,410.00</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">USDC</span>
                        </div>
                        <span className="font-medium">USD Coin</span>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{balance.USDC}</p>
                    <p className="text-sm text-gray-600">≈ $1,250.00</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Coins className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">GIGI Token</span>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{balance.GIGI}</p>
                    <p className="text-sm text-gray-600">Platform utility token</p>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold">Transaction History</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {getTransactionIcon(tx.type)}
                            {getStatusIcon(tx.status)}
                          </div>
                          <div>
                            <p className="font-medium">{tx.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span>{tx.timestamp}</span>
                              <span>•</span>
                              <code className="bg-gray-100 px-1 rounded">
                                {tx.address}
                              </code>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            tx.type === 'received' ? 'text-green-600' : 
                            tx.type === 'sent' ? 'text-red-600' : 'text-blue-600'
                          }`}>
                            {tx.type === 'received' ? '+' : tx.type === 'sent' ? '-' : ''}
                            {tx.amount} {tx.token}
                          </p>
                          <Badge className={getStatusColor(tx.status)}>
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <Send className="w-5 h-5 mr-2" />
                  Send Payment
                </Button>
                <Button variant="outline" className="h-16 border-blue-200 text-blue-600 hover:bg-blue-50">
                  <ArrowDownLeft className="w-5 h-5 mr-2" />
                  Request Payment
                </Button>
                <Button variant="outline" className="h-16 border-purple-200 text-purple-600 hover:bg-purple-50">
                  <Shield className="w-5 h-5 mr-2" />
                  View Escrow
                </Button>
                <Button variant="outline" className="h-16 border-green-200 text-green-600 hover:bg-green-50">
                  <Coins className="w-5 h-5 mr-2" />
                  Stake GIGI
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletIntegration;
