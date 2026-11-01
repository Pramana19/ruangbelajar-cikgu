export interface Materi {
    id: number;
    judul: string;
    tipe: "Video" | "PDF";
    url: string;
    mapel: string;
    tanggal: string;
    ukuran?: string;
  }
  
  export default function MateriCard({ item }: { item: Materi }) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-transform hover:shadow-md hover:-translate-y-1">
        {item.tipe === "Video" ? (
          <div className="aspect-video w-full bg-slate-900 relative">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={item.url}
              title={item.judul}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center flex-col gap-2">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shadow-inner">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dokumen PDF</span>
          </div>
        )}
  
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
              {item.mapel}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">{item.tanggal}</span>
          </div>
          
          <h3 className="font-bold text-slate-800 text-sm mb-4 leading-snug line-clamp-2">{item.judul}</h3>
  
          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">{item.tipe === "PDF" ? item.ukuran : "YouTube"}</span>
            {item.tipe === "PDF" ? (
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-bold rounded-lg transition-colors">
                Unduh PDF
              </button>
            ) : (
              <a href={item.url.replace("embed/", "watch?v=")} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg transition-colors">
                Buka YouTube ↗
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }