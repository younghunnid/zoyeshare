import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuthButtons = ({ onSocialAuth, isLoading }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialAuth = async (provider) => {
    setLoadingProvider(provider);
    try {
      await onSocialAuth(provider);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-300'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">Sign up with your social account</p>
      </div>
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth(provider?.id)}
          disabled={isLoading || loadingProvider !== null}
          loading={loadingProvider === provider?.id}
          className={`${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} h-12`}
        >
          <div className="flex items-center justify-center space-x-3">
            <Icon name={provider?.icon} size={20} />
            <span className="font-medium">Continue with {provider?.name}</span>
          </div>
        </Button>
      ))}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">or sign up with email</span>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthButtons;