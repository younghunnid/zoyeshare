import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const scheduledPosts = [
    {
      id: 1,
      date: '2025-01-12',
      time: '10:00 AM',
      title: 'Weekend Motivation Post',
      platforms: ['instagram', 'facebook']
    },
    {
      id: 2,
      date: '2025-01-13',
      time: '2:30 PM',
      title: 'Product Launch Announcement',
      platforms: ['twitter', 'linkedin']
    },
    {
      id: 3,
      date: '2025-01-14',
      time: '9:15 AM',
      title: 'Behind the Scenes Video',
      platforms: ['youtube', 'tiktok']
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const hasScheduledPost = (day) => {
    if (!day) return false;
    const dateStr = `${currentDate?.getFullYear()}-${String(currentDate?.getMonth() + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    return scheduledPosts?.some(post => post?.date === dateStr);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Content Calendar</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
          </button>
          <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
            {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames?.map(day => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(currentDate)?.map((day, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center text-sm rounded relative
              ${day ? 'hover:bg-muted cursor-pointer' : ''}
              ${day === new Date()?.getDate() && 
                currentDate?.getMonth() === new Date()?.getMonth() && 
                currentDate?.getFullYear() === new Date()?.getFullYear() 
                ? 'bg-primary text-primary-foreground font-semibold' 
                : 'text-foreground'
              }
            `}
          >
            {day}
            {hasScheduledPost(day) && (
              <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-accent rounded-full"></div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Upcoming Posts</h4>
        <div className="space-y-2">
          {scheduledPosts?.slice(0, 3)?.map(post => (
            <div key={post?.id} className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
              <span className="text-muted-foreground">{post?.time}</span>
              <span className="text-foreground truncate">{post?.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;