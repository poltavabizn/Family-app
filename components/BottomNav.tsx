
import React from 'react';
import { HomeIcon, MessageSquareIcon, LayoutGridIcon, SettingsIcon } from '../constants';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
        isActive ? 'text-custom-primary' : 'text-custom-text-secondary hover:text-custom-text-primary'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { id: 'chat', label: 'Chat', icon: <MessageSquareIcon className="w-6 h-6" /> },
    { id: 'apps', label: 'Apps', icon: <LayoutGridIcon className="w-6 h-6" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-6 h-6" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-custom-bg/80 backdrop-blur-sm border-t border-custom-secondary flex justify-around z-20">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          isActive={activeTab === item.id}
          onClick={() => setActiveTab(item.id)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
