"use client";
import { useState, useEffect } from "react";
import JadwalFilterBar from "./components/JadwalFilterBar";
import JadwalTable, { JadwalLes } from "./components/JadwalTable";
import TambahJadwalModal from "./components/TambahJadwalModal";
import AdminTugasTab from "./components/AdminTugasTab";
import { getInstruksiTugas, getPengumpulanTugas, InstruksiTugas, PengumpulanTugas, saveInstruksiTugas, savePengumpulanTugas } from "@/lib/tugasStorage";

export default function JadwalAdminPage() {
  const [activeTab, setActiveTab] = useState<"jadwal" | "tugas">("jadwal");
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState<JadwalLes | null>(null);

  const [jadwalList, setJadwalList] = useState<JadwalLes[]>([
    { id: 1, namaKelas: "Kelas SD Gabungan", targetPeserta: "Siswa Kelas 1-6 SD", hari: "Senin", jam: "19:00 - 21:00 WIB", mapel: "Matematika Dasar & Calistung", status: "Aktif" },
    { id: 2, namaKelas: "Kelas SD Gabungan", targetPeserta: "Siswa Kelas 1-6 SD", hari: "Rabu", jam: "19:00 - 21:00 WIB", mapel: "Bahasa Inggris Dasar", status: "Aktif" },
    { id: 3, namaKelas: "Kelas SD Gabungan", targetPeserta: "Siswa Kelas 1-6 SD", hari: "Kamis", jam: "19:00 - 21:00 WIB", mapel: "Ilmu Pengetahuan Alam (IPA)", status: "Aktif" },
  ]);

  const [instruksiList, setInstruksiList] = useState<InstruksiTugas[]>([]);
  const [submissions, setSubmissions] = useState<PengumpulanTugas[]>([]);

  useEffect(() => {
    const sync = () => {
      setInstruksiList(getInstruksiTugas());
      setSubmissions(getPengumpulanTugas());
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const belumDikoreksi = submissions.filter((s) => s.status === "Menunggu Koreksi").length;

  const handleSaveJadwal = (jadwalData: Omit<JadwalLes, "id">, id?: number) => {
    if (id) setJadwalList((prev) => prev.map((item) => (item.id === id ? { ...jadwalData, id } : item)));
    else setJadwalList((prev) => [{ ...jadwalData, id: Date.now() }, ...prev]);
  };

  const handleSimpanInstruksi = (data: Omit<InstruksiTugas, "id" | "dibuatPada">, editId?: string) => {
    const next = editId
      ? instruksiList.map((t) => (t.id === editId ? { ...t, ...data } : t))
      : [{ ...data, id: `TGS-${Math.floor(10 + Math.random() * 89)}`, dibuatPada: new Date().toISOString().split("T")[0] }, ...instruksiList];
    setInstruksiList(next);
    saveInstruksiTugas(next);
  };

  const handleSimpanKoreksi = (id: string, status: "Sudah Dinilai" | "Perlu Revisi", nilai: string, catatanCikgu: string) => {
    const next = submissions.map((s) => (s.id === id ? { ...s, status, nilai, catatanCikgu } : s));
    setSubmissions(next);
    savePengumpulanTugas(next);
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
          <JadwalTable jadwalList={filteredJadwal} onDelete={(id) => setJadwalList((p) => p.filter((i) => i.id !== id))} onUpdate={(u) => setJadwalList((p) => p.map((i) => (i.id === u.id ? u : i)))} onEdit={(item) => { setEditingJadwal(item); setIsModalOpen(true); }} />
          <TambahJadwalModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingJadwal(null); }} onSaveJadwal={handleSaveJadwal} initialData={editingJadwal} />
        </>
      ) : (
        <AdminTugasTab
          instruksiList={instruksiList}
          submissions={submissions}
          onSimpanInstruksi={handleSimpanInstruksi}
          onHapusInstruksi={(id) => { const n = instruksiList.filter((i) => i.id !== id); setInstruksiList(n); saveInstruksiTugas(n); }}
          onSimpanKoreksi={handleSimpanKoreksi}
          onHapusSubmission={(id) => { const n = submissions.filter((s) => s.id !== id); setSubmissions(n); savePengumpulanTugas(n); }}
          onBersihkanSudahDinilai={() => { const n = submissions.filter((s) => s.status !== "Sudah Dinilai"); setSubmissions(n); savePengumpulanTugas(n); }}
        />
      )}
    </div>
  );
}