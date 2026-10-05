import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import GoogleFarmMap from '../components/map/GoogleFarmMap';
import { getFarms, saveFarm } from '../utils/storage';
import type { FarmProfile, Coordinates } from '../types/farm';
import { Map as MapIcon, Radio, Leaf, CloudRain, AlertTriangle, Droplets, Battery, Cpu, Info, Thermometer } from 'lucide-react';
import { cn } from '../components/layout/DashboardLayout';
import { Marker } from '@react-google-maps/api';
import { useSimulation } from '../store/SimulationContext';
import { SimulationControlPanel } from '../components/dashboard/SimulationControlPanel';

const FarmMap = () => {
  const [activeFarm, setActiveFarm] = useState<FarmProfile | null>(null);
  const [activeLayer, setActiveLayer] = useState<'sensors' | 'risk' | 'none'>('risk');
  const [isDefiningNew, setIsDefiningNew] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<Coordinates | null>(null);
  
  const { state } = useSimulation();

  useEffect(() => {
    const farms = getFarms();
    if (farms.length > 0) {
      setActiveFarm(farms[0]); // Load first farm
    } else {
      setIsDefiningNew(true);
    }
  }, []);

  const handleSaveFarm = (polygon: Coordinates[], areaSqMeters: number, center: Coordinates) => {
    const newFarm: FarmProfile = {
      id: Date.now().toString(),
      name: 'Lakshmi Farm', // Demo name
      center,
      polygon,
      areaAcres: areaSqMeters * 0.000247105,
      areaHectares: areaSqMeters * 0.0001,
      areaSqMeters,
      crop: 'Cotton',
      season: 'Kharif',
      irrigation: 'Partial',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    saveFarm(newFarm);
    setActiveFarm(newFarm);
    setIsDefiningNew(false);
  };

  // Mock sensor location slightly offset from center
  const getSensorLocation = (center: Coordinates) => ({
    lat: center.lat + 0.0005,
    lng: center.lng - 0.0005
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 flex flex-col min-h-[calc(100vh-100px)] pb-24">
        
        <div className="flex justify-between items-end mb-2">
          <div>
            <h1 className="text-3xl font-bold text-agri-dark flex items-center gap-3">
              <MapIcon className="w-8 h-8 text-agri-green" />
              {activeFarm ? activeFarm.name : 'Find Your Farm'}
            </h1>
            {activeFarm && (
              <p className="text-gray-500 font-medium">
                {activeFarm.areaAcres.toFixed(2)} acres • {activeFarm.crop}
              </p>
            )}
          </div>
          {activeFarm && !isDefiningNew && (
            <button 
              onClick={() => setIsDefiningNew(true)}
              className="text-sm font-semibold text-agri-green hover:underline"
            >
              + Add Another Farm
            </button>
          )}
        </div>

        {/* SIMULATION CONTROL PANEL FOR JURY */}
        <SimulationControlPanel />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px]">
          
          {/* MAP AREA */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm h-[500px] lg:h-auto relative flex flex-col">
            <GoogleFarmMap 
              initialCenter={activeFarm?.center}
              savedPolygon={isDefiningNew ? undefined : activeFarm?.polygon}
              onSaveFarm={handleSaveFarm}
              readOnly={!isDefiningNew}
            >
              {/* Sensor Markers when active farm exists */}
              {!isDefiningNew && activeFarm && activeLayer === 'sensors' && window.google && (
                <Marker 
                  position={getSensorLocation(activeFarm.center)} 
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>'),
                    scaledSize: new window.google.maps.Size(32, 32),
                    anchor: new window.google.maps.Point(16, 16)
                  }}
                  onClick={() => setSelectedSensor(getSensorLocation(activeFarm.center))}
                />
              )}
            </GoogleFarmMap>

            {/* Farm Monitoring Toolbar Overlay (if viewing a farm) */}
            {!isDefiningNew && activeFarm && (
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 p-2 flex flex-col gap-2">
                <button 
                  onClick={() => setActiveLayer(activeLayer === 'sensors' ? 'none' : 'sensors')}
                  className={cn(
                    "p-2 rounded-lg transition-colors flex items-center justify-center group relative",
                    activeLayer === 'sensors' ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-500"
                  )}
                >
                  <Radio className="w-5 h-5" />
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">IoT Sensors</span>
                </button>
                <button 
                  onClick={() => setActiveLayer(activeLayer === 'risk' ? 'none' : 'risk')}
                  className={cn(
                    "p-2 rounded-lg transition-colors flex items-center justify-center group relative",
                    activeLayer === 'risk' ? "bg-red-100 text-red-600" : "hover:bg-gray-100 text-gray-500"
                  )}
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Risk Map (Simulated)</span>
                </button>
              </div>
            )}

            {/* Sensor Info Popup */}
            {selectedSensor && (
              <div className="absolute top-4 right-4 z-10 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-5 animate-in fade-in slide-in-from-right-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-blue-500" />
                      FIELD STATION
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-green-600 uppercase">Online</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedSensor(null)} className="text-gray-400 hover:text-gray-600">×</button>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-4">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <span className="text-xs text-gray-400 block">Temp</span>
                    <span className="font-bold text-gray-800">{state.temperature}°C</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <span className="text-xs text-gray-400 block">Humidity</span>
                    <span className="font-bold text-gray-800">{state.humidity}%</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <span className="text-xs text-gray-400 block">Rain</span>
                    <span className="font-bold text-blue-600">{state.rainfall} mm</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <span className="text-xs text-gray-400 block">Soil</span>
                    <span className="font-bold text-blue-500">{state.soilMoisture}%</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <span className="text-xs text-gray-400 block">Wind</span>
                    <span className="font-bold text-gray-800">{state.windSpeed} km/h</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg flex flex-col justify-center">
                    <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                      <Battery className="w-3 h-3" /> 92%
                    </div>
                    <div className="flex items-center gap-1 text-xs text-yellow-600 font-semibold">
                      <Cpu className="w-3 h-3" /> 87%
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 text-center animate-pulse">Last updated: 12 seconds ago</div>
              </div>
            )}
          </div>

          {/* INTELLIGENCE PANEL */}
          <div className="lg:col-span-1 space-y-6">
            
            {isDefiningNew ? (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center h-full flex flex-col justify-center items-center">
                <MapIcon className="w-16 h-16 text-gray-200 mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">Define Your Land</h2>
                <p className="text-gray-500 mb-6">Search for your location, then click "+ Draw My Farm" to map your exact boundary.</p>
                <div className="bg-green-50 text-green-800 text-sm font-medium px-4 py-3 rounded-xl w-full text-left flex items-start gap-3">
                  <Leaf className="w-5 h-5 shrink-0 mt-0.5" />
                  NavaSaagu uses your exact farm boundaries to calculate weather impact and crop feasibility.
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">FARM STATUS</h3>
                  
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors duration-500",
                        state.farmHealth > 80 ? "bg-green-100 text-green-700" :
                        state.farmHealth > 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                      )}>
                        <span className="font-bold text-lg">{state.farmHealth}</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">Farm Health</div>
                        <div className={cn(
                          "text-xs font-medium",
                          state.farmHealth > 80 ? "text-green-600" :
                          state.farmHealth > 60 ? "text-yellow-600" : "text-red-600"
                        )}>
                          {state.farmHealth > 80 ? 'Excellent condition' : state.farmHealth > 60 ? 'Moderate stress' : 'Critical condition'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Thermometer className="w-4 h-4" /> Temperature
                      </div>
                      <span className="font-bold text-red-500">{state.temperature}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CloudRain className="w-4 h-4" /> Rain Probability
                      </div>
                      <span className="font-bold text-blue-600">{state.rainProbability}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Droplets className="w-4 h-4" /> Soil Moisture
                      </div>
                      <span className="font-bold text-blue-500">{state.soilMoisture}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <AlertTriangle className="w-4 h-4" /> Crop Risk
                      </div>
                      <span className={cn(
                        "font-bold px-2 py-0.5 rounded text-xs",
                        state.cropRisk === 'LOW' ? "bg-green-50 text-green-600" :
                        state.cropRisk === 'MEDIUM' ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
                      )}>{state.cropRisk}</span>
                    </div>
                  </div>
                </div>

                <div className={cn(
                  "rounded-3xl p-6 text-white shadow-lg relative overflow-hidden transition-colors duration-500",
                  state.scenario === 'HEAVY_RAIN' ? "bg-gradient-to-br from-blue-700 to-indigo-900" :
                  state.scenario === 'HEAT_WAVE' ? "bg-gradient-to-br from-red-600 to-orange-800" :
                  state.scenario === 'DROUGHT' ? "bg-gradient-to-br from-orange-600 to-yellow-800" :
                  "bg-gradient-to-br from-agri-green to-agri-dark"
                )}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                  <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2 relative z-10">AI COPILOT RECOMMENDATION</h3>
                  
                  <div className="relative z-10 mt-3">
                    <div className="flex items-start gap-3 mb-3">
                      <Info className="w-6 h-6 text-white/80 shrink-0" />
                      <p className="font-medium text-white/90">{state.irrigationReason}</p>
                    </div>
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <p className="font-bold text-lg leading-tight">
                        {state.aiRecommendation}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs font-bold text-white/70 uppercase tracking-wider">
                        <span>Irrigation: </span>
                        <span className={state.irrigationRecommended ? "text-green-300" : "text-red-300"}>
                          {state.irrigationRecommended ? "RECOMMENDED" : "NOT RECOMMENDED"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Demo Satellite Analysis</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 font-medium">Vegetation Health</span>
                        <span className="font-bold text-gray-800">84%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-agri-green h-1.5 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 font-medium">Crop Coverage</span>
                        <span className="font-bold text-gray-800">91%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-agri-green h-1.5 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 italic">Data simulated. Awaiting Earth Engine integration.</p>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmMap;
