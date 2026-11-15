export default function MateriFilterBar({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    onOpenModal,
  }: {
    search: string;
    setSearch: (v: string) => void;
    statusFilter: string;
    setStatusFilter: (v: string) => void;
    onOpenModal: () => void;
  }) {
    return (
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kelas / mapel..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
  
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="Semua">Semua Status</option>
            <option value="Menunggu">Menunggu Materi</option>
            <option value="Selesai">Sudah Diunggah</option>
          </select>
        </div>
  
        <button
          onClick={onOpenModal}
          className="w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>➕</span> Tambah Materi
        </button>
      </div>
    );
  }