"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../lib/supabase";
import JadwalFilterBar from "./components/JadwalFilterBar";
import JadwalTable, { JadwalLes } from "./components/JadwalTable";
import TambahJadwalModal from "./components/TambahJadwalModal";
import AdminTugasTab from "./components/AdminTugasTab";
import {
  InstruksiTugas,
  PengumpulanTugas,
  fetchInstruksiTugas,
  upsertInstruksiTugas,
  deleteInstruksiTugas,
  fetchPengumpulanTugas,
  updatePengumpulanTugas,
  deletePengumpulanTugas,
  bersihkanSubmissionSudahDinilai,
} from "@/lib/tugasStorage";

export default function JadwalAdminPage() {
  const [activeTab, setActiveTab] = useState<"jadwal" | "tugas">("jadwal");
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState<JadwalLes | null>(null);
  const [jadwalList, setJadwalList] = useState<JadwalLes[]>([]);
  const [isLoadingJadwal, setIsLoadingJadwal] = useState(true);

  const [instruksiList, setInstruksiList] = useState<InstruksiTugas[]>([]);
  const [submissions, setSubmissions] = useState<PengumpulanTugas[]>([]);

  const fetchAllData = useCallback(async () => {
    setIsLoadingJadwal(true);
    const [{ data: jadwalData }, instruksiData, submissionData] = await Promise.all([
      supabase.from("jadwal_kelas").select("*").order("created_at", { ascending: true }),
      fetchInstruksiTugas(),
      fetchPengumpulanTugas(),
    ]);

    if (jadwalData) {
      setJadwalList(
        jadwalData.map((row) => ({
          id: row.id,
          namaKelas: row.nama_kelas,
          targetPeserta: row.target_peserta,
          hari: row.hari,
          jam: row.jam,
          mapel: row.mapel,
          status: row.status as JadwalLes["status"],
        }))
      );
    }
    setInstruksiList(instruksiData);
    setSubmissions(submissionData);
    setIsLoadingJadwal(false);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const belumDikoreksi = submissions.filter((s) => s.status === "Menunggu Koreksi").length;

  const handleSaveJadwal = async (jadwalData: Omit<JadwalLes, "id">, id?: string) => {
    const payload = {
      nama_kelas: jadwalData.namaKelas,
      target_peserta: jadwalData.targetPeserta,
      hari: jadwalData.hari,
      jam: jadwalData.jam,
      mapel: jadwalData.mapel,
      status: jadwalData.status,
    };

    if (id) {
      const { error } = await supabase.from("jadwal_kelas").update(payload).eq("id", id);
      if (error) return alert(`Gagal memperbarui jadwal: ${error.message}`);
      setJadwalList((prev) => prev.map((item) => (item.id === id ? { ...jadwalData, id } : item)));
    } else {
      const { data, error } = await supabase.from("jadwal_kelas").insert(payload).select().single();
      if (error || !data) return alert(`Gagal menambah jadwal: ${error?.message}`);
      setJadwalList((prev) => [...prev, { ...jadwalData, id: data.id }]);
    }
  };

  const handleToggleStatusJadwal = async (updated: JadwalLes) => {
    const { error } = await supabase.from("jadwal_kelas").update({ status: updated.status }).eq("id", updated.id);
    if (error) return alert(`Gagal mengubah status sesi: ${error.message}`);
    setJadwalList((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleDeleteJadwal = async (id: string) => {
    const { error } = await supabase.from("jadwal_kelas").delete().eq("id", id);
    if (error) return alert(`Gagal menghapus jadwal: ${error.message}`);
    setJadwalList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSimpanInstruksi = async (data: Omit<InstruksiTugas, "id" | "dibuatPada">, editId?: string) => {
    const saved = await upsertInstruksiTugas(data, editId);
    if (!saved) return alert("Gagal menyimpan instruksi tugas ke database.");
    setInstruksiList((prev) => (editId ? prev.map((t) => (t.id === editId ? saved : t)) : [saved, ...prev]));
  };

  const handleSimpanKoreksi = async (id: string, status: "Sudah Dinilai" | "Perlu Revisi", nilai: string, catatanCikgu: string) => {
    const ok = await updatePengumpulanTugas(id, { status, nilai: nilai || null, catatan_cikgu: catatanCikgu || null });
    if (!ok) return alert("Gagal menyimpan penilaian tugas.");
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status, nilai, catatanCikgu } : s)));
  };

  const filteredJadwal = jadwalList.filter(
    (item) => (item.namaKelas.toLowerCase().includes(search.toLowerCase()) || item.mapel.toLowerCase().includes(search.toLowerCase())) && (dayFilter === "Semua" || item.hari === dayFilter)
  );

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Jadwal Kelas & Manajemen Tugas</h1>
        <p className="text-sm text-slate-500 mt-1">Atur sesi kelas gabungan mingguan atau kelola soal dan koreksi tugas siswa.</p>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        <button onClick={() => setActiveTab("jadwal")} className={`px-4 py-2.5 text-sm font-bold border-b-2 cursor-pointer ${activeTab === "jadwal" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500"}`}>
          📅 Jadwal Kelas Mingguan
        </button>
        <button onClick={() => setActiveTab("tugas")} className={`px-4 py-2.5 text-sm font-bold border-b-2 cursor-pointer flex items-center gap-1.5 ${activeTab === "tugas" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500"}`}>
          <span>📝 Tugas & Antrian Koreksi</span>
          {belumDikoreksi > 0 && <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{belumDikoreksi}</span>}
        </button>
      </div>

      {activeTab === "jadwal" ? (
        <>
          <JadwalFilterBar search={search} setSearch={setSearch} dayFilter={dayFilter} setDayFilter={setDayFilter} onOpenModal={() => { setEditingJadwal(null); setIsModalOpen(true); }} />
          {isLoadingJadwal ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">Memuat jadwal kelas dari database...</div>
          ) : (
            <JadwalTable jadwalList={filteredJadwal} onDelete={handleDeleteJadwal} onUpdate={handleToggleStatusJadwal} onEdit={(item) => { setEditingJadwal(item); setIsModalOpen(true); }} />
          )}
          <TambahJadwalModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingJadwal(null); }} onSaveJadwal={handleSaveJadwal} initialData={editingJadwal} />
        </>
      ) : (
        <AdminTugasTab
          instruksiList={instruksiList}
          submissions={submissions}
          onSimpanInstruksi={handleSimpanInstruksi}
          onHapusInstruksi={async (id) => {
            if (await deleteInstruksiTugas(id)) setInstruksiList((p) => p.filter((i) => i.id !== id));
          }}
          onSimpanKoreksi={handleSimpanKoreksi}
          onHapusSubmission={async (id) => {
            if (await deletePengumpulanTugas(id)) setSubmissions((p) => p.filter((s) => s.id !== id));
          }}
          onBersihkanSudahDinilai={async () => {
            if (await bersihkanSubmissionSudahDinilai()) setSubmissions((p) => p.filter((s) => s.status !== "Sudah Dinilai"));
          }}
        />
      )}
    </div>
  );
}