"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Check, X, Award, RotateCcw, ArrowRight, ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "¿Qué patrón permite cambiar algoritmos o comportamientos dinámicamente durante el tiempo de ejecución?",
    options: ["Observer", "Strategy", "Visitor", "Iterator"],
    answerIndex: 1,
    explanation: "Strategy define una familia de algoritmos, encapsula cada uno de ellos y los hace intercambiables en tiempo de ejecución."
  },
  {
    id: 2,
    question: "¿Qué patrón funciona de forma similar a una suscripción de boletín informativo o canal de noticias?",
    options: ["Mediator", "Memento", "Observer", "Command"],
    answerIndex: 2,
    explanation: "Observer define una dependencia uno-a-muchos, de modo que cuando el Sujeto cambia de estado, notifica automáticamente a todos sus suscriptores."
  },
  {
    id: 3,
    question: "¿Qué patrón simula un flujo secuencial donde una solicitud pasa por varios filtros u operarios hasta que uno la aprueba?",
    options: ["Chain of Responsibility", "Mediator", "Command", "State"],
    answerIndex: 0,
    explanation: "Chain of Responsibility permite pasar una solicitud a lo largo de una cadena de manejadores secuenciales."
  },
  {
    id: 4,
    question: "¿Qué patrón encapsula una solicitud u operación en un objeto independiente, permitiendo registrar acciones para Undo/Redo?",
    options: ["Memento", "Command", "Iterator", "State"],
    answerIndex: 1,
    explanation: "Command convierte una petición en un objeto con toda la información necesaria, facilitando encolar acciones y revertirlas."
  },
  {
    id: 5,
    question: "¿Qué patrón extrae el comportamiento específico de cada estado de un objeto a clases independientes y delega el trabajo al estado activo?",
    options: ["Strategy", "Mediator", "State", "Visitor"],
    answerIndex: 2,
    explanation: "State permite a un objeto alterar su comportamiento cuando su estado interno cambia, simulando que cambia de clase."
  },
  {
    id: 6,
    question: "¿Qué patrón provee un recorrido secuencial de colecciones complejas sin exponer detalles internos o de almacenamiento?",
    options: ["Iterator", "Visitor", "Interpreter", "Command"],
    answerIndex: 0,
    explanation: "Iterator extrae la responsabilidad de recorrido de una colección compleja permitiendo recorrerla secuencialmente."
  },
  {
    id: 7,
    question: "¿Qué patrón centraliza la comunicación entre múltiples componentes para evitar acoplamientos caóticos tipo muchos-a-muchos?",
    options: ["Observer", "Mediator", "Chain of Responsibility", "Template Method"],
    answerIndex: 1,
    explanation: "Mediator restringe la comunicación directa entre colegas y los fuerza a cooperar a través de un objeto mediador central."
  },
  {
    id: 8,
    question: "¿Qué patrón guarda una instantánea (copia de estado) privada de un objeto respetando los principios de encapsulamiento?",
    options: ["Memento", "State", "Command", "Visitor"],
    answerIndex: 0,
    explanation: "Memento guarda y restaura el estado previo de un objeto sin revelar los detalles de su implementación."
  },
  {
    id: 9,
    question: "¿Qué patrón define el esqueleto de un algoritmo en una clase base delegando ciertos pasos variables a las subclases?",
    options: ["Strategy", "Template Method", "Visitor", "Interpreter"],
    answerIndex: 1,
    explanation: "Template Method define la plantilla de un algoritmo en un método de la superclase, dejando que las subclases redefinan pasos específicos."
  },
  {
    id: 10,
    question: "¿Qué patrón permite añadir nuevas operaciones a una estructura compleja de objetos (como un árbol AST) sin alterar sus clases?",
    options: ["Visitor", "Interpreter", "State", "Chain of Responsibility"],
    answerIndex: 0,
    explanation: "Visitor permite separar los algoritmos de la estructura sobre la que operan aplicando Double Dispatch (doble envío)."
  },
  {
    id: 11,
    question: "¿Qué patrón se usa para evaluar y parsear gramáticas o lenguajes sencillos definiendo reglas en clases individuales?",
    options: ["Visitor", "Interpreter", "Iterator", "Command"],
    answerIndex: 1,
    explanation: "Interpreter define una representación para la gramática de un lenguaje junto con un intérprete que evalúa oraciones."
  },
  {
    id: 12,
    question: "En el patrón Command, ¿quién es el objeto que realmente contiene la lógica de negocio y sabe cómo llevar a cabo la solicitud?",
    options: ["El Invocador (Invoker)", "El Comando Concreto", "El Receptor (Receiver)", "El Cliente"],
    answerIndex: 2,
    explanation: "El Receptor (Receiver) es la clase con la lógica real que ejecuta el trabajo cuando el comando llama a execute()."
  },
  {
    id: 13,
    question: "¿Qué problema principal introduce el patrón Memento al registrar demasiados estados intermedios del objeto?",
    options: ["Vulnerabilidad de seguridad", "Pérdida de rendimiento de red", "Alto consumo de memoria RAM", "Acoplamiento estricto"],
    answerIndex: 2,
    explanation: "Guardar copias completas de estados (mementos) de forma recurrente puede consumir gran cantidad de memoria RAM en el Caretaker."
  },
  {
    id: 14,
    question: "¿Cuál es una desventaja notable de abusar del patrón Mediator en un sistema complejo?",
    options: ["Violación de encapsulamiento", "El mediador puede convertirse en un God Object (Objeto Todopoderoso) inmanejable", "Multiplicación masiva de clases simples", "Baja eficiencia en consultas de red"],
    answerIndex: 1,
    explanation: "Al concentrar toda la comunicación, el Mediador puede crecer desmedidamente hasta convertirse en un monolito complejo."
  },
  {
    id: 15,
    question: "¿Qué patrón utiliza la técnica del 'Double Dispatch' (Doble Envío) para orquestar la comunicación entre elementos y operaciones?",
    options: ["Visitor", "Strategy", "Observer", "Template Method"],
    answerIndex: 0,
    explanation: "Visitor utiliza Double Dispatch: el elemento acepta al visitante y luego el visitante ejecuta el método adaptado para ese elemento concreto."
  }
];

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optIdx
    });
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setSubmitted(false);
    setShowResults(false);
  };

  const score = QUESTIONS.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.answerIndex ? 1 : 0);
  }, 0);

  const allAnswered = Object.keys(selectedAnswers).length === QUESTIONS.length;

  return (
    <div className="space-y-8 py-4">
      {/* Cabecera */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="h-8 w-8 text-indigo-500" />
          Quiz Evaluativo Interactivo
        </h1>
        <p className="text-slate-650 dark:text-slate-400 text-sm md:text-base max-w-3xl">
          Pon a prueba tus conocimientos sobre los Patrones de Comportamiento GoF con este cuestionario de 15 preguntas académicas.
        </p>
      </div>

      {!showResults ? (
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/10 space-y-6">
          {/* Indicador de progreso */}
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 dark:text-slate-500">
            <span>Pregunta {currentIdx + 1} de {QUESTIONS.length}</span>
            <span>{Math.round((Object.keys(selectedAnswers).length / QUESTIONS.length) * 100)}% Completado</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Pregunta */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200">
              {QUESTIONS[currentIdx].question}
            </h3>

            {/* Opciones */}
            <div className="grid grid-cols-1 gap-3">
              {QUESTIONS[currentIdx].options.map((option, idx) => {
                const isSelected = selectedAnswers[currentIdx] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 text-left rounded-xl border text-xs md:text-sm font-semibold transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "border-indigo-600 dark:border-indigo-500 bg-indigo-500/5 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400"
                        : "border-slate-200 dark:border-slate-800/70 hover:bg-slate-50 dark:hover:bg-slate-900/60 text-slate-700 dark:text-slate-350"
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected && <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-500 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controles de Navegación */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-900">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer animate-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Anterior
            </button>

            {currentIdx < QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentIdx] === undefined}
                className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-850 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer animate-none"
              >
                Siguiente
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer animate-none"
              >
                Finalizar Cuestionario
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Reporte Final */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-emerald-500/5 text-center space-y-4">
            <Award className="h-12 w-12 text-indigo-500 mx-auto animate-bounce" />
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">¡Cuestionario Completado!</h3>
            <p className="text-slate-650 dark:text-slate-400 text-sm max-w-md mx-auto">
              Has respondido correctamente <strong className="text-indigo-600 dark:text-indigo-400">{score}</strong> de <strong className="text-slate-900 dark:text-white">{QUESTIONS.length}</strong> preguntas.
            </p>
            <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {Math.round((score / QUESTIONS.length) * 100)}%
            </div>
            <button
              onClick={resetQuiz}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Intentar de Nuevo
            </button>
          </div>

          {/* Retroalimentación Detallada */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">Revisión de Respuestas</h3>
            <div className="space-y-4">
              {QUESTIONS.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.answerIndex;
                return (
                  <div 
                    key={q.id} 
                    className={`p-5 rounded-xl border text-xs md:text-sm space-y-3 ${
                      isCorrect 
                        ? "border-emerald-500/20 bg-emerald-500/5" 
                        : "border-rose-500/25 bg-rose-500/5"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                        {q.id}. {q.question}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1 shrink-0 ${
                        isCorrect ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}>
                        {isCorrect ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        {isCorrect ? "Correcto" : "Incorrecto"}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="text-slate-500 dark:text-slate-450">
                        Tu respuesta: <span className={isCorrect ? "text-emerald-600 font-bold" : "text-rose-550 font-bold"}>
                          {q.options[userAns] || "Sin respuesta"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="text-slate-500 dark:text-slate-455">
                          Respuesta correcta: <span className="text-emerald-600 font-bold">{q.options[q.answerIndex]}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-slate-250/20 dark:border-slate-800/40 text-slate-650 dark:text-slate-400 leading-relaxed italic">
                        <strong>Explicación:</strong> {q.explanation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
