import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BenchmarkComparison = ({ data, title }) => {
  const [selectedMetric, setSelectedMetric] = useState('engagement_rate');
  const [comparisonType, setComparisonType] = useState('industry');

  const metrics = [
    { key: 'engagement_rate', label: 'Engagement Rate', unit: '%' },
    { key: 'reach_rate', label: 'Reach Rate', unit: '%' },
    { key: 'click_rate', label: 'Click-through Rate', unit: '%' },
    { key: 'follower_growth', label: 'Follower Growth', unit: '%' }
  ];

  const comparisonTypes = [
    { key: 'industry', label: 'Industry Average', icon: 'TrendingUp' },
    { key: 'previous', label: 'Previous Period', icon: 'Calendar' },
    { key: 'competitors', label: 'Competitors', icon: 'Users' }
  ];

  const getPerformanceColor = (yourValue, benchmarkValue) => {
    const difference = ((yourValue - benchmarkValue) / benchmarkValue) * 100;
    if (difference > 10) return 'text-success';
    if (difference < -10) return 'text-error';
    return 'text-accent';
  };

  const getPerformanceIcon = (yourValue, benchmarkValue) => {
    const difference = ((yourValue - benchmarkValue) / benchmarkValue) * 100;
    if (difference > 10) return 'TrendingUp';
    if (difference < -10) return 'TrendingDown';
    return 'Minus';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const yourData = payload?.find(p => p?.dataKey === 'your_value');
      const benchmarkData = payload?.find(p => p?.dataKey === 'benchmark_value');
      
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {yourData && (
            <div className="flex items-center space-x-2 text-sm mb-1">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-popover-foreground">
                Your Performance: {yourData?.value}%
              </span>
            </div>
          )}
          {benchmarkData && (
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-popover-foreground">
                Benchmark: {benchmarkData?.value}%
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const currentMetric = metrics?.find(m => m?.key === selectedMetric);
  const currentComparison = comparisonTypes?.find(c => c?.key === comparisonType);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Compare your performance against {currentComparison?.label?.toLowerCase()}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
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
          
          {/* Comparison Type */}
          <div className="flex flex-wrap gap-2">
            {comparisonTypes?.map(type => (
              <Button
                key={type?.key}
                variant={comparisonType === type?.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setComparisonType(type?.key)}
                iconName={type?.icon}
                iconPosition="left"
                iconSize={16}
              >
                {type?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="platform" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  y={data?.reduce((sum, item) => sum + item?.benchmark_value, 0) / data?.length} 
                  stroke="var(--color-muted-foreground)" 
                  strokeDasharray="5 5" 
                />
                <Bar 
                  dataKey="your_value" 
                  fill="var(--color-primary)" 
                  name="Your Performance"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="benchmark_value" 
                  fill="var(--color-muted-foreground)" 
                  name="Benchmark"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-card-foreground">Performance Summary</h4>
          
          {data?.map((platform, index) => {
            const difference = ((platform?.your_value - platform?.benchmark_value) / platform?.benchmark_value) * 100;
            const isPositive = difference > 0;
            
            return (
              <div key={index} className="p-3 rounded-lg bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-card-foreground">
                    {platform?.platform}
                  </span>
                  <div className={`flex items-center space-x-1 ${getPerformanceColor(platform?.your_value, platform?.benchmark_value)}`}>
                    <Icon name={getPerformanceIcon(platform?.your_value, platform?.benchmark_value)} size={14} />
                    <span className="text-xs font-medium">
                      {isPositive ? '+' : ''}{difference?.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Your Performance</span>
                    <span className="text-card-foreground font-medium">
                      {platform?.your_value}{currentMetric?.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Benchmark</span>
                    <span className="text-card-foreground">
                      {platform?.benchmark_value}{currentMetric?.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lightbulb" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Insight</span>
            </div>
            <p className="text-xs text-card-foreground">
              Your overall {currentMetric?.label?.toLowerCase()} is{' '}
              {data?.reduce((sum, item) => sum + item?.your_value, 0) / data?.length > 
               data?.reduce((sum, item) => sum + item?.benchmark_value, 0) / data?.length 
                ? 'above' : 'below'} industry average. 
              Focus on underperforming platforms for improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkComparison;