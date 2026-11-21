"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import FormAduan from "./components/FormAduan";
import FAQList from "./components/FAQList";
import RiwayatAduan from "./components/RiwayatAduan";
import PesanDariCikgu from "./components/PesanDariCikgu";
import {
  fetchPesanTickets,
  insertPesanTicket,
  LampiranFile,
  PesanTicket,
  updatePesanTicket,
} from "@/lib/pesanStorage";

export default function BantuanPage() {
  const [activeTab, setActiveTab] = useState<"kirim" | "riwayat" | "masuk">("kirim");
  const [profile, setProfile] = useState<{ id: string; nama: string; kelas: string } | null>(null);
  const [allTickets, setAllTickets] = useState<PesanTicket[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("id, nama_lengkap, kelas")
          .eq("id", user.id)
          .single();
        if (prof) {
          setProfile({
            id: prof.id,
            nama: prof.nama_lengkap || "Peserta",
            kelas: prof.kelas || "Umum",
          });
        }
      }
      setAllTickets(await fetchPesanTickets());
    };
    loadData();
  }, []);

  const currentSiswa = profile?.nama || "";
  const currentKelas = profile?.kelas || "Umum";

  const diskusiPribadi = allTickets.filter(
    (t) =>
      !t.isSiaran &&
      !t.hiddenForSiswa &&
      ((profile?.id && t.siswaId === profile.id) ||
        (currentSiswa && t.siswa.toLowerCase().includes(currentSiswa.toLowerCase())))
  );
  const siaranCikgu = allTickets.filter((t) => t.isSiaran);
  const unreadSiaranCount = siaranCikgu.filter(
    (t) => currentSiswa && !t.readBySiswa?.includes(currentSiswa)
  ).length;

  const handleOpenTabRiwayat = async () => {
    setActiveTab("riwayat");
    const toMark = diskusiPribadi.filter((t) =>
      (t.thread || []).some((c) => c.pengirim === "Cikgu" && !c.isRead)
    );
    if (toMark.length === 0) return;

    const updatedMap = new Map<string, PesanTicket["thread"]>();
    for (const item of toMark) {
      const marked = (item.thread || []).map((c) =>
        c.pengirim === "Cikgu" ? { ...c, isRead: true } : c
      );
      updatedMap.set(item.id, marked);
      await updatePesanTicket(item.id, { thread: marked });
    }

    setAllTickets((prev) =>
      prev.map((t) => (updatedMap.has(t.id) ? { ...t, thread: updatedMap.get(t.id) } : t))
    );
  };

  const handleTandaiSiaranDibaca = async (siaranId: string) => {
    if (!currentSiswa) return;
    const target = allTickets.find((t) => t.id === siaranId);
    if (!target) return;

    const readers = target.readBySiswa || [];
    if (readers.includes(currentSiswa)) return;

    const nextReaders = [...readers, currentSiswa];
    setAllTickets((prev) =>
      prev.map((t) => (t.id === siaranId ? { ...t, readBySiswa: nextReaders } : t))
    );
    await updatePesanTicket(siaranId, { read_by_siswa: nextReaders });
  };

  const handleAduanBaru = async (pesanBaru: string, lampiran?: LampiranFile | null) => {
    if (!profile) return;
    const today = new Date().toISOString().split("T")[0];
    const newTicket: PesanTicket = {
      id: `TKT-${Math.floor(1004 + Math.random() * 8999)}`,
      tanggal: today,
      siswaId: profile.id,
      siswa: currentSiswa,
      kelas: currentKelas,
      pesan: pesanBaru,
      status: "Belum Dibalas",
      balasan: "",
      arah: "Masuk",
      lampiran,
      thread: [
        {
          id: `C-${Date.now()}`,
          pengirim: "Siswa",
          namaPengirim: currentSiswa,
          waktu: today,
          teks: pesanBaru,
          lampiran,
          isRead: false,
        },
      ],
    };

    const saved = await insertPesanTicket(newTicket);
    if (!saved) return alert("Gagal mengirim aduan. Silakan coba lagi.");
    setAllTickets((prev) => [saved, ...prev]);
    setActiveTab("riwayat");
  };

  const handleBalasLanjutan = async (ticketId: string, teks: string, lampiran?: LampiranFile | null) => {
    const target = allTickets.find((t) => t.id === ticketId);
    if (!target) return;

    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const base = target.thread?.length
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
      ...base,
      {
        id: `C-${Date.now()}`,
        pengirim: "Siswa" as const,
        namaPengirim: currentSiswa,
        waktu: now,
        teks,
        lampiran,
        isRead: false,
      },
    ];

    const ok = await updatePesanTicket(ticketId, {
      status: "Belum Dibalas",
      thread: nextThread,
    });
    if (!ok) return alert("Gagal mengirim balasan lanjutan.");

    setAllTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status: "Belum Dibalas", thread: nextThread } : t
      )
    );
  };

  const handleHapusRiwayat = async (ticketId: string) => {
    const ok = await updatePesanTicket(ticketId, { hidden_for_siswa: true });
    if (ok) {
      setAllTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, hiddenForSiswa: true } : t))
      );
    }
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
          currentSiswa={currentSiswa}
          onTandaiDibaca={handleTandaiSiaranDibaca}
          onBalasSiaran={handleBalasSiaran}
        />
      )}
    </div>
  );
}