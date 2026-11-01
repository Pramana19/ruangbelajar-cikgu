import FormUploadTugas from "./components/FormUploadTugas";
import RiwayatTugasList from "./components/RiwayatTugasList";

export default function PortalTugasPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kumpulkan Tugas</h1>
        <p className="text-sm text-slate-500 mt-1">
          Unggah foto lembar jawaban atau file PDF tugas yang diberikan oleh Cikgu.
        </p>
      </div>

      <FormUploadTugas />
      <RiwayatTugasList />
    </div>
  );
}