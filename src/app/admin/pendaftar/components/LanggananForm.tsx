"use client";

export default function LanggananForm({ formData, onChange, onPaketChange, onTanggalChange, formatDateToID }: { 
  formData: any, 
  onChange: (e: any) => void, 
  onPaketChange: (e: any) => void, 
  onTanggalChange: (e: any) => void,
  formatDateToID: (d: string) => string 
}) {
  return (
    <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100 space-y-4">
      <div className="flex items-center justify-between border-b border-teal-100 pb-1">
        <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider">Manajemen Langganan & Status</h4>
        <span className="text-[10px] bg-teal-200 text-teal-900 px-2 py-0.5 rounded font-bold">Sistem Aktif</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Tambahan: Dropdown Ubah Status Akun (Solusi agar siswa yang berhenti bisa diganti statusnya) */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">STATUS AKUN SISWA</label>
          <select name="status" value={formData.status || ""} onChange={onChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none font-bold text-slate-800">
            <option value="Dikonfirmasi">Dikonfirmasi (Aktif)</option>
            <option value="Menunggu">Menunggu (Antrian)</option>
            <option value="Batal">Batal / Berhenti Berlangganan</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">STATUS PEMBAYARAN</label>
          <select name="statusPembayaran" value={formData.statusPembayaran || ""} onChange={onChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold text-slate-800">
            <option value="">Pilih Status</option>
            <option value="Lunas">✓ Lunas</option>
            <option value="Belum Lunas">⚠ Belum Lunas (Lockout Akun)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">KATEGORI PAKET LES</label>
          <select name="paketLangganan" value={formData.paketLangganan || ""} onChange={onPaketChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold text-slate-800">
            <option value="">Belum Set Paket</option>
            <option value="Per 1 Bulan">Paket 1 Bulan</option>
            <option value="Per 2 Bulan">Paket 2 Bulan</option>
            <option value="Per 3 Bulan">Paket 3 Bulan</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">TANGGAL MULAI LES</label>
          <input 
            type="date" 
            value={formData.tanggalMulai || ""} 
            onChange={onTanggalChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium text-slate-800" 
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold text-slate-500 mb-1">TANGGAL JATUH TEMPO BERIKUTNYA</label>
          <div className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-100 font-bold text-slate-700 flex items-center justify-between">
            <span>{formData.jatuhTempo ? formatDateToID(formData.jatuhTempo) : "Pilih paket dulu"}</span>
            <span className="text-[10px] text-teal-700 font-normal">Dihitung Otomatis oleh Sistem</span>
          </div>
        </div>

      </div>
    </div>
  );
}