"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";

function LoginForm() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "ortu";

  const roleConfigs = {
    ortu: {
      title: "Portal Siswa & Orang Tua",
      badge: "Siswa / Orang Tua",
      badgeBg: "bg-teal-100 text-teal-800",
      redirectUrl: "/portal",
    },
    pengajar: {
      title: "Portal Pengajar Cikgu",
      badge: "Pengajar (Cikgu)",
      badgeBg: "bg-amber-100 text-amber-800",
      redirectUrl: "/admin",
    },
    admin: {
      title: "Panel Admin Sistem",
      badge: "Admin Developer",
      badgeBg: "bg-indigo-100 text-indigo-800",
      redirectUrl: "/admin",
    },
  };

  const currentRole = roleConfigs[role as keyof typeof roleConfigs] || roleConfigs.ortu;

  const handleLupaSandi = () => {
    if (role === "ortu") {
      alert("Fitur Reset Sandi: Link reset akan dikirimkan ke email terdaftar (EmailJS).");
    } else {
      alert("Akun Internal: Silakan hubungi Admin Developer untuk me-reset kredensial Anda.");
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-6">
      <div className="text-center space-y-2">
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${currentRole.badgeBg}`}>
          {currentRole.badge}
        </span>
        <h1 className="text-2xl font-bold text-slate-800">{currentRole.title}</h1>
        <p className="text-sm text-slate-600">
          Masukkan akun terdaftar untuk mengakses layanan.
        </p>
      </div>

      <form 
        className="space-y-4" 
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = currentRole.redirectUrl;
        }}
      >
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Email atau Nomor WhatsApp</label>
          <input 
            type="text" 
            placeholder="Contoh: user@email.com / 08123..." 
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-slate-700">Kata Sandi (Password)</label>
            <button
              type="button"
              onClick={handleLupaSandi}
              className="text-[11px] text-teal-600 hover:underline font-medium"
            >
              Lupa kata sandi?
            </button>
          </div>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
            required
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link 
            href="/" 
            className="w-1/3 py-2.5 bg-red-700 border-slate-200 hover:bg-red-800 text-slate-200 font-semibold rounded-lg text-center transition-all text-sm shadow-xs"
          >
            Batal
          </Link>
          <button 
            type="submit" 
            className="w-2/3 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-all text-sm"
          >
            Masuk Sekarang
          </button>
        </div>
      </form>

      {/* Footer Logis: Link 'Daftar' Hanya Muncul Khusus Peran Siswa/Orang Tua */}
      <div className="text-center text-xs text-slate-500 pt-1">
        {role === "ortu" ? (
          <>
            Belum punya akun?{" "}
            <Link href="/daftar" className="text-teal-600 font-semibold hover:underline">
              Daftar di sini
            </Link>
          </>
        ) : (
          <span className="text-slate-400 italic">
            Akses portal khusus internal Cikgu & System Developer
          </span>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="h-screen bg-slate-200 flex flex-col overflow-hidden">
      <Navbar />
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-4">
        <Suspense fallback={<div className="text-sm text-slate-600">Memuat portal login...</div>}>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}