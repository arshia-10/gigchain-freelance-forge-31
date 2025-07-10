
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Building, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'freelancer',
      title: 'Freelancer',
      icon: User,
      description: 'Join as a talented professional',
      features: ['Build portfolio', 'Get credentials', 'Earn crypto']
    },
    {
      id: 'client',
      title: 'Client',
      icon: Building,
      description: 'Hire top talent with confidence',
      features: ['Post projects', 'Escrow protection', 'Quality assurance']
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: Settings,
      description: 'Manage platform operations',
      features: ['User management', 'Analytics', 'System controls']
    }
  ];

  const handleRoleSelect = (action: 'login' | 'signup') => {
    onClose();
    navigate(`/${action}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white/10 backdrop-blur-xl border-white/20 text-white">
        <DialogHeader>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Join GigChain
            </DialogTitle>
          </div>
          <p className="text-white/70 text-center">
            Choose how you'd like to get started
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card 
                key={role.id}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <role.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{role.title}</h3>
                  <p className="text-white/60 mb-4 text-sm">{role.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => handleRoleSelect('signup')}
            >
              Create Account
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              onClick={() => handleRoleSelect('login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
