"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminTopbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-violet-800 border-b border-slate-200 py-3 px-4 sm:px-6 flex items-center justify-between z-30">
      <h1 className="text-sm font-semibold text-slate-100">Overview Panel Admin</h1>
      
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-teal-600 transition-colors focus:outline-none cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-100 hidden sm:block">Cikgu Admin</span>
          <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800" onMouseLeave={() => setIsProfileOpen(false)}>
            <div className="px-3 py-1.5 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-800">Cikgu Admin</div>
              <div className="text-[10px] text-slate-400">admin@ruangbelajar.com</div>
            </div>
            <Link href="/" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors">🌐 Lihat Landing Page</Link>
            <Link href="/" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 font-semibold hover:bg-red-50 transition-colors border-t border-slate-100 mt-1">🚪 Keluar / Logout</Link>
          </div>
        )}
      </div>
    </header>
  );
}