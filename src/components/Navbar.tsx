'use client';

import React from 'react';
import { Activity, Bell, Plus, ShieldCheck, Wifi } from 'lucide-react';

interface NavbarProps {
  onOpenAddModal: () => void;
  criticalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAddModal, criticalCount }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/20">
            <Activity className="h-6 w-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-white">ZENTRA</span>
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold tracking-wide text-blue-400 border border-blue-500/30">
                AI PREDICTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Sistem Deteksi Dini Kerusakan Bearing Mesin CNC
            </p>
          </div>
        </div>

        {/* Status Jaringan & Action Buttons */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* LAN & MQTT Connectivity Pill */}
          <div className="hidden lg:flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400">MQTT Live</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Wifi className="h-3.5 w-3.5" />
              <span>LAN: 192.168.1.100</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>LSTM Model Active</span>
            </div>
          </div>

          {/* Alarm Bell Button */}
          <div className="relative">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white"
              title="Notifikasi Alarm"
            >
              <Bell className="h-5 w-5" />
            </button>
            {criticalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white shadow-md shadow-red-500/50 animate-bounce">
                {criticalCount}
              </span>
            )}
          </div>

          {/* + Tambah Mesin Button */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs md:text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Mesin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
