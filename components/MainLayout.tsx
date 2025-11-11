
import React, { useState } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import AppsScreen from './AppsScreen';
import SettingsScreen from './SettingsScreen';
import { Child, Parent, Theme } from '../types';

interface MainLayoutProps {
  child: Child;
  parents: Parent[];
  onUpdateChild: (updatedChild: Partial<Child>) => void;
  onUpdateParent: (updatedParent: Parent) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen child={props.child} />;
      case 'chat':
        return <ChatScreen parents={props.parents} child={props.child} />;
      case 'apps':
        return <AppsScreen />;
      case 'settings':
        return <SettingsScreen parents={props.parents} onUpdateParent={props.onUpdateParent} {...props} />;
      default:
        return <HomeScreen child={props.child} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-custom-bg text-custom-text-primary overflow-hidden">
      <Header child={props.child} onUpdateChild={props.onUpdateChild} />
      <main className="flex-1 overflow-y-auto pb-16">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default MainLayout;
