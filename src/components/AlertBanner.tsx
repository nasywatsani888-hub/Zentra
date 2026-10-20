'use client';

import React from 'react';
import { AlertOctagon, ArrowRight, BellRing } from 'lucide-react';
import { Machine } from '../types';

interface AlertBannerProps {
  criticalMachines: Machine[];
  onSelectMachine: (machine: Machine) => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  criticalMachines,
  onSelectMachine,
}) => {
  if (criticalMachines.length === 0) return null;

  const firstCrit = criticalMachines[0];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-red-500/60 bg-gradient-to-r from-red-950/80 via-red-900/60 to-red-950/80 p-4 shadow-xl shadow-red-500/10 critical-pulse">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md animate-bounce">
            <BellRing className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-black uppercase text-white tracking-wider">
                EARLY WARNING ALERT
              </span>
              <span className="text-xs font-bold text-red-200">
                {criticalMachines.length} Mesin Berada Pada Zona Bahaya!
              </span>
            </div>
            <p className="mt-0.5 text-xs text-red-300">
              <strong>{firstCrit.id} ({firstCrit.name})</strong>: Terdeteksi <strong>{firstCrit.faultPrediction}</strong> (Getaran: {firstCrit.vibrationRms} mm/s, Suhu: {firstCrit.temperature}°C). Segera kirim teknisi!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelectMachine(firstCrit)}
          className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-black text-red-700 shadow-md transition hover:bg-red-50 active:scale-95 shrink-0"
        >
          <span>Inspeksi {firstCrit.id}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
