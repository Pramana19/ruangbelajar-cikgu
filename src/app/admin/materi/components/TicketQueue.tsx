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
  }: {
    tickets: PendingTicket[];
    onSelectTicket: (ticket: PendingTicket) => void;
  }) {
    // Pisahkan tiket berdasarkan status
    const pendingTickets = tickets.filter((t) => t.status === "Menunggu");
    const completedTickets = tickets.filter((t) => t.status === "Selesai");
  
    return (
      <div className="space-y-6">
        
        {/* SEKAT 1: ANTRIAN MENUNGGU */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="font-bold text-slate-800">Antrian Upload Materi</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Sesi kelas yang belum memiliki materi/modul.</p>
            </div>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
              {pendingTickets.length} Antrian
            </span>
          </div>
  
          <div className="p-5">
            {pendingTickets.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-sm font-bold text-slate-800">Hore! Semua kelas sudah memiliki materi.</p>
                <p className="text-xs text-slate-500 mt-1">Anda bisa bersantai sekarang, Cikgu.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pendingTickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="border border-slate-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer bg-white group"
                    onClick={() => onSelectTicket(ticket)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">
                        Menunggu Materi
                      </span>
                      <span className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm">{ticket.namaKelas}</h3>
                    <p className="text-xs font-medium text-slate-600 mt-1">{ticket.mapel}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                      <span>📅</span> {ticket.jadwal}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* SEKAT 2: RIWAYAT SELESAI */}
        {completedTickets.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50">
              <div>
                <h2 className="font-bold text-emerald-800">Riwayat Materi Terkirim</h2>
                <p className="text-[11px] text-emerald-600 mt-0.5">Materi yang sudah berhasil diunggah minggu ini.</p>
              </div>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                {completedTickets.length} Selesai
              </span>
            </div>
  
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {completedTickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        Sudah Diunggah
                      </span>
                    </div>
                    {/* Efek coretan dihapus di baris bawah ini */}
                    <h3 className="font-bold text-slate-800 text-sm">{ticket.namaKelas}</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">{ticket.mapel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
  
      </div>
    );
  }