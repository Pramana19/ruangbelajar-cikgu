"use client";

import { useState } from "react";
import StudentProfileCard from "./components/StudentProfileCard";
import TokenClaimWidget from "./components/TokenClaimWidget";
import AttendanceHistory from "./components/AttendanceHistory";
import JadwalTerdekatWidget from "./components/JadwalTerdekatWidget";

export default function PortalSiswaPage() {
  const [userPoints, setUserPoints] = useState(25);
  const [isClaimedToday, setIsClaimedToday] = useState(false);

  const ACTIVE_TOKEN = "CIKGU28OCT";

  const handleSuccessClaim = () => {
    setUserPoints((prev) => prev + 5);
    setIsClaimedToday(true);
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      <StudentProfileCard points={userPoints} />

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