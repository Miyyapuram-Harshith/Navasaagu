import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

export type ScenarioType = 'NORMAL' | 'HEAVY_RAIN' | 'HEAT_WAVE' | 'DROUGHT' | 'IDEAL';

export interface SimulationState {
  scenario: ScenarioType;
  temperature: number;
  humidity: number;
  rainfall: number;
  soilMoisture: number;
  windSpeed: number;
  farmHealth: number;
  cropRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  waterRequirement: number;
  irrigationRecommended: boolean;
  irrigationReason: string;
  aiRecommendation: string;
  rainProbability: number;
  sensorStatus: 'ONLINE' | 'OFFLINE' | 'WARNING';
}

interface SimulationContextType {
  state: SimulationState;
  setScenario: (scenario: ScenarioType) => void;
}

const defaultState: SimulationState = {
  scenario: 'NORMAL',
  temperature: 28,
  humidity: 65,
  rainfall: 0,
  soilMoisture: 61,
  windSpeed: 12,
  farmHealth: 92,
  cropRisk: 'LOW',
  waterRequirement: 72,
  irrigationRecommended: false,
  irrigationReason: 'Current soil moisture is adequate.',
  aiRecommendation: 'Conditions are optimal. Continue regular monitoring.',
  rainProbability: 15,
  sensorStatus: 'ONLINE'
};

const getDerivedState = (scenario: ScenarioType): SimulationState => {
  switch (scenario) {
    case 'HEAVY_RAIN':
      return {
        scenario,
        temperature: 24,
        humidity: 95,
        rainfall: 45,
        soilMoisture: 98,
        windSpeed: 25,
        farmHealth: 79,
        cropRisk: 'HIGH',
        waterRequirement: 0,
        irrigationRecommended: false,
        irrigationReason: 'Heavy rainfall occurring. Soil is saturated.',
        aiRecommendation: 'Protect harvested produce and inspect drainage immediately.',
        rainProbability: 95,
        sensorStatus: 'ONLINE'
      };
    case 'HEAT_WAVE':
      return {
        scenario,
        temperature: 42,
        humidity: 25,
        rainfall: 0,
        soilMoisture: 22,
        windSpeed: 18,
        farmHealth: 65,
        cropRisk: 'HIGH',
        waterRequirement: 95,
        irrigationRecommended: true,
        irrigationReason: 'Soil moisture is critically low and temperature is extremely high.',
        aiRecommendation: 'Irrigate immediately during cooler evening hours to prevent severe crop stress.',
        rainProbability: 5,
        sensorStatus: 'WARNING'
      };
    case 'DROUGHT':
      return {
        scenario,
        temperature: 36,
        humidity: 30,
        rainfall: 0,
        soilMoisture: 15,
        windSpeed: 15,
        farmHealth: 55,
        cropRisk: 'HIGH',
        waterRequirement: 100,
        irrigationRecommended: true,
        irrigationReason: 'Prolonged dry conditions. Immediate water intervention required.',
        aiRecommendation: 'Activate drip irrigation to conserve water while saving the crop.',
        rainProbability: 0,
        sensorStatus: 'ONLINE'
      };
    case 'IDEAL':
      return {
        scenario,
        temperature: 26,
        humidity: 60,
        rainfall: 5,
        soilMoisture: 75,
        windSpeed: 8,
        farmHealth: 98,
        cropRisk: 'LOW',
        waterRequirement: 60,
        irrigationRecommended: false,
        irrigationReason: 'Perfect balance of natural moisture and temperature.',
        aiRecommendation: 'Ideal growing conditions. No intervention needed.',
        rainProbability: 30,
        sensorStatus: 'ONLINE'
      };
    case 'NORMAL':
    default:
      return defaultState;
  }
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [scenario, setScenario] = useState<ScenarioType>('NORMAL');

  const state = useMemo(() => getDerivedState(scenario), [scenario]);

  return (
    <SimulationContext.Provider value={{ state, setScenario }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
