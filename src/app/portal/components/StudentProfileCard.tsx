export default function StudentProfileCard({ points }: { points: number }) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-500 text-white font-bold text-xl flex items-center justify-center shadow-md">
            SR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Siti Rahma</h1>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Kelas 1 SD
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Orang Tua: Dewi Lestari • Les Privat Matematika & Calistung
            </p>
          </div>
        </div>
  
        <div className="w-full sm:w-auto bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex items-center justify-between sm:justify-start gap-3">
          <div className="text-2xl">🏆</div>
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
              Total Reward Poin
            </div>
            <div className="text-xl font-black text-amber-900">
              {points} <span className="text-xs font-semibold">Pts</span>
            </div>
          </div>
        </div>
      </div>
    );
  }