import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionSection = ({ subscriptionData, onUpdateSubscription }) => {
  const [showBillingHistory, setShowBillingHistory] = useState(false);

  const currentPlan = {
    name: "Free Plan",
    price: "$0",
    period: "month",
    features: [
      "5 social media accounts",
      "10 posts per month",
      "Basic analytics",
      "Email support"
    ],
    limits: {
      accounts: { used: 3, total: 5 },
      posts: { used: 7, total: 10 },
      storage: { used: 2.1, total: 5 }
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'month',
      popular: false,
      features: [
        '5 social media accounts',
        '10 posts per month',
        'Basic analytics',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      period: 'month',
      popular: true,
      features: [
        '25 social media accounts',
        'Unlimited posts',
        'Advanced analytics',
        'AI content suggestions',
        'Priority support',
        'Team collaboration'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      popular: false,
      features: [
        'Unlimited accounts',
        'Unlimited posts',
        'Custom analytics',
        'White-label solution',
        'Dedicated support',
        'Advanced team features',
        'API access'
      ]
    }
  ];

  const billingHistory = [
    {
      id: 1,
      date: "2025-01-01",
      description: "Pro Plan - Monthly",
      amount: "$29.00",
      status: "paid",
      invoice: "INV-2025-001"
    },
    {
      id: 2,
      date: "2024-12-01",
      description: "Pro Plan - Monthly",
      amount: "$29.00",
      status: "paid",
      invoice: "INV-2024-012"
    },
    {
      id: 3,
      date: "2024-11-01",
      description: "Pro Plan - Monthly",
      amount: "$29.00",
      status: "paid",
      invoice: "INV-2024-011"
    }
  ];

  const getProgressPercentage = (used, total) => {
    return Math.min((used / total) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  };

  const handlePlanUpgrade = (planId) => {
    onUpdateSubscription({ type: 'upgrade', planId });
  };

  const handleCancelSubscription = () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      onUpdateSubscription({ type: 'cancel' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Current Plan</h3>
            <p className="text-sm text-muted-foreground">Manage your subscription and billing</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{currentPlan?.price}</p>
            <p className="text-sm text-muted-foreground">per {currentPlan?.period}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Social Accounts</span>
              <span className="text-sm text-muted-foreground">
                {currentPlan?.limits?.accounts?.used}/{currentPlan?.limits?.accounts?.total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(getProgressPercentage(currentPlan?.limits?.accounts?.used, currentPlan?.limits?.accounts?.total))}`}
                style={{ width: `${getProgressPercentage(currentPlan?.limits?.accounts?.used, currentPlan?.limits?.accounts?.total)}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Posts This Month</span>
              <span className="text-sm text-muted-foreground">
                {currentPlan?.limits?.posts?.used}/{currentPlan?.limits?.posts?.total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(getProgressPercentage(currentPlan?.limits?.posts?.used, currentPlan?.limits?.posts?.total))}`}
                style={{ width: `${getProgressPercentage(currentPlan?.limits?.posts?.used, currentPlan?.limits?.posts?.total)}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Storage Used</span>
              <span className="text-sm text-muted-foreground">
                {currentPlan?.limits?.storage?.used}GB/{currentPlan?.limits?.storage?.total}GB
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(getProgressPercentage(currentPlan?.limits?.storage?.used, currentPlan?.limits?.storage?.total))}`}
                style={{ width: `${getProgressPercentage(currentPlan?.limits?.storage?.used, currentPlan?.limits?.storage?.total)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="default"
            iconName="ArrowUp"
            iconPosition="left"
            onClick={() => handlePlanUpgrade('pro')}
          >
            Upgrade Plan
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Download Invoice
          </Button>
        </div>
      </div>
      {/* Available Plans */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Available Plans</h3>
          <p className="text-sm text-muted-foreground">Choose the plan that fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan) => (
            <div 
              key={plan?.id}
              className={`relative p-6 rounded-lg border ${
                plan?.popular 
                  ? 'border-primary bg-primary/5' :'border-border bg-muted/30'
              }`}
            >
              {plan?.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-foreground mb-2">{plan?.name}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">${plan?.price}</span>
                  <span className="text-muted-foreground">/{plan?.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan?.popular ? "default" : "outline"}
                fullWidth
                onClick={() => handlePlanUpgrade(plan?.id)}
                disabled={plan?.id === 'free'}
              >
                {plan?.id === 'free' ? 'Current Plan' : `Upgrade to ${plan?.name}`}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Billing History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
            <p className="text-sm text-muted-foreground">View your past invoices and payments</p>
          </div>
          <Button
            variant="outline"
            iconName={showBillingHistory ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setShowBillingHistory(!showBillingHistory)}
          >
            {showBillingHistory ? 'Hide' : 'Show'} History
          </Button>
        </div>

        {showBillingHistory && (
          <div className="space-y-3">
            {billingHistory?.map((invoice) => (
              <div key={invoice?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{invoice?.description}</p>
                  <p className="text-sm text-muted-foreground">{invoice?.date} • {invoice?.invoice}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-foreground">{invoice?.amount}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    invoice?.status === 'paid' ?'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
                  }`}>
                    {invoice?.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Danger Zone */}
      <div className="bg-card rounded-lg border border-error p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-error">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">Irreversible and destructive actions</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-error/5 rounded-lg border border-error/20">
          <div>
            <p className="font-medium text-foreground">Cancel Subscription</p>
            <p className="text-sm text-muted-foreground">You will lose access to premium features</p>
          </div>
          <Button
            variant="destructive"
            iconName="X"
            iconPosition="left"
            onClick={handleCancelSubscription}
          >
            Cancel Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;