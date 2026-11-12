export default function AdminStatsCards() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-indigo-800 p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider">
            Total Pendaftar
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-yellow-400">12</span>
            <span className="text-xs font-semibold text-emerald-600 bg-slate-200 px-2 py-0.5 rounded">
              +3 minggu ini
            </span>
          </div>
        </div>
  
        <div className="bg-slate-700 p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-teal-400 uppercase tracking-wider">
            Presensi Hari Ini
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-teal-400">2 / 8</span>
            <span className="text-xs text-teal-400">Siswa klaim</span>
          </div>
        </div>
  
        <div className="bg-cyan-900 p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-violet-400 uppercase tracking-wider">
            Siswa Aktif
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-violet-400">8</span>
            <span className="text-xs text-violet-400">Kelas 1-3 SD</span>
          </div>
        </div>
  
        <div className="bg-stone-700 p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-amber-500 uppercase tracking-wider">
            Total Reward Poin
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-amber-500">145</span>
            <span className="text-xs text-amber-600 bg-slate-200 px-2 py-0.5 rounded font-medium">
              Pts terdistribusi
            </span>
          </div>
        </div>
      </div>
    );
  }