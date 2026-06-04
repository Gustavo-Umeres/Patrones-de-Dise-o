# Catálogo Interactivo de Patrones de Diseño de Comportamiento (GoF)

Una aplicación web moderna, profesional y responsive sobre los **11 Patrones de Diseño de Comportamiento** del catálogo clásico de la Gang of Four (GoF). Diseñada como recurso educativo interactivo, material de apoyo para exposiciones y proyecto de portafolio de arquitectura de software.

## 🚀 Características Principales

- **Diseño Premium**: Interfaz inspirada en Vercel Docs y GitBook con tema oscuro por defecto para una lectura técnica agradable.
- **Buscador de Patrones**: Barra de búsqueda interactiva en tiempo real en la barra lateral para ubicar conceptos, analogías o nombres.
- **Estructura Académica Rigurosa**: Cada uno de los 11 patrones incluye:
  1. Concepto formal, idea central, problema y analogía.
  2. Diagrama de clases estructurado UML (Mermaid.js).
  3. Tabla detallada de componentes y responsabilidades.
  4. Tarjetas de ventajas y desventajas.
  5. Código académico completo en Java con resaltado de sintaxis.
  6. Diagrama secuencial de flujo (Mermaid.js).
  7. Casos de uso reales en la industria (Spring, Express, etc.).
- **Mini Simuladores Interactivos**:
  - **Observer**: Suscripción de noticias y alertas en tiempo real.
  - **Strategy**: Cálculo dinámico de comisiones en pasarelas de pago.
  - **State**: Transiciones lógicas de estados en una máquina expendedora.
  - **Chain of Responsibility**: Flujo secuencial y límites de firmas de aprobación financiera.
- **Quiz de 15 Preguntas**: Cuestionario interactivo con retroalimentación detallada y explicación didáctica por respuesta.
- **Tabla Comparativa**: Resumen interactivo para contrastar todos los patrones de comportamiento.

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Diagramación**: Mermaid.js
- **Resaltado de Código**: React Syntax Highlighter (Prism vscDarkPlus)
- **Iconografía**: Lucide React

---

## 💻 Ejecución Local

Para levantar el proyecto en tu entorno local, sigue estos pasos:

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000) para interactuar con la plataforma.

---

## 📦 Despliegue en GitHub Pages (Estático)

Este proyecto está completamente configurado para ser exportado estáticamente y subido a GitHub Pages de forma gratuita.

### Configuración en `next.config.ts`
El proyecto exporta archivos estáticos usando `output: "export"` y define el `basePath` correspondiente al nombre del repositorio (`/Patrones-de-Dise-o`) cuando se compila en producción.

### Para compilar y exportar el proyecto:
```bash
npm run build
```
Esto creará una carpeta llamada `out/` en la raíz del proyecto que contiene todo el HTML, CSS y JS compilado, listo para ser subido a la rama de despliegue de tu repositorio (por ejemplo, `gh-pages`).
