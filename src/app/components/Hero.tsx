import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-4 py-12 bg-slate-200">
      <div className="max-w-3xl text-center space-y-6">
        <span className="text-sm text-white bg-teal-600 px-4 py-1.5 rounded-lg inline-flex items-center justify-center leading-none -translate-y-[1px] shadow-xs">
          Pendampingan Belajar Anak SD (Kelas 1 - 3)
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
          Bantu Buah Hati Belajar Lebih Tenang dan <span className="text-teal-600">Penuh Perhatian</span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Pendampingan privat yang sabar dan telaten untuk membangun fondasi membaca, menulis, dan berhitung anak tanpa tekanan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/daftar" className="w-full sm:w-auto px-8 py-3.5 bg-violet-600 hover:bg-violet-800 text-white font-semibold rounded-xl shadow-md transition-all text-center">
            Daftar Sekarang
          </Link>
          <a href="#jadwal" className="w-full sm:w-auto px-3 py-3.5 bg-blue-600 text-white border-slate-200 hover:bg-blue-700 font-semibold rounded-xl shadow-xs transition-all text-center">
            Lihat Jadwal & Materi
          </a>
        </div>
      </div>
    </section>
  );
}