"use client";

import React, { useState, useEffect } from "react";
import { Plus, RefreshCw, Radio } from "lucide-react";

import Image from "next/image";

interface HeaderProps {
  onNewProject: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export default function Header({
  onNewProject,
  onRefresh,
  isRefreshing = false,
}: HeaderProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 px-4 sm:px-6 lg:px-8 bg-brand-dark border-b border-brand-border flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
        {/* Mobile Brand Icon with official logo */}
        <div className="lg:hidden w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center p-1 shrink-0">
          <Image
            src="/logo-icon.png"
            alt="SOLYCAL"
            width={24}
            height={24}
            className="w-full h-full object-contain"
          />
        </div>

        <div>
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-textMuted">
            OFICINA TÉCNICA Y CALDERERÍA
          </div>
          <div className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate max-w-[200px] sm:max-w-none">
            Control de Proyectos & Fabricación
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border font-mono text-xs text-neutral-300">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>SISTEMA CONECTADO</span>
          <span className="text-brand-textMuted">|</span>
          <span className="text-brand-yellow">{time || "--:--:--"}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Sincronizar datos"
          className="p-2 sm:p-2.5 rounded-full bg-brand-surface border border-brand-border text-brand-textMuted hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-brand-yellow" : ""}`} />
        </button>

        <button
          onClick={onNewProject}
          className="bg-brand-yellow text-black hover:bg-brand-accent transition-colors rounded-full font-mono uppercase text-[11px] sm:text-xs font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 shadow-sm whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden xs:inline sm:inline">Crear Proyecto</span>
          <span className="inline xs:hidden sm:hidden">Proyecto</span>
        </button>
      </div>
    </header>
  );
}
