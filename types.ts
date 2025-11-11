
export enum AppStatus {
  Unlocked = 'Unlocked',
  Blocked = 'Blocked',
  Temporary = 'Temporary',
}

export type AppInfo = {
  id: string;
  name: string;
  iconUrl: string;
  usage: number;
  status: AppStatus;
  unlockTime?: Date;
};

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export type Reminder = {
  id: string;
  name:string;
  date: Date;
};

export type Parent = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Child = {
  name: string;
  avatarUrl: string;
  steps: number;
  phoneStatus: {
    battery: number;
    connection: 'WiFi' | 'Mobile';
    networkName: string;
    geolocation: boolean;
    soundMode: 'Sound' | 'Silent';
  };
};

export type Theme = 'dark' | 'light' | 'custom';

export type BottomSheetState = 'peek' | 'expanded' | 'hidden';
