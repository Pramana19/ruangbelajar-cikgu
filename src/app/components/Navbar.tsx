"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Deteksi apakah sedang berada di dalam portal siswa
  const isPortal = pathname.startsWith("/portal");

  return (
    <header className="w-full bg-violet-800 border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-xs">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 bg-teal-500 rounded-full"></span>
        <Link href={isPortal ? "/portal" : "/"} className="font-bold text-lg text-white tracking-wide">
          RuangBelajar <span className="text-yellow-500 font-semibold text-3xl">Cikgu</span>
        </Link>
      </div>

      {/* Navigasi Landing Page HANYA TAMPIL jika bukan di Portal */}
      {!isPortal && (
        <nav className="hidden md:flex items-center gap-6">
          <a href="#keunggulan" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">Keunggulan</a>
          <a href="#jadwal" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">Jadwal & Jenjang</a>
          <a href="#cara-daftar" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">Cara Daftar</a>
          <a href="#faq" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">FAQ</a>
        </nav>
      )}

      <div className="flex items-center gap-3">
        {isPortal ? (
          // TOMBOL KELUAR UNTUK PORTAL SISWA
          <Link
            href="/"
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            Keluar 🚪
          </Link>
        ) : (
          // DROPDOWN LOGIN & DAFTAR UNTUK GUEST
          <>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 text-sm font-semibold text-white hover:text-yellow-500 transition-all flex items-center gap-1.5 focus:outline-none"
              >
                Login
                <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800" onMouseLeave={() => setIsOpen(false)}>
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Portal Masuk</div>
                  <Link href="/login?role=ortu" onClick={() => setIsOpen(false)} className="flex items-start gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 flex-shrink-0"></span>
                    <div><div className="text-xs font-semibold text-slate-800">Siswa / Orang Tua</div><p className="text-[10px] text-slate-500">Akses jadwal & klaim token les</p></div>
                  </Link>
                  <Link href="/login?role=pengajar" onClick={() => setIsOpen(false)} className="flex items-start gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                    <div><div className="text-xs font-semibold text-slate-800">Pengajar (Cikgu)</div><p className="text-[10px] text-slate-500">Kelola token & presensi harian</p></div>
                  </Link>
                  <Link href="/login?role=admin" onClick={() => setIsOpen(false)} className="flex items-start gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors border-t border-slate-100 mt-1 pt-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0"></span>
                    <div><div className="text-xs font-semibold text-slate-800">Admin Sistem</div><p className="text-[10px] text-slate-500">Akses penuh panel sistem /dev</p></div>
                  </Link>
                </div>
              )}
            </div>
            <Link href="/daftar" className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all">Daftar</Link>
          </>
        )}
      </div>
    </header>
  );
}