
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  ArrowLeft, 
  Award, 
  Shield, 
  CheckCircle, 
  Clock, 
  FileCheck,
  Home,
  User,
  Plus,
  Eye,
  Download,
  Search,
  Star,
  Calendar,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const IssueCredentials = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [issuingCredential, setIssuingCredential] = useState(false);
  const [credentialForm, setCredentialForm] = useState({
    freelancerAddress: '',
    projectTitle: '',
    skillsVerified: [],
    completionDate: '',
    rating: 5,
    description: '',
    credentialType: 'completion'
  });

  const issuedCredentials = [
    {
      id: 1,
      freelancer: 'alex.eth',
      projectTitle: 'Mobile App Development',
      skills: ['React Native', 'JavaScript', 'API Integration'],
      rating: 5,
      issueDate: '2024-01-15',
      status: 'active',
      type: 'completion',
      description: 'Successfully delivered a high-quality mobile application with excellent user interface and functionality.'
    },
    {
      id: 2,
      freelancer: 'sarah.eth',
      projectTitle: 'Brand Identity Design',
      skills: ['UI/UX Design', 'Branding', 'Adobe Creative Suite'],
      rating: 4,
      issueDate: '2024-01-14',
      status: 'active',
      type: 'completion',
      description: 'Created outstanding brand identity with comprehensive design system and style guide.'
    },
    {
      id: 3,
      freelancer: 'mike.eth',
      projectTitle: 'Smart Contract Development',
      skills: ['Solidity', 'Ethereum', 'Web3.js'],
      rating: 5,
      issueDate: '2024-01-12',
      status: 'active',
      type: 'expertise',
      description: 'Demonstrated exceptional blockchain development skills with secure and gas-efficient smart contracts.'
    }
  ];

  const credentialStats = [
    { label: 'Total Issued', value: '47', icon: Award, color: 'bg-blue-500' },
    { label: 'This Month', value: '12', icon: Calendar, color: 'bg-green-500' },
    { label: 'Freelancers Certified', value: '28', icon: Users, color: 'bg-purple-500' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'bg-yellow-500' },
  ];

  const handleFormChange = (field: string, value: any) => {
    setCredentialForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIssueCredential = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentialForm.freelancerAddress || !credentialForm.projectTitle) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIssuingCredential(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setIssuingCredential(false);
      toast({
        title: "Credential Issued Successfully!",
        description: "The credential has been recorded on the blockchain and sent to the freelancer.",
      });
      
      // Reset form
      setCredentialForm({
        freelancerAddress: '',
        projectTitle: '',
        skillsVerified: [],
        completionDate: '',
        rating: 5,
        description: '',
        credentialType: 'completion'
      });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'revoked': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'completion': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'expertise': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'excellence': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Issue Credentials</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Issue blockchain-verified credentials to freelancers</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentialStats.map((stat, index) => (
              <Card key={index} className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
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
              { id: 'issue', label: 'Issue New' },
              { id: 'issued', label: 'Issued Credentials' }
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
          {activeTab === 'issue' && (
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Issue New Credential</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleIssueCredential} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="freelancerAddress">
                        Freelancer Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="freelancerAddress"
                        value={credentialForm.freelancerAddress}
                        onChange={(e) => handleFormChange('freelancerAddress', e.target.value)}
                        placeholder="alex.eth or 0x1234..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectTitle">
                        Project Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="projectTitle"
                        value={credentialForm.projectTitle}
                        onChange={(e) => handleFormChange('projectTitle', e.target.value)}
                        placeholder="E-commerce Platform Development"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="credentialType">Credential Type</Label>
                      <select
                        id="credentialType"
                        value={credentialForm.credentialType}
                        onChange={(e) => handleFormChange('credentialType', e.target.value)}
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="completion">Project Completion</option>
                        <option value="expertise">Skill Expertise</option>
                        <option value="excellence">Excellence Award</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <select
                        id="rating"
                        value={credentialForm.rating}
                        onChange={(e) => handleFormChange('rating', parseInt(e.target.value))}
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value={5}>5 Stars - Excellent</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Good</option>
                        <option value={2}>2 Stars - Fair</option>
                        <option value={1}>1 Star - Poor</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="completionDate">Completion Date</Label>
                      <Input
                        id="completionDate"
                        type="date"
                        value={credentialForm.completionDate}
                        onChange={(e) => handleFormChange('completionDate', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills Verified</Label>
                      <Input
                        id="skills"
                        placeholder="React, Node.js, TypeScript (comma separated)"
                        onChange={(e) => handleFormChange('skillsVerified', e.target.value.split(',').map(s => s.trim()))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={credentialForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      placeholder="Describe the work completed and skills demonstrated..."
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={issuingCredential}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {issuingCredential ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Issuing Credential...
                        </>
                      ) : (
                        <>
                          <Award className="w-4 h-4 mr-2" />
                          Issue Credential
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === 'issued' && (
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Issued Credentials</CardTitle>
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
                  {issuedCredentials.map((credential) => (
                    <div key={credential.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {credential.projectTitle}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Issued to {credential.freelancer}
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                              {Array.from({ length: credential.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                              ))}
                              <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                                {credential.rating}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getTypeColor(credential.type)}>
                            {credential.type}
                          </Badge>
                          <Badge className={getStatusColor(credential.status)}>
                            {credential.status}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {credential.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {credential.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Issued on {credential.issueDate}
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Recent Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {issuedCredentials.slice(0, 3).map((credential) => (
                      <div key={credential.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Award className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {credential.freelancer}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                              {credential.projectTitle}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: credential.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Credentials
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={() => setActiveTab('issue')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Issue New Credential
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Verify Existing Credential
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Blockchain Verification
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Credentials
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

export default IssueCredentials;
