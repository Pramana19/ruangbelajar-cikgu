import Link from "next/link";

export default function HowToRegister() {
  const steps = [
    { title: "Isi Formulir", desc: "Klik tombol daftar dan isi data singkat anak serta pilihan kelas." },
    { title: "Konfirmasi WhatsApp", desc: "Admin/Cikgu akan menghubungi nomor orang tua untuk konfirmasi jadwal." },
    { title: "Mulai Belajar", desc: "Anak siap mengikuti sesi bimbingan belajar dengan nyaman." },
  ];

  return (
    <section id="cara-daftar" className="min-h-[calc(100vh-73px)] flex flex-col justify-center py-16 px-6 md:px-12 bg-slate-400 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto space-y-12 w-full">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Cara Pendaftaran Mudah</h2>
          <p className="text-sm text-white bg-teal-700 px-4 py-1.5 rounded-lg inline-flex items-center justify-center leading-none -translate-y-[1px] shadow-xs">Proses cepat tanpa prosedur yang rumit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, index) => (
            <div key={index} className="inline-block px-8 py-3.5 text-center space-y-3 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 bg-teal-600 text-white font-bold text-lg rounded-2xl mx-auto flex items-center justify-center shadow-md">
                {index + 1}
              </div>
              <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link href="/daftar" className="inline-block px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}