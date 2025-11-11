
import React, { useState } from 'react';
import { Parent, Theme } from '../types';
import { SunIcon, MoonIcon, PaletteIcon, COLOR_PALETTE, ChevronRightIcon } from '../constants';

interface SettingsScreenProps {
  parents: Parent[];
  onUpdateParent: (parent: Parent) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ parents, onUpdateParent, theme, setTheme, customColor, setCustomColor }) => {
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [newName, setNewName] = useState('');

  const handleEdit = (parent: Parent) => {
    setEditingParent(parent);
    setNewName(parent.name);
  };
  
  const handleSave = () => {
    if(editingParent) {
        onUpdateParent({...editingParent, name: newName});
        setEditingParent(null);
    }
  };

  const handleShare = () => {
    alert("Sharing installation link...");
  };
  
  const handleConnectNew = () => {
    alert("This would open a screen to pair with a new parent via code or QR scan.");
  }

  return (
    <div className="p-4 space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-custom-text-secondary mb-2">Theme</h3>
        <div className="bg-custom-secondary rounded-lg p-4 flex justify-around items-center">
            <button onClick={() => setTheme('light')} className={`p-3 rounded-lg ${theme === 'light' ? 'bg-custom-primary text-white' : ''}`}><SunIcon/></button>
            <button onClick={() => setTheme('dark')} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-custom-primary text-white' : ''}`}><MoonIcon/></button>
            <button onClick={() => setTheme('custom')} className={`p-3 rounded-lg ${theme === 'custom' ? 'bg-custom-primary text-white' : ''}`}><PaletteIcon/></button>
        </div>
        {theme === 'custom' && (
            <div className="grid grid-cols-6 gap-2 mt-4 bg-custom-secondary p-4 rounded-lg">
                {COLOR_PALETTE.map(color => (
                    <button key={color} onClick={() => setCustomColor(color)} className={`w-10 h-10 rounded-full ${customColor === color ? 'ring-2 ring-offset-2 ring-offset-custom-secondary ring-white' : ''}`} style={{backgroundColor: color}}></button>
                ))}
            </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-custom-text-secondary mb-2">Connected Guardians</h3>
        <div className="bg-custom-secondary rounded-lg">
          {parents.map(parent => (
            <div key={parent.id} className="flex items-center p-3 border-b border-custom-bg last:border-b-0">
              <img src={parent.avatarUrl} alt={parent.name} className="w-10 h-10 rounded-full mr-3" />
              <span className="flex-1 font-medium">{parent.name}</span>
              <button onClick={() => handleEdit(parent)} className="text-custom-primary text-sm">Change Name</button>
            </div>
          ))}
        </div>
      </div>
      
       <div className="bg-custom-secondary rounded-lg overflow-hidden">
        <button onClick={handleConnectNew} className="w-full flex justify-between items-center p-4 text-left hover:bg-custom-bg/50 transition-colors">
          <span>Create a connection</span>
          <ChevronRightIcon className="w-5 h-5 text-custom-text-secondary" />
        </button>
        <button className="w-full flex justify-between items-center p-4 text-left hover:bg-custom-bg/50 transition-colors border-t border-custom-bg">
          <span>Language (Auto)</span>
          <ChevronRightIcon className="w-5 h-5 text-custom-text-secondary" />
        </button>
      </div>

      <button onClick={handleShare} className="w-full bg-custom-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity">
          Share App with a Friend
      </button>

      {editingParent && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setEditingParent(null)}>
          <div className="bg-custom-secondary rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-center">Change Name</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 bg-custom-bg border border-gray-600 rounded-lg"
              placeholder="Enter new name"
            />
            <div className="flex gap-4 w-full mt-4">
              <button onClick={() => setEditingParent(null)} className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg">Cancel</button>
              <button onClick={handleSave} className="flex-1 bg-custom-primary text-white py-2 px-4 rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
