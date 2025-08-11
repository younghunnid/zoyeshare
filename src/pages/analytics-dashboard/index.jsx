import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import PerformanceChart from './components/PerformanceChart';
import PlatformBreakdown from './components/PlatformBreakdown';
import TopPostsTable from './components/TopPostsTable';
import DateRangeSelector from './components/DateRangeSelector';
import ExportOptions from './components/ExportOptions';
import BenchmarkComparison from './components/BenchmarkComparison';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0],
    endDate: new Date()?.toISOString()?.split('T')?.[0],
    preset: '30d'
  });
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock KPI data
  const kpiData = [
    {
      title: "Total Engagement",
      value: "847K",
      change: "+12.5%",
      changeType: "positive",
      icon: "Heart",
      color: "primary"
    },
    {
      title: "Total Reach",
      value: "2.1M",
      change: "+8.3%",
      changeType: "positive",
      icon: "Eye",
      color: "secondary"
    },
    {
      title: "Click-throughs",
      value: "45.2K",
      change: "-2.1%",
      changeType: "negative",
      icon: "MousePointer",
      color: "accent"
    },
    {
      title: "Follower Growth",
      value: "+3.8K",
      change: "+15.7%",
      changeType: "positive",
      icon: "UserPlus",
      color: "success"
    }
  ];

  // Mock performance chart data
  const performanceData = [
    {
      date: "Jan 1",
      facebook_engagement: 4200,
      instagram_engagement: 3800,
      twitter_engagement: 2100,
      linkedin_engagement: 1500,
      facebook_reach: 12000,
      instagram_reach: 15000,
      twitter_reach: 8000,
      linkedin_reach: 5000,
      facebook_clicks: 850,
      instagram_clicks: 920,
      twitter_clicks: 420,
      linkedin_clicks: 280,
      facebook_followers: 150,
      instagram_followers: 200,
      twitter_followers: 80,
      linkedin_followers: 45
    },
    {
      date: "Jan 8",
      facebook_engagement: 4500,
      instagram_engagement: 4100,
      twitter_engagement: 2300,
      linkedin_engagement: 1700,
      facebook_reach: 13000,
      instagram_reach: 16000,
      twitter_reach: 8500,
      linkedin_reach: 5500,
      facebook_clicks: 900,
      instagram_clicks: 980,
      twitter_clicks: 460,
      linkedin_clicks: 320,
      facebook_followers: 180,
      instagram_followers: 220,
      twitter_followers: 90,
      linkedin_followers: 55
    },
    {
      date: "Jan 15",
      facebook_engagement: 4800,
      instagram_engagement: 4400,
      twitter_engagement: 2500,
      linkedin_engagement: 1900,
      facebook_reach: 14000,
      instagram_reach: 17000,
      twitter_reach: 9000,
      linkedin_reach: 6000,
      facebook_clicks: 950,
      instagram_clicks: 1040,
      twitter_clicks: 500,
      linkedin_clicks: 360,
      facebook_followers: 200,
      instagram_followers: 250,
      twitter_followers: 100,
      linkedin_followers: 65
    },
    {
      date: "Jan 22",
      facebook_engagement: 5100,
      instagram_engagement: 4700,
      twitter_engagement: 2700,
      linkedin_engagement: 2100,
      facebook_reach: 15000,
      instagram_reach: 18000,
      twitter_reach: 9500,
      linkedin_reach: 6500,
      facebook_clicks: 1000,
      instagram_clicks: 1100,
      twitter_clicks: 540,
      linkedin_clicks: 400,
      facebook_followers: 220,
      instagram_followers: 280,
      twitter_followers: 110,
      linkedin_followers: 75
    },
    {
      date: "Jan 29",
      facebook_engagement: 5400,
      instagram_engagement: 5000,
      twitter_engagement: 2900,
      linkedin_engagement: 2300,
      facebook_reach: 16000,
      instagram_reach: 19000,
      twitter_reach: 10000,
      linkedin_reach: 7000,
      facebook_clicks: 1050,
      instagram_clicks: 1160,
      twitter_clicks: 580,
      linkedin_clicks: 440,
      facebook_followers: 240,
      instagram_followers: 300,
      twitter_followers: 120,
      linkedin_followers: 85
    }
  ];

  const platforms = [
    { key: 'facebook', name: 'Facebook', icon: 'Facebook' },
    { key: 'instagram', name: 'Instagram', icon: 'Instagram' },
    { key: 'twitter', name: 'Twitter', icon: 'Twitter' },
    { key: 'linkedin', name: 'LinkedIn', icon: 'Linkedin' }
  ];

  // Mock platform breakdown data
  const platformBreakdownData = [
    { platform: "Instagram", value: 45200, total: 120000 },
    { platform: "Facebook", value: 38500, total: 120000 },
    { platform: "Twitter", value: 22100, total: 120000 },
    { platform: "LinkedIn", value: 14200, total: 120000 }
  ];

  // Mock top posts data
  const topPostsData = [
    {
      id: 1,
      title: "New Product Launch Announcement",
      content: "Excited to introduce our latest innovation that will revolutionize how you create content...",
      platform: "Instagram",
      publishedAt: "2025-01-10T10:00:00Z",
      engagement: 12500,
      reach: 45000,
      clicks: 2800,
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Behind the Scenes: Team Collaboration",
      content: "Take a look at how our amazing team works together to bring you the best social media tools...",
      platform: "Facebook",
      publishedAt: "2025-01-09T14:30:00Z",
      engagement: 9800,
      reach: 38000,
      clicks: 2200,
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "5 Tips for Better Social Media Engagement",
      content: "Learn the secrets to creating content that your audience will love and engage with...",
      platform: "LinkedIn",
      publishedAt: "2025-01-08T09:15:00Z",
      engagement: 7600,
      reach: 28000,
      clicks: 1900,
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Quick Tutorial: Scheduling Posts",
      content: "Master the art of content scheduling with our step-by-step guide...",
      platform: "Twitter",
      publishedAt: "2025-01-07T16:45:00Z",
      engagement: 5400,
      reach: 22000,
      clicks: 1500,
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Customer Success Story",
      content: "See how @brandname increased their engagement by 300% using ZoyeShare...",
      platform: "Instagram",
      publishedAt: "2025-01-06T12:20:00Z",
      engagement: 8900,
      reach: 35000,
      clicks: 2100,
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Industry Trends Report 2025",
      content: "Discover the latest social media trends that will shape content creation this year...",
      platform: "LinkedIn",
      publishedAt: "2025-01-05T11:00:00Z",
      engagement: 6700,
      reach: 25000,
      clicks: 1800,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    }
  ];

  // Mock benchmark data
  const benchmarkData = [
    {
      platform: "Instagram",
      your_value: 4.2,
      benchmark_value: 3.8
    },
    {
      platform: "Facebook",
      your_value: 2.8,
      benchmark_value: 3.2
    },
    {
      platform: "Twitter",
      your_value: 1.9,
      benchmark_value: 2.1
    },
    {
      platform: "LinkedIn",
      your_value: 3.5,
      benchmark_value: 2.9
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setRefreshing(false);
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    // In a real app, this would trigger data refetch
    console.log('Date range changed:', newRange);
  };

  const handleExport = (exportOption) => {
    console.log('Exporting data:', exportOption);
    // In a real app, this would trigger the actual export
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Analytics Dashboard - ZoyeShare</title>
        <meta name="description" content="Comprehensive social media analytics and performance insights for data-driven content strategy optimization." />
      </Helmet>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your social media performance and optimize your content strategy
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <DateRangeSelector 
                onDateRangeChange={handleDateRangeChange}
                selectedRange={dateRange}
              />
              
              <Button
                variant="outline"
                onClick={handleRefresh}
                loading={refreshing}
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
              >
                Refresh
              </Button>
              
              <ExportOptions onExport={handleExport} />
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData?.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi?.title}
              value={kpi?.value}
              change={kpi?.change}
              changeType={kpi?.changeType}
              icon={kpi?.icon}
              color={kpi?.color}
            />
          ))}
        </div>

        {/* Performance Chart */}
        <PerformanceChart
          data={performanceData}
          title="Performance Over Time"
          platforms={platforms}
        />

        {/* Platform Breakdown and Benchmark Comparison */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PlatformBreakdown
            data={platformBreakdownData}
            title="Engagement by Platform"
          />
          
          <BenchmarkComparison
            data={benchmarkData}
            title="Benchmark Comparison"
          />
        </div>

        {/* Top Posts Table */}
        <TopPostsTable
          posts={topPostsData}
          title="Top Performing Posts"
        />

        {/* Insights and Recommendations */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Icon name="Lightbulb" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">Recommendations based on your performance data</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Growth Opportunity</span>
              </div>
              <p className="text-sm text-card-foreground">
                Your Instagram engagement is 15% above industry average. Consider increasing posting frequency to capitalize on this momentum.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Optimization Tip</span>
              </div>
              <p className="text-sm text-card-foreground">
                Posts with images receive 2.3x more engagement. Try adding more visual content to your Twitter strategy.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Best Time to Post</span>
              </div>
              <p className="text-sm text-card-foreground">
                Your audience is most active on weekdays between 2-4 PM. Schedule your important posts during this window.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;