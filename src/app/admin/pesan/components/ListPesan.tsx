"use client";

export default function ListPesan({ tickets, onBalas, onDelete }: { tickets: any[], onBalas: (t: any) => void, onDelete: (id: string) => void }) {
  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="text-4xl mb-3">📭</div>
        <h3 className="font-bold text-slate-700">Belum ada pesan</h3>
        <p className="text-xs text-slate-500 mt-1">Tidak ada tiket aduan yang sesuai dengan filter saat ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 relative group">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">
                {ticket.siswa.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{ticket.siswa} <span className="font-normal text-slate-500">({ticket.kelas})</span></p>
                <p className="text-[10px] text-slate-400">{ticket.id} • {ticket.tanggal}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                ticket.status === "Selesai" ? "bg-emerald-100 text-emerald-700" :
                ticket.status === "Diproses" ? "bg-amber-100 text-amber-700" :
                "bg-rose-100 text-rose-700"
              }`}>
                {ticket.status}
              </div>
              {/* Tombol Hapus Satuan */}
              <button
                onClick={() => {
                  if (confirm(`Yakin ingin menghapus tiket ${ticket.id}?`)) {
                    onDelete(ticket.id);
                  }
                }}
                className="text-slate-300 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                title="Hapus Pesan"
              >
                🗑️
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">{ticket.pesan}</p>
          </div>

          {ticket.balasan && (
            <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
              <p className="text-xs font-bold text-teal-700 mb-1">Balasan Anda:</p>
              <p className="text-sm text-teal-900">{ticket.balasan}</p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => onBalas(ticket)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm ${
                ticket.status === "Selesai" 
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
            >
              {ticket.status === "Selesai" ? "Lihat / Edit Balasan" : "Balas"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}