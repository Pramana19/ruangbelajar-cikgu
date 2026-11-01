"use client";

import { useState } from "react";
import TicketQueue, { PendingTicket } from "./components/TicketQueue";
import FormUploadMateri from "./components/FormUploadMateri";

export default function AdminMateriPage() {
  const [selectedTicket, setSelectedTicket] = useState<PendingTicket | null>(null);

  // Tambahkan property status pada initial state
  const [queue, setQueue] = useState<PendingTicket[]>([
    {
      id: 101,
      namaKelas: "Kelas SD Gabungan",
      mapel: "Matematika Dasar & Calistung",
      jadwal: "Senin, 19:00 WIB",
      status: "Menunggu",
    },
    {
      id: 102,
      namaKelas: "Kelas SD Gabungan",
      mapel: "Ilmu Pengetahuan Alam (IPA)",
      jadwal: "Kamis, 19:00 WIB",
      status: "Menunggu",
    },
  ]);

  const handleUploadSuccess = () => {
    if (selectedTicket) {
      // Ubah status tiket menjadi "Selesai", BUKAN dihapus (filter)
      setQueue((prev) =>
        prev.map((t) =>
          t.id === selectedTicket.id ? { ...t, status: "Selesai" } : t
        )
      );
      setSelectedTicket(null);
      alert("Materi berhasil diunggah dan didistribusikan ke portal siswa!");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manajemen Ruang Materi</h1>
        <p className="text-sm text-slate-500 mt-1">
          Sistem antrian pintar (ticketing) untuk mengingatkan jadwal materi yang belum diunggah.
        </p>
      </div>

      {selectedTicket ? (
        <FormUploadMateri 
          ticket={selectedTicket} 
          onCancel={() => setSelectedTicket(null)} 
          onSubmitSuccess={handleUploadSuccess} 
        />
      ) : (
        <TicketQueue 
          tickets={queue} 
          onSelectTicket={setSelectedTicket} 
        />
      )}
    </div>
  );
}