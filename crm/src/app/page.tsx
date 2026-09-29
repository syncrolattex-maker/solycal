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
import { broadcastSync, subscribeToSync } from "@/lib/syncChannel";

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
  const lastMutationRef = React.useRef<number>(0);

  const showNotice = (text: string, type: "info" | "error" = "info") => {
    setNotice({ text, type });
    setTimeout(() => {
      setNotice((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  // Track recent local status mutations to prevent background polling from reverting them
  const recentMutationsRef = React.useRef<Map<string, { status: "oficina_tecnica" | "taller" | "facturado"; timestamp: number }>>(new Map());
  const recentLeadMutationsRef = React.useRef<Map<string, { status: "nuevo" | "evaluacion" | "descartado"; timestamp: number }>>(new Map());

  const fetchData = useCallback(async () => {
    try {
      const [prjRes, ldsRes] = await Promise.all([
        fetch("/api/projects", { cache: "no-store", headers: { "Pragma": "no-cache" } }),
        fetch("/api/leads", { cache: "no-store", headers: { "Pragma": "no-cache" } }),
      ]);

      if (prjRes.ok) {
        const prjData: ProjectRecord[] = await prjRes.json();
        const now = Date.now();

        setProjects((currentProjects) => {
          // Reconcile server data with any active local mutations (protected for 30 seconds)
          const merged = prjData.map((serverPrj) => {
            const localMutation = recentMutationsRef.current.get(serverPrj.id);
            const currentPrj = currentProjects.find(
              (c) =>
                c.id === serverPrj.id ||
                c.id.replace(/^(prj-|web-|#)/i, "").toLowerCase() ===
                  serverPrj.id.replace(/^(prj-|web-|#)/i, "").toLowerCase()
            );

            // Defensive merge of quotes: retain existing client quotes if server has fewer or none
            const quotes =
              currentPrj?.quotes && currentPrj.quotes.length > (serverPrj.quotes?.length || 0)
                ? currentPrj.quotes
                : serverPrj.quotes || [];

            if (localMutation && now - localMutation.timestamp < 30000) {
              return { ...serverPrj, status: localMutation.status, quotes };
            }
            return { ...serverPrj, quotes };
          });

          // Ensure any newly added local project not yet returned by server stays visible
          for (const cur of currentProjects) {
            if (!merged.some((m) => m.id === cur.id)) {
              const localMutation = recentMutationsRef.current.get(cur.id);
              if (localMutation && now - localMutation.timestamp < 30000) {
                merged.unshift(cur);
              }
            }
          }

          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("solycal_crm_projects_cache", JSON.stringify(merged));
            } catch {}
          }
          return merged;
        });
      }

      if (ldsRes.ok) {
        const ldsData: LeadRecord[] = await ldsRes.json();
        const now = Date.now();

        setLeads((currentLeads) => {
          const merged = ldsData.map((serverLead) => {
            const localMutation = recentLeadMutationsRef.current.get(serverLead.id);
            if (localMutation && now - localMutation.timestamp < 30000) {
              return { ...serverLead, status: localMutation.status };
            }
            return serverLead;
          });

          // Ensure any local lead not yet returned stays visible
          for (const cur of currentLeads) {
            if (!merged.some((m) => m.id === cur.id)) {
              const localMutation = recentLeadMutationsRef.current.get(cur.id);
              if (localMutation && now - localMutation.timestamp < 30000) {
                merged.unshift(cur);
              }
            }
          }

          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("solycal_crm_leads_cache", JSON.stringify(merged));
            } catch {}
          }
          return merged;
        });
      }
    } catch {
      showNotice("Error al conectar con el servidor", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cachedProjects = localStorage.getItem("solycal_crm_projects_cache");
        if (cachedProjects) {
          const parsed = JSON.parse(cachedProjects);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjects(parsed);
            setLoading(false);
          }
        }
        const cachedLeads = localStorage.getItem("solycal_crm_leads_cache");
        if (cachedLeads) {
          const parsed = JSON.parse(cachedLeads);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLeads(parsed);
          }
        }
      } catch {}
    }
    fetchData();
    const interval = setInterval(fetchData, 4000);

    // Cross-tab real-time sync subscription (BroadcastChannel, storage event, visibility/focus)
    const unsubscribe = subscribeToSync(() => {
      if (typeof window !== "undefined") {
        try {
          const cachedProjects = localStorage.getItem("solycal_crm_projects_cache");
          if (cachedProjects) {
            const parsed = JSON.parse(cachedProjects);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProjects(parsed);
            }
          }
          const cachedLeads = localStorage.getItem("solycal_crm_leads_cache");
          if (cachedLeads) {
            const parsed = JSON.parse(cachedLeads);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setLeads(parsed);
            }
          }
        } catch {}
      }
      fetchData();
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [fetchData]);

  const handleRefresh = () => {
    recentMutationsRef.current.clear();
    recentLeadMutationsRef.current.clear();
    setRefreshing(true);
    fetchData();
  };

  // Status change handler for Kanban (Click and Drag&Drop)
  const handleProjectStatusChange = async (
    id: string,
    newStatus: "oficina_tecnica" | "taller" | "facturado"
  ) => {
    const now = Date.now();
    lastMutationRef.current = now;
    recentMutationsRef.current.set(id, { status: newStatus, timestamp: now });
    const prevProjects = projects;

    // Immediate optimistic local update + local storage anchor
    setProjects((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, status: newStatus, updatedAt: new Date() } : p
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("solycal_crm_projects_cache", JSON.stringify(next));
        } catch {}
      }
      return next;
    });

    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const resJson = await res.json().catch(() => ({}));

      if (!res.ok) {
        recentMutationsRef.current.delete(id);
        setProjects(prevProjects);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("solycal_crm_projects_cache", JSON.stringify(prevProjects));
          } catch {}
        }
        fetchData();
        const errorMsg = resJson.error || resJson.details || "Error al actualizar estado de proyecto";
        showNotice(errorMsg, "error");
        return;
      }
      
      if (resJson.project) {
        setProjects((prev) => {
          const next = prev.map((p) => {
            if (p.id === id) {
              const returnedProject: ProjectRecord = resJson.project;
              const quotes =
                p.quotes && p.quotes.length > (returnedProject.quotes?.length || 0)
                  ? p.quotes
                  : returnedProject.quotes && returnedProject.quotes.length > 0
                  ? returnedProject.quotes
                  : p.quotes || [];
              return {
                ...returnedProject,
                quotes,
              };
            }
            return p;
          });
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("solycal_crm_projects_cache", JSON.stringify(next));
            } catch {}
          }
          return next;
        });
      }
      broadcastSync({ type: "PROJECTS_UPDATED" });
      showNotice("Estado de proyecto actualizado");
    } catch (err: unknown) {
      recentMutationsRef.current.delete(id);
      setProjects(prevProjects);
      fetchData();
      const msg = err instanceof Error ? err.message : "Error al actualizar estado de proyecto";
      showNotice(msg, "error");
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
    const now = Date.now();
    lastMutationRef.current = now;
    recentLeadMutationsRef.current.set(id, { status, timestamp: now });
    const prevLeads = leads;

    setLeads((prev) => {
      const next = prev.map((l) => (l.id === id ? { ...l, status, updatedAt: new Date() } : l));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("solycal_crm_leads_cache", JSON.stringify(next));
        } catch {}
      }
      return next;
    });

    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const resJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        recentLeadMutationsRef.current.delete(id);
        setLeads(prevLeads);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("solycal_crm_leads_cache", JSON.stringify(prevLeads));
          } catch {}
        }
        fetchData();
        const errorMsg = resJson.error || resJson.details || "Error al actualizar estado de lead";
        showNotice(errorMsg, "error");
        return;
      }

      broadcastSync({ type: "LEADS_UPDATED" });
      showNotice("Estado de lead actualizado");
    } catch {
      recentLeadMutationsRef.current.delete(id);
      setLeads(prevLeads);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("solycal_crm_leads_cache", JSON.stringify(prevLeads));
        } catch {}
      }
      fetchData();
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
    const now = Date.now();
    lastMutationRef.current = now;
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resJson = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(resJson.details || resJson.error || "Error al registrar proyecto");
    }

    recentMutationsRef.current.set(resJson.project.id, {
      status: resJson.project.status,
      timestamp: Date.now(),
    });

    setProjects((prev) => {
      const next = [resJson.project, ...prev.filter((p) => p.id !== resJson.project.id)];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("solycal_crm_projects_cache", JSON.stringify(next));
        } catch {}
      }
      return next;
    });

    broadcastSync({ type: "PROJECTS_UPDATED" });

    if (data.leadId) {
      recentLeadMutationsRef.current.set(data.leadId, {
        status: "evaluacion",
        timestamp: now,
      });

      setLeads((prev) => {
        const next = prev.map((l) =>
          l.id === data.leadId ? { ...l, status: "evaluacion" as const, updatedAt: new Date() } : l
        );
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("solycal_crm_leads_cache", JSON.stringify(next));
          } catch {}
        }
        return next;
      });

      // Fire secondary background PATCH to guarantee persistence
      fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data.leadId, status: "evaluacion" }),
      }).catch(() => {});

      broadcastSync({ type: "LEADS_UPDATED" });
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
    lastMutationRef.current = Date.now();
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

    setProjects((prev) => {
      const next = prev.map((p) => {
        const matches =
          p.id === data.projectId ||
          p.id.replace(/^(prj-|web-|#)/i, "").toLowerCase() ===
            data.projectId.replace(/^(prj-|web-|#)/i, "").toLowerCase();
        if (matches) {
          const existingQuotes = p.quotes || [];
          return {
            ...p,
            quotes: [...existingQuotes.filter((q) => q.id !== newQuote.id), newQuote],
          };
        }
        return p;
      });

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("solycal_crm_projects_cache", JSON.stringify(next));
        } catch {}
      }
      return next;
    });

    broadcastSync({ type: "PROJECTS_UPDATED" });
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

  // Total steel kg for sidebar strictly from ACTIVE in-progress projects (oficina técnica y taller)
  const totalSteelKg = projects
    .filter((p) => p.status !== "facturado")
    .reduce(
      (acc, p) => acc + (p.quotes || []).reduce((qAcc, q) => qAcc + (q.steelKg || 0), 0),
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
