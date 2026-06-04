"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PATTERNS } from "@/data/patterns";
import { GitCompare, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function Comparacion() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Tabla comparativa detallada
  const comparisonData = PATTERNS.map((p) => {
    let complejidad = "Medio";
    if (["Interpreter", "Visitor", "Memento"].includes(p.name)) complejidad = "Alto";
    if (["Template Method", "Strategy", "Iterator"].includes(p.name)) complejidad = "Bajo";

    return {
      id: p.id,
      name: p.name,
      english: p.englishName,
      propósito: p.concept.ideaCentral,
      problema: p.concept.problema,
      analogia: p.concept.analogia.split(":")[0] || p.concept.analogia,
      complejidad
    };
  });

  const filteredData = comparisonData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.propósito.toLowerCase().includes(query) ||
      item.problema.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8 py-4">
      {/* Cabecera */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <GitCompare className="h-8 w-8 text-indigo-500" />
          Comparación General de Patrones
        </h1>
        <p className="text-slate-650 dark:text-slate-400 text-sm md:text-base max-w-3xl">
          Compara los 11 patrones de diseño de comportamiento del catálogo GoF. Utiliza el buscador para filtrar rápidamente según palabras clave o propósitos.
        </p>
      </div>

      {/* Barra de Filtro */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filtrar por propósito o palabra clave..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/10 focus:border-indigo-500 dark:text-slate-200 dark:placeholder-slate-500 text-sm"
        />
      </div>

      {/* Tabla Comparativa */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
      >
        <table className="w-full text-xs md:text-sm text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-350 font-bold">
              <th className="p-4 w-[15%]">Patrón</th>
              <th className="p-4 w-[35%]">Propósito Central (GoF)</th>
              <th className="p-4 w-[30%]">Problema que Resuelve</th>
              <th className="p-4 w-[10%] text-center">Complejidad</th>
              <th className="p-4 w-[10%] text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/85 dark:divide-slate-800/80 text-slate-650 dark:text-slate-350">
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    <div>{item.name}</div>
                    <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{item.english}</div>
                  </td>
                  <td className="p-4 leading-relaxed">{item.propósito}</td>
                  <td className="p-4 leading-relaxed">{item.problema}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.complejidad === "Bajo" 
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : item.complejidad === "Medio"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    }`}>
                      {item.complejidad}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Link
                      href={`/patron/${item.id}`}
                      className="inline-flex px-2.5 py-1.5 rounded bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-semibold text-[10px] transition-all hover:shadow-sm"
                    >
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center italic text-slate-400">
                  No se encontraron patrones que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
