export default function AttendanceHistory({ isClaimed }: { isClaimed: boolean }) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Riwayat Kehadiran Siswa</h3>
        <div className="space-y-2">
          {isClaimed && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <div>
                  <div className="text-xs font-bold text-slate-800">Sesi Les Hari Ini</div>
                  <div className="text-[10px] text-slate-500">29 Okt 2026 • Baru saja</div>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                +5 Pts (Hadir)
              </span>
            </div>
          )}
  
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <div>
                <div className="text-xs font-bold text-slate-800">Sesi Calistung & Matematika</div>
                <div className="text-[10px] text-slate-500">28 Okt 2026 • 16:05 WIB</div>
              </div>
            </div>
            <span className="text-xs font-extrabold text-slate-600 bg-slate-200 px-2.5 py-1 rounded-lg">
              +5 Pts (Hadir)
            </span>
          </div>
        </div>
      </div>
    );
  }