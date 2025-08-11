import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const PlatformBreakdown = ({ data, title }) => {
  const platformColors = {
    Facebook: '#1877F2',
    Instagram: '#E4405F',
    Twitter: '#1DA1F2',
    LinkedIn: '#0A66C2',
    TikTok: '#000000',
    YouTube: '#FF0000'
  };

  const platformIcons = {
    Facebook: 'Facebook',
    Instagram: 'Instagram',
    Twitter: 'Twitter',
    LinkedIn: 'Linkedin',
    TikTok: 'Music',
    YouTube: 'Youtube'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={platformIcons?.[data?.platform]} size={16} />
            <span className="font-medium text-popover-foreground">{data?.platform}</span>
          </div>
          <p className="text-sm text-popover-foreground">
            Engagement: {data?.value?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {((data?.value / data?.total) * 100)?.toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Hide labels for slices less than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">{title}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={platformColors?.[entry?.platform]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Platform List */}
        <div className="space-y-3">
          {data?.map((platform, index) => {
            const total = data?.reduce((sum, item) => sum + item?.value, 0);
            const percentage = ((platform?.value / total) * 100)?.toFixed(1);
            
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: platformColors?.[platform?.platform] }}
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name={platformIcons?.[platform?.platform]} size={16} />
                    <span className="font-medium text-card-foreground">{platform?.platform}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-card-foreground">{platform?.value?.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlatformBreakdown;