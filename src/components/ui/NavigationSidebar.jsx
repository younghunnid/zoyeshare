import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationSidebar = ({ isCollapsed = false, onToggle, userContext }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and quick actions'
    },
    {
      id: 'create',
      label: 'Create Content',
      path: '/content-creator',
      icon: 'PenTool',
      tooltip: 'Compose and schedule posts'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'Performance insights and metrics'
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/account-settings',
      icon: 'Settings',
      tooltip: 'Account and preferences'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo = () => (
    <div className="flex items-center space-x-3 px-4 py-6">
      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
        <Icon name="Zap" size={20} color="white" />
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-foreground">ZoyeShare</span>
          <span className="text-xs text-muted-foreground">Social Media Hub</span>
        </div>
      )}
    </div>
  );

  const NavigationItem = ({ item, isActive }) => (
    <button
      onClick={() => handleNavigation(item?.path)}
      className={`
        w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
        ${isActive 
          ? 'bg-primary text-primary-foreground shadow-lg' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }
      `}
      title={item?.tooltip}
    >
      <Icon 
        name={item?.icon} 
        size={20} 
        className={`transition-transform duration-200 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
      />
      {!isCollapsed && (
        <span className="font-medium text-sm">{item?.label}</span>
      )}
    </button>
  );

  const UserContextIndicator = () => (
    <div className="px-4 py-4 border-t border-border">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        {!isCollapsed && userContext && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {userContext?.name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground">
              {userContext?.tier || 'Free'} • {userContext?.connectedPlatforms || 0} platforms
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-lg"
      >
        <Icon name={isMobileOpen ? "X" : "Menu"} size={20} />
      </button>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-transform duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-60'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Logo />

          {/* Navigation */}
          <nav className="flex-1 px-2 space-y-2">
            {menuItems?.map((item) => (
              <NavigationItem
                key={item?.id}
                item={item}
                isActive={location?.pathname === item?.path}
              />
            ))}
          </nav>

          {/* User Context */}
          <UserContextIndicator />
        </div>
      </aside>
      {/* Desktop Toggle Button */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="hidden md:block fixed left-4 bottom-4 p-2 rounded-lg bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-200 z-30"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </button>
      )}
    </>
  );
};

export default NavigationSidebar;