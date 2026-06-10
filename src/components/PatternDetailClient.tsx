"use client";

import { motion } from "framer-motion";
import { Pattern } from "@/data/patterns";
import { ENUNCIADOS } from "@/data/enunciados";
import Mermaid from "@/components/Mermaid";
import dynamic from "next/dynamic";

// Cargar SyntaxHighlighter solo en el cliente para evitar que Node.js consuma 90% de CPU durante el SSR
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false, loading: () => <div className="h-40 bg-slate-900 rounded-xl animate-pulse" /> }
);
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
      </motion.div>

      {/* 1. Concepto del Patrón */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          1. Concepto del Patrón
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 space-y-4">
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Definición Formal:</span>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {pattern.concept.definicion}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Idea Central / Esencia del patrón:</span>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {pattern.concept.ideaCentral}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 italic">
                <strong>¿Qué problema resuelve?</strong> {pattern.concept.problema}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <strong>Analogía para entenderlo mejor:</strong> {pattern.concept.analogia}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Estructura del Patrón */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Layers className="h-5 w-5 text-indigo-500" />
          2. Estructura del Patrón
        </h2>
        <div className="p-4 bg-white dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-800/50 rounded-xl space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Diagrama UML (clases, interfaces y relaciones) que ilustra cómo se estructura el patrón:
          </p>
          <Mermaid chart={pattern.uml} />
        </div>
      </motion.section>

      {/* 3. Ventajas y Desventajas */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <CheckCircle className="h-5 w-5 text-indigo-500" />
          3. Ventajas y Desventajas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Beneficios */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Beneficios de aplicar el patrón</h3>
            <div className="space-y-3">
              {pattern.advantages.map((adv, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
                  <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{adv.titulo}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{adv.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Limitaciones */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400">Limitaciones o problemas posibles</h3>
            <div className="space-y-3">
              {pattern.disadvantages.map((dis, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-1">
                  <h4 className="text-sm font-bold text-rose-700 dark:text-rose-300">{dis.titulo}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{dis.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Ejemplo Práctico en Código */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Code className="h-5 w-5 text-indigo-500" />
          4. Ejemplo Práctico en Código
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300">Enunciado del Problema a Resolver:</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {ENUNCIADOS[pattern.id]}
            </p>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 pt-2">
            <strong>Solución e Implementación básica (Java):</strong> El siguiente código resuelve el enunciado detallando los componentes del patrón comentados paso a paso.
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
          
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-800/50 rounded-xl space-y-2">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Flujo de Ejecución del Código (Secuencia):</p>
            <Mermaid chart={pattern.flow} />
          </div>
        </div>
      </motion.section>

      {/* 5. Caso de Uso Real */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-200">
          <Factory className="h-5 w-5 text-indigo-500" />
          5. Caso de Uso Real / Aplicación en la Industria
        </h2>
        <div className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/10 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">Ejemplo de aplicación en software real</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {pattern.realCase.descripcion}
            </p>
          </div>
          
          <div className="pt-2">
            <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">Casos concretos de uso</h3>
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-3 pl-5 list-disc">
              {pattern.realCase.ejemplos.map((ej, idx) => {
                const parts = ej.split(":");
                if (parts.length > 1) {
                  return (
                    <li key={idx} className="leading-relaxed">
                      <strong className="text-slate-900 dark:text-slate-100">{parts[0]}:</strong>{parts.slice(1).join(":")}
                    </li>
                  );
                }
                return <li key={idx} className="leading-relaxed">{ej}</li>;
              })}
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
