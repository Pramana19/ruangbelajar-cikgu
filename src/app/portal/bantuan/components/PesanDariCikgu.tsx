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
  onTandaiDibaca: (siaranId: string) => void;
  onBalasSiaran: (siaran: PesanTicket, teksBalasan: string) => void;
}) {
  const [replyOpenId, setReplyOpenId] = useState<string | null>(null);
  const [teks, setTeks] = useState("");

  if (pesanList.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="text-4xl mb-3">📭</div>
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
            onClick={() => !sudahDibaca && onTandaiDibaca(item.id)}
            className={`rounded-2xl border p-5 space-y-3 shadow-sm transition-all ${
              sudahDibaca ? "bg-white border-slate-200" : "bg-purple-50/40 border-purple-300 ring-1 ring-purple-200 cursor-pointer"
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">📢</div>
                <div>
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span>Cikgu Admin</span>
                    {!sudahDibaca && <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[9px] font-bold">BARU</span>}
                  </p>
                  <p className="text-[11px] text-slate-400">{item.id} • {item.tanggal}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-700">📢 Pengumuman Siaran</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-sm text-slate-700">
              {item.pesan}
              <LampiranPreview lampiran={item.lampiran} />
            </div>

            {replyOpenId === item.id ? (
              <div className="flex flex-col sm:flex-row gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={teks}
                  onChange={(e) => setTeks(e.target.value)}
                  placeholder="Tulis balasan pribadi ke Cikgu terkait pengumuman ini..."
                  className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!teks.trim()) return;
                    onBalasSiaran(item, teks.trim());
                    setTeks("");
                    setReplyOpenId(null);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Kirim ke Cikgu
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                {!sudahDibaca ? (
                  <button
                    type="button"
                    onClick={() => onTandaiDibaca(item.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                  >
                    ✓ Tandai Dibaca
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-sky-600 mr-2">✓✓ Sudah dibaca</span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (!sudahDibaca) onTandaiDibaca(item.id);
                    setReplyOpenId(item.id);
                  }}
                  className="px-4 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg text-xs cursor-pointer border border-purple-200"
                >
                  💬 Balas Siaran Ini (Privat)
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}