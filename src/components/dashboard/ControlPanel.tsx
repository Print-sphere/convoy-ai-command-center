
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ControlPanel = () => {
  const [mode, setMode] = useState<string>("follow");
  const [gap, setGap] = useState<number[]>([25]);
  
  return (
    <div className="panel p-4">
      <h3 className="font-semibold mb-4">Convoy Controls</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">Mode</p>
        <ToggleGroup type="single" value={mode} onValueChange={(val) => val && setMode(val)}>
          <ToggleGroupItem value="lead" className="flex-1">Lead</ToggleGroupItem>
          <ToggleGroupItem value="follow" className="flex-1">Follow</ToggleGroupItem>
          <ToggleGroupItem value="standalone" className="flex-1">Solo</ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-400">Following Gap (m)</p>
          <p className="text-sm font-medium">{gap[0]}</p>
        </div>
        <Slider
          value={gap}
          onValueChange={setGap}
          min={10}
          max={50}
          step={1}
          disabled={mode !== "follow"}
        />
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1">
          Join Convoy
        </Button>
        <Button variant="destructive" className="flex-1">
          Emergency Stop
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
