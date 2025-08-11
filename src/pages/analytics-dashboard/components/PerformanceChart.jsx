import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import Button from '../../../components/ui/Button';

const PerformanceChart = ({ data, title, platforms }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms?.map(p => p?.key));
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const platformColors = {
    facebook: '#1877F2',
    instagram: '#E4405F',
    twitter: '#1DA1F2',
    linkedin: '#0A66C2',
    tiktok: '#000000',
    youtube: '#FF0000'
  };

  const metrics = [
    { key: 'engagement', label: 'Engagement Rate', color: '#6366F1' },
    { key: 'reach', label: 'Reach', color: '#8B5CF6' },
    { key: 'clicks', label: 'Click-throughs', color: '#F59E0B' },
    { key: 'followers', label: 'Follower Growth', color: '#10B981' }
  ];

  const togglePlatform = (platformKey) => {
    setSelectedPlatforms(prev => 
      prev?.includes(platformKey) 
        ? prev?.filter(p => p !== platformKey)
        : [...prev, platformKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-popover-foreground">
                {entry?.name}: {entry?.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 lg:mb-0">{title}</h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Metric Selector */}
          <div className="flex flex-wrap gap-2">
            {metrics?.map(metric => (
              <Button
                key={metric?.key}
                variant={selectedMetric === metric?.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMetric(metric?.key)}
              >
                {metric?.label}
              </Button>
            ))}
          </div>
          
          {/* Platform Filters */}
          <div className="flex flex-wrap gap-2">
            {platforms?.map(platform => (
              <Button
                key={platform?.key}
                variant={selectedPlatforms?.includes(platform?.key) ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePlatform(platform?.key)}
                iconName={platform?.icon}
                iconPosition="left"
                iconSize={16}
              >
                {platform?.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedPlatforms?.map(platformKey => {
              const platform = platforms?.find(p => p?.key === platformKey);
              return (
                <Line
                  key={platformKey}
                  type="monotone"
                  dataKey={`${platformKey}_${selectedMetric}`}
                  stroke={platformColors?.[platformKey]}
                  strokeWidth={2}
                  dot={{ fill: platformColors?.[platformKey], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: platformColors?.[platformKey], strokeWidth: 2 }}
                  name={platform?.name}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;