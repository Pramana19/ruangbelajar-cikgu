"use client";

import { useState, useRef } from "react";
import { PendingTicket } from "./TicketQueue";

export default function FormUploadMateri({
  ticket,
  onCancel,
  onSubmitSuccess,
}: {
  ticket: PendingTicket;
  onCancel: () => void;
  onSubmitSuccess: () => void;
}) {
  const [tipeMateri, setTipeMateri] = useState<"Video" | "PDF">("Video");
  const [judul, setJudul] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errorFile, setErrorFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFile(null);
      setErrorFile("Ukuran file PDF melebihi batas 5 MB!");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setFile(selectedFile);
      setErrorFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tipeMateri === "PDF" && (!file || errorFile)) return;
    if (tipeMateri === "Video" && !urlVideo) return;
    
    // Simulasi simpan data
    setTimeout(() => {
      onSubmitSuccess();
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl border border-teal-200 shadow-md overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
      
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-teal-50/50 pl-6">
        <div>
          <h2 className="font-bold text-slate-800">Upload Materi Kelas</h2>
          <p className="text-xs text-slate-500 mt-0.5">{ticket.namaKelas} • {ticket.mapel}</p>
        </div>
        <button onClick={onCancel} className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
          Batal & Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 pl-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Judul Materi</label>
            <input type="text" required value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Contoh: Modul MTK Bab 1" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Jenis Format Materi</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="tipeMateri" value="Video" checked={tipeMateri === "Video"} onChange={() => setTipeMateri("Video")} className="text-teal-600 focus:ring-teal-500" />
                <span className="text-sm font-semibold text-slate-700">Link Video YouTube</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="tipeMateri" value="PDF" checked={tipeMateri === "PDF"} onChange={() => setTipeMateri("PDF")} className="text-teal-600 focus:ring-teal-500" />
                <span className="text-sm font-semibold text-slate-700">Dokumen PDF</span>
              </label>
            </div>
          </div>

          {tipeMateri === "Video" ? (
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">URL Link YouTube</label>
              <input type="url" required value={urlVideo} onChange={(e) => setUrlVideo(e.target.value)} placeholder="Contoh: https://www.youtube.com/watch?v=..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <p className="text-[10px] text-slate-400 mt-1">Sistem akan otomatis mengubah link menjadi tampilan video (embed) di portal siswa.</p>
            </div>
          ) : (
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">File Modul PDF (Maks: 5 MB)</label>
              <div className={`mt-1 border-2 border-dashed rounded-xl p-6 text-center transition-colors ${errorFile ? 'border-red-300 bg-red-50' : file ? 'border-emerald-300 bg-emerald-50' : 'border-slate-300 bg-slate-50'}`}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 cursor-pointer" />
                {errorFile && <p className="text-xs font-bold text-red-600 mt-3 flex items-center justify-center gap-1">⚠️ {errorFile}</p>}
                {file && !errorFile && <p className="text-xs text-emerald-600 mt-3 font-bold">✓ Siap diunggah: {file.name}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button type="submit" disabled={tipeMateri === "PDF" && (!file || !!errorFile)} className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-sm">
            Simpan & Distribusikan Materi
          </button>
        </div>
      </form>
    </div>
  );
}