"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, CreditCard, ShoppingBag, ArrowRight, UserPlus, 
  Send, ShieldCheck, DollarSign, Play, CheckCircle, RefreshCw 
} from "lucide-react";

export default function Simuladores() {
  const [activeTab, setActiveTab] = useState<"observer" | "strategy" | "state" | "chain">("observer");

  return (
    <div className="space-y-8 py-4">
      {/* Cabecera */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          Mini Simuladores Interactivos
        </h1>
        <p className="text-slate-650 dark:text-slate-400 text-sm md:text-base max-w-3xl">
          Interactúa con los simuladores en tiempo real para visualizar cómo funcionan internamente los principales patrones de comportamiento de diseño.
        </p>
      </div>

      {/* Selectores de Simulador */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {(["observer", "strategy", "state", "chain"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg capitalize transition-all duration-200 ${
              activeTab === tab
                ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-500/10"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            {tab === "chain" ? "Chain of Responsibility" : tab}
          </button>
        ))}
      </div>

      {/* Área del Simulador Activo */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/10 min-h-[400px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === "observer" && <ObserverSimulator />}
          {activeTab === "strategy" && <StrategySimulator />}
          {activeTab === "state" && <StateSimulator />}
          {activeTab === "chain" && <ChainSimulator />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 1. OBSERVER SIMULATOR
// ----------------------------------------------------------------------------
function ObserverSimulator() {
  const [subscribers, setSubscribers] = useState<string[]>(["carlos@test.com", "App_Usuario_992"]);
  const [newEmail, setNewEmail] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [logs, setLogs] = useState<{ id: number; message: string; type: "add" | "notify" | "remove" }[]>([]);

  const addSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    if (subscribers.includes(newEmail)) return;
    setSubscribers([...subscribers, newEmail]);
    setLogs((prev) => [
      { id: Date.now(), message: `Observador añadido: ${newEmail}`, type: "add" },
      ...prev,
    ]);
    setNewEmail("");
  };

  const removeSubscriber = (sub: string) => {
    setSubscribers(subscribers.filter((s) => s !== sub));
    setLogs((prev) => [
      { id: Date.now(), message: `Observador eliminado: ${sub}`, type: "remove" },
      ...prev,
    ]);
  };

  const publishNews = () => {
    if (!newsTitle.trim()) return;
    const timestamp = new Date().toLocaleTimeString();
    
    // Simular el Subject notificando a todos
    const alerts = subscribers.map((sub) => ({
      id: Date.now() + Math.random(),
      message: `[${timestamp}] Notificado a: ${sub} -> "${newsTitle}"`,
      type: "notify" as const
    }));
    
    setLogs((prev) => [...alerts, ...prev]);
    setNewsTitle("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 w-full"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Bell className="h-5 w-5 animate-swing" />
          Simulador del Patrón Observer (Suscripción de Noticias)
        </h3>
        <p className="text-xs text-slate-500">
          El <strong>Subject (Agencia de Noticias)</strong> notifica dinámicamente a todos los <strong>Observers (Suscriptores)</strong> registrados cada vez que se publica una noticia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suscriptores / Administración */}
        <div className="space-y-4">
          <form onSubmit={addSubscriber} className="flex gap-2">
            <input
              type="text"
              placeholder="Ingresa correo del suscriptor..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button 
              type="submit" 
              className="px-3 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1 transition-all active:scale-95"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Suscribir
            </button>
          </form>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suscriptores Activos (Observers)</h4>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/80 min-h-[120px] max-h-[160px] overflow-y-auto space-y-2">
              {subscribers.length > 0 ? (
                subscribers.map((sub, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate pr-2">{sub}</span>
                    <button 
                      onClick={() => removeSubscriber(sub)}
                      className="text-rose-500 hover:text-rose-600 font-bold transition-colors cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic text-center pt-8">No hay suscriptores activos.</div>
              )}
            </div>
          </div>
        </div>

        {/* Publicación y Logs */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe el titular de la noticia..."
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button 
              onClick={publishNews} 
              disabled={subscribers.length === 0}
              className="px-3 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-3.5 w-3.5" />
              Notificar
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Historial de Notificaciones (Tiempo Real)</h4>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/80 min-h-[120px] max-h-[160px] overflow-y-auto space-y-1.5 font-mono text-[10px]">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`p-1 rounded ${
                      log.type === "add" 
                        ? "text-emerald-500 dark:text-emerald-400 bg-emerald-500/5" 
                        : log.type === "remove"
                        ? "text-rose-500 dark:text-rose-400 bg-rose-500/5"
                        : "text-indigo-600 dark:text-indigo-300 bg-indigo-500/5"
                    }`}
                  >
                    {log.message}
                  </div>
                ))
              ) : (
                <div className="text-[10px] text-slate-400 italic text-center pt-8">Ningún evento registrado.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------------
// 2. STRATEGY SIMULATOR
// ----------------------------------------------------------------------------
function StrategySimulator() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "transfer">("card");
  const [amount, setAmount] = useState(100);

  const calculateFees = () => {
    switch (paymentMethod) {
      case "card":
        return amount * 0.02; // 2%
      case "paypal":
        return amount * 0.035 + 0.3; // 3.5% + $0.30
      case "transfer":
        return 0; // 0%
    }
  };

  const fee = calculateFees();
  const total = amount + fee;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 w-full"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <CreditCard className="h-5 w-5" />
          Simulador del Patrón Strategy (Cálculo de Pasarelas de Pago)
        </h3>
        <p className="text-xs text-slate-500">
          Cambiar la <strong>Estrategia (Método de Pago)</strong> altera dinámicamente las reglas y tarifas de la transacción sin alterar la clase del carrito.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selector de estrategia */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Monto a pagar ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Seleccionar Estrategia</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "card", name: "Tarjeta", rate: "2.0% Fee" },
                { id: "paypal", name: "PayPal", rate: "3.5% + $0.3" },
                { id: "transfer", name: "Transferencia", rate: "0% Fee" }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3 text-left rounded-xl border text-xs flex flex-col justify-between h-20 transition-all ${
                    paymentMethod === m.id
                      ? "border-indigo-600 dark:border-indigo-500 bg-indigo-500/5 dark:bg-indigo-950/20"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900/60"
                  }`}
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{m.name}</span>
                  <span className="text-[10px] text-slate-450">{m.rate}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detalle Operativo */}
        <div className="p-5 rounded-xl border border-slate-250/60 dark:border-slate-800/80 bg-white dark:bg-slate-950/60 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider block">Cálculo en Ejecución (Checkout)</span>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Monto Inicial:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estrategia:</span>
                <span className="font-bold text-slate-700 dark:text-slate-350 uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Comisión de Pasarela:</span>
                <span className="font-semibold text-rose-500">${fee.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between font-bold text-sm text-slate-800 dark:text-white">
                <span>Total a Cobrar:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2 bg-indigo-500/10 rounded-lg text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20">
            Estrategia en uso: <span className="font-bold uppercase underline">{paymentMethod}PaymentStrategy</span> implementando PaymentStrategy.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------------
// 3. STATE SIMULATOR (Vending Machine)
// ----------------------------------------------------------------------------
type MachineState = "SinMoneda" | "MonedaInsertada" | "ProductoEntregado";

function StateSimulator() {
  const [state, setState] = useState<MachineState>("SinMoneda");
  const [logs, setLogs] = useState<string[]>(["Máquina encendida. Estado: SinMoneda"]);

  const logMessage = (msg: string) => {
    setLogs((prev) => [msg, ...prev]);
  };

  const insertCoin = () => {
    if (state === "SinMoneda") {
      setState("MonedaInsertada");
      logMessage("Moneda insertada correctamente. Transición a: MonedaInsertada");
    } else if (state === "MonedaInsertada") {
      logMessage("Error: Ya ingresaste una moneda. No se puede duplicar.");
    } else {
      logMessage("Espera a retirar tu producto primero.");
    }
  };

  const pressSelection = () => {
    if (state === "MonedaInsertada") {
      setState("ProductoEntregado");
      logMessage("Procesando selección... Dispensando refresco. Transición a: ProductoEntregado");
    } else if (state === "SinMoneda") {
      logMessage("Error: Debes insertar una moneda primero.");
    } else {
      logMessage("Tu producto ya está listo en la bandeja.");
    }
  };

  const dispenseProduct = () => {
    if (state === "ProductoEntregado") {
      setState("SinMoneda");
      logMessage("Retiraste la bebida. ¡Gracias! Transición a: SinMoneda");
    } else {
      logMessage("Error: No hay ningún producto para retirar en la bandeja.");
    }
  };

  const resetMachine = () => {
    setState("SinMoneda");
    setLogs(["Máquina reiniciada. Estado: SinMoneda"]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 w-full"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <ShoppingBag className="h-5 w-5" />
          Simulador del Patrón State (Máquina Expendedora)
        </h3>
        <p className="text-xs text-slate-500">
          El comportamiento del sistema cambia dinámicamente según su <strong>Estado Actual</strong>. Ciertas operaciones solo son válidas en estados específicos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel Vending */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <span className="text-xs font-bold text-slate-500">Estado Máquina:</span>
            <span className={`px-2.5 py-1 rounded text-xs font-bold ${
              state === "SinMoneda"
                ? "bg-slate-200 text-slate-700 dark:bg-slate-900 dark:text-slate-400"
                : state === "MonedaInsertada"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-450"
            }`}>
              {state}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={insertCoin}
              className={`p-3 text-center rounded-xl border text-xs font-bold flex flex-col justify-center items-center gap-1 transition-all active:scale-95 ${
                state === "SinMoneda"
                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-650 cursor-not-allowed"
              }`}
            >
              Insertar Moneda
            </button>
            <button
              onClick={pressSelection}
              className={`p-3 text-center rounded-xl border text-xs font-bold flex flex-col justify-center items-center gap-1 transition-all active:scale-95 ${
                state === "MonedaInsertada"
                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-650 cursor-not-allowed"
              }`}
            >
              Seleccionar Producto
            </button>
            <button
              onClick={dispenseProduct}
              className={`p-3 text-center rounded-xl border text-xs font-bold flex flex-col justify-center items-center gap-1 transition-all active:scale-95 ${
                state === "ProductoEntregado"
                  ? "bg-emerald-600 text-white hover:bg-emerald-550"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-650 cursor-not-allowed"
              }`}
            >
              Retirar Bebida
            </button>
          </div>

          <button 
            onClick={resetMachine}
            className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 w-fit mx-auto cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            Reiniciar Máquina
          </button>
        </div>

        {/* Panel de registro */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Bitácora de Estados y Acciones</span>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800/80 h-[180px] overflow-y-auto space-y-1.5 font-mono text-[10px] text-slate-600 dark:text-slate-400">
            {logs.map((log, idx) => (
              <div key={idx} className="border-b border-slate-100 dark:border-slate-900 pb-1">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------------
// 4. CHAIN OF RESPONSIBILITY SIMULATOR
// ----------------------------------------------------------------------------
function ChainSimulator() {
  const [amount, setAmount] = useState(2500);
  const [activeStep, setActiveStep] = useState<"none" | "empleado" | "supervisor" | "gerente" | "rechazado">("none");
  const [approverText, setApproverText] = useState("");

  const runChain = () => {
    setActiveStep("none");
    setApproverText("Procesando en cadena...");
    
    // Simular retraso secuencial
    setTimeout(() => {
      setActiveStep("empleado");
      if (amount <= 1000) {
        setApproverText("Aprobado por: Empleado (Monto <= $1000)");
      } else {
        setTimeout(() => {
          setActiveStep("supervisor");
          if (amount <= 5000) {
            setApproverText("Aprobado por: Supervisor (Monto <= $5000)");
          } else {
            setTimeout(() => {
              setActiveStep("gerente");
              if (amount <= 20000) {
                setApproverText("Aprobado por: Gerente (Monto <= $20000)");
              } else {
                setActiveStep("rechazado");
                setApproverText("Rechazado: El monto supera el límite del Gerente ($20,000)");
              }
            }, 1000);
          }
        }, 1000);
      }
    }, 600);
  };

  useEffect(() => {
    runChain();
  }, [amount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 w-full"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Play className="h-5 w-5" />
          Simulador del Patrón Chain of Responsibility (Flujo de Aprobación)
        </h3>
        <p className="text-xs text-slate-500">
          La solicitud viaja secuencialmente. Cada nodo decide si tiene la autoridad para resolverla o la transfiere al siguiente eslabón.
        </p>
      </div>

      <div className="space-y-6">
        {/* Selector de cantidad */}
        <div className="max-w-xs space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Monto de la Solicitud ($)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 0))}
              className="px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full"
            />
          </div>
        </div>

        {/* Cadena visual */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Nodo 1: Empleado */}
          <div className={`p-4 rounded-xl border text-center transition-all duration-300 ${
            activeStep === "empleado"
              ? amount <= 1000 
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "border-indigo-500 bg-indigo-500/5 text-indigo-600 dark:text-indigo-300"
              : activeStep === "supervisor" || activeStep === "gerente" || activeStep === "rechazado"
              ? "border-slate-200 dark:border-slate-800 opacity-60"
              : "border-slate-250 dark:border-slate-850"
          }`}>
            <div className="text-xs font-bold">Empleado</div>
            <div className="text-[10px] text-slate-450 mt-1">Límite: $1,000</div>
          </div>

          <div className="hidden md:flex justify-center text-slate-400">
            <ArrowRight className="h-4 w-4" />
          </div>

          {/* Nodo 2: Supervisor */}
          <div className={`p-4 rounded-xl border text-center transition-all duration-300 ${
            activeStep === "supervisor"
              ? amount <= 5000
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "border-indigo-500 bg-indigo-500/5 text-indigo-600 dark:text-indigo-300"
              : activeStep === "gerente" || activeStep === "rechazado"
              ? "border-slate-200 dark:border-slate-800 opacity-60"
              : "border-slate-250 dark:border-slate-850 opacity-40"
          }`}>
            <div className="text-xs font-bold">Supervisor</div>
            <div className="text-[10px] text-slate-450 mt-1">Límite: $5,000</div>
          </div>

          <div className="hidden md:flex justify-center text-slate-400">
            <ArrowRight className="h-4 w-4" />
          </div>

          {/* Nodo 3: Gerente */}
          <div className={`p-4 rounded-xl border text-center transition-all duration-300 ${
            activeStep === "gerente"
              ? amount <= 20000
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "border-rose-500 bg-rose-500/10 text-rose-700"
              : activeStep === "rechazado"
              ? "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-455 opacity-60"
              : "border-slate-250 dark:border-slate-850 opacity-40"
          }`}>
            <div className="text-xs font-bold">Gerente</div>
            <div className="text-[10px] text-slate-450 mt-1">Límite: $20,000</div>
          </div>
        </div>

        {/* Mensaje de Resultado */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-3">
          <ShieldCheck className={`h-6 w-6 shrink-0 ${
            activeStep === "rechazado" ? "text-rose-500" : activeStep === "none" ? "text-slate-400 animate-spin" : "text-emerald-500"
          }`} />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{approverText}</span>
        </div>
      </div>
    </motion.div>
  );
}
