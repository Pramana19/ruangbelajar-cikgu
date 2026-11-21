"use client";

import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import { useAuthGuard } from "../../lib/useAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isChecking } = useAuthGuard("admin");

  if (isChecking) {
    return (
      <div className="h-screen bg-indigo-100 flex items-center justify-center text-sm font-medium text-slate-600">
        Memverifikasi sesi Pengajar...
      </div>
    );
  }

  return (
    <div className="h-screen bg-indigo-100 flex text-slate-800 overflow-hidden relative">
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden ml-16">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}