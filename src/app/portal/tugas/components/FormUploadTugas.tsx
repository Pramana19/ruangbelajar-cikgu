"use client";
import { useState, useRef, useEffect } from "react";
import { bacaFileLampiran, LampiranFile } from "@/lib/pesanStorage";
import { InstruksiTugas } from "@/lib/tugasStorage";
import LampiranPreview from "@/components/LampiranPreview";

export default function FormUploadTugas({
  instruksiList,
  submittedTugasIds,
  onKumpulTugas,
}: {
  instruksiList: InstruksiTugas[];
  submittedTugasIds: string[];
  onKumpulTugas: (tugas: InstruksiTugas, jawabanTeks: string, linkJawaban: string, fileLampiran?: LampiranFile | null) => void;
}) {
  const tersedia = instruksiList.filter((t) => !submittedTugasIds.includes(t.id));
  const [selectedId, setSelectedId] = useState(tersedia[0]?.id || instruksiList[0]?.id || "");
  const [jawabanTeks, setJawabanTeks] = useState("");
  const [linkJawaban, setLinkJawaban] = useState("");
  const [lampiran, setLampiran] = useState<LampiranFile | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tersedia.length > 0 && submittedTugasIds.includes(selectedId)) {
      setSelectedId(tersedia[0].id);
    }
  }, [submittedTugasIds, tersedia, selectedId]);

  const selectedTugas = instruksiList.find((t) => t.id === selectedId) || instruksiList[0];
  const sudahDikumpulkan = selectedTugas ? submittedTugasIds.includes(selectedTugas.id) : false;
  const adaIsian = Boolean(jawabanTeks.trim() || linkJawaban.trim() || lampiran);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTugas || sudahDikumpulkan || !adaIsian) return;
    onKumpulTugas(selectedTugas, jawabanTeks.trim(), linkJawaban.trim(), lampiran);
    setJawabanTeks("");
    setLinkJawaban("");
    setLampiran(null);
    setIsSuccess(true);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50">
        <h2 className="font-bold text-slate-800 text-sm">Formulir Pengumpulan Tugas</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Pilih Tugas dari Cikgu</label>
          <select
            value={selectedTugas?.id || ""}
            disabled={tersedia.length === 0}
            onChange={(e) => { setSelectedId(e.target.value); setIsSuccess(false); }}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {instruksiList.map((t) => {
              const done = submittedTugasIds.includes(t.id);
              return (
                <option key={t.id} value={t.id} disabled={done}>
                  [{t.mapel}] {t.judul} {done ? "✓ (Sudah Dikumpulkan)" : ""}
                </option>
              );
            })}
          </select>
        </div>

        {selectedTugas && (
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold text-purple-900">
              <span>📌 Instruksi Soal:</span>
              <span className="text-[11px] text-purple-600">Tenggat: {selectedTugas.tenggat}</span>
            </div>
            <p className="text-slate-700 whitespace-pre-line leading-relaxed">{selectedTugas.deskripsi}</p>
            {selectedTugas.linkReferensi && (
              <a href={selectedTugas.linkReferensi} target="_blank" rel="noreferrer" className="inline-block font-bold text-indigo-600 hover:underline pt-1">
                🔗 Buka Sumber Belajar / Referensi dari Cikgu ↗
              </a>
            )}
            <div className="flex flex-wrap gap-2">
              {selectedTugas.lampiranList?.map((file, idx) => <LampiranPreview key={idx} lampiran={file} />)}
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Ketik Jawaban Langsung</label>
          <textarea
            rows={3}
            disabled={sudahDikumpulkan}
            value={jawabanTeks}
            onChange={(e) => { setJawabanTeks(e.target.value); setIsSuccess(false); }}
            placeholder={"1. Jawaban nomor satu...\n2. Jawaban nomor dua..."}
            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 resize-none disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Link Google Drive Jawaban (Opsional jika file &gt; 2 MB)</label>
          <input
            type="url"
            disabled={sudahDikumpulkan}
            value={linkJawaban}
            onChange={(e) => { setLinkJawaban(e.target.value); setIsSuccess(false); }}
            placeholder="https://drive.google.com/file/d/..."
            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Lampirkan Foto / PDF (Opsional, Maks 2 MB)</label>
          <div className={`border-2 border-dashed rounded-xl p-3.5 text-center ${sudahDikumpulkan ? "opacity-60 cursor-not-allowed border-slate-200 bg-slate-100" : lampiran ? "border-emerald-300 bg-emerald-50" : "border-slate-300 bg-slate-50"}`}>
            <input type="file" ref={fileRef} disabled={sudahDikumpulkan} onChange={async (e) => e.target.files?.[0] && setLampiran(await bacaFileLampiran(e.target.files[0]))} accept="image/png, image/jpeg, application/pdf" className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-purple-700 disabled:cursor-not-allowed cursor-pointer" />
            {lampiran && <p className="text-[11px] text-emerald-700 mt-1.5 font-bold">✓ {lampiran.nama}</p>}
          </div>
        </div>

        {sudahDikumpulkan && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 font-semibold">
            🔒 Semua tugas aktif sudah dikumpulkan. Gunakan tombol <strong>Edit / Revisi</strong> pada kartu riwayat di sebelah kanan jika ingin mengubah jawaban.
          </div>
        )}

        {isSuccess && <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700 font-bold">🎉 Jawaban berhasil dikirim ke Cikgu!</div>}

        <button type="submit" disabled={sudahDikumpulkan || !adaIsian} className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl cursor-pointer">
          📤 Kirim Jawaban Tugas
        </button>
      </form>
    </div>
  );
}