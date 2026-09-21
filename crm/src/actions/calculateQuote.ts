"use server";

import { z } from "zod";

const STEEL_COST_PER_KG = 2; // 2€ / kg
const OPERATOR_HOURLY_RATE = 35; // 35€ / hora

const QuoteSchema = z.object({
  steel: z.coerce
    .number()
    .min(0, "Los kilos de acero deben ser 0 o superior"),
  hours: z.coerce
    .number()
    .min(0, "Las horas estimadas deben ser 0 o superior"),
  margin: z.coerce
    .number()
    .min(0, "El margen de beneficio debe ser 0 o superior")
    .max(1000, "Margen no válido"),
});

export interface QuoteCalculationResult {
  steel: number;
  hours: number;
  margin: number;
  steelCost: number;
  hoursCost: number;
  subtotal: number;
  marginAmount: number;
  total: number;
  error?: string;
}

export async function calculateQuote(
  _prevState: QuoteCalculationResult | null,
  formData: FormData
): Promise<QuoteCalculationResult> {
  const rawSteel = formData.get("steel");
  const rawHours = formData.get("hours");
  const rawMargin = formData.get("margin");

  const parsed = QuoteSchema.safeParse({
    steel: rawSteel,
    hours: rawHours,
    margin: rawMargin,
  });

  if (!parsed.success) {
    return {
      steel: Number(rawSteel) || 0,
      hours: Number(rawHours) || 0,
      margin: Number(rawMargin) || 0,
      steelCost: 0,
      hoursCost: 0,
      subtotal: 0,
      marginAmount: 0,
      total: 0,
      error: parsed.error.issues[0]?.message || "Datos no válidos",
    };
  }

  const { steel, hours, margin } = parsed.data;

  // Costes internos estáticos
  const steelCost = steel * STEEL_COST_PER_KG;
  const hoursCost = hours * OPERATOR_HOURLY_RATE;
  const subtotal = steelCost + hoursCost;

  // Margen industrial
  const marginAmount = subtotal * (margin / 100);
  const total = subtotal + marginAmount;

  return {
    steel,
    hours,
    margin,
    steelCost,
    hoursCost,
    subtotal,
    marginAmount,
    total,
  };
}
