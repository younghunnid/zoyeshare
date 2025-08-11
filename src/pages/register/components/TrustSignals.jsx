import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: '256-bit AES Encryption',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: 'Lock',
      title: 'OAuth 2.0 Integration',
      description: 'Secure connections to all social platforms'
    },
    {
      icon: 'Eye',
      title: 'Privacy Control Center',
      description: 'Revoke permissions instantly anytime'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      quote: `ZoyeShare transformed my workflow. I now post to 8 platforms in minutes instead of hours.`
    },
    {
      name: 'Marcus Johnson',
      role: 'Marketing Director',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      quote: `The AI optimization increased our engagement by 340% across all channels.`
    }
  ];

  const platformStats = [
    { platform: 'Instagram', users: '2B+', icon: 'Instagram' },
    { platform: 'TikTok', users: '1B+', icon: 'Video' },
    { platform: 'LinkedIn', users: '900M+', icon: 'Linkedin' },
    { platform: 'Twitter/X', users: '450M+', icon: 'Twitter' }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="ShieldCheck" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Enterprise Security</h3>
        </div>
        <div className="space-y-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{feature?.title}</h4>
                <p className="text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Coverage */}
      <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Connect to All Major Platforms</h3>
        <div className="grid grid-cols-2 gap-3">
          {platformStats?.map((platform, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/30">
              <Icon name={platform?.icon} size={16} className="text-primary" />
              <div>
                <p className="text-xs font-medium text-foreground">{platform?.platform}</p>
                <p className="text-xs text-muted-foreground">{platform?.users} users</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Trusted by Creators</h3>
        {testimonials?.map((testimonial, index) => (
          <div key={index} className="bg-card/50 backdrop-blur border border-border rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <img
                src={testimonial?.avatar}
                alt={testimonial?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-sm font-medium text-foreground">{testimonial?.name}</h4>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{testimonial?.role}</span>
                </div>
                <p className="text-sm text-muted-foreground italic">"{testimonial?.quote}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Badges */}
      <div className="flex items-center justify-center space-x-6 py-4">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">OAuth Verified</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="text-xs text-muted-foreground">50K+ Users</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;