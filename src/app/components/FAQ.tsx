export default function FAQ() {
  const faqs = [
    { q: "Dimana lokasi tempat les privat diadakan?", a: "Les dilaksanakan secara tatap muka langsung di tempat Cikgu atau metode kunjungan rumah (sesuai kesepakatan)." },
    { q: "Apakah ada batasan jumlah peserta per sesi?", a: "Ya, agar bimbingan lebih maksimal dan fokus, setiap sesi dibatasi maksimal 3-5 anak saja." },
    { q: "Bagaimana jika anak berhalangan hadir?", a: "Orang tua dapat mengonfirmasi melalui WhatsApp sehari sebelumnya untuk penjadwalan ulang." },
  ];

  return (
    <section id="faq" className="min-h-[calc(100vh-73px)] flex flex-col justify-center py-16 px-6 md:px-12 bg-slate-200 border-t border-slate-200/60">
      <div className="max-w-3xl mx-auto space-y-10 w-full">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-sm text-white bg-teal-600 px-4 py-1.5 rounded-lg inline-flex items-center justify-center leading-none -translate-y-[1px] shadow-xs">Informasi penting seputar kegiatan les privat.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
              <h3 className="font-bold text-slate-800 text-base">{item.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}