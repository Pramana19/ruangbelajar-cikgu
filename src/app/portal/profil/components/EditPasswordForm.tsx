"use client";

import { useState } from "react";

export default function EditPasswordForm() {
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  
  // State untuk alur Lupa Password Lama & Pop-up Konfirmasi
  const [isLupaPasswordMode, setIsLupaPasswordMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Aksi jika ingat password lama
  const handleUbahPasswordClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordLama || !passwordBaru) {
      alert("Semua kolom harus diisi!");
      return;
    }
    if (passwordBaru.length < 8) {
      alert("Password baru minimal 8 karakter!");
      return;
    }
    setShowConfirmModal(true); // Munculkan pop-up konfirmasi yakin
  };

  const confirmUbahPassword = () => {
    setShowConfirmModal(false);
    alert("Password berhasil diperbarui dengan aman!");
    setPasswordLama("");
    setPasswordBaru("");
  };

  // Aksi jika lupa password lama (Kirim OTP Simulasi ke Email)
  const handleKirimOtp = () => {
    setOtpSent(true);
    alert("Kode verifikasi OTP reset password telah dikirim ke email terdaftar! (Simulasi)");
  };

  const handleVerifikasiOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || !passwordBaru) {
      alert("Masukkan kode OTP dan password baru!");
      return;
    }
    alert("Verifikasi OTP berhasil! Password akun Anda telah direset.");
    setIsLupaPasswordMode(false);
    setOtpSent(false);
    setOtpCode("");
    setPasswordBaru("");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h2 className="font-bold text-slate-800">Keamanan Akun</h2>
        <button
          type="button"
          onClick={() => {
            setIsLupaPasswordMode(!isLupaPasswordMode);
            setOtpSent(false);
            setPasswordLama("");
            setPasswordBaru("");
          }}
          className="text-xs font-semibold text-purple-600 hover:text-purple-700 underline cursor-pointer"
        >
          {isLupaPasswordMode ? "Kembali ke Ganti Password Normal" : "Lupa Password Lama?"}
        </button>
      </div>
      
      {!isLupaPasswordMode ? (
        /* MODE 1: Ingat Password Lama */
        <form onSubmit={handleUbahPasswordClick} className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Password Lama</label>
            <input type="password" required value={passwordLama} onChange={(e) => setPasswordLama(e.target.value)} placeholder="••••••••" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Password Baru</label>
            <input type="password" required value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} placeholder="Min. 8 karakter" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="pt-3">
            <button type="submit" className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-xs transition-colors shadow-sm cursor-pointer">
              Perbarui Password
            </button>
          </div>
        </form>
      ) : (
        /* MODE 2: Lupa Password Lama (Reset via Email OTP) */
        <form onSubmit={handleVerifikasiOtp} className="p-5 sm:p-6 space-y-4 bg-purple-50/30">
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-700 leading-relaxed">
            ℹ️ Karena Anda lupa password lama, kami akan mengirimkan kode verifikasi (OTP) ke email terdaftar Anda untuk mereset sandi.
          </div>

          {!otpSent ? (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleKirimOtp}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
              >
                Kirim Kode OTP ke Email
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Masukkan Kode OTP (6 Digit)</label>
                <input type="text" required maxLength={6} value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="Cth: 482910" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm tracking-widest font-mono bg-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Password Baru</label>
                <input type="password" required value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} placeholder="Min. 8 karakter" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm cursor-pointer">
                  Verifikasi & Ganti Password
                </button>
                <button type="button" onClick={() => setOtpSent(false)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer">
                  Kirim Ulang OTP
                </button>
              </div>
            </div>
          )}
        </form>
      )}

      {/* Modal Pop-up Konfirmasi Ganti Password Normal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl mx-auto">
              🔒
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Konfirmasi Keamanan</h3>
              <p className="text-xs text-slate-500">Apakah Anda yakin ingin memperbarui password akun Anda?</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={confirmUbahPassword}
                className="flex-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md"
              >
                Ya, Ubah Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}