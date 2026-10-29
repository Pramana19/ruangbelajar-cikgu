import { Pendaftar } from "./PendaftarTable";

export default function PendaftarDetailModal({
  selectedPendaftar,
  onClose,
}: {
  selectedPendaftar: Pendaftar | null;
  onClose: () => void;
}) {
  if (!selectedPendaftar) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900">Detail Pendaftar</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-slate-400 uppercase text-[10px] font-bold block">
              Nama Anak
            </span>
            <span className="text-sm font-bold text-slate-900">
              {selectedPendaftar.namaAnak}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">
                Jenjang Kelas
              </span>
              <span className="font-semibold text-slate-800">
                {selectedPendaftar.kelas}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">
                Tanggal Daftar
              </span>
              <span className="font-semibold text-slate-800">
                {selectedPendaftar.tanggal}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-slate-400 uppercase text-[10px] font-bold block">
              Orang Tua / Wali
            </span>
            <span className="font-semibold text-slate-800">
              {selectedPendaftar.orangTua}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-slate-400 uppercase text-[10px] font-bold block">
              Email Orang Tua
            </span>
            <span className="font-mono text-slate-800">
              {selectedPendaftar.email}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-slate-400 uppercase text-[10px] font-bold block">
              Nomor WhatsApp
            </span>
            <span className="font-mono text-slate-800">
              {selectedPendaftar.whatsapp}
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
          <a
            href={`https://wa.me/${selectedPendaftar.whatsapp.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(selectedPendaftar.orangTua)},%20mengenai%20pendaftaran%20les%20privat%20${encodeURIComponent(selectedPendaftar.namaAnak)}...`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
          >
            Chat WhatsApp 💬
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}