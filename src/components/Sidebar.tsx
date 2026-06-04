"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PATTERNS } from "@/data/patterns";
import { 
  Search, BookOpen, Home, ChevronRight, Menu, X
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filtrar patrones según búsqueda
  const filteredPatterns = PATTERNS.filter((pattern) => {
    const query = searchQuery.toLowerCase();
    return (
      pattern.name.toLowerCase().includes(query) ||
      pattern.englishName.toLowerCase().includes(query) ||
      pattern.concept.definicion.toLowerCase().includes(query)
    );
  });

  const isActive = (path: string) => pathname === path;

  const NavLink = ({ href, children, icon: Icon, onClick }: any) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          active
            ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="truncate">{children}</span>
      </Link>
    );
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 p-4">
      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar patrón..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/10 focus:border-indigo-500 dark:text-slate-200 dark:placeholder-slate-500 transition-all"
        />
      </div>

      {/* Navegación Principal */}
      <div className="flex flex-col gap-1 overflow-y-auto flex-1 pr-1 scrollbar-thin">
        <NavLink href="/" icon={Home} onClick={() => setIsOpen(false)}>
          Inicio
        </NavLink>
        <NavLink href="/introduccion" icon={BookOpen} onClick={() => setIsOpen(false)}>
          Introducción
        </NavLink>

        {/* Separador - Patrones */}
        <div className="mt-4 mb-2 px-3 text-xs font-semibold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
          Patrones de Comportamiento
        </div>
        
        <div className="flex flex-col gap-1 pl-2">
          {filteredPatterns.length > 0 ? (
            filteredPatterns.map((pattern) => {
              const href = `/patron/${pattern.id}`;
              const active = isActive(href);
              return (
                <Link
                  key={pattern.id}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                    active
                      ? "bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <span className="truncate">{pattern.name}</span>
                  <ChevronRight className={`h-3 w-3 transition-transform ${active ? "rotate-90 text-indigo-500" : "text-slate-400/50"}`} />
                </Link>
              );
            })
          ) : (
            <div className="px-3 py-2 text-xs text-slate-400 italic">No se encontraron patrones</div>
          )}
        </div>

        {/* No extras */}
      </div>
    </div>
  );

  return (
    <>
      {/* Botón flotante móvil para abrir/cerrar sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white md:hidden transition-all duration-300 active:scale-95"
        aria-label="Abrir menú"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar de escritorio (Fija a la izquierda) */}
      <aside className="hidden md:block w-64 h-[calc(100vh-4rem)] sticky top-16 shrink-0 z-10 overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Overlay y Sidebar en dispositivos móviles */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex transition-all duration-300">
          {/* Overlay translúcido */}
          <div 
            onClick={() => setIsOpen(false)} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          {/* Contenedor de la barra lateral */}
          <aside className="relative w-72 h-full z-50 animate-slide-in">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
