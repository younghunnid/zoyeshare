import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'post_published',
      message: 'Post published to Instagram and Facebook',
      user: 'Auto-scheduler',
      timestamp: '2 minutes ago',
      icon: 'Send',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'team_member',
      message: 'Sarah Johnson added new content to queue',
      user: 'Sarah Johnson',
      timestamp: '15 minutes ago',
      icon: 'UserPlus',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'analytics',
      message: 'Weekly analytics report generated',
      user: 'System',
      timestamp: '1 hour ago',
      icon: 'BarChart3',
      color: 'text-accent'
    },
    {
      id: 4,
      type: 'error',
      message: 'Failed to publish to YouTube - Token expired',
      user: 'Auto-scheduler',
      timestamp: '2 hours ago',
      icon: 'AlertTriangle',
      color: 'text-error'
    },
    {
      id: 5,
      type: 'post_scheduled',
      message: 'New post scheduled for tomorrow 10:00 AM',
      user: 'Mike Chen',
      timestamp: '3 hours ago',
      icon: 'Calendar',
      color: 'text-secondary'
    },
    {
      id: 6,
      type: 'platform_connected',
      message: 'TikTok account successfully connected',
      user: 'Emma Wilson',
      timestamp: '5 hours ago',
      icon: 'Link',
      color: 'text-success'
    }
  ];

  const getActivityIcon = (type) => {
    const iconMap = {
      post_published: 'Send',
      team_member: 'UserPlus',
      analytics: 'BarChart3',
      error: 'AlertTriangle',
      post_scheduled: 'Calendar',
      platform_connected: 'Link'
    };
    return iconMap?.[type] || 'Activity';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${activity?.color}`}>
              <Icon name={getActivityIcon(activity?.type)} size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground mb-1">{activity?.message}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{activity?.user}</span>
                <span>•</span>
                <span>{activity?.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-center text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center space-x-2">
          <Icon name="RefreshCw" size={14} />
          <span>Refresh Activity</span>
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;