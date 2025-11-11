
import React, { useState } from 'react';
import { SOSIcon } from '../constants';
import { Child } from '../types';

interface HeaderProps {
  child: Child;
  onUpdateChild: (updatedChild: Partial<Child>) => void;
}

const Header: React.FC<HeaderProps> = ({ child, onUpdateChild }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(child.name);

  const handleSOS = () => {
    alert("SOS signal sent to all parents/guardians!");
  };
  
  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    onUpdateChild({ name });
    setIsModalOpen(false);
  };
  
  const handleAvatarChange = () => {
    const newSeed = Math.random().toString(36).substring(7);
    onUpdateChild({ avatarUrl: `https://picsum.photos/seed/${newSeed}/100/100` });
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-custom-bg/80 backdrop-blur-sm border-b border-custom-secondary">
        <button 
          onClick={handleSOS}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-lg hover:bg-red-700 transition-colors">
          <SOSIcon className="w-5 h-5"/>
          SOS
        </button>
        <h1 className="text-xl font-bold text-custom-text-primary">{child.name}</h1>
        <button onClick={handleAvatarClick} className="focus:outline-none focus:ring-2 focus:ring-custom-primary focus:ring-offset-2 focus:ring-offset-custom-bg rounded-full">
          <img src={child.avatarUrl} alt="Child's avatar" className="w-10 h-10 rounded-full object-cover"/>
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className="bg-custom-secondary rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-center text-custom-text-primary">Edit Profile</h2>
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img src={child.avatarUrl} alt="Child's avatar" className="w-24 h-24 rounded-full object-cover mb-2"/>
                <button onClick={handleAvatarChange} className="absolute bottom-0 right-0 bg-custom-primary text-white p-1 rounded-full text-xs">
                  Change
                </button>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-custom-bg border border-gray-600 rounded-lg text-custom-text-primary"
                placeholder="Enter your name"
              />
              <div className="flex gap-4 w-full mt-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg">Cancel</button>
                <button onClick={handleSave} className="flex-1 bg-custom-primary text-white py-2 px-4 rounded-lg">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
