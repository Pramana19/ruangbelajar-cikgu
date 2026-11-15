"use client";
import { useState } from "react";
import { bacaFileLampiran, LampiranFile, PesanTicket } from "@/lib/pesanStorage";
import LampiranPreview from "@/components/LampiranPreview";

export default function BalasPesanModal({
  ticket,
  onClose,
  onSubmit,
}: {
  ticket: PesanTicket;
  onClose: () => void;
  onSubmit: (id: string, text: string, lampiran?: LampiranFile | null) => void;
}) {
  const [balasan, setBalasan] = useState("");
  const [lampiran, setLampiran] = useState<LampiranFile | null>(null);

  const threadList = ticket.thread?.length
    ? ticket.thread
    : [{ id: "init", pengirim: ticket.arah === "Keluar" ? ("Cikgu" as const) : ("Siswa" as const), namaPengirim: ticket.siswa, waktu: ticket.tanggal, teks: ticket.pesan, lampiran: ticket.lampiran, isRead: true }];

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!balasan.trim()) return alert("Isi balasan tidak boleh kosong!");
    onSubmit(ticket.id, balasan.trim(), lampiran);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Ruang Diskusi • {ticket.siswa}</h3>
            <p className="text-[11px] text-slate-400">{ticket.id} • {ticket.kelas}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">✕</button>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          {threadList.map((chat) => {
            const isAdmin = chat.pengirim === "Cikgu";
            return (
              <div key={chat.id} className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-2xs ${isAdmin ? "bg-teal-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"}`}>
                  <p className={`text-[10px] font-bold mb-0.5 ${isAdmin ? "text-teal-100" : "text-slate-400"}`}>
                    {chat.namaPengirim} • {chat.waktu}
                  </p>
                  <p className="leading-relaxed whitespace-pre-line">{chat.teks}</p>
                  <LampiranPreview lampiran={chat.lampiran} />
                  {isAdmin && (
                    <div className="text-right mt-1">
                      <span className={`text-[11px] font-extrabold ${chat.isRead ? "text-sky-200" : "text-teal-200/70"}`} title={chat.isRead ? "Dibaca Siswa" : "Terkirim"}>
                        ✓✓
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSimpan} className="space-y-3">
          <textarea
            rows={3}
            value={balasan}
            onChange={(e) => setBalasan(e.target.value)}
            placeholder="Ketik balasan lanjutan (atau tutup langsung jika sudah cukup dibaca)..."
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
          <div className="flex items-center justify-between text-xs bg-slate-50 px-3 py-2 rounded-lg border border-dashed border-slate-300">
            <label className="cursor-pointer font-semibold text-slate-600 hover:text-teal-700">
              📎 {lampiran ? lampiran.nama : "Lampirkan Gambar / PDF (Opsional)"}
              <input type="file" accept="image/png,image/jpeg,application/pdf" onChange={async (e) => e.target.files?.[0] && setLampiran(await bacaFileLampiran(e.target.files[0]))} className="hidden" />
            </label>
            {lampiran && <button type="button" onClick={() => setLampiran(null)} className="text-rose-600 font-bold cursor-pointer">Hapus</button>}
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">Tutup</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md">📤 Kirim Balasan</button>
          </div>
        </form>
      </div>
    </div>
  );
}