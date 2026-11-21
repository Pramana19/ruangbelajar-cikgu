"use client";
import { useState } from "react";
import { PesanTicket } from "@/lib/pesanStorage";
import LampiranPreview from "@/components/LampiranPreview";

export default function PesanDariCikgu({
  pesanList,
  currentSiswa,
  onTandaiDibaca,
  onBalasSiaran,
}: {
  pesanList: PesanTicket[];
  currentSiswa: string;
  onTandaiDibaca: (id: string) => void;
  onBalasSiaran: (siaran: PesanTicket, teks: string) => void;
}) {
  const [replyMap, setReplyMap] = useState<Record<string, string>>({});

  if (pesanList.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="text-4xl mb-3">📢</div>
        <h3 className="font-bold text-slate-700 text-sm">Belum ada pengumuman siaran dari Cikgu</h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pesanList.map((item) => {
        const sudahDibaca = item.readBySiswa?.includes(currentSiswa);

        return (
          <div
            key={item.id}
            onMouseEnter={() => !sudahDibaca && onTandaiDibaca(item.id)}
            className={`bg-white rounded-2xl border p-5 space-y-3 shadow-sm transition-colors ${
              sudahDibaca ? "border-slate-200" : "border-purple-300 bg-purple-50/30"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
                  📢 Siaran Cikgu • {item.tanggal}
                </span>
                {!sudahDibaca && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white">
                    Baru
                  </span>
                )}
              </div>
              {!sudahDibaca && (
                <button
                  type="button"
                  onClick={() => onTandaiDibaca(item.id)}
                  className="text-[11px] font-bold text-purple-700 hover:underline cursor-pointer"
                >
                  Tandai Sudah Dibaca ✓
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
              {item.pesan}
            </p>
            <LampiranPreview lampiran={item.lampiran} />

            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={replyMap[item.id] || ""}
                onChange={(e) => setReplyMap((prev) => ({ ...prev, [item.id]: e.target.value }))}
                placeholder="Tanggapi pengumuman ini secara pribadi ke Cikgu..."
                className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => {
                  const teks = (replyMap[item.id] || "").trim();
                  if (!teks) return alert("Ketik tanggapan terlebih dahulu!");
                  onBalasSiaran(item, teks);
                  setReplyMap((prev) => ({ ...prev, [item.id]: "" }));
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Kirim Tanggapan
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}