import { LampiranFile } from "./pesanStorage";

export interface InstruksiTugas {
  id: string;
  mapel: string;
  judul: string;
  deskripsi: string;
  tenggat: string;
  linkReferensi?: string;
  lampiranList?: LampiranFile[];
  dibuatPada: string;
}

export interface PengumpulanTugas {
  id: string;
  tugasId?: string;
  judulTugas: string;
  siswa: string;
  kelas: string;
  mapel: string;
  waktuKumpul: string;
  jawabanTeks?: string;
  linkJawaban?: string;
  fileLampiran?: LampiranFile | null;
  status: "Menunggu Koreksi" | "Sudah Dinilai" | "Perlu Revisi";
  nilai?: string;
  catatanCikgu?: string;
  hiddenForSiswa?: boolean;
}

const KEY_INSTRUKSI = "ruangbelajar_instruksi_tugas";
const KEY_SUBMISSION = "ruangbelajar_pengumpulan_tugas";

const INITIAL_INSTRUKSI: InstruksiTugas[] = [
  {
    id: "TGS-01",
    mapel: "Matematika Dasar & Calistung",
    judul: "Latihan Perkalian & Soal Cerita",
    deskripsi: "1. Kerjakan soal perkalian halaman 12 buku modul.\n2. Tuliskan cara penyelesaiannya di kertas lalu foto atau ketik jawabannya.",
    tenggat: "2026-11-20",
    dibuatPada: "2026-11-15",
  },
  {
    id: "TGS-02",
    mapel: "Ilmu Pengetahuan Alam (IPA)",
    judul: "Pengamatan Bagian Tumbuhan",
    deskripsi: "1. Sebutkan 4 bagian utama tumbuhan dan fungsinya!\n2. Jika file foto/video di atas 2MB, tempelkan link Google Drive pada kolom tautan.",
    tenggat: "2026-11-22",
    dibuatPada: "2026-11-15",
  },
];

const INITIAL_SUBMISSIONS: PengumpulanTugas[] = [
  {
    id: "SUB-101",
    tugasId: "TGS-01",
    judulTugas: "Latihan Perkalian & Soal Cerita",
    siswa: "Siti Rahma",
    kelas: "Kelas 1 SD",
    mapel: "Matematika Dasar & Calistung",
    waktuKumpul: "2026-11-15 15:30",
    jawabanTeks: "1. 4 x 5 = 20\n2. Total apel di keranjang adalah 24 buah.",
    fileLampiran: { nama: "Tugas_MTK_Siti.pdf", tipe: "pdf", url: "#" },
    status: "Sudah Dinilai",
    nilai: "95",
    catatanCikgu: "Langkah pengerjaan sudah rapi dan benar semua!",
  },
];

export function getInstruksiTugas(): InstruksiTugas[] {
  if (typeof window === "undefined") return INITIAL_INSTRUKSI;
  const saved = localStorage.getItem(KEY_INSTRUKSI);
  if (!saved) {
    localStorage.setItem(KEY_INSTRUKSI, JSON.stringify(INITIAL_INSTRUKSI));
    return INITIAL_INSTRUKSI;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return INITIAL_INSTRUKSI;
  }
}

export function saveInstruksiTugas(data: InstruksiTugas[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY_INSTRUKSI, JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  }
}

export function getPengumpulanTugas(): PengumpulanTugas[] {
  if (typeof window === "undefined") return INITIAL_SUBMISSIONS;
  const saved = localStorage.getItem(KEY_SUBMISSION);
  if (!saved) {
    localStorage.setItem(KEY_SUBMISSION, JSON.stringify(INITIAL_SUBMISSIONS));
    return INITIAL_SUBMISSIONS;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return INITIAL_SUBMISSIONS;
  }
}

export function savePengumpulanTugas(data: PengumpulanTugas[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY_SUBMISSION, JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  }
}