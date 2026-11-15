"use client";

import { useState } from "react";
import TicketQueue, { PendingTicket } from "./components/TicketQueue";
import FormUploadMateri from "./components/FormUploadMateri";
import MateriFilterBar from "./components/MateriFilterBar";
import TambahMateriModal from "./components/TambahMateriModal";

export default function AdminMateriPage() {
  const [selectedTicket, setSelectedTicket] = useState<PendingTicket | null>(null);
  const [isDraftTicket, setIsDraftTicket] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<PendingTicket | null>(null);

  const [queue, setQueue] = useState<PendingTicket[]>([
    {
      id: 101,
      namaKelas: "Kelas SD Gabungan",
      mapel: "Matematika Dasar & Calistung",
      jadwal: "Senin, 19:00 - 21:00 WIB",
      status: "Menunggu",
    },
    {
      id: 102,
      namaKelas: "Kelas SD Gabungan",
      mapel: "Ilmu Pengetahuan Alam (IPA)",
      jadwal: "Kamis, 19:00 - 21:00 WIB",
      status: "Menunggu",
    },
  ]);

  const handleSaveTicket = (
    ticketData: Omit<PendingTicket, "id">,
    openUploadDirect: boolean,
    editId?: number
  ) => {
    if (editId) {
      setQueue((prev) =>
        prev.map((item) => (item.id === editId ? { ...ticketData, id: editId } : item))
      );
      return;
    }

    const createdTicket: PendingTicket = {
      ...ticketData,
      id: Date.now(),
    };

    if (openUploadDirect) {
      setIsDraftTicket(true);
      setSelectedTicket(createdTicket);
    } else {
      setQueue((prev) => [createdTicket, ...prev]);
    }
  };

  const handleCancelUpload = () => {
    setSelectedTicket(null);
    setIsDraftTicket(false);
  };

  const handleUploadSuccess = () => {
    if (selectedTicket) {
      if (isDraftTicket) {
        setQueue((prev) => [{ ...selectedTicket, status: "Selesai" }, ...prev]);
      } else {
        setQueue((prev) =>
          prev.map((t) =>
            t.id === selectedTicket.id ? { ...t, status: "Selesai" } : t
          )
        );
      }
      setSelectedTicket(null);
      setIsDraftTicket(false);
      alert("Materi berhasil diunggah dan didistribusikan ke portal siswa!");
    }
  };

  const handleDeleteTicket = (id: number) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenAddModal = () => {
    setEditingTicket(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (ticket: PendingTicket) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  const filteredQueue = queue.filter((item) => {
    const matchesSearch =
      item.namaKelas.toLowerCase().includes(search.toLowerCase()) ||
      item.mapel.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "Semua" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          onCancel={handleCancelUpload}
          onSubmitSuccess={handleUploadSuccess}
        />
      ) : (
        <>
          <MateriFilterBar
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onOpenModal={handleOpenAddModal}
          />

          <TicketQueue
            tickets={filteredQueue}
            onSelectTicket={(ticket) => {
              setIsDraftTicket(false);
              setSelectedTicket(ticket);
            }}
            onEditTicket={handleOpenEditModal}
            onDeleteTicket={handleDeleteTicket}
          />
        </>
      )}

      <TambahMateriModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTicket(null);
        }}
        onSaveTicket={handleSaveTicket}
        initialData={editingTicket}
      />
    </div>
  );
}