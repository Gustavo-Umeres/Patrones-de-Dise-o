"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Cpu } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Inicializar el tema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Controlar barra de progreso y cambio de scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-all duration-300">
      {/* Barra de progreso de lectura */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Cpu className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 dark:from-white dark:via-slate-200 dark:to-indigo-200 bg-clip-text text-transparent">
            GoF Behavioral Patterns
          </span>
        </Link>
      </div>
    </header>
  );
}
