"use client";

import React, { useState } from "react";
import { LeadRecord } from "@/lib/db";
import {
  Inbox,
  Mail,
  Phone,
  ArrowRight,
  XCircle,
  Clock,
  Plus,
} from "lucide-react";

interface LeadsSectionProps {
  leads: LeadRecord[];
  onConvertToProject: (lead: LeadRecord) => void;
  onUpdateStatus: (id: string, status: "nuevo" | "evaluacion" | "descartado") => void;
  onNewLead: () => void;
}

export default function LeadsSection({
  leads,
  onConvertToProject,
  onUpdateStatus,
  onNewLead,
}: LeadsSectionProps) {
  const [filter, setFilter] = useState<"todos" | "nuevo" | "evaluacion" | "descartado">("todos");

  const filteredLeads = leads.filter((lead) => {
    if (filter === "todos") return true;
    return lead.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-brand-dark border border-brand-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-yellow">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-tight">
              Bandeja de Peticiones Web & Leads Técnicos
            </h2>
            <p className="font-mono text-[11px] text-brand-textMuted">
              Solicitudes de cotización recibidas desde la web corporativa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center rounded-xl bg-brand-surface border border-brand-border p-1">
            {(["todos", "nuevo", "evaluacion", "descartado"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all ${
                  filter === status
                    ? "bg-black/60 text-brand-yellow border border-brand-yellow/30 font-bold"
                    : "text-brand-textMuted hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            onClick={onNewLead}
            className="bg-brand-yellow text-black hover:bg-brand-accent transition-colors rounded-full font-mono uppercase text-xs font-semibold px-4 py-2 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nueva Petición</span>
          </button>
        </div>
      </div>

      {/* Leads Mobile Cards View (sm/md screens) */}
      <div className="md:hidden space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-brand-dark border border-brand-border">
            <span className="font-mono text-xs text-brand-textMuted uppercase tracking-wider">
              No hay peticiones registradas
            </span>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const dateStr = new Date(lead.createdAt).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            });
            return (
              <div
                key={lead.id}
                className="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-white tracking-tight text-sm">
                      {lead.client || "Sin especificar"}
                    </div>
                    <div className="font-mono text-[10px] text-brand-textMuted">
                      #{lead.id.slice(-6)} · {dateStr}
                    </div>
                  </div>
                  <div>
                    {lead.status === "nuevo" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/40 text-brand-yellow text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
                        Nuevo
                      </span>
                    )}
                    {lead.status === "evaluacion" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                        <Clock className="w-2.5 h-2.5" />
                        Evaluación
                      </span>
                    )}
                    {lead.status === "descartado" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-brand-textMuted text-[10px] uppercase tracking-wider">
                        Descartado
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-neutral-300">
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-brand-yellow">
                    <Mail className="w-3 h-3 text-brand-textMuted" />
                    <span className="truncate max-w-[180px]">{lead.email}</span>
                  </a>
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-brand-yellow">
                    <Phone className="w-3 h-3 text-brand-textMuted" />
                    <span>{lead.phone}</span>
                  </a>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-brand-border text-xs text-neutral-300 font-sans line-clamp-3">
                  {lead.message}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  {lead.status !== "descartado" ? (
                    <button
                      onClick={() => onUpdateStatus(lead.id, "descartado")}
                      className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-textMuted hover:text-red-400 font-mono text-[10px] uppercase"
                    >
                      Descartar
                    </button>
                  ) : <div />}
                  <button
                    onClick={() => onConvertToProject(lead)}
                    className="bg-brand-yellow text-black hover:bg-brand-accent transition-colors rounded-full font-mono uppercase text-[10px] font-semibold px-4 py-1.5 flex items-center gap-1 shadow-sm"
                  >
                    <span>Convertir a Proyecto</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Leads Table (Desktop) */}
      <div className="hidden md:block rounded-2xl bg-brand-dark border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-brand-surface/60 font-mono text-xs text-brand-textMuted uppercase tracking-widest">
                <th className="py-3.5 px-6">Cliente / Empresa</th>
                <th className="py-3.5 px-6">Contacto Técnico</th>
                <th className="py-3.5 px-6">Requerimiento / Especificaciones</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6">Entrada</th>
                <th className="py-3.5 px-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-sm">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <span className="font-mono text-xs text-brand-textMuted uppercase tracking-wider">
                      No hay peticiones registradas con este criterio
                    </span>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const dateStr = new Date(lead.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  });

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-brand-surface/40 transition-colors group"
                    >
                      {/* Cliente */}
                      <td className="py-4 px-6 align-top">
                        <div className="font-bold text-white tracking-tight">
                          {lead.client || "Sin especificar"}
                        </div>
                        <div className="font-mono text-[10px] text-brand-textMuted mt-0.5">
                          ID: #{lead.id.slice(-6)}
                        </div>
                      </td>

                      {/* Contacto */}
                      <td className="py-4 px-6 align-top font-mono text-xs space-y-1">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1.5 text-neutral-300 hover:text-brand-yellow transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-brand-textMuted shrink-0" />
                          <span className="truncate max-w-[180px]">{lead.email}</span>
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1.5 text-neutral-300 hover:text-brand-yellow transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-brand-textMuted shrink-0" />
                          <span>{lead.phone}</span>
                        </a>
                      </td>

                      {/* Mensaje */}
                      <td className="py-4 px-6 align-top max-w-xs sm:max-w-md">
                        <p className="text-xs text-neutral-300 line-clamp-3 font-sans leading-relaxed">
                          {lead.message}
                        </p>
                      </td>

                      {/* Estado */}
                      <td className="py-4 px-6 align-top font-mono text-xs">
                        {lead.status === "nuevo" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/40 text-brand-yellow text-[11px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-ping"></span>
                            Nuevo
                          </span>
                        )}
                        {lead.status === "evaluacion" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
                            <Clock className="w-3 h-3" />
                            Evaluación
                          </span>
                        )}
                        {lead.status === "descartado" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-brand-textMuted text-[11px] uppercase tracking-wider">
                            <XCircle className="w-3 h-3" />
                            Descartado
                          </span>
                        )}
                      </td>

                      {/* Fecha */}
                      <td className="py-4 px-6 align-top font-mono text-xs text-brand-textMuted whitespace-nowrap">
                        {dateStr}
                      </td>

                      {/* Acciones */}
                      <td className="py-4 px-6 align-top text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onConvertToProject(lead)}
                            className="bg-brand-yellow text-black hover:bg-brand-accent transition-colors rounded-full font-mono uppercase text-[10px] font-semibold px-3 py-1.5 flex items-center gap-1 shadow-sm"
                          >
                            <span>A Proyecto</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>

                          {lead.status !== "descartado" && (
                            <button
                              onClick={() => onUpdateStatus(lead.id, "descartado")}
                              title="Descartar petición"
                              className="p-1.5 rounded-lg bg-brand-surface hover:bg-red-500/10 border border-brand-border hover:border-red-500/30 text-brand-textMuted hover:text-red-400 transition-all"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
