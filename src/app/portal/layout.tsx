"use client";

import { useState } from "react";
import PortalSidebar from "./components/PortalSidebar";
import PortalTopbar from "./components/PortalTopbar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-slate-100 flex text-slate-800 overflow-hidden relative">
      
      {/* Backdrop blur saat sidebar menggelar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Portal Siswa */}
      <PortalSidebar 
        isOpen={isSidebarOpen} 
        onToggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
        onCloseMobile={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area dengan margin kiri ml-16 */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden ml-16">
        <PortalTopbar />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}