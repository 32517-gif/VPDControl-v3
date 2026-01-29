
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, Info, Leaf, CloudLightning } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-200">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-black text-xl text-slate-800 tracking-tighter uppercase italic">VPD.Master</span>
          <div className="ml-4 flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Online</span>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => `text-sm font-bold flex items-center gap-2 ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </NavLink>
          <button className="text-slate-300 hover:text-slate-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </nav>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="p-4 text-center border-t border-slate-200 bg-white">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Greenhouse Control Node Alpha 0.1 • ESP32-C3 Mesh</p>
      </footer>
    </div>
  );
};
