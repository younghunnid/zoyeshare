import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendingHashtags = () => {
  const trendingHashtags = [
    { tag: '#SocialMediaMarketing', posts: '2.4M', trend: 'up' },
    { tag: '#ContentCreator', posts: '1.8M', trend: 'up' },
    { tag: '#DigitalMarketing', posts: '3.1M', trend: 'stable' },
    { tag: '#Influencer', posts: '956K', trend: 'up' },
    { tag: '#BrandStrategy', posts: '743K', trend: 'down' },
    { tag: '#SocialMedia', posts: '5.2M', trend: 'up' },
    { tag: '#Marketing', posts: '4.7M', trend: 'stable' },
    { tag: '#ContentStrategy', posts: '892K', trend: 'up' }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return { icon: 'TrendingUp', color: 'text-success' };
    if (trend === 'down') return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Trending Hashtags</h3>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {trendingHashtags?.map((hashtag, index) => {
          const trendInfo = getTrendIcon(hashtag?.trend);
          return (
            <div key={index} className="flex items-center justify-between group hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors cursor-pointer">
              <div className="flex-1">
                <p className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                  {hashtag?.tag}
                </p>
                <p className="text-xs text-muted-foreground">{hashtag?.posts} posts</p>
              </div>
              <div className={`flex items-center space-x-1 ${trendInfo?.color}`}>
                <Icon name={trendInfo?.icon} size={14} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-center text-muted-foreground hover:text-foreground transition-colors">
          Refresh Trends
        </button>
      </div>
    </div>
  );
};

export default TrendingHashtags;