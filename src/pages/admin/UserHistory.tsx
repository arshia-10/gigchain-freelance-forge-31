
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, Star, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserHistoryPage = () => {
  const { userId } = useParams<{ userId: string }>();

  const userData = {
    id: userId,
    username: 'alice.eth',
    walletAddress: '0x1234...5678',
    email: 'alice@example.com',
    joinDate: '2024-01-15',
    status: 'active',
    reputation: 4.8,
    totalEarned: '$5,420',
    gigsCompleted: 23,
    isVerified: true
  };

  const gigHistory = [
    { id: 1, title: 'Web Design Project', client: 'john.eth', amount: '$500', status: 'completed', date: '2024-01-10', rating: 5 },
    { id: 2, title: 'Logo Design', client: 'jane.eth', amount: '$200', status: 'completed', date: '2024-01-08', rating: 4.5 },
    { id: 3, title: 'Mobile App UI', client: 'mike.eth', amount: '$800', status: 'in-progress', date: '2024-01-12', rating: null },
  ];

  const transactionHistory = [
    { id: 1, type: 'payment', amount: '+$500', description: 'Payment for Web Design Project', date: '2024-01-10 14:30', txHash: '0xabc123...' },
    { id: 2, type: 'withdrawal', amount: '-$300', description: 'Withdrawal to wallet', date: '2024-01-09 10:15', txHash: '0xdef456...' },
    { id: 3, type: 'payment', amount: '+$200', description: 'Payment for Logo Design', date: '2024-01-08 16:45', txHash: '0xghi789...' },
  ];

  const activityLogs = [
    { id: 1, action: 'Profile updated', timestamp: '2024-01-15 09:30', details: 'Updated bio and skills' },
    { id: 2, action: 'Gig application', timestamp: '2024-01-14 14:20', details: 'Applied for Mobile App Development' },
    { id: 3, action: 'Payment received', timestamp: '2024-01-10 14:30', details: 'Received payment for Web Design Project' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/admin/users">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to User Management
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userData.username}</h1>
              <p className="text-muted-foreground">{userData.walletAddress}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Reputation</p>
                    <p className="text-2xl font-bold">{userData.reputation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Gigs Completed</p>
                    <p className="text-2xl font-bold">{userData.gigsCompleted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                    <p className="text-2xl font-bold">{userData.totalEarned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="text-2xl font-bold">{userData.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="gigs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gigs">Gig History</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="activity">Activity Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="gigs">
              <Card>
                <CardHeader>
                  <CardTitle>Gig History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Gig Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gigHistory.map((gig) => (
                        <TableRow key={gig.id}>
                          <TableCell>{gig.title}</TableCell>
                          <TableCell>{gig.client}</TableCell>
                          <TableCell>{gig.amount}</TableCell>
                          <TableCell>
                            <Badge variant={gig.status === 'completed' ? 'default' : 'secondary'}>
                              {gig.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{gig.date}</TableCell>
                          <TableCell>
                            {gig.rating ? (
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{gig.rating}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Pending</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction Hash</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionHistory.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>
                            <Badge variant={tx.type === 'payment' ? 'default' : 'secondary'}>
                              {tx.type}
                            </Badge>
                          </TableCell>
                          <TableCell className={tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                            {tx.amount}
                          </TableCell>
                          <TableCell>{tx.description}</TableCell>
                          <TableCell>{tx.date}</TableCell>
                          <TableCell className="font-mono text-sm">{tx.txHash}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserHistoryPage;
