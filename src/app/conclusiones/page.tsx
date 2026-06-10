"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Conclusiones() {
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
          Cierre
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          Conclusiones Generales
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          Resumen y reflexiones finales sobre los Patrones de Comportamiento.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-800 dark:text-indigo-300">
            <BookOpen className="h-5 w-5" />
            Aporte Principal
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            El aporte principal de estos patrones es desplazar el enfoque de la estructura rígida de clases hacia la comunicación dinámica entre objetos. Fomentan la flexibilidad al delegar responsabilidades, permitiendo que los sistemas respondan a flujos de trabajo complejos de manera escalable y sin un alto acoplamiento.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-500/20 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
            <BookOpen className="h-5 w-5" />
            Aprendizajes Clave
          </h2>
          <ul className="list-disc pl-4 text-sm text-slate-700 dark:text-slate-300 space-y-3">
            <li><strong>Separación de Algoritmos:</strong> Separan los algoritmos de las clases que los utilizan (ej. Strategy).</li>
            <li><strong>Centralización del Control:</strong> Evitan el caos de conexiones múltiples (ej. Mediator).</li>
            <li><strong>Programación Reactiva:</strong> Reaccionan a eventos sin consultar continuamente (ej. Observer).</li>
            <li><strong>Acciones como Objetos:</strong> Encapsulan la ejecución para encolar o deshacer (ej. Command).</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
