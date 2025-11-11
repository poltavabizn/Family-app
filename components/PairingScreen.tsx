
import React, { useState } from 'react';
import { CameraIcon, QrCodeIcon } from '../constants';

interface PairingScreenProps {
  onPair: (name: string) => void;
}

const PairingScreen: React.FC<PairingScreenProps> = ({ onPair }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handlePair = () => {
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    // Mock pairing logic: any 6-digit code is valid
    if (/^\d{6}$/.test(code)) {
      setError('');
      onPair(name);
    } else {
      setError('Invalid code. Please enter the 6-digit code from your parent\'s app.');
    }
  };

  const handleScanQR = () => {
    // Mock QR scan: assumes successful scan after a delay
    if (!name.trim()) {
      setError('Please enter your name before scanning.');
      return;
    }
    setError('');
    alert("Camera would open to scan QR code. Simulating successful scan.");
    setTimeout(() => onPair(name), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-bg text-custom-text-primary p-4">
      <div className="w-full max-w-sm text-center">
        <QrCodeIcon className="w-24 h-24 mx-auto text-custom-primary mb-6" />
        <h1 className="text-3xl font-bold mb-2">Connect with a Parent</h1>
        <p className="text-custom-text-secondary mb-8">
          Enter your name and the special code from your parent's device to get started.
        </p>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-custom-secondary border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-primary"
          />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
            className="w-full px-4 py-3 bg-custom-secondary border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-primary"
          />
        </div>
        
        <button
          onClick={handlePair}
          className="w-full bg-custom-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Connect
        </button>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="flex-shrink mx-4 text-custom-text-secondary">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <button
          onClick={handleScanQR}
          className="w-full bg-custom-secondary text-custom-text-primary font-bold py-3 px-4 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <CameraIcon className="w-5 h-5" />
          Scan QR Code
        </button>
      </div>
    </div>
  );
};

export default PairingScreen;
