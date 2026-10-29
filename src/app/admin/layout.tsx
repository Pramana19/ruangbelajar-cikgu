"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  // Helper fungsi untuk menentukan gaya link aktif
  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-teal-600 text-white font-medium text-sm transition-colors"
      : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 font-medium text-sm transition-colors";
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      {/* Sidebar Navigasi */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex-shrink-0 flex flex-col">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between md:justify-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-white text-lg">
            C
          </div>
          <div>
            <h2 className="font-bold text-base leading-tight">RuangBelajar</h2>
            <p className="text-xs text-teal-400">Panel Cikgu Admin</p>
          </div>
        </div>

        {/* Menu Items dengan Active State Otomatis */}
        <nav className="p-4 flex-1 space-y-1">
          <Link href="/admin" className={getLinkClass("/admin")}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>

          <Link
            href="/admin/pendaftar"
            className={getLinkClass("/admin/pendaftar")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Data Pendaftar
          </Link>

          <Link
            href="/admin/jadwal"
            className={getLinkClass("/admin/jadwal")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Jadwal Les
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 mt-auto text-[11px] text-slate-500 text-center">
          RuangBelajar Cikgu v1.0
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar Header */}
        <header className="bg-white border-b border-slate-200 py-3 px-6 flex items-center justify-between">
          <h1 className="text-sm font-semibold text-slate-600">
            Overview Panel Admin
          </h1>

          {/* Dropdown Profil Cikgu Admin */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-700">
                Cikgu Admin
              </span>
              <svg
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <div className="px-3 py-1.5 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-800">
                    Cikgu Admin
                  </div>
                  <div className="text-[10px] text-slate-400">
                    admin@ruangbelajar.com
                  </div>
                </div>

                <Link
                  href="/"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  🌐 Lihat Landing Page
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

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}