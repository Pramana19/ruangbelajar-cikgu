import { Suspense } from "react";
import Navbar from "../components/Navbar";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <main className="h-screen bg-slate-200 flex flex-col overflow-hidden">
      <Navbar />
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-4">
        <Suspense fallback={<div className="text-sm text-slate-600">Memuat portal login...</div>}>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}