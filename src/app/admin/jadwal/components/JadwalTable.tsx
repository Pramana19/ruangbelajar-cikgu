"use client";

import { useState } from "react";

export interface JadwalLes {
  id: number;
  namaKelas: string;
  targetPeserta: string;
  hari: string;
  jam: string;
  mapel: string;
  status: "Aktif" | "Selesai" | "Libur";
}

export default function JadwalTable({
  jadwalList,
  onDelete,
  onUpdate,
}: {
  jadwalList: JadwalLes[];
  onDelete: (id: number) => void;
  onUpdate: (updatedItem: JadwalLes) => void;
}) {
  // State untuk melacak baris mana yang sedang diedit berdasarkan ID
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // State menampung data sementara saat sedang diedit
  const [editForm, setEditForm] = useState<JadwalLes | null>(null);

  const handleStartEdit = (item: JadwalLes) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSaveEdit = (id: number) => {
    if (editForm) {
      onUpdate(editForm);
    }
    setEditingId(null);
    setEditForm(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Hari & Jam</th>
              <th className="py-3.5 px-4 font-semibold">Nama Kelas & Target (Grup)</th>
              <th className="py-3.5 px-4 font-semibold">Mata Pelajaran</th>
              <th className="py-3.5 px-4 font-semibold">Status Sesi</th>
              <th className="py-3.5 px-4 font-semibold text-center">Aksi (Edit / Hapus)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {jadwalList.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-slate-400">
                  Belum ada jadwal kelas yang terdaftar.
                </td>
              </tr>
            ) : (
              jadwalList.map((item) => {
                const isEditing = editingId === item.id;

                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    {/* HARI & JAM */}
                    <td className="py-3.5 px-4 align-top">
                      {isEditing && editForm ? (
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={editForm.hari}
                            onChange={(e) => setEditForm({ ...editForm, hari: e.target.value })}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-bold text-slate-900 bg-white"
                            placeholder="Hari (Contoh: Senin)"
                          />
                          <input
                            type="text"
                            value={editForm.jam}
                            onChange={(e) => setEditForm({ ...editForm, jam: e.target.value })}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-mono text-slate-800 bg-white"
                            placeholder="Jam (Contoh: 19:00 - 21:00 WIB)"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="font-bold text-slate-900">{item.hari}</div>
                          <div className="text-xs text-slate-500 font-mono">{item.jam}</div>
                        </>
                      )}
                    </td>

                    {/* NAMA KELAS & TARGET PESERTA */}
                    <td className="py-3.5 px-4 align-top">
                      {isEditing && editForm ? (
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={editForm.namaKelas}
                            onChange={(e) => setEditForm({ ...editForm, namaKelas: e.target.value })}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-semibold text-slate-900 bg-white"
                            placeholder="Nama Kelas"
                          />
                          <input
                            type="text"
                            value={editForm.targetPeserta}
                            onChange={(e) => setEditForm({ ...editForm, targetPeserta: e.target.value })}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs text-teal-700 bg-white"
                            placeholder="Target Peserta"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="font-semibold text-slate-800">{item.namaKelas}</div>
                          <div className="text-xs text-teal-600 font-medium">{item.targetPeserta}</div>
                        </>
                      )}
                    </td>

                    {/* MATA PELAJARAN */}
                    <td className="py-3.5 px-4 align-top">
                      {isEditing && editForm ? (
                        <input
                          type="text"
                          value={editForm.mapel}
                          onChange={(e) => setEditForm({ ...editForm, mapel: e.target.value })}
                          className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-medium text-slate-800 bg-white"
                          placeholder="Mata Pelajaran"
                        />
                      ) : (
                        <div className="text-xs font-medium text-slate-700">{item.mapel}</div>
                      )}
                    </td>

                    {/* STATUS SESI */}
                    <td className="py-3.5 px-4 align-top">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          item.status === "Aktif"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "Selesai"
                            ? "bg-slate-100 text-slate-700"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* AKSI (EDIT DENGAN IKON PENSIL / SIMPAN / BATAL / HAPUS) */}
                    <td className="py-3.5 px-4 text-center align-top">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition-colors"
                          >
                            Simpan ✓
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-2.5 py-1 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded text-[11px] font-bold transition-colors"
                          >
                            Batal ✕
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-semibold transition-colors flex items-center gap-1"
                            title="Edit Jadwal"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => onDelete(item.id)}
                            className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-semibold transition-colors"
                            title="Hapus Jadwal"
                          >
                            🗑️
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}