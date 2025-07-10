
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Upload, 
  FileText, 
  Brain, 
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  Shield,
  Home,
  Sparkles,
  Eye,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeAnalyzer = () => {
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const analysisResults = {
    overallScore: 85,
    skills: [
      { name: 'React', level: 92, demand: 'High', match: true },
      { name: 'TypeScript', level: 88, demand: 'High', match: true },
      { name: 'Solidity', level: 75, demand: 'Very High', match: true },
      { name: 'Node.js', level: 80, demand: 'High', match: true },
      { name: 'Python', level: 65, demand: 'Medium', match: false }
    ],
    strengths: [
      'Strong blockchain development experience',
      'Excellent React and TypeScript skills',
      'Good project management abilities',
      'Active open-source contributor'
    ],
    improvements: [
      'Add more DeFi protocol experience',
      'Expand smart contract audit skills',
      'Include more Web3 certifications',
      'Showcase more complex projects'
    ],
    marketDemand: {
      blockchain: 95,
      frontend: 85,
      fullstack: 78,
      backend: 70
    }
  };

  const handleFileUpload = () => {
    // Simulate analysis
    setTimeout(() => {
      setAnalysisComplete(true);
    }, 2000);
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
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Resume Analyzer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get AI-powered insights and improve your freelancer profile
            </p>
          </div>

          {!analysisComplete ? (
            /* Upload Section */
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Upload Your Resume
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Drag and drop your resume or click to browse
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={handleFileUpload}>
                      <FileText className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Analysis Results */
            <>
              {/* Overall Score */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overall Score</h2>
                      <p className="text-gray-600 dark:text-gray-300">Based on market demand and skill analysis</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600">{analysisResults.overallScore}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">out of 100</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={analysisResults.overallScore} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Skills Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Skills Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                              {skill.match && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={skill.demand === 'Very High' ? 'default' : skill.demand === 'High' ? 'secondary' : 'outline'}
                                className="text-xs"
                              >
                                {skill.demand}
                              </Badge>
                              <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}%</span>
                            </div>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Market Demand
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analysisResults.marketDemand).map(([field, demand]) => (
                        <div key={field} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900 dark:text-white capitalize">{field}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{demand}%</span>
                          </div>
                          <Progress value={demand} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Strengths and Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-600">
                      <Award className="w-5 h-5 mr-2" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResults.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-600">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResults.improvements.map((improvement, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/profile">
                        <Eye className="w-4 h-4 mr-2" />
                        Update Profile
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Star className="w-4 h-4 mr-2" />
                      Get Recommendations
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      Analyze Another
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
