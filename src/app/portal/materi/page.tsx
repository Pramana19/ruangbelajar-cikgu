"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import MateriFilterTabs from "./components/MateriFilterTabs";
import MateriCard, { Materi } from "./components/MateriCard";

export default function PortalMateriPage() {
  const [activeTab, setActiveTab] = useState<"Semua" | "Video" | "PDF">("Semua");
  const [materiList, setMateriList] = useState<Materi[]>([]);
  const [isUnpaid, setIsUnpaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMateri = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("status_pembayaran")
          .eq("id", user.id)
          .single();
        if (prof) setIsUnpaid(prof.status_pembayaran !== "Lunas");
      }

      const { data, error } = await supabase
        .from("materi_belajar")
        .select("*")
        .eq("status", "Selesai")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setMateriList(
          data.map((row) => ({
            id: row.id,
            judul: row.judul || "Materi Tanpa Judul",
            tipe: (row.tipe as "Video" | "PDF") || "Video",
            url: row.url || "#",
            mapel: row.mapel,
            tanggal: row.tanggal || "-",
            ukuran: row.ukuran || undefined,
          }))
        );
      }
      setIsLoading(false);
    };

    loadMateri();
  }, []);

  const filteredMateri = materiList.filter((m) => activeTab === "Semua" || m.tipe === activeTab);
  const newestId = materiList[0]?.id;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ruang Materi</h1>
        <p className="text-sm text-slate-500 mt-1">Tonton ulang video pembelajaran dan unduh modul latihan yang telah dibagikan oleh Cikgu.</p>
      </div>

      {isUnpaid && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-800 font-semibold">
          ⚠️ Status pembayaran saat ini <strong>Belum Lunas</strong>. Materi lama tetap dapat diputar/diunduh, namun akses materi terbaru dikunci sementara.
        </div>
      )}

      <MateriFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {isLoading ? (
        <div className="py-12 text-center text-xs text-slate-500">Memuat daftar materi...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMateri.length === 0 ? (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border-2 border-slate-200 border-dashed">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Materi Belum Tersedia</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Cikgu belum mengunggah materi atau modul untuk kategori ini. Silakan cek lagi nanti ya!
              </p>
            </div>
          ) : (
            filteredMateri.map((item) => (
              <MateriCard
                key={item.id}
                item={item}
                isLocked={isUnpaid && item.id === newestId}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}