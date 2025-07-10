
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download
} from 'lucide-react';

const PaymentMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const payments = [
    {
      id: 1,
      gigTitle: 'React Developer for E-commerce',
      client: 'john.eth',
      freelancer: 'alice.eth',
      amount: '$2,500',
      status: 'completed',
      escrowStatus: 'released',
      txHash: '0xabc123...def456',
      createdAt: '2024-01-15',
      completedAt: '2024-01-20'
    },
    {
      id: 2,
      gigTitle: 'Logo Design for Startup',
      client: 'startup.eth',
      freelancer: 'bob.eth',
      amount: '$500',
      status: 'pending',
      escrowStatus: 'funded',
      txHash: '0x123abc...456def',
      createdAt: '2024-01-18',
      completedAt: null
    },
    {
      id: 3,
      gigTitle: 'Smart Contract Audit',
      client: 'defi.eth',
      freelancer: 'security.eth',
      amount: '$5,000',
      status: 'failed',
      escrowStatus: 'refunded',
      txHash: '0x789xyz...012abc',
      createdAt: '2024-01-12',
      completedAt: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getEscrowBadge = (status: string) => {
    switch (status) {
      case 'funded':
        return <Badge className="bg-green-100 text-green-800">Funded</Badge>;
      case 'released':
        return <Badge className="bg-blue-100 text-blue-800">Released</Badge>;
      case 'refunded':
        return <Badge className="bg-yellow-100 text-yellow-800">Refunded</Badge>;
      case 'locked':
        return <Badge className="bg-red-100 text-red-800">Locked</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Monitoring</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Payments
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search by transaction hash, user, or gig title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">$1.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">98.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Disputes</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Escrow Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Funded</span>
                <Badge className="bg-green-100 text-green-800">456</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Released</span>
                <Badge className="bg-blue-100 text-blue-800">1,234</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Refunded</span>
                <Badge className="bg-yellow-100 text-yellow-800">89</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Locked</span>
                <Badge className="bg-red-100 text-red-800">23</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Daily Volume</span>
                <span className="font-bold">$45,200</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Weekly Volume</span>
                <span className="font-bold">$312,800</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Monthly Volume</span>
                <span className="font-bold">$1,234,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Growth Rate</span>
                <span className="font-bold text-green-600">+12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gas Fee Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Avg Gas Fee</span>
                <span className="font-bold">$12.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Gas Fees</span>
                <span className="font-bold">$15,670</span>
              </div>
              <div className="flex justify-between items-center">
                <span>High Gas Alerts</span>
                <Badge variant="destructive">3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gig</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Freelancer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Escrow</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{payment.gigTitle}</p>
                    </div>
                  </TableCell>
                  <TableCell>{payment.client}</TableCell>
                  <TableCell>{payment.freelancer}</TableCell>
                  <TableCell className="font-bold">{payment.amount}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{getEscrowBadge(payment.escrowStatus)}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {payment.txHash}
                    </code>
                  </TableCell>
                  <TableCell>{payment.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
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

export default PaymentMonitoring;
