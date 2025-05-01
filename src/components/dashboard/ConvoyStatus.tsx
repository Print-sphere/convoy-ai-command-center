
import React from 'react';

interface Vehicle {
  id: string;
  position: number;
  distance: number;
  status: 'connected' | 'connecting' | 'disconnected';
}

interface ConvoyStatusProps {
  vehicles: Vehicle[];
  isLeader: boolean;
  currentVehiclePosition: number;
}

const ConvoyStatus = ({ vehicles, isLeader, currentVehiclePosition }: ConvoyStatusProps) => {
  // Sort vehicles by their position in the convoy
  const sortedVehicles = [...vehicles].sort((a, b) => a.position - b.position);
  
  const getStatusColor = (status: Vehicle['status']) => {
    switch(status) {
      case 'connected': return 'bg-convoy-green';
      case 'connecting': return 'bg-convoy-amber animate-pulse-slow';
      case 'disconnected': return 'bg-convoy-red';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="panel p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Convoy Status</h3>
        <div className={`px-3 py-1 rounded-full text-sm ${isLeader ? 'bg-convoy-blue' : 'bg-gray-600'}`}>
          {isLeader ? 'Leader' : 'Follower'}
        </div>
      </div>
      
      <div className="flex items-center justify-center my-4">
        <div className="flex items-center space-x-1">
          {sortedVehicles.map((vehicle) => (
            <React.Fragment key={vehicle.id}>
              <div 
                className={`convoy-circle w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${vehicle.position === currentVehiclePosition 
                    ? 'border-white bg-convoy-blue' 
                    : 'border-gray-600 ' + getStatusColor(vehicle.status)}`}
              >
                {vehicle.position}
              </div>
              {vehicle.position < sortedVehicles.length && (
                <div className="w-6 h-0.5 bg-gray-600" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        {sortedVehicles
          .filter(v => v.position !== currentVehiclePosition)
          .map((vehicle) => (
            <div key={vehicle.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(vehicle.status)}`} />
                <span>Vehicle {vehicle.position}</span>
              </div>
              <div className="text-sm text-gray-400">
                {vehicle.distance}m {vehicle.position < currentVehiclePosition ? 'ahead' : 'behind'}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConvoyStatus;
