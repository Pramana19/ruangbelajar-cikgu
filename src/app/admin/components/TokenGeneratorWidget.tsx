"use client";

import { useState } from "react";

export default function TokenGeneratorWidget() {
  const [token, setToken] = useState("CIKGU28OCT");
  const [isTokenActive, setIsTokenActive] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleGenerateToken = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let newToken = "CIKGU";
    for (let i = 0; i < 4; i++) {
      newToken += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setToken(newToken);
    setIsTokenActive(true);
    setCopied(false);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-violet-900 to-indigo-800 rounded-2xl p-6 text-white shadow-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-semibold text-teal-200 uppercase tracking-wider">
              Presensi Sesi Les Hari Ini
            </span>
          </div>
          <h2 className="text-xl font-bold">Token Kehadiran Siswa</h2>
          <p className="text-xs text-violet-200 max-w-md">
            Bagikan token ini ke siswa saat sesi les dimulai. Siswa menginput kode ini di portal untuk klaim +5 Poin presensi.
          </p>
        </div>

        <div className="w-full md:w-auto bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex flex-col sm:flex-row items-center gap-3">
          <div className="text-center sm:text-left">
            <div className="text-[10px] text-violet-200 uppercase tracking-widest font-semibold">
              Kode Token Aktif
            </div>
            <div className="text-2xl font-black tracking-widest text-yellow-400 font-mono mt-0.5">
              {isTokenActive ? token : "--- OFF ---"}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyToken}
              disabled={!isTokenActive}
              className="flex-1 sm:flex-initial px-3 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
            >
              {copied ? "✓ Tersalin" : "Salin Token"}
            </button>
            <button
              onClick={handleGenerateToken}
              className="flex-1 sm:flex-initial px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-bold transition-all"
            >
              Acak Baru 🔄
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-violet-200">Status Sesi Presensi:</span>
          <button
            onClick={() => setIsTokenActive(!isTokenActive)}
            className={`px-3 py-1 rounded-full font-bold text-[11px] transition-colors ${
              isTokenActive
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}
          >
            {isTokenActive ? "● AKTIF (Menerima Klaim)" : "○ DITUTUP"}
          </button>
        </div>

        <button
          onClick={() => alert("Fitur EmailJS: Token berhasil dikirim ke email seluruh siswa aktif!")}
          className="text-yellow-300 hover:text-yellow-200 underline font-medium"
        >
          ✉ Broadcast Token ke Email Siswa
        </button>
      </div>
    </div>
  );
}