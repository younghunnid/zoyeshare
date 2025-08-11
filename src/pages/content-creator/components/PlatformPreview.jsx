import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlatformPreview = ({ selectedPlatforms, content, mediaFiles }) => {
  const [activePreview, setActivePreview] = useState(selectedPlatforms?.[0] || 'facebook');

  const platformPreviews = {
    facebook: {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      preview: (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Your Page Name</p>
                <p className="text-sm text-gray-500">2 hours ago • 🌍</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-900 whitespace-pre-wrap">{content || "Your content will appear here..."}</p>
            {mediaFiles?.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {mediaFiles?.slice(0, 4)?.map((file, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={file?.preview || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400"}
                      alt="Media preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between text-gray-500">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  <Icon name="ThumbsUp" size={16} />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm">Comment</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  <Icon name="Share" size={16} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    instagram: {
      name: 'Instagram',
      icon: 'Instagram',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      preview: (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-sm mx-auto">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <Icon name="User" size={14} color="white" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">your_username</p>
              </div>
              <Icon name="MoreHorizontal" size={16} className="text-gray-500" />
            </div>
          </div>
          {mediaFiles?.length > 0 && (
            <div className="aspect-square bg-gray-100">
              <Image
                src={mediaFiles?.[0]?.preview || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400"}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <Icon name="Heart" size={20} className="text-gray-700" />
                <Icon name="MessageCircle" size={20} className="text-gray-700" />
                <Icon name="Send" size={20} className="text-gray-700" />
              </div>
              <Icon name="Bookmark" size={20} className="text-gray-700" />
            </div>
            <p className="text-sm text-gray-900">
              <span className="font-semibold">your_username</span> {content || "Your caption will appear here..."}
            </p>
          </div>
        </div>
      )
    },
    twitter: {
      name: 'Twitter/X',
      icon: 'Twitter',
      color: 'text-blue-400',
      bgColor: 'bg-blue-50',
      preview: (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="flex space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-gray-900">Your Name</p>
                  <p className="text-gray-500">@yourusername</p>
                  <p className="text-gray-500">·</p>
                  <p className="text-gray-500">2h</p>
                </div>
                <p className="text-gray-900 mt-1 whitespace-pre-wrap">{content || "Your tweet will appear here..."}</p>
                {mediaFiles?.length > 0 && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={mediaFiles?.[0]?.preview || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400"}
                      alt="Tweet media"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mt-3 max-w-md">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm">Reply</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                    <Icon name="Repeat" size={16} />
                    <span className="text-sm">Retweet</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                    <Icon name="Heart" size={16} />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                    <Icon name="Share" size={16} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    linkedin: {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      preview: (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                <Icon name="User" size={18} color="white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Your Professional Name</p>
                <p className="text-sm text-gray-600">Your Job Title • 2nd</p>
                <p className="text-xs text-gray-500">2 hours ago • 🌍</p>
              </div>
            </div>
            <p className="text-gray-900 whitespace-pre-wrap">{content || "Your professional update will appear here..."}</p>
            {mediaFiles?.length > 0 && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={mediaFiles?.[0]?.preview || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400"}
                  alt="LinkedIn post media"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <Icon name="ThumbsUp" size={16} />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm">Comment</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <Icon name="Repeat" size={16} />
                  <span className="text-sm">Repost</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <Icon name="Send" size={16} />
                  <span className="text-sm">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const availablePreviews = selectedPlatforms?.filter(platform => platformPreviews?.[platform]);

  if (availablePreviews?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Eye" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Preview Available</h3>
        <p className="text-muted-foreground">
          Select platforms to see how your content will appear on each network.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Real-time preview</span>
        </div>
      </div>
      {/* Platform Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {availablePreviews?.map((platformId) => {
          const platform = platformPreviews?.[platformId];
          return (
            <button
              key={platformId}
              onClick={() => setActivePreview(platformId)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activePreview === platformId
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={platform?.icon} size={16} />
              <span className="text-sm font-medium">{platform?.name}</span>
            </button>
          );
        })}
      </div>
      {/* Preview Content */}
      <div className="min-h-[400px]">
        {platformPreviews?.[activePreview]?.preview}
      </div>
      {/* Preview Info */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="text-foreground font-medium">Preview Notes</p>
            <p className="text-muted-foreground">
              This is a live preview showing how your content will appear on {platformPreviews?.[activePreview]?.name}. 
              Actual appearance may vary slightly based on platform updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformPreview;