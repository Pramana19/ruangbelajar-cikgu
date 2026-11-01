"use client";
import { useState } from "react";

export default function BalasPesanModal({ ticket, onClose, onSubmit }: { ticket: any, onClose: () => void, onSubmit: (id: string, text: string) => void }) {
  const [balasan, setBalasan] = useState(ticket.balasan || "");

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!balasan.trim()) {
      alert("Isi balasan tidak boleh kosong!");
      return;
    }
    onSubmit(ticket.id, balasan);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-base">Tindak Lanjut Aduan</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">✕</button>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pesan dari {ticket.siswa}</p>
            <p className="text-sm text-slate-700">{ticket.pesan}</p>
          </div>

          <form onSubmit={handleSimpan} className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Ketik Balasan Anda</label>
            <textarea
              rows={4}
              value={balasan}
              onChange={(e) => setBalasan(e.target.value)}
              placeholder="Halo, terkait kendala tersebut..."
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer">
                Batal
              </button>
              <button type="submit" className="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md">
                {ticket.status === "Selesai" ? "Perbarui Balasan" : "Kirim & Selesaikan"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}