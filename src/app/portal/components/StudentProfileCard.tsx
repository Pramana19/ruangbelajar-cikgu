"use client";

import { useEffect, useState } from "react";

// Mendefinisikan tipe data yang diterima dari page.tsx
interface StudentData {
  nama: string;
  kelas: string;
  orangTua: string;
  paketLangganan: string;
  statusPembayaran: string;
  tanggalMulai: string;
  jatuhTempo: string;
}

export default function StudentProfileCard({ points, studentData }: { points: number, studentData?: StudentData }) {
  const [sisaWaktu, setSisaWaktu] = useState<string>("Menghitung waktu...");

  // Fungsi cerdas menghitung sisa masa aktif secara real-time
  useEffect(() => {
    if (studentData?.jatuhTempo) {
      const calculateSisaWaktu = () => {
        const due = new Date(studentData.jatuhTempo);
        const now = new Date();
        
        // Reset waktu ke tengah malam agar hitungan harinya presisi
        due.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);

        const diffTime = due.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Telah Berakhir ⚠️";
        if (diffDays === 0) return "Berakhir Hari Ini ⏳";
        
        // Jika lebih dari 30 hari, kita ubah jadi bulan dan hari
        if (diffDays > 30) {
          const months = Math.floor(diffDays / 30);
          const days = diffDays % 30;
          return `Sisa ${months} Bulan ${days > 0 ? `${days} Hari` : ""} 🔥`;
        }
        
        return `Sisa ${diffDays} Hari 🔥`;
      };

      setSisaWaktu(calculateSisaWaktu());
    }
  }, [studentData]);

  // Fallback jika studentData belum tersedia (misal loading)
  if (!studentData) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-cyan-600 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      
      {/* KIRI: Identitas Peserta */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-14 h-14 rounded-full bg-teal-500 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
          {studentData.nama.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-teal-200">{studentData.nama}</h1>
            <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
              {studentData.kelas}
            </span>
          </div>
          <p className="text-xs text-white mt-0.5">
            Wali: {studentData.orangTua} • Privat Mat & Calistung
          </p>
        </div>
      </div>

      {/* TENGAH: Emblem/Badge Langganan (Mengisi area merah) */}
      <div className="flex-1 flex sm:justify-end w-full sm:w-auto border-t sm:border-t-0 sm:border-r border-slate-100 pt-4 sm:pt-0 pr-0 sm:pr-6">
        <div className="flex flex-col items-start sm:items-end w-full">
          <div className={`text-[10px] font-bold px-2.5 py-1 rounded-md mb-1.5 shadow-sm inline-flex items-center gap-1 ${
            studentData.statusPembayaran === "Lunas" 
              ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
              : "bg-rose-100 text-rose-800 border border-rose-200"
          }`}>
            {studentData.statusPembayaran === "Lunas" ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Aktif Berjalan (Lunas)
              </>
            ) : (
              <>⚠️ Belum Lunas (Lockout)</>
            )}
          </div>
          <div className="text-xl font-medium text-white tracking-tight">
            {studentData.paketLangganan}
          </div>
          <div className="text-[12px] font-semibold text-teal-100 mt-0.5">
            {sisaWaktu}
          </div>
        </div>
      </div>

      {/* KANAN: Widget Total Poin */}
      <div className="w-full sm:w-auto bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex items-center justify-between sm:justify-start gap-3 shrink-0">
        <div className="text-2xl drop-shadow-sm">🏆</div>
        <div>
          <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
            Total Reward Poin
          </div>
          <div className="text-xl font-black text-amber-900 leading-none mt-1">
            {points} <span className="text-xs font-semibold">Pts</span>
          </div>
        </div>
      </div>

    </div>
  );
}