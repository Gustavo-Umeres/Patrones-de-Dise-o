"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Code, Database, LayoutGrid, ArrowRight, Calendar, Heart, ShieldAlert } from "lucide-react";

export default function Home() {
  // Configuración de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 py-4"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          Catálogo Oficial GoF
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-slate-200 bg-clip-text text-transparent">
          Patrones de Diseño de Comportamiento
        </h1>
        <p className="text-xl text-slate-500 dark:text-indigo-300 font-semibold tracking-wide">
          Behavioral Design Patterns — Catálogo GoF (Gang of Four)
        </p>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-base leading-relaxed">
          Los patrones de comportamiento se centran en los algoritmos y la asignación de responsabilidades entre objetos. No solo describen patrones de objetos o clases, sino también los patrones de comunicación entre ellos. Estos patrones caracterizan flujos de control complejos que son difíciles de seguir en tiempo de ejecución.
        </p>
        <div className="pt-4">
          <Link 
            href="/introduccion" 
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all"
          >
            Comenzar Aprendizaje
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      {/* Tarjetas Estadísticas */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg w-fit">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">11</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Patrones de Comportamiento</div>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg w-fit">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">GoF</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Catálogo Estándar</div>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg w-fit">
            <Database className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">Real</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Casos de Uso en la Industria</div>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg w-fit">
            <Code className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">Java</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Código Académico</div>
          </div>
        </div>
      </motion.div>

      {/* Línea de Tiempo */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-200">
          Línea de Tiempo del Software y Patrones
        </h2>
        
        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-8">
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full p-1 border-4 border-white dark:border-slate-950">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">1994</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">Publicación del Libro Oficial</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Erich Gamma, Richard Helm, Ralph Johnson y John Vlissides (conocidos como la <strong>Gang of Four</strong> o <strong>GoF</strong>) publican <em>"Design Patterns: Elements of Reusable Object-Oriented Software"</em>, sentando las bases modernas de la ingeniería de software y catalogando los 23 patrones clásicos.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full p-1 border-4 border-white dark:border-slate-950">
              <Heart className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Años 2000 - 2010</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">Adopción Masiva en Frameworks</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Frameworks empresariales como Spring (Java), .NET Framework (C#) y posteriormente Express.js adoptan los patrones como estándar de desarrollo. Patrones como <em>Observer</em> y <em>Chain of Responsibility</em> se vuelven indispensables para manejar middleware y flujos reactivos.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full p-1 border-4 border-white dark:border-slate-950">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Presente</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">Era de la Reactividad y Microservicios</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Con el auge de JavaScript/TypeScript, React y la programación reactiva (RxJS), los patrones de comportamiento evolucionan. Siguen siendo un pilar clave en arquitecturas de backend distribuidos y la gestión de estado frontend moderna.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
