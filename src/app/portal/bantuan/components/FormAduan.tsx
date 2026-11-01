"use client";
import { useState } from "react";

interface FormAduanProps {
  onSuccess: () => void;
}

export default function FormAduan({ onSuccess }: FormAduanProps) {
  const [pesanKendala, setPesanKendala] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmitPesan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesanKendala.trim()) {
      alert("Silakan ketik kendala atau pertanyaan Anda terlebih dahulu!");
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmKirim = () => {
    setShowConfirmModal(false);
    alert("Tiket kendala berhasil dikirim ke Cikgu! Anda dapat melihat statusnya di tab Riwayat Aduan.");
    setPesanKendala("");
    onSuccess(); // Otomatis pindah ke tab Riwayat setelah berhasil kirim
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
        <div className="p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-800 text-sm">Kirim Pertanyaan / Kendala</h2>
          <p className="text-xs text-slate-500 mt-0.5">Tuliskan kendala teknis atau pertanyaan materi yang ingin kamu tanyakan.</p>
        </div>
        <form onSubmit={handleSubmitPesan} className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Pesan / Deskripsi Kendala</label>
            <textarea 
              rows={4} 
              value={pesanKendala} 
              onChange={(e) => setPesanKendala(e.target.value)} 
              placeholder="Cth: Cikgu, saya kesulitan memasukkan token presisi hari ini..." 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" 
            />
          </div>
          <div className="pt-2 flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer">
              Kirim Aduan
            </button>
          </div>
        </form>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl mx-auto">?</div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Konfirmasi Kirim Aduan</h3>
              <p className="text-xs text-slate-500">Apakah isi aduan atau pertanyaan yang ingin kamu kirim sudah benar?</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowConfirmModal(false)} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">Batal</button>
              <button type="button" onClick={confirmKirim} className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md">Ya, Kirim</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}