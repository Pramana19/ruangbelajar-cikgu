"use client";
import { useState } from "react";
import { InstruksiTugas, PengumpulanTugas } from "@/lib/tugasStorage";
import LampiranPreview from "@/components/LampiranPreview";
import TambahTugasModal from "./TambahTugasModal";

export default function AdminTugasTab({
  instruksiList,
  submissions,
  onSimpanInstruksi,
  onHapusInstruksi,
  onSimpanKoreksi,
  onHapusSubmission,
  onBersihkanSudahDinilai,
}: {
  instruksiList: InstruksiTugas[];
  submissions: PengumpulanTugas[];
  onSimpanInstruksi: (data: Omit<InstruksiTugas, "id" | "dibuatPada">, editId?: string) => void;
  onHapusInstruksi: (id: string) => void;
  onSimpanKoreksi: (id: string, status: "Sudah Dinilai" | "Perlu Revisi", nilai: string, catatan: string) => void;
  onHapusSubmission: (id: string) => void;
  onBersihkanSudahDinilai: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTugas, setEditingTugas] = useState<InstruksiTugas | null>(null);
  const [koreksiItem, setKoreksiItem] = useState<PengumpulanTugas | null>(null);
  const [nilai, setNilai] = useState("");
  const [catatan, setCatatan] = useState("");
  const [statusKoreksi, setStatusKoreksi] = useState<"Sudah Dinilai" | "Perlu Revisi">("Sudah Dinilai");

  const jumlahSudahDinilai = submissions.filter((s) => s.status === "Sudah Dinilai").length;

  const bukaModalKoreksi = (sub: PengumpulanTugas) => {
    setKoreksiItem(sub);
    setNilai(sub.nilai || "");
    setCatatan(sub.catatanCikgu || "");
    setStatusKoreksi(sub.status === "Perlu Revisi" ? "Perlu Revisi" : "Sudah Dinilai");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-800 text-base">Daftar Instruksi & Soal Tugas ({instruksiList.length})</h2>
            <p className="text-xs text-slate-500">Klik ikon pensil untuk mengedit soal, link sumber belajar, atau lampiran tugas.</p>
          </div>
          <button type="button" onClick={() => { setEditingTugas(null); setIsModalOpen(true); }} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs cursor-pointer">
            + Buat Tugas Baru
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {instruksiList.map((tgs) => (
            <div key={tgs.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold">{tgs.mapel}</span>
                  <div className="flex items-center gap-1.5">
                    <button type="button" onClick={() => { setEditingTugas(tgs); setIsModalOpen(true); }} className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded text-[11px] font-bold cursor-pointer">✏️ Edit</button>
                    <button type="button" onClick={() => confirm(`Hapus instruksi tugas "${tgs.judul}"?`) && onHapusInstruksi(tgs.id)} className="px-2 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded text-[11px] cursor-pointer">🗑️</button>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-1.5">{tgs.judul}</h3>
                <p className="text-xs text-slate-600 whitespace-pre-line mt-1 leading-relaxed">{tgs.deskripsi}</p>
                {tgs.linkReferensi && (
                  <a href={tgs.linkReferensi} target="_blank" rel="noreferrer" className="inline-block mt-2 text-[11px] font-bold text-indigo-600 hover:underline">
                    🔗 Buka Sumber Belajar / Referensi ↗
                  </a>
                )}
                <div className="flex flex-wrap gap-2">
                  {tgs.lampiranList?.map((file, idx) => <LampiranPreview key={idx} lampiran={file} />)}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-200/70">Tenggat: {tgs.tenggat}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold text-slate-800 text-sm">Antrian Pengumpulan & Koreksi Jawaban ({submissions.length})</h2>
          {jumlahSudahDinilai > 0 && (
            <button
              type="button"
              onClick={() => confirm(`Bersihkan ${jumlahSudahDinilai} tugas berstatus 'Sudah Dinilai' untuk persiapan semester baru?`) && onBersihkanSudahDinilai()}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-lg text-xs cursor-pointer"
            >
              🧹 Bersihkan Sudah Dinilai ({jumlahSudahDinilai})
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-gradient-to-r from-indigo-700 to-cyan-600 text-white uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Siswa & Waktu</th>
                <th className="py-3.5 px-4">Tugas & Mapel</th>
                <th className="py-3.5 px-4">Jawaban Teks, Link & Lampiran</th>
                <th className="py-3.5 px-4">Status & Nilai</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {submissions.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-400">Belum ada tugas yang dikumpulkan siswa.</td></tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 align-top">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{sub.siswa}</div>
                      <div className="text-[11px] text-slate-400">{sub.kelas} • {sub.waktuKumpul}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{sub.judulTugas}</div>
                      <div className="text-[11px] text-teal-600">{sub.mapel}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs space-y-1.5">
                      {sub.jawabanTeks && <p className="text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 whitespace-pre-line">{sub.jawabanTeks}</p>}
                      {sub.linkJawaban && (
                        <a href={sub.linkJawaban} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg font-bold text-[11px] hover:bg-indigo-100">
                          🔗 Buka Link Jawaban GDrive ↗
                        </a>
                      )}
                      <LampiranPreview lampiran={sub.fileLampiran} />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.status === "Sudah Dinilai" ? "bg-emerald-100 text-emerald-800" :
                        sub.status === "Perlu Revisi" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                      }`}>
                        {sub.status} {sub.nilai ? `(${sub.nilai})` : ""}
                      </span>
                      {sub.catatanCikgu && <p className="text-[11px] text-slate-500 mt-1 italic">"{sub.catatanCikgu}"</p>}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      <button type="button" onClick={() => bukaModalKoreksi(sub)} className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg cursor-pointer">✏️ Nilai</button>
                      <button type="button" onClick={() => confirm("Hapus pengumpulan ini?") && onHapusSubmission(sub.id)} className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg cursor-pointer">🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TambahTugasModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingTugas(null); }} onSimpanTugas={onSimpanInstruksi} initialData={editingTugas} />

      {koreksiItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-base border-b pb-2">Koreksi Tugas • {koreksiItem.siswa}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1">Status Koreksi</label>
                <select value={statusKoreksi} onChange={(e) => setStatusKoreksi(e.target.value as any)} className="w-full px-3 py-2 border rounded-lg bg-slate-50">
                  <option value="Sudah Dinilai">Sudah Dinilai</option>
                  <option value="Perlu Revisi">Perlu Revisi</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Skor / Nilai (Opsional)</label>
                <input type="text" value={nilai} onChange={(e) => setNilai(e.target.value)} placeholder="Cth: 90 atau A" className="w-full px-3 py-2 border rounded-lg bg-slate-50" />
              </div>
            </div>
            <div>
              <label className="block font-bold mb-1">Catatan Evaluasi untuk Siswa</label>
              <textarea rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="Tulis masukan pengerjaan..." className="w-full px-3 py-2 border rounded-lg bg-slate-50 resize-none" />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setKoreksiItem(null)} className="flex-1 py-2 bg-slate-100 font-bold rounded-lg cursor-pointer">Batal</button>
              <button type="button" onClick={() => { onSimpanKoreksi(koreksiItem.id, statusKoreksi, nilai, catatan); setKoreksiItem(null); }} className="flex-1 py-2 bg-teal-600 text-white font-bold rounded-lg cursor-pointer">Simpan Nilai</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}