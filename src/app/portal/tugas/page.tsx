"use client";
import { useState, useEffect } from "react";
import FormUploadTugas from "./components/FormUploadTugas";
import RiwayatTugasList from "./components/RiwayatTugasList";
import { LampiranFile } from "@/lib/pesanStorage";
import { getInstruksiTugas, getPengumpulanTugas, InstruksiTugas, PengumpulanTugas, savePengumpulanTugas } from "@/lib/tugasStorage";

const CURRENT_SISWA = "Siti Rahma";
const CURRENT_KELAS = "Kelas 1 SD";

export default function PortalTugasPage() {
  const [instruksiList, setInstruksiList] = useState<InstruksiTugas[]>([]);
  const [allMySubmissions, setAllMySubmissions] = useState<PengumpulanTugas[]>([]);

  useEffect(() => {
    const sync = () => {
      setInstruksiList(getInstruksiTugas());
      setAllMySubmissions(getPengumpulanTugas().filter((s) => s.siswa === CURRENT_SISWA));
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // Dropdown tetap mengunci semua tugas yang sudah pernah disetor (meski sudah di-hide dari kartu riwayat)
  const submittedTugasIds = allMySubmissions.map((s) => s.tugasId || "").filter(Boolean);
  const visibleSubmissions = allMySubmissions.filter((s) => !s.hiddenForSiswa);

  const handleKumpulTugas = (tugas: InstruksiTugas, jawabanTeks: string, linkJawaban: string, fileLampiran?: LampiranFile | null) => {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const baru: PengumpulanTugas = {
      id: `SUB-${Math.floor(100 + Math.random() * 899)}`,
      tugasId: tugas.id,
      judulTugas: tugas.judul,
      siswa: CURRENT_SISWA,
      kelas: CURRENT_KELAS,
      mapel: tugas.mapel,
      waktuKumpul: now,
      jawabanTeks,
      linkJawaban,
      fileLampiran,
      status: "Menunggu Koreksi",
    };
    const all = [baru, ...getPengumpulanTugas()];
    savePengumpulanTugas(all);
    setAllMySubmissions(all.filter((s) => s.siswa === CURRENT_SISWA));
  };

  const handleUpdateJawaban = (id: string, jawabanTeks: string, linkJawaban: string, fileLampiran?: LampiranFile | null) => {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const all = getPengumpulanTugas().map((s) =>
      s.id === id ? { ...s, jawabanTeks, linkJawaban, fileLampiran, waktuKumpul: `${now} (Diperbarui)`, status: "Menunggu Koreksi" as const } : s
    );
    savePengumpulanTugas(all);
    setAllMySubmissions(all.filter((s) => s.siswa === CURRENT_SISWA));
  };

  const handleHapusRiwayatSiswa = (id: string) => {
    const all = getPengumpulanTugas().map((s) => (s.id === id ? { ...s, hiddenForSiswa: true } : s));
    savePengumpulanTugas(all);
    setAllMySubmissions(all.filter((s) => s.siswa === CURRENT_SISWA));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tugas & Lembar Kerja</h1>
        <p className="text-sm text-slate-500 mt-1">Lihat soal dari Cikgu, ketik jawaban, lampirkan file atau link GDrive, dan pantau penilaiannya.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <FormUploadTugas instruksiList={instruksiList} submittedTugasIds={submittedTugasIds} onKumpulTugas={handleKumpulTugas} />
        </div>
        <div className="lg:col-span-7">
          <RiwayatTugasList submissions={visibleSubmissions} onUpdateJawaban={handleUpdateJawaban} onHapusRiwayatSiswa={handleHapusRiwayatSiswa} />
        </div>
      </div>
    </div>
  );
}