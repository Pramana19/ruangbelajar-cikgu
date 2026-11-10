"use client";

import { useState, useEffect } from "react";
import { Pendaftar } from "./PendaftarTable";
import IdentitasForm from "./IdentitasForm";
import LanggananForm from "./LanggananForm";

interface PendaftarWithDate extends Pendaftar {
  tanggalMulai?: string;
}

export default function PendaftarDetailModal({
  selectedPendaftar,
  onClose,
  onSave,
}: {
  selectedPendaftar: Pendaftar | null;
  onClose: () => void;
  onSave: (data: Pendaftar) => void;
}) {
  const [formData, setFormData] = useState<PendaftarWithDate | null>(null);

  const calculateJatuhTempoRaw = (startDateStr: string, paket: string) => {
    if (!startDateStr) return "";
    const date = new Date(startDateStr);

    if (paket === "Per 1 Bulan") {
      date.setMonth(date.getMonth() + 1);
    } else if (paket === "Per 2 Bulan") {
      date.setMonth(date.getMonth() + 2);
    } else if (paket === "Per 3 Bulan") {
      date.setMonth(date.getMonth() + 3);
    }

    return date.toISOString().split("T")[0];
  };

  const formatDateToID = (dateStr: string) => {
    if (!dateStr || !dateStr.includes("-")) return dateStr;
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (selectedPendaftar) {
      const todayStr = new Date().toISOString().split("T")[0];
      setFormData({ 
        ...selectedPendaftar, 
        tanggalMulai: selectedPendaftar.tanggalMulai || todayStr,
        jatuhTempo: selectedPendaftar.jatuhTempo || calculateJatuhTempoRaw(todayStr, selectedPendaftar.paketLangganan || "Per 1 Bulan")
      });
    }
  }, [selectedPendaftar]);

  if (!selectedPendaftar || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handlePaketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paket = e.target.value;
    const startDate = formData.tanggalMulai || new Date().toISOString().split("T")[0];
    const jatuhTempo = calculateJatuhTempoRaw(startDate, paket);
    setFormData((prev) => (prev ? { ...prev, paketLangganan: paket, jatuhTempo } : null));
  };

  const handleTanggalMulaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDate = e.target.value;
    const paket = formData.paketLangganan || "Per 1 Bulan";
    const jatuhTempo = calculateJatuhTempoRaw(startDate, paket);
    setFormData((prev) => (prev ? { ...prev, tanggalMulai: startDate, jatuhTempo } : null));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100 z-10">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Kelola Data & Langganan</h3>
            <p className="text-[10px] text-slate-500">Edit informasi {formData.namaAnak}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer">
            ✕
          </button>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData as Pendaftar);
          }} 
          className="p-6 space-y-5"
        >
          {/* Panggil Komponen Modular Identitas */}
          <IdentitasForm formData={formData} onChange={handleChange} />

          {/* Panggil Komponen Modular Langganan */}
          <LanggananForm 
            formData={formData} 
            onChange={handleChange} 
            onPaketChange={handlePaketChange} 
            onTanggalChange={handleTanggalMulaiChange} 
            formatDateToID={formatDateToID} 
          />

          <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <a
              href={`https://wa.me/${formData.whatsapp.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(formData.orangTua)},%20mengenai%20pendaftaran%20les%20privat%20${encodeURIComponent(formData.namaAnak)}...`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              Chat WA 💬
            </a>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs transition-colors shadow-md cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}