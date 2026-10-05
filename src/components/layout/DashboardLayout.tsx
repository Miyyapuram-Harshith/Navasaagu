import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Leaf, FlaskConical, Cloud, BrainCircuit, Bell, User, Map, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const DesktopNav = () => {
  const location = useLocation();
  const navItems = [
    { icon: Home, label: 'Overview', path: '/dashboard' },
    { icon: Map, label: 'My Farm', path: '/dashboard/farm' },
    { icon: FlaskConical, label: 'Crop Simulator', path: '/dashboard/simulator' },
    { icon: Cloud, label: 'Weather', path: '/dashboard/weather' },
    { icon: BookOpen, label: 'Resources', path: '/dashboard/resources' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-screen sticky top-0 left-0">
      <div className="p-6 flex items-center gap-2">
        <Leaf className="w-8 h-8 text-agri-green" />
        <span className="text-2xl font-bold text-agri-dark tracking-tight">NAVASAAGU</span>
      </div>
      
      <nav className="flex-1 px-4 mt-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
                isActive 
                  ? "bg-agri-green text-white" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-agri-dark"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="bg-leaf-green/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-leaf-green"></span>
            </span>
            <span className="text-sm font-bold text-agri-dark">DEMO MODE</span>
          </div>
          <p className="text-xs text-gray-600">Simulating live data</p>
        </div>
      </div>
    </aside>
  );
};

const MobileNav = () => {
  const location = useLocation();
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'My Farm', path: '/dashboard/farm' },
    { icon: FlaskConical, label: 'Simulate', path: '/dashboard/simulator' },
    { icon: Cloud, label: 'Weather', path: '/dashboard/weather' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 pb-safe">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1",
              isActive ? "text-agri-green" : "text-gray-400"
            )}
          >
            <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </Link>
        );
      })}
      
      {/* Floating AI Action */}
      <Link to="/dashboard/ai" className="absolute -top-6 left-1/2 -translate-x-1/2 bg-agri-green text-white p-4 rounded-full shadow-lg shadow-agri-green/30 border-4 border-agri-cream hover:scale-105 transition-transform">
        <BrainCircuit className="w-6 h-6" />
      </Link>
    </div>
  );
};

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-agri-cream flex">
      <DesktopNav />
      
      <main className="flex-1 flex flex-col min-h-screen pb-20 md:pb-0">
        <header className="bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-agri-dark">Good morning, Ramesh 👋</h1>
            <span className="text-sm text-gray-500">Warangal, Telangana • Lakshmi Farm</span>
          </div>
          
          <div className="flex items-center gap-4">
            <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium outline-none">
              <option>English</option>
              <option>తెలుగు</option>
            </select>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="hidden md:flex p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
};
