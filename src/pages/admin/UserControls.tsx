
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserControls from '@/components/admin/UserControls';

const UserControlsPage = () => {
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
          <UserControls />
        </div>
      </div>
    </div>
  );
};

export default UserControlsPage;
