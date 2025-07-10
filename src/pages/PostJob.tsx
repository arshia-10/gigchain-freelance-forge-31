
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
  DollarSign, 
  Calendar, 
  FileText, 
  Plus,
  X,
  Shield,
  Home,
  User,
  Lock,
  Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const PostJob = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isPosting, setIsPosting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    category: '',
    skills: [] as string[],
    experienceLevel: 'intermediate'
  });
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.description || !formData.budget || !formData.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsPosting(true);

    // Simulate smart contract deployment and escrow
    try {
      // Simulate contract interaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Smart Contract Deployed!",
        description: `Gig posted successfully! Funds ($${formData.budget}) are now held in escrow.`,
      });

      // Add job to local storage (simulating blockchain)
      const existingJobs = JSON.parse(localStorage.getItem('clientJobs') || '[]');
      const newJob = {
        id: Date.now(),
        ...formData,
        status: 'active',
        postedDate: new Date().toISOString(),
        applications: [],
        contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
        escrowAmount: formData.budget
      };
      
      localStorage.setItem('clientJobs', JSON.stringify([...existingJobs, newJob]));

      // Reset form
      setFormData({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        category: '',
        skills: [],
        experienceLevel: 'intermediate'
      });

      // Navigate back to dashboard after success
      setTimeout(() => {
        navigate('/client-dashboard');
      }, 1500);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deploy smart contract. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPosting(false);
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/client-dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Post a New Gig</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Create a smart contract-powered gig with automatic escrow</p>
            </div>
          </div>

          {/* Smart Contract Info */}
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">Smart Contract Escrow</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your funds will be automatically held in escrow until the gig is completed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Form */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Gig Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Gig Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Full Stack Developer for E-commerce Platform"
                    className="w-full"
                    disabled={isPosting}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Gig Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Provide a detailed description of the gig requirements, expectations, and deliverables..."
                    rows={6}
                    className="w-full"
                    disabled={isPosting}
                  />
                </div>

                {/* Budget and Deadline Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm font-medium">
                      Budget (USD) <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="budget"
                        type="number"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        placeholder="5000"
                        className="pl-10"
                        disabled={isPosting}
                      />
                    </div>
                    <p className="text-xs text-gray-500">This amount will be held in smart contract escrow</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="text-sm font-medium">
                      Deadline <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                        className="pl-10"
                        disabled={isPosting}
                      />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    disabled={isPosting}
                  >
                    <option value="">Select a category</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="design">Design & Creative</option>
                    <option value="writing">Writing & Translation</option>
                    <option value="marketing">Marketing & Sales</option>
                    <option value="blockchain">Blockchain & Crypto</option>
                    <option value="data-science">Data Science & AI</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Required Skills</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      disabled={isPosting}
                    />
                    <Button type="button" onClick={addSkill} size="sm" disabled={isPosting}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Experience Level</Label>
                  <div className="flex space-x-4">
                    {['beginner', 'intermediate', 'expert'].map((level) => (
                      <label key={level} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="experienceLevel"
                          value={level}
                          checked={formData.experienceLevel === level}
                          onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                          disabled={isPosting}
                        />
                        <span className="text-sm capitalize">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button type="button" variant="outline" asChild disabled={isPosting}>
                    <Link to="/client-dashboard">Cancel</Link>
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isPosting}
                  >
                    {isPosting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Deploying Contract...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Deploy Smart Contract & Post Gig
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
