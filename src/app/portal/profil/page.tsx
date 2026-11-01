import EditProfilForm from "./components/EditProfilForm";
import EditPasswordForm from "./components/EditPasswordForm";
import ProfilPengajarCard from "./components/ProfilPengajarCard";

export default function PortalProfilPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profil & Pengaturan</h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola data diri peserta, keamanan akun, dan lihat informasi pengajar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EditProfilForm />
          <EditPasswordForm />
        </div>
        <div className="space-y-6">
          <ProfilPengajarCard />
        </div>
      </div>
    </div>
  );
}