import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const Header = ({ userContext, onNotificationClick, onProfileClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const primaryNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      id: 'create',
      label: 'Create',
      path: '/content-creator',
      icon: 'PenTool'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3'
    }
  ];

  const secondaryNavItems = [
    {
      id: 'settings',
      label: 'Settings',
      path: '/account-settings',
      icon: 'Settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setShowMoreMenu(false);
  };

  const NavItem = ({ item, isActive }) => (
    <button
      onClick={() => handleNavigation(item?.path)}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 group
        ${isActive 
          ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }
      `}
    >
      <Icon 
        name={item?.icon} 
        size={18} 
        className={`transition-transform duration-200 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
      />
      <span className="font-medium text-sm">{item?.label}</span>
    </button>
  );

  const MoreMenu = () => (
    <div className="relative">
      <button
        onClick={() => setShowMoreMenu(!showMoreMenu)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
      >
        <Icon name="MoreHorizontal" size={18} />
        <span className="font-medium text-sm">More</span>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`transition-transform duration-200 ${showMoreMenu ? 'rotate-180' : ''}`}
        />
      </button>

      {showMoreMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowMoreMenu(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-20 py-2">
            {secondaryNavItems?.map((item) => (
              <button
                key={item?.id}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors duration-200
                  ${location?.pathname === item?.path 
                    ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon name={item?.icon} size={16} />
                <span className="text-sm">{item?.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const UserActions = () => (
    <div className="flex items-center space-x-3">
      {/* Notifications */}
      <button
        onClick={onNotificationClick}
        className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
      >
        <Icon name="Bell" size={20} />
        {userContext?.hasNotifications && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background" />
        )}
      </button>

      {/* User Profile */}
      <button
        onClick={onProfileClick}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-foreground">
            {userContext?.name || 'User'}
          </p>
          <p className="text-xs text-muted-foreground">
            {userContext?.tier || 'Free Plan'}
          </p>
        </div>
        <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">ZoyeShare</span>
            <span className="text-xs text-muted-foreground hidden sm:block">Social Media Hub</span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {primaryNavItems?.map((item) => (
            <NavItem
              key={item?.id}
              item={item}
              isActive={location?.pathname === item?.path}
            />
          ))}
          <MoreMenu />
        </nav>

        {/* User Actions */}
        <UserActions />
      </div>
      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-border bg-card/50 backdrop-blur">
        <div className="flex items-center justify-around py-2 px-4">
          {primaryNavItems?.map((item) => (
            <button
              key={item?.id}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200
                ${location?.pathname === item?.path 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </button>
          ))}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="flex flex-col items-center space-y-1 p-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <Icon name="MoreHorizontal" size={20} />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;