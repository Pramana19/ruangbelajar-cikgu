export default function Schedule() {
    const schedules = [
      { kelas: "Kelas 1 SD", mapel: "Calistung & Matematika Dasar", waktu: "Senin & Rabu (15.30 - 17.00)" },
      { kelas: "Kelas 2 SD", mapel: "Membaca Lancar & Tematik", waktu: "Selasa & Kamis (15.30 - 17.00)" },
      { kelas: "Kelas 3 SD", mapel: "Matematika & Bahasa Inggris Dasar", waktu: "Jumat & Sabtu (14.00 - 15.30)" },
    ];
  
    return (
      <section id="jadwal" className="min-h-[calc(100vh-73px)] flex flex-col justify-center py-16 px-6 md:px-12 bg-slate-200 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto space-y-10 w-full">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Jenjang & Jadwal Belajar</h2>
            <p className="text-sm text-white bg-teal-600 px-4 py-1.5 rounded-lg inline-flex items-center justify-center leading-none -translate-y-[1px] shadow-xs">Pilih waktu yang fleksibel sesuai kebutuhan buah hati.</p>
          </div>
  
          <div className="grid grid-cols-1 gap-4">
            {schedules.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full">
                    {item.kelas}
                  </span>
                  <h3 className="font-bold text-slate-800 text-lg pt-1">{item.mapel}</h3>
                </div>
                <div className="text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/60">
                  📅 {item.waktu}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }