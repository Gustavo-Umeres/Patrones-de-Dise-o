"use client";

import { motion } from "framer-motion";
import { BookMarked, ExternalLink } from "lucide-react";

interface Reference {
  author: string;
  year: string;
  title: string;
  publisher: string;
  url?: string;
}

const REFERENCES: Reference[] = [
  {
    author: "Gamma, E., Helm, R., Johnson, R., & Vlissides, J.",
    year: "1994",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    publisher: "Addison-Wesley Professional"
  },
  {
    author: "Freeman, E., Robson, E., Sierra, K., & Bates, B.",
    year: "2020",
    title: "Head First Design Patterns: Building Extensible and Maintainable Object-Oriented Software (2nd ed.)",
    publisher: "O'Reilly Media"
  },
  {
    author: "Shvets, A.",
    year: "2018",
    title: "Refactoring.Guru: Patrones de Diseño de Comportamiento",
    publisher: "Refactoring.Guru",
    url: "https://refactoring.guru/es/design-patterns/behavioral-patterns"
  },
  {
    author: "Oracle Corporation",
    year: "2023",
    title: "Java Documentation: Standard API Collections & Iterators",
    publisher: "Oracle Help Center",
    url: "https://docs.oracle.com/en/java/"
  },
  {
    author: "Microsoft Corporation",
    year: "2024",
    title: "Microsoft Learn: .NET Design Patterns Architecture Guide",
    publisher: "Microsoft Learn Documentation",
    url: "https://learn.microsoft.com/"
  }
];

export default function Bibliografia() {
  return (
    <div className="space-y-8 py-4">
      {/* Cabecera */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <BookMarked className="h-8 w-8 text-indigo-500" />
          Referencias Bibliográficas
        </h1>
        <p className="text-slate-650 dark:text-slate-400 text-sm md:text-base max-w-3xl">
          Consulte las fuentes académicas y la documentación oficial utilizada para el desarrollo teórico y los ejemplos prácticos de este catálogo de patrones de diseño.
        </p>
      </div>

      {/* Listado APA */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {REFERENCES.map((ref, idx) => (
          <div 
            key={idx} 
            className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/10 hover:border-indigo-500/20 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="space-y-1.5 text-xs md:text-sm">
              <p className="text-slate-500 dark:text-slate-400 font-semibold">{ref.author} ({ref.year}).</p>
              <p className="text-slate-850 dark:text-slate-200 font-bold italic">
                {ref.title}.
              </p>
              <p className="text-slate-450 text-xs">{ref.publisher}.</p>
            </div>

            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
              >
                Visitar Fuente
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
