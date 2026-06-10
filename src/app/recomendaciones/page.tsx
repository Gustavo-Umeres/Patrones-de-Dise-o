"use client";

import { motion } from "framer-motion";
import { Factory } from "lucide-react";

export default function Recomendaciones() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 py-4">
      <motion.div variants={itemVariants} className="space-y-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full w-fit">
          Mejores Prácticas
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          Recomendaciones de Uso
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          Cómo aplicar los Patrones de Comportamiento en Proyectos Reales.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="p-6 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Factory className="h-6 w-6 text-indigo-500" />
          Aplicación en la Industria
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Antes de aplicar estos patrones en la industria (como en los sistemas del BCP, SUNAT, RENIEC, etc.), ten en cuenta lo siguiente:
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-4">
          <li>
            <strong>No fuerces el patrón:</strong> Utilízalo solo si el código existente está sufriendo de excesivos condicionales (if-else/switch) o si el alto acoplamiento está bloqueando el mantenimiento. No compliques un sistema sencillo.
          </li>
          <li>
            <strong>Evalúa la complejidad introducida:</strong> Patrones como <em>Visitor</em> o <em>Command</em> introducen múltiples interfaces y clases. Si el problema es pequeño, una función pura o una simple validación será preferible.
          </li>
          <li>
            <strong>Combina según la necesidad:</strong> En la vida real, los patrones rara vez operan de manera aislada. Es extremadamente común ver un <em>Mediator</em> coordinando operaciones encapsuladas en <em>Commands</em>, o un <em>Observer</em> notificando cambios que detonan una transición de <em>State</em>.
          </li>
          <li>
            <strong>El rendimiento no es gratis:</strong> Abusar de patrones de comportamiento (por ejemplo, cientos de <em>Observers</em> anidados reaccionando en cadena) puede crear cuellos de botella y ciclos infinitos muy difíciles de depurar en los entornos de producción.
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
