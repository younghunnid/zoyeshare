import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import SocialAuthButtons from './components/SocialAuthButtons';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import PricingTiers from './components/PricingTiers';
import SuccessModal from './components/SuccessModal';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Mock credentials for testing
  const mockCredentials = {
    testUser: {
      email: 'test@zoyeshare.com',
      password: 'Test123!@#'
    },
    creator: {
      email: 'creator@zoyeshare.com',
      password: 'Creator123!@#'
    },
    business: {
      email: 'business@zoyeshare.com',
      password: 'Business123!@#'
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    try {
      // Mock social authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful social auth
      const mockUser = {
        id: Date.now(),
        name: provider === 'google' ? 'John Doe' : 'Jane Smith',
        email: provider === 'google' ? 'john@gmail.com' : 'jane@icloud.com',
        provider: provider,
        verified: true
      };

      console.log('Social auth successful:', mockUser);
      navigate('/dashboard');
    } catch (error) {
      console.error('Social auth failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // Mock form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if email already exists (mock validation)
      const existingEmails = Object.values(mockCredentials)?.map(cred => cred?.email);
      if (existingEmails?.includes(formData?.email)) {
        throw new Error('An account with this email already exists');
      }

      // Simulate successful registration
      const newUser = {
        id: Date.now(),
        name: formData?.fullName,
        email: formData?.email,
        verified: false,
        subscribeNewsletter: formData?.subscribeNewsletter,
        createdAt: new Date()?.toISOString()
      };

      console.log('Registration successful:', newUser);
      setRegisteredEmail(formData?.email);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      // Mock resend email
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Verification email resent successfully!');
    } catch (error) {
      console.error('Failed to resend email:', error);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // In a real app, you might redirect to a verification pending page
    // For now, we'll just close the modal
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - ZoyeShare | Multi-Platform Social Media Management</title>
        <meta name="description" content="Create your ZoyeShare account and start managing all your social media platforms from one powerful dashboard. Join 50,000+ content creators today." />
        <meta name="keywords" content="social media management, content creation, multi-platform posting, social media scheduler" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Background Gradient */}
        <div className="fixed inset-0 gradient-bg opacity-10" />
        
        <div className="relative z-10 min-h-screen flex">
          {/* Left Side - Registration Form */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md space-y-8">
              {/* Header */}
              <div className="text-center">
                <Link to="/" className="inline-flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Icon name="Zap" size={24} color="white" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-2xl font-bold text-foreground">ZoyeShare</h1>
                    <p className="text-sm text-muted-foreground">Social Media Hub</p>
                  </div>
                </Link>

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
                  <p className="text-muted-foreground">
                    Join thousands of creators managing their social presence
                  </p>
                </div>
              </div>

              {/* Social Auth Buttons */}
              <SocialAuthButtons 
                onSocialAuth={handleSocialAuth}
                isLoading={isLoading}
              />

              {/* Registration Form */}
              <RegistrationForm 
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Trust Signals & Pricing */}
          <div className="hidden lg:flex lg:w-96 xl:w-[480px] bg-card/30 backdrop-blur border-l border-border">
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="space-y-8">
                {/* Value Proposition */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Icon name="Rocket" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Supercharge Your Social Presence
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Post to 8+ platforms simultaneously with AI-powered optimization 
                      and real-time analytics.
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">What you'll get:</h4>
                  <div className="space-y-3">
                    {[
                      { icon: 'Zap', text: 'AI-powered content optimization' },
                      { icon: 'Calendar', text: 'Smart scheduling across platforms' },
                      { icon: 'BarChart3', text: 'Real-time analytics dashboard' },
                      { icon: 'Users', text: 'Team collaboration tools' }
                    ]?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={feature?.icon} size={16} className="text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{feature?.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Signals */}
                <TrustSignals />

                {/* Pricing Tiers */}
                <PricingTiers />
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          userEmail={registeredEmail}
          onResendEmail={handleResendEmail}
        />
      </div>
    </>
  );
};

export default Register;