import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingTiers = () => {
  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '3 social platforms',
        '10 posts per month',
        'Basic analytics',
        'Standard templates'
      ],
      limitations: [
        'No AI optimization',
        'No team collaboration',
        'Limited scheduling'
      ],
      popular: false,
      buttonText: 'Start Free',
      buttonVariant: 'outline'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For serious content creators',
      features: [
        'All 8+ platforms',
        'Unlimited posts',
        'AI hashtag generator',
        'AI caption optimization',
        'Advanced analytics',
        'Content recycling',
        'Priority support'
      ],
      limitations: [],
      popular: true,
      buttonText: 'Start Pro Trial',
      buttonVariant: 'default'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Role-based permissions',
        'White-label options',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee'
      ],
      limitations: [],
      popular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">Choose Your Plan</h3>
        <p className="text-sm text-muted-foreground">
          Start free, upgrade anytime. No hidden fees.
        </p>
      </div>
      <div className="space-y-4">
        {pricingTiers?.map((tier, index) => (
          <div
            key={index}
            className={`relative bg-card/50 backdrop-blur border rounded-xl p-6 transition-all duration-200 hover:shadow-lg ${
              tier?.popular 
                ? 'border-primary shadow-lg ring-1 ring-primary/20' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            {tier?.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-4">
              <h4 className="text-lg font-bold text-foreground">{tier?.name}</h4>
              <div className="flex items-baseline justify-center space-x-1 mt-2">
                <span className="text-2xl font-bold text-foreground">{tier?.price}</span>
                <span className="text-sm text-muted-foreground">/{tier?.period}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{tier?.description}</p>
            </div>

            <div className="space-y-3 mb-6">
              {tier?.features?.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
              
              {tier?.limitations?.map((limitation, limitIndex) => (
                <div key={limitIndex} className="flex items-center space-x-2">
                  <Icon name="X" size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{limitation}</span>
                </div>
              ))}
            </div>

            <Button
              variant={tier?.buttonVariant}
              fullWidth
              className="h-10"
            >
              {tier?.buttonText}
            </Button>

            {tier?.name === 'Pro' && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                14-day free trial • Cancel anytime
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Gift" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">Referral Program</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Invite friends and earn 1 month free for each successful referral. 
              They get 20% off their first year!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTiers;