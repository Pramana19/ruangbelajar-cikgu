export interface PendingTicket {
  id: number;
  namaKelas: string;
  mapel: string;
  jadwal: string;
  status: "Menunggu" | "Selesai";
}

export default function TicketQueue({
  tickets,
  onSelectTicket,
  onEditTicket,
  onDeleteTicket,
}: {
  tickets: PendingTicket[];
  onSelectTicket: (ticket: PendingTicket) => void;
  onEditTicket: (ticket: PendingTicket) => void;
  onDeleteTicket: (id: number) => void;
}) {
  const pendingCount = tickets.filter((t) => t.status === "Menunggu").length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
          <thead className="bg-gradient-to-r from-indigo-700 to-cyan-600 text-white text-xs uppercase tracking-wider">
            <tr>
              <th className="py-4 px-4 font-semibold rounded-tl-lg">Jadwal Sesi</th>
              <th className="py-4 px-4 font-semibold">Kelas & Mata Pelajaran</th>
              <th className="py-4 px-4 font-semibold">
                <div className="flex items-center gap-2">
                  <span>Status Materi</span>
                  {pendingCount > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {pendingCount} Antrian
                    </span>
                  )}
                </div>
              </th>
              <th className="py-4 px-4 font-semibold text-center rounded-tr-lg">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-xs text-slate-400">
                  Tidak ada daftar materi yang sesuai filter. Klik &quot;+ Tambah Materi&quot; untuk membuat jadwal baru.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => {
                const isMenunggu = ticket.status === "Menunggu";

                return (
                  <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                    {/* Kolom 1: Jadwal Sesi */}
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-mono font-semibold text-slate-700 flex items-center gap-1.5">
                        <span>📅</span> {ticket.jadwal}
                      </div>
                    </td>

                    {/* Kolom 2: Kelas & Mata Pelajaran */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{ticket.namaKelas}</div>
                      <div className="text-xs text-teal-600 font-medium mt-0.5">{ticket.mapel}</div>
                    </td>

                    {/* Kolom 3: Status Materi */}
                    <td className="py-3.5 px-4">
                      {isMenunggu ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          Menunggu Materi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          ✓ Sudah Diunggah
                        </span>
                      )}
                    </td>

                    {/* Kolom 4: Aksi (Upload, Edit, Hapus) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectTicket(ticket)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs ${
                            isMenunggu
                              ? "bg-teal-600 hover:bg-teal-700 text-white"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {isMenunggu ? "📤 Upload" : "🔄 Ganti"}
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditTicket(ticket)}
                          title="Edit Info Jadwal/Mapel"
                          className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Hapus antrian materi "${ticket.mapel}" (${ticket.namaKelas})?`)) {
                              onDeleteTicket(ticket.id);
                            }
                          }}
                          title="Hapus Materi"
                          className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
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