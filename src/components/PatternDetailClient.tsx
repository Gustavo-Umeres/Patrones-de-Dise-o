"use client";

import { motion } from "framer-motion";
import { Pattern } from "@/data/patterns";
import Mermaid from "@/components/Mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { 
  CheckCircle, XCircle, BookOpen, Layers, Code, 
  Lightbulb, Compass, Factory
} from "lucide-react";

interface PatternDetailClientProps {
  pattern: Pattern;
}

export default function PatternDetailClient({ pattern }: PatternDetailClientProps) {
  // Animación
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <div className="space-y-12 py-4">
      {/* Cabecera */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6"
      >
        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full w-fit">
          {pattern.englishName}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          {pattern.name}
        </h1>
        <p className="text-slate-650 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          {pattern.concept.definicion}
        </p>
      </motion.div>

      {/* 1. Concepto */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          1. Concepto
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 space-y-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">Idea Central</span>
              <p className="text-sm text-slate-750 dark:text-slate-300 leading-relaxed">
                {pattern.concept.ideaCentral}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 space-y-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">Problema que resuelve</span>
              <p className="text-sm text-slate-750 dark:text-slate-300 leading-relaxed">
                {pattern.concept.problema}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 dark:bg-indigo-500/5 dark:border-indigo-500/20 space-y-2">
              <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Analogía Cotidiana</span>
              <p className="text-sm text-slate-750 dark:text-indigo-200/90 leading-relaxed italic">
                "{pattern.concept.analogia}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 space-y-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">¿Cuándo utilizarlo?</span>
              <ul className="text-xs text-slate-700 dark:text-slate-355 space-y-1.5 list-disc pl-4">
                {pattern.concept.cuandoUsar.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. UML */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Layers className="h-5 w-5 text-indigo-500" />
          2. Diagrama Estructural UML
        </h2>
        <p className="text-sm text-slate-550 dark:text-slate-400">
          A continuación se presenta el diagrama de clases estructurado generado dinámicamente con Mermaid.js:
        </p>
        <Mermaid chart={pattern.uml} />
      </motion.section>

      {/* 3. Componentes */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <BookOpen className="h-5 w-5 text-indigo-500" />
          3. Componentes del Patrón
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800/80">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold">
                <th className="p-4 w-1/3">Clase / Elemento</th>
                <th className="p-4 w-2/3">Responsabilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80 text-slate-650 dark:text-slate-350">
              {pattern.components.map((component, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="p-4 font-bold text-slate-800 dark:text-slate-250">{component.clase}</td>
                  <td className="p-4 leading-relaxed">{component.responsabilidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* 4 y 5. Ventajas y Desventajas */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Ventajas */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="h-5 w-5" />
            4. Ventajas
          </h2>
          <div className="space-y-3">
            {pattern.advantages.map((adv, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{adv.titulo}</h4>
                <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed">{adv.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desventajas */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <XCircle className="h-5 w-5" />
            5. Desventajas
          </h2>
          <div className="space-y-3">
            {pattern.disadvantages.map((dis, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-1">
                <h4 className="text-sm font-bold text-rose-700 dark:text-rose-300">{dis.titulo}</h4>
                <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed">{dis.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. Código Java */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Code className="h-5 w-5 text-indigo-500" />
          6. Código de Ejemplo Completo (Java)
        </h2>
        <p className="text-sm text-slate-550 dark:text-slate-400">
          Implementación robusta y académica que demuestra la relación entre componentes:
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-800 text-sm shadow-2xl">
          <SyntaxHighlighter 
            language="java" 
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: "1.25rem", background: "#090d16" }}
          >
            {pattern.javaCode}
          </SyntaxHighlighter>
        </div>
      </motion.section>

      {/* 7. Explicación del Flujo */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Compass className="h-5 w-5 text-indigo-500" />
          7. Explicación del Flujo (Secuencia)
        </h2>
        <p className="text-sm text-slate-550 dark:text-slate-400">
          Este diagrama muestra cómo interactúan los objetos en tiempo de ejecución para resolver la solicitud:
        </p>
        <Mermaid chart={pattern.flow} />
      </motion.section>

      {/* 8. Caso Real en la Industria */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Factory className="h-5 w-5 text-indigo-500" />
          8. Caso Real en la Industria
        </h2>
        <div className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/10 space-y-4">
          <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
            {pattern.realCase.descripcion}
          </p>
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Ejemplos Prácticos:</span>
            <ul className="text-xs text-slate-700 dark:text-slate-350 space-y-2 pl-4 list-disc">
              {pattern.realCase.ejemplos.map((ej, idx) => (
                <li key={idx} className="leading-relaxed font-medium">{ej}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
