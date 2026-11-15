"use client";
import { useState } from "react";
import { LampiranFile } from "@/lib/pesanStorage";

export default function LampiranPreview({ lampiran }: { lampiran?: LampiranFile | null }) {
  const [zoom, setZoom] = useState(false);
  if (!lampiran) return null;

  return (
    <>
      <div className="mt-2">
        {lampiran.tipe === "image" ? (
          <button
            type="button"
            onClick={() => setZoom(true)}
            className="group relative inline-block rounded-lg overflow-hidden border border-slate-200 shadow-xs cursor-pointer"
            title="Klik untuk memperbesar gambar"
          >
            <img src={lampiran.url} alt={lampiran.nama} className="max-h-28 w-auto object-cover group-hover:opacity-90" />
            <span className="block bg-slate-900/70 text-white text-[10px] px-2 py-0.5 truncate max-w-[180px]">
              🔍 {lampiran.nama}
            </span>
          </button>
        ) : (
          <a
            href={lampiran.url}
            download={lampiran.nama}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold hover:bg-rose-100"
          >
            📄 {lampiran.nama} (Unduh PDF)
          </a>
        )}
      </div>

      {zoom && lampiran.tipe === "image" && (
        <div onClick={() => setZoom(false)} className="fixed inset-0 bg-slate-950/80 z-[60] flex items-center justify-center p-4 cursor-zoom-out">
          <div className="relative max-w-3xl max-h-[90vh] bg-white p-2 rounded-2xl shadow-2xl">
            <img src={lampiran.url} alt={lampiran.nama} className="max-h-[82vh] w-auto rounded-xl object-contain" />
            <p className="text-center text-xs font-semibold text-slate-600 py-1.5">{lampiran.nama} (Klik di mana saja untuk tutup)</p>
          </div>
        </div>
      )}
    </>
  );
}