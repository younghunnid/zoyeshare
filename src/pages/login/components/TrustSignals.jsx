import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 'ssl',
      icon: 'Shield',
      text: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      id: 'privacy',
      icon: 'Lock',
      text: 'Privacy Protected',
      description: 'GDPR compliant'
    },
    {
      id: 'oauth',
      icon: 'CheckCircle',
      text: 'OAuth Verified',
      description: 'Secure authentication'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'Posts Scheduled', value: '2M+' },
    { label: 'Platforms Connected', value: '8' }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <div className="flex items-center justify-center space-x-6">
        {trustBadges?.map((badge) => (
          <div key={badge?.id} className="flex flex-col items-center space-y-1 text-center">
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name={badge?.icon} size={16} className="text-success" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">{badge?.text}</p>
              <p className="text-xs text-muted-foreground">{badge?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Platform Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-lg font-bold text-primary">{stat?.value}</p>
            <p className="text-xs text-muted-foreground">{stat?.label}</p>
          </div>
        ))}
      </div>
      {/* Security Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Your data is protected with enterprise-grade security.\n
          We never store your social media passwords.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;