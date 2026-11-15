"use client";

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
  onEdit,
}: {
  jadwalList: JadwalLes[];
  onDelete: (id: number) => void;
  onUpdate: (updatedItem: JadwalLes) => void;
  onEdit: (item: JadwalLes) => void;
}) {
  // Fungsi toggle cepat Status Aktif <-> Libur
  const handleToggleStatus = (item: JadwalLes) => {
    const nextStatus = item.status === "Aktif" ? "Libur" : "Aktif";
    onUpdate({ ...item, status: nextStatus });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
          <thead className="bg-gradient-to-r from-indigo-700 to-cyan-600 text-white text-xs uppercase tracking-wider">
            <tr>
              <th className="py-4 px-4 font-semibold rounded-tl-lg">Hari & Jam</th>
              <th className="py-4 px-4 font-semibold">Nama Kelas & Target (Grup)</th>
              <th className="py-4 px-4 font-semibold">Mata Pelajaran</th>
              <th className="py-4 px-4 font-semibold">Status Sesi</th>
              <th className="py-4 px-4 font-semibold text-center rounded-tr-lg">Aksi (Edit / Hapus)</th>
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
                const isAktif = item.status === "Aktif";

                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    {/* HARI & JAM */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{item.hari}</div>
                      <div className="text-xs text-slate-500 font-mono">{item.jam}</div>
                    </td>

                    {/* NAMA KELAS & TARGET PESERTA */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{item.namaKelas}</div>
                      <div className="text-xs text-teal-600 font-medium">{item.targetPeserta}</div>
                    </td>

                    {/* MATA PELAJARAN */}
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-medium text-slate-700">{item.mapel}</div>
                    </td>

                    {/* STATUS SESI (MODEL FLOWBITE SWITCH TOGGLE - TEKS TERKUNCI ANTI GESER) */}
                    <td className="py-3.5 px-4">
                      {item.status === "Selesai" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          Selesai
                        </span>
                      ) : (
                        <label
                          className="inline-flex items-center cursor-pointer select-none"
                          title="Geser untuk mengubah status Aktif / Libur"
                        >
                          <input
                            type="checkbox"
                            checked={isAktif}
                            onChange={() => handleToggleStatus(item)}
                            className="sr-only peer"
                          />
                          <div className="relative w-9 h-5 shrink-0 bg-amber-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-xs peer-checked:after:translate-x-full"></div>
                          <span
                            className={`ms-2.5 w-11 inline-block text-xs font-bold transition-colors ${
                              isAktif ? "text-emerald-700" : "text-amber-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </label>
                      )}
                    </td>

                    {/* AKSI (EDIT VIA MODAL / HAPUS) */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 rounded text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                          title="Edit Jadwal"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Hapus jadwal "${item.mapel}" (${item.hari})?`)) {
                              onDelete(item.id);
                            }
                          }}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-semibold transition-colors cursor-pointer"
                          title="Hapus Jadwal"
                        >
                          🗑️
                        </button>
                      </div>
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