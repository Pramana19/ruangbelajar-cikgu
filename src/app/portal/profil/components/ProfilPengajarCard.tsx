export default function ProfilPengajarCard() {
    return (
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl shadow-md overflow-hidden text-white p-1">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-4 flex items-center gap-1.5">
            <span>👩‍🏫</span> Pengajar Anda
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-700 text-xl font-black">
              C
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Cikgu Admin</h3>
              <p className="text-xs text-emerald-100">Pendamping Belajar SD</p>
            </div>
          </div>
  
          <div className="space-y-3 text-xs">
            <div className="bg-black/20 p-2.5 rounded-lg border border-white/10">
              <span className="block text-[10px] text-emerald-300 font-bold uppercase mb-0.5">Tentang</span>
              <p className="text-emerald-50 leading-relaxed line-clamp-3">
                Halo! Saya akan mendampingi anak Anda belajar dengan metode yang sabar, telaten, dan menyenangkan tanpa tekanan.
              </p>
            </div>
            
            <div className="bg-black/20 p-2.5 rounded-lg border border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span>💬</span>
                  <span className="font-mono text-emerald-100">0812-3456-7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <span className="font-mono text-emerald-100">admin@ruangbelajar.com</span>
                </div>
            </div>
          </div>
  
          <div className="mt-4">
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noreferrer"
                className="block w-full py-2 bg-white text-emerald-700 font-bold text-xs text-center rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
              >
                Hubungi via WhatsApp
              </a>
          </div>
        </div>
      </div>
    );
  }