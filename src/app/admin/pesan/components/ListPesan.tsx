"use client";
import { PesanTicket } from "@/lib/pesanStorage";
import LampiranPreview from "@/components/LampiranPreview";

export default function ListPesan({
  tickets,
  onBalas,
  onDelete,
}: {
  tickets: PesanTicket[];
  onBalas: (t: PesanTicket) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-gradient-to-r from-indigo-700 to-cyan-600 text-white text-xs uppercase tracking-wider whitespace-nowrap">
            <tr>
              <th className="py-4 px-4 font-semibold">Tiket & Tanggal</th>
              <th className="py-4 px-4 font-semibold">Siswa / Penerima</th>
              <th className="py-4 px-4 font-semibold">Isi Pesan & Utas Terakhir</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-xs text-slate-400">📭 Belum ada pesan atau aduan yang sesuai.</td>
              </tr>
            ) : (
              tickets.map((ticket) => {
                const isKeluar = ticket.arah === "Keluar";
                const totalChat = ticket.thread?.length || 1;
                return (
                  <tr key={ticket.id} className="hover:bg-slate-50 transition-colors align-top">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono text-xs font-bold text-slate-800">{ticket.id}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{ticket.tanggal}</div>
                      <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${isKeluar ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "bg-slate-100 text-slate-600"}`}>
                        {isKeluar ? "↗ Pesan Admin" : "↙ Aduan Masuk"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${ticket.isSiaran ? "bg-indigo-100 text-indigo-700" : "bg-teal-100 text-teal-700"}`}>
                          {ticket.isSiaran ? "📢" : ticket.siswa.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{ticket.siswa}</div>
                          <div className="text-[11px] text-teal-600 font-medium">{ticket.kelas}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 min-w-[260px] max-w-md">
                      <p className="text-xs text-slate-700 leading-relaxed">{ticket.pesan}</p>
                      <LampiranPreview lampiran={ticket.lampiran} />
                      {ticket.balasan && (
                        <div className="mt-2 bg-teal-50/80 px-3 py-2 rounded-lg border border-teal-100 text-xs">
                          <span className="font-bold text-teal-700">Balasan Terakhir: </span>
                          <span className="text-teal-900">{ticket.balasan}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        ticket.status === "Selesai" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
                        ticket.status === "Dibaca" ? "bg-sky-100 text-sky-800 border border-sky-200" :
                        ticket.status === "Terkirim" ? "bg-indigo-100 text-indigo-800 border border-indigo-200" :
                        "bg-rose-100 text-rose-800 border border-rose-200"
                      }`}>
                        {ticket.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!ticket.isSiaran && (
                          <button
                            type="button"
                            onClick={() => onBalas(ticket)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              ticket.status === "Belum Dibalas" ? "bg-teal-600 hover:bg-teal-700 text-white shadow-xs" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            💬 Diskusi ({totalChat})
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => confirm(`Yakin ingin menghapus pesan ${ticket.id}?`) && onDelete(ticket.id)}
                          className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold cursor-pointer"
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