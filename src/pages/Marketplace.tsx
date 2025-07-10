
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Star, 
  MapPin, 
  Briefcase,
  Home,
  Heart,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const gigs = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      description: 'Looking for a skilled developer to build a modern e-commerce platform with React and Node.js',
      budget: '$2,500 - $5,000',
      duration: '2-3 months',
      client: 'TechCorp Inc.',
      rating: 4.8,
      location: 'Remote',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      posted: '2 hours ago',
      proposals: 12,
      category: 'web-development'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'Need a creative designer to design mobile app interfaces for iOS and Android',
      budget: '$1,200 - $2,000',
      duration: '1 month',
      client: 'StartupXYZ',
      rating: 4.6,
      location: 'Remote',
      skills: ['Figma', 'UI Design', 'Mobile Design', 'Prototyping'],
      posted: '5 hours ago',
      proposals: 8,
      category: 'design'
    },
    {
      id: 3,
      title: 'Smart Contract Development',
      description: 'Experienced blockchain developer needed for NFT marketplace smart contracts',
      budget: '$3,000 - $7,000',
      duration: '1-2 months',
      client: 'CryptoDAO',
      rating: 4.9,
      location: 'Remote',
      skills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts'],
      posted: '1 day ago',
      proposals: 15,
      category: 'blockchain'
    },
    {
      id: 4,
      title: 'Content Writing for Tech Blog',
      description: 'Looking for technical writers to create engaging content about emerging technologies',
      budget: '$500 - $1,000',
      duration: '2 weeks',
      client: 'TechBlog Media',
      rating: 4.7,
      location: 'Remote',
      skills: ['Technical Writing', 'SEO', 'Research', 'Content Strategy'],
      posted: '3 hours ago',
      proposals: 6,
      category: 'writing'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'design', name: 'Design' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'writing', name: 'Writing' }
  ];

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || gig.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="backdrop-blur-md bg-white/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GigChain
                </span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <span className="text-gray-600">Marketplace</span>
            </div>
            <Button variant="outline" asChild>
              <Link to="/freelancer-dashboard">
                <Home className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Gig</h1>
            <p className="text-gray-600">Discover opportunities that match your skills</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search gigs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Gigs Grid */}
          <div className="grid gap-6">
            {filteredGigs.map((gig) => (
              <Card key={gig.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{gig.title}</CardTitle>
                        <Badge variant="secondary">{gig.posted}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{gig.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {gig.budget}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {gig.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {gig.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {gig.proposals} proposals
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {gig.rating}
                      </div>
                      <p className="text-sm text-gray-600">{gig.client}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {gig.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                        Submit Proposal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
