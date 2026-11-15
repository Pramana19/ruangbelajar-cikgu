"use client";
import { useState, useEffect } from "react";
import { bacaFileLampiran, LampiranFile } from "@/lib/pesanStorage";
import { InstruksiTugas } from "@/lib/tugasStorage";

export default function TambahTugasModal({
  isOpen,
  onClose,
  onSimpanTugas,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSimpanTugas: (data: Omit<InstruksiTugas, "id" | "dibuatPada">, editId?: string) => void;
  initialData?: InstruksiTugas | null;
}) {
  const [mapel, setMapel] = useState("Matematika Dasar & Calistung");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tenggat, setTenggat] = useState("");
  const [linkReferensi, setLinkReferensi] = useState("");
  const [lampiranList, setLampiranList] = useState<LampiranFile[]>([]);

  useEffect(() => {
    if (initialData) {
      setMapel(initialData.mapel);
      setJudul(initialData.judul);
      setDeskripsi(initialData.deskripsi);
      setTenggat(initialData.tenggat === "Fleksibel" ? "" : initialData.tenggat);
      setLinkReferensi(initialData.linkReferensi || "");
      setLampiranList(initialData.lampiranList || []);
    } else {
      setMapel("Matematika Dasar & Calistung");
      setJudul("");
      setDeskripsi("");
      setTenggat("");
      setLinkReferensi("");
      setLampiranList([]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleTambahFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || lampiranList.length >= 2) return;
    const hasil = await bacaFileLampiran(file);
    if (hasil) setLampiranList((prev) => [...prev, hasil]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !deskripsi.trim()) return alert("Judul dan deskripsi soal wajib diisi!");
    onSimpanTugas(
      { mapel, judul: judul.trim(), deskripsi: deskripsi.trim(), tenggat: tenggat || "Fleksibel", linkReferensi: linkReferensi.trim(), lampiranList },
      initialData?.id
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base">{initialData ? "Edit Instruksi / Soal Tugas" : "Buat Instruksi / Soal Tugas Baru"}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran</label>
              <select value={mapel} onChange={(e) => setMapel(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
                <option>Matematika Dasar & Calistung</option>
                <option>Bahasa Inggris Dasar</option>
                <option>Ilmu Pengetahuan Alam (IPA)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Batas Waktu (Opsional)</label>
              <input type="date" value={tenggat} onChange={(e) => setTenggat(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Tugas</label>
            <input type="text" required value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Cth: Latihan Pecahan Sederhana" className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Daftar Soal / Instruksi Pengerjaan</label>
            <textarea rows={3} required value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder={"1. Hitunglah hasil dari...\n2. Jelaskan langkahnya..."} className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 resize-none" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Link Sumber Belajar / GDrive (Opsional)</label>
            <input type="url" value={linkReferensi} onChange={(e) => setLinkReferensi(e.target.value)} placeholder="https://drive.google.com/... atau link video/artikel referensi" className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50" />
          </div>

          <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Lampiran Soal ({lampiranList.length}/2 File, maks 2MB/file)</span>
              {lampiranList.length < 2 && (
                <label className="px-2.5 py-1 bg-teal-100 text-teal-800 font-bold rounded-lg cursor-pointer hover:bg-teal-200">
                  + Unggah File
                  <input type="file" accept="image/png,image/jpeg,application/pdf" onChange={handleTambahFile} className="hidden" />
                </label>
              )}
            </div>
            {lampiranList.map((f, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                <span className="truncate max-w-[260px] font-medium text-slate-700">📎 {f.nama}</span>
                <button type="button" onClick={() => setLampiranList((p) => p.filter((_, i) => i !== idx))} className="text-rose-600 font-bold cursor-pointer">Hapus</button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg cursor-pointer">Batal</button>
            <button type="submit" className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg cursor-pointer">
              {initialData ? "Perbarui Soal" : "Simpan & Terbitkan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}