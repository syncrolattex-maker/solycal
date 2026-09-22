"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, HardHat } from "lucide-react";
import { LeadRecord } from "@/lib/db";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; client?: string; status: "oficina_tecnica" | "taller" | "facturado"; leadId?: string }) => Promise<void>;
  fromLead?: LeadRecord | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSubmit,
  fromLead,
}: ProjectModalProps) {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState<"oficina_tecnica" | "taller" | "facturado">("oficina_tecnica");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fromLead) {
      setTitle(
        fromLead.message.length > 50
          ? `${fromLead.message.slice(0, 47)}...`
          : fromLead.message
      );
      setClient(fromLead.client || "");
    } else {
      setTitle("");
      setClient("");
      setStatus("oficina_tecnica");
    }
    setError(null);
  }, [fromLead, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("El título del proyecto es obligatorio");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onSubmit({
        title,
        client: client || undefined,
        status,
        leadId: fromLead ? fromLead.id : undefined,
      });
      onClose();
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-brand-dark border border-brand-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92dvh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-brand-border flex items-center justify-between bg-brand-surface/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-yellow">
              <HardHat className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                {fromLead ? "Convertir Lead a Proyecto" : "Nuevo Proyecto Industrial"}
              </h3>
              <p className="font-mono text-[11px] sm:text-xs text-brand-textMuted">
                Asignación técnica a ciclo de fabricación
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-textMuted hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-brand-textMuted mb-2">
              Título del Proyecto / Pieza *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Tolva cónica 3m³ en chapa antidesgaste"
              className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-brand-textMuted mb-2">
              Cliente / Empresa
            </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Ej. ArcelorMittal Sagunto"
              className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-brand-textMuted mb-2">
              Fase Inicial
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "oficina_tecnica" | "taller" | "facturado")
              }
              className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-xs uppercase focus:border-brand-yellow focus:outline-none transition-colors"
            >
              <option value="oficina_tecnica">Oficina Técnica (Planos y Homologación)</option>
              <option value="taller">Taller y Calderería (Fabricación Activa)</option>
              <option value="facturado">Facturado y Entregado</option>
            </select>
          </div>

          <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full font-mono uppercase text-xs text-brand-textMuted hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-yellow text-black hover:bg-brand-accent transition-colors rounded-full font-mono uppercase text-xs font-semibold px-6 py-2.5 flex items-center gap-2 disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{loading ? "Registrando..." : "Crear Proyecto"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
