"use client";

import React, { useState } from "react";
import { X, Inbox, Plus } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    client: string;
    email: string;
    phone: string;
    message: string;
  }) => Promise<void>;
}

export default function LeadModal({
  isOpen,
  onClose,
  onSubmit,
}: LeadModalProps) {
  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone || !message) {
      setError("Email, teléfono y especificaciones son obligatorios");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await onSubmit({
        client,
        email,
        phone,
        message,
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
              <Inbox className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                Nueva Petición Técnica / Lead
              </h3>
              <p className="font-mono text-[11px] sm:text-xs text-brand-textMuted">
                Captura manual de consulta técnica o comercial
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
              Empresa / Cliente
            </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Ej. Industrias Químicas del Mediterráneo"
              className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-brand-textMuted mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ingenieria@empresa.com"
                className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-xs focus:border-brand-yellow focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-brand-textMuted mb-2">
                Teléfono Directo *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 600 000 000"
                className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-xs focus:border-brand-yellow focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-brand-textMuted mb-2">
              Detalles Técnicos del Requerimiento *
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Material, dimensiones, planos de corte o requerimientos de soldadura..."
              className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors"
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
              <Plus className="w-3.5 h-3.5" />
              <span>{loading ? "Guardando..." : "Registrar Lead"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
