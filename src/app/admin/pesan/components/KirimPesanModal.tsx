"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { bacaFileLampiran, LampiranFile } from "@/lib/pesanStorage";

interface PesertaOption {
  id: string;
  nama: string;
  kelas: string;
}

export default function KirimPesanModal({
  isOpen,
  onClose,
  onKirimPesan,
}: {
  isOpen: boolean;
  onClose: () => void;
  onKirimPesan: (data: {
    siswaId?: string;
    penerimaLabel: string;
    kelasLabel: string;
    isSiaran: boolean;
    isiPesan: string;
    lampiran?: LampiranFile | null;
  }) => void;
}) {
  const [pesertaList, setPesertaList] = useState<PesertaOption[]>([]);
  const [isLoadingPeserta, setIsLoadingPeserta] = useState(false);
  const [searchPeserta, setSearchPeserta] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isiPesan, setIsPesan] = useState("");
  const [lampiran, setLampiran] = useState<LampiranFile | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const loadPeserta = async () => {
      setIsLoadingPeserta(true);
      const { data } = await supabase
        .from("profiles")
        .select("id, nama_lengkap, kelas")
        .eq("role", "peserta")
        .order("nama_lengkap", { ascending: true });

      if (data) {
        setPesertaList(
          data.map((p) => ({
            id: p.id,
            nama: p.nama_lengkap || "Peserta",
            kelas: p.kelas || "Umum",
          }))
        );
      }
      setIsLoadingPeserta(false);
    };
    loadPeserta();
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredPeserta = pesertaList.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchPeserta.toLowerCase()) ||
      p.kelas.toLowerCase().includes(searchPeserta.toLowerCase())
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLampiran(await bacaFileLampiran(file));
  };

  const resetAndClose = () => {
    setSearchPeserta("");
    setSelectedIds([]);
    setIsSelectAll(false);
    setIsPesan("");
    setLampiran(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isiPesan.trim() || (!isSelectAll && selectedIds.length === 0)) return;

    const isAll = isSelectAll || (pesertaList.length > 0 && selectedIds.length === pesertaList.length);
    const target = pesertaList.find((p) => p.id === selectedIds[0]);
    const penerimaLabel = isAll
      ? `Semua Peserta (${pesertaList.length} Siswa)`
      : selectedIds.length === 1
      ? target!.nama
      : `${target!.nama} +${selectedIds.length - 1} lainnya`;

    onKirimPesan({
      siswaId: !isAll && selectedIds.length === 1 ? target!.id : undefined,
      penerimaLabel,
      kelasLabel: isAll ? "Siaran Global" : selectedIds.length === 1 ? target!.kelas : "Pesan Grup",
      isSiaran: isAll,
      isiPesan: isiPesan.trim(),
      lampiran,
    });
    resetAndClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base">Kirim Pesan / Pengumuman</h3>
          <button type="button" onClick={resetAndClose} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isSelectAll}
                onChange={(e) => {
                  setIsSelectAll(e.target.checked);
                  setSelectedIds(e.target.checked ? pesertaList.map((p) => p.id) : []);
                }}
                className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
              />
              <span className="font-bold text-indigo-950">📢 Siaran ke Seluruh Peserta (Select All)</span>
            </label>
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              {isSelectAll ? pesertaList.length : selectedIds.length} Dipilih
            </span>
          </div>

          <div>
            <input
              type="text"
              value={searchPeserta}
              onChange={(e) => setSearchPeserta(e.target.value)}
              disabled={isSelectAll}
              placeholder="🔍 Cari nama siswa atau kelas..."
              className="w-full px-3 py-2 mb-2 border border-slate-200 rounded-lg bg-slate-50 disabled:opacity-50"
            />
            <div className={`max-h-32 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 ${isSelectAll ? "opacity-50 pointer-events-none" : ""}`}>
              {isLoadingPeserta ? (
                <div className="p-3 text-center text-slate-400">Memuat daftar peserta...</div>
              ) : filteredPeserta.length === 0 ? (
                <div className="p-3 text-center text-slate-400">Tidak ada peserta ditemukan.</div>
              ) : (
                filteredPeserta.map((p) => (
                  <label key={p.id} className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelectAll || selectedIds.includes(p.id)}
                        onChange={() => {
                          setIsSelectAll(false);
                          setSelectedIds((prev) => (prev.includes(p.id) ? prev.filter((i) => i !== p.id) : [...prev, p.id]));
                        }}
                        className="rounded text-teal-600 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-800">{p.nama}</span>
                    </div>
                    <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded">{p.kelas}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <textarea
            rows={3}
            required
            value={isiPesan}
            onChange={(e) => setIsPesan(e.target.value)}
            placeholder="Ketik isi pesan atau pengumuman..."
            className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <div className="flex items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-dashed border-slate-300">
            <label className="cursor-pointer text-slate-600 font-semibold hover:text-teal-700">
              📎 {lampiran ? lampiran.nama : "Lampirkan Gambar / PDF (Opsional, maks 2MB)"}
              <input type="file" accept="image/png,image/jpeg,application/pdf" onChange={handleFileChange} className="hidden" />
            </label>
            {lampiran && (
              <button type="button" onClick={() => setLampiran(null)} className="text-rose-600 font-bold cursor-pointer">Hapus</button>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={resetAndClose} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg cursor-pointer">Batal</button>
            <button type="submit" disabled={!isiPesan.trim() || (!isSelectAll && selectedIds.length === 0)} className="px-5 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold rounded-lg cursor-pointer">
              {isSelectAll ? "📢 Kirim Siaran" : "📤 Kirim Pesan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}