'use client';

import { useStore } from '../store/useStore';
import { Check } from 'lucide-react';

export default function Supplements() {
  const { supplements, toggleSupplement } = useStore();

  return (
    <div className="max-w-md mx-auto glass rounded-3xl p-10">
      <h2 className="text-3xl mb-10">Daily Supplements</h2>
      <div className="space-y-4">
        {supplements.map((sup, index) => (
          <div key={index} onClick={() => toggleSupplement(sup.name)} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition">
            <div>{sup.name}</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sup.completed ? 'bg-[#C9A84C]' : 'border border-white/30'}`}>
              {sup.completed && <Check className="text-black" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
