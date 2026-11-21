import Navbar from "../components/Navbar";
import DaftarForm from "./components/DaftarForm";

export default function DaftarPage() {
  return (
    <main className="min-h-screen md:h-screen bg-slate-200 flex flex-col md:overflow-hidden">
      <Navbar />
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-4">
        <DaftarForm />
      </section>
    </main>
  );
}