import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'schedule',
      title: 'Schedule Post',
      description: 'Plan content for later',
      icon: 'Calendar',
      color: 'bg-primary',
      action: () => navigate('/content-creator')
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: 'BarChart3',
      color: 'bg-secondary',
      action: () => navigate('/analytics-dashboard')
    },
    {
      id: 'settings',
      title: 'Account Settings',
      description: 'Manage your preferences',
      icon: 'Settings',
      color: 'bg-accent',
      action: () => navigate('/account-settings')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 text-left group"
          >
            <div className={`w-10 h-10 rounded-lg ${action?.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
              <Icon name={action?.icon} size={18} color="white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {action?.title}
              </h4>
              <p className="text-xs text-muted-foreground">{action?.description}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Zap"
          iconPosition="left"
          onClick={() => navigate('/content-creator')}
        >
          Create Content Now
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;