"use client";

export interface Pendaftar {
  id: number;
  namaAnak: string;
  jenisKelamin?: string;
  kelas: string;
  orangTua: string;
  whatsapp: string;
  email: string;
  tanggal: string;
  status: "Menunggu" | "Dikonfirmasi" | "Batal" | "Berhenti";
  paketLangganan?: string;
  statusPembayaran?: "Lunas" | "Belum Lunas";
  jatuhTempo?: string;
  tanggalMulai?: string;
}

export default function PendaftarTable({
  filteredList,
  onSelectPendaftar,
}: {
  filteredList: Pendaftar[];
  onSelectPendaftar: (p: Pendaftar) => void;
  onUpdateStatus?: (id: number, status: any) => void; // Opsional karena kini dikelola via modal
}) {
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
          {/* PERBAIKAN: thead disulap menjadi Header Tebal Gradien dengan teks putih */}
          <thead className="bg-gradient-to-r from-indigo-700 to-cyan-600 text-white text-xs uppercase tracking-wider">
            <tr>
              <th className="py-4 px-4 font-semibold rounded-tl-lg">Peserta & Kelas</th>
              <th className="py-4 px-4 font-semibold">Kontak Ortu</th>
              <th className="py-4 px-4 font-semibold">Tanggal Daftar</th>
              <th className="py-4 px-4 font-semibold">Status Akun</th>
              <th className="py-4 px-4 font-semibold">Langganan & Bayar</th>
              <th className="py-4 px-4 font-semibold text-center rounded-tr-lg">Aksi Cepat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-slate-400">
                  Tidak ada data peserta yang cocok dengan filter pencarian.
                </td>
              </tr>
            ) : (
              filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  
                  {/* Kolom 1: Peserta & Kelas */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onSelectPendaftar(item)}
                      className="font-semibold text-slate-900 hover:text-teal-600 hover:underline text-left block cursor-pointer"
                      title="Klik untuk kelola data"
                    >
                      {item.namaAnak}
                    </button>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {item.kelas} {item.jenisKelamin ? `• ${item.jenisKelamin}` : ""}
                    </div>
                  </td>

                  {/* Kolom 2: Kontak Ortu */}
                  <td className="py-3 px-4">
                    <div className="text-xs font-medium text-slate-700">{item.orangTua}</div>
                    <a
                      href={`https://wa.me/${item.whatsapp.replace(/^0/, "62")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-teal-600 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      {item.whatsapp} 💬
                    </a>
                  </td>

                  {/* Kolom 3: Tanggal */}
                  <td className="py-3 px-4 text-xs text-slate-500">{item.tanggal}</td>

                  {/* Kolom 4: Status Akun */}
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      item.status === "Dikonfirmasi" ? "bg-emerald-100 text-emerald-700" :
                      item.status === "Batal" ? "bg-red-600 text-white" :
                      item.status === "Berhenti" ? "bg-slate-200 text-slate-700" :
                      "bg-amber-300 text-amber-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Kolom 5: Langganan & Pembayaran */}
                  <td className="py-3 px-4">
                    {item.status === "Dikonfirmasi" ? (
                      <div>
                        <div className="text-[11px] font-bold text-slate-700">
                          {item.paketLangganan || "Belum Set Paket"}
                        </div>
                        <div className={`text-[10px] font-bold mt-0.5 ${item.statusPembayaran === "Lunas" ? "text-emerald-600" : "text-rose-600"}`}>
                          {item.statusPembayaran === "Lunas" ? "✓ Lunas" : "⚠ Belum Lunas"}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">-</span>
                    )}
                  </td>

                  {/* Kolom 6: Aksi Cepat */}
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => onSelectPendaftar(item)}
                        className="px-3.5 py-1.5 bg-slate-400 hover:bg-slate-500 hover:text-slate-100 hover:border-teal-200 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        ⚙️ Kelola
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}