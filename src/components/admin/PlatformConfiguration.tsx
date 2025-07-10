
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign,
  Shield,
  Coins,
  Pause,
  RefreshCw,
  Globe,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlatformConfiguration = () => {
  const [platformFee, setPlatformFee] = useState('2.5');
  const [didOnboarding, setDidOnboarding] = useState(true);
  const [emergencyPause, setEmergencyPause] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Platform configuration has been updated successfully.",
    });
  };

  const handleEmergencyPause = () => {
    setEmergencyPause(!emergencyPause);
    toast({
      title: emergencyPause ? "Platform Resumed" : "Emergency Pause Activated",
      description: emergencyPause ? "Smart contract interactions have been resumed." : "All smart contract interactions have been paused.",
      variant: emergencyPause ? "default" : "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">⚙️ Platform Configuration Settings</h2>
        <Button onClick={handleSaveSettings}>
          <Settings className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>💰 Platform Fee Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="platformFee">Platform Fee Percentage</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="platformFee"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(e.target.value)}
                />
                <span>%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Current fee: {platformFee}% per transaction
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>🧾 DID Onboarding Control</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="didOnboarding"
                checked={didOnboarding}
                onCheckedChange={setDidOnboarding}
              />
              <Label htmlFor="didOnboarding">Require DID Creation</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              {didOnboarding ? 'New users must create Decentralized Identity' : 'DID creation is optional'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className="w-5 h-5" />
              <span>🪙 Tokenomics Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="stakingPercent">Staking Percentage</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="stakingPercent"
                  type="number"
                  step="0.1"
                  defaultValue="5.0"
                />
                <span>%</span>
              </div>
            </div>
            <div>
              <Label htmlFor="rewardCap">Daily Reward Cap</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="rewardCap"
                  type="number"
                  defaultValue="1000"
                />
                <span>tokens</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pause className="w-5 h-5" />
              <span>🛑 Emergency Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="emergencyPause"
                checked={emergencyPause}
                onCheckedChange={handleEmergencyPause}
              />
              <Label htmlFor="emergencyPause">Emergency Pause</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              {emergencyPause ? 'Smart contract interactions are PAUSED' : 'All systems operational'}
            </p>
            {emergencyPause && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">
                  ⚠️ Emergency mode active. All user transactions are blocked.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5" />
              <span>🔄 Smart Contract Addresses</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="gigContract">Gig Contract Address</Label>
              <Input
                id="gigContract"
                defaultValue="0x742d35Cc6634C0532925a3b8D0C3e4f7c3b9A0Fb"
                className="font-mono text-sm"
              />
            </div>
            <div>
              <Label htmlFor="paymentContract">Payment Contract Address</Label>
              <Input
                id="paymentContract"
                defaultValue="0x8ba1f109551bD432803012645Hac136c565aF95E"
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>🌐 Language & Region Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="defaultLanguage">Default UI Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="multilingual" defaultChecked />
              <Label htmlFor="multilingual">Enable Multilingual Support</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformConfiguration;
