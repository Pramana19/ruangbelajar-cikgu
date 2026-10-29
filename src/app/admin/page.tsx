"use client";

import TokenGeneratorWidget from "./components/TokenGeneratorWidget";
import AdminStatsCards from "./components/AdminStatsCards";
import RecentPresensiLog from "./components/RecentPresensiLog";
import RecentRegistrationsTable from "./components/RecentRegistrationsTable";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Selamat Datang, Cikgu! 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola pendaftaran les privat, buat token presensi harian, dan pantau aktivitas siswa.
        </p>
      </div>

      {/* Widget Token Presensi */}
      <TokenGeneratorWidget />

      {/* Grid Kartu Statistik */}
      <AdminStatsCards />

      {/* Grid 2 Kolom Log & Tabel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentPresensiLog />
        <div className="lg:col-span-2">
          <RecentRegistrationsTable />
        </div>
      </div>
    </div>
  );
}