"use client";

import React, { useState } from "react";
import { X, Euro, Scale, Clock, Calculator } from "lucide-react";
import { ProjectRecord } from "@/lib/db";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectRecord | null;
  onSubmit: (data: {
    projectId: string;
    amount: number;
    steelKg: number;
    estimatedHours: number;
  }) => Promise<void>;
}

export default function QuoteModal({
  isOpen,
  onClose,
  project,
  onSubmit,
}: QuoteModalProps) {
  const [steelKg, setSteelKg] = useState<string>("500");
  const [estimatedHours, setEstimatedHours] = useState<string>("40");
  const [amount, setAmount] = useState<string>("3500");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !project) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    const numSteel = parseFloat(steelKg);
    const numHours = parseFloat(estimatedHours);

    if (isNaN(numAmount) || numAmount <= 0) {
      setError("El importe debe ser un número positivo");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await onSubmit({
        projectId: project.id,
        amount: numAmount,
        steelKg: isNaN(numSteel) ? 0 : numSteel,
        estimatedHours: isNaN(numHours) ? 0 : numHours,
      });
      onClose();
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-brand-dark border border-brand-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-surface/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-yellow">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight uppercase">
                Crear Presupuesto Técnico
              </h3>
              <p className="font-mono text-xs text-brand-textMuted">
                Cálculo de materiales, tiempos de taller e importe
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

        {/* Project Target Info */}
        <div className="px-6 py-3 bg-black/30 border-b border-brand-border flex items-center justify-between font-mono text-xs">
          <span className="text-brand-textMuted uppercase truncate max-w-[240px]">
            {project.title}
          </span>
          <span className="text-brand-yellow font-bold uppercase">
            {project.client || "CLIENTE GENERAL"}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-brand-textMuted mb-2 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Kilos de Acero (kg) *</span>
              </label>
              <input
                type="number"
                step="any"
                required
                min="0"
                value={steelKg}
                onChange={(e) => setSteelKg(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-sm focus:border-brand-yellow focus:outline-none transition-colors"
                placeholder="500"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-brand-textMuted mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Horas Taller (h) *</span>
              </label>
              <input
                type="number"
                step="any"
                required
                min="0"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-sm focus:border-brand-yellow focus:outline-none transition-colors"
                placeholder="40"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-brand-textMuted mb-2 flex items-center gap-1.5">
              <Euro className="w-3.5 h-3.5 text-emerald-400" />
              <span>Importe Total (€) *</span>
            </label>
            <input
              type="number"
              step="0.01"
              required
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-base font-bold focus:border-brand-yellow focus:outline-none transition-colors"
              placeholder="3500.00"
            />
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
              <span>{loading ? "Calculando..." : "Crear Presupuesto"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
