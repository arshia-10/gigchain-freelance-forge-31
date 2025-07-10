
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  DollarSign, 
  Shield, 
  FileText,
  Zap,
  Save,
  RefreshCcw,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PlatformSettings = () => {
  const [platformFee, setPlatformFee] = useState('2.5');
  const [contractAddress, setContractAddress] = useState('0x1234567890abcdef');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [autoModeration, setAutoModeration] = useState(true);
  const [maxGigBudget, setMaxGigBudget] = useState('50000');
  const [minGigBudget, setMinGigBudget] = useState('10');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Platform Settings</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="fees">Fees & Tokens</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="terms">Terms & Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>General Platform Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input id="platformName" defaultValue="GigChain" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platformVersion">Platform Version</Label>
                  <Input id="platformVersion" defaultValue="v2.1.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGigBudget">Maximum Gig Budget ($)</Label>
                  <Input 
                    id="maxGigBudget" 
                    type="number" 
                    value={maxGigBudget}
                    onChange={(e) => setMaxGigBudget(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minGigBudget">Minimum Gig Budget ($)</Label>
                  <Input 
                    id="minGigBudget" 
                    type="number" 
                    value={minGigBudget}
                    onChange={(e) => setMinGigBudget(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoModeration">Auto Moderation</Label>
                    <p className="text-sm text-muted-foreground">Automatically flag suspicious content</p>
                  </div>
                  <Switch 
                    id="autoModeration"
                    checked={autoModeration}
                    onCheckedChange={setAutoModeration}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
                  </div>
                  <Switch id="maintenanceMode" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Fee Structure</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformFee">Platform Fee (%)</Label>
                  <Input 
                    id="platformFee" 
                    type="number" 
                    step="0.1"
                    value={platformFee}
                    onChange={(e) => setPlatformFee(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Current fee: {platformFee}%</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="withdrawalFee">Withdrawal Fee (%)</Label>
                  <Input id="withdrawalFee" type="number" step="0.1" defaultValue="1.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disputeFee">Dispute Handling Fee ($)</Label>
                  <Input id="disputeFee" type="number" defaultValue="25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgentGigFee">Urgent Gig Fee (%)</Label>
                  <Input id="urgentGigFee" type="number" step="0.1" defaultValue="5.0" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Token Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rewardTokenSymbol">Reward Token Symbol</Label>
                  <Input id="rewardTokenSymbol" defaultValue="GIGA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stakingReward">Staking Reward Rate (%)</Label>
                  <Input id="stakingReward" type="number" step="0.1" defaultValue="8.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rewardMultiplier">Completion Reward Multiplier</Label>
                  <Input id="rewardMultiplier" type="number" step="0.1" defaultValue="1.2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokenBurnRate">Token Burn Rate (%)</Label>
                  <Input id="tokenBurnRate" type="number" step="0.01" defaultValue="0.1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emergencyMode">Emergency Mode</Label>
                  <p className="text-sm text-muted-foreground">Pause all platform operations</p>
                </div>
                <Switch 
                  id="emergencyMode"
                  checked={emergencyMode}
                  onCheckedChange={setEmergencyMode}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Upload Size (MB)</Label>
                  <Input id="maxFileSize" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">API Rate Limit (requests/minute)</Label>
                  <Input id="rateLimit" type="number" defaultValue="100" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abuse Prevention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxGigsPerDay">Max Gigs Per Day (Per User)</Label>
                  <Input id="maxGigsPerDay" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minAccountAge">Min Account Age (days)</Label>
                  <Input id="minAccountAge" type="number" defaultValue="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportThreshold">Auto-Flag Threshold (reports)</Label>
                  <Input id="reportThreshold" type="number" defaultValue="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suspensionDuration">Default Suspension Duration (days)</Label>
                  <Input id="suspensionDuration" type="number" defaultValue="7" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Smart Contract Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contractAddress">Main Contract Address</Label>
                <Input 
                  id="contractAddress" 
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="font-mono"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="escrowContract">Escrow Contract</Label>
                  <Input id="escrowContract" defaultValue="0xabcd...1234" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokenContract">Token Contract</Label>
                  <Input id="tokenContract" defaultValue="0xefgh...5678" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="governanceContract">Governance Contract</Label>
                  <Input id="governanceContract" defaultValue="0xijkl...9012" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="networkId">Network ID</Label>
                  <Input id="networkId" defaultValue="1" />
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">
                    Warning: Contract Migration
                  </span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
                  Changing contract addresses will require platform maintenance and user notification.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Terms & Policies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="termsOfService">Terms of Service</Label>
                <Textarea 
                  id="termsOfService" 
                  rows={6}
                  defaultValue="By using GigChain, you agree to our terms of service..."
                  className="min-h-[150px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="privacyPolicy">Privacy Policy</Label>
                <Textarea 
                  id="privacyPolicy" 
                  rows={6}
                  defaultValue="We collect and process personal data..."
                  className="min-h-[150px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="communityGuidelines">Community Guidelines</Label>
                <Textarea 
                  id="communityGuidelines" 
                  rows={4}
                  defaultValue="Our community standards include..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastUpdated">Last Updated</Label>
                  <Input id="lastUpdated" type="date" defaultValue="2024-01-15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Policy Version</Label>
                  <Input id="version" defaultValue="2.1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformSettings;
