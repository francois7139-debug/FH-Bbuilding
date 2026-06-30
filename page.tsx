'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import { 
  Home, Dumbbell, Apple, TrendingUp, Camera, Pill, Calendar, Bot, Settings, 
  Shield 
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Training from './components/Training';
import Nutrition from './components/Nutrition';
import Progress from './components/Progress';
import Photos from './components/Photos';
import Supplements from './components/Supplements';
import CalendarComp from './components/Calendar';
import AICoach from './components/AICoach';
import SettingsComp from './components/Settings';

const navItems = [
  { name: 'Dashboard', icon: Home },
  { name: 'Training', icon: Dumbbell },
  { name: 'Nutrition', icon: Apple },
  { name: 'Progress', icon: TrendingUp },
  { name: 'Photos', icon: Camera },
  { name: 'Supplements', icon: Pill },
  { name: 'Calendar', icon: Calendar },
  { name: 'AI Coach', icon: Bot },
  { name: 'Settings', icon: Settings },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { currentWeight, userSettings } = useStore();

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/10 bg-black/80 flex flex-col glass">
        <div className="p-8 flex items-center gap-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#FFD700] flex items-center justify-center">
            <Shield className="w-7 h-7 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">FH HEUNIS</h1>
            <p className="text-xs text-[#C9A84C]">BODYBUILDING AI</p>
          </div>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <motion.button
                key={item.name}
                whileHover={{ x: 4 }}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl mb-1 transition-all ${isActive 
                  ? 'bg-[#C9A84C] text-black' 
                  : 'hover:bg-white/5 text-white/70 hover:text-white'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10 text-xs text-white/50">
          Built for Francois Heunis • Premium Experience
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">{activeTab}</h2>
            <div className="text-sm text-[#C9A84C]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>122 kg</div>
            <div className="px-4 py-1.5 bg-white/5 rounded-full">Goal: 105 kg</div>
          </div>
        </div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-8"
          >
            {activeTab === 'Dashboard' && <Dashboard />}
            {activeTab === 'Training' && <Training />}
            {activeTab === 'Nutrition' && <Nutrition />}
            {activeTab === 'Progress' && <Progress />}
            {activeTab === 'Photos' && <Photos />}
            {activeTab === 'Supplements' && <Supplements />}
            {activeTab === 'Calendar' && <CalendarComp />}
            {activeTab === 'AI Coach' && <AICoach />}
            {activeTab === 'Settings' && <SettingsComp />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
