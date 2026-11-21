import { supabase } from "./supabase";

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
  siswaId?: string;
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

const mapTicketRow = (row: Record<string, unknown>): PesanTicket => ({
  id: String(row.id),
  tanggal: String(row.tanggal || ""),
  siswaId: (row.siswa_id as string) || undefined,
  siswa: String(row.siswa || ""),
  kelas: String(row.kelas || ""),
  pesan: String(row.pesan || ""),
  status: (row.status as PesanTicket["status"]) || "Belum Dibalas",
  balasan: String(row.balasan || ""),
  arah: (row.arah as PesanTicket["arah"]) || "Masuk",
  isSiaran: Boolean(row.is_siaran),
  readBySiswa: Array.isArray(row.read_by_siswa) ? (row.read_by_siswa as string[]) : [],
  hiddenForSiswa: Boolean(row.hidden_for_siswa),
  lampiran: (row.lampiran as LampiranFile | null) || null,
  thread: Array.isArray(row.thread) ? (row.thread as ChatBubble[]) : [],
});

export async function fetchPesanTickets(): Promise<PesanTicket[]> {
  const { data, error } = await supabase
    .from("pesan_tickets")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(mapTicketRow);
}

export async function insertPesanTicket(ticket: PesanTicket): Promise<PesanTicket | null> {
  const { data, error } = await supabase
    .from("pesan_tickets")
    .insert({
      id: ticket.id,
      tanggal: ticket.tanggal,
      siswa_id: ticket.siswaId || null,
      siswa: ticket.siswa,
      kelas: ticket.kelas,
      pesan: ticket.pesan,
      status: ticket.status,
      balasan: ticket.balasan || "",
      arah: ticket.arah,
      is_siaran: Boolean(ticket.isSiaran),
      read_by_siswa: ticket.readBySiswa || [],
      hidden_for_siswa: Boolean(ticket.hiddenForSiswa),
      lampiran: ticket.lampiran || null,
      thread: ticket.thread || [],
    })
    .select()
    .single();
  if (error || !data) return null;
  return mapTicketRow(data);
}

export async function updatePesanTicket(
  id: string,
  updates: Record<string, unknown>
): Promise<boolean> {
  const { error } = await supabase.from("pesan_tickets").update(updates).eq("id", id);
  return !error;
}

export async function deletePesanTicket(id: string): Promise<boolean> {
  const { error } = await supabase.from("pesan_tickets").delete().eq("id", id);
  return !error;
}

export async function bersihkanPesanSelesai(hariBatas: number): Promise<boolean> {
  const batas = new Date();
  batas.setDate(batas.getDate() - hariBatas);
  const batasStr = batas.toISOString().split("T")[0];

  const { error } = await supabase
    .from("pesan_tickets")
    .delete()
    .eq("status", "Selesai")
    .lte("tanggal", batasStr);
  return !error;
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
    reader.onload = () =>
      resolve({ nama: file.name, tipe: isPdf ? "pdf" : "image", url: reader.result as string });
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}