"use client";

import { useState, useRef } from "react";

export default function FormUploadTugas() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSuccess(false);
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFile(null);
      setError("File melebihi ketentuan batas maksimal 5 MB!");
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    } else {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || error) return;
    setTimeout(() => {
      setIsSuccess(true);
      setFile(null);
      setError(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="font-bold text-slate-800">Formulir Pengumpulan</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Pilih Mata Pelajaran</label>
          <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Matematika Dasar & Calistung</option>
            <option>Bahasa Inggris Dasar</option>
            <option>Ilmu Pengetahuan Alam (IPA)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">File Tugas (Max: 5 MB)</label>
          <div className={`mt-1 border-2 border-dashed rounded-xl p-8 text-center transition-colors ${error ? 'border-red-300 bg-red-50' : file ? 'border-emerald-300 bg-emerald-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, application/pdf" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer" />
            {!file && !error && <p className="text-xs text-slate-400 mt-4 font-medium">Format yang didukung: JPG, PNG, atau PDF.</p>}
            {file && !error && <p className="text-xs text-emerald-600 mt-4 font-bold flex items-center justify-center gap-1">✓ File siap diunggah: {file.name}</p>}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-bold">{error}</p>
                <p className="text-xs mt-1 text-red-600 font-medium">File terlalu besar. Silakan kompres menggunakan layanan gratis di bawah ini:</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <a href="https://tinypng.com/" target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-[11px] font-extrabold border border-red-200 flex items-center gap-1">🖼️ Kompres Foto ↗</a>
                  <a href="https://www.ilovepdf.com/compress_pdf" target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-[11px] font-extrabold border border-red-200 flex items-center gap-1">📄 Kompres PDF ↗</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-700 flex items-center gap-2 font-bold">
            <span>🎉</span> Tugas berhasil diunggah!
          </div>
        )}

        <div className="pt-2 border-t border-slate-100">
          <button type="submit" disabled={!file || !!error} className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-sm font-bold rounded-xl shadow-sm">
            📤 Kirim Tugas
          </button>
        </div>
      </form>
    </div>
  );
}