import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSection = ({ notificationSettings, onUpdateNotifications }) => {
  const [settings, setSettings] = useState({
    emailNotifications: notificationSettings?.emailNotifications || true,
    pushNotifications: notificationSettings?.pushNotifications || true,
    smsNotifications: notificationSettings?.smsNotifications || false,
    postScheduled: notificationSettings?.postScheduled || true,
    postPublished: notificationSettings?.postPublished || true,
    engagementAlerts: notificationSettings?.engagementAlerts || true,
    teamMentions: notificationSettings?.teamMentions || true,
    weeklyReports: notificationSettings?.weeklyReports || true,
    marketingEmails: notificationSettings?.marketingEmails || false,
    frequency: notificationSettings?.frequency || 'immediate',
    quietHours: notificationSettings?.quietHours || false,
    quietStart: notificationSettings?.quietStart || '22:00',
    quietEnd: notificationSettings?.quietEnd || '08:00'
  });

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Summary' }
  ];

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onUpdateNotifications(newSettings);
  };

  const handleTestNotification = (type) => {
    // Mock test notification
    alert(`Test ${type} notification sent!`);
  };

  const notificationCategories = [
    {
      title: "Content & Publishing",
      description: "Notifications about your content and publishing activities",
      settings: [
        {
          key: 'postScheduled',
          label: 'Post Scheduled',
          description: 'When a post is successfully scheduled'
        },
        {
          key: 'postPublished',
          label: 'Post Published',
          description: 'When a scheduled post goes live'
        },
        {
          key: 'engagementAlerts',
          label: 'Engagement Alerts',
          description: 'High engagement on your posts'
        }
      ]
    },
    {
      title: "Team & Collaboration",
      description: "Notifications about team activities and mentions",
      settings: [
        {
          key: 'teamMentions',
          label: 'Team Mentions',
          description: 'When someone mentions you in comments'
        }
      ]
    },
    {
      title: "Reports & Analytics",
      description: "Regular reports and performance updates",
      settings: [
        {
          key: 'weeklyReports',
          label: 'Weekly Reports',
          description: 'Weekly performance summary'
        }
      ]
    },
    {
      title: "Marketing & Updates",
      description: "Product updates and promotional content",
      settings: [
        {
          key: 'marketingEmails',
          label: 'Marketing Emails',
          description: 'Product updates and tips'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Notification Channels</h3>
          <p className="text-sm text-muted-foreground">Choose how you want to receive notifications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings?.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
                label=""
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Send"
                onClick={() => handleTestNotification('email')}
              >
                Test
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Icon name="Bell" size={20} className="text-secondary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Push</p>
                <p className="text-xs text-muted-foreground">Browser notifications</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings?.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e?.target?.checked)}
                label=""
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Send"
                onClick={() => handleTestNotification('push')}
              >
                Test
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Icon name="MessageSquare" size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">SMS</p>
                <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings?.smsNotifications}
                onChange={(e) => handleSettingChange('smsNotifications', e?.target?.checked)}
                label=""
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Send"
                onClick={() => handleTestNotification('SMS')}
              >
                Test
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Notification Frequency */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Notification Frequency</h3>
          <p className="text-sm text-muted-foreground">Control how often you receive notifications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Default Frequency"
            options={frequencyOptions}
            value={settings?.frequency}
            onChange={(value) => handleSettingChange('frequency', value)}
          />

          <div className="space-y-4">
            <Checkbox
              checked={settings?.quietHours}
              onChange={(e) => handleSettingChange('quietHours', e?.target?.checked)}
              label="Enable Quiet Hours"
              description="Pause notifications during specified hours"
            />
            
            {settings?.quietHours && (
              <div className="grid grid-cols-2 gap-4 pl-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Start Time</label>
                  <input
                    type="time"
                    value={settings?.quietStart}
                    onChange={(e) => handleSettingChange('quietStart', e?.target?.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">End Time</label>
                  <input
                    type="time"
                    value={settings?.quietEnd}
                    onChange={(e) => handleSettingChange('quietEnd', e?.target?.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Notification Categories */}
      {notificationCategories?.map((category, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">{category?.title}</h3>
            <p className="text-sm text-muted-foreground">{category?.description}</p>
          </div>

          <div className="space-y-4">
            {category?.settings?.map((setting) => (
              <div key={setting?.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{setting?.label}</p>
                  <p className="text-sm text-muted-foreground">{setting?.description}</p>
                </div>
                <Checkbox
                  checked={settings?.[setting?.key]}
                  onChange={(e) => handleSettingChange(setting?.key, e?.target?.checked)}
                  label=""
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSection;