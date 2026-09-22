"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scale,
  Clock,
  Euro,
  Plus,
  ArrowRight,
  ArrowLeft,
  FileText,
  HardHat,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

type ColumnId = "nuevo" | "tecnica" | "taller" | "facturado";

interface MockProject {
  id: string;
  ref: string;
  title: string;
  client: string;
  status: ColumnId;
  steelKg: number;
  estimatedHours: number;
  amount: number;
  material: string;
  createdAt: string;
}

const INITIAL_PROJECTS: MockProject[] = [
  // Columna: Nuevo
  {
    id: "prj-001",
    ref: "SOL-2026-081",
    title: "Tolva cónica de recepción 6m³",
    client: "Celsa Group",
    status: "nuevo",
    steelKg: 4200,
    estimatedHours: 95,
    amount: 19800,
    material: "Acero S275JR - Esp. 10mm",
    createdAt: "21/09/2026",
  },
  {
    id: "prj-002",
    ref: "SOL-2026-082",
    title: "Ciclón decantador de partículas",
    client: "Fertiberia Sagunto",
    status: "nuevo",
    steelKg: 2100,
    estimatedHours: 70,
    amount: 14600,
    material: "Inox AISI 304L - Esp. 6mm",
    createdAt: "21/09/2026",
  },

  // Columna: Técnica
  {
    id: "prj-003",
    ref: "SOL-2026-077",
    title: "Virola cilíndrica Ø2.400mm L=6.000mm",
    client: "ArcelorMittal Sagunto",
    status: "tecnica",
    steelKg: 3800,
    estimatedHours: 80,
    amount: 18200,
    material: "Acero S355J2+N - Esp. 16mm",
    createdAt: "19/09/2026",
  },
  {
    id: "prj-004",
    ref: "SOL-2026-078",
    title: "Depósito vertical almacenamiento 12m³",
    client: "Repsol Química",
    status: "tecnica",
    steelKg: 5400,
    estimatedHours: 140,
    amount: 32500,
    material: "Inox AISI 316L - Radiografiado",
    createdAt: "18/09/2026",
  },

  // Columna: Taller
  {
    id: "prj-005",
    ref: "SOL-2026-072",
    title: "Colector distribuidor vapor DN500",
    client: "Iberdrola Generación",
    status: "taller",
    steelKg: 1950,
    estimatedHours: 110,
    amount: 16900,
    material: "Acero P265GH - Tubo sin soldadura",
    createdAt: "15/09/2026",
  },
  {
    id: "prj-006",
    ref: "SOL-2026-073",
    title: "Bastidor mecano-soldado prensa 200T",
    client: "Gestamp Automoción",
    status: "taller",
    steelKg: 7600,
    estimatedHours: 190,
    amount: 41800,
    material: "Acero S355JR - Vigas HEB 400",
    createdAt: "14/09/2026",
  },

  // Columna: Facturado
  {
    id: "prj-007",
    ref: "SOL-2026-065",
    title: "Pasarela técnica y tramex galvanizado",
    client: "Tubos Reunidos S.A.",
    status: "facturado",
    steelKg: 3100,
    estimatedHours: 65,
    amount: 15400,
    material: "Acero S275JR - UNE-EN 1090",
    createdAt: "08/09/2026",
  },
  {
    id: "prj-008",
    ref: "SOL-2026-066",
    title: "Chimenea autoportante Ø1.200mm H=18m",
    client: "Torrecid S.A.",
    status: "facturado",
    steelKg: 6800,
    estimatedHours: 160,
    amount: 38900,
    material: "Acero Corten A - Virola 8mm",
    createdAt: "04/09/2026",
  },
];

interface ColumnMeta {
  id: ColumnId;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  headerBorder: string;
  badgeStyle: string;
  accentBar: string;
}

const COLUMNS: ColumnMeta[] = [
  {
    id: "nuevo",
    label: "NUEVO",
    sublabel: "Peticiones y recepción",
    icon: <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />,
    headerBorder: "border-brand-yellow/30",
    badgeStyle: "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30",
    accentBar: "bg-brand-yellow",
  },
  {
    id: "tecnica",
    label: "TÉCNICA",
    sublabel: "Planos y presupuestación",
    icon: <FileText className="w-3.5 h-3.5 text-cyan-400" />,
    headerBorder: "border-cyan-400/30",
    badgeStyle: "bg-cyan-400/10 text-cyan-400 border-cyan-400/30",
    accentBar: "bg-cyan-400",
  },
  {
    id: "taller",
    label: "TALLER",
    sublabel: "Corte, cilindrado y soldadura",
    icon: <HardHat className="w-3.5 h-3.5 text-amber-400" />,
    headerBorder: "border-amber-400/30",
    badgeStyle: "bg-amber-400/10 text-amber-400 border-amber-400/30",
    accentBar: "bg-amber-400",
  },
  {
    id: "facturado",
    label: "FACTURADO",
    sublabel: "Control de calidad y entrega",
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
    headerBorder: "border-emerald-400/30",
    badgeStyle: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
    accentBar: "bg-emerald-400",
  },
];

