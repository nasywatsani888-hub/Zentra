import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZENTRA - Predictive Bearing Health Monitoring",
  description: "Sistem Early Detection & Diagnosa Kerusakan Bearing Mesin CNC Berbasis AI LSTM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-[#0B0F19] text-slate-100">
        {children}
      </body>
    </html>
  );
}
