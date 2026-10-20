'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Machine } from '../types';

interface AddMachineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMachine: (newMachine: Machine) => void;
}

export const AddMachineModal: React.FC<AddMachineModalProps> = ({
  isOpen,
  onClose,
  onAddMachine,
}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bearingModel, setBearingModel] = useState('SKF 6205');
  const [thresholdTemp, setThresholdTemp] = useState('65');
  const [thresholdVib, setThresholdVib] = useState('2.8');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name) return;

    const newMachine: Machine = {
      id: id.toUpperCase().trim(),
      name: name.trim(),
      location: location.trim() || 'Lini Produksi Baru',
      bearingModel: bearingModel.trim() || 'SKF 6205',
      status: 'NORMAL',
      temperature: 36.5,
      vibrationRms: 0.55,
      rpm: 2000,
      faultPrediction: 'Normal',
      confidence: 97.5,
      thresholdTemp: Number(thresholdTemp) || 65,
      thresholdVib: Number(thresholdVib) || 2.8,
      recommendation: 'Mesin baru terdaftar. Menunggu kalibrasi awal sinyal sensor.',
      lastUpdated: 'Baru ditambahkan',
      probabilities: {
        normal: 97.5,
        innerRace: 1.2,
        outerRace: 0.8,
        ballFault: 0.5,
      },
    };

    onAddMachine(newMachine);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-[#0F172A] p-6 md:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Tambah Node Mesin Baru</h2>
            <p className="text-xs text-slate-400">Hubungkan modul sensor ESP32-S3 ke armada pemantauan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ID Perangkat / Mesin *
              </label>
              <input
                type="text"
                placeholder="Contoh: CNC-05"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tipe Bearing *
              </label>
              <input
                type="text"
                placeholder="Contoh: SKF 6205"
                required
                value={bearingModel}
                onChange={(e) => setBearingModel(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Nama Mesin *
            </label>
            <input
              type="text"
              placeholder="Contoh: CNC Drilling Center Gamma"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Lokasi Workshop
            </label>
            <input
              type="text"
              placeholder="Contoh: Lini 4 - Sektor Pemotongan Presisi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Batas Bahaya Suhu (°C)
              </label>
              <input
                type="number"
                value={thresholdTemp}
                onChange={(e) => setThresholdTemp(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Batas Getaran (mm/s RMS)
              </label>
              <input
                type="number"
                step="0.1"
                value={thresholdVib}
                onChange={(e) => setThresholdVib(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
            >
              Daftarkan Mesin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
