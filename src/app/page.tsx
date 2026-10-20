'use client';

import React, { useEffect, useState } from 'react';
import {
  Download,
  Filter,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';
import { INITIAL_MACHINES } from '../lib/initialData';
import { Machine, MachineStatus } from '../types';
import { Navbar } from '../components/Navbar';
import { StatCards } from '../components/StatCards';
import { MachineCard } from '../components/MachineCard';
import { MachineDetailModal } from '../components/MachineDetailModal';
import { AddMachineModal } from '../components/AddMachineModal';
import { AlertBanner } from '../components/AlertBanner';

export default function DashboardPage() {
  const [machines, setMachines] = useState<Machine[]>(INITIAL_MACHINES);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | MachineStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveActive, setIsLiveActive] = useState(true);

  // Simulated Live Data Stream (Meniru WebSocket dari Server Python / Mosquitto MQTT)
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      setMachines((prevMachines) =>
        prevMachines.map((m) => {
          // Hanya beri sedikit fluktuasi alami pada angka sensor
          const deltaVib = (Math.random() - 0.48) * 0.05;
          const deltaTemp = (Math.random() - 0.48) * 0.03;

          const newVib = Math.max(0.2, Number((m.vibrationRms + deltaVib).toFixed(2)));
          const newTemp = Math.max(25, Number((m.temperature + deltaTemp).toFixed(1)));

          return {
            ...m,
            vibrationRms: newVib,
            temperature: newTemp,
            lastUpdated: 'Live',
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  // Keep selectedMachine updated if it is open
  useEffect(() => {
    if (selectedMachine) {
      const updated = machines.find((m) => m.id === selectedMachine.id);
      if (updated) setSelectedMachine(updated);
    }
  }, [machines]);

  const handleAddMachine = (newMachine: Machine) => {
    setMachines((prev) => [newMachine, ...prev]);
  };

  const handleDispatchTech = (machineId: string) => {
    setMachines((prev) =>
      prev.map((m) =>
        m.id === machineId
          ? {
              ...m,
              recommendation: `[TEKNISI TELAH DITUGASKAN] Tim maintenance sedang menuju lokasi ${m.location}. Menunggu laporan fisik.`,
            }
          : m
      )
    );
  };

  // Export Data Laporan CSV (Fitur penting lomba!)
  const handleExportCSV = () => {
    const headers = [
      'ID Mesin',
      'Nama Mesin',
      'Lokasi',
      'Bearing',
      'Status',
      'Suhu (°C)',
      'Getaran RMS (mm/s)',
      'RPM',
      'Diagnosa LSTM',
      'Confidence (%)',
      'Rekomendasi',
    ];

    const rows = machines.map((m) => [
      m.id,
      `"${m.name}"`,
      `"${m.location}"`,
      m.bearingModel,
      m.status,
      m.temperature,
      m.vibrationRms,
      m.rpm,
      `"${m.faultPrediction}"`,
      m.confidence,
      `"${m.recommendation}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Laporan_Health_Bearing_ZENTRA_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const criticalMachines = machines.filter((m) => m.status === 'CRITICAL');

  const filteredMachines = machines.filter((m) => {
    const matchesFilter = filterStatus === 'ALL' || m.status === filterStatus;
    const matchesSearch =
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.bearingModel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col pb-16">
      {/* Top Navbar */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        criticalCount={criticalMachines.length}
      />

      <main className="mx-auto w-full max-w-7xl px-4 md:px-8 mt-6 flex flex-col gap-6">
        {/* Banner Alarm Kritis (Jika Ada Mesin Rusak) */}
        <AlertBanner
          criticalMachines={criticalMachines}
          onSelectMachine={(m) => setSelectedMachine(m)}
        />

        {/* Ringkasan Status Pabrik (KPI Cards) */}
        <StatCards machines={machines} />

        {/* Toolbar: Filter, Search & Export */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-[#1E293B]/50 p-3 md:p-4">
          {/* Tabs Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilterStatus('ALL')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                filterStatus === 'ALL'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Semua ({machines.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('NORMAL')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                filterStatus === 'NORMAL'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Optimal ({machines.filter((m) => m.status === 'NORMAL').length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('WARNING')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                filterStatus === 'WARNING'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Warning ({machines.filter((m) => m.status === 'WARNING').length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('CRITICAL')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                filterStatus === 'CRITICAL'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Kritis ({machines.filter((m) => m.status === 'CRITICAL').length})
            </button>
          </div>

          {/* Search & Export Buttons */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Cari ID / nama mesin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition"
              title="Unduh Laporan Format CSV"
            >
              <Download className="h-3.5 w-3.5 text-blue-400" />
              <span className="hidden sm:inline">Ekspor CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                isLiveActive
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}
              title="Pause/Play Live Telemetry Stream"
            >
              <RefreshCw className={`h-3 w-3 ${isLiveActive ? 'animate-spin' : ''}`} />
              <span>{isLiveActive ? 'Live' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Fleet Grid Mesin */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {filteredMachines.map((machine) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              onSelect={(m) => setSelectedMachine(m)}
            />
          ))}
        </div>

        {filteredMachines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
            <Filter className="h-10 w-10 stroke-1 text-slate-600 mb-2" />
            <p className="text-sm font-semibold">Tidak ada mesin yang cocok dengan filter</p>
          </div>
        )}
      </main>

      {/* Modal Detail Analisis Mesin */}
      <MachineDetailModal
        machine={selectedMachine}
        onClose={() => setSelectedMachine(null)}
        onDispatchTech={handleDispatchTech}
      />

      {/* Modal + Tambah Mesin */}
      <AddMachineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMachine={handleAddMachine}
      />
    </div>
  );
}
