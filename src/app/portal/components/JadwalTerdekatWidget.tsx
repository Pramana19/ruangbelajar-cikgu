"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

interface JadwalItem {
  id: string;
  nama_kelas: string;
  target_peserta: string;
  hari: string;
  jam: string;
  mapel: string;
  status: "Aktif" | "Libur" | "Selesai";
}

const URUTAN_HARI: Record<string, number> = {
  Senin: 1,
  Selasa: 2,
  Rabu: 3,
  Kamis: 4,
  Jumat: 5,
  Sabtu: 6,
  Minggu: 7,
};

export default function JadwalTerdekatWidget() {
  const [jadwalList, setJadwalList] = useState<JadwalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSemuaJadwal = async () => {
      const { data, error } = await supabase
        .from("jadwal_kelas")
        .select("id, nama_kelas, target_peserta, hari, jam, mapel, status");

      if (!error && data) {
        const sorted = [...(data as JadwalItem[])].sort(
          (a, b) => (URUTAN_HARI[a.hari] ?? 99) - (URUTAN_HARI[b.hari] ?? 99)
        );
        setJadwalList(sorted);
      }
      setIsLoading(false);
    };

    fetchSemuaJadwal();
  }, []);

  const jumlahAktif = jadwalList.filter((j) => j.status === "Aktif").length;

  return (
    <div className="bg-amber-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-700 to-cyan-600 p-5 border-b border-slate-100 flex items-center justify-between">
        <h2 className="font-bold text-teal-200">Jadwal Kelas Terdekat</h2>
        {jadwalList.length > 0 && (
          <span className="text-[11px] font-bold bg-white/20 text-white px-2.5 py-0.5 rounded-full">
            {jumlahAktif} Aktif • {jadwalList.length} Total
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-xs text-slate-500">Memuat jadwal kelas...</div>
      ) : jadwalList.length === 0 ? (
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-4">🛌</div>
          <h3 className="text-base font-bold text-slate-800 mb-1">Belum Ada Jadwal</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Cikgu belum menjadwalkan sesi les untukmu minggu ini. Waktunya istirahat atau mengulang pelajaran sebelumnya!
          </p>
        </div>
      ) : (
        <div className="p-4 divide-y divide-amber-200/70">
          {jadwalList.map((item) => {
            const isLibur = item.status === "Libur";
            const isSelesai = item.status === "Selesai";

            return (
              <div
                key={item.id}
                className={`py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3 ${
                  isLibur ? "opacity-80" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-bold rounded">
                      {item.hari}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-600">
                      {item.jam}
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-1 truncate">{item.mapel}</div>
                  <div className="text-[11px] text-teal-700 font-medium truncate">
                    {item.nama_kelas} • {item.target_peserta}
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-full shrink-0 ${
                    isLibur
                      ? "bg-amber-200 text-amber-900"
                      : isSelesai
                      ? "bg-slate-200 text-slate-700"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {isLibur ? "● Libur" : isSelesai ? "✓ Selesai" : "● Aktif"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}