export default function RiwayatTugasList() {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Riwayat Pengumpulan</h2>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold uppercase tracking-wider">Bulan Ini</span>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-lg">📄</div>
              <div>
                <p className="text-sm font-bold text-slate-800">Tugas_MTK_Siti.pdf</p>
                <p className="text-[11px] text-slate-500">Matematika Dasar • 28 Okt 2026, 15:30 WIB</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">Diserahkan</span>
          </div>
  
          <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-lg">🖼️</div>
              <div>
                <p className="text-sm font-bold text-slate-800">Tugas_IPA_Siti_Halaman2.jpg</p>
                <p className="text-[11px] text-slate-500">Ilmu Pengetahuan Alam • 25 Okt 2026, 14:15 WIB</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">Diserahkan</span>
          </div>
        </div>
      </div>
    );
  }