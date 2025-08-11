import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import Icon from '../../components/AppIcon';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';
import NotificationSection from './components/NotificationSection';
import SubscriptionSection from './components/SubscriptionSection';
import DataExportSection from './components/DataExportSection';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    bio: "Digital marketing specialist passionate about social media strategy and content creation. Helping brands grow their online presence through engaging storytelling.",
    timezone: "America/New_York",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  });

  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: false,
    lastPasswordChange: "2024-12-15",
    activeSessions: 3
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    postScheduled: true,
    postPublished: true,
    engagementAlerts: true,
    teamMentions: true,
    weeklyReports: true,
    marketingEmails: false,
    frequency: 'immediate',
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00'
  });

  const [subscriptionData, setSubscriptionData] = useState({
    currentPlan: 'free',
    billingCycle: 'monthly',
    nextBilling: '2025-02-01',
    usage: {
      accounts: { used: 3, total: 5 },
      posts: { used: 7, total: 10 },
      storage: { used: 2.1, total: 5 }
    }
  });

  const userContext = {
    name: userProfile?.name,
    tier: 'Free',
    connectedPlatforms: 3,
    hasNotifications: true
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and preferences'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password and authentication settings'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Email and push notification preferences'
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: 'CreditCard',
      description: 'Billing and plan management'
    },
    {
      id: 'data',
      label: 'Data & Privacy',
      icon: 'Database',
      description: 'Export data and account deletion'
    }
  ];

  useEffect(() => {
    document.title = 'Account Settings - ZoyeShare';
  }, []);

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
    // Mock API call
    setTimeout(() => {
      alert('Profile updated successfully!');
    }, 500);
  };

  const handleUpdateSecurity = (securityUpdate) => {
    switch (securityUpdate?.type) {
      case 'password': alert('Password updated successfully!');
        setSecurityData(prev => ({
          ...prev,
          lastPasswordChange: new Date()?.toISOString()?.split('T')?.[0]
        }));
        break;
      case 'twoFactor':
        setSecurityData(prev => ({
          ...prev,
          twoFactorEnabled: securityUpdate?.enabled
        }));
        alert(`Two-factor authentication ${securityUpdate?.enabled ? 'enabled' : 'disabled'}!`);
        break;
      case 'logoutSession': alert('Session logged out successfully!');
        break;
      default:
        break;
    }
  };

  const handleUpdateNotifications = (newSettings) => {
    setNotificationSettings(newSettings);
    // Mock API call
    setTimeout(() => {
      console.log('Notification settings updated');
    }, 100);
  };

  const handleUpdateSubscription = (subscriptionUpdate) => {
    switch (subscriptionUpdate?.type) {
      case 'upgrade':
        alert(`Upgrading to ${subscriptionUpdate?.planId} plan...`);
        break;
      case 'cancel': alert('Subscription cancelled. You will retain access until the end of your billing period.');
        break;
      default:
        break;
    }
  };

  const handleDataExport = async (exportSettings) => {
    console.log('Starting data export with settings:', exportSettings);
    // Mock export process
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, exportId: 'exp_' + Date.now() });
      }, 2000);
    });
  };

  const handleAccountDeletion = () => {
    alert('Account deletion initiated. You will receive a confirmation email.');
    // In a real app, this would redirect to a confirmation page or logout
  };

  const handleNotificationClick = () => {
    alert('Notifications panel would open here');
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileSection
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'security':
        return (
          <SecuritySection
            securityData={securityData}
            onUpdateSecurity={handleUpdateSecurity}
          />
        );
      case 'notifications':
        return (
          <NotificationSection
            notificationSettings={notificationSettings}
            onUpdateNotifications={handleUpdateNotifications}
          />
        );
      case 'subscription':
        return (
          <SubscriptionSection
            subscriptionData={subscriptionData}
            onUpdateSubscription={handleUpdateSubscription}
          />
        );
      case 'data':
        return (
          <DataExportSection
            onDataExport={handleDataExport}
            onAccountDeletion={handleAccountDeletion}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Account Settings - ZoyeShare</title>
        <meta name="description" content="Manage your ZoyeShare account settings, profile, security, notifications, and subscription preferences." />
      </Helmet>
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userContext={userContext}
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-60'}`}>
        <Header
          userContext={userContext}
          onNotificationClick={handleNotificationClick}
          onProfileClick={handleProfileClick}
        />

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Settings" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
                  <p className="text-muted-foreground">Manage your account preferences and security settings</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                  <nav className="space-y-2">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground shadow-lg'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon
                          name={tab?.icon}
                          size={20}
                          className={`transition-transform duration-200 ${
                            activeTab === tab?.id ? 'scale-105' : 'group-hover:scale-105'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{tab?.label}</p>
                          <p className={`text-xs truncate ${
                            activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                          }`}>
                            {tab?.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountSettings;