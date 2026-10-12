import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Haunted Library | 5-Day Horror Challenge - Band 1 EMI English Week",
  description: "An interactive gamified educational reading platform designed for Band 1 EMI students mastering HKDSE Paper 1 Gothic & Horror literature.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
