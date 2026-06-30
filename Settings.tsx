'use client';

import React from 'react';
import { useStore } from '../store/useStore';
import { useForm } from 'react-hook-form';

export default function SettingsComp() {
  const { userSettings, updateSettings } = useStore();
  const { register, handleSubmit } = useForm({ defaultValues: userSettings });

  const onSubmit = (data: any) => {
    updateSettings(data);
    alert('Settings saved to localStorage!');
  };

  return (
    <div className="max-w-lg mx-auto glass rounded-3xl p-12">
      <h2 className="text-3xl mb-10">Profile & Targets</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label>Current Weight (kg)</label>
          <input {...register('weight')} type="number" className="w-full mt-2 bg-black/50 border border-white/20 rounded-2xl p-4" />
        </div>
        <div>
          <label>Goal Weight (kg)</label>
          <input {...register('goalWeight')} type="number" className="w-full mt-2 bg-black/50 border border-white/20 rounded-2xl p-4" />
        </div>
        {/* Add other fields similarly */}
        <button type="submit" className="w-full py-5 bg-gradient-to-r from-[#C9A84C] to-[#FFD700] text-black font-bold rounded-2xl">SAVE CHANGES</button>
      </form>
      <div className="mt-12 text-xs opacity-60">Data is persisted locally. Export/Import available via browser dev tools.</div>
    </div>
  );
}
