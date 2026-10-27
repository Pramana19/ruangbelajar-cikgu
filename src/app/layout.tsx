import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RuangBelajar Cikgu - Les Privat SD Terpercaya",
  description: "Pendampingan belajar khusus anak SD Kelas 1-3 dengan pendekatan sabar dan menyenangkan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-100 text-slate-800 antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}