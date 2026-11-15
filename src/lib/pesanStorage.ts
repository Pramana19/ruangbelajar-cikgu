export interface LampiranFile {
    nama: string;
    tipe: "image" | "pdf";
    url: string;
  }
  
  export interface ChatBubble {
    id: string;
    pengirim: "Siswa" | "Cikgu";
    namaPengirim: string;
    waktu: string;
    teks: string;
    lampiran?: LampiranFile | null;
    isRead?: boolean;
  }
  
  export interface PesanTicket {
    id: string;
    tanggal: string;
    siswa: string;
    kelas: string;
    pesan: string;
    status: "Belum Dibalas" | "Dibaca" | "Selesai" | "Terkirim";
    balasan: string;
    arah: "Masuk" | "Keluar";
    isSiaran?: boolean;
    readBySiswa?: string[];
    hiddenForSiswa?: boolean;
    lampiran?: LampiranFile | null;
    thread?: ChatBubble[];
  }
  
  export const STORAGE_KEY = "ruangbelajar_pesan_tickets";
  
  export const INITIAL_TICKETS: PesanTicket[] = [
    {
      id: "TKT-1003",
      tanggal: "2026-11-03",
      siswa: "Rian Hidayat",
      kelas: "Kelas 3 SD",
      pesan: "Cikgu, mau tanya jadwal minggu depan apakah diliburkan?",
      status: "Belum Dibalas",
      balasan: "",
      arah: "Masuk",
      thread: [
        { id: "C-1", pengirim: "Siswa", namaPengirim: "Rian Hidayat", waktu: "2026-11-03 09:15", teks: "Cikgu, mau tanya jadwal minggu depan apakah diliburkan?", isRead: false },
      ],
    },
    {
      id: "TKT-1002",
      tanggal: "2026-11-02",
      siswa: "Siti Rahma",
      kelas: "Kelas 1 SD",
      pesan: "Cikgu, saya tidak bisa akses materi matematika.",
      status: "Belum Dibalas",
      balasan: "",
      arah: "Masuk",
      thread: [
        { id: "C-2", pengirim: "Siswa", namaPengirim: "Siti Rahma", waktu: "2026-11-02 14:20", teks: "Cikgu, saya tidak bisa akses materi matematika.", isRead: false },
      ],
    },
    {
      id: "TKT-1001",
      tanggal: "2026-10-28",
      siswa: "Siti Rahma",
      kelas: "Kelas 1 SD",
      pesan: "Saya lupa bawa buku cetak untuk pertemuan kemarin.",
      status: "Selesai",
      balasan: "Tidak masalah, silakan unduh materi digitalnya di menu Ruang Materi ya.",
      arah: "Masuk",
      thread: [
        { id: "C-3", pengirim: "Siswa", namaPengirim: "Siti Rahma", waktu: "2026-10-28 10:00", teks: "Saya lupa bawa buku cetak untuk pertemuan kemarin.", isRead: true },
        { id: "C-4", pengirim: "Cikgu", namaPengirim: "Cikgu Admin", waktu: "2026-10-28 10:12", teks: "Tidak masalah, silakan unduh materi digitalnya di menu Ruang Materi ya.", isRead: true },
      ],
    },
  ];
  
  export function getTicketsFromStorage(): PesanTicket[] {
    if (typeof window === "undefined") return INITIAL_TICKETS;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
      return INITIAL_TICKETS;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_TICKETS;
    }
  }
  
  export function saveTicketsToStorage(tickets: PesanTicket[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
      window.dispatchEvent(new Event("storage"));
    }
  }
  
  export function bacaFileLampiran(file: File): Promise<LampiranFile | null> {
    return new Promise((resolve) => {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB agar aman tersimpan!");
        return resolve(null);
      }
      const isPdf = file.type === "application/pdf";
      const isImg = file.type.startsWith("image/");
      if (!isPdf && !isImg) {
        alert("Format didukung hanya gambar (PNG/JPG/JPEG) atau PDF!");
        return resolve(null);
      }
      const reader = new FileReader();
      reader.onload = () => resolve({ nama: file.name, tipe: isPdf ? "pdf" : "image", url: reader.result as string });
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }