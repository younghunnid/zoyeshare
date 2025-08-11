import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from './components/AppLogo';
import LoginForm from './components/LoginForm';
import SocialSignIn from './components/SocialSignIn';
import TrustSignals from './components/TrustSignals';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('zoyeshare_user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      {/* Main Content */}
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-8">
          {/* App Logo */}
          <AppLogo />

          {/* Login Form */}
          <div className="space-y-6">
            <LoginForm />
            
            {/* Social Sign In */}
            <SocialSignIn />
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 bg-card/80 backdrop-blur-xl border border-border/30 rounded-xl p-6">
          <TrustSignals />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ZoyeShare. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              Privacy Policy
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              Terms of Service
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              Support
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-pulse delay-500" />
    </div>
  );
};

export default LoginPage;