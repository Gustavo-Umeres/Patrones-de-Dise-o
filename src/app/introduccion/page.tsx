"use client";

import { motion } from "framer-motion";
import { Layers, ShieldCheck, HeartHandshake, Compass, Info } from "lucide-react";

export default function Introduccion() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
      {/* Definición */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          Introducción a los Patrones de Diseño
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          En ingeniería de software, un <strong>patrón de diseño</strong> es una solución reusable y optimizada para un problema común que ocurre dentro de un contexto dado durante el diseño de software. No es un diseño terminado que se pueda transformar directamente en código; es una plantilla o descripción de cómo resolver un problema que se puede usar en muchas situaciones diferentes.
        </p>

        <div className="flex gap-4 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 dark:bg-indigo-500/5 dark:border-indigo-500/20 text-slate-700 dark:text-slate-300">
          <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <strong>¿Por qué usarlos?</strong> Ahorran tiempo de desarrollo al proveer paradigmas probados y testeados. Además, mejoran la legibilidad del código para otros programadores que están familiarizados con el catálogo estándar de patrones.
          </div>
        </div>
      </motion.section>

      {/* Categorías GoF */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
          Categorías del Catálogo GoF
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
          El libro original de la Gang of Four (GoF) clasifica los 23 patrones de diseño en tres grandes categorías fundamentales, dependiendo de su propósito general:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Creacionales */}
          <div className="p-6 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/10 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 space-y-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg w-fit">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">Creacionales</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Conciernen al proceso de creación de objetos. Ayudan a hacer un sistema independiente de cómo se crean, componen y representan sus objetos.
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4 font-semibold">
              <li>Singleton</li>
              <li>Factory Method</li>
              <li>Builder</li>
              <li>Abstract Factory</li>
              <li>Prototype</li>
            </ul>
          </div>

          {/* Estructurales */}
          <div className="p-6 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/10 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 space-y-4">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg w-fit">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">Estructurales</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tratan sobre cómo se componen las clases y objetos para formar estructuras más grandes, garantizando flexibilidad y eficiencia.
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4 font-semibold">
              <li>Adapter</li>
              <li>Decorator</li>
              <li>Facade</li>
              <li>Composite</li>
              <li>Proxy</li>
              <li>Flyweight</li>
              <li>Bridge</li>
            </ul>
          </div>

          {/* Comportamiento */}
          <div className="p-6 rounded-xl border border-indigo-500/25 dark:border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/10 hover:border-indigo-500/40 transition-all duration-300 space-y-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg w-fit">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">De Comportamiento</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Están relacionados con los algoritmos y la asignación de responsabilidades entre objetos. Es la categoría más grande y el tema principal de esta aplicación.
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4 font-bold">
              <li>Observer, Strategy, State</li>
              <li>Chain of Responsibility</li>
              <li>Command, Iterator</li>
              <li>Mediator, Memento</li>
              <li>Template Method</li>
              <li>Interpreter, Visitor</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Infografía Visual */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
          Infografía de Relaciones GoF
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Este diagrama muestra cómo interactúa el catálogo general y la importancia de los patrones de comportamiento en la orquestación del flujo de datos en el software moderno:
        </p>

        {/* Infografia Visual */}
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/20 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
              <Compass className="h-5 w-5" />
              <span>Flujo de Datos e Interacción</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A diferencia de los patrones Creacionales (que deciden <em>cuándo y cómo crear</em> un objeto) y los Estructurales (que definen <em>cómo se arman</em> las clases), los <strong>patrones de comportamiento describen cómo cooperan los objetos</strong>. 
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Utilizan el acoplamiento libre para permitir que la comunicación fluya dinámicamente, haciendo que el sistema sea extremadamente modular y fácil de escalar a largo plazo.
            </p>
          </div>
          <div className="w-full md:w-80 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
            <div className="col-span-3 p-2 bg-indigo-500 text-white rounded-lg">Frontera de Entrada (Cliente)</div>
            <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded border border-emerald-500/20">Creación (Creacionales)</div>
            <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 rounded border border-blue-500/20">Composición (Estructurales)</div>
            <div className="p-3 bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 rounded border border-indigo-500/30">Ejecución y Flujo (Comportamiento)</div>
            <div className="col-span-3 p-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">Resultado Operativo Estable</div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
