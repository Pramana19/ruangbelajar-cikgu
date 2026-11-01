"use client";

import { useState } from "react";

export default function EditProfilForm() {
  const [namaAnak, setNamaAnak] = useState("Siti Rahma");
  const [namaOrtu, setNamaOrtu] = useState("Dewi Lestari");
  const [kelas, setKelas] = useState("Kelas 1 SD");
  const [whatsapp, setWhatsapp] = useState("081987654321");
  const [email, setEmail] = useState("dewi.lestari@email.com");
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSimpanClick = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true); // Munculkan pop-up konfirmasi dulu
  };

  const confirmSave = () => {
    setShowConfirmModal(false);
    alert("Perubahan profil berhasil disimpan secara permanen!");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h2 className="font-bold text-slate-800">Informasi Data Diri</h2>
      </div>
      
      <form onSubmit={handleSimpanClick} className="p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-4 mb-2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold border-2 border-purple-200">
              SR
            </div>
            <button type="button" className="absolute bottom-0 right-0 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-slate-700 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Foto Profil</p>
            <p className="text-[11px] text-slate-500">Format JPG/PNG. Maks 2 MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Nama Anak</label>
            <input type="text" value={namaAnak} onChange={(e) => setNamaAnak(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Jenjang Kelas</label>
            <select value={kelas} onChange={(e) => setKelas(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Kelas 1 SD</option>
              <option>Kelas 2 SD</option>
              <option>Kelas 3 SD</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Nama Orang Tua</label>
            <input type="text" value={namaOrtu} onChange={(e) => setNamaOrtu(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Nomor WhatsApp</label>
            <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Alamat Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm cursor-pointer">
            Simpan Perubahan
          </button>
        </div>
      </form>

      {/* Modal Pop-up Konfirmasi Simpan Data */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl mx-auto">
              ?
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Konfirmasi Data Profil</h3>
              <p className="text-xs text-slate-500">Apakah data yang kamu masukkan sudah benar dan sesuai?</p>
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
                onClick={confirmSave}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md"
              >
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}