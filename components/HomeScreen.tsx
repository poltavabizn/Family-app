
import React, { useState } from 'react';
import { Child, BottomSheetState } from '../types';
import BottomSheet from './BottomSheet';

interface HomeScreenProps {
  child: Child;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ child }) => {
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>('peek');

  const handleMapClick = () => {
    if (bottomSheetState === 'peek') {
      alert("Map would enlarge to 3/4 screen. This would also show options to add/edit locations and get directions.");
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      <div 
        className={`w-full transition-all duration-300 ease-in-out ${bottomSheetState === 'expanded' ? 'h-1/4' : (bottomSheetState === 'hidden' ? 'h-full' : 'h-2/3')}`}
        onClick={handleMapClick}
      >
        <div className="relative w-full h-full bg-gray-700 flex items-center justify-center cursor-pointer">
          <img src="https://picsum.photos/seed/map/800/600" alt="Map view of child's location" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-white">
            <h2 className="text-lg font-bold">Home</h2>
            <p className="text-sm">123 Maple Street</p>
          </div>
        </div>
      </div>
      <BottomSheet child={child} state={bottomSheetState} setState={setBottomSheetState} />
    </div>
  );
};

export default HomeScreen;
