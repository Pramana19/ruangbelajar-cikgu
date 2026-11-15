"use client";
import { useState } from "react";
import { bacaFileLampiran, LampiranFile } from "@/lib/pesanStorage";

export default function FormAduan({ onSuccess }: { onSuccess: (pesanBaru: string, lampiran?: LampiranFile | null) => void }) {
  const [pesanKendala, setPesanKendala] = useState("");
  const [lampiran, setLampiran] = useState<LampiranFile | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmitPesan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesanKendala.trim()) return alert("Silakan ketik kendala atau pertanyaan Anda terlebih dahulu!");
    setShowConfirmModal(true);
  };

  const confirmKirim = () => {
    const teks = pesanKendala.trim();
    const file = lampiran;
    setShowConfirmModal(false);
    setPesanKendala("");
    setLampiran(null);
    onSuccess(teks, file);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
        <div className="p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-800 text-sm">Kirim Pertanyaan / Kendala</h2>
          <p className="text-xs text-slate-500 mt-0.5">Tuliskan kendala atau unggah screenshot jika bingung menjelaskannya.</p>
        </div>
        <form onSubmit={handleSubmitPesan} className="p-5 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <textarea
              rows={4}
              value={pesanKendala}
              onChange={(e) => setPesanKendala(e.target.value)}
              placeholder="Cth: Cikgu, saya kesulitan memasukkan token presisi hari ini..."
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
            <div className="flex items-center justify-between text-xs bg-slate-50 px-3 py-2.5 rounded-xl border border-dashed border-slate-300">
              <label className="cursor-pointer font-semibold text-slate-600 hover:text-purple-700">
                📎 {lampiran ? lampiran.nama : "Unggah Screenshot / File (Opsional, maks 2MB)"}
                <input type="file" accept="image/png,image/jpeg,application/pdf" onChange={async (e) => e.target.files?.[0] && setLampiran(await bacaFileLampiran(e.target.files[0]))} className="hidden" />
              </label>
              {lampiran && <button type="button" onClick={() => setLampiran(null)} className="text-rose-600 font-bold cursor-pointer">Hapus</button>}
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm">
              Kirim Aduan
            </button>
          </div>
        </form>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg mx-auto">?</div>
            <h3 className="font-bold text-slate-900 text-base">Konfirmasi Kirim Aduan</h3>
            <p className="text-xs text-slate-500">Apakah isi pertanyaan dan lampiran sudah benar?</p>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowConfirmModal(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">Batal</button>
              <button type="button" onClick={confirmKirim} className="flex-1 px-4 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs cursor-pointer">Ya, Kirim</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}