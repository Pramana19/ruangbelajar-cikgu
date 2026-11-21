"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";

export interface UserProfile {
  id: string;
  nama_lengkap: string;
  email: string;
  role: "admin" | "siswa";
  kelas: string | null;
  no_wa: string | null;
  nama_ortu: string | null;
  status_akun: string;
  paket_langganan: string | null;
  status_pembayaran: string | null;
  tanggal_mulai?: string | null;
  jatuh_tempo: string | null;
  poin?: number | null;
}

export function useAuthGuard(requiredRole: "admin" | "siswa") {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const loginPath = requiredRole === "admin" ? "/login?role=pengajar" : "/login?role=ortu";

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        if (isMounted) router.replace(loginPath);
        return;
      }

      const { data: prof } = await supabase
        .from("profiles")
        .select("id, nama_lengkap, email, role, kelas, no_wa, nama_ortu, status_akun, paket_langganan, status_pembayaran, tanggal_mulai, jatuh_tempo, poin")
        .eq("id", user.id)
        .single();

      if (!prof || prof.role !== requiredRole) {
        if (isMounted) router.replace(loginPath);
        return;
      }

      if (requiredRole === "siswa" && prof.status_akun !== "Dikonfirmasi") {
        await supabase.auth.signOut();
        if (isMounted) router.replace(loginPath);
        return;
      }

      if (isMounted) {
        setProfile(prof as UserProfile);
        setIsChecking(false);
      }
    };

    verifySession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") router.replace(loginPath);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [requiredRole, loginPath, router]);

  return { isChecking, profile };
}