"use client";

import React from "react";
import { LayoutDashboard, Inbox, Calculator, BarChart3 } from "lucide-react";

export type MobileTab = "kanban" | "leads" | "quotes" | "metrics";

interface BottomNavProps {
  currentTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  leadsCount: number;
  projectsCount: number;
}

export default function BottomNav({
  currentTab,
  onChangeTab,
  leadsCount,
  projectsCount,
}: BottomNavProps) {
  const tabs = [
    {
      id: "kanban" as MobileTab,
      label: "Proyectos",
      icon: LayoutDashboard,
      badge: projectsCount > 0 ? projectsCount : null,
      badgeColor: "bg-brand-surface border border-brand-border text-neutral-300",
    },
    {
      id: "leads" as MobileTab,
      label: "Peticiones",
      icon: Inbox,
      badge: leadsCount > 0 ? leadsCount : null,
      badgeColor: "bg-brand-yellow text-black font-bold",
    },
    {
      id: "quotes" as MobileTab,
      label: "Escandallos",
      icon: Calculator,
      badge: null,
      badgeColor: "",
    },
    {
      id: "metrics" as MobileTab,
      label: "Métricas",
      icon: BarChart3,
      badge: null,
      badgeColor: "",
    },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark/95 backdrop-blur-md border-t border-brand-border px-2 py-1.5 safe-area-bottom select-none shadow-[0_-8px_20px_rgba(0,0,0,0.5)]"
      aria-label="Navegación inferior móvil"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative transition-all rounded-xl ${
                isActive
                  ? "text-brand-yellow font-semibold"
                  : "text-brand-textMuted hover:text-white"
              }`}
            >
              {/* Active Tab Glow Pill */}
              {isActive && (
                <span className="absolute -top-1.5 w-6 h-0.5 bg-brand-yellow rounded-full shadow-[0_0_8px_#F1B541]" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "scale-110 text-brand-yellow" : "text-brand-textMuted"
                  }`}
                />
                {tab.badge !== null && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 font-mono text-[9px] px-1 py-0.2 rounded-full min-w-[15px] h-[15px] flex items-center justify-center ${tab.badgeColor}`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className="font-mono text-[10px] tracking-wider uppercase mt-1">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
