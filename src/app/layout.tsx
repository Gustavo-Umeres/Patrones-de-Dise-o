import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import BackToTop from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Patrones de Diseño de Comportamiento GoF - Catálogo Educativo",
  description: "Catálogo interactivo y educativo de los 11 patrones de comportamiento de Gang of Four (GoF) con código Java, diagramas UML y simuladores interactivos.",
  keywords: ["Design Patterns", "Patrones de Diseño", "Comportamiento", "GoF", "Java", "TypeScript", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col transition-colors duration-300">
        <Navbar />
        <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto">
          <Sidebar />
          <main className="flex-1 min-w-0 px-4 py-8 md:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </main>
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
