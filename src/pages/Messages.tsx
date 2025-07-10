
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Send,
  Search,
  MoreVertical,
  Paperclip,
  Phone,
  Video
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const Messages = () => {
  const [searchParams] = useSearchParams();
  const clientName = searchParams.get('client') || 'Client';
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'client',
      content: 'Hi! How is the project coming along?',
      timestamp: '10:30 AM',
      date: 'Today'
    },
    {
      id: 2,
      sender: 'freelancer',
      content: 'Hello! The project is progressing well. I\'ve completed about 75% of the work and should have it ready by the deadline.',
      timestamp: '10:45 AM',
      date: 'Today'
    },
    {
      id: 3,
      sender: 'client',
      content: 'That\'s great to hear! Could you send me a preview of what you have so far?',
      timestamp: '11:00 AM',
      date: 'Today'
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'freelancer',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" asChild>
                <Link to="/freelancer-dashboard">
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{clientName}</h1>
                <p className="text-sm text-gray-600">Active now</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <Card className="h-[600px] bg-white/70 backdrop-blur-sm border-0 shadow-lg flex flex-col">
          {/* Messages Area */}
          <CardContent className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'freelancer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'freelancer'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'freelancer' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Paperclip className="w-4 h-4" />
              </Button>
              <div className="flex-1">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[40px] max-h-32 resize-none"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
