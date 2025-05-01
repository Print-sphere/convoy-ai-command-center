
import React, { useState, useEffect } from 'react';
import Speedometer from '@/components/dashboard/Speedometer';
import BatteryIndicator from '@/components/dashboard/BatteryIndicator';
import ConvoyStatus from '@/components/dashboard/ConvoyStatus';
import MapDisplay from '@/components/dashboard/MapDisplay';
import SystemStatus from '@/components/dashboard/SystemStatus';
import ControlPanel from '@/components/dashboard/ControlPanel';
import NotificationPanel from '@/components/dashboard/NotificationPanel';
import VoiceCommands from '@/components/VoiceCommands';

const Index = () => {
  // Mock data for simulation
  const [speed, setSpeed] = useState(65);
  const [battery, setBattery] = useState(78);
  
  const convoyVehicles = [
    { id: 'v1', position: 1, distance: 0, status: 'connected' as const },
    { id: 'v2', position: 2, distance: 24, status: 'connected' as const },
    { id: 'v3', position: 3, distance: 48, status: 'connecting' as const },
    { id: 'v4', position: 4, distance: 73, status: 'disconnected' as const }
  ];
  
  const notifications = [
    { 
      id: '1', 
      message: 'Vehicle 3 joined the convoy', 
      type: 'info' as const, 
      time: '2min ago' 
    },
    { 
      id: '2', 
      message: 'Vehicle 4 connection unstable', 
      type: 'warning' as const, 
      time: '5min ago' 
    },
    { 
      id: '3', 
      message: 'Low fuel warning', 
      type: 'error' as const, 
      time: '12min ago' 
    }
  ];
  
  const systemStatus = {
    sensors: {
      gps: true,
      can: true,
      imu: true,
      camera: false
    },
    temperature: 42,
    cpuUsage: 38,
    ramUsage: 62
  };

  // Simulate some data changes for the demo
  useEffect(() => {
    const interval = setInterval(() => {
      // Random speed fluctuation
      setSpeed(prevSpeed => {
        const change = Math.random() < 0.5 ? -1 : 1;
        return Math.max(0, Math.min(120, prevSpeed + change));
      });
      
      // Slowly decreasing battery
      setBattery(prevBattery => {
        if (prevBattery > 0.1) {
          return prevBattery - 0.01;
        }
        return prevBattery;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-convoy-dark text-white p-4">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">AI Convoy Command Center</div>
        <div className="text-sm text-gray-400">13:45 | May 1, 2025</div>
      </div>
      
      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column - Vehicle status */}
        <div className="lg:col-span-1 space-y-4">
          <div className="panel p-6 flex flex-col items-center">
            <Speedometer 
              speed={Math.floor(speed)} 
              maxSpeed={150} 
              unit="km/h" 
              className="mb-4" 
            />
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="text-center">
                <div className="text-sm text-gray-400">Trip</div>
                <div className="data-indicator">142 km</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Efficiency</div>
                <div className="data-indicator">94%</div>
              </div>
            </div>
          </div>
          
          <BatteryIndicator
            percentage={battery}
            charging={false}
            range={320}
          />
          
          <ConvoyStatus 
            vehicles={convoyVehicles}
            isLeader={false}
            currentVehiclePosition={2}
          />
        </div>
        
        {/* Center and right columns */}
        <div className="lg:col-span-2 space-y-4">
          <MapDisplay className="h-64 lg:h-96" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SystemStatus 
              sensors={systemStatus.sensors}
              temperature={systemStatus.temperature}
              cpuUsage={systemStatus.cpuUsage}
              ramUsage={systemStatus.ramUsage}
            />
            
            <ControlPanel />
            
            <NotificationPanel 
              notifications={notifications}
            />
          </div>
        </div>
      </div>
      
      {/* Voice command button */}
      <VoiceCommands />
    </div>
  );
};

export default Index;
