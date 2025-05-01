
import React from 'react';
import { cn } from '@/lib/utils';

interface SpeedometerProps {
  speed: number;
  maxSpeed: number;
  unit: string;
  className?: string;
}

const Speedometer = ({ speed, maxSpeed, unit, className }: SpeedometerProps) => {
  // Calculate the percentage of the current speed relative to max
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  
  // Calculate the rotation for the speedometer needle (0 to 180 degrees)
  const needleRotation = (percentage / 100) * 180;
  
  // Determine the color based on speed percentage
  const getColor = () => {
    if (percentage < 40) return 'bg-convoy-blue';
    if (percentage < 75) return 'bg-convoy-green';
    if (percentage < 90) return 'bg-convoy-amber';
    return 'bg-convoy-red';
  };

  return (
    <div className={cn("speedometer-container", className)}>
      <div className="speedometer-dial w-48 h-48 bg-convoy-panel border-4 border-gray-800 shadow-inner">
        {/* Speed arc background */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        {/* Speed arc fill */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-1/2 transition-all duration-300 ${getColor()}`}
          style={{ 
            clipPath: `polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%)`, 
            opacity: 0.7 
          }}
        />
        
        {/* Speed needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 h-1/2 bg-white -translate-x-1/2 origin-bottom transition-transform duration-300"
          style={{ transform: `rotate(${needleRotation - 90}deg)` }}
        >
          <div className="absolute -left-1 -top-1 w-3 h-3 rounded-full bg-white shadow-lg" />
        </div>
        
        {/* Center point */}
        <div className="absolute left-1/2 top-1/2 w-5 h-5 rounded-full bg-gray-800 -translate-x-1/2 -translate-y-1/2 border border-gray-700" />
        
        {/* Speed value and unit */}
        <div className="speedometer-label">
          <div className="text-4xl font-bold">{speed}</div>
          <div className="text-sm text-gray-400 uppercase">{unit}</div>
        </div>
      </div>
    </div>
  );
};

export default Speedometer;
