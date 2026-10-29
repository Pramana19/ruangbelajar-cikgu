export interface Pendaftar {
    id: number;
    namaAnak: string;
    kelas: string;
    orangTua: string;
    whatsapp: string;
    email: string;
    tanggal: string;
    status: "Menunggu" | "Dikonfirmasi" | "Batal";
  }
  
  export default function PendaftarTable({
    filteredList,
    onSelectPendaftar,
    onUpdateStatus,
  }: {
    filteredList: Pendaftar[];
    onSelectPendaftar: (p: Pendaftar) => void;
    onUpdateStatus: (id: number, status: "Dikonfirmasi" | "Batal" | "Menunggu") => void;
  }) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Nama Anak</th>
                <th className="py-3.5 px-4 font-semibold">Jenjang</th>
                <th className="py-3.5 px-4 font-semibold">Orang Tua</th>
                <th className="py-3.5 px-4 font-semibold">No. WhatsApp</th>
                <th className="py-3.5 px-4 font-semibold">Tanggal Daftar</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-center">Aksi Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-slate-400">
                    Tidak ada data pendaftar yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <button
                        onClick={() => onSelectPendaftar(item)}
                        className="hover:text-teal-600 hover:underline text-left"
                      >
                        {item.namaAnak}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-xs">{item.kelas}</td>
                    <td className="py-3.5 px-4 text-xs">{item.orangTua}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-700">
                      <a
                        href={`https://wa.me/${item.whatsapp.replace(/^0/, "62")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-600 hover:underline flex items-center gap-1"
                      >
                        {item.whatsapp} 💬
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{item.tanggal}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          item.status === "Dikonfirmasi"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "Batal"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {item.status !== "Dikonfirmasi" && (
                          <button
                            onClick={() => onUpdateStatus(item.id, "Dikonfirmasi")}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold transition-colors"
                          >
                            Setujui ✓
                          </button>
                        )}
                        {item.status !== "Batal" && (
                          <button
                            onClick={() => onUpdateStatus(item.id, "Batal")}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-semibold transition-colors"
                          >
                            Batal ✕
                          </button>
                        )}
                        <button
                          onClick={() => onSelectPendaftar(item)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold transition-colors"
                        >
                          Detail 👁
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