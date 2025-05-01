
import React from 'react';
import { Gauge, Settings } from 'lucide-react';

interface SystemStatusProps {
  sensors: {
    gps: boolean;
    can: boolean;
    imu: boolean;
    camera: boolean;
  };
  temperature: number;
  cpuUsage: number;
  ramUsage: number;
}

const SystemStatus = ({ sensors, temperature, cpuUsage, ramUsage }: SystemStatusProps) => {
  const getUsageColor = (value: number) => {
    if (value >= 80) return 'bg-convoy-red';
    if (value >= 60) return 'bg-convoy-amber';
    return 'bg-convoy-blue';
  };
  
  return (
    <div className="panel p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          <h3 className="font-semibold">System Status</h3>
        </div>
        <div className="text-sm text-gray-400">{temperature}°C</div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        {Object.entries(sensors).map(([name, active]) => (
          <div key={name} className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${active ? 'bg-convoy-green' : 'bg-convoy-red'}`}></div>
            <span className="text-sm capitalize">{name}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>CPU</span>
            <span>{cpuUsage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className={`h-full rounded-full ${getUsageColor(cpuUsage)}`} 
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>RAM</span>
            <span>{ramUsage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className={`h-full rounded-full ${getUsageColor(ramUsage)}`} 
              style={{ width: `${ramUsage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
