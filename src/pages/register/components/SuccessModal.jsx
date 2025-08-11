import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, userEmail, onResendEmail }) => {
  if (!isOpen) return null;

  const nextSteps = [
    {
      step: 1,
      title: 'Check your email',
      description: `We sent a verification link to ${userEmail}`,
      icon: 'Mail'
    },
    {
      step: 2,
      title: 'Click the verification link',
      description: 'This confirms your email address and activates your account',
      icon: 'MousePointer'
    },
    {
      step: 3,
      title: 'Connect your platforms',
      description: 'Link your social media accounts to start posting',
      icon: 'Link'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Account Created!</h2>
          <p className="text-muted-foreground">
            Welcome to ZoyeShare! Let's verify your email to get started.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {nextSteps?.map((step) => (
            <div key={step?.step} className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={step?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Step {step?.step}: {step?.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {step?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={onClose}
            className="h-12"
          >
            Got it, check my email
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            onClick={onResendEmail}
            className="h-10 text-sm"
          >
            Didn't receive the email? Resend
          </Button>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">
                <strong>Can't find the email?</strong> Check your spam folder or 
                add noreply@zoyeshare.com to your contacts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;