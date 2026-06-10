"use client";

import { motion } from "framer-motion";
import { BookMarked, FileText, Link as LinkIcon, Book } from "lucide-react";

export default function Bibliografia() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 py-4">
      <motion.div variants={itemVariants} className="space-y-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full w-fit">
          Fuentes de Estudio
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          Bibliografía y Referencias
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          Libros, documentación y artículos utilizados como base para la investigación de los Patrones de Comportamiento.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Libros */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
            <Book className="h-6 w-6 text-indigo-500" />
            Libros
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-indigo-500/30 transition-all">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <BookMarked className="h-4 w-4 text-slate-400" />
                Design Patterns: Elements of Reusable Object-Oriented Software
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                <strong>Autores:</strong> Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides (Gang of Four).<br/>
                <strong>Editorial:</strong> Addison-Wesley Professional.<br/>
                <em>La obra fundamental (1994) que catalogó los 23 patrones clásicos y estableció las bases de la ingeniería de software moderna orientada a objetos.</em>
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-indigo-500/30 transition-all">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <BookMarked className="h-4 w-4 text-slate-400" />
                Head First Design Patterns
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                <strong>Autores:</strong> Eric Freeman, Elisabeth Robson.<br/>
                <strong>Editorial:</strong> O'Reilly Media.<br/>
                <em>Un libro altamente visual y didáctico para entender cómo aplicar los patrones en Java mediante ejemplos prácticos y fáciles de digerir.</em>
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-indigo-500/30 transition-all">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <BookMarked className="h-4 w-4 text-slate-400" />
                Patterns of Enterprise Application Architecture
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                <strong>Autor:</strong> Martin Fowler.<br/>
                <strong>Editorial:</strong> Addison-Wesley.<br/>
                <em>Un enfoque más arquitectónico sobre cómo escalar sistemas empresariales complejos y aplicar patrones en el diseño del dominio.</em>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Artículos y Documentación Oficial */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
            <FileText className="h-6 w-6 text-emerald-500" />
            Artículos y Documentación Oficial
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/30 transition-all">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-slate-400" />
                Refactoring.Guru
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Excelente recurso online interactivo y moderno (por Alexander Shvets) que explica de forma ilustrada los patrones GoF, su anatomía y sus equivalencias en distintos lenguajes, incluyendo Java y TypeScript.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/30 transition-all">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-slate-400" />
                Documentación Oficial de Java (Oracle Docs)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Uso nativo de patrones dentro de la librería estándar de Java (<code>java.util.Iterator</code>, <code>java.beans.PropertyChangeListener</code>, el sistema de I/O, etc.), validando cómo la industria implementa estos patrones a nivel core.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/30 transition-all">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-slate-400" />
                Baeldung - Java Design Patterns
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Artículos técnicos especializados enfocados en el ecosistema Java y Spring Boot que exploran la implementación práctica de patrones de comportamiento.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
