"use client";

import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import KanbanBoard from "@/components/KanbanBoard";
import LeadsSection from "@/components/LeadsSection";
import QuotesSection from "@/components/QuotesSection";
import QuoteCalculator from "@/components/QuoteCalculator";
import BottomNav, { MobileTab } from "@/components/BottomNav";
import ProjectModal from "@/components/ProjectModal";
import QuoteModal from "@/components/QuoteModal";
import LeadModal from "@/components/LeadModal";
import { ProjectRecord, LeadRecord } from "@/lib/db";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<MobileTab>("kanban");
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modals
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedLeadForProject, setSelectedLeadForProject] = useState<LeadRecord | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProjectForQuote, setSelectedProjectForQuote] = useState<ProjectRecord | null>(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  // Technical Direct Notification (Neutral and direct, zero decorative text)
  const [notice, setNotice] = useState<{ text: string; type: "info" | "error" } | null>(null);

  const showNotice = (text: string, type: "info" | "error" = "info") => {
    setNotice({ text, type });
    setTimeout(() => {
      setNotice((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  const fetchData = useCallback(async () => {
    try {
      const [prjRes, ldsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/leads"),
      ]);
      if (prjRes.ok) {
        const prjData = await prjRes.json();
        setProjects(prjData);
      }
      if (ldsRes.ok) {
        const ldsData = await ldsRes.json();
        setLeads(ldsData);
      }
    } catch {
      showNotice("Error al conectar con el servidor", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Status change handler for Kanban
  const handleProjectStatusChange = async (
    id: string,
    newStatus: "oficina_tecnica" | "taller" | "facturado"
  ) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      
      // Update local state
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
      showNotice("Estado de proyecto actualizado");
    } catch {
      showNotice("Error al actualizar estado de proyecto", "error");
    }
  };

  // Convert lead to project
  const handleConvertToProject = (lead: LeadRecord) => {
    setSelectedLeadForProject(lead);
    setProjectModalOpen(true);
  };

  // Lead status change
  const handleUpdateLeadStatus = async (
    id: string,
    status: "nuevo" | "evaluacion" | "descartado"
  ) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Error al actualizar");

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
      showNotice("Estado de lead actualizado");
    } catch {
      showNotice("Error al modificar lead", "error");
    }
  };

  // Submit new project
  const handleCreateProject = async (data: {
    title: string;
    client?: string;
    status: "oficina_tecnica" | "taller" | "facturado";
    leadId?: string;
  }) => {
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
    setProjects((prev) => [resJson.project, ...prev]);

    if (data.leadId) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === data.leadId ? { ...l, status: "evaluacion" as const } : l
        )
      );
      showNotice("Lead convertido a Proyecto");
    } else {
      showNotice("Proyecto registrado");
    }
    setCurrentTab("kanban");
  };

  // Submit quote
  const handleCreateQuote = async (data: {
    projectId: string;
    amount: number;
    steelKg: number;
    estimatedHours: number;
  }) => {
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error al crear cotización");
    }

    const resJson = await res.json();
    const newQuote = resJson.quote;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === data.projectId) {
          return {
            ...p,
            quotes: [...p.quotes, newQuote],
          };
        }
        return p;
      })
    );

    showNotice("Presupuesto actualizado");
  };

  // Submit manual lead
  const handleCreateLead = async (data: {
    client: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error al registrar lead");
    }

    const resJson = await res.json();
    setLeads((prev) => [resJson.lead, ...prev]);
    showNotice("Lead registrado");
  };

  // Total steel kg for sidebar
  const totalSteelKg = projects.reduce(
    (acc, p) => acc + p.quotes.reduce((qAcc, q) => qAcc + q.steelKg, 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-brand-black text-white selection:bg-brand-yellow selection:text-black">
      {/* Desktop Sticky Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        leadsCount={leads.filter((l) => l.status === "nuevo").length}
        projectsCount={projects.length}
        totalSteelKg={totalSteelKg}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onNewProject={() => {
            setSelectedLeadForProject(null);
            setProjectModalOpen(true);
          }}
          onRefresh={handleRefresh}
          isRefreshing={refreshing}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 sm:pb-8 overflow-y-auto">
          {/* Notification Alert Banner */}
          {notice && (
            <div
              className={`mb-6 p-4 rounded-xl border font-mono text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200 ${
                notice.type === "info"
                  ? "bg-brand-surface border-brand-yellow/40 text-brand-yellow"
                  : "bg-red-500/10 border-red-500/40 text-red-400"
              }`}
            >
              <div className="flex items-center gap-2">
                {notice.type === "info" ? (
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span className="uppercase tracking-wider font-semibold">
                  {notice.text}
                </span>
              </div>
              <button
                onClick={() => setNotice(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* Main Content or Loading */}
          {loading ? (
            <div className="py-24 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow animate-pulse">
                Cargando datos de planta...
              </span>
            </div>
          ) : (
            <>
              {/* Top KPI Stats (En desktop siempre arriba, en móvil también accesible mediante pestaña dedicada) */}
              <div className={currentTab === "metrics" ? "block" : "hidden sm:block"}>
                <StatsCards projects={projects} leads={leads} />
              </div>

              {/* Pestaña Exclusiva de Métricas para Mobile */}
              {currentTab === "metrics" && (
                <div className="sm:hidden space-y-4">
                  <div className="p-4 rounded-xl bg-brand-dark border border-brand-border">
                    <h3 className="text-sm font-bold uppercase tracking-tight text-white mb-2">
                      Estado Global de Planta
                    </h3>
                    <p className="font-mono text-xs text-brand-textMuted">
                      Datos consolidados en tiempo real de proyectos, horas de taller y peticiones pendientes.
                    </p>
                  </div>
                  <QuotesSection
                    projects={projects}
                    onOpenQuoteModal={(project) => {
                      setSelectedProjectForQuote(project);
                      setQuoteModalOpen(true);
                    }}
                  />
                </div>
              )}

              {/* Main Tab Content */}
              {currentTab === "kanban" && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight uppercase">
                        Ciclo de Calderería & Oficina Técnica
                      </h2>
                      <p className="font-mono text-[11px] sm:text-xs text-brand-textMuted">
                        Flujo de proyectos industriales según norma EN-1090
                      </p>
                    </div>
                  </div>
                  <KanbanBoard
                    projects={projects}
                    onStatusChange={handleProjectStatusChange}
                    onOpenQuoteModal={(project) => {
                      setSelectedProjectForQuote(project);
                      setQuoteModalOpen(true);
                    }}
                    onNewProject={() => {
                      setSelectedLeadForProject(null);
                      setProjectModalOpen(true);
                    }}
                  />
                </div>
              )}

              {currentTab === "leads" && (
                <LeadsSection
                  leads={leads}
                  onConvertToProject={handleConvertToProject}
                  onUpdateStatus={handleUpdateLeadStatus}
                  onNewLead={() => setLeadModalOpen(true)}
                />
              )}

              {currentTab === "quotes" && (
                <div className="space-y-6">
                  {/* Generador de Escandallos Integrado para Móvil y Desktop */}
                  <QuoteCalculator />

                  {/* Historial de Cotizaciones */}
                  <QuotesSection
                    projects={projects}
                    onOpenQuoteModal={(project) => {
                      setSelectedProjectForQuote(project);
                      setQuoteModalOpen(true);
                    }}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (App Nativa) */}
      <BottomNav
        currentTab={currentTab}
        onChangeTab={(tab) => setCurrentTab(tab)}
        leadsCount={leads.filter((l) => l.status === "nuevo").length}
        projectsCount={projects.length}
      />

      {/* Modals */}
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
          setSelectedLeadForProject(null);
        }}
        onSubmit={handleCreateProject}
        fromLead={selectedLeadForProject}
      />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => {
          setQuoteModalOpen(false);
          setSelectedProjectForQuote(null);
        }}
        project={selectedProjectForQuote}
        onSubmit={handleCreateQuote}
      />

      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        onSubmit={handleCreateLead}
      />
    </div>
  );
}
