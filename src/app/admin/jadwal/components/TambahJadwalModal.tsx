"use client";

import { useState, useEffect } from "react";
import { JadwalLes } from "./JadwalTable";

export default function TambahJadwalModal({
  isOpen,
  onClose,
  onSaveJadwal,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaveJadwal: (jadwalData: Omit<JadwalLes, "id">, id?: string) => void;
  initialData?: JadwalLes | null;
}) {
  const [namaKelas, setNamaKelas] = useState("Kelas SD Gabungan");
  const [targetPeserta, setTargetPeserta] = useState("Siswa Kelas 1-6 SD");
  const [hari, setHari] = useState("Senin");
  const [jamMulai, setJamMulai] = useState("19:00");
  const [jamSelesai, setJamSelesai] = useState("21:00");
  const [mapel, setMapel] = useState("");
  const [status, setStatus] = useState<"Aktif" | "Selesai" | "Libur">("Aktif");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setNamaKelas(initialData.namaKelas);
        setTargetPeserta(initialData.targetPeserta);
        setHari(initialData.hari);
        setMapel(initialData.mapel);
        setStatus(initialData.status);

        // Parsing jam format "19:00 - 21:00 WIB" ke time picker
        const match = initialData.jam.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);
        if (match) {
          setJamMulai(match[1]);
          setJamSelesai(match[2]);
        } else {
          setJamMulai("19:00");
          setJamSelesai("21:00");
        }
      } else {
        setNamaKelas("Kelas SD Gabungan");
        setTargetPeserta("Siswa Kelas 1-6 SD");
        setHari("Senin");
        setJamMulai("19:00");
        setJamSelesai("21:00");
        setMapel("");
        setStatus("Aktif");
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKelas.trim() || !mapel.trim()) return;

    onSaveJadwal(
      {
        namaKelas: namaKelas.trim(),
        targetPeserta: targetPeserta.trim(),
        hari,
        jam: `${jamMulai} - ${jamSelesai} WIB`,
        mapel: mapel.trim(),
        status,
      },
      initialData?.id
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900">
              {initialData ? "Edit Sesi Kelas" : "Tambah Sesi Kelas Baru"}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {initialData
                ? "Perbarui informasi hari, jam, atau mata pelajaran kelas"
                : "Atur jadwal sesi kelas mingguan baru untuk siswa"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
          >
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

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hari Les</label>
              <select
                value={hari}
                onChange={(e) => setHari(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              <label className="block font-bold text-slate-700 mb-1">Jam Mulai</label>
              <input
                type="time"
                required
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs font-mono bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Jam Selesai</label>
              <input
                type="time"
                required
                value={jamSelesai}
                onChange={(e) => setJamSelesai(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs font-mono bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
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

          {initialData && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Status Sesi</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Aktif" | "Selesai" | "Libur")}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Aktif">Aktif</option>
                <option value="Libur">Libur</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
          )}

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
            >
              {initialData ? "Simpan Perubahan ✓" : "Simpan Jadwal ✓"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}