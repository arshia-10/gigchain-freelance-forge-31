
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Users, Briefcase, AlertTriangle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RecentActivityPage = () => {
  const { type } = useParams<{ type: string }>();

  const getActivityData = (activityType: string) => {
    switch (activityType) {
      case 'user-registration':
        return {
          title: 'New User Registrations',
          icon: Users,
          data: [
            { id: 1, wallet: '0x1234...5678', username: 'alice.eth', date: '2024-01-15 10:30', status: 'verified' },
            { id: 2, wallet: '0x9876...4321', username: 'bob.eth', date: '2024-01-15 09:15', status: 'pending' },
            { id: 3, wallet: '0x4567...8901', username: 'charlie.eth', date: '2024-01-14 16:45', status: 'verified' },
          ]
        };
      case 'gig-completed':
        return {
          title: 'Completed Gigs',
          icon: Briefcase,
          data: [
            { id: 1, title: 'Web Design Project', freelancer: 'alice.eth', client: 'john.eth', amount: '$500', date: '2024-01-15 14:20' },
            { id: 2, title: 'Smart Contract Development', freelancer: 'bob.eth', client: 'jane.eth', amount: '$1200', date: '2024-01-14 11:30' },
            { id: 3, title: 'Mobile App UI', freelancer: 'charlie.eth', client: 'mike.eth', amount: '$800', date: '2024-01-14 09:45' },
          ]
        };
      case 'dispute-raised':
        return {
          title: 'Raised Disputes',
          icon: AlertTriangle,
          data: [
            { id: 1, gigTitle: 'Logo Design', plaintiff: 'client.eth', defendant: 'designer.eth', reason: 'Work not delivered', date: '2024-01-15 12:30', status: 'pending' },
            { id: 2, gigTitle: 'Website Development', plaintiff: 'dev.eth', defendant: 'client.eth', reason: 'Payment delayed', date: '2024-01-14 15:20', status: 'resolved' },
          ]
        };
      case 'payment-processed':
        return {
          title: 'Processed Payments',
          icon: DollarSign,
          data: [
            { id: 1, from: 'client.eth', to: 'freelancer.eth', amount: '$750', gigTitle: 'API Development', date: '2024-01-15 16:10', txHash: '0xabc123...' },
            { id: 2, from: 'startup.eth', to: 'designer.eth', amount: '$300', gigTitle: 'Brand Identity', date: '2024-01-15 13:45', txHash: '0xdef456...' },
          ]
        };
      default:
        return { title: 'Recent Activity', icon: Users, data: [] };
    }
  };

  const activity = getActivityData(type || '');
  const Icon = activity.icon;

  const renderTable = () => {
    if (!activity.data.length) return <p>No data available</p>;

    switch (type) {
      case 'user-registration':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activity.data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono">{item.wallet}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'verified' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'gig-completed':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gig Title</TableHead>
                <TableHead>Freelancer</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Completion Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activity.data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.freelancer}</TableCell>
                  <TableCell>{item.client}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'dispute-raised':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gig Title</TableHead>
                <TableHead>Plaintiff</TableHead>
                <TableHead>Defendant</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activity.data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.gigTitle}</TableCell>
                  <TableCell>{item.plaintiff}</TableCell>
                  <TableCell>{item.defendant}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'resolved' ? 'default' : 'destructive'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'payment-processed':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Gig Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activity.data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.from}</TableCell>
                  <TableCell>{item.to}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.gigTitle}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="font-mono text-sm">{item.txHash}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/admin-dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin Dashboard
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <Icon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">{activity.title}</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Activity Details</CardTitle>
            </CardHeader>
            <CardContent>
              {renderTable()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityPage;
