import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const EngagementChart = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['all']);
  const [timeRange, setTimeRange] = useState('7d');

  const chartData = [
    { date: 'Jan 5', facebook: 1200, instagram: 1800, twitter: 800, linkedin: 600, total: 4400 },
    { date: 'Jan 6', facebook: 1400, instagram: 2100, twitter: 900, linkedin: 700, total: 5100 },
    { date: 'Jan 7', facebook: 1100, instagram: 1900, twitter: 750, linkedin: 650, total: 4400 },
    { date: 'Jan 8', facebook: 1600, instagram: 2300, twitter: 1100, linkedin: 800, total: 5800 },
    { date: 'Jan 9', facebook: 1300, instagram: 2000, twitter: 850, linkedin: 720, total: 4870 },
    { date: 'Jan 10', facebook: 1500, instagram: 2200, twitter: 950, linkedin: 750, total: 5400 },
    { date: 'Jan 11', facebook: 1700, instagram: 2400, twitter: 1000, linkedin: 850, total: 5950 }
  ];

  const platforms = [
    { key: 'all', label: 'All Platforms', color: '#6366F1' },
    { key: 'facebook', label: 'Facebook', color: '#1877F2' },
    { key: 'instagram', label: 'Instagram', color: '#E4405F' },
    { key: 'twitter', label: 'Twitter', color: '#1DA1F2' },
    { key: 'linkedin', label: 'LinkedIn', color: '#0A66C2' }
  ];

  const timeRanges = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' }
  ];

  const togglePlatform = (platformKey) => {
    if (platformKey === 'all') {
      setSelectedPlatforms(['all']);
    } else {
      setSelectedPlatforms(prev => {
        const filtered = prev?.filter(p => p !== 'all');
        if (filtered?.includes(platformKey)) {
          const newSelection = filtered?.filter(p => p !== platformKey);
          return newSelection?.length === 0 ? ['all'] : newSelection;
        } else {
          return [...filtered, platformKey];
        }
      });
    }
  };

  const getVisibleLines = () => {
    if (selectedPlatforms?.includes('all')) {
      return [{ key: 'total', color: '#6366F1' }];
    }
    return platforms?.filter(p => selectedPlatforms?.includes(p?.key) && p?.key !== 'all');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Engagement Trends</h3>
        <div className="flex items-center space-x-2">
          {timeRanges?.map(range => (
            <button
              key={range?.key}
              onClick={() => setTimeRange(range?.key)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                timeRange === range?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-popover-foreground)'
              }}
            />
            {getVisibleLines()?.map(line => (
              <Line
                key={line?.key}
                type="monotone"
                dataKey={line?.key}
                stroke={line?.color}
                strokeWidth={2}
                dot={{ fill: line?.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: line?.color, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-2">
        {platforms?.map(platform => (
          <button
            key={platform?.key}
            onClick={() => togglePlatform(platform?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs transition-all ${
              selectedPlatforms?.includes(platform?.key)
                ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: platform?.color }}
            ></div>
            <span>{platform?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EngagementChart;