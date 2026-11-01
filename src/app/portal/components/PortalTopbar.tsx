"use client";

import { useState } from "react";
import Link from "next/link";

export default function PortalTopbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 flex items-center justify-between z-30">
      <div className="flex items-center gap-3">
        <h1 className="text-xs sm:text-sm font-semibold text-slate-600 truncate">
          Overview Portal Siswa
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
            SR
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-slate-700">
            Siti Rahma
          </span>
          <svg
            className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isProfileOpen && (
          <div
            className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800"
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <div className="px-3 py-1.5 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-800">Siti Rahma</div>
              <div className="text-[10px] text-slate-400 truncate">dewi.lestari@email.com</div>
            </div>

            <Link
              href="/portal/profil"
              onClick={() => setIsProfileOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
            >
              ⚙️ Pengaturan Profil
            </Link>

            <Link
              href="/"
              onClick={() => setIsProfileOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 font-semibold hover:bg-red-50 transition-colors border-t border-slate-100 mt-1"
            >
              🚪 Keluar / Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}