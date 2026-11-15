"use client";
import { useState } from "react";
import { bacaFileLampiran, LampiranFile, PesanTicket } from "@/lib/pesanStorage";
import LampiranPreview from "@/components/LampiranPreview";

export default function RiwayatAduan({
  riwayatAduan,
  onBalasLanjutan,
  onHapusRiwayat,
}: {
  riwayatAduan: PesanTicket[];
  onBalasLanjutan: (ticketId: string, teks: string, lampiran?: LampiranFile | null) => void;
  onHapusRiwayat: (ticketId: string) => void;
}) {
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyFile, setReplyFile] = useState<Record<string, LampiranFile | null>>({});

  if (riwayatAduan.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="text-4xl mb-3">📝</div>
        <h3 className="font-bold text-slate-700 text-sm">Belum ada riwayat diskusi</h3>
      </div>
    );
  }

  const handleKirim = (id: string) => {
    const teks = (replyText[id] || "").trim();
    if (!teks) return alert("Ketik pesan balasan terlebih dahulu!");
    onBalasLanjutan(id, teks, replyFile[id] || null);
    setReplyText((prev) => ({ ...prev, [id]: "" }));
    setReplyFile((prev) => ({ ...prev, [id]: null }));
  };

  return (
    <div className="space-y-4">
      {riwayatAduan.map((item) => {
        const thread = item.thread?.length
          ? item.thread
          : [{ id: "init", pengirim: item.arah === "Keluar" ? ("Cikgu" as const) : ("Siswa" as const), namaPengirim: item.arah === "Keluar" ? "Cikgu Admin" : item.siswa, waktu: item.tanggal, teks: item.pesan, lampiran: item.lampiran, isRead: true }];

        return (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-xs font-bold text-slate-500">{item.id} • {item.tanggal}</div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  item.status === "Selesai" ? "bg-emerald-100 text-emerald-800" :
                  item.status === "Dibaca" ? "bg-sky-100 text-sky-800" :
                  "bg-rose-100 text-rose-800"
                }`}>
                  {item.status === "Selesai" ? "Sudah Dijawab" : item.status === "Dibaca" ? "Dibaca Cikgu" : "Menunggu Balasan"}
                </span>
                <button
                  type="button"
                  onClick={() => confirm("Hapus riwayat diskusi ini dari tampilan Anda?") && onHapusRiwayat(item.id)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs cursor-pointer"
                  title="Hapus riwayat diskusi"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {thread.map((c) => {
                const isMe = c.pengirim === "Siswa";
                return (
                  <div key={c.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${isMe ? "bg-purple-600 text-white rounded-br-none" : "bg-white border border-purple-200 text-slate-800 rounded-bl-none"}`}>
                      <p className={`text-[10px] font-bold mb-0.5 ${isMe ? "text-purple-200" : "text-purple-700"}`}>{c.namaPengirim} • {c.waktu}</p>
                      <p className="leading-relaxed whitespace-pre-line">{c.teks}</p>
                      <LampiranPreview lampiran={c.lampiran} />
                      {isMe && (
                        <div className="text-right mt-1">
                          <span className={`text-[11px] font-extrabold ${c.isRead ? "text-sky-300" : "text-purple-300/70"}`}>✓✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="text"
                value={replyText[item.id] || ""}
                onChange={(e) => setReplyText((prev) => ({ ...prev, [item.id]: e.target.value }))}
                placeholder="Ketik balasan lanjutan ke Cikgu..."
                className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-600 cursor-pointer text-center">
                📎 {replyFile[item.id] ? "1 File" : "Foto/PDF"}
                <input type="file" accept="image/png,image/jpeg,application/pdf" onChange={async (e) => e.target.files?.[0] && bacaFileLampiran(e.target.files[0]).then((f) => setReplyFile((prev) => ({ ...prev, [item.id]: f })))} className="hidden" />
              </label>
              <button type="button" onClick={() => handleKirim(item.id)} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs cursor-pointer">
                Kirim
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}