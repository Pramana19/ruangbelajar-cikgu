"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { sanitizeNama, sanitizeWa, isNamaValid, isEmailValid, isWaValid, evaluatePassword } from "../utils/daftarValidation";
import PasswordStrengthBox from "./PasswordStrengthBox";

const INPUT_CLASS = "w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50";

export default function DaftarForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    namaLengkap: "", jenisKelamin: "", kelas: "", namaOrtu: "", email: "", noWa: "", password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const updateField = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const emailOk = isEmailValid(form.email);
  const waOk = isWaValid(form.noWa);
  const { isPasswordValid } = evaluatePassword(form.password);

  const isFormValid =
    isNamaValid(form.namaLengkap) && Boolean(form.jenisKelamin) && Boolean(form.kelas) &&
    isNamaValid(form.namaOrtu) && emailOk && waOk && isPasswordValid;

  const handleDaftar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setErrorMsg(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email.trim().toLowerCase(),
      password: form.password,
      options: {
        data: {
          nama_lengkap: form.namaLengkap.trim(),
          role: "siswa",
          kelas: `Kelas ${form.kelas} SD`,
          no_wa: form.noWa,
          nama_ortu: form.namaOrtu.trim(),
          jenis_kelamin: form.jenisKelamin,
          status_akun: "Menunggu",
        },
      },
    });

    setIsLoading(false);
    if (error) return setErrorMsg(error.message);

    alert("Pendaftaran berhasil! Silakan masuk menggunakan email dan kata sandi yang baru dibuat.");
    router.push("/login?role=ortu");
  };

  return (
    <div className="max-w-3xl w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-slate-800">Pendaftaran Peserta Baru</h1>
        <p className="text-xs text-slate-600">Silakan isi data anak dan orang tua untuk bergabung dengan les privat Cikgu.</p>
      </div>

      {errorMsg && <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">{errorMsg}</div>}

      <form onSubmit={handleDaftar} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Nama Lengkap Anak</label>
              <input type="text" value={form.namaLengkap} onChange={(e) => updateField("namaLengkap", sanitizeNama(e.target.value))} maxLength={60} placeholder="Contoh: Budi Santoso" className={INPUT_CLASS} required />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Jenis Kelamin Anak</label>
              <div className="flex items-center gap-6 px-1 py-1">
                {["Laki-laki", "Perempuan"].map((jk) => (
                  <label key={jk} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="radio" name="jenisKelamin" value={jk} checked={form.jenisKelamin === jk} onChange={(e) => updateField("jenisKelamin", e.target.value)} className="peer sr-only" />
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 peer-checked:border-teal-600 peer-checked:bg-white transition-colors"></div>
                      <div className="absolute w-2 h-2 rounded-full bg-teal-600 scale-0 peer-checked:scale-100 transition-transform"></div>
                    </div>
                    <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{jk}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Jenjang Kelas SD</label>
              <select value={form.kelas} onChange={(e) => updateField("kelas", e.target.value)} className={INPUT_CLASS} required>
                <option value="">Pilih Kelas</option>
                <option value="1">Kelas 1 SD</option>
                <option value="2">Kelas 2 SD</option>
                <option value="3">Kelas 3 SD</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Nama Lengkap Orang Tua / Wali</label>
              <input type="text" value={form.namaOrtu} onChange={(e) => updateField("namaOrtu", sanitizeNama(e.target.value))} maxLength={60} placeholder="Contoh: Dewi Lestari" className={INPUT_CLASS} required />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Alamat Email Orang Tua</label>
              <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value.replace(/\s/g, ""))} maxLength={100} placeholder="Contoh: orangtua@email.com" className={INPUT_CLASS} required />
              {form.email.length > 0 && !emailOk && <p className="text-[11px] text-red-600 mt-1">Format email belum valid (contoh: nama@email.com)</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Nomor WhatsApp Orang Tua</label>
              <input type="tel" inputMode="numeric" value={form.noWa} onChange={(e) => updateField("noWa", sanitizeWa(e.target.value))} maxLength={14} placeholder="Contoh: 081234567890" className={INPUT_CLASS} required />
              {form.noWa.length > 0 && !waOk && <p className="text-[11px] text-red-600 mt-1">Gunakan angka awalan 08 / 628 (10–14 digit)</p>}
            </div>

            <PasswordStrengthBox password={form.password} onChange={(val) => updateField("password", val)} />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Link href="/" className="w-1/3 py-2.5 bg-red-700 hover:bg-red-800 text-slate-200 font-semibold rounded-lg text-center transition-all text-sm shadow-xs">Batal</Link>
          <button type="submit" disabled={!isFormValid || isLoading} className={`w-2/3 py-2.5 font-semibold rounded-lg transition-all text-sm ${isFormValid && !isLoading ? "bg-teal-600 hover:bg-teal-700 text-white shadow-md cursor-pointer" : "bg-slate-300 text-slate-500 cursor-not-allowed"}`}>
            {isLoading ? "Mendaftarkan..." : "Kirim Pendaftaran"}
          </button>
        </div>
      </form>

      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Sudah punya akun? <Link href="/login?role=ortu" className="text-teal-600 font-semibold hover:underline">Login di sini</Link>
      </div>
    </div>
  );
}