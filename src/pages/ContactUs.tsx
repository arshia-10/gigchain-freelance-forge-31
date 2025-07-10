
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Shield,
  Home,
  Twitter,
  Github,
  Linkedin,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@gigchain.com',
      description: 'Send us an email anytime!'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      content: 'Available 24/7',
      description: 'Chat with our support team'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: MapPin,
      title: 'Office',
      content: 'San Francisco, CA',
      description: '123 Blockchain Street'
    }
  ];

  const socialLinks = [
    { icon: Twitter, name: 'Twitter', url: 'https://twitter.com/gigchain' },
    { icon: Github, name: 'GitHub', url: 'https://github.com/gigchain' },
    { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com/company/gigchain' },
    { icon: Globe, name: 'Website', url: 'https://gigchain.com' }
  ];

  const faqs = [
    {
      question: 'How do I get started on GigChain?',
      answer: 'Simply connect your Web3 wallet, choose your role (freelancer, client, or admin), and complete your profile setup.'
    },
    {
      question: 'What cryptocurrencies are supported?',
      answer: 'We support major cryptocurrencies including ETH, USDC, USDT, and many others on Ethereum and Polygon networks.'
    },
    {
      question: 'How does the escrow system work?',
      answer: 'Smart contracts automatically hold payments in escrow until project milestones are completed, ensuring secure transactions for both parties.'
    },
    {
      question: 'Can I verify my credentials on-chain?',
      answer: 'Yes! We support Soul Bound Tokens (SBTs) and other verifiable credentials that are stored permanently on the blockchain.'
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
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about GigChain? We're here to help you succeed in the decentralized gig economy.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{info.content}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Follow Us</h2>
                <p className="text-gray-600 dark:text-gray-300">Stay connected with the GigChain community</p>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 bg-white/50 dark:bg-black/50 hover:bg-blue-500 hover:text-white transition-colors"
                      asChild
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <social.icon className="w-5 h-5" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <Clock className="w-6 h-6 mr-2" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
                  <p className="text-gray-600 dark:text-gray-300">24/7 Available</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
                  <p className="text-gray-600 dark:text-gray-300">Response within 2 hours</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h3>
                  <p className="text-gray-600 dark:text-gray-300">Mon-Fri, 8AM-5PM PST</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
