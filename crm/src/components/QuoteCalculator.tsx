"use client";

import React from "react";
import { useFormState } from "react-dom";
import {
  calculateQuote,
  QuoteCalculationResult,
} from "@/actions/calculateQuote";
import {
  Scale,
  Clock,
  Percent,
  Calculator,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const INITIAL_STATE: QuoteCalculationResult = {
  steel: 1500,
  hours: 45,
  margin: 25,
  steelCost: 3000,
  hoursCost: 1575,
  subtotal: 4575,
  marginAmount: 1143.75,
  total: 5718.75,
};

export default function QuoteCalculator() {
  const [state, formAction] = useFormState<QuoteCalculationResult | null, FormData>(
    calculateQuote,
    INITIAL_STATE
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Formulario de Escandallo */}
      <div className="lg:col-span-6 rounded-2xl bg-brand-dark border border-brand-border p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 pb-6 border-b border-brand-border mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-yellow">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight uppercase">
              Escandallo de Fabricación
            </h2>
            <p className="font-mono text-xs text-brand-textMuted">
              Cálculo de costes internos y margen comercial
            </p>
          </div>
        </div>

        {state?.error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          {/* Input 1: steel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="steel"
                className="font-mono text-xs uppercase tracking-widest text-brand-textMuted flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Kilos de Acero (kg)</span>
              </label>
              <span className="font-mono text-[11px] text-neutral-400">
                Tarifa: 2,00 €/kg
              </span>
            </div>
            <div className="relative">
              <input
                id="steel"
                name="steel"
                type="number"
                step="any"
                required
                min="0"
                defaultValue={state?.steel ?? 1500}
                placeholder="1500"
                className="w-full px-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-base focus:border-brand-yellow focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-brand-textMuted uppercase pointer-events-none">
                KG
              </span>
            </div>
          </div>

          {/* Input 2: hours */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="hours"
                className="font-mono text-xs uppercase tracking-widest text-brand-textMuted flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Horas de Taller (h)</span>
              </label>
              <span className="font-mono text-[11px] text-neutral-400">
                Tarifa: 35,00 €/h
              </span>
            </div>
            <div className="relative">
              <input
                id="hours"
                name="hours"
                type="number"
                step="any"
                required
                min="0"
                defaultValue={state?.hours ?? 45}
                placeholder="45"
                className="w-full px-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-base focus:border-brand-yellow focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-brand-textMuted uppercase pointer-events-none">
                HORAS
              </span>
            </div>
          </div>

          {/* Input 3: margin */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="margin"
                className="font-mono text-xs uppercase tracking-widest text-brand-textMuted flex items-center gap-1.5"
              >
                <Percent className="w-3.5 h-3.5 text-emerald-400" />
                <span>Margen Industrial (%)</span>
              </label>
              <span className="font-mono text-[11px] text-neutral-400">
                Beneficio sobre coste
              </span>
            </div>
            <div className="relative">
              <input
                id="margin"
                name="margin"
                type="number"
                step="any"
                required
                min="0"
                max="1000"
                defaultValue={state?.margin ?? 25}
                placeholder="25"
                className="w-full px-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-base focus:border-brand-yellow focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-brand-textMuted uppercase pointer-events-none">
                %
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border flex items-center justify-between">
            <span className="font-mono text-[11px] text-brand-textMuted">
              Cálculo por Server Action
            </span>
            <button
              type="submit"
              className="bg-brand-yellow text-black hover:bg-brand-accent transition-colors rounded-full font-mono uppercase text-xs font-semibold px-8 py-3.5 flex items-center gap-2 shadow-[0_0_20px_rgba(241,181,65,0.25)]"
            >
              <Calculator className="w-4 h-4" />
              <span>Calcular Presupuesto</span>
            </button>
          </div>
        </form>
      </div>

      {/* Tarjeta Destacada del Resultado Final */}
      <div className="lg:col-span-6 space-y-6">
        <div className="rounded-2xl bg-brand-dark border-2 border-brand-yellow/50 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Accent glow corner */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between pb-6 border-b border-brand-border">
            <div>
              <span className="font-mono uppercase tracking-widest text-xs text-brand-yellow font-bold block mb-1">
                PRECIO FINAL RECOMENDADO
              </span>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Presupuesto Industrial Estimado
              </h3>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-bold uppercase">
              Listo para oferta
            </span>
          </div>

          {/* Prominent Display Typography for Final Price */}
          <div className="py-8 text-center border-b border-brand-border bg-brand-surface/30 rounded-xl my-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-textMuted block mb-2">
              TOTAL PRESUPUESTO (IVA NO INCLUIDO)
            </span>
            <div className="flex items-baseline justify-center gap-1.5 sm:gap-2">
              <span className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-brand-yellow tracking-tight drop-shadow-sm">
                {state
                  ? state.total.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0,00"}
              </span>
              <span className="font-display font-bold text-xl sm:text-2xl text-brand-yellow">
                €
              </span>
            </div>
          </div>

          {/* Technical Breakdown */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-brand-border/60">
              <span className="text-brand-textMuted">
                Coste Material ({state?.steel ?? 0} kg × 2,00 €/kg):
              </span>
              <span className="text-white font-bold">
                {state
                  ? state.steelCost.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0,00"}{" "}
                €
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-brand-border/60">
              <span className="text-brand-textMuted">
                Mano de Obra ({state?.hours ?? 0} h × 35,00 €/h):
              </span>
              <span className="text-white font-bold">
                {state
                  ? state.hoursCost.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0,00"}{" "}
                €
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-brand-border/60 bg-black/40 px-3 rounded-lg">
              <span className="text-neutral-300 font-semibold uppercase text-[11px]">
                Subtotal Coste Interno:
              </span>
              <span className="text-white font-bold">
                {state
                  ? state.subtotal.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0,00"}{" "}
                €
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-brand-border/60">
              <span className="text-brand-textMuted">
                Margen Industrial ({state?.margin ?? 0}%):
              </span>
              <span className="text-emerald-400 font-bold">
                +{" "}
                {state
                  ? state.marginAmount.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0,00"}{" "}
                €
              </span>
            </div>
          </div>
        </div>

        {/* Technical Notice Banner */}
        <div className="p-4 rounded-xl bg-brand-dark border border-brand-border font-mono text-xs text-brand-textMuted space-y-1">
          <div className="text-white font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" />
            <span>CRITERIO TÉCNICO DE ESCANDALLO</span>
          </div>
          <p>
            • Coste de acero base estimado sobre chapa estructural S275JR / S355JR.
          </p>
          <p>
            • Tarifa de operario incluye preparación de juntas, soldadura homologada y control visual.
          </p>
        </div>
      </div>
    </div>
  );
}
