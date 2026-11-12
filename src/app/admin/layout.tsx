"use client";

import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-indigo-100 flex text-slate-800 overflow-hidden relative">
      
      {/* Panggil Komponen Modular Sidebar */}
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden ml-16">
        
        {/* Panggil Komponen Modular Topbar */}
        <AdminTopbar />

        {/* Konten Halaman Aktif (Dashboard, Pendaftar, dll) */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}