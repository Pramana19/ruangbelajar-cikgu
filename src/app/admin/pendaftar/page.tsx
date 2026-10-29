"use client";

import { useState } from "react";
import PendaftarFilterBar from "./components/PendaftarFilterBar";
import PendaftarTable, { Pendaftar } from "./components/PendaftarTable";
import PendaftarDetailModal from "./components/PendaftarDetailModal";

export default function PendaftarPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftar | null>(null);

  const [pendaftarList, setPendaftarList] = useState<Pendaftar[]>([
    {
      id: 1,
      namaAnak: "Bintang Pratama",
      kelas: "Kelas 2 SD",
      orangTua: "Budi Santoso",
      whatsapp: "081234567890",
      email: "budi.santoso@email.com",
      tanggal: "28 Okt 2026",
      status: "Menunggu",
    },
    {
      id: 2,
      namaAnak: "Siti Rahma",
      kelas: "Kelas 1 SD",
      orangTua: "Dewi Lestari",
      whatsapp: "081987654321",
      email: "dewi.lestari@email.com",
      tanggal: "27 Okt 2026",
      status: "Dikonfirmasi",
    },
    {
      id: 3,
      namaAnak: "Rian Hidayat",
      kelas: "Kelas 3 SD",
      orangTua: "Ahmad Yani",
      whatsapp: "085611223344",
      email: "ahmad.yani@email.com",
      tanggal: "25 Okt 2026",
      status: "Dikonfirmasi",
    },
    {
      id: 4,
      namaAnak: "Alif Husein",
      kelas: "Kelas 1 SD",
      orangTua: "Novi Fitri",
      whatsapp: "081399887766",
      email: "novi.fitri@email.com",
      tanggal: "24 Okt 2026",
      status: "Batal",
    },
  ]);

  const handleUpdateStatus = (
    id: number,
    newStatus: "Dikonfirmasi" | "Batal" | "Menunggu"
  ) => {
    setPendaftarList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedPendaftar && selectedPendaftar.id === id) {
      setSelectedPendaftar({ ...selectedPendaftar, status: newStatus });
    }
  };

  const filteredList = pendaftarList.filter((item) => {
    const matchesSearch =
      item.namaAnak.toLowerCase().includes(search.toLowerCase()) ||
      item.orangTua.toLowerCase().includes(search.toLowerCase()) ||
      item.whatsapp.includes(search);
    const matchesStatus =
      statusFilter === "Semua" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kelola Data Pendaftar</h1>
        <p className="text-sm text-slate-500 mt-1">
          Verifikasi dan kelola status pendaftaran calon peserta les privat baru.
        </p>
      </div>

      <PendaftarFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <PendaftarTable
        filteredList={filteredList}
        onSelectPendaftar={setSelectedPendaftar}
        onUpdateStatus={handleUpdateStatus}
      />

      <PendaftarDetailModal
        selectedPendaftar={selectedPendaftar}
        onClose={() => setSelectedPendaftar(null)}
      />
    </div>
  );
}