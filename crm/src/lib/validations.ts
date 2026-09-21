import { z } from "zod";

export const LeadStatusEnum = z.enum(["nuevo", "evaluacion", "descartado"]);

export const CreateLeadSchema = z.object({
  client: z.string().min(1, "El nombre de cliente es obligatorio").optional().or(z.literal("")),
  email: z.string().email("Correo electrónico no válido"),
  phone: z.string().min(6, "Teléfono no válido"),
  message: z.string().min(3, "El mensaje técnico debe tener al menos 3 caracteres"),
  status: LeadStatusEnum.default("nuevo"),
});

export const UpdateLeadStatusSchema = z.object({
  id: z.string(),
  status: LeadStatusEnum,
});

export const ProjectStatusEnum = z.enum(["oficina_tecnica", "taller", "facturado"]);

export const CreateProjectSchema = z.object({
  title: z.string().min(1, "El título del proyecto es obligatorio"),
  client: z.string().min(1, "El cliente es obligatorio").optional(),
  status: ProjectStatusEnum.default("oficina_tecnica"),
  leadId: z.string().optional(),
});

export const UpdateProjectStatusSchema = z.object({
  id: z.string(),
  status: ProjectStatusEnum,
});

export const CreateQuoteSchema = z.object({
  projectId: z.string().min(1, "ID de proyecto obligatorio"),
  amount: z.coerce.number().positive("El importe debe ser mayor que 0"),
  steelKg: z.coerce.number().nonnegative("Los kilos de acero deben ser 0 o superior"),
  estimatedHours: z.coerce.number().nonnegative("Las horas estimadas deben ser 0 o superior"),
});

export type CreateLeadInput = z.infer<typeof CreateLeadSchema>;
export type UpdateLeadStatusInput = z.infer<typeof UpdateLeadStatusSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectStatusInput = z.infer<typeof UpdateProjectStatusSchema>;
export type CreateQuoteInput = z.infer<typeof CreateQuoteSchema>;
