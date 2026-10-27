import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-violet-800 border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-xs">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 bg-teal-500 rounded-full"></span>
        <Link href="/" className="font-bold text-lg text-white tracking-wide">
          RuangBelajar <span className="text-yellow-500 font-semibold text-3xl">Cikgu</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <a href="#keunggulan" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">Keunggulan</a>
        <a href="#jadwal" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">Jadwal & Jenjang</a>
        <a href="#cara-daftar" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">Cara Daftar</a>
        <a href="#faq" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">FAQ</a>
      </nav>

      <div className="flex items-center gap-3">
        {/* Tombol Login yang dibungkus Link */}
        <Link href="/login" className="px-4 py-2 text-sm font-semibold text-white hover:text-yellow-500 transition-all">
          Login
        </Link>
        <Link href="/daftar" className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all">
          Daftar
        </Link>
      </div>
    </header>
  );
}