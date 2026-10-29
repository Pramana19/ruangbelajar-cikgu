"use client";

import { useState } from "react";

interface TokenClaimProps {
  activeToken: string; // Token valid dari Cikgu
  isClaimed: boolean;
  onSuccessClaim: () => void;
}

export default function TokenClaimWidget({ activeToken, isClaimed, onSuccessClaim }: TokenClaimProps) {
  const [tokenInput, setTokenInput] = useState("");
  const [claimStatus, setClaimStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleKlaimToken = (e: React.FormEvent) => {
    e.preventDefault();

    if (isClaimed) {
      setClaimStatus("error");
      setErrorMessage("Kamu sudah melakukan klaim presensi untuk hari ini!");
      return;
    }

    const cleanInput = tokenInput.trim().toUpperCase();

    if (!cleanInput) {
      setClaimStatus("error");
      setErrorMessage("Silakan masukkan kode token terlebih dahulu!");
      return;
    }

    // LOGIKA PERBANDINGAN TOKEN PRESISI (Strict Comparison)
    if (cleanInput !== activeToken) {
      setClaimStatus("error");
      setErrorMessage(`Kode token "${cleanInput}" salah atau tidak cocok! Periksa kembali papan tulis Cikgu.`);
      return;
    }

    // Jika Token Cocok Tepat
    setClaimStatus("success");
    onSuccessClaim();
    setTokenInput("");
  };

  return (
    <div className="bg-gradient-to-r from-teal-700 to-emerald-600 rounded-2xl p-6 text-white shadow-md space-y-4">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-teal-200 uppercase tracking-wider">
          Presensi Sesi Les Hari Ini
        </span>
        <h2 className="text-xl font-bold">Klaim Token Kehadiran 🎯</h2>
        <p className="text-xs text-teal-100">
          Masukkan kode token dari Cikgu di papan tulis untuk klaim +5 Poin presensi.
        </p>
      </div>

      <form onSubmit={handleKlaimToken} className="flex flex-col sm:flex-row gap-2 max-w-lg">
        <input
          type="text"
          value={tokenInput}
          maxLength={10}
          disabled={isClaimed}
          onChange={(e) => {
            setTokenInput(e.target.value.toUpperCase());
            setClaimStatus("idle");
          }}
          placeholder={isClaimed ? "SUDAH KLAIM HARI INI" : "TOKEN (CONTOH: CIKGU28OCT)"}
          className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 disabled:bg-slate-200 disabled:text-slate-500 font-mono text-sm uppercase font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          disabled={isClaimed}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 disabled:bg-slate-300 disabled:text-slate-500 text-slate-900 font-bold rounded-xl text-sm transition-all shadow-md flex-shrink-0"
        >
          {isClaimed ? "Terhitung Hadir ✓" : "Klaim +5 Pts 🎉"}
        </button>
      </form>

      {claimStatus === "success" && (
        <div className="p-3 bg-emerald-500/30 border border-emerald-300/40 rounded-xl text-xs font-semibold text-emerald-100 flex items-center gap-2">
          <span>✅</span> Selamat! Token cocok. Presensi berhasil diklaim (+5 Pts)!
        </div>
      )}

      {claimStatus === "error" && (
        <div className="p-3 bg-red-500/30 border border-red-300/40 rounded-xl text-xs font-semibold text-red-100 flex items-center gap-2">
          <span>⚠️</span> {errorMessage}
        </div>
      )}
    </div>
  );
}