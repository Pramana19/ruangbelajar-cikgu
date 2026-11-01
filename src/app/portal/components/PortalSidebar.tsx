"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface PortalSidebarProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  onCloseMobile: () => void;
}

export default function PortalSidebar({ isOpen, onToggleOpen, onCloseMobile }: PortalSidebarProps) {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-purple-600 text-white font-medium text-sm transition-colors"
      : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 font-medium text-sm transition-colors";
  };

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50
      bg-slate-900 text-slate-100 flex flex-col shrink-0 shadow-2xl
      transition-all duration-300 ease-in-out
      ${isOpen ? "w-64 translate-x-0 shadow-2xl" : "w-16 translate-x-0"}
    `}>
      {/* Brand Header: Logo S posisinya diam */}
      <div className="p-3.5 border-b border-slate-800 flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleOpen}
          className="w-9 h-9 rounded-lg bg-purple-500 hover:bg-purple-400 active:scale-95 flex items-center justify-center font-bold text-white text-lg shrink-0 transition-all focus:outline-none cursor-pointer shadow-md"
          title="Klik untuk buka/tutup menu"
        >
          S
        </button>
        <div className={`transition-opacity duration-200 overflow-hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>
          <h2 className="font-bold text-base leading-tight whitespace-nowrap">RuangBelajar</h2>
          <p className="text-xs text-purple-400 whitespace-nowrap">Portal Siswa</p>
        </div>
      </div>

      {/* Menu Navigasi Sesuai Urutan Baru */}
      <nav className="p-3 flex-1 space-y-1 overflow-y-auto overflow-x-hidden">
        <Link href="/portal" onClick={onCloseMobile} className={getLinkClass("/portal")} title="Beranda">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Beranda</span>
        </Link>

        <Link href="/portal/profil" onClick={onCloseMobile} className={getLinkClass("/portal/profil")} title="Profil Siswa">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Profil Siswa</span>
        </Link>

        <Link href="/portal/tugas" onClick={onCloseMobile} className={getLinkClass("/portal/tugas")} title="Tugas">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Tugas</span>
        </Link>
        
        <Link href="/portal/materi" onClick={onCloseMobile} className={getLinkClass("/portal/materi")} title="Ruang Materi">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Ruang Materi</span>
        </Link>

        <Link href="/portal/bantuan" onClick={onCloseMobile} className={getLinkClass("/portal/bantuan")} title="Pusat Bantuan">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>Bantuan</span>
        </Link>
      </nav>

      <div className={`p-3 border-t border-slate-800 mt-auto text-[10px] text-slate-500 text-center transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>
        Portal Siswa v1.0
      </div>
    </aside>
  );
}