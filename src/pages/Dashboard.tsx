import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { CloudRain, Thermometer, Wind, Droplets, Sun, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* TODAY'S FARM DECISION */}
        <section className="bg-white border-2 border-blue-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Today's Action
                </span>
                <span className="text-gray-500 text-sm font-medium flex items-center gap-1">
                  <CloudRain className="w-4 h-4" /> Rain expected in 18 hrs
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-agri-dark mb-4 leading-tight">
                Skip today's irrigation and inspect drainage channels before evening.
              </h2>
              
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-colors">
                  Take Action
                </button>
                <button className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  View Why
                </button>
              </div>
            </div>
            
            <div className="hidden md:flex flex-col items-center justify-center p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
              <CloudRain className="w-16 h-16 text-blue-500 mb-2" />
              <span className="text-blue-900 font-bold text-lg">72%</span>
              <span className="text-blue-600 text-sm font-medium">Rain Prob.</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FARM HEALTH */}
          <section className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-gray-500 font-semibold mb-4 w-full text-left">FARM HEALTH</h3>
            
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#22C55E" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset="22.6" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-agri-dark">92</span>
                <span className="text-xs font-semibold text-gray-400 uppercase">Score</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-agri-green bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Good condition
            </div>
            <p className="text-sm text-gray-500">Your farm is currently in good condition.</p>
          </section>

          {/* CROP STATUS */}
          <section className="glass-card p-6 md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-500 font-semibold">CROP STATUS</h3>
              <button className="text-agri-green text-sm font-medium flex items-center hover:underline">
                Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-agri-green/10 rounded-2xl flex items-center justify-center shrink-0">
                <Leaf className="w-8 h-8 text-agri-green" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xl font-bold text-agri-dark">Cotton</h4>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Kharif 2026</span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-3 mt-4">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold mb-1 uppercase">Growth Stage</p>
                    <p className="text-sm font-medium text-gray-800">Vegetative stage</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold mb-1 uppercase">Overall Health</p>
                    <p className="text-sm font-medium text-agri-green">Good (92%)</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 font-semibold mb-1 uppercase">Current Risk</p>
                    <div className="flex items-center gap-1.5 text-yellow-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Moderate rainfall risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* LIVE CONDITIONS */}
        <section className="glass-card p-6">
          <h3 className="text-gray-500 font-semibold mb-6 uppercase tracking-wider text-sm">Live Farm Conditions</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
              <Thermometer className="w-5 h-5 text-orange-500 mb-2" />
              <div>
                <div className="text-2xl font-bold text-gray-800">28°C</div>
                <div className="text-xs font-medium text-gray-500">Temperature</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
              <CloudRain className="w-5 h-5 text-blue-500 mb-2" />
              <div>
                <div className="text-2xl font-bold text-gray-800">4.2 mm</div>
                <div className="text-xs font-medium text-gray-500">Rainfall</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
              <Droplets className="w-5 h-5 text-blue-400 mb-2" />
              <div>
                <div className="text-2xl font-bold text-gray-800">72%</div>
                <div className="text-xs font-medium text-gray-500">Humidity</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
              <Wind className="w-5 h-5 text-gray-400 mb-2" />
              <div>
                <div className="text-2xl font-bold text-gray-800">12 km/h</div>
                <div className="text-xs font-medium text-gray-500">Wind</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-between col-span-2 md:col-span-1">
              <Sun className="w-5 h-5 text-yellow-500 mb-2" />
              <div>
                <div className="text-2xl font-bold text-gray-800">61%</div>
                <div className="text-xs font-medium text-gray-500">Soil moisture</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
