import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const getColorClasses = () => {
    const colors = {
      primary: 'from-primary/20 to-primary/5 border-primary/20',
      secondary: 'from-secondary/20 to-secondary/5 border-secondary/20',
      accent: 'from-accent/20 to-accent/5 border-accent/20',
      success: 'from-success/20 to-success/5 border-success/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className={`bg-gradient-to-br ${getColorClasses()} border rounded-xl p-6 hover:shadow-lg transition-all duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-${color} to-${color}/80 flex items-center justify-center`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default KPICard;