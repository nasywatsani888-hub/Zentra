'use client';

import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle2, Cpu } from 'lucide-react';
import { Machine } from '../types';

interface StatCardsProps {
  machines: Machine[];
}

export const StatCards: React.FC<StatCardsProps> = ({ machines }) => {
  const total = machines.length;
  const normal = machines.filter((m) => m.status === 'NORMAL').length;
  const warning = machines.filter((m) => m.status === 'WARNING').length;
  const critical = machines.filter((m) => m.status === 'CRITICAL').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {/* Total Mesin */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-[#1E293B]/70 p-4 shadow-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Cpu className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Total Mesin</p>
          <p className="text-2xl font-black text-white">{total}</p>
        </div>
      </div>

      {/* Mesin Optimal */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-[#1E293B]/70 p-4 shadow-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Optimal (Normal)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">{normal}</span>
            <span className="text-xs font-medium text-slate-500">Unit</span>
          </div>
        </div>
      </div>

      {/* Peringatan (Warning) */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-[#1E293B]/70 p-4 shadow-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Perlu Pantauan</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">{warning}</span>
            <span className="text-xs font-medium text-slate-500">Unit</span>
          </div>
        </div>
      </div>

      {/* Bahaya Kritis (Critical) */}
      <div className={`flex items-center gap-3 rounded-2xl border bg-[#1E293B]/70 p-4 shadow-sm transition ${
        critical > 0 ? 'border-red-500/50 bg-red-950/20 critical-pulse' : 'border-slate-800'
      }`}>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          critical > 0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-700/20 text-slate-400'
        }`}>
          <AlertOctagon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Alarm Bahaya!</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${critical > 0 ? 'text-red-400' : 'text-slate-400'}`}>
              {critical}
            </span>
            <span className="text-xs font-medium text-slate-500">Unit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
