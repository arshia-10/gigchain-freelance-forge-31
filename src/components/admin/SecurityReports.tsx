
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Shield, 
  AlertTriangle,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Flag,
  Lock,
  Activity,
  Zap
} from 'lucide-react';
import { SecurityActions } from './SecurityActions';

const SecurityReports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const securityReports = [
    {
      id: 1,
      type: 'fraud',
      severity: 'high',
      description: 'User uploaded falsified university certificates and work experience documents',
      reporter: 'alice.eth',
      target: 'suspicious.eth',
      status: 'investigating',
      createdAt: '2024-01-15',
      evidence: ['screenshot1.png', 'comparison.pdf', 'certificate_analysis.doc']
    },
    {
      id: 2,
      type: 'spam',
      severity: 'medium',
      description: 'Multiple duplicate gig postings with unrealistic requirements and fake testimonials',
      reporter: 'client.eth',
      target: 'spammer.eth',
      status: 'resolved',
      createdAt: '2024-01-18',
      evidence: ['gig_screenshots.png', 'duplicate_posts.pdf']
    },
    {
      id: 3,
      type: 'abuse',
      severity: 'high',
      description: 'Threatening and inappropriate messages sent to multiple freelancers with harassment patterns',
      reporter: 'freelancer.eth',
      target: 'abusive.eth',
      status: 'open',
      createdAt: '2024-01-20',
      evidence: ['messages.json', 'chat_log.txt', 'threat_analysis.pdf']
    }
  ];

  const auditLogs = [
    {
      id: 1,
      action: 'User Suspended',
      admin: 'admin.eth',
      target: 'suspicious.eth',
      timestamp: '2024-01-15 14:30:00',
      details: 'Account suspended due to fraud report'
    },
    {
      id: 2,
      action: 'Platform Fee Updated',
      admin: 'admin.eth',
      target: 'System',
      timestamp: '2024-01-14 09:15:00',
      details: 'Platform fee changed from 2.5% to 3.0%'
    },
    {
      id: 3,
      action: 'Gig Removed',
      admin: 'moderator.eth',
      target: 'Spam Gig #1234',
      timestamp: '2024-01-13 16:45:00',
      details: 'Gig removed for violating terms of service'
    }
  ];

  const getFilteredReports = () => {
    return securityReports.filter(report => 
      searchTerm === '' || 
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fraud':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'spam':
        return <Flag className="w-4 h-4 text-yellow-500" />;
      case 'abuse':
        return <Ban className="w-4 h-4 text-red-500" />;
      default:
        return <Shield className="w-4 h-4 text-blue-500" />;
    }
  };

  const filteredReports = getFilteredReports();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Security & Reports</h2>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search reports by type, user, target, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Security Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Flag className="w-5 h-5 text-yellow-500" />
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
              <Activity className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Investigating</p>
                <p className="text-2xl font-bold">8</p>
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
                <p className="text-2xl font-bold">198</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Ban className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Banned Users</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Security Reports ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(report.type)}
                      <span className="capitalize">{report.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell>{report.target}</TableCell>
                  <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{report.createdAt}</TableCell>
                  <TableCell>
                    <SecurityActions report={report} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent Audit Logs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell>{log.admin}</TableCell>
                  <TableCell>{log.target}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell className="text-sm">{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityReports;
