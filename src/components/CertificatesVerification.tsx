
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  Shield, 
  ExternalLink, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Star,
  Trophy,
  FileText,
  ShieldCheck,
  Download,
  Eye,
  Plus,
  Search,
  Filter,
  Home,
  Camera,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  category: string;
  status: 'verified' | 'pending' | 'rejected';
  issueDate: string;
  validUntil?: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  blockchainHash: string;
  ipfsHash: string;
  credentialType: 'skill' | 'education' | 'certification' | 'achievement';
}

interface SkillAssessment {
  skill: string;
  progress: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  nextTest: 'Available' | 'In Progress' | 'Completed';
  timeRemaining?: number;
  questionsCompleted?: number;
  totalQuestions?: number;
}

const CertificatesVerification = () => {
  const [activeTab, setActiveTab] = useState('my-certificates');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending' | 'rejected'>('all');
  const [verificationId, setVerificationId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [skillTimers, setSkillTimers] = useState<{[key: string]: number}>({});
  const [activeAssessments, setActiveAssessments] = useState<{[key: string]: boolean}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrInputRef = useRef<HTMLInputElement>(null);

  const [certificates, setCertificates] = useState<CertificateData[]>([
    {
      id: '1',
      title: 'Advanced React Development',
      issuer: 'Meta (Facebook)',
      category: 'Frontend Development',
      status: 'verified',
      issueDate: '2024-01-10',
      validUntil: '2026-01-10',
      skillLevel: 'Advanced',
      blockchainHash: '0x4f3c2b1a9e8d7c6b5a4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0',
      ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      credentialType: 'certification'
    },
    {
      id: '2',
      title: 'Blockchain Fundamentals',
      issuer: 'Ethereum Foundation',
      category: 'Blockchain',
      status: 'verified',
      issueDate: '2023-12-15',
      skillLevel: 'Intermediate',
      blockchainHash: '0x7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4',
      ipfsHash: 'QmPK1s3x4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4',
      credentialType: 'education'
    },
    {
      id: '3',
      title: 'Smart Contract Security Audit',
      issuer: 'OpenZeppelin',
      category: 'Security',
      status: 'pending',
      issueDate: '2024-01-14',
      skillLevel: 'Expert',
      blockchainHash: 'pending',
      ipfsHash: 'pending',
      credentialType: 'skill'
    },
    {
      id: '4',
      title: 'UI/UX Design Excellence',
      issuer: 'Google Design',
      category: 'Design',
      status: 'verified',
      issueDate: '2023-11-20',
      validUntil: '2025-11-20',
      skillLevel: 'Advanced',
      blockchainHash: '0x2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b',
      ipfsHash: 'QmVs9k2j3h4g5f6d7s8a9z0x1c2v3b4n5m6l7k8j9h0g1f2e3d4c5b6a7z8y9x0w1v2u3t4',
      credentialType: 'achievement'
    }
  ]);

  const [skillAssessments, setSkillAssessments] = useState<SkillAssessment[]>([
    { skill: 'JavaScript', progress: 85, level: 'Advanced', nextTest: 'Available' },
    { skill: 'React', progress: 92, level: 'Expert', nextTest: 'Completed' },
    { skill: 'Node.js', progress: 78, level: 'Intermediate', nextTest: 'Available' },
    { skill: 'Solidity', progress: 65, level: 'Intermediate', nextTest: 'In Progress', timeRemaining: 1800, questionsCompleted: 15, totalQuestions: 25 },
    { skill: 'Web3.js', progress: 45, level: 'Beginner', nextTest: 'Available' }
  ]);

  const achievements = [
    { title: 'Top Rated Freelancer', description: 'Maintained 4.9+ rating for 6 months', date: '2024-01-01', rarity: 'Rare' },
    { title: 'Early Adopter', description: 'Joined GigChain in beta phase', date: '2023-08-15', rarity: 'Legendary' },
    { title: 'Smart Contract Expert', description: 'Completed 50+ blockchain projects', date: '2023-12-20', rarity: 'Epic' },
    { title: 'Community Contributor', description: 'Helped onboard 100+ new users', date: '2023-11-10', rarity: 'Common' }
  ];

  // Filter certificates based on search and status
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleUploadCertificate = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCert: CertificateData = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        issuer: 'Uploaded Certificate',
        category: 'General',
        status: 'pending',
        issueDate: new Date().toISOString().split('T')[0],
        skillLevel: 'Beginner',
        blockchainHash: 'pending',
        ipfsHash: 'pending',
        credentialType: 'certification'
      };

      setCertificates(prev => [...prev, newCert]);
      
      toast({
        title: "Certificate Uploaded",
        description: `${file.name} has been uploaded and is pending verification.`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload certificate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleTakeAssessment = () => {
    const availableSkills = skillAssessments.filter(s => s.nextTest === 'Available');
    if (availableSkills.length > 0) {
      handleStartSkillTest(availableSkills[0].skill);
    } else {
      toast({
        title: "No Assessments Available",
        description: "Complete current assessments or wait for new ones to become available.",
      });
    }
  };

  const handleViewCertificate = (certId: string) => {
    const cert = certificates.find(c => c.id === certId);
    if (cert) {
      // Create a detailed view modal or new page
      toast({
        title: "Certificate Details",
        description: `Viewing ${cert.title} - Status: ${cert.status}`,
      });
    }
  };

  const handleDownloadCertificate = async (certId: string, title: string) => {
    try {
      // Simulate PDF generation and download
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a blob URL for download simulation
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Certificate: ${title}\nID: ${certId}`));
      element.setAttribute('download', `${title.replace(/\s+/g, '_')}_Certificate.pdf`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Download Complete",
        description: `${title} certificate downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download certificate. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleVerifyCertificate = async (certId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Verification Complete",
        description: `Certificate ${certId} is authentic and verified on blockchain.`,
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Unable to verify certificate at this time.",
        variant: "destructive"
      });
    }
  };

  const handleVerifyById = async () => {
    if (!verificationId.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid certificate ID or blockchain hash.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate verification result
      const isValid = Math.random() > 0.3; // 70% success rate
      
      if (isValid) {
        toast({
          title: "Verification Successful",
          description: `Certificate ${verificationId} is valid and verified on blockchain.`,
        });
      } else {
        toast({
          title: "Verification Failed",
          description: `Certificate ${verificationId} could not be verified or does not exist.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "Unable to complete verification. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleStartSkillTest = (skill: string) => {
    setActiveAssessments(prev => ({ ...prev, [skill]: true }));
    setSkillTimers(prev => ({ ...prev, [skill]: 1800 })); // 30 minutes
    
    // Update assessment status
    setSkillAssessments(prev => prev.map(assessment => 
      assessment.skill === skill 
        ? { ...assessment, nextTest: 'In Progress', timeRemaining: 1800, questionsCompleted: 0, totalQuestions: 25 }
        : assessment
    ));

    // Start timer
    const timer = setInterval(() => {
      setSkillTimers(current => {
        const newTime = (current[skill] || 0) - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          handleCompleteSkillTest(skill);
          return { ...current, [skill]: 0 };
        }
        return { ...current, [skill]: newTime };
      });
    }, 1000);
    
    toast({
      title: "Assessment Started",
      description: `${skill} assessment has begun. You have 30 minutes to complete.`,
    });
  };

  const handleContinueSkillTest = (skill: string) => {
    const assessment = skillAssessments.find(a => a.skill === skill);
    if (assessment) {
      toast({
        title: "Assessment Resumed",
        description: `Continuing ${skill} assessment. ${assessment.questionsCompleted}/${assessment.totalQuestions} completed.`,
      });
    }
  };

  const handleCompleteSkillTest = (skill: string) => {
    setActiveAssessments(prev => ({ ...prev, [skill]: false }));
    
    // Simulate completion with score
    const score = Math.floor(Math.random() * 40) + 60; // 60-100%
    
    setSkillAssessments(prev => prev.map(assessment => 
      assessment.skill === skill 
        ? { 
            ...assessment, 
            progress: score, 
            nextTest: 'Completed',
            level: score >= 90 ? 'Expert' : score >= 75 ? 'Advanced' : score >= 60 ? 'Intermediate' : 'Beginner'
          }
        : assessment
    ));
    
    toast({
      title: "Assessment Complete",
      description: `${skill} assessment completed with ${score}% score!`,
    });
  };

  const handleQRUpload = () => {
    if (qrInputRef.current) {
      qrInputRef.current.click();
    }
  };

  const handleQRFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate QR code reading
      const mockCertId = 'QR_' + Date.now();
      setVerificationId(mockCertId);
      
      toast({
        title: "QR Code Processed",
        description: "Certificate ID extracted from QR code successfully.",
      });
    } catch (error) {
      toast({
        title: "QR Processing Failed",
        description: "Unable to read QR code. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-purple-100 text-purple-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'Epic': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Rare': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Common': return 'bg-gradient-to-r from-gray-500 to-gray-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        className="hidden"
      />
      <input
        type="file"
        ref={qrInputRef}
        onChange={handleQRFileUpload}
        accept="image/*"
        className="hidden"
      />

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
              <span className="text-gray-600">Certificates & Verification</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <Link to="/freelancer-dashboard">
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Link to="/wallet">
                  Wallet
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Certificates & Verification</h1>
              <p className="text-gray-600 mt-1">Manage your blockchain-verified credentials and achievements</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={handleUploadCertificate} 
                disabled={uploading}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Certificate'}
              </Button>
              <Button onClick={handleTakeAssessment} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Take Assessment
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                    <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Verified</p>
                    <p className="text-2xl font-bold text-green-600">{certificates.filter(c => c.status === 'verified').length}</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Skill Level</p>
                    <p className="text-2xl font-bold text-purple-600">Expert</p>
                  </div>
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Achievements</p>
                    <p className="text-2xl font-bold text-orange-600">{achievements.length}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="my-certificates">My Certificates</TabsTrigger>
              <TabsTrigger value="skill-assessments">Skill Assessments</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>

            {/* My Certificates Tab */}
            <TabsContent value="my-certificates" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold">My Certificates</CardTitle>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                          placeholder="Search certificates..." 
                          className="pl-10 w-64" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 rounded-md bg-white"
                      >
                        <option value="all">All Status</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredCertificates.map((cert) => (
                      <Card key={cert.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <Award className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{cert.title}</h3>
                                <p className="text-gray-600">{cert.issuer}</p>
                              </div>
                            </div>
                            {getStatusIcon(cert.status)}
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Category</span>
                              <Badge variant="outline">{cert.category}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Skill Level</span>
                              <Badge className={getLevelColor(cert.skillLevel)}>
                                {cert.skillLevel}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Status</span>
                              <Badge className={getStatusColor(cert.status)}>
                                {cert.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Issue Date</span>
                              <span className="text-sm">{cert.issueDate}</span>
                            </div>
                            {cert.validUntil && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Valid Until</span>
                                <span className="text-sm">{cert.validUntil}</span>
                              </div>
                            )}
                          </div>

                          {cert.status === 'verified' && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-2">Blockchain Verification:</p>
                              <div className="space-y-1">
                                <code className="text-xs bg-white px-2 py-1 rounded block break-all">
                                  Hash: {cert.blockchainHash.slice(0, 20)}...
                                </code>
                                <code className="text-xs bg-white px-2 py-1 rounded block break-all">
                                  IPFS: {cert.ipfsHash.slice(0, 20)}...
                                </code>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center space-x-2 mt-4">
                            <Button size="sm" className="flex-1 bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleViewCertificate(cert.id)}>
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDownloadCertificate(cert.id, cert.title)}>
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleVerifyCertificate(cert.id)}>
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Verify
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skill Assessments Tab */}
            <TabsContent value="skill-assessments" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Skill Assessment Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillAssessments.map((skill, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{skill.skill}</h3>
                            <Badge className={getLevelColor(skill.level)}>
                              {skill.level}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{skill.progress}%</p>
                            <p className="text-sm text-gray-600">{skill.nextTest}</p>
                            {skill.nextTest === 'In Progress' && skillTimers[skill.skill] && (
                              <p className="text-sm text-red-600 font-mono">
                                Time: {formatTime(skillTimers[skill.skill])}
                              </p>
                            )}
                          </div>
                        </div>
                        <Progress value={skill.progress} className="h-3 mb-3" />
                        
                        {skill.nextTest === 'In Progress' && skill.questionsCompleted !== undefined && (
                          <div className="mb-3 text-sm text-gray-600">
                            Progress: {skill.questionsCompleted}/{skill.totalQuestions} questions completed
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {skill.progress < 100 ? 'Continue Assessment' : 'Assessment Complete'}
                          </span>
                          <div className="flex space-x-2">
                            {skill.nextTest === 'In Progress' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleContinueSkillTest(skill.skill)}
                                >
                                  <Play className="w-4 h-4 mr-1" />
                                  Continue
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleCompleteSkillTest(skill.skill)}
                                >
                                  <Pause className="w-4 h-4 mr-1" />
                                  Submit
                                </Button>
                              </>
                            )}
                            {skill.nextTest === 'Available' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleStartSkillTest(skill.skill)}
                              >
                                <Play className="w-4 h-4 mr-1" />
                                Start Test
                              </Button>
                            )}
                            {skill.nextTest === 'Completed' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSkillAssessments(prev => prev.map(a => 
                                    a.skill === skill.skill ? { ...a, nextTest: 'Available', progress: 0 } : a
                                  ));
                                }}
                              >
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Retake
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Unlocked Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`w-16 h-16 ${getRarityColor(achievement.rarity)} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-lg">{achievement.title}</h3>
                                <Badge className={`${getRarityColor(achievement.rarity)} text-white`}>
                                  {achievement.rarity}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-3">{achievement.description}</p>
                              <p className="text-sm text-gray-500">Unlocked: {achievement.date}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Verification Tab */}
            <TabsContent value="verification" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Verify Credentials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Verify by Certificate ID</h3>
                      <Input 
                        placeholder="Enter certificate ID or blockchain hash" 
                        value={verificationId}
                        onChange={(e) => setVerificationId(e.target.value)}
                      />
                      <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={handleVerifyById}>
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Verify Certificate
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Verify by QR Code</h3>
                      <div className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                          <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 text-sm">Upload QR code image</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" onClick={handleQRUpload}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload QR Code
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Verification Information</h4>
                    <p className="text-blue-800 text-sm">
                      All certificates on GigChain are stored on the blockchain and IPFS for permanent verification. 
                      Use the tools above to verify the authenticity of any certificate.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CertificatesVerification;
