import { LampiranFile } from "./pesanStorage";
import { supabase } from "./supabase";

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
  siswaId?: string;
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

const mapInstruksi = (row: Record<string, unknown>): InstruksiTugas => ({
  id: String(row.id),
  mapel: String(row.mapel || ""),
  judul: String(row.judul || ""),
  deskripsi: String(row.deskripsi || ""),
  tenggat: String(row.tenggat || "Fleksibel"),
  linkReferensi: (row.link_referensi as string) || "",
  lampiranList: (row.lampiran_list as LampiranFile[]) || [],
  dibuatPada: String(row.dibuat_pada || ""),
});

const mapSubmission = (row: Record<string, unknown>): PengumpulanTugas => ({
  id: String(row.id),
  tugasId: (row.tugas_id as string) || undefined,
  siswaId: (row.siswa_id as string) || undefined,
  judulTugas: String(row.judul_tugas || ""),
  siswa: String(row.siswa || ""),
  kelas: String(row.kelas || ""),
  mapel: String(row.mapel || ""),
  waktuKumpul: String(row.waktu_kumpul || ""),
  jawabanTeks: (row.jawaban_teks as string) || "",
  linkJawaban: (row.link_jawaban as string) || "",
  fileLampiran: (row.file_lampiran as LampiranFile | null) || null,
  status: (row.status as PengumpulanTugas["status"]) || "Menunggu Koreksi",
  nilai: (row.nilai as string) || "",
  catatanCikgu: (row.catatan_cikgu as string) || "",
  hiddenForSiswa: Boolean(row.hidden_for_siswa),
});

export async function fetchInstruksiTugas(): Promise<InstruksiTugas[]> {
  const { data, error } = await supabase
    .from("instruksi_tugas")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(mapInstruksi);
}

export async function upsertInstruksiTugas(
  payload: Omit<InstruksiTugas, "id" | "dibuatPada">,
  editId?: string
): Promise<InstruksiTugas | null> {
  const dbRow = {
    mapel: payload.mapel,
    judul: payload.judul,
    deskripsi: payload.deskripsi,
    tenggat: payload.tenggat || "Fleksibel",
    link_referensi: payload.linkReferensi || null,
    lampiran_list: payload.lampiranList || [],
  };

  if (editId) {
    const { data, error } = await supabase
      .from("instruksi_tugas")
      .update(dbRow)
      .eq("id", editId)
      .select()
      .single();
    if (error || !data) return null;
    return mapInstruksi(data);
  }

  const { data, error } = await supabase
    .from("instruksi_tugas")
    .insert({ ...dbRow, dibuat_pada: new Date().toISOString().split("T")[0] })
    .select()
    .single();
  if (error || !data) return null;
  return mapInstruksi(data);
}

export async function deleteInstruksiTugas(id: string): Promise<boolean> {
  const { error } = await supabase.from("instruksi_tugas").delete().eq("id", id);
  return !error;
}

export async function fetchPengumpulanTugas(siswaId?: string): Promise<PengumpulanTugas[]> {
  let query = supabase
    .from("pengumpulan_tugas")
    .select("*")
    .order("created_at", { ascending: false });
  if (siswaId) query = query.eq("siswa_id", siswaId);
  const { data, error } = await query;
  if (error || !data) return [];
  return data.map(mapSubmission);
}

export async function createPengumpulanTugas(
  payload: Omit<PengumpulanTugas, "id" | "status">
): Promise<PengumpulanTugas | null> {
  const { data, error } = await supabase
    .from("pengumpulan_tugas")
    .insert({
      tugas_id: payload.tugasId || null,
      siswa_id: payload.siswaId || null,
      judul_tugas: payload.judulTugas,
      siswa: payload.siswa,
      kelas: payload.kelas,
      mapel: payload.mapel,
      waktu_kumpul: payload.waktuKumpul,
      jawaban_teks: payload.jawabanTeks || null,
      link_jawaban: payload.linkJawaban || null,
      file_lampiran: payload.fileLampiran || null,
      status: "Menunggu Koreksi",
    })
    .select()
    .single();
  if (error || !data) return null;
  return mapSubmission(data);
}

export async function updatePengumpulanTugas(
  id: string,
  updates: Record<string, unknown>
): Promise<boolean> {
  const { error } = await supabase.from("pengumpulan_tugas").update(updates).eq("id", id);
  return !error;
}

export async function deletePengumpulanTugas(id: string): Promise<boolean> {
  const { error } = await supabase.from("pengumpulan_tugas").delete().eq("id", id);
  return !error;
}

export async function bersihkanSubmissionSudahDinilai(): Promise<boolean> {
  const { error } = await supabase.from("pengumpulan_tugas").delete().eq("status", "Sudah Dinilai");
  return !error;
}