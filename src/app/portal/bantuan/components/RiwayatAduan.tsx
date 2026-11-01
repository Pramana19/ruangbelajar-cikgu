"use client";

export default function RiwayatAduan() {
  const riwayatAduan = [
    { id: "TKT-1002", tanggal: "2026-11-02", pesan: "Cikgu, saya tidak bisa akses materi matematika.", status: "Diproses", response: null },
    { id: "TKT-1001", tanggal: "2026-10-28", pesan: "Saya lupa bawa buku cetak untuk pertemuan kemarin.", status: "Selesai", response: "Tidak masalah, silakan unduh materi digitalnya di menu Ruang Materi." }
  ];

  return (
    <div className="animate-in fade-in space-y-4">
      {riwayatAduan.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="text-xs font-bold text-slate-500">{item.id} • {item.tanggal}</div>
            <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
              item.status === "Selesai" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              {item.status}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Pertanyaan Anda:</p>
            <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100">{item.pesan}</p>
          </div>
          {item.response && (
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 mt-2">
              <p className="text-xs font-bold text-purple-700">Tanggapan Cikgu:</p>
              <p className="text-sm text-purple-900 mt-1">{item.response}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}