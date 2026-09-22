"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  HardHat,
  FileSpreadsheet,
  Layers,
  Flame,
  ShieldCheck,
  Calculator,
  ArrowUpRight,
} from "lucide-react";

interface SidebarProps {
  currentTab: "kanban" | "leads" | "quotes" | "metrics";
  setCurrentTab: (tab: "kanban" | "leads" | "quotes" | "metrics") => void;
  leadsCount: number;
  projectsCount: number;
  totalSteelKg: number;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,
  leadsCount,
  projectsCount,
  totalSteelKg,
}: SidebarProps) {
  const handleSelectTab = (tab: "kanban" | "leads" | "quotes" | "metrics") => {
    setCurrentTab(tab);
  };

  return (
    <aside className="hidden lg:flex w-64 bg-brand-dark border-r border-brand-border flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-brand-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-yellow font-mono font-bold text-lg">
                S
              </div>
              <div>
                <div className="text-base font-bold tracking-tight text-white uppercase">
                  SOLYCAL <span className="text-brand-yellow text-xs font-mono font-normal">S.L.</span>
                </div>
                <div className="font-mono text-[10px] tracking-widest text-brand-textMuted uppercase">
                  Calderería & Mecanizado
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 px-2.5 py-1.5 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300">
                Planta Operativa
              </span>
            </div>
            <span className="font-mono text-[10px] text-brand-yellow font-bold">
              EN-1090
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 pb-2 font-mono text-[10px] uppercase tracking-widest text-brand-textMuted">
            Gestión de Producción
          </div>

          <button
            onClick={() => handleSelectTab("kanban")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-xs font-medium ${
              currentTab === "kanban"
                ? "bg-brand-surface text-white border border-brand-yellow/30 shadow-sm"
                : "text-brand-textMuted hover:text-white hover:bg-brand-surface/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard
                className={`w-4 h-4 ${
                  currentTab === "kanban" ? "text-brand-yellow" : "text-brand-textMuted"
                }`}
              />
              <span>Tablero de Proyectos</span>
            </div>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-black/40 border border-brand-border text-neutral-300">
              {projectsCount}
            </span>
          </button>

          <button
            onClick={() => handleSelectTab("leads")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-xs font-medium ${
              currentTab === "leads"
                ? "bg-brand-surface text-white border border-brand-yellow/30 shadow-sm"
                : "text-brand-textMuted hover:text-white hover:bg-brand-surface/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox
                className={`w-4 h-4 ${
                  currentTab === "leads" ? "text-brand-yellow" : "text-brand-textMuted"
                }`}
              />
              <span>Peticiones Web</span>
            </div>
            {leadsCount > 0 && (
              <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-yellow text-black">
                {leadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleSelectTab("quotes")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-xs font-medium ${
              currentTab === "quotes"
                ? "bg-brand-surface text-white border border-brand-yellow/30 shadow-sm"
                : "text-brand-textMuted hover:text-white hover:bg-brand-surface/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet
                className={`w-4 h-4 ${
                  currentTab === "quotes" ? "text-brand-yellow" : "text-brand-textMuted"
                }`}
              />
              <span>Presupuestos y Costes</span>
            </div>
          </button>

          <div className="pt-4 px-3 pb-2 font-mono text-[10px] uppercase tracking-widest text-brand-textMuted">
            Rutas Específicas
          </div>

          <Link
            href="/kanban"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-brand-textMuted hover:text-white hover:bg-brand-surface/50 transition-all"
          >
            <span>Tablero Kanban (4 Cols)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-yellow" />
          </Link>

          <Link
            href="/quotes"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-brand-textMuted hover:text-white hover:bg-brand-surface/50 transition-all"
          >
            <span>Escandallos (Server Action)</span>
            <Calculator className="w-3.5 h-3.5 text-brand-yellow" />
          </Link>

          <div className="pt-6 px-3 pb-2 font-mono text-[10px] uppercase tracking-widest text-brand-textMuted">
            Capacidades Industriales
          </div>

          <div className="px-3 py-2 text-xs text-neutral-400 space-y-2 font-mono">
            <div className="flex items-center gap-2 text-[11px]">
              <Flame className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Corte Plasma HD 50mm</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <Layers className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Cilindrado hasta 25mm</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <HardHat className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Soldadura TIG / MIG-MAG</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Production Quick Gauge */}
      <div className="p-4 border-t border-brand-border">
        <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-textMuted">
              Carga de Acero
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="font-mono text-lg font-bold text-brand-yellow">
            {totalSteelKg.toLocaleString("es-ES")} <span className="text-xs text-neutral-400 font-normal">kg</span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-brand-textMuted">
            Material activo en planta
          </div>
        </div>
      </div>
    </aside>
  );
}
