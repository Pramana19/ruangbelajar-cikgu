"use client";

import { useState } from "react";
import { JadwalLes } from "./JadwalTable";

export default function TambahJadwalModal({
  isOpen,
  onClose,
  onAddJadwal,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddJadwal: (newJadwal: Omit<JadwalLes, "id">) => void;
}) {
  const [namaKelas, setNamaKelas] = useState("Kelas SD Gabungan");
  const [targetPeserta, setTargetPeserta] = useState("Siswa Kelas 1-6 SD");
  const [hari, setHari] = useState("Senin");
  const [jam, setJam] = useState("19:00 - 21:00 WIB");
  const [mapel, setMapel] = useState("Matematika Dasar");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKelas) return;

    onAddJadwal({
      namaKelas,
      targetPeserta,
      hari,
      jam,
      mapel,
      status: "Aktif",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900">Tambah Sesi Kelas Baru</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Kelas / Grup</label>
            <input
              type="text"
              required
              value={namaKelas}
              onChange={(e) => setNamaKelas(e.target.value)}
              placeholder="Contoh: Kelas SD Gabungan"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Peserta</label>
            <input
              type="text"
              required
              value={targetPeserta}
              onChange={(e) => setTargetPeserta(e.target.value)}
              placeholder="Contoh: Siswa Kelas 1-6 SD"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hari Les</label>
              <select
                value={hari}
                onChange={(e) => setHari(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
              >
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
                <option value="Minggu">Minggu</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Waktu / Jam Sesi</label>
              <input
                type="text"
                required
                value={jam}
                onChange={(e) => setJam(e.target.value)}
                placeholder="Contoh: 19:00 - 21:00 WIB"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran</label>
            <input
              type="text"
              required
              value={mapel}
              onChange={(e) => setMapel(e.target.value)}
              placeholder="Contoh: Matematika Dasar"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs transition-colors"
            >
              Simpan Jadwal ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}