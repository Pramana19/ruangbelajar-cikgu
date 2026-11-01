"use client";
import { useState } from "react";
import FormAduan from "./components/FormAduan";
import FAQList from "./components/FAQList";
import RiwayatAduan from "./components/RiwayatAduan";

export default function BantuanPage() {
  const [activeTab, setActiveTab] = useState<"kirim" | "riwayat">("kirim");

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bantuan</h1>
        <p className="text-sm text-slate-500 mt-1">
          Temukan jawaban seputar kendala aplikasi atau ajukan pertanyaan langsung kepada Cikgu.
        </p>
      </div>

      {/* Navigasi Tab */}
      <div className="flex gap-2 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("kirim")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${activeTab === "kirim" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Kirim Aduan & FAQ
        </button>
        <button 
          onClick={() => setActiveTab("riwayat")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${activeTab === "riwayat" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Riwayat Aduan Saya
        </button>
      </div>

      {/* Konten Tab */}
      {activeTab === "kirim" ? (
        <div className="animate-in fade-in space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FormAduan onSuccess={() => setActiveTab("riwayat")} />
            </div>
            
            {/* Card Kontak Cepat (WhatsApp) */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900 to-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-purple-500/30 flex items-center justify-center font-bold text-lg">💬</div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base">Butuh Respon Cepat?</h3>
                  <p className="text-xs text-purple-200 leading-relaxed">Anda juga dapat menghubungi Cikgu pendamping belajar secara langsung via WhatsApp.</p>
                </div>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="inline-block w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs text-center transition-colors shadow-sm cursor-pointer mt-auto">
                  Chat WhatsApp Cikgu
                </a>
              </div>
            </div>
          </div>
          <FAQList />
        </div>
      ) : (
        <RiwayatAduan />
      )}
    </div>
  );
}