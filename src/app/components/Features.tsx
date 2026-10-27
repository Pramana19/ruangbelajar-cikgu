export default function Features() {
    const listFeatures = [
      { title: "Pendekatan Sabar", desc: "Membimbing anak dengan tempo belajar masing-masing tanpa rasa takut." },
      { title: "Suasana Menyenangkan", desc: "Metode interaktif agar anak tidak cepat bosan saat belajar di rumah." },
      { title: "Laporan Berkala", desc: "Orang tua akan selalu mendapat update perkembangan belajar anak." },
    ];
  
    return (
      <section id="keunggulan" className="min-h-[calc(100vh-73px)] flex flex-col justify-center py-16 px-6 md:px-12 bg-slate-400 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto space-y-12 w-full">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Kenapa Memilih Les Privat Cikgu?</h2>
            <p className="text-sm text-white bg-teal-700 px-4 py-1.5 rounded-lg inline-flex items-center justify-center leading-none -translate-y-[1px] shadow-xs">Fokus pada kenyamanan anak dan kemudahan komunikasi dengan orang tua.</p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listFeatures.map((item, index) => (
              <div key={index} className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="w-10 h-10 bg-teal-100 text-teal-700 font-bold rounded-xl flex items-center justify-center">
                  0{index + 1}
                </div>
                <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }