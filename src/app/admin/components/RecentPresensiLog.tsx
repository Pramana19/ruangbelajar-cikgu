export default function RecentPresensiLog() {
  const samplePresensi = [
    { id: 101, namaAnak: "Siti Rahma", kelas: "Kelas 1 SD", waktu: "16:05 WIB", poin: "+5 Poin" },
    { id: 102, namaAnak: "Rian Hidayat", kelas: "Kelas 3 SD", waktu: "16:12 WIB", poin: "+5 Poin" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header dengan Gradien (mengadopsi gaya portal siswa) */}
      <div className="bg-gradient-to-r from-indigo-700 to-cyan-600 p-5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-teal-200 text-sm">Presensi Sesi Ini</h3>
          <p className="text-[11px] text-white/80">Siswa yang berhasil klaim token</p>
        </div>
        <span className="text-xs font-semibold bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
          Realtime
        </span>
      </div>

      <div className="p-5 space-y-3 bg-slate-50/50 flex-1">
        {samplePresensi.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <div>
                <div className="text-xs font-bold text-slate-800">{p.namaAnak}</div>
                <div className="text-[10px] text-slate-500">{p.kelas} • {p.waktu}</div>
              </div>
            </div>
            <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
              {p.poin}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}