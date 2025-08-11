import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySection = ({ securityData, onUpdateSecurity }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securityData?.twoFactorEnabled || false);

  const activeSessions = [
    {
      id: 1,
      device: "MacBook Pro - Chrome",
      location: "New York, NY",
      ipAddress: "192.168.1.100",
      lastActive: "2 minutes ago",
      isCurrent: true
    },
    {
      id: 2,
      device: "iPhone 15 Pro - Safari",
      location: "New York, NY",
      ipAddress: "192.168.1.101",
      lastActive: "1 hour ago",
      isCurrent: false
    },
    {
      id: 3,
      device: "Windows PC - Edge",
      location: "Los Angeles, CA",
      ipAddress: "203.0.113.45",
      lastActive: "3 days ago",
      isCurrent: false
    }
  ];

  const securityLogs = [
    {
      id: 1,
      action: "Password Changed",
      timestamp: "2025-01-10 14:30:22",
      ipAddress: "192.168.1.100",
      status: "success"
    },
    {
      id: 2,
      action: "Login Attempt",
      timestamp: "2025-01-10 09:15:45",
      ipAddress: "203.0.113.45",
      status: "success"
    },
    {
      id: 3,
      action: "Failed Login",
      timestamp: "2025-01-09 22:45:12",
      ipAddress: "198.51.100.25",
      status: "failed"
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = () => {
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onUpdateSecurity({ type: 'password', data: passwordForm });
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
  };

  const handleTwoFactorToggle = (checked) => {
    setTwoFactorEnabled(checked);
    onUpdateSecurity({ type: 'twoFactor', enabled: checked });
  };

  const handleLogoutSession = (sessionId) => {
    onUpdateSecurity({ type: 'logoutSession', sessionId });
  };

  const getDeviceIcon = (device) => {
    if (device?.includes('iPhone') || device?.includes('iPad')) return 'Smartphone';
    if (device?.includes('MacBook') || device?.includes('Mac')) return 'Laptop';
    if (device?.includes('Windows')) return 'Monitor';
    return 'Globe';
  };

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Password</h3>
            <p className="text-sm text-muted-foreground">Keep your account secure with a strong password</p>
          </div>
          <Button
            variant="outline"
            iconName="Key"
            iconPosition="left"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            Change Password
          </Button>
        </div>

        {showPasswordForm && (
          <div className="space-y-4 pt-4 border-t border-border">
            <Input
              label="Current Password"
              type="password"
              value={passwordForm?.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
              required
            />
            <Input
              label="New Password"
              type="password"
              value={passwordForm?.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
              description="Must be at least 8 characters with numbers and symbols"
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordForm?.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
              required
            />
            <div className="flex items-center space-x-3">
              <Button
                variant="default"
                iconName="Check"
                iconPosition="left"
                onClick={handlePasswordSubmit}
              >
                Update Password
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <Checkbox
            checked={twoFactorEnabled}
            onChange={(e) => handleTwoFactorToggle(e?.target?.checked)}
            label=""
          />
        </div>
        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Two-factor authentication is enabled</span>
            </div>
          </div>
        )}
      </div>
      {/* Active Sessions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
          <p className="text-sm text-muted-foreground">Manage your active login sessions across devices</p>
        </div>

        <div className="space-y-4">
          {activeSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={getDeviceIcon(session?.device)} size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground">{session?.device}</p>
                    {session?.isCurrent && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full border border-success/20">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{session?.location} • {session?.ipAddress}</p>
                  <p className="text-xs text-muted-foreground">Last active: {session?.lastActive}</p>
                </div>
              </div>
              {!session?.isCurrent && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="LogOut"
                  onClick={() => handleLogoutSession(session?.id)}
                >
                  Sign Out
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Security Logs */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Security Activity</h3>
          <p className="text-sm text-muted-foreground">Recent security events on your account</p>
        </div>

        <div className="space-y-3">
          {securityLogs?.map((log) => (
            <div key={log?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${log?.status === 'success' ? 'bg-success' : 'bg-error'}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{log?.action}</p>
                  <p className="text-xs text-muted-foreground">{log?.timestamp} • {log?.ipAddress}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                log?.status === 'success' ?'bg-success/10 text-success border border-success/20' :'bg-error/10 text-error border border-error/20'
              }`}>
                {log?.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;