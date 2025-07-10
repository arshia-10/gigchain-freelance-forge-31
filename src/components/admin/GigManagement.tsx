
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Briefcase, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Eye,
  DollarSign,
  Clock,
  TrendingUp
} from 'lucide-react';
import { GigActions } from './GigActions';

const GigManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const gigs = [
    {
      id: 1,
      title: 'React Developer for E-commerce Platform',
      client: 'john.eth',
      freelancer: 'alice.eth',
      amount: '$2,500',
      budget: '$2,500',
      status: 'active',
      category: 'Development',
      createdAt: '2024-01-15',
      deadline: '2024-02-15',
      applications: 12,
      reports: 0,
      escrowStatus: 'funded',
      description: 'Looking for an experienced React developer to build a modern e-commerce platform with advanced features including payment integration, inventory management, and user authentication.',
      deliverables: [
        'Complete React application',
        'Payment gateway integration',
        'Admin dashboard',
        'User authentication system',
        'Responsive design'
      ],
      requirements: [
        '3+ years React experience',
        'Experience with payment systems',
        'Knowledge of modern JavaScript',
        'Understanding of REST APIs',
        'Portfolio of similar projects'
      ]
    },
    {
      id: 2,
      title: 'Logo Design for Startup',
      client: 'startup.eth',
      freelancer: null,
      amount: '$500',
      budget: '$500',
      status: 'reported',
      category: 'Design',
      createdAt: '2024-01-20',
      deadline: '2024-02-01',
      applications: 8,
      reports: 3,
      escrowStatus: 'pending',
      description: 'Need a professional logo design for our tech startup. Looking for modern, clean design that represents innovation and technology.',
      deliverables: [
        'Primary logo design',
        'Logo variations',
        'Color palette',
        'Brand guidelines',
        'Source files (AI, PSD, SVG)'
      ],
      requirements: [
        'Professional design experience',
        'Portfolio of logo designs',
        'Understanding of brand identity',
        'Ability to create scalable designs',
        'Experience with Adobe Creative Suite'
      ]
    },
    {
      id: 3,
      title: 'Smart Contract Audit',
      client: 'defi.eth',
      freelancer: 'security.eth',
      amount: '$5,000',
      budget: '$5,000',
      status: 'completed',
      category: 'Blockchain',
      createdAt: '2024-01-10',
      deadline: '2024-01-25',
      applications: 5,
      reports: 0,
      escrowStatus: 'released',
      description: 'Comprehensive security audit of our DeFi protocol smart contracts. Need thorough testing and vulnerability assessment.',
      deliverables: [
        'Security audit report',
        'Vulnerability assessment',
        'Code review',
        'Recommendations document',
        'Final certification'
      ],
      requirements: [
        'Smart contract security expertise',
        'Experience with Solidity',
        'Knowledge of DeFi protocols',
        'Security audit certification',
        'Proven track record'
      ]
    }
  ];

  const getFilteredGigs = () => {
    return gigs.filter(gig => 
      searchTerm === '' || 
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'reported':
        return <Badge className="bg-red-100 text-red-800">Reported</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getEscrowBadge = (status: string) => {
    switch (status) {
      case 'funded':
        return <Badge className="bg-green-100 text-green-800">Funded</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'released':
        return <Badge className="bg-blue-100 text-blue-800">Released</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredGigs = getFilteredGigs();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gig Management</h2>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search gigs by title, client, category, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Gig Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Gigs</p>
                <p className="text-2xl font-bold">2,341</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
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
                <p className="text-2xl font-bold">456</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Reported</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">$1.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gigs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Gigs ({filteredGigs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gig</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Escrow</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGigs.map((gig) => (
                <TableRow key={gig.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{gig.title}</p>
                      <p className="text-sm text-muted-foreground">{gig.category}</p>
                    </div>
                  </TableCell>
                  <TableCell>{gig.client}</TableCell>
                  <TableCell className="font-medium">{gig.budget}</TableCell>
                  <TableCell>{getStatusBadge(gig.status)}</TableCell>
                  <TableCell>{gig.applications}</TableCell>
                  <TableCell>
                    <Badge variant={gig.reports > 0 ? "destructive" : "secondary"}>
                      {gig.reports}
                    </Badge>
                  </TableCell>
                  <TableCell>{getEscrowBadge(gig.escrowStatus)}</TableCell>
                  <TableCell>
                    <GigActions gig={gig} />
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

export default GigManagement;
