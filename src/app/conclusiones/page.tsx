"use client";

import { motion } from "framer-motion";
import { Award, Star, Compass, CheckCircle } from "lucide-react";

export default function Conclusiones() {
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
      {/* Cabecera */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="h-8 w-8 text-indigo-500" />
          Conclusiones Generales
        </h1>
        <p className="text-slate-650 dark:text-slate-400 text-sm md:text-base max-w-3xl">
          Recopilación de los aprendizajes clave, beneficios primordiales y mejores prácticas a seguir en la aplicación de Patrones de Comportamiento GoF en el desarrollo de software actual.
        </p>
      </motion.div>

      {/* Grid de Secciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aprendizajes Principales */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/10 space-y-4"
        >
          <div className="flex items-center gap-2 text-indigo-650 dark:text-indigo-400 font-bold">
            <Star className="h-5 w-5" />
            <span>Aprendizajes Clave</span>
          </div>
          <ul className="text-xs md:text-sm text-slate-600 dark:text-slate-350 space-y-3 list-disc pl-4 leading-relaxed">
            <li>
              <strong>Desacoplamiento Operativo:</strong> Los patrones de comportamiento reducen las dependencias fuertes entre objetos emisores y receptores de datos.
            </li>
            <li>
              <strong>Modularidad y Flexibilidad:</strong> Permiten cambiar algoritmos (Strategy) o estados (State) en tiempo de ejecución sin alterar el resto de la aplicación.
            </li>
            <li>
              <strong>Comunicación Jerárquica Clara:</strong> Facilitan la asignación coherente de responsabilidades, evitando controladores monolíticos o flujos caóticos.
            </li>
          </ul>
        </motion.div>

        {/* Beneficios */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/10 space-y-4"
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle className="h-5 w-5" />
            <span>Beneficios del Uso de Patrones</span>
          </div>
          <ul className="text-xs md:text-sm text-slate-600 dark:text-slate-350 space-y-3 list-disc pl-4 leading-relaxed">
            <li>
              <strong>Vocabulario Común:</strong> Permiten a los desarrolladores comunicarse con mayor rapidez utilizando nombres estándar como <em>Observer</em> o <em>Command</em>.
            </li>
            <li>
              <strong>Código Probado:</strong> Evitan tener que reinventar la rueda ante problemas típicos de flujos de control complejos.
            </li>
            <li>
              <strong>Facilidad para Refactorizar:</strong> Se adaptan de forma idónea a arquitecturas modernas (Microservicios, React, Clean Architecture).
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Recomendaciones */}
      <motion.div 
        variants={itemVariants}
        className="p-6 rounded-2xl border border-indigo-500/25 dark:border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/10 space-y-4"
      >
        <div className="flex items-center gap-2 text-indigo-650 dark:text-indigo-400 font-bold">
          <Compass className="h-5 w-5" />
          <span>Recomendaciones para Desarrolladores</span>
        </div>
        <p className="text-xs md:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
          No caigas en el <strong>Sobrediseño (Overengineering)</strong>. Los patrones de diseño son herramientas sumamente útiles, pero utilizarlos sin justificación alguna complica la base de código innecesariamente. Primero identifica el problema de acoplamiento, luego evalúa la escala del proyecto y finalmente elige el patrón de comportamiento que mejor simplifique la solución.
        </p>
      </motion.div>
    </motion.div>
  );
}
