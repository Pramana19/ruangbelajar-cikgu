export default function MateriFilterTabs({
    activeTab,
    setActiveTab,
  }: {
    activeTab: "Semua" | "Video" | "PDF";
    setActiveTab: (tab: "Semua" | "Video" | "PDF") => void;
  }) {
    return (
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto">
        {(["Semua", "Video", "PDF"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab === "Semua" ? "📚 Semua Materi" : tab === "Video" ? "🎥 Video Belajar" : "📄 Modul PDF"}
          </button>
        ))}
      </div>
    );
  }