"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import PasswordInput from "../../../components/PasswordInput";

const ROLE_CONFIGS = {
  ortu: {
    title: "Portal Peserta & Orang Tua",
    badge: "Peserta / Orang Tua",
    badgeBg: "bg-teal-100 text-teal-800",
    redirectUrl: "/portal",
  },
  pengajar: {
    title: "Portal Pengajar Cikgu",
    badge: "Pengajar (Cikgu)",
    badgeBg: "bg-amber-100 text-amber-800",
    redirectUrl: "/admin",
  },
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeRole = searchParams.get("role") === "pengajar" ? "pengajar" : "ortu";
  const currentRole = ROLE_CONFIGS[activeRole];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLupaSandi = () => {
    alert(
      activeRole === "ortu"
        ? "Fitur Reset Sandi: Silakan hubungi Pengajar (Cikgu) via WhatsApp untuk bantuan reset kata sandi."
        : "Akun Pengajar: Gunakan fitur Reset Password di Dashboard Supabase Authentication."
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (authError || !authData.user) {
      setIsLoading(false);
      return setErrorMsg("Email atau kata sandi salah. Silakan periksa kembali.");
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, status_akun")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      setIsLoading(false);
      return setErrorMsg("Data profil akun tidak ditemukan di sistem.");
    }

    if (activeRole === "pengajar" && profile.role !== "admin") {
      await supabase.auth.signOut();
      setIsLoading(false);
      return setErrorMsg("Akses ditolak: Akun ini terdaftar sebagai Peserta, bukan Pengajar.");
    }

    if (activeRole === "ortu" && profile.role !== "siswa") {
      await supabase.auth.signOut();
      setIsLoading(false);
      return setErrorMsg("Akun Pengajar silakan masuk melalui menu Login > Pengajar (Cikgu).");
    }

    if (profile.role === "siswa" && profile.status_akun !== "Dikonfirmasi") {
      await supabase.auth.signOut();
      setIsLoading(false);
      return setErrorMsg(
        profile.status_akun === "Batal"
          ? "Pendaftaran akun Anda dibatalkan. Silakan hubungi Cikgu untuk informasi lebih lanjut."
          : "Akun Anda sedang menunggu konfirmasi dari Pengajar (Cikgu). Silakan coba lagi setelah disetujui."
      );
    }

    setIsLoading(false);
    router.push(currentRole.redirectUrl);
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-6">
      <div className="text-center space-y-2">
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${currentRole.badgeBg}`}>
          {currentRole.badge}
        </span>
        <h1 className="text-2xl font-bold text-slate-800">{currentRole.title}</h1>
        <p className="text-sm text-slate-600">Masukkan akun terdaftar untuk mengakses layanan.</p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium leading-relaxed">
          {errorMsg}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Alamat Email Terdaftar</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Contoh: user@email.com"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-slate-700">Kata Sandi (Password)</label>
            <button type="button" onClick={handleLupaSandi} className="text-[11px] text-teal-600 hover:underline font-medium cursor-pointer">
              Lupa kata sandi?
            </button>
          </div>
          <PasswordInput
            value={password}
            onChange={setPassword}
            className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link href="/" className="w-1/3 py-2.5 bg-red-700 border-slate-200 hover:bg-red-800 text-slate-200 font-semibold rounded-lg text-center transition-all text-sm shadow-xs">
            Batal
          </Link>
          <button type="submit" disabled={isLoading} className="w-2/3 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-lg shadow-md transition-all text-sm cursor-pointer">
            {isLoading ? "Memeriksa..." : "Masuk Sekarang"}
          </button>
        </div>
      </form>

      <div className="text-center text-xs text-slate-500 pt-1">
        {activeRole === "ortu" ? (
          <>Belum punya akun? <Link href="/daftar" className="text-teal-600 font-semibold hover:underline">Daftar di sini</Link></>
        ) : (
          <span className="text-slate-400 italic">Akses portal khusus internal Cikgu & System Developer</span>
        )}
      </div>
    </div>
  );
}