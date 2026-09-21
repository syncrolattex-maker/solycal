"use client";

import React from "react";
import { ProjectRecord } from "@/lib/db";
import {
  FileCode2,
  HardHat,
  CheckCircle2,
  Plus,
  ArrowRight,
  ArrowLeft,
  Scale,
  Clock,
  Euro,
} from "lucide-react";

interface KanbanBoardProps {
  projects: ProjectRecord[];
  onStatusChange: (id: string, newStatus: "oficina_tecnica" | "taller" | "facturado") => void;
  onOpenQuoteModal: (project: ProjectRecord) => void;
  onNewProject: () => void;
}

interface ColumnConfig {
  id: "oficina_tecnica" | "taller" | "facturado";
  title: string;
  icon: React.ReactNode;
  accentBorder: string;
  badgeBg: string;
}

const COLUMNS: ColumnConfig[] = [
  {
    id: "oficina_tecnica",
    title: "OFICINA TÉCNICA",
    icon: <FileCode2 className="w-4 h-4 text-brand-yellow" />,
    accentBorder: "border-brand-yellow/30",
    badgeBg: "bg-brand-yellow/10 text-brand-yellow",
  },
  {
    id: "taller",
    title: "TALLER Y CALDERERÍA",
    icon: <HardHat className="w-4 h-4 text-cyan-400" />,
    accentBorder: "border-cyan-400/30",
    badgeBg: "bg-cyan-400/10 text-cyan-400",
  },
  {
    id: "facturado",
    title: "FACTURADO Y ENTREGADO",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    accentBorder: "border-emerald-400/30",
    badgeBg: "bg-emerald-400/10 text-emerald-400",
  },
];

export default function KanbanBoard({
  projects,
  onStatusChange,
  onOpenQuoteModal,
  onNewProject,
}: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {COLUMNS.map((col) => {
        const colProjects = projects.filter((p) => p.status === col.id);
        const colSteelKg = colProjects.reduce(
          (acc, p) => acc + p.quotes.reduce((qAcc, q) => qAcc + q.steelKg, 0),
          0
        );

        return (
          <div
            key={col.id}
            className="flex flex-col rounded-2xl bg-brand-dark border border-brand-border overflow-hidden"
          >
            {/* Column Header */}
            <div className={`p-4 border-b border-brand-border bg-brand-surface/40 flex items-center justify-between`}>
              <div className="flex items-center gap-2.5">
                {col.icon}
                <h3 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
                  {col.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${col.badgeBg} font-bold`}>
                  {colProjects.length}
                </span>
                {colSteelKg > 0 && (
                  <span className="font-mono text-[11px] text-brand-textMuted">
                    {colSteelKg.toLocaleString("es-ES")} kg
                  </span>
                )}
              </div>
            </div>

            {/* Column Projects List */}
            <div className="p-4 space-y-4 flex-1 min-h-[500px]">
              {colProjects.length === 0 ? (
                <div className="h-40 rounded-xl border border-dashed border-brand-border flex flex-col items-center justify-center text-center p-4">
                  <span className="font-mono text-xs text-brand-textMuted uppercase tracking-wider">
                    Sin proyectos en esta fase
                  </span>
                </div>
              ) : (
                colProjects.map((project) => {
                  const totalKg = project.quotes.reduce((a, b) => a + b.steelKg, 0);
                  const totalHrs = project.quotes.reduce((a, b) => a + b.estimatedHours, 0);
                  const totalEur = project.quotes.reduce((a, b) => a + b.amount, 0);

                  return (
                    <div
                      key={project.id}
                      className="rounded-xl bg-brand-surface border border-brand-border p-4 hover:border-brand-yellow/40 transition-all group shadow-sm"
                    >
                      {/* Top Label */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono uppercase tracking-widest text-xs text-brand-textMuted truncate max-w-[200px]">
                          {project.client || "CLIENTE GENERAL"}
                        </span>
                        <span className="font-mono text-[10px] text-brand-textMuted">
                          #{project.id.slice(-5)}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h4 className="text-sm font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-brand-yellow transition-colors">
                        {project.title}
                      </h4>

                      {/* Technical Metrics */}
                      <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-lg bg-black/40 border border-brand-border mb-3 font-mono text-xs">
                        <div>
                          <div className="text-[10px] text-brand-textMuted uppercase flex items-center gap-1">
                            <Scale className="w-2.5 h-2.5 text-brand-yellow" />
                            Acero
                          </div>
                          <div className="font-bold text-white text-[11px]">
                            {totalKg > 0 ? `${totalKg.toLocaleString("es-ES")} kg` : "--"}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] text-brand-textMuted uppercase flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-cyan-400" />
                            Horas
                          </div>
                          <div className="font-bold text-white text-[11px]">
                            {totalHrs > 0 ? `${totalHrs} h` : "--"}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] text-brand-textMuted uppercase flex items-center gap-1">
                            <Euro className="w-2.5 h-2.5 text-emerald-400" />
                            Coste
                          </div>
                          <div className="font-bold text-emerald-400 text-[11px]">
                            {totalEur > 0 ? `${totalEur.toLocaleString("es-ES")} €` : "--"}
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-brand-border/60">
                        <button
                          onClick={() => onOpenQuoteModal(project)}
                          className="font-mono uppercase text-[10px] text-brand-yellow hover:text-white transition-colors flex items-center gap-1 font-semibold"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{project.quotes.length > 0 ? "Añadir Coste" : "Cotizar"}</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {col.id === "taller" && (
                            <button
                              onClick={() => onStatusChange(project.id, "oficina_tecnica")}
                              title="Mover a Oficina Técnica"
                              className="p-1 rounded bg-brand-dark hover:bg-white/10 border border-brand-border text-brand-textMuted hover:text-white transition-all text-xs"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {col.id === "oficina_tecnica" && (
                            <button
                              onClick={() => onStatusChange(project.id, "taller")}
                              title="Enviar a Taller"
                              className="px-2 py-1 rounded bg-brand-yellow/10 hover:bg-brand-yellow/20 border border-brand-yellow/40 text-brand-yellow font-mono text-[10px] uppercase font-bold flex items-center gap-1 transition-all"
                            >
                              <span>A Taller</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}

                          {col.id === "taller" && (
                            <button
                              onClick={() => onStatusChange(project.id, "facturado")}
                              title="Marcar Facturado"
                              className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] uppercase font-bold flex items-center gap-1 transition-all"
                            >
                              <span>Facturar</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}

                          {col.id === "facturado" && (
                            <button
                              onClick={() => onStatusChange(project.id, "taller")}
                              title="Reabrir en Taller"
                              className="p-1 rounded bg-brand-dark hover:bg-white/10 border border-brand-border text-brand-textMuted hover:text-white transition-all text-xs"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Column Footer */}
            {col.id === "oficina_tecnica" && (
              <div className="p-3 border-t border-brand-border bg-brand-surface/20">
                <button
                  onClick={onNewProject}
                  className="w-full py-2.5 rounded-xl border border-dashed border-brand-border hover:border-brand-yellow/40 text-brand-textMuted hover:text-white font-mono uppercase text-[11px] flex items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Nuevo Proyecto</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
