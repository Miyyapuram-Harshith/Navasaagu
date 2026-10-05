import React from 'react';
import { useSimulation } from '../../store/SimulationContext';
import type { ScenarioType } from '../../store/SimulationContext';
import { Sun, CloudLightning, Droplets, CheckCircle, Flame } from 'lucide-react';
import { cn } from '../layout/DashboardLayout';

const scenarios: { type: ScenarioType; label: string; icon: React.ReactNode; color: string }[] = [
  { type: 'NORMAL', label: 'Normal', icon: <CheckCircle className="w-4 h-4" />, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  { type: 'IDEAL', label: 'Ideal', icon: <Sun className="w-4 h-4" />, color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
  { type: 'HEAVY_RAIN', label: 'Heavy Rain', icon: <CloudLightning className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
  { type: 'HEAT_WAVE', label: 'Heat Wave', icon: <Flame className="w-4 h-4" />, color: 'bg-red-100 text-red-700 hover:bg-red-200' },
  { type: 'DROUGHT', label: 'Drought', icon: <Droplets className="w-4 h-4" />, color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
];

export const SimulationControlPanel = () => {
  const { state, setScenario } = useSimulation();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Demo Simulation Controls</h3>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {scenarios.map((sc) => (
          <button
            key={sc.type}
            onClick={() => setScenario(sc.type)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-xl gap-2 transition-all font-medium text-xs",
              sc.color,
              state.scenario === sc.type ? "ring-2 ring-offset-2 ring-purple-500 shadow-md scale-105" : "opacity-70 grayscale-[50%]"
            )}
          >
            {sc.icon}
            {sc.label}
          </button>
        ))}
      </div>
    </div>
  );
};
