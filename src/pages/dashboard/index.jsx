import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import MetricsCard from './components/MetricsCard';
import CreatePostButton from './components/CreatePostButton';
import RecentPostCard from './components/RecentPostCard';
import CalendarWidget from './components/CalendarWidget';
import TrendingHashtags from './components/TrendingHashtags';
import PlatformStatus from './components/PlatformStatus';
import EngagementChart from './components/EngagementChart';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock user context
  const userContext = {
    name: 'Alex Thompson',
    tier: 'Pro Plan',
    connectedPlatforms: 5,
    hasNotifications: true
  };

  // Mock metrics data
  const metricsData = [
    {
      title: 'Total Reach',
      value: '2.4M',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: '+0.3%',
      changeType: 'positive',
      icon: 'Heart',
      color: 'secondary'
    },
    {
      title: 'Follower Growth',
      value: '+1,247',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      title: 'Scheduled Posts',
      value: '24',
      change: '+6',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'accent'
    }
  ];

  // Mock recent posts data
  const recentPosts = [
    {
      id: 1,
      title: 'Weekend motivation: Success is not final, failure is not fatal. It is the courage to continue that counts.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      platforms: ['instagram', 'facebook', 'twitter'],
      publishedAt: '2 hours ago',
      likes: 1247,
      comments: 89,
      shares: 156
    },
    {
      id: 2,
      title: 'Behind the scenes: Creating content that resonates with your audience requires authenticity and consistency.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=400&h=300&fit=crop',
      platforms: ['linkedin', 'twitter'],
      publishedAt: '5 hours ago',
      likes: 892,
      comments: 45,
      shares: 78
    },
    {
      id: 3,
      title: 'Product launch announcement: Introducing our latest feature that will revolutionize your workflow.',
      image: 'https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg?w=400&h=300&fit=crop',
      platforms: ['facebook', 'instagram', 'linkedin'],
      publishedAt: '1 day ago',
      likes: 2156,
      comments: 234,
      shares: 445
    },
    {
      id: 4,
      title: 'Tips for social media success: Consistency, engagement, and value creation are key to building a strong online presence.',
      platforms: ['twitter', 'linkedin'],
      publishedAt: '2 days ago',
      likes: 567,
      comments: 67,
      shares: 89
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {userContext?.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userContext?.tier}</p>
                <p className="text-xs text-muted-foreground">
                  {userContext?.connectedPlatforms} platforms connected
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Icon name="User" size={24} color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData?.map((metric, index) => (
            <MetricsCard 
              key={index} 
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Create Post Section */}
            <CreatePostButton />

            {/* Engagement Chart */}
            <EngagementChart />

            {/* Recent Posts */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Recent Posts</h3>
                <button
                  onClick={() => navigate('/analytics-dashboard')}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View All Analytics
                </button>
              </div>
              <div className="space-y-4">
                {recentPosts?.map((post) => (
                  <RecentPostCard key={post?.id} post={post} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar Widget */}
            <CalendarWidget />

            {/* Quick Actions */}
            <QuickActions />

            {/* Platform Status */}
            <PlatformStatus />

            {/* Trending Hashtags */}
            <TrendingHashtags />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <RecentActivity />

          {/* Performance Summary */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Performance Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Best Performing Post</p>
                    <p className="text-xs text-muted-foreground">Product launch announcement</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-success">2.1K</p>
                  <p className="text-xs text-muted-foreground">engagements</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Top Platform</p>
                    <p className="text-xs text-muted-foreground">Instagram</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">45.2%</p>
                  <p className="text-xs text-muted-foreground">of total reach</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} className="text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Best Time to Post</p>
                    <p className="text-xs text-muted-foreground">Based on your audience</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent">2:00 PM</p>
                  <p className="text-xs text-muted-foreground">weekdays</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;