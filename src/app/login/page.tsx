import Link from "next/link";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-200 flex flex-col">
      {/* Panggil Navbar yang sudah modular */}
      <Navbar />

      {/* Konten Form Login */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-6">
          
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-800">Masuk ke RuangBelajar</h1>
            <p className="text-sm text-slate-600">
              Silakan masukkan akun terdaftar untuk mengakses dashboard.
            </p>
          </div>

          {/* Form Login */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email atau Nomor WhatsApp</label>
              <input 
                type="text" 
                placeholder="Contoh: cikgu@email.com / 08123..." 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kata Sandi (Password)</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
              />
            </div>

            {/* Grup Tombol Sejajar Horizontal: Batal & Masuk */}
            <div className="flex items-center gap-3 pt-2">
              <Link 
                href="/" 
                className="w-1/3 py-3 bg-red-700 border-slate-200 hover:bg-red-800 text-slate-200 font-semibold rounded-lg text-center transition-all text-sm shadow-xs"
              >
                Batal
              </Link>
              <button 
                type="submit" 
                className="w-2/3 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-all text-sm"
              >
                Masuk Sekarang
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2">
            Belum punya akun? <Link href="/daftar" className="text-teal-600 font-semibold hover:underline">Daftar di sini</Link>
          </div>

        </div>
      </section>
    </main>
  );
}