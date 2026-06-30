'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { TrendingUp, Droplet, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockWeightData = [
  { day: 'Mon', weight: 123 },
  { day: 'Tue', weight: 122.5 },
  { day: 'Wed', weight: 122 },
  { day: 'Thu', weight: 121.8 },
  { day: 'Fri', weight: 122 },
];

export default function Dashboard() {
  const { currentWeight, userSettings, foodLogs } = useStore();

  const todayLogs = foodLogs.filter(log => log.date === new Date().toISOString().split('T')[0]);
  const totalCalories = todayLogs.reduce((sum, log) => sum + log.calories, 0);
  const totalProtein = todayLogs.reduce((sum, log) => sum + log.protein, 0);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/1920/1080')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold tracking-tighter mb-4"
            >
              Good morning, Francois
            </motion.h1>
            <p className="text-2xl text-[#C9A84C]">Let's crush today's session</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Current Weight', value: `${currentWeight} kg`, change: '-0.8kg this week' },
          { label: 'Goal Progress', value: `${Math.round((122 - currentWeight) / (122 - 105) * 100)}%`, change: 'to 105kg' },
          { label: 'Calories Today', value: `${totalCalories} / ${userSettings.caloriesTarget}`, change: 'kcal' },
          { label: 'Protein Today', value: `${totalProtein}g / ${userSettings.proteinTarget}g`, change: 'protein' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-3xl p-8 glow-gold">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white/60 text-sm">{stat.label}</div>
                <div className="text-5xl font-semibold mt-3 tracking-tighter">{stat.value}</div>
              </div>
              <TrendingUp className="text-[#C9A84C]" />
            </div>
            <div className="text-xs text-[#C9A84C] mt-6">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl mb-6">Weight Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockWeightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#C9A84C" strokeWidth={3} dot={{ fill: '#FFD700' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl mb-6">Macros Overview</h3>
          {/* Similar for macros */}
          <div className="h-[280px] flex items-center justify-center text-white/40">Macro Progress Visualization (Recharts)</div>
        </div>
      </div>
    </div>
  );
}
