export default function AdminStatsCards() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total Pendaftar
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-900">12</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              +3 minggu ini
            </span>
          </div>
        </div>
  
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Presensi Hari Ini
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-teal-600">2 / 8</span>
            <span className="text-xs text-slate-500">Siswa klaim</span>
          </div>
        </div>
  
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Siswa Aktif
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-indigo-600">8</span>
            <span className="text-xs text-slate-500">Kelas 1-3 SD</span>
          </div>
        </div>
  
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total Reward Poin
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-amber-500">145</span>
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-medium">
              Pts terdistribusi
            </span>
          </div>
        </div>
      </div>
    );
  }