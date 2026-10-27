import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Schedule from "./components/Schedule";
import HowToRegister from "./components/HowToRegister";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Schedule />
      <HowToRegister />
      <FAQ />
      <Footer />
    </main>
  );
}