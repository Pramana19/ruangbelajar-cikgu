"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import StudentProfileCard from "./components/StudentProfileCard";
import TokenClaimWidget from "./components/TokenClaimWidget";
import AttendanceHistory from "./components/AttendanceHistory";
import JadwalTerdekatWidget from "./components/JadwalTerdekatWidget";

interface StudentData {
  nama: string;
  kelas: string;
  orangTua: string;
  paketLangganan: string;
  statusPembayaran: string;
  tanggalMulai: string;
  jatuhTempo: string;
}

export default function PortalSiswaPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [isClaimedToday, setIsClaimedToday] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | undefined>(undefined);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (prof) {
        setUserId(prof.id);
        setUserPoints(prof.poin ?? 0);
        setStudentData({
          nama: prof.nama_lengkap || "Peserta",
          kelas: prof.kelas || "Kelas 1 SD",
          orangTua: prof.nama_ortu || "-",
          paketLangganan: prof.paket_langganan || "Belum Set Paket",
          statusPembayaran: prof.status_pembayaran || "Belum Lunas",
          tanggalMulai: prof.tanggal_mulai || "",
          jatuhTempo: prof.jatuh_tempo || "",
        });
      }
    };

    loadProfile();
  }, []);

  const ACTIVE_TOKEN = "CIKGU28OCT";

  const handleSuccessClaim = async () => {
    const nextPoints = userPoints + 5;
    setUserPoints(nextPoints);
    setIsClaimedToday(true);
    if (userId) {
      await supabase.from("profiles").update({ poin: nextPoints }).eq("id", userId);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      <StudentProfileCard points={userPoints} studentData={studentData} />

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