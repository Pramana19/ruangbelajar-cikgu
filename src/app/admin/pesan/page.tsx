"use client";
import { useState, useEffect, useCallback } from "react";
import ListPesan from "./components/ListPesan";
import BalasPesanModal from "./components/BalasPesanModal";
import KirimPesanModal from "./components/KirimPesanModal";
import {
  bersihkanPesanSelesai,
  deletePesanTicket,
  fetchPesanTickets,
  insertPesanTicket,
  LampiranFile,
  PesanTicket,
  updatePesanTicket,
} from "@/lib/pesanStorage";

export default function AdminPesanPage() {
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<PesanTicket | null>(null);
  const [isKirimModalOpen, setIsKirimModalOpen] = useState(false);
  const [hariCleanup, setHariCleanup] = useState("30");
  const [tickets, setTickets] = useState<PesanTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    setTickets(await fetchPesanTickets());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleOpenDiskusi = async (ticket: PesanTicket) => {
    const markedThread = (ticket.thread || []).map((c) =>
      c.pengirim === "Siswa" ? { ...c, isRead: true } : c
    );
    const nextStatus = ticket.status === "Belum Dibalas" ? ("Dibaca" as const) : ticket.status;

    const updatedTicket: PesanTicket = {
      ...ticket,
      status: nextStatus,
      thread: markedThread,
    };

    setTickets((prev) => prev.map((t) => (t.id === ticket.id ? updatedTicket : t)));
    setSelectedTicket(updatedTicket);

    await updatePesanTicket(ticket.id, {
      status: nextStatus,
      thread: markedThread,
    });
  };

  const filteredTickets = tickets.filter((t) => {
    const matchStatus = filterStatus === "Semua" || t.status === filterStatus;
    const q = search.toLowerCase();
    return (
      matchStatus &&
      (t.siswa.toLowerCase().includes(q) ||
        t.pesan.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q))
    );
  });

  const submitBalasan = async (id: string, balasanText: string, lampiran?: LampiranFile | null) => {
    const target = tickets.find((t) => t.id === id);
    if (!target) return;

    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const baseThread = target.thread?.length
      ? target.thread
      : [
          {
            id: "init",
            pengirim: target.arah === "Keluar" ? ("Cikgu" as const) : ("Siswa" as const),
            namaPengirim: target.siswa,
            waktu: target.tanggal,
            teks: target.pesan,
            lampiran: target.lampiran,
            isRead: true,
          },
        ];

    const nextThread = [
      ...baseThread,
      {
        id: `C-${Date.now()}`,
        pengirim: "Cikgu" as const,
        namaPengirim: "Cikgu Admin",
        waktu: now,
        teks: balasanText,
        lampiran,
        isRead: false,
      },
    ];

    const ok = await updatePesanTicket(id, {
      status: "Selesai",
      balasan: balasanText,
      thread: nextThread,
    });

    if (!ok) return alert("Gagal mengirim balasan.");
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "Selesai", balasan: balasanText, thread: nextThread } : t
      )
    );
    setSelectedTicket(null);
  };

  const handleKirimPesanBaru = async (data: {
    siswaId?: string;
    penerimaLabel: string;
    kelasLabel: string;
    isSiaran: boolean;
    isiPesan: string;
    lampiran?: LampiranFile | null;
  }) => {
    const today = new Date().toISOString().split("T")[0];
    const newMsg: PesanTicket = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      tanggal: today,
      siswaId: data.siswaId,
      siswa: data.penerimaLabel,
      kelas: data.kelasLabel,
      pesan: data.isiPesan,
      status: "Terkirim",
      balasan: "",
      arah: "Keluar",
      isSiaran: data.isSiaran,
      readBySiswa: [],
      lampiran: data.lampiran,
      thread: [
        {
          id: `C-${Date.now()}`,
          pengirim: "Cikgu",
          namaPengirim: "Cikgu Admin",
          waktu: today,
          teks: data.isiPesan,
          lampiran: data.lampiran,
          isRead: false,
        },
      ],
    };

    const saved = await insertPesanTicket(newMsg);
    if (!saved) return alert("Gagal mengirim pesan baru.");
    setTickets((prev) => [saved, ...prev]);
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
            onClick={async () => {
              if (!confirm(`Bersihkan aduan 'Selesai' > ${hariCleanup} hari?`)) return;
              if (await bersihkanPesanSelesai(Number(hariCleanup))) await loadTickets();
            }}
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

      {isLoading ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">Memuat daftar pesan & aduan...</div>
      ) : (
        <ListPesan
          tickets={filteredTickets}
          onBalas={handleOpenDiskusi}
          onDelete={async (id) => {
            if (await deletePesanTicket(id)) setTickets((prev) => prev.filter((t) => t.id !== id));
          }}
        />
      )}

      {selectedTicket && <BalasPesanModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} onSubmit={submitBalasan} />}
      <KirimPesanModal isOpen={isKirimModalOpen} onClose={() => setIsKirimModalOpen(false)} onKirimPesan={handleKirimPesanBaru} />
    </div>
  );
}