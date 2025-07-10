
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  ArrowRight, 
  Shield, 
  Globe, 
  Zap, 
  Award,
  Users,
  DollarSign,
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  Wallet,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Shield,
      title: "Secure Smart Contracts",
      description: "Automated escrow payments with blockchain security"
    },
    {
      icon: Globe,
      title: "Global Talent Pool",
      description: "Connect with freelancers worldwide without borders"
    },
    {
      icon: Zap,
      title: "Instant Payments",
      description: "Fast crypto payments with minimal fees"
    },
    {
      icon: Award,
      title: "Verifiable Credentials",
      description: "Soul Bound Tokens for permanent skill verification"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Projects Completed", value: "25K+", icon: CheckCircle },
    { label: "Total Earned", value: "$10M+", icon: DollarSign },
    { label: "Average Rating", value: "4.9", icon: Star }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Blockchain Developer",
      content: "GigChain revolutionized my freelancing career. The secure payments and verifiable credentials give me confidence in every project.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Startup Founder",
      content: "Finding quality blockchain developers was never easier. The platform's reputation system ensures I hire the right talent.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Smart Contract Auditor",
      content: "The escrow system eliminates payment worries. I can focus on delivering quality work knowing I'll be paid fairly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GigChain
                </span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Home
                </Link>
                <Link to="/marketplace" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Marketplace
                </Link>
                <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About
                </a>
                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Features
                </a>
                <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="outline" onClick={() => setIsAuthModalOpen(true)}>
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => setIsAuthModalOpen(true)}>
                  Get Started
                </Button>
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 bg-white/90 dark:bg-black/90 backdrop-blur-md">
              <div className="px-4 py-6 space-y-4">
                <Link to="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Home
                </Link>
                <Link to="/marketplace" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Marketplace
                </Link>
                <a href="#about" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About
                </a>
                <a href="#features" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Features
                </a>
                <Link to="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" onClick={() => setIsAuthModalOpen(true)}>
                    Sign In
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => setIsAuthModalOpen(true)}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
              🚀 The Future of Freelancing is Here
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Decentralized
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Freelance Platform
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect, collaborate, and get paid securely with blockchain technology. 
              Build your reputation with verifiable credentials and enjoy instant crypto payments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Start Earning Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Why Choose GigChain?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the next generation of freelancing with blockchain-powered features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Building the Future of Work
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                GigChain is revolutionizing the freelance economy by combining the power of blockchain 
                technology with modern user experience. Our platform ensures trust, transparency, 
                and fair compensation for all participants.
              </p>
              <div className="space-y-4">
                {[
                  "Decentralized identity and reputation system",
                  "Smart contract-based escrow protection",
                  "Verifiable credentials using Soul Bound Tokens",
                  "Global accessibility with crypto payments"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Learn More About Our Vision
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Shield className="w-24 h-24 text-blue-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Blockchain Secured
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 px-6">
                    Every transaction and credential is secured by blockchain technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of freelancers and clients already using GigChain
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join the Future?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start your decentralized freelancing journey today and experience the power of blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign Up as Freelancer
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Post a Job
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/70 dark:bg-black/70 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GigChain
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                The decentralized freelance platform powered by blockchain technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/marketplace" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Find Work</Link></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Post Jobs</a></li>
                <li><Link to="/certificates" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Credentials</Link></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Help Center</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">API Docs</a></li>
                <li><Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              © 2024 GigChain. All rights reserved. Built with ❤️ for the decentralized future.
            </p>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;
