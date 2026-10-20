'use client';

import React from 'react';
import { Activity, AlertTriangle, ArrowUpRight, Gauge, Thermometer, Wrench } from 'lucide-react';
import { Machine } from '../types';

interface MachineCardProps {
  machine: Machine;
  onSelect: (machine: Machine) => void;
}

export const MachineCard: React.FC<MachineCardProps> = ({ machine, onSelect }) => {
  const isCritical = machine.status === 'CRITICAL';
  const isWarning = machine.status === 'WARNING';

  // Persentase batas ambang untuk progress bar
  const tempRatio = Math.min(Math.round((machine.temperature / machine.thresholdTemp) * 100), 100);
  const vibRatio = Math.min(Math.round((machine.vibrationRms / machine.thresholdVib) * 100), 100);

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-3xl border bg-[#1E293B]/80 p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isCritical
          ? 'border-red-500/60 bg-gradient-to-b from-red-950/20 to-[#1E293B]/90 shadow-red-500/10'
          : isWarning
          ? 'border-amber-500/50 bg-gradient-to-b from-amber-950/10 to-[#1E293B]/90 shadow-amber-500/10'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Top Header Card */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-slate-800 px-2 py-0.5 text-xs font-black tracking-wider text-blue-400 border border-slate-700">
                {machine.id}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                {machine.bearingModel}
              </span>
            </div>
            <h3 className="mt-1 text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              {machine.name}
            </h3>
            <p className="text-xs text-slate-400">{machine.location}</p>
          </div>

          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-wider ${
              isCritical
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                : isWarning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />
            {machine.status}
          </span>
        </div>

        {/* 2 Sensor Metrics: Suhu & Getaran */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Suhu */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Thermometer className="h-3.5 w-3.5 text-orange-400" />
                Suhu
              </span>
              <span className="text-[10px] text-slate-500">Max {machine.thresholdTemp}°C</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span
                className={`text-xl font-black ${
                  machine.temperature >= machine.thresholdTemp ? 'text-red-400' : 'text-slate-100'
                }`}
              >
                {machine.temperature.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">°C</span>
            </div>
            {/* Bar */}
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  tempRatio >= 100
                    ? 'bg-red-500'
                    : tempRatio > 80
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${tempRatio}%` }}
              />
            </div>
          </div>

          {/* Getaran RMS */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
                Getaran
              </span>
              <span className="text-[10px] text-slate-500">Max {machine.thresholdVib} mm/s</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span
                className={`text-xl font-black ${
                  machine.vibrationRms >= machine.thresholdVib ? 'text-red-400' : 'text-slate-100'
                }`}
              >
                {machine.vibrationRms.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400">mm/s</span>
            </div>
            {/* Bar */}
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  vibRatio >= 100
                    ? 'bg-red-500'
                    : vibRatio > 80
                    ? 'bg-amber-500'
                    : 'bg-cyan-500'
                }`}
                style={{ width: `${vibRatio}%` }}
              />
            </div>
          </div>
        </div>

        {/* AI LSTM Diagnosa Badge */}
        <div
          className={`mt-4 rounded-2xl border p-3.5 ${
            isCritical
              ? 'border-red-500/30 bg-red-950/30'
              : isWarning
              ? 'border-amber-500/30 bg-amber-950/30'
              : 'border-slate-800 bg-slate-900/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <Gauge className="h-3.5 w-3.5 text-blue-400" />
              Diagnosa LSTM:
            </span>
            <span className="text-xs font-extrabold text-blue-400">
              {machine.confidence}% Yakin
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span
              className={`text-sm font-black ${
                isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {machine.faultPrediction}
            </span>
            <span className="text-xs text-slate-400">{machine.rpm} RPM</span>
          </div>
        </div>
      </div>

      {/* Button Detail */}
      <button
        type="button"
        onClick={() => onSelect(machine)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-blue-600 hover:border-blue-500 hover:text-white"
      >
        <span>Lihat Analisis Detail</span>
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
};
