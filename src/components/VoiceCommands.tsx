
import React, { useState, useEffect } from 'react';
import { Volume } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceCommandsProps {
  className?: string;
}

const VoiceCommands = ({ className }: VoiceCommandsProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recentCommand, setRecentCommand] = useState<string | null>(null);
  
  // Toggle voice command listener
  const toggleListener = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate recognizing a command after 3 seconds
      setTimeout(() => {
        setRecentCommand("Following vehicle ahead");
        
        // Clear the command after a few seconds
        setTimeout(() => {
          setRecentCommand(null);
          setIsListening(false);
        }, 3000);
      }, 3000);
    } else {
      setRecentCommand(null);
    }
  };
  
  return (
    <div className={cn("fixed bottom-4 right-4", className)}>
      <div 
        className={cn(
          "p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 flex items-center", 
          isListening 
            ? "bg-convoy-blue animate-pulse-slow" 
            : "bg-gray-800 hover:bg-gray-700"
        )}
        onClick={toggleListener}
      >
        <Volume className="w-6 h-6" />
      </div>
      
      {recentCommand && (
        <div className="absolute bottom-full right-0 mb-2 p-2 bg-gray-800 rounded-lg text-sm min-w-[180px] animate-fade-in">
          "{recentCommand}"
        </div>
      )}
    </div>
  );
};

export default VoiceCommands;
