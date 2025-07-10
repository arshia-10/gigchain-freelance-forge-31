
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText,
  Megaphone,
  Lock,
  Trash2,
  Upload,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContentPrivacyControl = () => {
  const [announcement, setAnnouncement] = useState('');
  const [termsVersion, setTermsVersion] = useState('2.1');
  const [dataSharing, setDataSharing] = useState(false);
  const { toast } = useToast();

  const handleUpdateTerms = () => {
    toast({
      title: "Terms & Conditions Updated",
      description: "New terms have been uploaded and users will be prompted to accept.",
    });
  };

  const handlePublishAnnouncement = () => {
    if (!announcement.trim()) {
      toast({
        title: "Error",
        description: "Please enter an announcement message.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Announcement Published",
      description: "Global announcement has been broadcast to all users.",
    });
    setAnnouncement('');
  };

  const handleCleanupGigs = () => {
    toast({
      title: "Cleanup Initiated",
      description: "Expired gigs are being removed from the platform.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🔔 Content & Privacy Control</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>📜 Terms & Conditions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="termsVersion">Current Version</Label>
              <Input
                id="termsVersion"
                value={termsVersion}
                onChange={(e) => setTermsVersion(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="termsFile">Upload New Terms</Label>
              <div className="flex items-center space-x-2">
                <Input id="termsFile" type="file" accept=".pdf,.doc,.docx" />
                <Button onClick={handleUpdateTerms}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                📊 Version History: Track all previous versions and acceptance rates
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Megaphone className="w-5 h-5" />
              <span>📢 Global Announcements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="announcement">Announcement Message</Label>
              <Textarea
                id="announcement"
                placeholder="e.g., Scheduled maintenance at 10 PM UTC..."
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="announcementType">Type</Label>
              <Select defaultValue="info">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Information</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handlePublishAnnouncement} className="w-full">
              <Megaphone className="w-4 h-4 mr-2" />
              Publish Announcement
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>🔐 Data Sharing Consent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="dataSharing"
                checked={dataSharing}
                onCheckedChange={setDataSharing}
              />
              <Label htmlFor="dataSharing">Opt-in by Default</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              {dataSharing ? 'Credential sharing is opt-in by default' : 'Users must manually enable credential sharing'}
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Configure Privacy Settings
              </Button>
              <Button variant="outline" className="w-full">
                View Consent Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trash2 className="w-5 h-5" />
              <span>🧹 Content Cleanup</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="expiryDays">Auto-remove after (days)</Label>
              <Select defaultValue="90">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCleanupGigs} className="w-full" variant="outline">
              <Trash2 className="w-4 h-4 mr-2" />
              Clean Up Expired Gigs
            </Button>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Currently tracking 1,234 expired gigs ready for cleanup
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentPrivacyControl;
