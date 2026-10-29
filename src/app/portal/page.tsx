"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import StudentProfileCard from "./components/StudentProfileCard";
import TokenClaimWidget from "./components/TokenClaimWidget";
import AttendanceHistory from "./components/AttendanceHistory";

export default function PortalSiswaPage() {
  const [userPoints, setUserPoints] = useState(25);
  const [isClaimedToday, setIsClaimedToday] = useState(false);

  // Token resmi yang sedang di-generate Cikgu di /admin
  const ACTIVE_TOKEN = "CIKGU28OCT";

  const handleSuccessClaim = () => {
    setUserPoints((prev) => prev + 5);
    setIsClaimedToday(true);
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />

      <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <StudentProfileCard points={userPoints} />

        <TokenClaimWidget
          activeToken={ACTIVE_TOKEN}
          isClaimed={isClaimedToday}
          onSuccessClaim={handleSuccessClaim}
        />

        <AttendanceHistory isClaimed={isClaimedToday} />
      </div>
    </main>
  );
}