"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

let mermaidIdCounter = 0;

export default function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const elementIdRef = useRef<string>(`mermaid-diagram-${++mermaidIdCounter}`);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;
        
        // Determinar el tema en base al estado oscuro
        const isDark = document.documentElement.classList.contains("dark");
        
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          themeVariables: {
            fontFamily: "var(--font-geist-sans), Inter, sans-serif",
            primaryColor: isDark ? "#1e293b" : "#f1f5f9",
            primaryTextColor: isDark ? "#f8fafc" : "#0f172a",
            lineColor: isDark ? "#475569" : "#cbd5e1",
          }
        });

        // Limpiar el contenedor y preparar elemento oculto para renderizar
        const id = elementIdRef.current;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        
        if (isMounted) {
          setSvg(renderedSvg);
          setError(false);
        }
      } catch (err) {
        console.error("Error rendering mermaid chart:", err);
        if (isMounted) {
          setError(true);
        }
      }
    }

    renderDiagram();

    // Escuchar cambios de tema (para re-renderizar con el tema correcto)
    const observer = new MutationObserver(() => {
      renderDiagram();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [chart]);

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
        No se pudo renderizar el diagrama UML.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full overflow-x-auto py-6 bg-slate-950/20 dark:bg-slate-950/40 rounded-xl border border-slate-200/50 dark:border-slate-800/80 p-4 transition-all duration-300">
      {svg ? (
        <div 
          className="w-full flex justify-center text-slate-800 dark:text-slate-200 select-none [&>svg]:max-w-full [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }} 
        />
      ) : (
        <div className="flex space-x-2 justify-center items-center h-40">
          <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce"></div>
        </div>
      )}
    </div>
  );
}
