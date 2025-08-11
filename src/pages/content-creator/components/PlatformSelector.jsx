import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';


const PlatformSelector = ({ selectedPlatforms, onPlatformToggle, characterCounts }) => {
  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-500',
      maxChars: 63206,
      connected: true
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'Instagram',
      color: 'text-pink-500',
      maxChars: 2200,
      connected: true
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: 'Twitter',
      color: 'text-blue-400',
      maxChars: 280,
      connected: true
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      maxChars: 3000,
      connected: true
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'Music',
      color: 'text-red-500',
      maxChars: 2200,
      connected: false
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'Youtube',
      color: 'text-red-600',
      maxChars: 5000,
      connected: true
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: 'Pin',
      color: 'text-red-500',
      maxChars: 500,
      connected: false
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: 'Camera',
      color: 'text-yellow-400',
      maxChars: 250,
      connected: false
    }
  ];

  const getCharacterStatus = (platformId, maxChars) => {
    const count = characterCounts?.[platformId] || 0;
    const percentage = (count / maxChars) * 100;
    
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Select Platforms</h3>
        <Button variant="ghost" size="sm" iconName="Settings">
          Manage
        </Button>
      </div>
      <div className="space-y-4">
        {platforms?.map((platform) => (
          <div
            key={platform?.id}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
              selectedPlatforms?.includes(platform?.id)
                ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
            } ${!platform?.connected ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={selectedPlatforms?.includes(platform?.id)}
                onChange={(e) => onPlatformToggle(platform?.id, e?.target?.checked)}
                disabled={!platform?.connected}
              />
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${platform?.color}`}>
                <Icon name={platform?.icon} size={16} />
              </div>
              <div>
                <p className="font-medium text-foreground">{platform?.name}</p>
                {!platform?.connected && (
                  <p className="text-xs text-muted-foreground">Not connected</p>
                )}
              </div>
            </div>

            {platform?.connected && selectedPlatforms?.includes(platform?.id) && (
              <div className="text-right">
                <p className={`text-sm font-medium ${getCharacterStatus(platform?.id, platform?.maxChars)}`}>
                  {characterCounts?.[platform?.id] || 0}/{platform?.maxChars}
                </p>
                <p className="text-xs text-muted-foreground">characters</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="text-foreground font-medium">Platform Tips</p>
            <p className="text-muted-foreground">
              Connect more platforms in Settings to expand your reach. Each platform has different character limits and content requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSelector;