
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  Plus,
  Edit,
  Home,
  Shield,
  Camera,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const skills = ['React', 'TypeScript', 'Node.js', 'Web3', 'Solidity', 'UI/UX Design'];
  const credentials = [
    { name: 'Blockchain Developer Certificate', issuer: 'ConsenSys Academy', date: '2023', verified: true },
    { name: 'React Advanced Certification', issuer: 'Meta', date: '2023', verified: true },
    { name: 'Smart Contract Auditor', issuer: 'OpenZeppelin', date: '2022', verified: true }
  ];

  const workHistory = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp',
      period: '2022 - Present',
      description: 'Led development of decentralized applications and smart contracts'
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      period: '2020 - 2022',
      description: 'Built responsive web applications using React and TypeScript'
    }
  ];

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
                <Link to="/freelancer-dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alex Johnson</h1>
                      <p className="text-xl text-gray-600 dark:text-gray-300">Full Stack Blockchain Developer</p>
                      <div className="flex items-center justify-center md:justify-start space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          San Francisco, CA
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          4.9 (127 reviews)
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="mt-4 md:mt-0"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Save' : 'Edit Profile'}
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-center md:justify-start space-x-4">
                    <Button variant="outline" size="sm">
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                    <Button variant="outline" size="sm">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea 
                  placeholder="Tell us about yourself..."
                  className="min-h-[100px]"
                  defaultValue="Passionate blockchain developer with 5+ years of experience building decentralized applications. Specialized in smart contract development, DeFi protocols, and Web3 integrations. I love creating innovative solutions that push the boundaries of what's possible in the decentralized web."
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  Passionate blockchain developer with 5+ years of experience building decentralized applications. 
                  Specialized in smart contract development, DeFi protocols, and Web3 integrations. I love creating 
                  innovative solutions that push the boundaries of what's possible in the decentralized web.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue="alex@example.com" 
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  defaultValue="+1 (555) 123-4567" 
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  defaultValue="San Francisco, CA" 
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input 
                  id="timezone" 
                  defaultValue="PST (UTC-8)" 
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Work History */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Work History
                </CardTitle>
                {isEditing && (
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workHistory.map((job, index) => (
                  <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                        <p className="text-blue-600 dark:text-blue-400">{job.company}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {job.period}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{job.description}</p>
                      </div>
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verifiable Credentials */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Verifiable Credentials (SBTs)
                </CardTitle>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/certificates">
                    View All
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {credentials.map((cred, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{cred.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{cred.issuer}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{cred.date}</p>
                      </div>
                      {cred.verified && (
                        <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
