"use client";

import { useState, useEffect } from "react";
import { PendingTicket } from "./TicketQueue";

export default function TambahMateriModal({
  isOpen,
  onClose,
  onSaveTicket,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaveTicket: (
    ticketData: Omit<PendingTicket, "id">,
    openUploadDirect: boolean,
    editId?: number
  ) => void;
  initialData?: PendingTicket | null;
}) {
  const [namaKelas, setNamaKelas] = useState("Kelas SD Gabungan");
  const [mapel, setMapel] = useState("");
  const [hari, setHari] = useState("Rabu");
  const [jamMulai, setJamMulai] = useState("19:00");
  const [jamSelesai, setJamSelesai] = useState("21:00");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setNamaKelas(initialData.namaKelas);
        setMapel(initialData.mapel);

        // Parsing format "Senin, 19:00 - 21:00 WIB"
        const parts = initialData.jadwal.split(",");
        if (parts.length > 0 && parts[0].trim()) {
          setHari(parts[0].trim());
        }
        const match = initialData.jadwal.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);
        if (match) {
          setJamMulai(match[1]);
          setJamSelesai(match[2]);
        } else {
          setJamMulai("19:00");
          setJamSelesai("21:00");
        }
      } else {
        setNamaKelas("Kelas SD Gabungan");
        setMapel("");
        setHari("Rabu");
        setJamMulai("19:00");
        setJamSelesai("21:00");
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleAction = (openUploadDirect: boolean) => {
    if (!namaKelas.trim() || !mapel.trim()) return;

    const formattedJadwal = `${hari}, ${jamMulai} - ${jamSelesai} WIB`;

    onSaveTicket(
      {
        namaKelas: namaKelas.trim(),
        mapel: mapel.trim(),
        jadwal: formattedJadwal,
        status: initialData ? initialData.status : "Menunggu",
      },
      openUploadDirect,
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
              {initialData ? "Edit Jadwal / Info Materi" : "Tambah Jadwal / Antrian Materi"}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {initialData
                ? "Perbarui kelas, mata pelajaran, atau waktu sesi materi"
                : "Buat slot materi baru untuk kelas reguler maupun tambahan"}
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

        <form
          onSubmit={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          className="space-y-3.5 text-xs"
        >
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
            <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran / Topik</label>
            <input
              type="text"
              required
              value={mapel}
              onChange={(e) => setMapel(e.target.value)}
              placeholder="Contoh: Bahasa Indonesia - Membaca Cerita"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hari Sesi</label>
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
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs font-mono bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Jam Selesai</label>
              <input
                type="time"
                value={jamSelesai}
                onChange={(e) => setJamSelesai(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs font-mono bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="pt-3 flex flex-col-reverse sm:flex-row items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Batal
            </button>
            {initialData ? (
              <button
                type="button"
                onClick={() => handleAction(false)}
                disabled={!namaKelas.trim() || !mapel.trim()}
                className="w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Simpan Perubahan ✓
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleAction(false)}
                  disabled={!namaKelas.trim() || !mapel.trim()}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  + Masukkan Antrian
                </button>
                <button
                  type="button"
                  onClick={() => handleAction(true)}
                  disabled={!namaKelas.trim() || !mapel.trim()}
                  className="w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Lanjut Upload File →
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}