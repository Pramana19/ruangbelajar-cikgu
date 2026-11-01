export default function JadwalTerdekatWidget() {
    // Simulasi array jadwal kosong (null state) dari database
    const jadwalTerdekat = [];
  
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="font-bold text-slate-800">Jadwal Kelas Terdekat</h2>
        </div>
        
        <div className="p-8 flex flex-col items-center justify-center text-center">
          {jadwalTerdekat.length === 0 ? (
            <>
              <div className="text-5xl mb-4">🛌</div>
              <h3 className="text-base font-bold text-slate-800 mb-1">Belum Ada Jadwal</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Cikgu belum menjadwalkan sesi les untukmu minggu ini. Waktunya istirahat atau mengulang pelajaran sebelumnya!
              </p>
            </>
          ) : (
            <div>{/* Nanti diisi mapping data jadwal jika ada */}</div>
          )}
        </div>
      </div>
    );
  }