"use client";

import { useState } from "react";
import StudentProfileCard from "./components/StudentProfileCard";
import TokenClaimWidget from "./components/TokenClaimWidget";
import AttendanceHistory from "./components/AttendanceHistory";
import JadwalTerdekatWidget from "./components/JadwalTerdekatWidget";

export default function PortalSiswaPage() {
  const [userPoints, setUserPoints] = useState(25);
  const [isClaimedToday, setIsClaimedToday] = useState(false);

  // Data dummy langganan untuk disimulasikan ke profil siswa
  const dummyStudentData = {
    nama: "Siti Rahma",
    kelas: "Kelas 1 SD",
    orangTua: "Dewi Lestari",
    paketLangganan: "Paket 1 Bulan",
    statusPembayaran: "Lunas",
    tanggalMulai: "2026-10-27", // Format YYYY-MM-DD
    jatuhTempo: "2026-11-27", 
  };

  const ACTIVE_TOKEN = "CIKGU28OCT";

  const handleSuccessClaim = () => {
    setUserPoints((prev) => prev + 5);
    setIsClaimedToday(true);
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      {/* Oper data dummy ke dalam komponen Profile Card */}
      <StudentProfileCard points={userPoints} studentData={dummyStudentData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TokenClaimWidget
            activeToken={ACTIVE_TOKEN}
            isClaimed={isClaimedToday}
            onSuccessClaim={handleSuccessClaim}
          />
          <JadwalTerdekatWidget />
        </div>
        <div>
          <AttendanceHistory isClaimed={isClaimedToday} />
        </div>
      </div>
    </div>
  );
}