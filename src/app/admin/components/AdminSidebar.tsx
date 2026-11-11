"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-yellow-600 text-white font-medium text-sm transition-colors"
      : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-slate-700 font-medium text-sm transition-colors";
  };

  return (
    <>
      {/* Backdrop blur saat sidebar menggelar di mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Admin */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          bg-slate-900 text-slate-100 flex flex-col shrink-0 shadow-2xl
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64 translate-x-0 shadow-2xl" : "w-16 translate-x-0"}
        `}
      >
        {/* Brand Header */}
        <div className="p-3.5 border-b border-slate-800 flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-9 h-9 rounded-lg bg-yellow-600 hover:bg-teal-400 active:scale-95 flex items-center justify-center font-bold text-white text-lg shrink-0 transition-all focus:outline-none cursor-pointer shadow-md"
            title="Klik untuk buka/tutup menu"
          >
            C
          </button>
          <div className={`transition-opacity duration-200 overflow-hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>
            <h2 className="font-bold text-base leading-tight whitespace-nowrap">RuangBelajar</h2>
            <p className="text-xs text-yellow-400 whitespace-nowrap">Panel Cikgu Admin</p>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="p-3 flex-1 space-y-1 overflow-y-auto overflow-x-hidden">
          {/* Dashboard: Ikon Rumah (Sama dengan Siswa) */}
          <Link href="/admin" onClick={() => setIsSidebarOpen(false)} className={getLinkClass("/admin")} title="Dashboard">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Dashboard</span>
          </Link>

          {/* Data Pendaftar: Ikon User Tunggal (Sama dengan Profil Siswa) */}
          <Link href="/admin/pendaftar" onClick={() => setIsSidebarOpen(false)} className={getLinkClass("/admin/pendaftar")} title="Data Pendaftar">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Data Pendaftar</span>
          </Link>

          {/* Jadwal Les: Ikon Clipboard/Tugas (Sama dengan Tugas Siswa) */}
          <Link href="/admin/jadwal" onClick={() => setIsSidebarOpen(false)} className={getLinkClass("/admin/jadwal")} title="Jadwal Les">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Jadwal Les</span>
          </Link>
          
          {/* Ruang Materi: Ikon Buku (Sama dengan Siswa) */}
          <Link href="/admin/materi" onClick={() => setIsSidebarOpen(false)} className={getLinkClass("/admin/materi")} title="Ruang Materi">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Ruang Materi</span>
          </Link>

          <Link href="/admin/pesan" onClick={() => setIsSidebarOpen(false)} className={getLinkClass("/admin/pesan")} title="Pesan Siswa">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Pesan Siswa</span>
          </Link>
        </nav>

        <div className={`p-3 border-t border-slate-800 mt-auto text-[10px] text-slate-500 text-center transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>
          v1.0
        </div>
      </aside>
    </>
  );
}