export default function KanbanPage() {
  const [projects, setProjects] = useState<MockProject[]>(INITIAL_PROJECTS);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<ColumnId>("nuevo");

  useEffect(() => {
    const syncLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        if (!res.ok) return;
        const leads: Array<{
          id: string;
          client: string | null;
          email: string;
          phone: string;
          message: string;
          status: "nuevo" | "evaluacion" | "descartado";
          createdAt: string;
        }> = await res.json();

        const leadProjects: MockProject[] = leads
          .filter((l) => l.status === "nuevo")
          .map((l) => ({
            id: l.id,
            ref: `WEB-${l.id.slice(-4).toUpperCase()}`,
            title: l.message.length > 55 ? `${l.message.slice(0, 52)}...` : l.message,
            client: l.client || "SOLICITUD WEB",
            status: "nuevo" as const,
            steelKg: 0,
            estimatedHours: 0,
            amount: 0,
            material: `Petición Web · ${l.email}`,
            createdAt: new Date(l.createdAt).toLocaleDateString("es-ES"),
          }));

        setProjects((prev) => {
          const nonDynamicLeads = prev.filter((p) => !p.id.startsWith("lead-"));
          return [...leadProjects, ...nonDynamicLeads];
        });
      } catch {
        // Silently ignore if offline
      }
    };

    syncLeads();
    const interval = setInterval(syncLeads, 4000);
    return () => clearInterval(interval);
  }, []);

  const moveProject = async (id: string, newStatus: ColumnId) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );

    if (id.startsWith("lead-")) {
      try {
        await fetch("/api/leads", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            status: newStatus === "nuevo" ? "nuevo" : "evaluacion",
          }),
        });
      } catch {
        // Silently ignore
      }
    }

    setNotice("Estado de proyecto actualizado");
    setTimeout(() => setNotice(null), 3000);
  };

  const getNextStatus = (current: ColumnId): ColumnId | null => {
    if (current === "nuevo") return "tecnica";
    if (current === "tecnica") return "taller";
    if (current === "taller") return "facturado";
    return null;
  };

  const getPrevStatus = (current: ColumnId): ColumnId | null => {
    if (current === "facturado") return "taller";
    if (current === "taller") return "tecnica";
    if (current === "tecnica") return "nuevo";
    return null;
  };

  // KPIs
  const totalSteelKg = projects.reduce((acc, p) => acc + p.steelKg, 0);
  const totalHours = projects.reduce((acc, p) => acc + p.estimatedHours, 0);
  const totalAmount = projects.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-yellow selection:text-black flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 px-4 sm:px-6 lg:px-10 bg-brand-dark border-b border-brand-border flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center font-mono font-bold text-brand-yellow text-sm sm:text-base">
            S
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                SOLYCAL S.L.
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 font-semibold">
                CRM
              </span>
            </div>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-textMuted truncate max-w-[170px] sm:max-w-none">
              Tablero de Producción
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-surface border border-brand-border text-brand-textMuted hover:text-white font-mono uppercase text-[11px] sm:text-xs transition-colors"
          >
            <span>Panel Global</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => {
              const newId = `prj-${Date.now().toString().slice(-3)}`;
              const newRef = `SOL-2026-${Math.floor(Math.random() * 90 + 10)}`;
              const sample: MockProject = {
                id: newId,
                ref: newRef,
                title: "Tolva de descarga 3.5m³ S275JR",
                client: "Siderúrgica del Turia",
                status: "nuevo",
                steelKg: 2800,
                estimatedHours: 60,
                amount: 13500,
                material: "Acero al carbono S275JR",
                createdAt: "21/09/2026",
              };
              setProjects((prev) => [sample, ...prev]);
              setNotice("Proyecto registrado");
              setTimeout(() => setNotice(null), 3000);
            }}
            className="bg-brand-yellow text-black hover:bg-brand-accent transition-colors rounded-full font-mono uppercase text-[11px] sm:text-xs font-semibold px-3 sm:px-5 py-2 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Crear Presupuesto</span>
            <span className="inline xs:hidden sm:hidden">Nuevo</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 flex flex-col max-w-[1700px] w-full mx-auto">
        {/* Notice Banner */}
        {notice && (
          <div className="mb-4 sm:mb-6 px-4 py-3 rounded-xl bg-brand-dark border border-brand-yellow/40 text-brand-yellow font-mono text-xs uppercase tracking-wider flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <span>{notice}</span>
            <button onClick={() => setNotice(null)} className="text-neutral-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Header Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-3.5 sm:p-4 rounded-xl bg-brand-dark border border-brand-border">
            <span className="block font-mono uppercase tracking-widest text-[10px] sm:text-xs text-brand-textMuted mb-1 truncate">
              ACERO EN CURSO
            </span>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {totalSteelKg.toLocaleString("es-ES")}
              </span>
              <span className="text-[10px] sm:text-xs text-brand-yellow uppercase font-bold">KG</span>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-brand-dark border border-brand-border">
            <span className="block font-mono uppercase tracking-widest text-[10px] sm:text-xs text-brand-textMuted mb-1 truncate">
              HORAS TALLER
            </span>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {totalHours.toLocaleString("es-ES")}
              </span>
              <span className="text-[10px] sm:text-xs text-cyan-400 uppercase font-bold">H</span>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-brand-dark border border-brand-border">
            <span className="block font-mono uppercase tracking-widest text-[10px] sm:text-xs text-brand-textMuted mb-1 truncate">
              CARTERA VALORADA
            </span>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
                {totalAmount.toLocaleString("es-ES")}
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-400 uppercase font-bold">€</span>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-brand-dark border border-brand-border">
            <span className="block font-mono uppercase tracking-widest text-[10px] sm:text-xs text-brand-textMuted mb-1 truncate">
              PROYECTOS ACTIVOS
            </span>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-xl sm:text-2xl font-bold text-brand-yellow tracking-tight">
                {projects.length}
              </span>
              <span className="text-[10px] sm:text-xs text-brand-textMuted uppercase">TOTAL</span>
            </div>
          </div>
        </div>

        {/* Mobile Column Switcher (Tabs) for 4 cols */}
        <div className="md:hidden flex items-center p-1 rounded-xl bg-brand-dark border border-brand-border overflow-x-auto gap-1 mb-4">
          {COLUMNS.map((col) => {
            const count = projects.filter((p) => p.status === col.id).length;
            const isActive = activeMobileTab === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setActiveMobileTab(col.id)}
                className={`flex-1 min-w-[85px] py-1.5 px-2 rounded-lg font-mono text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
                  isActive
                    ? "bg-brand-surface text-brand-yellow border border-brand-yellow/30 shadow-sm"
                    : "text-brand-textMuted hover:text-white"
                }`}
              >
                <span>{col.label}</span>
                <span className={`px-1 rounded-full text-[9px] font-bold ${isActive ? "bg-brand-yellow text-black" : "bg-black/50 text-neutral-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4-Column Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 flex-1 items-start">
          {COLUMNS.map((column) => {
            const colProjects = projects.filter((p) => p.status === column.id);
            const colSteelKg = colProjects.reduce((acc, p) => acc + p.steelKg, 0);
            const isVisibleOnMobile = activeMobileTab === column.id;

            return (
              <div
                key={column.id}
                className={`flex flex-col rounded-2xl bg-brand-dark border border-brand-border overflow-hidden min-h-[400px] md:min-h-[600px] shadow-sm ${
                  isVisibleOnMobile ? "flex" : "hidden md:flex"
                }`}
              >
                {/* Column Top Bar */}
                <div className={`p-4 border-b border-brand-border bg-brand-surface/40 flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5">
                    {column.icon}
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                        {column.label}
                      </h3>
                      <p className="font-mono text-[10px] text-brand-textMuted">
                        {column.sublabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${column.badgeStyle} font-bold`}>
                      {colProjects.length}
                    </span>
                    <span className="font-mono text-[10px] text-brand-textMuted mt-1">
                      {colSteelKg.toLocaleString("es-ES")} kg
                    </span>
                  </div>
                </div>

                {/* Card Stream */}
                <div className="p-4 space-y-4 flex-1">
                  {colProjects.length === 0 ? (
                    <div className="h-44 rounded-xl border border-dashed border-brand-border flex items-center justify-center text-center p-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-brand-textMuted">
                        Sin proyectos en {column.label}
                      </span>
                    </div>
                  ) : (
                    colProjects.map((project) => {
                      const nextStatus = getNextStatus(project.status);
                      const prevStatus = getPrevStatus(project.status);

                      return (
                        <div
                          key={project.id}
                          className="rounded-xl bg-brand-surface border border-brand-border p-4 hover:border-brand-yellow/40 transition-all group shadow-sm flex flex-col justify-between relative overflow-hidden"
                        >
                          {/* Accent line on left */}
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-1 ${column.accentBar}`}
                          />

                          <div>
                            {/* Top space mono labels */}
                            <div className="flex items-center justify-between gap-2 mb-2 pl-1">
                              <span className="font-mono uppercase tracking-widest text-xs text-brand-textMuted truncate max-w-[170px]">
                                {project.client}
                              </span>
                              <span className="font-mono text-[10px] text-brand-yellow bg-black/40 px-1.5 py-0.5 rounded border border-brand-border">
                                {project.ref}
                              </span>
                            </div>

                            {/* Card title with tracking-tight */}
                            <h4 className="text-sm font-bold text-white tracking-tight leading-snug mb-2 pl-1 group-hover:text-brand-yellow transition-colors">
                              {project.title}
                            </h4>

                            {/* Material & Specs */}
                            <div className="mb-3 pl-1 font-mono text-[11px] text-brand-textMuted">
                              {project.material}
                            </div>

                            {/* Technical Metrics Box */}
                            <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-lg bg-black/50 border border-brand-border mb-3 font-mono text-xs">
                              <div>
                                <div className="text-[10px] text-brand-textMuted uppercase flex items-center gap-1">
                                  <Scale className="w-2.5 h-2.5 text-brand-yellow" />
                                  Acero
                                </div>
                                <div className="font-bold text-white text-[11px]">
                                  {project.steelKg.toLocaleString("es-ES")} kg
                                </div>
                              </div>

                              <div>
                                <div className="text-[10px] text-brand-textMuted uppercase flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5 text-cyan-400" />
                                  Horas
                                </div>
                                <div className="font-bold text-white text-[11px]">
                                  {project.estimatedHours} h
                                </div>
                              </div>

                              <div>
                                <div className="text-[10px] text-brand-textMuted uppercase flex items-center gap-1">
                                  <Euro className="w-2.5 h-2.5 text-emerald-400" />
                                  Coste
                                </div>
                                <div className="font-bold text-emerald-400 text-[11px]">
                                  {project.amount.toLocaleString("es-ES")} €
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Footer */}
                          <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between pl-1">
                            <span className="font-mono text-[10px] text-brand-textMuted">
                              {project.createdAt}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {prevStatus && (
                                <button
                                  onClick={() => moveProject(project.id, prevStatus)}
                                  title="Retroceder fase"
                                  className="p-1 rounded bg-brand-dark hover:bg-white/10 border border-brand-border text-brand-textMuted hover:text-white transition-all text-xs"
                                >
                                  <ArrowLeft className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {nextStatus && (
                                <button
                                  onClick={() => moveProject(project.id, nextStatus)}
                                  title="Avanzar fase"
                                  className="px-2 py-1 rounded bg-brand-yellow/10 hover:bg-brand-yellow/20 border border-brand-yellow/40 text-brand-yellow font-mono text-[10px] uppercase font-bold flex items-center gap-1 transition-all"
                                >
                                  <span className="capitalize">{nextStatus}</span>
                                  <ArrowRight className="w-3 h-3" />
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
                {column.id === "nuevo" && (
                  <div className="p-3 border-t border-brand-border bg-brand-surface/20">
                    <button
                      onClick={() => {
                        const newId = `prj-${Date.now().toString().slice(-3)}`;
                        const sample: MockProject = {
                          id: newId,
                          ref: `SOL-2026-${Math.floor(Math.random() * 90 + 10)}`,
                          title: "Depósito de purga DN400",
                          client: "Iberdrola",
                          status: "nuevo",
                          steelKg: 1500,
                          estimatedHours: 45,
                          amount: 8900,
                          material: "Acero al carbono P265GH",
                          createdAt: "21/09/2026",
                        };
                        setProjects((prev) => [sample, ...prev]);
                        setNotice("Proyecto registrado");
                        setTimeout(() => setNotice(null), 3000);
                      }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-brand-border hover:border-brand-yellow/40 text-brand-textMuted hover:text-white font-mono uppercase text-[11px] flex items-center justify-center gap-2 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5 text-brand-yellow" />
                      <span>Añadir Petición</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
