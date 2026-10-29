export default function RecentPresensiLog() {
    const samplePresensi = [
      {
        id: 101,
        namaAnak: "Siti Rahma",
        kelas: "Kelas 1 SD",
        waktu: "16:05 WIB",
        poin: "+5 Poin",
      },
      {
        id: 102,
        namaAnak: "Rian Hidayat",
        kelas: "Kelas 3 SD",
        waktu: "16:12 WIB",
        poin: "+5 Poin",
      },
    ];
  
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Presensi Sesi Ini</h3>
            <p className="text-[11px] text-slate-500">Siswa yang berhasil klaim token</p>
          </div>
          <span className="text-xs font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
            Realtime
          </span>
        </div>
  
        <div className="space-y-3">
          {samplePresensi.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <div>
                  <div className="text-xs font-bold text-slate-800">{p.namaAnak}</div>
                  <div className="text-[10px] text-slate-500">{p.kelas} • {p.waktu}</div>
                </div>
              </div>
              <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                {p.poin}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }