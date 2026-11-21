"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { UserProfile } from "../../../lib/useAuthGuard";

export default function PortalTopbar({ profile }: { profile?: UserProfile | null }) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const nama = profile?.nama_lengkap || "Peserta";
  const email = profile?.email || "-";
  const initials = nama
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="bg-violet-800 border-b border-slate-200 py-2 px-4 sm:px-6 flex items-center justify-between z-30">
      <div className="flex items-center gap-3">
        <h1 className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
          Dashboard Peserta
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-slate-100">
            {nama}
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
              <div className="text-xs font-bold text-slate-800">{nama}</div>
              <div className="text-[10px] text-slate-400 truncate">{email}</div>
            </div>

            <Link
              href="/portal/profil"
              onClick={() => setIsProfileOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
            >
              ⚙️ Pengaturan Profil
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-red-600 font-semibold hover:bg-red-50 transition-colors border-t border-slate-100 mt-1 cursor-pointer"
            >
              🚪 Keluar / Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}