'use client';

import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  CheckCircle2,
  Send,
  Thermometer,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Machine, TelemetryPoint } from '../types';

interface MachineDetailModalProps {
  machine: Machine | null;
  onClose: () => void;
  onDispatchTech: (machineId: string) => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({
  machine,
  onClose,
  onDispatchTech,
}) => {
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>([]);
  const [dispatched, setDispatched] = useState(false);

  // Generate live moving vibration wave simulation
  useEffect(() => {
    if (!machine) return;

    // Inisialisasi 15 titik data awal
    const initialPoints: TelemetryPoint[] = [];
    const now = Date.now();
    for (let i = 14; i >= 0; i--) {
      const timeStr = new Date(now - i * 1000).toLocaleTimeString();
      const baseVib = machine.vibrationRms;
      initialPoints.push({
        time: timeStr,
        vibX: Number((baseVib + (Math.random() - 0.5) * 0.4).toFixed(2)),
        vibY: Number((baseVib * 0.9 + (Math.random() - 0.5) * 0.3).toFixed(2)),
        vibZ: Number((baseVib * 1.1 + (Math.random() - 0.5) * 0.5).toFixed(2)),
        temperature: Number((machine.temperature + (Math.random() - 0.5) * 0.2).toFixed(1)),
        rpm: machine.rpm + Math.floor((Math.random() - 0.5) * 20),
      });
    }
    setTelemetry(initialPoints);

    // Update interval tiap 1.2 detik (meniru WebSocket stream)
    const interval = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString();
      const baseVib = machine.vibrationRms;
      setTelemetry((prev) => {
        const next = [
          ...prev.slice(1),
          {
            time: timeStr,
            vibX: Number((baseVib + (Math.random() - 0.5) * 0.4).toFixed(2)),
            vibY: Number((baseVib * 0.9 + (Math.random() - 0.5) * 0.3).toFixed(2)),
            vibZ: Number((baseVib * 1.1 + (Math.random() - 0.5) * 0.5).toFixed(2)),
            temperature: Number((machine.temperature + (Math.random() - 0.5) * 0.2).toFixed(1)),
            rpm: machine.rpm + Math.floor((Math.random() - 0.5) * 20),
          },
        ];
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [machine]);

  if (!machine) return null;

  const isCritical = machine.status === 'CRITICAL';
  const isWarning = machine.status === 'WARNING';

  const handleDispatch = () => {
    setDispatched(true);
    onDispatchTech(machine.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-slate-700 bg-[#0F172A] p-5 md:p-8 shadow-2xl my-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-blue-500/20 px-2.5 py-1 text-sm font-black text-blue-400 border border-blue-500/30">
            {machine.id}
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white">{machine.name}</h2>
          <span
            className={`rounded-full px-3 py-0.5 text-xs font-black uppercase tracking-wider ${
              isCritical
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                : isWarning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}
          >
            {machine.status}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Lokasi: {machine.location} • Bearing Target: <strong className="text-slate-300">{machine.bearingModel}</strong>
        </p>

        {/* Live Vibration Chart (Recharts) */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-[#1E293B]/60 p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white">
                Live Waveform Getaran (Sumbu X, Y, Z)
              </h3>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span> X-Axis
              </span>
              <span className="flex items-center gap-1 text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-400"></span> Y-Axis
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="h-2 w-2 rounded-full bg-purple-400"></span> Z-Axis
              </span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetry}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Line type="monotone" dataKey="vibX" stroke="#22D3EE" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="vibY" stroke="#60A5FA" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="vibZ" stroke="#C084FC" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI LSTM Probabilities Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Box 1: Diagnosa & Probabilitas LSTM */}
          <div className="rounded-2xl border border-slate-800 bg-[#1E293B]/60 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-amber-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Analisis Probabilitas LSTM (SUBF-v1.0)
              </h4>
            </div>

            <div className="space-y-2.5">
              {/* Normal */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-400">Normal (Healthy)</span>
                  <span className="text-emerald-400">{machine.probabilities.normal}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${machine.probabilities.normal}%` }} />
                </div>
              </div>

              {/* Inner Race Fault */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-400">Inner Race Fault (Cincin Dalam)</span>
                  <span className="text-amber-400">{machine.probabilities.innerRace}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${machine.probabilities.innerRace}%` }} />
                </div>
              </div>

              {/* Outer Race Fault */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-400">Outer Race Fault (Cincin Luar)</span>
                  <span className="text-red-400">{machine.probabilities.outerRace}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${machine.probabilities.outerRace}%` }} />
                </div>
              </div>

              {/* Ball Fault */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-400">Ball Fault (Gotri Bearing)</span>
                  <span className="text-purple-400">{machine.probabilities.ballFault}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${machine.probabilities.ballFault}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Rekomendasi Maintenance & Tombol Teknisi */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#1E293B]/60 p-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-4 w-4 text-blue-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Rekomendasi Tindakan ZENTRA
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {machine.recommendation}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleDispatch}
                disabled={dispatched}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition shadow-lg ${
                  dispatched
                    ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/50 cursor-not-allowed'
                    : isCritical
                    ? 'bg-red-600 text-white hover:bg-red-500 shadow-red-600/30 animate-pulse'
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/30'
                }`}
              >
                {dispatched ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Teknisi Berhasil Dikirim ke {machine.id}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Kirim Peringatan & Tugaskan Teknisi Turun</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
