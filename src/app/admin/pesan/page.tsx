"use client";
import { useState } from "react";
import ListPesan from "./components/ListPesan";
import BalasPesanModal from "./components/BalasPesanModal";

export default function AdminPesanPage() {
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [hariCleanup, setHariCleanup] = useState("30"); // Default 30 hari

  // Data Dummy Tiket Pesan Masuk
  const [tickets, setTickets] = useState([
    { id: "TKT-1003", tanggal: "2026-11-03", siswa: "Rian Hidayat", kelas: "Kelas 3 SD", pesan: "Cikgu, mau tanya jadwal minggu depan apakah diliburkan?", status: "Menunggu", balasan: "" },
    { id: "TKT-1002", tanggal: "2026-11-02", siswa: "Siti Rahma", kelas: "Kelas 1 SD", pesan: "Cikgu, saya tidak bisa akses materi matematika.", status: "Diproses", balasan: "" },
    { id: "TKT-1001", tanggal: "2026-10-28", siswa: "Siti Rahma", kelas: "Kelas 1 SD", pesan: "Saya lupa bawa buku cetak untuk pertemuan kemarin.", status: "Selesai", balasan: "Tidak masalah, silakan unduh materi digitalnya di menu Ruang Materi ya." }
  ]);

  const filteredTickets = filterStatus === "Semua" ? tickets : tickets.filter(t => t.status === filterStatus);

  const submitBalasan = (id: string, balasanText: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: "Selesai", balasan: balasanText } : t));
    setSelectedTicket(null);
    alert("Balasan berhasil dikirim ke siswa bersangkutan!");
  };

  const handleDeleteTicket = (id: string) => {
    setTickets(tickets.filter(t => t.id !== id));
  };

  const handleCleanupOtomatis = () => {
    if (confirm(`Simulasi: Apakah Anda yakin ingin membersihkan riwayat pesan berstatus 'Selesai' yang lebih lama dari ${hariCleanup} hari?`)) {
      // Simulasi menyisakan tiket yang belum selesai atau baru
      const remaining = tickets.filter(t => t.status !== "Selesai");
      setTickets(remaining);
      alert(`Berhasil membersihkan arsip pesan lama lebih dari ${hariCleanup} hari!`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pesan & Aduan Siswa</h1>
          <p className="text-sm text-slate-500 mt-1">Pantau, proses, and balas tiket kendala dari siswa di sini.</p>
        </div>

        {/* Panel Kontrol Bersih-Bersih Otomatis */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Arsip Otomatis &gt;</span>
          <select 
            value={hariCleanup} 
            onChange={(e) => setHariCleanup(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="60">60 Hari</option>
            <option value="50">50 Hari</option>
            <option value="40">40 Hari</option>
            <option value="30">30 Hari</option>
            <option value="20">20 Hari</option>
            <option value="10">10 Hari</option>
          </select>
          <button 
            onClick={handleCleanupOtomatis}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-xs transition-colors cursor-pointer border border-rose-200"
            title="Bersihkan pesan lama yang sudah selesai"
          >
            Bersihkan
          </button>
        </div>
      </div>

      {/* Navigasi Filter Status Tab */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        {["Semua", "Menunggu", "Diproses", "Selesai"].map((f) => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${filterStatus === f ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Render Komponen List Pesan */}
      <ListPesan 
        tickets={filteredTickets} 
        onBalas={(ticket) => setSelectedTicket(ticket)} 
        onDelete={handleDeleteTicket}
      />

      {/* Render Komponen Pop-up Balasan */}
      {selectedTicket && (
        <BalasPesanModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onSubmit={submitBalasan}
        />
      )}
    </div>
  );
}