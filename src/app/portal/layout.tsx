"use client";

import { useState } from "react";
import PortalSidebar from "./components/PortalSidebar";
import PortalTopbar from "./components/PortalTopbar";
import { useAuthGuard } from "../../lib/useAuthGuard";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isChecking, profile } = useAuthGuard("siswa");

  if (isChecking) {
    return (
      <div className="h-screen bg-indigo-100 flex items-center justify-center text-sm font-medium text-slate-600">
        Memverifikasi sesi Peserta...
      </div>
    );
  }

  return (
    <div className="h-screen bg-indigo-100 flex text-slate-800 overflow-hidden relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <PortalSidebar
        isOpen={isSidebarOpen}
        onToggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden ml-16">
        <PortalTopbar profile={profile} />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}