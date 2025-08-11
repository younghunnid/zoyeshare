import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformStatus = () => {
  const platforms = [
    { name: 'Facebook', icon: 'Facebook', status: 'connected', lastSync: '2 min ago', color: 'bg-blue-500' },
    { name: 'Instagram', icon: 'Instagram', status: 'connected', lastSync: '5 min ago', color: 'bg-pink-500' },
    { name: 'Twitter', icon: 'Twitter', status: 'connected', lastSync: '1 min ago', color: 'bg-sky-500' },
    { name: 'LinkedIn', icon: 'Linkedin', status: 'connected', lastSync: '10 min ago', color: 'bg-blue-600' },
    { name: 'YouTube', icon: 'Youtube', status: 'error', lastSync: '2 hours ago', color: 'bg-red-500' },
    { name: 'TikTok', icon: 'Music', status: 'disconnected', lastSync: 'Never', color: 'bg-gray-500' }
  ];

  const getStatusColor = (status) => {
    if (status === 'connected') return 'text-success';
    if (status === 'error') return 'text-error';
    return 'text-muted-foreground';
  };

  const getStatusIcon = (status) => {
    if (status === 'connected') return 'CheckCircle';
    if (status === 'error') return 'AlertCircle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Platform Status</h3>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors">
          Manage
        </button>
      </div>
      <div className="space-y-3">
        {platforms?.map((platform, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`w-8 h-8 rounded-lg ${platform?.color} flex items-center justify-center`}>
              <Icon name={platform?.icon} size={16} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{platform?.name}</p>
              <p className="text-xs text-muted-foreground">Last sync: {platform?.lastSync}</p>
            </div>
            <div className={`flex items-center ${getStatusColor(platform?.status)}`}>
              <Icon name={getStatusIcon(platform?.status)} size={16} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-center text-primary hover:text-primary/80 transition-colors flex items-center justify-center space-x-2">
          <Icon name="Plus" size={14} />
          <span>Connect New Platform</span>
        </button>
      </div>
    </div>
  );
};

export default PlatformStatus;