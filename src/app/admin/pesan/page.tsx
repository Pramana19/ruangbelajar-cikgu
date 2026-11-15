"use client";
import { useState, useEffect } from "react";
import ListPesan from "./components/ListPesan";
import BalasPesanModal from "./components/BalasPesanModal";
import KirimPesanModal from "./components/KirimPesanModal";
import { getTicketsFromStorage, LampiranFile, PesanTicket, saveTicketsToStorage } from "@/lib/pesanStorage";

export default function AdminPesanPage() {
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<PesanTicket | null>(null);
  const [isKirimModalOpen, setIsKirimModalOpen] = useState(false);
  const [hariCleanup, setHariCleanup] = useState("30");
  const [tickets, setTickets] = useState<PesanTicket[]>([]);

  useEffect(() => {
    const sync = () => setTickets(getTicketsFromStorage());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const updateTickets = (next: PesanTicket[]) => {
    setTickets(next);
    saveTicketsToStorage(next);
  };

  // Saat Cikgu membuka modal diskusi: tandai pesan siswa sudah dibaca (✓✓ biru) & ubah status Belum Dibalas -> Dibaca
  const handleOpenDiskusi = (ticket: PesanTicket) => {
    const updated = tickets.map((t) => {
      if (t.id !== ticket.id) return t;
      const markedThread = (t.thread || []).map((c) => (c.pengirim === "Siswa" ? { ...c, isRead: true } : c));
      return {
        ...t,
        status: t.status === "Belum Dibalas" ? ("Dibaca" as const) : t.status,
        thread: markedThread,
      };
    });
    updateTickets(updated);
    setSelectedTicket(updated.find((t) => t.id === ticket.id) || ticket);
  };

  const filteredTickets = tickets.filter((t) => {
    const matchStatus = filterStatus === "Semua" || t.status === filterStatus;
    const q = search.toLowerCase();
    return matchStatus && (t.siswa.toLowerCase().includes(q) || t.pesan.toLowerCase().includes(q) || t.id.toLowerCase().includes(q));
  });

  const submitBalasan = (id: string, balasanText: string, lampiran?: LampiranFile | null) => {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    updateTickets(
      tickets.map((t) => {
        if (t.id !== id) return t;
        const baseThread = t.thread?.length
          ? t.thread
          : [{ id: "init", pengirim: t.arah === "Keluar" ? ("Cikgu" as const) : ("Siswa" as const), namaPengirim: t.siswa, waktu: t.tanggal, teks: t.pesan, lampiran: t.lampiran, isRead: true }];
        return {
          ...t,
          status: "Selesai",
          balasan: balasanText,
          thread: [...baseThread, { id: `C-${Date.now()}`, pengirim: "Cikgu", namaPengirim: "Cikgu Admin", waktu: now, teks: balasanText, lampiran, isRead: false }],
        };
      })
    );
    setSelectedTicket(null);
  };

  const handleKirimPesanBaru = (data: { penerimaLabel: string; kelasLabel: string; isSiaran: boolean; isiPesan: string; lampiran?: LampiranFile | null }) => {
    const today = new Date().toISOString().split("T")[0];
    const newMsg: PesanTicket = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      tanggal: today,
      siswa: data.penerimaLabel,
      kelas: data.kelasLabel,
      pesan: data.isiPesan,
      status: "Terkirim",
      balasan: "",
      arah: "Keluar",
      isSiaran: data.isSiaran,
      readBySiswa: [],
      lampiran: data.lampiran,
      thread: [{ id: `C-${Date.now()}`, pengirim: "Cikgu", namaPengirim: "Cikgu Admin", waktu: today, teks: data.isiPesan, lampiran: data.lampiran, isRead: false }],
    };
    updateTickets([newMsg, ...tickets]);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pesan & Aduan Siswa</h1>
          <p className="text-sm text-slate-500 mt-1">Pantau aduan masuk, balas kendala berulang, atau kirim pengumuman ke peserta.</p>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 self-start">
          <span className="text-xs font-semibold text-slate-600">Arsip Otomatis &gt;</span>
          <select value={hariCleanup} onChange={(e) => setHariCleanup(e.target.value)} className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 font-medium">
            {["60", "50", "40", "30", "20", "10"].map((h) => <option key={h} value={h}>{h} Hari</option>)}
          </select>
          <button
            type="button"
            onClick={() => confirm(`Bersihkan aduan 'Selesai' > ${hariCleanup} hari?`) && updateTickets(tickets.filter((t) => t.status !== "Selesai"))}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-xs cursor-pointer border border-rose-200"
          >
            Bersihkan
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Cari siswa / isi pesan..."
            className="w-full sm:w-64 px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full sm:w-auto px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold bg-white">
            <option value="Semua">Semua Status</option>
            <option value="Belum Dibalas">Belum Dibalas</option>
            <option value="Dibaca">Dibaca</option>
            <option value="Selesai">Selesai</option>
            <option value="Terkirim">Pesan Terkirim / Siaran</option>
          </select>
        </div>

        <button type="button" onClick={() => setIsKirimModalOpen(true)} className="w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs cursor-pointer">
          ✉️ Kirim Pesan
        </button>
      </div>

      <ListPesan tickets={filteredTickets} onBalas={handleOpenDiskusi} onDelete={(id) => updateTickets(tickets.filter((t) => t.id !== id))} />
      {selectedTicket && <BalasPesanModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} onSubmit={submitBalasan} />}
      <KirimPesanModal isOpen={isKirimModalOpen} onClose={() => setIsKirimModalOpen(false)} onKirimPesan={handleKirimPesanBaru} />
    </div>
  );
}