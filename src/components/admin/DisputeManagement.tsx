
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  AlertTriangle,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Scale,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FilterOptions {
  status: string;
  priority: string;
  type: string;
  minAmount: string;
  maxAmount: string;
  dateRange: string;
}

const DisputeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    priority: '',
    type: '',
    minAmount: '',
    maxAmount: '',
    dateRange: ''
  });
  const { toast } = useToast();

  const disputes = [
    {
      id: 1,
      gigTitle: 'React Developer for E-commerce Platform',
      client: 'john.eth',
      freelancer: 'alice.eth',
      amount: '$2,500',
      status: 'open',
      priority: 'high',
      type: 'payment',
      createdAt: '2024-01-15',
      description: 'Client refuses to release payment despite completed deliverables',
      evidence: ['deliverable_screenshots.png', 'communication_log.txt']
    },
    {
      id: 2,
      gigTitle: 'Logo Design for Startup',
      client: 'startup.eth',
      freelancer: 'designer.eth',
      amount: '$500',
      status: 'investigating',
      priority: 'medium',
      type: 'quality',
      createdAt: '2024-01-18',
      description: 'Client claims delivered work does not match requirements',
      evidence: ['original_brief.pdf', 'delivered_work.zip']
    },
    {
      id: 3,
      gigTitle: 'Smart Contract Audit',
      client: 'defi.eth',
      freelancer: 'security.eth',
      amount: '$5,000',
      status: 'resolved',
      priority: 'critical',
      type: 'fraud',
      createdAt: '2024-01-10',
      description: 'Freelancer provided plagiarized audit report from another project',
      evidence: ['audit_comparison.pdf', 'original_source.pdf']
    }
  ];

  const getFilteredDisputes = () => {
    return disputes.filter(dispute => {
      // Search term filter
      if (searchTerm && !dispute.gigTitle.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !dispute.client.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !dispute.freelancer.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !dispute.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status && dispute.status !== filters.status) return false;

      // Priority filter
      if (filters.priority && dispute.priority !== filters.priority) return false;

      // Type filter
      if (filters.type && dispute.type !== filters.type) return false;

      // Amount filters
      const amount = parseFloat(dispute.amount.replace('$', '').replace(',', ''));
      if (filters.minAmount && amount < parseFloat(filters.minAmount)) return false;
      if (filters.maxAmount && amount > parseFloat(filters.maxAmount)) return false;

      return true;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-red-100 text-red-800">Open</Badge>;
      case 'investigating':
        return <Badge className="bg-yellow-100 text-yellow-800">Investigating</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'escalated':
        return <Badge className="bg-purple-100 text-purple-800">Escalated</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const applyFilters = () => {
    setFilterOpen(false);
    toast({
      title: "Filters Applied",
      description: "Dispute list has been filtered based on your criteria.",
    });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      type: '',
      minAmount: '',
      maxAmount: '',
      dateRange: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const handleResolveDispute = (disputeId: number) => {
    toast({
      title: "Dispute Resolved",
      description: "The dispute has been marked as resolved.",
    });
  };

  const filteredDisputes = getFilteredDisputes();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dispute Management</h2>
        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Advanced Filters</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Type</label>
                <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="quality">Quality</SelectItem>
                    <SelectItem value="fraud">Fraud</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Min Amount ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minAmount}
                    onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Amount ($)</label>
                  <Input
                    type="number"
                    placeholder="10000"
                    value={filters.maxAmount}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={applyFilters} className="flex-1">
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={() => setFilterOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search disputes by gig title, users, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Dispute Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Disputes</p>
                <p className="text-2xl font-bold">89</p>
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
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">56</p>
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
                <p className="text-2xl font-bold">$125K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disputes Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Disputes ({filteredDisputes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gig</TableHead>
                <TableHead>Parties</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{dispute.gigTitle}</p>
                      <p className="text-sm text-muted-foreground">ID: #{dispute.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p><strong>Client:</strong> {dispute.client}</p>
                      <p><strong>Freelancer:</strong> {dispute.freelancer}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{dispute.amount}</TableCell>
                  <TableCell className="capitalize">{dispute.type}</TableCell>
                  <TableCell>{getPriorityBadge(dispute.priority)}</TableCell>
                  <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                  <TableCell>{dispute.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {dispute.status !== 'resolved' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleResolveDispute(dispute.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                    </div>
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

export default DisputeManagement;
