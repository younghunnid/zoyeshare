import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentPostCard = ({ post }) => {
  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter',
      linkedin: 'Linkedin',
      youtube: 'Youtube',
      tiktok: 'Music',
      pinterest: 'Pin'
    };
    return icons?.[platform] || 'Share2';
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000)?.toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000)?.toFixed(1)}K`;
    return num?.toString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start space-x-3">
        {post?.image && (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={post?.image}
              alt={post?.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            {post?.platforms?.map((platform) => (
              <div
                key={platform}
                className="w-6 h-6 rounded bg-muted flex items-center justify-center"
              >
                <Icon name={getPlatformIcon(platform)} size={14} className="text-muted-foreground" />
              </div>
            ))}
            <span className="text-xs text-muted-foreground">{post?.publishedAt}</span>
          </div>
          <h4 className="font-medium text-foreground mb-2 line-clamp-2">{post?.title}</h4>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span>{formatNumber(post?.likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} />
              <span>{formatNumber(post?.comments)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Share2" size={14} />
              <span>{formatNumber(post?.shares)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 rounded hover:bg-muted transition-colors">
            <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentPostCard;