import Link from "next/link";
import Navbar from "../components/Navbar";

export default function DaftarPage() {
  return (
    <main className="min-h-screen bg-slate-200 flex flex-col">
      {/* Panggil Navbar yang sudah modular */}
      <Navbar />

      {/* Konten Form Pendaftaran */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-6">
          
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-800">Pendaftaran Peserta Baru</h1>
            <p className="text-sm text-slate-600">
              Silakan isi data anak dan orang tua untuk bergabung dengan les privat Cikgu.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap Anak</label>
              <input 
                type="text" 
                placeholder="Contoh: Budi Santoso" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jenjang Kelas SD</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50">
                <option value="">Pilih Kelas</option>
                <option value="1">Kelas 1 SD</option>
                <option value="2">Kelas 2 SD</option>
                <option value="3">Kelas 3 SD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Email Orang Tua</label>
              <input 
                type="email" 
                placeholder="Contoh: orangtua@email.com" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp Orang Tua</label>
              <input 
                type="tel" 
                placeholder="Contoh: 081234567890" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
              />
            </div>

            {/* Grup Tombol Sejajar Horizontal: Batal & Kirim */}
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
                Kirim Pendaftaran
              </button>
            </div>
          </form>

        </div>
      </section>
    </main>
  );
}