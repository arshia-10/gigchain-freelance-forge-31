
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, Shield, AlertTriangle, Ban, CheckCircle, FileText, Clock } from 'lucide-react';

interface SecurityReport {
  id: number;
  type: string;
  severity: string;
  description: string;
  reporter: string;
  target: string;
  status: string;
  createdAt: string;
  evidence?: string[];
}

interface SecurityActionsProps {
  report: SecurityReport;
}

export const SecurityActions = ({ report }: SecurityActionsProps) => {
  const [selectedReport, setSelectedReport] = useState<SecurityReport | null>(null);
  const [resolution, setResolution] = useState('');
  const [actionType, setActionType] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleViewDetails = (reportData: SecurityReport) => {
    setSelectedReport(reportData);
  };

  const handleResolveReport = (reportId: number, action: string) => {
    if (!resolution || !actionType) {
      toast({
        title: "Error",
        description: "Please select both resolution type and action.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Security Report Resolved",
      description: `Report #${reportId} has been ${action} successfully.`,
    });
  };

  const handleEscalateReport = (reportId: number) => {
    toast({
      title: "Report Escalated",
      description: `Security report #${reportId} has been escalated to senior security team.`,
      variant: "destructive",
    });
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

  return (
    <div className="flex space-x-2">
      {/* View Full Details */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleViewDetails(report)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security Report Details</span>
            </DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Report Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div><strong>Report ID:</strong> #{selectedReport.id}</div>
                    <div><strong>Type:</strong> {selectedReport.type}</div>
                    <div className="flex items-center space-x-2">
                      <strong>Severity:</strong>
                      {getSeverityBadge(selectedReport.severity)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <strong>Status:</strong>
                      {getStatusBadge(selectedReport.status)}
                    </div>
                    <div><strong>Reporter:</strong> {selectedReport.reporter}</div>
                    <div><strong>Target:</strong> {selectedReport.target}</div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <strong>Reported:</strong> {selectedReport.createdAt}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investigation Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Report submitted - {selectedReport.createdAt}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Investigation started</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span>Pending resolution</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{selectedReport.description}</p>
                </CardContent>
              </Card>

              {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Evidence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedReport.evidence.map((evidence, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{evidence}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resolve Report */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-1" />
            Resolve
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Security Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resolution">Resolution Type</Label>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resolution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-action">No Action Required</SelectItem>
                  <SelectItem value="warning">Warning Issued</SelectItem>
                  <SelectItem value="account-suspended">Account Suspended</SelectItem>
                  <SelectItem value="content-removed">Content Removed</SelectItem>
                  <SelectItem value="investigation-complete">Investigation Complete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="actionType">Action Taken</Label>
              <Select value={actionType} onValueChange={setActionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action taken" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dismissed">Dismissed - No Violation</SelectItem>
                  <SelectItem value="resolved">Resolved - Action Taken</SelectItem>
                  <SelectItem value="prevented">Prevented - Threat Mitigated</SelectItem>
                  <SelectItem value="monitored">Under Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Resolution Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about the resolution..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={() => handleResolveReport(report.id, 'resolved')}
                className="bg-green-600 hover:bg-green-700"
              >
                Resolve Report
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Escalate Report */}
      <Button 
        size="sm" 
        variant="destructive"
        onClick={() => handleEscalateReport(report.id)}
      >
        <AlertTriangle className="w-4 h-4 mr-1" />
        Escalate
      </Button>
    </div>
  );
};

export default SecurityActions;
