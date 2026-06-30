'use client';

import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const foodSchema = z.object({
  food: z.string().min(1),
  meal: z.string(),
});

export default function Nutrition() {
  const { addFoodLog, userSettings } = useStore();
  const [foodInput, setFoodInput] = useState('');
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(foodSchema),
  });

  const estimateMacros = (food: string) => {
    // Simple AI-like estimation
    const lower = food.toLowerCase();
    if (lower.includes('chicken')) return { cal: 165 * 2.5, p: 31 * 2.5, c: 0, f: 3.6 * 2.5 }; // for 250g
    if (lower.includes('rice')) return { cal: 130 * 2, p: 2.7 * 2, c: 28 * 2, f: 0.3 * 2 };
    return { cal: 400, p: 25, c: 40, f: 15 };
  };

  const onSubmit = (data: any) => {
    const macros = estimateMacros(data.food);
    const log = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      meal: data.meal,
      food: data.food,
      calories: Math.round(macros.cal),
      protein: Math.round(macros.p),
      carbs: Math.round(macros.c),
      fat: Math.round(macros.f),
    };
    addFoodLog(log);
    toast.success('Food logged successfully');
    reset();
    setFoodInput('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="glass rounded-3xl p-10">
        <h3 className="text-3xl font-semibold mb-8">AI Food Logger</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input 
            {...register('food')} 
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            placeholder="e.g. 250g chicken breast" 
            className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-[#C9A84C]" 
          />
          <select {...register('meal')} className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-5 text-lg">
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
          <button type="submit" className="w-full py-5 bg-[#C9A84C] hover:bg-[#FFD700] text-black font-semibold rounded-2xl flex items-center justify-center gap-3 transition-all">
            <Plus className="w-6 h-6" /> LOG TO DIARY
          </button>
        </form>
      </div>
      {/* Water tracker and other */}
      <div className="glass rounded-3xl p-10">
        <h3 className="text-xl mb-4">Water Intake</h3>
        <div className="text-6xl font-light">{userSettings.waterTarget}L target</div>
      </div>
    </div>
  );
}
