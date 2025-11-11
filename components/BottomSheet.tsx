
import React, from 'react';
import { MOCK_TASKS, MOCK_REMINDERS } from '../constants';
import { BottomSheetState, Child, Task } from '../types';
import { BatteryChargingIcon, BellIcon, CheckSquareIcon, ChevronUpIcon, MapPinIcon, MapPinOffIcon, SignalIcon, Volume2Icon, VolumeXIcon, WifiIcon } from '../constants';

interface BottomSheetProps {
  child: Child;
  state: BottomSheetState;
  setState: (state: BottomSheetState) => void;
}

const PhoneStatus: React.FC<{ child: Child }> = ({ child }) => (
    <div className="flex items-center justify-around text-xs text-custom-text-secondary">
      <div className="flex items-center gap-1.5">
        <BatteryChargingIcon className={`w-5 h-5 ${child.phoneStatus.battery < 20 ? 'text-red-500' : 'text-green-500'}`} />
        <span>{child.phoneStatus.battery}%</span>
      </div>
      <div className="flex items-center gap-1.5">
        {child.phoneStatus.connection === 'WiFi' ? <WifiIcon className="w-5 h-5" /> : <SignalIcon className="w-5 h-5" />}
        <span className="truncate max-w-[80px]">{child.phoneStatus.networkName}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {child.phoneStatus.geolocation ? <MapPinIcon className="w-5 h-5 text-blue-500" /> : <MapPinOffIcon className="w-5 h-5 text-red-500" />}
      </div>
      <div className="flex items-center gap-1.5">
        {child.phoneStatus.soundMode === 'Sound' ? <Volume2Icon className="w-5 h-5" /> : <VolumeXIcon className="w-5 h-5" />}
      </div>
    </div>
);

const QuickInfo: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const uncompletedTasks = tasks.filter(t => !t.completed);
    return (
        <div className="flex items-center justify-between text-sm mt-4 px-4">
            <div className="flex items-center gap-2 cursor-pointer">
                <BellIcon className="w-5 h-5 text-yellow-500" />
                <span>2 missed calls from Mom</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
                <CheckSquareIcon className="w-5 h-5 text-green-500" />
                <span>{uncompletedTasks.length > 0 ? `${uncompletedTasks.length} new tasks` : 'No new tasks'}</span>
            </div>
        </div>
    );
}

const BottomSheet: React.FC<BottomSheetProps> = ({ child, state, setState }) => {
  const handleToggle = () => {
    setState(state === 'peek' ? 'expanded' : 'peek');
  };

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-10 bg-custom-secondary rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-in-out transform ${
        state === 'peek' ? 'translate-y-0' : 
        state === 'expanded' ? 'translate-y-[-66.66vh]' : 'translate-y-full'
      }`}
    >
      <div className="p-4 h-[66.66vh] flex flex-col">
        <div onClick={handleToggle} className="cursor-pointer">
            <div className="w-10 h-1.5 bg-gray-500 rounded-full mx-auto mb-3"></div>
            <PhoneStatus child={child} />
            {state === 'peek' && <QuickInfo tasks={MOCK_TASKS}/>}
        </div>
        
        {state === 'expanded' && (
            <div className="flex-1 overflow-y-auto mt-4 space-y-6">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-custom-text-primary">Reminders</h3>
                    <div className="space-y-2">
                        {MOCK_REMINDERS.map(reminder => (
                            <div key={reminder.id} className="bg-custom-bg p-3 rounded-lg flex justify-between items-center">
                                <span>{reminder.name}</span>
                                <span className="text-xs text-custom-text-secondary">{reminder.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2 text-custom-text-primary">Recent Messages</h3>
                     <div className="bg-custom-bg p-3 rounded-lg cursor-pointer">
                        <p className="font-semibold">Mom</p>
                        <p className="text-sm text-custom-text-secondary">Don't forget to do your homework!</p>
                    </div>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-2 text-custom-text-primary">Recent Locations</h3>
                    <div className="bg-custom-bg p-3 rounded-lg flex items-center gap-4">
                        <img src="https://picsum.photos/seed/map-thumb/80/80" className="w-12 h-12 rounded-md object-cover"/>
                        <div>
                            <p className="font-semibold">School</p>
                            <p className="text-sm text-custom-text-secondary">2:45 PM - 3:15 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
