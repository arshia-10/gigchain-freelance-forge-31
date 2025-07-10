
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, CheckCircle, Flag, AlertTriangle, FileText, User, DollarSign, Calendar } from 'lucide-react';

interface Gig {
  id: number;
  title: string;
  client: string;
  freelancer: string;
  amount: string;
  status: string;
  category: string;
  deadline: string;
  description: string;
  deliverables: string[];
  requirements: string[];
}

interface GigActionsProps {
  gig: Gig;
}

export const GigActions = ({ gig }: GigActionsProps) => {
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [approvalReason, setApprovalReason] = useState('');
  const [flagReason, setFlagReason] = useState('');
  const [flagCategory, setFlagCategory] = useState('');
  const { toast } = useToast();

  const handleViewDetails = (gigData: Gig) => {
    setSelectedGig(gigData);
  };

  const handleApproveGig = (gigId: number) => {
    toast({
      title: "Gig Approved",
      description: `Gig "${gig.title}" has been approved successfully.`,
    });
  };

  const handleFlagGig = (gigId: number) => {
    if (!flagReason || !flagCategory) {
      toast({
        title: "Error",
        description: "Please provide both reason and category for flagging.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Gig Flagged",
      description: `Gig "${gig.title}" has been flagged for review.`,
      variant: "destructive",
    });
  };

  return (
    <div className="flex space-x-2">
      {/* View Full Details */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleViewDetails(gig)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Gig Full Details</span>
            </DialogTitle>
          </DialogHeader>
          {selectedGig && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Basic Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div><strong>Title:</strong> {selectedGig.title}</div>
                    <div><strong>Client:</strong> {selectedGig.client}</div>
                    <div><strong>Freelancer:</strong> {selectedGig.freelancer}</div>
                    <div><strong>Category:</strong> {selectedGig.category}</div>
                    <div className="flex items-center space-x-2">
                      <strong>Status:</strong>
                      <Badge className={
                        selectedGig.status === 'active' ? 'bg-green-100 text-green-800' :
                        selectedGig.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {selectedGig.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Financial & Timeline</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div><strong>Amount:</strong> {selectedGig.amount}</div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <strong>Deadline:</strong> {selectedGig.deadline}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{selectedGig.description}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedGig.deliverables.map((item, index) => (
                        <li key={index} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedGig.requirements.map((item, index) => (
                        <li key={index} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Gig */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-1" />
            Approve
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Gig</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to approve "{gig.title}"?</p>
            <div className="space-y-2">
              <Label htmlFor="approvalReason">Approval Notes (Optional)</Label>
              <Textarea
                id="approvalReason"
                placeholder="Add any notes about the approval..."
                value={approvalReason}
                onChange={(e) => setApprovalReason(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => handleApproveGig(gig.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                Confirm Approval
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Flag Gig */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="destructive">
            <Flag className="w-4 h-4 mr-1" />
            Flag
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Flag Gig for Review</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="flagCategory">Flag Category</Label>
              <Select value={flagCategory} onValueChange={setFlagCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason for flagging" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                  <SelectItem value="fraud">Potential Fraud</SelectItem>
                  <SelectItem value="terms">Terms Violation</SelectItem>
                  <SelectItem value="quality">Quality Issues</SelectItem>
                  <SelectItem value="spam">Spam/Duplicate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="flagReason">Detailed Reason</Label>
              <Textarea
                id="flagReason"
                placeholder="Provide detailed reason for flagging this gig..."
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => handleFlagGig(gig.id)}
                variant="destructive"
              >
                <Flag className="w-4 h-4 mr-2" />
                Flag Gig
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GigActions;
