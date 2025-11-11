
import React, { useState, useEffect, useCallback } from 'react';
import PairingScreen from './components/PairingScreen';
import MainLayout from './components/MainLayout';
import { Theme, Child, Parent } from './types';
import { MOCK_PARENTS, MOCK_CHILD } from './constants';

const App: React.FC = () => {
  const [isPaired, setIsPaired] = useState<boolean>(false);
  const [child, setChild] = useState<Child>(MOCK_CHILD);
  const [parents, setParents] = useState<Parent[]>(MOCK_PARENTS);
  const [theme, setTheme] = useState<Theme>('dark');
  const [customColor, setCustomColor] = useState<string>('#3b82f6');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--custom-primary-color', '#3b82f6'); // blue-500
      root.style.setProperty('--custom-secondary-color', '#1f2937'); // gray-800
      root.style.setProperty('--custom-accent-color', '#4f46e5'); // indigo-600
      root.style.setProperty('--custom-bg-color', '#111827'); // gray-900
      root.style.setProperty('--custom-text-primary-color', '#f9fafb'); // gray-50
      root.style.setProperty('--custom-text-secondary-color', '#9ca3af'); // gray-400
    } else if (theme === 'light') {
      root.classList.remove('dark');
      root.style.setProperty('--custom-primary-color', '#3b82f6');
      root.style.setProperty('--custom-secondary-color', '#f3f4f6'); // gray-100
      root.style.setProperty('--custom-accent-color', '#4f46e5');
      root.style.setProperty('--custom-bg-color', '#ffffff');
      root.style.setProperty('--custom-text-primary-color', '#111827');
      root.style.setProperty('--custom-text-secondary-color', '#6b7280'); // gray-500
    } else { // custom
      root.classList.remove('dark'); // or add, based on preference. let's assume light base.
      root.style.setProperty('--custom-primary-color', customColor);
      root.style.setProperty('--custom-secondary-color', '#f3f4f6');
      root.style.setProperty('--custom-accent-color', customColor);
      root.style.setProperty('--custom-bg-color', '#ffffff');
      root.style.setProperty('--custom-text-primary-color', '#111827');
      root.style.setProperty('--custom-text-secondary-color', '#6b7280');
    }
  }, [theme, customColor]);

  const handlePairingSuccess = (name: string) => {
    setChild(prev => ({ ...prev, name }));
    setIsPaired(true);
  };

  const handleUpdateChild = useCallback((updatedChild: Partial<Child>) => {
    setChild(prev => ({ ...prev, ...updatedChild }));
  }, []);

  const handleUpdateParent = useCallback((updatedParent: Parent) => {
    setParents(prev => prev.map(p => p.id === updatedParent.id ? updatedParent : p));
  }, []);

  if (!isPaired) {
    return <PairingScreen onPair={handlePairingSuccess} />;
  }

  return (
    <MainLayout
      child={child}
      parents={parents}
      onUpdateChild={handleUpdateChild}
      onUpdateParent={handleUpdateParent}
      theme={theme}
      setTheme={setTheme}
      customColor={customColor}
      setCustomColor={setCustomColor}
    />
  );
};

export default App;
