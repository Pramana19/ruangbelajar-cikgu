"use client";

import { useState } from "react";
import JadwalFilterBar from "./components/JadwalFilterBar";
import JadwalTable, { JadwalLes } from "./components/JadwalTable";
import TambahJadwalModal from "./components/TambahJadwalModal";

export default function JadwalAdminPage() {
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jadwalList, setJadwalList] = useState<JadwalLes[]>([
    {
      id: 1,
      namaKelas: "Kelas SD Gabungan",
      targetPeserta: "Siswa Kelas 1-6 SD",
      hari: "Senin",
      jam: "19:00 - 21:00 WIB",
      mapel: "Matematika Dasar & Calistung",
      status: "Aktif",
    },
    {
      id: 2,
      namaKelas: "Kelas SD Gabungan",
      targetPeserta: "Siswa Kelas 1-6 SD",
      hari: "Rabu",
      jam: "19:00 - 21:00 WIB",
      mapel: "Bahasa Inggris Dasar",
      status: "Aktif",
    },
    {
      id: 3,
      namaKelas: "Kelas SD Gabungan",
      targetPeserta: "Siswa Kelas 1-6 SD",
      hari: "Kamis",
      jam: "19:00 - 21:00 WIB",
      mapel: "Ilmu Pengetahuan Alam (IPA)",
      status: "Aktif",
    },
  ]);

  const handleAddJadwal = (newJadwal: Omit<JadwalLes, "id">) => {
    const createdItem = {
      ...newJadwal,
      id: Date.now(),
    };
    setJadwalList((prev) => [createdItem, ...prev]);
  };

  const handleUpdateJadwal = (updatedItem: JadwalLes) => {
    setJadwalList((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteJadwal = (id: number) => {
    setJadwalList((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredJadwal = jadwalList.filter((item) => {
    const matchesSearch =
      item.namaKelas.toLowerCase().includes(search.toLowerCase()) ||
      item.mapel.toLowerCase().includes(search.toLowerCase());
    const matchesDay = dayFilter === "Semua" || item.hari === dayFilter;

    return matchesSearch && matchesDay;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Jadwal Kelas Mingguan</h1>
        <p className="text-sm text-slate-500 mt-1">
          Atur dan pantau sesi kelas gabungan dan mata pelajaran yang diajarkan.
        </p>
      </div>

      <JadwalFilterBar
        search={search}
        setSearch={setSearch}
        dayFilter={dayFilter}
        setDayFilter={setDayFilter}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <JadwalTable
        jadwalList={filteredJadwal}
        onDelete={handleDeleteJadwal}
        onUpdate={handleUpdateJadwal}
      />

      <TambahJadwalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJadwal={handleAddJadwal}
      />
    </div>
  );
}