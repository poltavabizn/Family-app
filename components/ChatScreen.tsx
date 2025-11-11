
import React from 'react';
import { Parent, Child } from '../types';
import { ChevronRightIcon } from '../constants';

interface ChatScreenProps {
  parents: Parent[];
  child: Child;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ parents, child }) => {
  const handleChatSelect = (name: string) => {
    alert(`Opening chat with ${name}. This would open a full messenger interface.`);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-custom-text-primary">Chats</h2>
      <p className="text-custom-text-secondary">Select a conversation to continue.</p>
      
      <div className="bg-custom-secondary rounded-lg overflow-hidden">
        {parents.map(parent => (
          <div
            key={parent.id}
            onClick={() => handleChatSelect(parent.name)}
            className="flex items-center p-4 border-b border-custom-bg last:border-b-0 cursor-pointer hover:bg-custom-bg/50 transition-colors"
          >
            <img src={parent.avatarUrl} alt={parent.name} className="w-12 h-12 rounded-full object-cover mr-4" />
            <div className="flex-1">
              <h3 className="font-semibold text-custom-text-primary">{parent.name}</h3>
              <p className="text-sm text-custom-text-secondary">Last message preview...</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-custom-text-secondary" />
          </div>
        ))}
        <div
          onClick={() => handleChatSelect("Group Chat")}
          className="flex items-center p-4 border-b border-custom-bg last:border-b-0 cursor-pointer hover:bg-custom-bg/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full mr-4 flex items-center justify-center bg-custom-primary">
            <span className="font-bold text-lg">{child.name[0]}{parents.map(p=>p.name[0]).join('')}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-custom-text-primary">Group Chat</h3>
            <p className="text-sm text-custom-text-secondary">Mom: Don't forget...</p>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-custom-text-secondary" />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
