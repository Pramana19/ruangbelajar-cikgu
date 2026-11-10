"use client";

export default function IdentitasForm({ formData, onChange }: { formData: any, onChange: (e: any) => void }) {
  return (
    <div className="space-y-5">
      {/* Identitas Peserta */}
      <div>
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1">Identitas Peserta</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">NAMA ANAK</label>
            <input type="text" name="namaAnak" value={formData.namaAnak} onChange={onChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold text-slate-900" required />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">JENJANG KELAS</label>
            <select name="kelas" value={formData.kelas} onChange={onChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-teal-500 focus:outline-none">
              <option value="Kelas 1 SD">Kelas 1 SD</option>
              <option value="Kelas 2 SD">Kelas 2 SD</option>
              <option value="Kelas 3 SD">Kelas 3 SD</option>
            </select>
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-bold text-slate-500 mb-1.5">JENIS KELAMIN</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="radio" name="jenisKelamin" value="Laki-laki" checked={formData.jenisKelamin === "Laki-laki"} onChange={onChange} className="peer sr-only" />
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 peer-checked:border-teal-600 peer-checked:bg-white transition-colors"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-teal-600 scale-0 peer-checked:scale-100 transition-transform"></div>
                </div>
                <span className="text-sm text-slate-700">Laki-laki</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="radio" name="jenisKelamin" value="Perempuan" checked={formData.jenisKelamin === "Perempuan"} onChange={onChange} className="peer sr-only" />
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 peer-checked:border-teal-600 peer-checked:bg-white transition-colors"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-teal-600 scale-0 peer-checked:scale-100 transition-transform"></div>
                </div>
                <span className="text-sm text-slate-700">Perempuan</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Kontak Wali */}
      <div>
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1">Kontak Wali</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-bold text-slate-500 mb-1">NAMA ORANG TUA / WALI</label>
            <input type="text" name="orangTua" value={formData.orangTua} onChange={onChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-teal-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">NOMOR WHATSAPP</label>
            <input type="text" name="whatsapp" value={formData.whatsapp} onChange={onChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 focus:ring-2 focus:ring-teal-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">ALAMAT EMAIL</label>
            <input type="email" name="email" value={formData.email} onChange={onChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 focus:ring-2 focus:ring-teal-500 focus:outline-none" required />
          </div>
        </div>
      </div>
    </div>
  );
}