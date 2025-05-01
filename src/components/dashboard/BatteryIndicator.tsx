
import React from 'react';
import { Battery } from 'lucide-react';

interface BatteryIndicatorProps {
  percentage: number;
  charging: boolean;
  range: number;
}

const BatteryIndicator = ({ percentage, charging, range }: BatteryIndicatorProps) => {
  // Determine the color based on battery percentage
  const getColor = () => {
    if (percentage <= 20) return 'bg-convoy-red';
    if (percentage <= 40) return 'bg-convoy-amber';
    return 'bg-convoy-green';
  };

  // Convert decimal to percentage
  const batteryPercentage = Math.min(100, Math.max(0, percentage));
  
  return (
    <div className="panel p-4 flex flex-col">
      <div className="text-sm text-gray-400 mb-1">Battery Status</div>
      <div className="flex items-center mb-2">
        <Battery className="h-6 w-6 mr-2" />
        <span className="text-2xl font-semibold">{batteryPercentage}%</span>
        {charging && (
          <div className="ml-2 text-sm bg-convoy-green px-2 py-0.5 rounded-full text-black">
            Charging
          </div>
        )}
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${getColor()}`}
          style={{ width: `${batteryPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Range</span>
        <span className="font-semibold">{range} km</span>
      </div>
    </div>
  );
};

export default BatteryIndicator;
