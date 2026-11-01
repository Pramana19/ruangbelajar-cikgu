"use client";
import { useState } from "react";

export default function FAQList() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Bagaimana cara klaim token kehadiran presisi harian?", a: "Masukkan kode token 8 karakter yang diberikan oleh Cikgu di papan tulis pada menu Beranda, lalu klik tombol 'Kirim/Klaim +5 Pts'." },
    { q: "Bagaimana jika saya lupa password akun portal?", a: "Buka menu Profil Siswa, lalu pada bagian Keamanan Akun klik opsi 'Lupa Password Lama?'. Masukkan email Anda untuk menerima kode OTP verifikasi reset password." },
    { q: "Di mana saya bisa melihat materi belajar yang sudah dibagikan?", a: "Anda dapat mengakses seluruh modul materi, lembar kerja, dan panduan belajar melalui menu Ruang Materi di sidebar kiri." }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
      <div>
        <h3 className="font-bold text-slate-800 text-base">Pertanyaan yang Sering Diajukan (FAQ)</h3>
        <p className="text-xs text-slate-500">Klik pada pertanyaan di bawah untuk melihat penjelasan solusi cepat.</p>
      </div>
      <div className="space-y-3 pt-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
            <button type="button" onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-slate-800 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer">
              <span>{faq.q}</span>
              <span className="text-purple-600 font-bold ml-2">{activeFaq === index ? "−" : "+"}</span>
            </button>
            {activeFaq === index && (
              <div className="p-4 bg-white text-xs text-slate-600 border-t border-slate-200 leading-relaxed animate-in fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}