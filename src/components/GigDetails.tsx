
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  DollarSign, 
  User, 
  Star, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GigDetailsProps {
  gig: any;
  applications: any[];
  onClose: () => void;
  onUpdateGig: (gigId: number, updates: any) => void;
}

const GigDetails = ({ gig, applications, onClose, onUpdateGig }: GigDetailsProps) => {
  const { toast } = useToast();
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [disputeReason, setDisputeReason] = useState('');

  const gigApplications = applications.filter(app => app.gigId === gig.id);

  const handleAcceptApplication = (applicantName: string) => {
    toast({
      title: "Application Accepted",
      description: `${applicantName} has been selected for this gig!`,
    });
    
    onUpdateGig(gig.id, { 
      status: 'in_progress', 
      selectedWorker: applicantName,
      startDate: new Date().toISOString()
    });
  };

  const handleMarkComplete = () => {
    toast({
      title: "Gig Completed",
      description: "Smart contract will release escrow funds automatically.",
    });
    
    onUpdateGig(gig.id, { 
      status: 'completed', 
      completedDate: new Date().toISOString() 
    });
    setShowRatingForm(true);
  };

  const handleSubmitRating = () => {
    if (!review.trim()) {
      toast({
        title: "Review Required",
        description: "Please provide a review for the worker.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Rating Submitted",
      description: `You rated ${gig.selectedWorker} ${rating} stars. Review recorded on blockchain.`,
    });
    
    // Save rating to blockchain simulation
    const existingRatings = JSON.parse(localStorage.getItem('workerRatings') || '[]');
    const newRating = {
      worker: gig.selectedWorker,
      rating: rating,
      client: 'current_client',
      gigTitle: gig.title,
      date: new Date().toISOString(),
      review: review
    };
    localStorage.setItem('workerRatings', JSON.stringify([...existingRatings, newRating]));
    
    onUpdateGig(gig.id, { rated: true });
    setShowRatingForm(false);
  };

  const handleDispute = () => {
    if (!disputeReason.trim()) {
      toast({
        title: "Dispute Reason Required",
        description: "Please provide a reason for the dispute.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Dispute Initiated",
      description: "Community arbitration process has been started.",
      variant: "destructive"
    });
    
    onUpdateGig(gig.id, { 
      status: 'disputed', 
      disputeDate: new Date().toISOString(),
      disputeReason: disputeReason
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'disputed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-black">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{gig.title}</CardTitle>
              <Badge className={`mt-2 ${getStatusColor(gig.status)}`}>
                {gig.status.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
              </Badge>
            </div>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Gig Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-300">{gig.description}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium">${gig.budget}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{new Date(gig.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {gig.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {gig.contractAddress && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium">Smart Contract</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
                    {gig.contractAddress}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Escrow: ${gig.escrowAmount}
                  </p>
                </div>
              )}

              {gig.selectedWorker && (
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <h4 className="font-medium mb-2">Selected Worker</h4>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{gig.selectedWorker}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Applications */}
          {gig.status === 'active' && gigApplications.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">Applications ({gigApplications.length})</h3>
              <div className="space-y-4">
                {gigApplications.map((app, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{app.name}</h4>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{app.rating}</span>
                        </div>
                      </div>
                      <span className="font-medium text-green-600">{app.bid}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {app.skills.map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleAcceptApplication(app.name)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            {gig.status === 'in_progress' && (
              <>
                <Button onClick={handleMarkComplete} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
                <Button variant="destructive" onClick={() => setDisputeReason('Quality issues')}>
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Raise Dispute
                </Button>
              </>
            )}
            
            {gig.selectedWorker && (
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Worker
              </Button>
            )}
          </div>

          {/* Rating Form */}
          {showRatingForm && (
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold mb-4">Rate & Review Worker</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-1 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Review</label>
                  <Textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience working with this freelancer..."
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSubmitRating}>Submit Rating</Button>
                  <Button variant="outline" onClick={() => setShowRatingForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Dispute Form */}
          {gig.status === 'in_progress' && disputeReason && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <h3 className="font-semibold mb-4 text-red-700 dark:text-red-400">Raise Dispute</h3>
              <div className="space-y-4">
                <Textarea
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="Please describe the issue with the work delivered..."
                  rows={3}
                />
                <div className="flex space-x-2">
                  <Button variant="destructive" onClick={handleDispute}>
                    Submit Dispute
                  </Button>
                  <Button variant="outline" onClick={() => setDisputeReason('')}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GigDetails;
