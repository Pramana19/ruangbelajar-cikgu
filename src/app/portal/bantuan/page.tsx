"use client";
import { useState, useEffect } from "react";
import FormAduan from "./components/FormAduan";
import FAQList from "./components/FAQList";
import RiwayatAduan from "./components/RiwayatAduan";
import PesanDariCikgu from "./components/PesanDariCikgu";
import { getTicketsFromStorage, LampiranFile, PesanTicket, saveTicketsToStorage } from "@/lib/pesanStorage";

const CURRENT_SISWA = "Siti Rahma";
const CURRENT_KELAS = "Kelas 1 SD";

export default function BantuanPage() {
  const [activeTab, setActiveTab] = useState<"kirim" | "riwayat" | "masuk">("kirim");
  const [allTickets, setAllTickets] = useState<PesanTicket[]>([]);

  useEffect(() => {
    const sync = () => setAllTickets(getTicketsFromStorage());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const diskusiPribadi = allTickets.filter(
    (t) => !t.isSiaran && !t.hiddenForSiswa && t.siswa.includes(CURRENT_SISWA)
  );
  const siaranCikgu = allTickets.filter((t) => t.isSiaran);
  const unreadSiaranCount = siaranCikgu.filter((t) => !t.readBySiswa?.includes(CURRENT_SISWA)).length;

  const handleOpenTabRiwayat = () => {
    setActiveTab("riwayat");
    const next = allTickets.map((t) => {
      if (t.isSiaran || !t.siswa.includes(CURRENT_SISWA)) return t;
      const updatedThread = (t.thread || []).map((c) => (c.pengirim === "Cikgu" ? { ...c, isRead: true } : c));
      return { ...t, thread: updatedThread };
    });
    setAllTickets(next);
    saveTicketsToStorage(next);
  };

  const handleTandaiSiaranDibaca = (siaranId: string) => {
    const next = allTickets.map((t) => {
      if (t.id !== siaranId) return t;
      const readers = t.readBySiswa || [];
      return readers.includes(CURRENT_SISWA) ? t : { ...t, readBySiswa: [...readers, CURRENT_SISWA] };
    });
    setAllTickets(next);
    saveTicketsToStorage(next);
  };

  const handleAduanBaru = (pesanBaru: string, lampiran?: LampiranFile | null) => {
    const today = new Date().toISOString().split("T")[0];
    const newTicket: PesanTicket = {
      id: `TKT-${Math.floor(1004 + Math.random() * 8999)}`,
      tanggal: today,
      siswa: CURRENT_SISWA,
      kelas: CURRENT_KELAS,
      pesan: pesanBaru,
      status: "Belum Dibalas",
      balasan: "",
      arah: "Masuk",
      lampiran,
      thread: [{ id: `C-${Date.now()}`, pengirim: "Siswa", namaPengirim: CURRENT_SISWA, waktu: today, teks: pesanBaru, lampiran, isRead: false }],
    };
    const next = [newTicket, ...allTickets];
    setAllTickets(next);
    saveTicketsToStorage(next);
    setActiveTab("riwayat");
  };

  const handleBalasLanjutan = (ticketId: string, teks: string, lampiran?: LampiranFile | null) => {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const next = allTickets.map((t) => {
      if (t.id !== ticketId) return t;
      const base = t.thread?.length ? t.thread : [{ id: "init", pengirim: t.arah === "Keluar" ? ("Cikgu" as const) : ("Siswa" as const), namaPengirim: t.siswa, waktu: t.tanggal, teks: t.pesan, lampiran: t.lampiran, isRead: true }];
      return {
        ...t,
        status: "Belum Dibalas" as const,
        thread: [...base, { id: `C-${Date.now()}`, pengirim: "Siswa" as const, namaPengirim: CURRENT_SISWA, waktu: now, teks, lampiran, isRead: false }],
      };
    });
    setAllTickets(next);
    saveTicketsToStorage(next);
  };

  const handleHapusRiwayat = (ticketId: string) => {
    const next = allTickets.map((t) =>
      t.id === ticketId ? { ...t, hiddenForSiswa: true } : t
    );
    setAllTickets(next);
    saveTicketsToStorage(next);
  };

  const handleBalasSiaran = (siaran: PesanTicket, teksBalasan: string) => {
    handleAduanBaru(`[Menanggapi Siaran ${siaran.id}: "${siaran.pesan}"]\n${teksBalasan}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bantuan & Diskusi</h1>
        <p className="text-sm text-slate-500 mt-1">Ajukan kendala, lanjutkan obrolan dengan Cikgu, atau baca pengumuman siaran.</p>
      </div>

      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
        <button onClick={() => setActiveTab("kirim")} className={`px-4 py-2.5 text-sm font-bold border-b-2 cursor-pointer whitespace-nowrap ${activeTab === "kirim" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500"}`}>
          Kirim Aduan & FAQ
        </button>
        <button onClick={handleOpenTabRiwayat} className={`px-4 py-2.5 text-sm font-bold border-b-2 cursor-pointer whitespace-nowrap ${activeTab === "riwayat" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500"}`}>
          Diskusi & Riwayat ({diskusiPribadi.length})
        </button>
        <button onClick={() => setActiveTab("masuk")} className={`px-4 py-2.5 text-sm font-bold border-b-2 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${activeTab === "masuk" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500"}`}>
          <span>Pengumuman Siaran</span>
          {unreadSiaranCount > 0 && (
            <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unreadSiaranCount}
            </span>
          )}
        </button>
      </div>

      {activeTab === "kirim" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><FormAduan onSuccess={handleAduanBaru} /></div>
            <div className="bg-gradient-to-br from-purple-900 to-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-purple-500/30 flex items-center justify-center font-bold text-lg">💬</div>
              <h3 className="font-bold text-base">Butuh Respon Cepat?</h3>
              <p className="text-xs text-purple-200 leading-relaxed">Hubungi Cikgu pendamping belajar secara langsung via WhatsApp.</p>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs text-center mt-auto">
                Chat WhatsApp Cikgu
              </a>
            </div>
          </div>
          <FAQList />
        </div>
      )}

      {activeTab === "riwayat" && (
        <RiwayatAduan
          riwayatAduan={diskusiPribadi}
          onBalasLanjutan={handleBalasLanjutan}
          onHapusRiwayat={handleHapusRiwayat}
        />
      )}
      {activeTab === "masuk" && (
        <PesanDariCikgu
          pesanList={siaranCikgu}
          currentSiswa={CURRENT_SISWA}
          onTandaiDibaca={handleTandaiSiaranDibaca}
          onBalasSiaran={handleBalasSiaran}
        />
      )}
    </div>
  );
}