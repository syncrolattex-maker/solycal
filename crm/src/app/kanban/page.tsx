"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
import ProjectModal from "@/components/ProjectModal";
import LeadModal from "@/components/LeadModal";

type ColumnId = "nuevo" | "tecnica" | "taller" | "facturado";

interface KanbanCard {
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
  const [projects, setProjects] = useState<KanbanCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<ColumnId>("nuevo");
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  const lastMutationRef = useRef<number>(0);

  const showNotice = (text: string) => {
    setNotice(text);
    setTimeout(() => {
      setNotice((prev) => (prev === text ? null : prev));
    }, 4000);
  };

  const syncData = useCallback(async () => {
    // Avoid overwriting freshly committed changes if in-flight
    if (Date.now() - lastMutationRef.current < 2500) {
      return;
    }

interface RawLead {
  id: string;
  client?: string | null;
  message?: string;
  status: string;
  email?: string;
  phone?: string;
  createdAt: string;
}

interface RawQuote {
  steelKg?: number;
  estimatedHours?: number;
  amount?: number;
}

interface RawProject {
  id: string;
  title: string;
  client?: string | null;
  status: string;
  createdAt: string;
  quotes?: RawQuote[];
}

    try {
      const [leadsRes, prjRes] = await Promise.all([
        fetch("/api/leads", { cache: "no-store", headers: { "Pragma": "no-cache" } }),
        fetch("/api/projects", { cache: "no-store", headers: { "Pragma": "no-cache" } }),
      ]);

      let leadCards: KanbanCard[] = [];
      if (leadsRes.ok) {
        const leads: RawLead[] = await leadsRes.json();
        leadCards = (leads || [])
          .filter((l: RawLead) => l.status === "nuevo")
          .map((l: RawLead) => ({
            id: l.id,
            ref: `WEB-${l.id.slice(-4).toUpperCase()}`,
            title: l.message && l.message.length > 55 ? `${l.message.slice(0, 52)}...` : l.message || "Petición web",
            client: l.client || "SOLICITUD WEB",
            status: "nuevo" as const,
            steelKg: 0,
            estimatedHours: 0,
            amount: 0,
            material: `Petición Web · ${l.email || l.phone || ""}`,
            createdAt: new Date(l.createdAt).toLocaleDateString("es-ES"),
          }));
      }

      let dbCards: KanbanCard[] = [];
      if (prjRes.ok) {
        const projectsData: RawProject[] = await prjRes.json();
        dbCards = (projectsData || []).map((p: RawProject) => {
          const steelKg = p.quotes?.reduce((acc: number, q: RawQuote) => acc + (q.steelKg || 0), 0) || 0;
          const estimatedHours = p.quotes?.reduce((acc: number, q: RawQuote) => acc + (q.estimatedHours || 0), 0) || 0;
          const amount = p.quotes?.reduce((acc: number, q: RawQuote) => acc + (q.amount || 0), 0) || 0;
          const statusCol: ColumnId =
            p.status === "oficina_tecnica" ? "tecnica" : p.status === "taller" ? "taller" : "facturado";

          return {
            id: p.id,
            ref: `PRJ-${p.id.slice(-4).toUpperCase()}`,
            title: p.title,
            client: p.client || "CLIENTE GENERAL",
            status: statusCol,
            steelKg,
            estimatedHours,
            amount,
            material: "Proyecto Técnico Solycal",
            createdAt: new Date(p.createdAt).toLocaleDateString("es-ES"),
          };
        });
      }

      setProjects([...leadCards, ...dbCards]);
    } catch {
      // Silently ignore offline error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncData();
    const interval = setInterval(syncData, 6000);
    return () => clearInterval(interval);
  }, [syncData]);

  const moveProject = async (id: string, newStatus: ColumnId) => {
    lastMutationRef.current = Date.now();

    // 1. Moving a lead from "nuevo" forward to "tecnica" -> Convert to Project in DB
    if (id.startsWith("lead-") && newStatus === "tecnica") {
      const target = projects.find((p) => p.id === id);
      if (!target) return;

      // Optimistic update
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "tecnica" } : p))
      );

      try {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: target.title,
            client: target.client,
            status: "oficina_tecnica",
            leadId: id,
          }),
        });

        if (res.ok) {
          const resJson = await res.json();
          const prj = resJson.project;
          setProjects((prev) =>
            prev.map((p) =>
              p.id === id
                ? {
                    ...p,
                    id: prj.id,
                    ref: `PRJ-${prj.id.slice(-4).toUpperCase()}`,
                    status: "tecnica",
                  }
                : p
            )
          );
          showNotice("Lead convertido a Proyecto en Oficina Técnica");
        } else {
          syncData();
          showNotice("Error al convertir lead a proyecto");
        }
      } catch {
        syncData();
        showNotice("Error de conexión");
      }
      return;
    }

    // 2. Prevent moving project to "nuevo"
    if (newStatus === "nuevo") {
      showNotice("Un proyecto técnico no puede retroceder a petición web");
      return;
    }

    // 3. Move project between tecnica, taller, facturado
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );

    const dbStatus =
      newStatus === "facturado" ? "facturado" : newStatus === "taller" ? "taller" : "oficina_tecnica";

    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: dbStatus,
        }),
      });
      if (res.ok) {
        showNotice("Estado de proyecto actualizado");
      } else {
        syncData();
        showNotice("Error al actualizar estado");
      }
    } catch {
      syncData();
      showNotice("Error de conexión");
    }
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
    return null;
  };

  const handleCreateProject = async (data: {
    title: string;
    client?: string;
    status: "oficina_tecnica" | "taller" | "facturado";
    leadId?: string;
  }) => {
    lastMutationRef.current = Date.now();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error al registrar proyecto");
    }

    const resJson = await res.json();
    const prj = resJson.project;
    const newCard: KanbanCard = {
      id: prj.id,
      ref: `PRJ-${prj.id.slice(-4).toUpperCase()}`,
      title: prj.title,
      client: prj.client || "CLIENTE GENERAL",
      status: prj.status === "oficina_tecnica" ? "tecnica" : prj.status === "taller" ? "taller" : "facturado",
      steelKg: 0,
      estimatedHours: 0,
      amount: 0,
      material: "Proyecto Técnico Solycal",
      createdAt: new Date().toLocaleDateString("es-ES"),
    };
    setProjects((prev) => [newCard, ...prev.filter((p) => p.id !== prj.id)]);
    showNotice("Proyecto registrado");
  };

  const handleCreateLead = async (data: {
    client: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    lastMutationRef.current = Date.now();
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error al registrar petición");
    }

    const resJson = await res.json();
    const l = resJson.lead;
    const newCard: KanbanCard = {
      id: l.id,
      ref: `WEB-${l.id.slice(-4).toUpperCase()}`,
      title: l.message && l.message.length > 55 ? `${l.message.slice(0, 52)}...` : l.message,
      client: l.client || "SOLICITUD WEB",
      status: "nuevo",
      steelKg: 0,
      estimatedHours: 0,
      amount: 0,
      material: `Petición Web · ${l.email || l.phone}`,
      createdAt: new Date().toLocaleDateString("es-ES"),
    };
    setProjects((prev) => [newCard, ...prev]);
    showNotice("Petición web registrada");
  };

  // KPIs estrictos a tiempo real de proyectos en marcha (Oficina Técnica y Taller)
  const activeProjects = projects.filter((p) => p.status === "tecnica" || p.status === "taller");
  const totalSteelKg = activeProjects.reduce((acc, p) => acc + p.steelKg, 0);
  const totalHours = activeProjects.reduce((acc, p) => acc + p.estimatedHours, 0);
  const totalAmount = projects.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-yellow selection:text-black flex flex-col">
      {/* Top Navbar */}
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
            onClick={() => setProjectModalOpen(true)}
            className="bg-brand-yellow text-black hover:bg-brand-accent transition-colors rounded-full font-mono uppercase text-[11px] sm:text-xs font-semibold px-3 sm:px-5 py-2 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Crear Presupuesto</span>
            <span className="inline xs:hidden sm:hidden">Nuevo</span>
          </button>
        </div>
      </header>

      {/* Main Container - Ancho adaptable a pantalla completa en Desktop */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col w-full">
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
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono uppercase tracking-widest text-[10px] sm:text-xs text-brand-textMuted truncate">
                ACERO EN CURSO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
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

        {loading ? (
          <div className="py-24 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow animate-pulse">
              Cargando tablero de producción...
            </span>
          </div>
        ) : (
          /* 4-Column Kanban Board */
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
                                    {project.steelKg > 0 ? `${project.steelKg.toLocaleString("es-ES")} kg` : "--"}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-[10px] text-brand-textMuted uppercase flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5 text-cyan-400" />
                                    Horas
                                  </div>
                                  <div className="font-bold text-white text-[11px]">
                                    {project.estimatedHours > 0 ? `${project.estimatedHours} h` : "--"}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-[10px] text-brand-textMuted uppercase flex items-center gap-1">
                                    <Euro className="w-2.5 h-2.5 text-emerald-400" />
                                    Coste
                                  </div>
                                  <div className="font-bold text-emerald-400 text-[11px]">
                                    {project.amount > 0 ? `${project.amount.toLocaleString("es-ES")} €` : "--"}
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
                        onClick={() => setLeadModalOpen(true)}
                        className="w-full py-2.5 rounded-xl border border-dashed border-brand-border hover:border-brand-yellow/40 text-brand-textMuted hover:text-white font-mono uppercase text-[11px] flex items-center justify-center gap-2 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 text-brand-yellow" />
                        <span>Añadir Petición</span>
                      </button>
                    </div>
                  )}

                  {column.id === "tecnica" && (
                    <div className="p-3 border-t border-brand-border bg-brand-surface/20">
                      <button
                        onClick={() => setProjectModalOpen(true)}
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
        )}
      </main>

      {/* Modals */}
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        onSubmit={handleCreateLead}
      />
    </div>
  );
}
