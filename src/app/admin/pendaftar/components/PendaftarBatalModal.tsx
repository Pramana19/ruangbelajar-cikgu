"use client";

import { Pendaftar } from "./PendaftarTable";

export default function PendaftarBatalModal({
  pendaftar,
  onClose,
  onAktifkan,
  onDelete,
}: {
  pendaftar: Pendaftar;
  onClose: () => void;
  onAktifkan: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Kelola Akun Dibatalkan</h3>
            <p className="text-[10px] text-slate-500">Informasi peserta: {pendaftar.namaAnak}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center space-y-2">
            <span className="text-2xl">⚠️</span>
            <h4 className="font-bold text-rose-800 text-sm">Akun Ini Berstatus Dibatalkan / Ditolak</h4>
            <p className="text-xs text-rose-600 leading-relaxed">
              Peserta atas nama <strong className="text-rose-800">{pendaftar.namaAnak}</strong> saat ini tidak aktif. Anda dapat mengaktifkan kembali antirannya atau menghapus permanen data ini dari sistem.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (confirm(`Yakin ingin menghapus permanen data ${pendaftar.namaAnak}?`)) {
                  onDelete(pendaftar.id);
                  onClose();
                }
              }}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
            >
              🗑️ Hapus Permanen
            </button>
            <button
              type="button"
              onClick={() => {
                onAktifkan(pendaftar.id);
                onClose();
              }}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
            >
              ✓ Aktifkan Kembali
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}