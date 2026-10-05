import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Map as MapIcon, Layers, Radio, Cpu, Battery, Activity } from 'lucide-react';
import { cn } from '../components/layout/DashboardLayout';

const FarmMap = () => {
  const [activeLayer, setActiveLayer] = useState('sensors');
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 h-[calc(100vh-140px)] flex flex-col">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-agri-dark flex items-center gap-3">
            <MapIcon className="w-8 h-8 text-agri-green" />
            Farm Intelligence
          </h1>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-0">
          
          <div className="md:col-span-1 space-y-4 overflow-y-auto pr-2 pb-20 md:pb-0">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Map Layers</h3>
              <div className="space-y-2">
                {[
                  { id: 'boundary', label: 'Farm Boundary', icon: MapIcon },
                  { id: 'satellite', label: 'Satellite', icon: Layers },
                  { id: 'sensors', label: 'IoT Sensors', icon: Radio },
                  { id: 'risk', label: 'Risk Zones', icon: Activity },
                ].map(layer => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      activeLayer === layer.id 
                        ? "bg-agri-green text-white" 
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <layer.icon className="w-4 h-4" />
                    {layer.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Live IoT Station</h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Raspberry Pi</span>
                  </div>
                  <span className="text-xs font-bold text-green-600">Online</span>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Solar Power</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800">87%</span>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-400 text-center">Last update: 12s ago</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 bg-white rounded-3xl border border-gray-200 overflow-hidden relative shadow-sm h-full min-h-[400px]">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-green-50" style={{ 
              backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
              {/* Fake farm boundary */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] border-4 border-agri-green/30 bg-agri-green/5 rounded-3xl flex items-center justify-center">
                <span className="text-agri-green/20 font-bold text-4xl rotate-12">LAKSHMI FARM</span>
                
                {/* Simulated markers */}
                {activeLayer === 'sensors' && (
                  <>
                    <div className="absolute top-1/4 left-1/4">
                      <div className="relative group cursor-pointer">
                        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center">
                          <Radio className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute -top-16 -left-1/2 hidden group-hover:block w-32 bg-white rounded-lg shadow-xl p-2 text-xs font-medium z-10">
                          Moisture: 61% <br/>Temp: 28°C
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-1/3 right-1/4">
                      <div className="relative group cursor-pointer">
                        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center">
                          <Radio className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute -top-16 -left-1/2 hidden group-hover:block w-32 bg-white rounded-lg shadow-xl p-2 text-xs font-medium z-10">
                          Moisture: 58% <br/>Temp: 29°C
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeLayer === 'risk' && (
                  <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-red-500/20 rounded-tl-[100px] rounded-br-3xl flex items-center justify-center border-l border-t border-red-500/30">
                    <span className="text-red-700/50 font-bold text-xs">Low Drainage Risk</span>
                  </div>
                )}
              </div>
            </div>

            {/* Farm Intelligence Popup Mock */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-gray-100">
              <h4 className="font-bold text-agri-dark mb-1">Lakshmi Farm</h4>
              <p className="text-sm text-gray-500 mb-4">4.2 acres • Cotton</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Health</span>
                  <span className="text-sm font-bold text-agri-green">92%</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Soil moisture</span>
                  <span className="text-sm font-bold text-blue-500">61%</span>
                </div>
              </div>
              
              <div className="bg-blue-50 text-blue-800 p-3 rounded-xl text-sm font-medium">
                Recommendation: Monitor rainfall before irrigation.
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmMap;
