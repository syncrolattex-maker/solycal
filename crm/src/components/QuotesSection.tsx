"use client";

import React from "react";
import { ProjectRecord } from "@/lib/db";
import { FileSpreadsheet, Scale, Clock, Euro, Plus } from "lucide-react";

interface QuotesSectionProps {
  projects: ProjectRecord[];
  onOpenQuoteModal: (project: ProjectRecord) => void;
}

export default function QuotesSection({
  projects,
  onOpenQuoteModal,
}: QuotesSectionProps) {
  // Flatten quotes with project details
  const quoteRows = projects.flatMap((project) =>
    project.quotes.map((quote) => ({
      quote,
      project,
    }))
  );

  const totalKg = quoteRows.reduce((sum, item) => sum + item.quote.steelKg, 0);
  const totalHours = quoteRows.reduce((sum, item) => sum + item.quote.estimatedHours, 0);
  const totalAmount = quoteRows.reduce((sum, item) => sum + item.quote.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-brand-dark border border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-yellow">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-tight">
              Registro de Presupuestos y Costes Técnicos
            </h2>
            <p className="font-mono text-[11px] text-brand-textMuted">
              Cálculo de kilos de acero, horas de taller y cotizaciones emitidas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 text-brand-yellow" />
            <span className="text-white font-bold">{totalKg.toLocaleString("es-ES")}</span>
            <span className="text-brand-textMuted">kg</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-bold">{totalHours}</span>
            <span className="text-brand-textMuted">h</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border flex items-center gap-2">
            <Euro className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-bold">
              {totalAmount.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Quotes Cards View */}
      <div className="md:hidden space-y-3">
        {quoteRows.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-brand-dark border border-brand-border">
            <span className="font-mono text-xs text-brand-textMuted uppercase tracking-wider">
              No hay presupuestos registrados
            </span>
          </div>
        ) : (
          quoteRows.map(({ quote, project }) => (
            <div
              key={quote.id}
              className="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] text-brand-yellow font-bold uppercase block">
                    #{quote.id.slice(-6).toUpperCase()}
                  </span>
                  <div className="font-bold text-white tracking-tight text-sm mt-0.5">
                    {project.title}
                  </div>
                  <div className="font-mono text-xs text-neutral-400">
                    {project.client || "Cliente general"}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-emerald-400 font-bold text-sm block">
                    {quote.amount.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    €
                  </span>
                  <span className="text-[10px] text-brand-textMuted">
                    {new Date(quote.createdAt).toLocaleDateString("es-ES")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-black/40 border border-brand-border font-mono text-xs">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Scale className="w-3 h-3 text-brand-yellow" />
                  <span>{quote.steelKg.toLocaleString("es-ES")} kg</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{quote.estimatedHours} h de taller</span>
                </div>
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => onOpenQuoteModal(project)}
                  className="w-full py-2 rounded-lg bg-brand-surface hover:bg-brand-yellow/10 border border-brand-border hover:border-brand-yellow/30 text-brand-yellow font-mono text-[11px] uppercase font-bold flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Otra Cotización</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quotes Table (Desktop) */}
      <div className="hidden md:block rounded-2xl bg-brand-dark border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-brand-surface/60 font-mono text-xs text-brand-textMuted uppercase tracking-widest">
                <th className="py-3.5 px-6">Referencia</th>
                <th className="py-3.5 px-6">Proyecto</th>
                <th className="py-3.5 px-6">Cliente</th>
                <th className="py-3.5 px-6 text-right">Kilos Acero</th>
                <th className="py-3.5 px-6 text-right">Horas Estimadas</th>
                <th className="py-3.5 px-6 text-right">Importe Cotizado</th>
                <th className="py-3.5 px-6">Fecha Emisión</th>
                <th className="py-3.5 px-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-sm">
              {quoteRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <span className="font-mono text-xs text-brand-textMuted uppercase tracking-wider">
                      No hay presupuestos registrados
                    </span>
                  </td>
                </tr>
              ) : (
                quoteRows.map(({ quote, project }) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-brand-surface/40 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono text-xs text-brand-yellow font-semibold">
                      #{quote.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-4 px-6 font-bold text-white tracking-tight">
                      {project.title}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-neutral-300">
                      {project.client || "--"}
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-xs font-bold text-white">
                      {quote.steelKg.toLocaleString("es-ES")} kg
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-xs font-bold text-cyan-400">
                      {quote.estimatedHours} h
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-xs font-bold text-emerald-400">
                      {quote.amount.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-brand-textMuted">
                      {new Date(quote.createdAt).toLocaleDateString("es-ES")}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onOpenQuoteModal(project)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-surface hover:bg-brand-yellow/10 border border-brand-border hover:border-brand-yellow/30 text-brand-yellow font-mono text-[10px] uppercase font-bold transition-all"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Presupuestar</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
