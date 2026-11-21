"use client";
import { useState } from "react";
import { bacaFileLampiran, LampiranFile } from "@/lib/pesanStorage";
import { PengumpulanTugas } from "@/lib/tugasStorage";
import LampiranPreview from "@/components/LampiranPreview";

export default function RiwayatTugasList({
  submissions,
  onUpdateJawaban,
  onHapusRiwayatSiswa,
  isLocked = false,
}: {
  submissions: PengumpulanTugas[];
  onUpdateJawaban: (id: string, jawabanTeks: string, linkJawaban: string, fileLampiran?: LampiranFile | null) => void;
  onHapusRiwayatSiswa: (id: string) => void;
  isLocked?: boolean;
}) {
  const [editItem, setEditItem] = useState<PengumpulanTugas | null>(null);
  const [teksEdit, setTeksEdit] = useState("");
  const [linkEdit, setLinkEdit] = useState("");
  const [fileEdit, setFileEdit] = useState<LampiranFile | null>(null);

  const bukaFormEdit = (item: PengumpulanTugas) => {
    if (isLocked) return;
    setEditItem(item);
    setTeksEdit(item.jawabanTeks || "");
    setLinkEdit(item.linkJawaban || "");
    setFileEdit(item.fileLampiran || null);
  };

  const simpanPerubahan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    if (!teksEdit.trim() && !linkEdit.trim() && !fileEdit) return alert("Isi minimal teks, link Google Drive, atau file!");
    onUpdateJawaban(editItem.id, teksEdit.trim(), linkEdit.trim(), fileEdit);
    setEditItem(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h2 className="font-bold text-slate-800 text-sm">Riwayat & Hasil Penilaian ({submissions.length})</h2>
        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold uppercase">Terbaru</span>
      </div>

      <div className="divide-y divide-slate-100">
        {submissions.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">Belum ada riwayat tugas yang ditampilkan.</div>
        ) : (
          submissions.map((item) => {
            const terkunciFinal = item.status === "Sudah Dinilai";
            const butuhRevisi = item.status === "Perlu Revisi";

            return (
              <div key={item.id} className="p-4 sm:p-5 space-y-2.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.judulTugas}</p>
                    <p className="text-[11px] text-slate-500">{item.mapel} • {item.waktuKumpul}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full whitespace-nowrap ${
                      terkunciFinal ? "bg-emerald-100 text-emerald-700" :
                      butuhRevisi ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
                    }`}>
                      {item.status} {item.nilai ? `• Nilai: ${item.nilai}` : ""}
                    </span>
                    {!isLocked && (!terkunciFinal ? (
                      <button
                        type="button"
                        onClick={() => bukaFormEdit(item)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                          butuhRevisi ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                        }`}
                      >
                        {butuhRevisi ? "🔄 Kirim Revisi" : "✏️ Edit"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => confirm("Hapus riwayat tugas yang sudah dinilai ini dari tampilan Anda?") && onHapusRiwayatSiswa(item.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs cursor-pointer"
                        title="Hapus dari riwayat tampilan"
                      >
                        🗑️
                      </button>
                    ))}
                  </div>
                </div>

                {item.jawabanTeks && (
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-line">{item.jawabanTeks}</p>
                )}
                {item.linkJawaban && (
                  <a href={item.linkJawaban} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg font-bold text-[11px] hover:bg-indigo-100">
                    🔗 Tautan Jawaban GDrive ↗
                  </a>
                )}
                <LampiranPreview lampiran={item.fileLampiran} />

                {item.catatanCikgu && (
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-xs text-purple-900">
                    <span className="font-bold">Catatan Cikgu: </span>{item.catatanCikgu}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {editItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={simpanPerubahan} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-3.5 text-xs">
            <h3 className="font-bold text-slate-900 text-base border-b pb-2">
              {editItem.status === "Perlu Revisi" ? "Kirim Revisi Tugas" : "Edit Jawaban Tugas"} • {editItem.judulTugas}
            </h3>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Jawaban Teks</label>
              <textarea rows={3} value={teksEdit} onChange={(e) => setTeksEdit(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 resize-none" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Link Google Drive Jawaban (Opsional)</label>
              <input type="url" value={linkEdit} onChange={(e) => setLinkEdit(e.target.value)} placeholder="https://drive.google.com/..." className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50" />
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-dashed border-slate-300">
              <label className="cursor-pointer font-semibold text-slate-600 hover:text-purple-700">
                📎 {fileEdit ? fileEdit.nama : "Ganti / Tambah File Foto/PDF (Opsional)"}
                <input type="file" accept="image/png,image/jpeg,application/pdf" onChange={async (e) => e.target.files?.[0] && setFileEdit(await bacaFileLampiran(e.target.files[0]))} className="hidden" />
              </label>
              {fileEdit && <button type="button" onClick={() => setFileEdit(null)} className="text-rose-600 font-bold cursor-pointer">Hapus</button>}
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setEditItem(null)} className="flex-1 py-2 bg-slate-100 font-bold rounded-lg cursor-pointer">Batal</button>
              <button type="submit" className="flex-1 py-2 bg-purple-600 text-white font-bold rounded-lg cursor-pointer">Simpan & Kirim Ulang</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}