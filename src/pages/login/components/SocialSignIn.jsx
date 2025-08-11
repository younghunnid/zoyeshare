import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const SocialSignIn = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialSignIn = async (provider) => {
    setLoadingProvider(provider);
    
    // Simulate OAuth flow
    setTimeout(() => {
      // Store user session for social login
      localStorage.setItem('zoyeshare_user', JSON.stringify({
        email: `user@${provider}.com`,
        name: `${provider} User`,
        tier: 'Free',
        connectedPlatforms: 2,
        hasNotifications: false,
        loginTime: new Date()?.toISOString(),
        provider: provider
      }));
      
      navigate('/dashboard');
      setLoadingProvider(null);
    }, 2000);
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
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            onClick={() => handleSocialSignIn(provider?.id)}
            disabled={loadingProvider !== null}
            className={`
              relative flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-200
              ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor}
              ${loadingProvider === provider?.id ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {loadingProvider === provider?.id ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">Connecting...</span>
              </div>
            ) : (
              <>
                <Icon name={provider?.icon} size={20} />
                <span className="font-medium">Continue with {provider?.name}</span>
              </>
            )}
          </button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialSignIn;