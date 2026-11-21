"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import TicketQueue, { PendingTicket } from "./components/TicketQueue";
import FormUploadMateri from "./components/FormUploadMateri";
import MateriFilterBar from "./components/MateriFilterBar";
import TambahMateriModal, { JadwalAktifOption } from "./components/TambahMateriModal";

interface JadwalStatusRow extends JadwalAktifOption {
  status: string;
}

export default function AdminMateriPage() {
  const [selectedTicket, setSelectedTicket] = useState<PendingTicket | null>(null);
  const [isDraftTicket, setIsDraftTicket] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<PendingTicket | null>(null);
  const [queue, setQueue] = useState<PendingTicket[]>([]);
  const [allJadwalList, setAllJadwalList] = useState<JadwalStatusRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMateriDanJadwal = useCallback(async () => {
    setIsLoading(true);
    const [{ data: materiData }, { data: jadwalData }] = await Promise.all([
      supabase.from("materi_belajar").select("*").order("created_at", { ascending: false }),
      supabase.from("jadwal_kelas").select("id, nama_kelas, mapel, hari, jam, status"),
    ]);

    if (materiData) {
      setQueue(
        materiData.map((row) => ({
          id: row.id,
          namaKelas: row.nama_kelas,
          mapel: row.mapel,
          jadwal: row.jadwal,
          status: row.status as "Menunggu" | "Selesai",
          judul: row.judul || undefined,
          tipe: (row.tipe as "Video" | "PDF") || undefined,
          url: row.url || undefined,
          ukuran: row.ukuran || undefined,
          tanggal: row.tanggal || undefined,
        }))
      );
    }

    if (jadwalData) {
      setAllJadwalList(
        jadwalData.map((j) => ({
          id: j.id,
          namaKelas: j.nama_kelas,
          mapel: j.mapel,
          hari: j.hari,
          jam: j.jam,
          status: j.status,
        }))
      );
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMateriDanJadwal();
  }, [fetchMateriDanJadwal]);

  const activeJadwalList = allJadwalList.filter((j) => j.status === "Aktif");

  const activeQueue = queue.filter((item) => {
    if (item.status !== "Menunggu") return true;
    const keyKelas = item.namaKelas.toLowerCase();
    const keyMapel = item.mapel.toLowerCase();
    const punyaJadwalAktif = allJadwalList.some(
      (j) => j.status === "Aktif" && j.namaKelas.toLowerCase() === keyKelas && j.mapel.toLowerCase() === keyMapel
    );
    const sedangLibur = allJadwalList.some(
      (j) => j.status === "Libur" && j.namaKelas.toLowerCase() === keyKelas && j.mapel.toLowerCase() === keyMapel
    );
    return punyaJadwalAktif || !sedangLibur;
  });

  const unlinkedJadwal = activeJadwalList.filter(
    (j) =>
      !queue.some(
        (q) =>
          q.namaKelas.toLowerCase() === j.namaKelas.toLowerCase() &&
          q.mapel.toLowerCase() === j.mapel.toLowerCase()
      )
  );

  const handleSyncJadwalAktif = async () => {
    if (unlinkedJadwal.length === 0) return;
    const rowsToInsert = unlinkedJadwal.map((j) => ({
      nama_kelas: j.namaKelas,
      mapel: j.mapel,
      jadwal: `${j.hari}, ${j.jam}`,
      status: "Menunggu",
    }));

    const { data, error } = await supabase
      .from("materi_belajar")
      .insert(rowsToInsert)
      .select();

    if (error || !data) return alert(`Gagal menarik jadwal aktif: ${error?.message}`);
    const added: PendingTicket[] = data.map((row) => ({
      id: row.id,
      namaKelas: row.nama_kelas,
      mapel: row.mapel,
      jadwal: row.jadwal,
      status: "Menunggu",
    }));
    setQueue((prev) => [...added, ...prev]);
  };

  const handleSaveTicket = async (
    ticketData: Omit<PendingTicket, "id">,
    openUploadDirect: boolean,
    editId?: string
  ) => {
    if (editId) {
      const { error } = await supabase
        .from("materi_belajar")
        .update({
          nama_kelas: ticketData.namaKelas,
          mapel: ticketData.mapel,
          jadwal: ticketData.jadwal,
          judul: ticketData.judul || null,
        })
        .eq("id", editId);

      if (error) return alert(`Gagal memperbarui info materi: ${error.message}`);
      setQueue((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, ...ticketData, id: editId } : item))
      );
      return;
    }

    if (openUploadDirect) {
      setIsDraftTicket(true);
      setSelectedTicket({ ...ticketData, id: "draft" });
    } else {
      const { data, error } = await supabase
        .from("materi_belajar")
        .insert({
          nama_kelas: ticketData.namaKelas,
          mapel: ticketData.mapel,
          jadwal: ticketData.jadwal,
          judul: ticketData.judul || null,
          status: "Menunggu",
        })
        .select()
        .single();

      if (error || !data) return alert(`Gagal menambah antrian: ${error?.message}`);
      setQueue((prev) => [{ ...ticketData, id: data.id, status: "Menunggu" }, ...prev]);
    }
  };

  const handleUploadSuccess = async (materiData: {
    judul: string;
    tipe: "Video" | "PDF";
    url: string;
    ukuran?: string;
    tanggal: string;
  }) => {
    if (!selectedTicket) return;

    if (isDraftTicket) {
      const { data, error } = await supabase
        .from("materi_belajar")
        .insert({
          nama_kelas: selectedTicket.namaKelas,
          mapel: selectedTicket.mapel,
          jadwal: selectedTicket.jadwal,
          status: "Selesai",
          judul: materiData.judul,
          tipe: materiData.tipe,
          url: materiData.url,
          ukuran: materiData.ukuran || null,
          tanggal: materiData.tanggal,
        })
        .select()
        .single();

      if (error || !data) return alert(`Gagal menyimpan materi: ${error?.message}`);
      setQueue((prev) => [
        { ...selectedTicket, ...materiData, id: data.id, status: "Selesai" },
        ...prev,
      ]);
    } else {
      const { error } = await supabase
        .from("materi_belajar")
        .update({
          status: "Selesai",
          judul: materiData.judul,
          tipe: materiData.tipe,
          url: materiData.url,
          ukuran: materiData.ukuran || null,
          tanggal: materiData.tanggal,
        })
        .eq("id", selectedTicket.id);

      if (error) return alert(`Gagal memperbarui materi: ${error.message}`);
      setQueue((prev) =>
        prev.map((t) =>
          t.id === selectedTicket.id ? { ...t, ...materiData, status: "Selesai" } : t
        )
      );
    }

    setSelectedTicket(null);
    setIsDraftTicket(false);
    alert("Materi berhasil diunggah dan didistribusikan ke portal siswa!");
  };

  const handleDeleteTicket = async (id: string) => {
    const { error } = await supabase.from("materi_belajar").delete().eq("id", id);
    if (error) return alert(`Gagal menghapus materi: ${error.message}`);
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredQueue = activeQueue.filter((item) => {
    const matchesSearch =
      item.namaKelas.toLowerCase().includes(search.toLowerCase()) ||
      item.mapel.toLowerCase().includes(search.toLowerCase()) ||
      (item.judul || "").toLowerCase().includes(search.toLowerCase());
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
          onCancel={() => {
            setSelectedTicket(null);
            setIsDraftTicket(false);
          }}
          onSubmitSuccess={handleUploadSuccess}
        />
      ) : (
        <>
          <MateriFilterBar
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onOpenModal={() => {
              setEditingTicket(null);
              setIsModalOpen(true);
            }}
            onSyncJadwal={handleSyncJadwalAktif}
            unlinkedCount={unlinkedJadwal.length}
          />

          {isLoading ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
              Memuat daftar materi dari database...
            </div>
          ) : (
            <TicketQueue
              tickets={filteredQueue}
              onSelectTicket={(ticket) => {
                setIsDraftTicket(false);
                setSelectedTicket(ticket);
              }}
              onEditTicket={(ticket) => {
                setEditingTicket(ticket);
                setIsModalOpen(true);
              }}
              onDeleteTicket={handleDeleteTicket}
            />
          )}
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
        activeJadwalList={activeJadwalList}
      />
    </div>
  );
}