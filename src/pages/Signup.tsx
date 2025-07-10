
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Wallet, 
  Mail, 
  Phone, 
  Github, 
  Chrome, 
  Shield, 
  User, 
  Building, 
  Settings,
  IdCard,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userRole, setUserRole] = useState<'freelancer' | 'client' | 'admin' | null>(null);
  const [authStep, setAuthStep] = useState<'role-select' | 'signup' | 'verify'>('role-select');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: ''
  });
  const navigate = useNavigate();

  const roles = [
    {
      id: 'freelancer',
      title: 'Freelancer',
      icon: User,
      description: 'Join as a talented professional',
      features: ['Build your portfolio', 'Get verified credentials', 'Earn crypto payments', 'Global opportunities']
    },
    {
      id: 'client',
      title: 'Client',
      icon: Building,
      description: 'Hire top talent with confidence',
      features: ['Post projects', 'Escrow protection', 'Quality assurance', 'Verified professionals']
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: Settings,
      description: 'Manage platform operations',
      features: ['User management', 'Dispute resolution', 'Analytics dashboard', 'System controls']
    }
  ];

  const handleRoleSelect = (role: 'freelancer' | 'client' | 'admin') => {
    setUserRole(role);
    setAuthStep('signup');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = () => {
    console.log('Signing up with:', formData, 'as', userRole);
    setAuthStep('verify');
  };

  const handleWalletConnect = (wallet: string) => {
    console.log(`Connecting to ${wallet}...`);
    setAuthStep('verify');
  };

  const completeSignup = () => {
    const dashboardRoutes = {
      freelancer: '/freelancer-dashboard',
      client: '/client-dashboard',
      admin: '/admin-dashboard'
    };
    navigate(dashboardRoutes[userRole!]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
      </div>
      
      {/* Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GigChain
            </CardTitle>
          </div>
          <p className="text-white/70">
            {authStep === 'role-select' && 'Choose your role to get started'}
            {authStep === 'signup' && `Create your ${userRole} account`}
            {authStep === 'verify' && 'Welcome to the future of work!'}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {authStep === 'role-select' && (
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role) => (
                <Card 
                  key={role.id}
                  className="cursor-pointer hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-sm border-white/10 hover:border-blue-400/50 hover:shadow-xl"
                  onClick={() => handleRoleSelect(role.id as any)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <role.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{role.title}</h3>
                    <p className="text-white/60 mb-4">{role.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {role.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {authStep === 'signup' && (
            <div className="max-w-md mx-auto">
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20">
                  <TabsTrigger value="email" className="data-[state=active]:bg-blue-500">Email</TabsTrigger>
                  <TabsTrigger value="wallet" className="data-[state=active]:bg-blue-500">Wallet</TabsTrigger>
                  <TabsTrigger value="social" className="data-[state=active]:bg-blue-500">Social</TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-white">Full Name</Label>
                      <Input 
                        id="fullName" 
                        type="text" 
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username" className="text-white">Username</Label>
                      <Input 
                        id="username" 
                        type="text" 
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={handleSignup}>
                      Create Account
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="wallet" className="space-y-4 mt-6">
                  <div className="space-y-3">
                    {[
                      { name: 'MetaMask', icon: '🦊', popular: true },
                      { name: 'WalletConnect', icon: '🔗', popular: false },
                      { name: 'Coinbase Wallet', icon: '🔵', popular: false }
                    ].map((wallet, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full h-14 bg-white/5 border-white/20 hover:bg-white/10 text-white justify-start"
                        onClick={() => handleWalletConnect(wallet.name)}
                      >
                        <span className="text-2xl mr-3">{wallet.icon}</span>
                        <div className="text-left">
                          <div className="flex items-center space-x-2">
                            <span>{wallet.name}</span>
                            {wallet.popular && <Badge className="bg-blue-500 text-xs">Popular</Badge>}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                      <Chrome className="w-4 h-4 mr-2" />
                      Google
                    </Button>
                    <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                      <IdCard className="w-4 h-4 mr-2" />
                      Aadhaar
                    </Button>
                    <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                      <Phone className="w-4 h-4 mr-2" />
                      OTP
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between items-center mt-6">
                <Button 
                  variant="ghost" 
                  className="text-white/60 hover:text-white"
                  onClick={() => setAuthStep('role-select')}
                >
                  ← Change Role
                </Button>
                <Link to="/login" className="text-blue-400 hover:text-blue-300 text-sm">
                  Already have an account?
                </Link>
              </div>
            </div>
          )}

          {authStep === 'verify' && (
            <div className="text-center space-y-6 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">Account Created Successfully!</h3>
                <p className="text-white/70">
                  Welcome to GigChain! Your decentralized journey begins now.
                </p>
              </div>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={completeSignup}
                >
                  Continue to Dashboard
                </Button>
                <Button variant="outline" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10">
                  Complete Profile Setup
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
