export default function RecentRegistrationsTable() {
    const sampleData = [
      {
        id: 1,
        namaAnak: "Bintang Pratama",
        kelas: "Kelas 2 SD",
        orangTua: "Budi Santoso",
        whatsapp: "081234567890",
        status: "Menunggu",
      },
      {
        id: 2,
        namaAnak: "Siti Rahma",
        kelas: "Kelas 1 SD",
        orangTua: "Dewi Lestari",
        whatsapp: "081987654321",
        status: "Dikonfirmasi",
      },
      {
        id: 3,
        namaAnak: "Rian Hidayat",
        kelas: "Kelas 3 SD",
        orangTua: "Ahmad Yani",
        whatsapp: "085611223344",
        status: "Dikonfirmasi",
      },
    ];
  
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Pendaftaran Terbaru</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Data orang tua yang mendaftar melalui formulir /daftar
            </p>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Nama Anak</th>
                <th className="py-3.5 px-4 font-semibold">Jenjang</th>
                <th className="py-3.5 px-4 font-semibold">Orang Tua</th>
                <th className="py-3.5 px-4 font-semibold">No. WhatsApp</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sampleData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {item.namaAnak}
                  </td>
                  <td className="py-3.5 px-4 text-xs">{item.kelas}</td>
                  <td className="py-3.5 px-4 text-xs">{item.orangTua}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-700">
                    {item.whatsapp}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        item.status === "Dikonfirmasi"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }