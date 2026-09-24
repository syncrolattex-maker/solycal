import React from "react";
import Link from "next/link";
import Image from "next/image";
import QuoteCalculator from "@/components/QuoteCalculator";
import { LayoutDashboard, ArrowUpRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Generador de Presupuestos (Escandallos) | SOLYCAL S.L.",
  description: "Cálculo técnico de presupuestos de calderería según kilos de acero y horas de taller.",
};

// Server Component
export default function QuotesPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-yellow selection:text-black flex flex-col">
      {/* Top Industrial Navbar */}
      <header className="h-16 px-4 sm:px-6 lg:px-8 bg-brand-dark border-b border-brand-border flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center p-1.5 shrink-0 shadow-sm">
            <Image
              src="/logo-icon.png"
              alt="SOLYCAL"
              width={28}
              height={28}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white uppercase tracking-tight">
                SOLYCAL S.L.
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 font-semibold">
                OFICINA TÉCNICA
              </span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-textMuted">
              Generador de Presupuestos & Escandallos Industriales
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/kanban"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-surface border border-brand-border text-brand-textMuted hover:text-white font-mono uppercase text-xs transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Tablero Kanban</span>
          </Link>

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-surface border border-brand-border text-brand-textMuted hover:text-white font-mono uppercase text-xs transition-colors"
          >
            <span>Panel General</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Container adaptado a pantalla completa */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full space-y-8">
        {/* Header Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <span className="font-mono uppercase tracking-widest text-xs text-brand-textMuted block mb-1">
              SISTEMA DE ESTIMACIÓN RÁPIDA
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
              Escandallo de Calderería & Mecanizado
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border flex items-center gap-2 font-mono text-xs text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>TARIFAS TALLER 2026</span>
              <span className="text-brand-textMuted">|</span>
              <span className="text-brand-yellow font-bold">2€/kg · 35€/h</span>
            </div>
          </div>
        </div>

        {/* Server Action Quote Calculator Component */}
        <QuoteCalculator />
      </main>
    </div>
  );
}
