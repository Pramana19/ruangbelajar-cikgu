"use client";

import { useState } from "react";
import MateriFilterTabs from "./components/MateriFilterTabs";
import MateriCard, { Materi } from "./components/MateriCard";

export default function PortalMateriPage() {
  const [activeTab, setActiveTab] = useState<"Semua" | "Video" | "PDF">("Semua");

  const materiList: Materi[] = [
    { id: 1, judul: "Video Panduan: Penjumlahan & Pengurangan Bersusun", tipe: "Video", url: "https://www.youtube.com/embed/jNQXAC9IVRw", mapel: "Matematika Dasar", tanggal: "28 Okt 2026" },
    { id: 2, judul: "Modul Latihan Soal Matematika Tema 1", tipe: "PDF", url: "#", mapel: "Matematika Dasar", tanggal: "28 Okt 2026", ukuran: "1.2 MB" },
    { id: 3, judul: "Video Cerita: Mengenal Hewan Mamalia & Ciri-cirinya", tipe: "Video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", mapel: "Ilmu Pengetahuan Alam", tanggal: "25 Okt 2026" },
    { id: 4, judul: "Rangkuman Bergambar IPA Tema 2", tipe: "PDF", url: "#", mapel: "Ilmu Pengetahuan Alam", tanggal: "25 Okt 2026", ukuran: "2.5 MB" },
  ];

  const filteredMateri = materiList.filter((m) => activeTab === "Semua" || m.tipe === activeTab);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ruang Materi</h1>
        <p className="text-sm text-slate-500 mt-1">Tonton ulang video pembelajaran dan unduh modul latihan yang telah dibagikan oleh Cikgu.</p>
      </div>

      <MateriFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Grid disesuaikan: sm:grid-cols-2 lg:grid-cols-3 agar card lebih proporsional */}
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
          filteredMateri.map((item) => <MateriCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}