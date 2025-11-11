
import React, { useState, useEffect } from 'react';
import { MOCK_APPS } from '../constants';
import { AppStatus, AppInfo } from '../types';
import { LockIcon, UnlockIcon } from '../constants';

const AppItem: React.FC<{ app: AppInfo }> = ({ app }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (app.status === AppStatus.Temporary && app.unlockTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = app.unlockTime.getTime() - now.getTime();
        if (diff <= 0) {
          setTimeLeft('Unlocked');
          clearInterval(interval);
          return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [app.status, app.unlockTime]);

  const getStatusIndicator = () => {
    switch (app.status) {
      case AppStatus.Unlocked:
        return <UnlockIcon className="w-6 h-6 text-green-500" />;
      case AppStatus.Blocked:
        return <LockIcon className="w-6 h-6 text-red-500" />;
      case AppStatus.Temporary:
        return <LockIcon className="w-6 h-6 text-yellow-500" />;
    }
  };
  
  const handleRequestUnlock = () => {
      alert(`Request to unblock ${app.name} sent to parent.`);
  };

  return (
    <div onClick={app.status !== AppStatus.Unlocked ? handleRequestUnlock : undefined} className={`flex items-center p-3 bg-custom-secondary rounded-lg mb-3 ${app.status !== AppStatus.Unlocked ? 'cursor-pointer hover:bg-custom-bg' : ''}`}>
      <img src={app.iconUrl} alt={app.name} className="w-12 h-12 rounded-lg mr-4" />
      <div className="flex-1">
        <h3 className="font-semibold text-custom-text-primary">{app.name}</h3>
        <div className="w-full bg-custom-bg rounded-full h-2.5 mt-1">
          <div className="bg-custom-primary h-2.5 rounded-full" style={{ width: `${app.usage}%` }}></div>
        </div>
      </div>
      <div className="ml-4 text-center">
        {getStatusIndicator()}
        {app.status === AppStatus.Temporary && <span className="text-xs text-yellow-500 mt-1 block">{timeLeft}</span>}
      </div>
    </div>
  );
};

const AppsScreen: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-custom-text-primary mb-4">App Usage & Status</h2>
      <div>
        {MOCK_APPS.map(app => (
          <AppItem key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default AppsScreen;
