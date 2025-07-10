import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Shield,
  Home,
  User,
  MessageCircle,
  Briefcase,
  Award,
  Calendar,
  ExternalLink,
  Heart,
  Check,
  Trophy,
  Globe,
  Mail,
  Phone,
  Github,
  Linkedin
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  // Sample freelancer data - in a real app, this would come from an API
  const freelancer = {
    id: 1,
    name: 'alex.eth',
    title: 'Full Stack Developer',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker', 'GraphQL', 'Next.js'],
    description: 'Experienced full-stack developer with 5+ years building scalable web applications. Specialized in React, Node.js, and cloud architecture. I have a passion for creating efficient, maintainable code and delivering exceptional user experiences.',
    longDescription: `I'm a passionate full-stack developer with over 5 years of experience in building scalable web applications. My expertise spans across modern JavaScript frameworks, cloud architecture, and database design.

    I've worked with startups and enterprise companies, helping them build robust digital solutions. My approach combines technical excellence with clear communication and timely delivery.

    When I'm not coding, I enjoy contributing to open-source projects and mentoring junior developers. I believe in continuous learning and staying up-to-date with the latest technologies.`,
    availability: 'Available now',
    completedJobs: 89,
    successRate: 98,
    responseTime: '< 1 hour',
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Basic)'],
    education: 'BS Computer Science - Stanford University',
    certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
    portfolio: [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL',
        image: '/placeholder.svg',
        tech: ['React', 'Node.js', 'PostgreSQL'],
        link: '#'
      },
      {
        id: 2,
        title: 'Real-time Chat App',
        description: 'Developed a real-time messaging application with Socket.io and Redis',
        image: '/placeholder.svg',
        tech: ['React', 'Socket.io', 'Redis'],
        link: '#'
      },
      {
        id: 3,
        title: 'Analytics Dashboard',
        description: 'Created a comprehensive analytics dashboard with D3.js and Python',
        image: '/placeholder.svg',
        tech: ['D3.js', 'Python', 'MongoDB'],
        link: '#'
      }
    ],
    testimonials: [
      {
        id: 1,
        client: 'Sarah Johnson',
        rating: 5,
        comment: 'Alex delivered exceptional work on our web application. His code quality is outstanding and he communicates clearly throughout the project.',
        project: 'E-commerce Platform',
        date: '2 weeks ago'
      },
      {
        id: 2,
        client: 'Michael Chen',
        rating: 5,
        comment: 'Highly skilled developer who goes above and beyond. Delivered the project ahead of schedule with excellent documentation.',
        project: 'Real-time Chat App',
        date: '1 month ago'
      }
    ],
    avatar: '/placeholder.svg'
  };

  const handleMessage = () => {
    toast({
      title: "Starting Conversation",
      description: `Opening chat with ${freelancer.name}...`,
    });
    navigate('/messages');
  };

  const handleHire = () => {
    toast({
      title: "Hire Freelancer",
      description: `Redirecting to hire ${freelancer.name}...`,
    });
    // In a real app, this would open a hiring modal or navigate to a contract page
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You are ${isFollowing ? 'no longer following' : 'now following'} ${freelancer.name}`,
    });
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
              <Link to="/find-talent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {freelancer.name}
                          </h1>
                          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                            {freelancer.title}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
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
                        </div>
                        <Button
                          variant={isFollowing ? "outline" : "secondary"}
                          onClick={handleFollow}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current text-red-500' : ''}`} />
                          {isFollowing ? 'Following' : 'Follow'}
                        </Button>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {freelancer.description}
                      </p>

                      <div className="flex space-x-3">
                        <Button 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={handleHire}
                        >
                          <Briefcase className="w-4 h-4 mr-2" />
                          Hire Now
                        </Button>
                        <Button variant="outline" onClick={handleMessage}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {freelancer.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 dark:text-gray-300">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {freelancer.portfolio.map((project) => (
                      <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                          <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tech.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Testimonials */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Client Testimonials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {freelancer.testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          "{testimonial.comment}"
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">{testimonial.client}</span>
                          <span>{testimonial.date}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Project: {testimonial.project}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Hourly Rate</span>
                    <span className="font-semibold text-green-600">${freelancer.hourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Jobs Completed</span>
                    <span className="font-semibold">{freelancer.completedJobs}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Success Rate</span>
                    <span className="font-semibold text-green-600">{freelancer.successRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Response Time</span>
                    <span className="font-semibold">{freelancer.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-1 pt-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      {freelancer.availability}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {freelancer.languages.map((language, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700 dark:text-gray-300">{language}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education & Certifications */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Education & Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Education</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-6">
                      {freelancer.education}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Certifications</span>
                    </div>
                    <div className="space-y-1 ml-6">
                      {freelancer.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="w-3 h-3 text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;