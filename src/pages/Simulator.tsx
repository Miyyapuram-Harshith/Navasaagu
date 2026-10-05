import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { FlaskConical, MapPin, Ruler, Calendar, Sprout, TestTube2, Droplet, ArrowRight, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../components/layout/DashboardLayout';

const Simulator = () => {
  const [step, setStep] = useState<'input' | 'analyzing' | 'result'>('input');
  
  const handleSimulate = () => {
    setStep('analyzing');
    setTimeout(() => {
      setStep('result');
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-agri-dark mb-2 flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-agri-green" />
            What should I grow?
          </h1>
          <p className="text-gray-500 text-lg">Simulate a crop before you invest.</p>
        </div>

        {step === 'input' && (
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1.5 uppercase">
                    <MapPin className="w-4 h-4" /> Location
                  </label>
                  <input type="text" value="Warangal, Telangana" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 outline-none" readOnly />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1.5 uppercase">
                    <Ruler className="w-4 h-4" /> Farm Size
                  </label>
                  <input type="text" value="4.2 acres" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 outline-none" readOnly />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1.5 uppercase">
                    <Calendar className="w-4 h-4" /> Season
                  </label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 outline-none focus:border-agri-green focus:ring-1 focus:ring-agri-green">
                    <option>Kharif (Monsoon)</option>
                    <option>Rabi (Winter)</option>
                    <option>Zaid (Summer)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1.5 uppercase">
                    <Sprout className="w-4 h-4" /> Crop
                  </label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 outline-none focus:border-agri-green focus:ring-1 focus:ring-agri-green">
                    <option>Cotton</option>
                    <option>Rice</option>
                    <option>Maize</option>
                    <option>Chilli</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1.5 uppercase">
                    <TestTube2 className="w-4 h-4" /> Soil Type
                  </label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 outline-none focus:border-agri-green focus:ring-1 focus:ring-agri-green">
                    <option>Red Soil</option>
                    <option>Black Cotton Soil</option>
                    <option>Alluvial Soil</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1.5 uppercase">
                    <Droplet className="w-4 h-4" /> Irrigation
                  </label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 outline-none focus:border-agri-green focus:ring-1 focus:ring-agri-green">
                    <option>Partial (Rain-fed + Borewell)</option>
                    <option>Fully Irrigated</option>
                    <option>Rain-fed only</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSimulate}
              className="w-full bg-agri-green text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-agri-green/30 hover:bg-agri-dark transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              RUN SIMULATION
            </button>
          </div>
        )}

        {step === 'analyzing' && (
          <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 relative mb-8">
              <div className="absolute inset-0 border-4 border-agri-green/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-agri-green border-t-transparent rounded-full animate-spin"></div>
              <FlaskConical className="absolute inset-0 m-auto w-8 h-8 text-agri-green animate-pulse" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-6">Analyzing location...</h3>
            
            <div className="space-y-3 w-full max-w-sm">
              {['Climate suitability', 'Rainfall compatibility', 'Soil compatibility', 'Weather risk'].map((item, i) => (
                <div key={item} className="flex items-center justify-between text-gray-600 animate-pulse" style={{ animationDelay: `${i * 300}ms` }}>
                  <span>{item}</span>
                  <CheckCircle2 className="w-5 h-5 text-agri-green" />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl p-8 border-2 border-green-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <span className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2 block">Crop Feasibility</span>
                  <h2 className="text-4xl font-bold text-agri-dark mb-4">Cotton</h2>
                  
                  <div className="bg-green-50 text-agri-dark border border-green-200 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-bold text-agri-green">84%</span>
                      <span className="bg-agri-green text-white text-xs font-bold px-2 py-1 rounded">Highly Suitable</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Cotton is suitable for this farm during Kharif. Because rainfall variability is moderate, maintain irrigation backup and monitor heavy-rain events.
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-64 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 font-medium">Climate</span>
                      <span className="font-bold text-gray-800">92%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-agri-green h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 font-medium">Soil match</span>
                      <span className="font-bold text-gray-800">88%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-agri-green h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 font-medium">Rainfall</span>
                      <span className="font-bold text-gray-800">78%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-leaf-green h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600">Medium weather risk</span>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mt-6 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => setStep('input')}
                  className="text-agri-green font-semibold hover:underline flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> Compare Another Crop
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Comparison Cards */}
              {[
                { name: 'Rice', score: 65, status: 'Moderate' },
                { name: 'Maize', score: 88, status: 'High' },
                { name: 'Chilli', score: 72, status: 'Moderate' },
                { name: 'Groundnut', score: 91, status: 'High' },
              ].map(crop => (
                <div key={crop.name} className="glass-card p-4 flex flex-col items-center text-center">
                  <span className="text-gray-800 font-bold mb-2">{crop.name}</span>
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2",
                    crop.score > 80 ? "bg-green-100 text-agri-green" : "bg-yellow-100 text-yellow-700"
                  )}>
                    {crop.score}
                  </div>
                  <span className="text-xs text-gray-500">{crop.status} Suitability</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Simulator;
