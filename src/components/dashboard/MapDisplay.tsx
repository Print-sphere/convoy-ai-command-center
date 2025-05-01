
import React from 'react';
import { Map } from 'lucide-react';

interface MapDisplayProps {
  className?: string;
}

const MapDisplay = ({ className }: MapDisplayProps) => {
  return (
    <div className={`map-container h-64 ${className}`}>
      {/* Placeholder for actual map integration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Map className="w-12 h-12 text-gray-500 mb-2 mx-auto" />
          <p className="text-gray-400">Map would display here</p>
          <p className="text-xs text-gray-500 mt-2">
            Integration with Mapbox GL JS or similar map service
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapDisplay;
