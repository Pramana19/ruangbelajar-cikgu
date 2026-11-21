"use client";

import { useState, useEffect } from "react";
import { PendingTicket } from "./TicketQueue";

export interface JadwalAktifOption {
  id: string;
  namaKelas: string;
  mapel: string;
  hari: string;
  jam: string;
}

export default function TambahMateriModal({
  isOpen,
  onClose,
  onSaveTicket,
  initialData,
  activeJadwalList = [],
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaveTicket: (
    ticketData: Omit<PendingTicket, "id">,
    openUploadDirect: boolean,
    editId?: string
  ) => void;
  initialData?: PendingTicket | null;
  activeJadwalList?: JadwalAktifOption[];
}) {
  const [selectedJadwalId, setSelectedJadwalId] = useState("");
  const [namaKelas, setNamaKelas] = useState("");
  const [mapel, setMapel] = useState("");
  const [materiTopik, setMateriTopik] = useState("");
  const [hari, setHari] = useState("");
  const [jamMulai, setJamMulai] = useState("00:00");
  const [jamSelesai, setJamSelesai] = useState("00:00");

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setSelectedJadwalId("manual");
      setNamaKelas(initialData.namaKelas);
      setMapel(initialData.mapel);
      setMateriTopik(initialData.judul || "");

      const parts = initialData.jadwal.split(",");
      setHari(parts[0]?.trim() || "");
      const match = initialData.jadwal.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);
      setJamMulai(match ? match[1] : "00:00");
      setJamSelesai(match ? match[2] : "00:00");
    } else {
      setSelectedJadwalId(activeJadwalList.length > 0 ? "" : "manual");
      setNamaKelas("");
      setMapel("");
      setMateriTopik("");
      setHari("");
      setJamMulai("00:00");
      setJamSelesai("00:00");
    }
  }, [isOpen, initialData, activeJadwalList.length]);

  if (!isOpen) return null;

  const isManualMode =
    Boolean(initialData) || selectedJadwalId === "manual" || activeJadwalList.length === 0;

  const handleSelectPreset = (id: string) => {
    setSelectedJadwalId(id);
    const found = activeJadwalList.find((j) => j.id === id);
    if (found) {
      setNamaKelas(found.namaKelas);
      setMapel(found.mapel);
    } else {
      setNamaKelas("");
      setMapel("");
    }
  };

  const handleOpenTimePicker = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      e.currentTarget.showPicker();
    } catch {
      // Fallback untuk browser yang tidak mendukung showPicker()
    }
  };

  const isFormValid = Boolean(namaKelas.trim() && mapel.trim() && hari);

  const handleAction = (openUploadDirect: boolean) => {
    if (!isFormValid) return;

    onSaveTicket(
      {
        namaKelas: namaKelas.trim(),
        mapel: mapel.trim(),
        jadwal: `${hari}, ${jamMulai} - ${jamSelesai} WIB`,
        status: initialData ? initialData.status : "Menunggu",
        judul: materiTopik.trim() || undefined,
        tipe: initialData?.tipe,
        url: initialData?.url,
        ukuran: initialData?.ukuran,
        tanggal: initialData?.tanggal,
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
                ? "Perbarui topik materi, hari, atau jam sesi belajar"
                : "Pilih kelas aktif, isi topik materi, lalu tentukan hari dan jam sesi"}
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
          {!initialData && activeJadwalList.length > 0 && (
            <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200/80">
              <label className="block font-bold text-teal-900 mb-1">
                Pilih dari Jadwal Kelas Aktif
              </label>
              <select
                value={selectedJadwalId}
                onChange={(e) => handleSelectPreset(e.target.value)}
                className="w-full px-3 py-2 border border-teal-200 rounded-lg text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">-- Pilih Kelas Aktif --</option>
                {activeJadwalList.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.namaKelas} • {j.mapel}
                  </option>
                ))}
                <option value="manual">✏️ Sesi Tambahan (Input Manual)...</option>
              </select>
            </div>
          )}

          {isManualMode && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Kelas</label>
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
                <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran</label>
                <input
                  type="text"
                  required
                  value={mapel}
                  onChange={(e) => setMapel(e.target.value)}
                  placeholder="Contoh: Bahasa Inggris Dasar"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Materi</label>
            <input
              type="text"
              value={materiTopik}
              onChange={(e) => setMateriTopik(e.target.value)}
              placeholder="Contoh: Bab 1 - Vocabulary & Greetings"
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
                <option value="">Pilih hari</option>
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Jam Mulai</label>
              <input
                type="time"
                value={jamMulai}
                onClick={handleOpenTimePicker}
                onChange={(e) => setJamMulai(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs font-mono bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Jam Selesai</label>
              <input
                type="time"
                value={jamSelesai}
                onClick={handleOpenTimePicker}
                onChange={(e) => setJamSelesai(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs font-mono bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
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
                disabled={!isFormValid}
                className="w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Simpan Perubahan ✓
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleAction(false)}
                  disabled={!isFormValid}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  + Masukkan Antrian
                </button>
                <button
                  type="button"
                  onClick={() => handleAction(true)}
                  disabled={!isFormValid}
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