import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Cloud, CloudRain, Wind, Thermometer, Sun, Umbrella } from 'lucide-react';
import { cn } from '../components/layout/DashboardLayout';

const Weather = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-agri-dark mb-2 flex items-center gap-3">
            <Cloud className="w-8 h-8 text-blue-500" />
            Weather Intelligence
          </h1>
          <p className="text-gray-500 text-lg">Weather translated into farm action.</p>
        </div>

        {/* Action interpretation hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <CloudRain className="w-16 h-16 text-blue-200" />
                <div>
                  <div className="text-5xl font-bold">28°C</div>
                  <div className="text-blue-200 font-medium">Partly cloudy • Rain probability: 68%</div>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/20 max-w-lg">
                <h3 className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-2">AI Interpretation</h3>
                <p className="text-xl font-medium leading-relaxed">
                  "Rain is likely within 18 hours. Irrigation is not recommended today."
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-agri-dark w-full md:w-auto shadow-xl">
              <h4 className="font-bold mb-4 text-center">Agricultural Action Timeline</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm font-semibold text-gray-500">10 AM</span>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Normal conditions</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm font-semibold text-gray-500">2 PM</span>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-medium">Rain probability rising</span>
                </div>
                <div className="flex items-center gap-4 bg-red-50 p-2 rounded-lg -mx-2 border border-red-100">
                  <span className="w-12 text-sm font-semibold text-red-700">6 PM</span>
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                  <span className="text-sm font-bold text-red-700">Heavy rain risk</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm font-semibold text-gray-500">9 PM</span>
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium">High rainfall</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <span className="text-xs font-bold text-gray-400 uppercase">Best Action Window</span>
                <div className="text-sm font-medium text-green-600">Now until 2 PM</div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="glass-card p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-gray-500" /> Temperature Trend
            </h3>
            {/* Mock chart layout */}
            <div className="h-48 flex items-end justify-between gap-2 pb-6 border-b border-gray-100 px-2 relative">
              <div className="absolute top-10 w-full border-t border-dashed border-gray-200"></div>
              {[22, 25, 28, 31, 29, 26, 23].map((temp, i) => (
                <div key={i} className="flex flex-col items-center gap-2 z-10">
                  <span className="text-xs font-semibold text-gray-600">{temp}°</span>
                  <div className="w-8 bg-gradient-to-t from-orange-200 to-orange-400 rounded-t-lg" style={{ height: `${(temp - 20) * 8}px` }}></div>
                  <span className="text-xs text-gray-400">{['6A','9A','12P','3P','6P','9P','12A'][i]}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Umbrella className="w-5 h-5 text-gray-500" /> Rain Probability
            </h3>
            <div className="h-48 flex items-end justify-between gap-2 pb-6 border-b border-gray-100 px-2 relative">
              <div className="absolute top-10 w-full border-t border-dashed border-gray-200"></div>
              {[10, 15, 30, 80, 95, 60, 20].map((prob, i) => (
                <div key={i} className="flex flex-col items-center gap-2 z-10">
                  <span className="text-xs font-semibold text-blue-600">{prob}%</span>
                  <div className="w-8 bg-blue-400 rounded-t-lg opacity-80" style={{ height: `${prob}px` }}></div>
                  <span className="text-xs text-gray-400">{['6A','9A','12P','3P','6P','9P','12A'][i]}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="glass-card p-6">
          <h3 className="font-bold text-gray-800 mb-4">5-Day Outlook</h3>
          <div className="divide-y divide-gray-100">
            {[
              { day: 'Tomorrow', desc: 'Light rain, thunderstorms', temp: '26° / 22°', icon: CloudRain, risk: 'High' },
              { day: 'Wednesday', desc: 'Partly cloudy', temp: '29° / 23°', icon: Cloud, risk: 'Low' },
              { day: 'Thursday', desc: 'Sunny, strong winds', temp: '32° / 24°', icon: Wind, risk: 'Medium' },
              { day: 'Friday', desc: 'Clear skies', temp: '33° / 25°', icon: Sun, risk: 'Low' },
            ].map((day, i) => (
              <div key={i} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4 w-1/3">
                  <day.icon className="w-6 h-6 text-gray-500" />
                  <span className="font-medium text-gray-800">{day.day}</span>
                </div>
                <div className="w-1/3 text-sm text-gray-500">{day.desc}</div>
                <div className="w-1/4 text-right font-medium text-gray-800">{day.temp}</div>
                <div className="w-24 text-right">
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded",
                    day.risk === 'High' ? 'bg-red-100 text-red-700' :
                    day.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  )}>
                    {day.risk} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </DashboardLayout>
  );
};

export default Weather;
