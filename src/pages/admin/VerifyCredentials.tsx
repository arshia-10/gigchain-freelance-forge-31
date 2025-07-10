
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, XCircle, Eye, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const VerifyCredentialsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [selectedCredential, setSelectedCredential] = useState<any>(null);
  const { toast } = useToast();

  const userData = {
    id: userId,
    username: 'alice.eth',
    walletAddress: '0x1234...5678',
    email: 'alice@example.com'
  };

  const credentials = [
    {
      id: 1,
      type: 'University Degree',
      title: 'Bachelor of Computer Science',
      issuer: 'MIT',
      issueDate: '2020-05-15',
      status: 'pending',
      ipfsHash: 'QmXyZ123...',
      fileUrl: 'https://example.com/degree.pdf',
      verificationNotes: 'Awaiting verification from issuer'
    },
    {
      id: 2,
      type: 'Professional Certificate',
      title: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-03-10',
      status: 'verified',
      ipfsHash: 'QmAbc456...',
      fileUrl: 'https://example.com/aws-cert.pdf',
      verificationNotes: 'Verified through AWS portal'
    },
    {
      id: 3,
      type: 'Work Experience',
      title: 'Senior Developer at TechCorp',
      issuer: 'TechCorp HR',
      issueDate: '2022-01-20',
      status: 'rejected',
      ipfsHash: 'QmDef789...',
      fileUrl: 'https://example.com/work-exp.pdf',
      verificationNotes: 'Could not verify with issuer'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleVerify = (credentialId: number) => {
    toast({
      title: "Credential Verified",
      description: "The credential has been successfully verified.",
    });
  };

  const handleReject = (credentialId: number) => {
    toast({
      title: "Credential Rejected",
      description: "The credential has been rejected.",
    });
  };

  const CredentialModal = ({ credential }: { credential: any }) => (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Credential Details: {credential.title}</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Credential Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div><strong>Type:</strong> {credential.type}</div>
              <div><strong>Title:</strong> {credential.title}</div>
              <div><strong>Issuer:</strong> {credential.issuer}</div>
              <div><strong>Issue Date:</strong> {credential.issueDate}</div>
              <div><strong>Status:</strong> {getStatusBadge(credential.status)}</div>
              <div><strong>IPFS Hash:</strong> <span className="font-mono text-sm">{credential.ipfsHash}</span></div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{credential.verificationNotes}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-500">Document preview would appear here</p>
                <Button variant="outline" className="mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download Original
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col space-y-2">
                <Button 
                  onClick={() => handleVerify(credential.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify Credential
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleReject(credential.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Credential
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View on IPFS
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  );

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
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Verify Credentials</h1>
              <p className="text-muted-foreground">User: {userData.username} ({userData.walletAddress})</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submitted Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IPFS Hash</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {credentials.map((credential) => (
                    <TableRow key={credential.id}>
                      <TableCell>{credential.type}</TableCell>
                      <TableCell>{credential.title}</TableCell>
                      <TableCell>{credential.issuer}</TableCell>
                      <TableCell>{credential.issueDate}</TableCell>
                      <TableCell>{getStatusBadge(credential.status)}</TableCell>
                      <TableCell className="font-mono text-sm">{credential.ipfsHash}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedCredential(credential)}>
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                          </DialogTrigger>
                          {selectedCredential && <CredentialModal credential={selectedCredential} />}
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyCredentialsPage;
