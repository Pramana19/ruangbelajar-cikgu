"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../lib/supabase";
import PendaftarFilterBar from "./components/PendaftarFilterBar";
import PendaftarTable, { Pendaftar } from "./components/PendaftarTable";
import PendaftarDetailModal from "./components/PendaftarDetailModal";
import PendaftarBatalModal from "./components/PendaftarBatalModal";

const formatTanggalID = (isoString: string) =>
  isoString
    ? new Date(isoString).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
    : "-";

export default function PendaftarPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftar | null>(null);
  const [pendaftarList, setPendaftarList] = useState<Pendaftar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendaftar = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "siswa")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPendaftarList(
        data.map((row) => ({
          id: row.id,
          namaAnak: row.nama_lengkap || "-",
          jenisKelamin: row.jenis_kelamin || "",
          kelas: row.kelas || "Kelas 1 SD",
          orangTua: row.nama_ortu || "-",
          whatsapp: row.no_wa || "",
          email: row.email || "-",
          tanggal: formatTanggalID(row.created_at),
          status: (row.status_akun as Pendaftar["status"]) || "Menunggu",
          paketLangganan: row.paket_langganan || "",
          statusPembayaran: (row.status_pembayaran as Pendaftar["statusPembayaran"]) || "",
          tanggalMulai: row.tanggal_mulai || "",
          jatuhTempo: row.jatuh_tempo || "",
        }))
      );
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPendaftar();
  }, [fetchPendaftar]);

  const handleDeletePendaftar = async (id: string) => {
    const { error } = await supabase.rpc("admin_delete_user", { target_id: id });
    if (error) return alert(`Gagal menghapus peserta: ${error.message}`);
    setPendaftarList((prev) => prev.filter((item) => item.id !== id));
    setSelectedPendaftar(null);
    alert("Data peserta berhasil dihapus permanen dari sistem.");
  };

  const handleAktifkanKembali = async (id: string) => {
    const { error } = await supabase.from("profiles").update({ status_akun: "Menunggu" }).eq("id", id);
    if (error) return alert(`Gagal mengaktifkan kembali: ${error.message}`);
    setPendaftarList((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Menunggu" } : item)));
    setSelectedPendaftar(null);
    alert("Status peserta berhasil diubah kembali menjadi Menunggu (Masuk antrian).");
  };

  const handleSavePendaftar = async (updated: Pendaftar) => {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        nama_lengkap: updated.namaAnak,
        kelas: updated.kelas,
        jenis_kelamin: updated.jenisKelamin,
        nama_ortu: updated.orangTua,
        no_wa: updated.whatsapp,
        email: updated.email,
        status_akun: updated.status,
        paket_langganan: updated.paketLangganan || null,
        status_pembayaran: updated.statusPembayaran || null,
        tanggal_mulai: updated.tanggalMulai || null,
        jatuh_tempo: updated.jatuhTempo || null,
      })
      .eq("id", updated.id)
      .select();

    if (error) return alert(`Gagal menyimpan perubahan: ${error.message}`);
    if (!data || data.length === 0) {
      return alert("Sesi login Pengajar berakhir atau akses ditolak. Silakan login ulang.");
    }

    setPendaftarList((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setSelectedPendaftar(null);
    alert("Data peserta berhasil diperbarui!");
  };

  const filteredList = pendaftarList.filter((item) => {
    const matchesSearch =
      item.namaAnak.toLowerCase().includes(search.toLowerCase()) ||
      item.orangTua.toLowerCase().includes(search.toLowerCase()) ||
      item.whatsapp.includes(search);
    const matchesStatus = statusFilter === "Semua Status" || statusFilter === "Semua" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kelola Data Pendaftar</h1>
        <p className="text-sm text-slate-500 mt-1">Verifikasi, edit data, dan kelola masa aktif langganan peserta les.</p>
      </div>

      <PendaftarFilterBar search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      {isLoading ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
          Memuat data pendaftar dari database...
        </div>
      ) : (
        <PendaftarTable filteredList={filteredList} onSelectPendaftar={setSelectedPendaftar} />
      )}

      {selectedPendaftar && selectedPendaftar.status === "Batal" ? (
        <PendaftarBatalModal pendaftar={selectedPendaftar} onClose={() => setSelectedPendaftar(null)} onAktifkan={handleAktifkanKembali} onDelete={handleDeletePendaftar} />
      ) : (
        selectedPendaftar && <PendaftarDetailModal selectedPendaftar={selectedPendaftar} onClose={() => setSelectedPendaftar(null)} onSave={handleSavePendaftar} />
      )}
    </div>
  );
}