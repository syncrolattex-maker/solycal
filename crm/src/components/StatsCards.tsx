"use client";

import React from "react";
import { ProjectRecord, LeadRecord } from "@/lib/db";
import { Scale, Clock, Euro, Inbox } from "lucide-react";

interface StatsCardsProps {
  projects: ProjectRecord[];
  leads: LeadRecord[];
}

export default function StatsCards({ projects, leads }: StatsCardsProps) {
  // Aggregate steel kilos, hours, amount from active projects
  let totalSteelKg = 0;
  let totalHours = 0;
  let totalAmount = 0;

  projects.forEach((prj) => {
    prj.quotes.forEach((q) => {
      totalSteelKg += q.steelKg;
      totalHours += q.estimatedHours;
      totalAmount += q.amount;
    });
  });

  const activeProjects = projects.filter((p) => p.status !== "facturado").length;
  const newLeadsCount = leads.filter((l) => l.status === "nuevo").length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {/* Kilos de Acero */}
      <div className="p-3.5 sm:p-5 rounded-xl bg-brand-dark border border-brand-border hover:border-brand-yellow/30 transition-all">
        <div className="flex items-center justify-between">
          <span className="font-mono uppercase tracking-widest text-[10px] sm:text-xs text-brand-textMuted">
            ACERO EN PLANTA
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-yellow">
            <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
            {totalSteelKg.toLocaleString("es-ES")}
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-brand-yellow uppercase font-bold">KG</span>
        </div>
        <div className="mt-1 font-mono text-[10px] sm:text-[11px] text-brand-textMuted truncate">
          En {activeProjects} proyectos de taller
        </div>
      </div>

      {/* Horas Estimadas */}
      <div className="p-3.5 sm:p-5 rounded-xl bg-brand-dark border border-brand-border hover:border-brand-yellow/30 transition-all">
        <div className="flex items-center justify-between">
          <span className="font-mono uppercase tracking-widest text-[10px] sm:text-xs text-brand-textMuted">
            CARGA DE TALLER
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-cyan-400">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
            {totalHours.toLocaleString("es-ES")}
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-cyan-400 uppercase font-bold">HORAS</span>
        </div>
        <div className="mt-1 font-mono text-[10px] sm:text-[11px] text-brand-textMuted truncate">
          Calderería y soldadura
        </div>
      </div>

      {/* Total Cotizado */}
      <div className="p-3.5 sm:p-5 rounded-xl bg-brand-dark border border-brand-border hover:border-brand-yellow/30 transition-all">
        <div className="flex items-center justify-between">
          <span className="font-mono uppercase tracking-widest text-[10px] sm:text-xs text-brand-textMuted">
            VOLUMEN TOTAL
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-emerald-400">
            <Euro className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 flex items-baseline gap-1">
          <span className="font-mono text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
            {totalAmount.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-emerald-400 font-bold">€</span>
        </div>
        <div className="mt-1 font-mono text-[10px] sm:text-[11px] text-brand-textMuted truncate">
          Acumulado en cartera
        </div>
      </div>

      {/* Peticiones Nuevas */}
      <div className="p-3.5 sm:p-5 rounded-xl bg-brand-dark border border-brand-border hover:border-brand-yellow/30 transition-all">
        <div className="flex items-center justify-between">
          <span className="font-mono uppercase tracking-widest text-[10px] sm:text-xs text-brand-textMuted">
            LEADS PENDIENTES
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-yellow">
            <Inbox className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-mono text-xl sm:text-2xl font-bold text-brand-yellow tracking-tight">
            {newLeadsCount}
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-brand-textMuted uppercase">
            / {leads.length} TOTAL
          </span>
        </div>
        <div className="mt-1 font-mono text-[10px] sm:text-[11px] text-brand-textMuted truncate">
          Peticiones de cotización
        </div>
      </div>
    </div>
  );
}
