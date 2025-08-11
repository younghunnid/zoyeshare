import React from 'react';
import Icon from '../../../components/AppIcon';

const AppLogo = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
          <Icon name="Zap" size={32} color="white" />
        </div>
      </div>

      {/* App Name & Tagline */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">ZoyeShare</h1>
        <p className="text-lg text-muted-foreground">Social Media Hub</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Streamline your social media presence across all platforms with AI-powered content optimization
        </p>
      </div>

      {/* Welcome Message */}
      <div className="pt-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Welcome Back</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to continue managing your social media content
        </p>
      </div>
    </div>
  );
};

export default AppLogo;