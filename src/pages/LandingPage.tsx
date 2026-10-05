
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, CloudRain, Cpu, LineChart } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-agri-cream flex flex-col">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-agri-green" />
          <span className="text-2xl font-bold text-agri-dark tracking-tight">NAVASAAGU</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#features" className="hover:text-agri-green transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-agri-green transition-colors">How it works</a>
          <a href="#impact" className="hover:text-agri-green transition-colors">Impact</a>
        </div>
        <Link 
          to="/dashboard" 
          className="bg-agri-green text-white px-6 py-2.5 rounded-full font-medium hover:bg-agri-dark transition-colors flex items-center gap-2"
        >
          Enter Demo <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center text-center px-4 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-leaf-green/10 text-leaf-green font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-leaf-green"></span>
          </span>
          Smart Farming. Local Intelligence. Better Harvests.
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-agri-dark max-w-4xl tracking-tight leading-[1.1] mb-8">
          Your Farm. Your Data.<br />
          <span className="text-agri-green">Smarter Decisions.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-12">
          NavaSaagu combines satellite intelligence, weather, real-time field sensing and AI to help farmers know what to grow, when to sow, and what to do next.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/dashboard" 
            className="bg-agri-green text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-agri-dark transition-transform hover:scale-105 shadow-lg shadow-agri-green/30"
          >
            Explore My Farm
          </Link>
          <Link 
            to="/dashboard" 
            className="bg-white text-agri-dark border border-gray-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Try Farm Simulator
          </Link>
        </div>

        {/* Feature Teasers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-32 text-left">
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <CloudRain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Weather Intelligence</h3>
            <p className="text-gray-600">Hyper-local forecasts combined with AI to tell you exactly when to irrigate and harvest.</p>
          </div>
          
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <LineChart className="w-6 h-6 text-agri-green" />
            </div>
            <h3 className="text-xl font-bold mb-3">Crop Simulator</h3>
            <p className="text-gray-600">Simulate different crops before planting to understand suitability, yield, and risks.</p>
          </div>

          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6 text-harvest-yellow" />
            </div>
            <h3 className="text-xl font-bold mb-3">IoT Field Sensors</h3>
            <p className="text-gray-600">Real-time monitoring of soil moisture, temperature, and field conditions 24/7.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
