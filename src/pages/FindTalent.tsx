
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Shield,
  Home,
  User,
  MessageCircle,
  Heart,
  Briefcase,
  Award
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const FindTalent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const freelancers = [
    {
      id: 1,
      name: 'alex.eth',
      title: 'Full Stack Developer',
      location: 'San Francisco, CA',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 85,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      description: 'Experienced full-stack developer with 5+ years building scalable web applications. Specialized in React, Node.js, and cloud architecture.',
      availability: 'Available now',
      completedJobs: 89,
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'sarah.eth',
      title: 'UI/UX Designer',
      location: 'New York, NY',
      rating: 4.8,
      reviews: 94,
      hourlyRate: 75,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      description: 'Creative designer focused on user-centered design and modern interfaces. Expert in creating intuitive user experiences.',
      availability: 'Available in 1 week',
      completedJobs: 67,
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'mike.eth',
      title: 'Blockchain Developer',
      location: 'Remote',
      rating: 5.0,
      reviews: 156,
      hourlyRate: 120,
      skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
      description: 'Blockchain specialist with deep expertise in DeFi protocols and smart contract development. 3+ years in Web3.',
      availability: 'Available now',
      completedJobs: 112,
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'emma.eth',
      title: 'Data Scientist',
      location: 'London, UK',
      rating: 4.7,
      reviews: 73,
      hourlyRate: 95,
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      description: 'Data scientist with expertise in ML models and predictive analytics. Strong background in fintech and healthcare.',
      availability: 'Available in 2 weeks',
      completedJobs: 45,
      avatar: '/placeholder.svg'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'writing', label: 'Writing' }
  ];

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           freelancer.title.toLowerCase().includes(selectedCategory.replace('-', ' '));
    
    return matchesSearch && matchesCategory;
  });

  const handleMessage = (freelancerName: string) => {
    toast({
      title: "Starting Conversation",
      description: `Opening chat with ${freelancerName}...`,
    });
    navigate('/messages');
  };

  const handleViewProfile = (freelancerId: number) => {
    navigate(`/freelancer/${freelancerId}`);
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Talent</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Discover and hire top freelancers for your projects</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, skills, or expertise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex space-x-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <Card key={freelancer.id} className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {freelancer.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">{freelancer.title}</p>
                        </div>
                        <Button variant="outline" size="icon">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{freelancer.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{freelancer.rating}</span>
                          <span>({freelancer.reviews} reviews)</span>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {freelancer.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {freelancer.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-medium">${freelancer.hourlyRate}/hr</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                            <span>{freelancer.completedJobs} jobs</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMessage(freelancer.name)}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            onClick={() => handleViewProfile(freelancer.id)}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 mt-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {freelancer.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFreelancers.length === 0 && (
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No freelancers found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search criteria or browse all categories
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindTalent;
