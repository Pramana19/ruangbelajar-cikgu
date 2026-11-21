"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import FormUploadTugas from "./components/FormUploadTugas";
import RiwayatTugasList from "./components/RiwayatTugasList";
import { LampiranFile } from "@/lib/pesanStorage";
import {
  InstruksiTugas,
  PengumpulanTugas,
  fetchInstruksiTugas,
  fetchPengumpulanTugas,
  createPengumpulanTugas,
  updatePengumpulanTugas,
} from "@/lib/tugasStorage";

export default function PortalTugasPage() {
  const [profile, setProfile] = useState<{ id: string; nama: string; kelas: string; isLunas: boolean } | null>(null);
  const [instruksiList, setInstruksiList] = useState<InstruksiTugas[]>([]);
  const [allMySubmissions, setAllMySubmissions] = useState<PengumpulanTugas[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: prof }, instruksi, subs] = await Promise.all([
        supabase.from("profiles").select("id, nama_lengkap, kelas, status_pembayaran").eq("id", user.id).single(),
        fetchInstruksiTugas(),
        fetchPengumpulanTugas(user.id),
      ]);

      if (prof) {
        setProfile({
          id: prof.id,
          nama: prof.nama_lengkap || "Peserta",
          kelas: prof.kelas || "Kelas 1 SD",
          isLunas: prof.status_pembayaran === "Lunas",
        });
      }
      setInstruksiList(instruksi);
      setAllMySubmissions(subs);
    };

    loadData();
  }, []);

  const submittedTugasIds = allMySubmissions.map((s) => s.tugasId || "").filter(Boolean);
  const visibleSubmissions = allMySubmissions.filter((s) => !s.hiddenForSiswa);
  const isLocked = profile ? !profile.isLunas : false;

  const handleKumpulTugas = async (tugas: InstruksiTugas, jawabanTeks: string, linkJawaban: string, fileLampiran?: LampiranFile | null) => {
    if (!profile || isLocked) return;
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const created = await createPengumpulanTugas({
      tugasId: tugas.id,
      siswaId: profile.id,
      judulTugas: tugas.judul,
      siswa: profile.nama,
      kelas: profile.kelas,
      mapel: tugas.mapel,
      waktuKumpul: now,
      jawabanTeks,
      linkJawaban,
      fileLampiran,
    });
    if (!created) return alert("Gagal mengirim tugas. Coba lagi.");
    setAllMySubmissions((prev) => [created, ...prev]);
  };

  const handleUpdateJawaban = async (id: string, jawabanTeks: string, linkJawaban: string, fileLampiran?: LampiranFile | null) => {
    if (isLocked) return;
    const now = `${new Date().toISOString().slice(0, 16).replace("T", " ")} (Diperbarui)`;
    const ok = await updatePengumpulanTugas(id, {
      jawaban_teks: jawabanTeks || null,
      link_jawaban: linkJawaban || null,
      file_lampiran: fileLampiran || null,
      waktu_kumpul: now,
      status: "Menunggu Koreksi",
    });
    if (!ok) return alert("Gagal memperbarui jawaban.");
    setAllMySubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, jawabanTeks, linkJawaban, fileLampiran, waktuKumpul: now, status: "Menunggu Koreksi" } : s))
    );
  };

  const handleHapusRiwayatSiswa = async (id: string) => {
    const ok = await updatePengumpulanTugas(id, { hidden_for_siswa: true });
    if (ok) setAllMySubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, hiddenForSiswa: true } : s)));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tugas & Lembar Kerja</h1>
        <p className="text-sm text-slate-500 mt-1">Lihat soal dari Cikgu, ketik jawaban, lampirkan file atau link GDrive, dan pantau penilaiannya.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <FormUploadTugas instruksiList={instruksiList} submittedTugasIds={submittedTugasIds} onKumpulTugas={handleKumpulTugas} isLocked={isLocked} />
        </div>
        <div className="lg:col-span-7">
          <RiwayatTugasList submissions={visibleSubmissions} onUpdateJawaban={handleUpdateJawaban} onHapusRiwayatSiswa={handleHapusRiwayatSiswa} isLocked={isLocked} />
        </div>
      </div>
    </div>
  );
}