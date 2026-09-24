import fs from "fs";
import path from "path";
import prisma from "./prisma";

export interface LeadRecord {
  id: string;
  client: string | null;
  email: string;
  phone: string;
  message: string;
  status: "nuevo" | "evaluacion" | "descartado";
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteRecord {
  id: string;
  projectId: string;
  amount: number;
  steelKg: number;
  estimatedHours: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectRecord {
  id: string;
  title: string;
  client: string | null;
  status: "oficina_tecnica" | "taller" | "facturado";
  createdAt: Date;
  updatedAt: Date;
  quotes: QuoteRecord[];
}

function getStoreFilePath(): string {
  const root = fs.existsSync(path.join(process.cwd(), "crm"))
    ? path.join(process.cwd(), "crm")
    : process.cwd();
  const dataDir = path.join(root, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "crm-store.json");
}

function isPrismaConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}

function getInitialData(): { leads: LeadRecord[]; projects: ProjectRecord[] } {
  return {
    leads: [
      {
        id: "lead-1",
        client: "ArcelorMittal Sagunto",
        email: "oficina.compras@arcelormittal.com",
        phone: "+34 962 698 100",
        message: "Solicitud de oferta para 4 virolas cilíndricas en acero S275JR de 2.200mm de diámetro y espesor 15mm con biselado según norma EN-ISO 9606.",
        status: "nuevo",
        createdAt: new Date("2026-09-24T08:30:00.000Z"),
        updatedAt: new Date("2026-09-24T08:30:00.000Z"),
      },
      {
        id: "lead-2",
        client: "Tubos Reunidos S.A.",
        email: "mantenimiento@tubosreunidos.es",
        phone: "+34 945 890 200",
        message: "Fabricación de tolva de descarga para clínker según plano TK-402 en chapa antidesgaste Hardox 450 espesor 12mm.",
        status: "evaluacion",
        createdAt: new Date("2026-09-23T10:15:00.000Z"),
        updatedAt: new Date("2026-09-23T14:20:00.000Z"),
      },
      {
        id: "lead-3",
        client: "Cerámica La Plana",
        email: "planta@ceramicalaplana.es",
        phone: "+34 964 521 300",
        message: "Reparación y encamisado de eje motriz y bastidor en taller.",
        status: "descartado",
        createdAt: new Date("2026-09-22T09:00:00.000Z"),
        updatedAt: new Date("2026-09-22T17:45:00.000Z"),
      },
    ],
    projects: [
      {
        id: "prj-101",
        title: "Tolva de descarga 4.5m³ AISI 304L",
        client: "Celsa Group",
        status: "oficina_tecnica",
        createdAt: new Date("2026-09-21T11:00:00.000Z"),
        updatedAt: new Date("2026-09-24T09:15:00.000Z"),
        quotes: [
          {
            id: "qt-1",
            projectId: "prj-101",
            amount: 18450,
            steelKg: 3200,
            estimatedHours: 120,
            createdAt: new Date("2026-09-21T12:00:00.000Z"),
            updatedAt: new Date("2026-09-21T12:00:00.000Z"),
          },
        ],
      },
      {
        id: "prj-102",
        title: "Conjunto 2 colectores vapor DN600 P265GH",
        client: "Iberdrola Generación",
        status: "taller",
        createdAt: new Date("2026-09-19T08:00:00.000Z"),
        updatedAt: new Date("2026-09-24T07:30:00.000Z"),
        quotes: [
          {
            id: "qt-2",
            projectId: "prj-102",
            amount: 34200,
            steelKg: 5800,
            estimatedHours: 240,
            createdAt: new Date("2026-09-19T10:00:00.000Z"),
            updatedAt: new Date("2026-09-19T10:00:00.000Z"),
          },
        ],
      },
      {
        id: "prj-103",
        title: "Pasarela industrial en celosía UNE-EN 1090",
        client: "Fertiberia Sagunto",
        status: "facturado",
        createdAt: new Date("2026-09-15T14:00:00.000Z"),
        updatedAt: new Date("2026-09-23T16:00:00.000Z"),
        quotes: [
          {
            id: "qt-3",
            projectId: "prj-103",
            amount: 26800,
            steelKg: 4600,
            estimatedHours: 160,
            createdAt: new Date("2026-09-16T09:00:00.000Z"),
            updatedAt: new Date("2026-09-16T09:00:00.000Z"),
          },
        ],
      },
      {
        id: "prj-104",
        title: "Virola cilíndrica Ø2.400mm L=6.000mm",
        client: "ArcelorMittal Sagunto",
        status: "oficina_tecnica",
        createdAt: new Date("2026-09-22T10:00:00.000Z"),
        updatedAt: new Date("2026-09-24T08:45:00.000Z"),
        quotes: [
          {
            id: "qt-4",
            projectId: "prj-104",
            amount: 18200,
            steelKg: 3800,
            estimatedHours: 80,
            createdAt: new Date("2026-09-22T11:00:00.000Z"),
            updatedAt: new Date("2026-09-22T11:00:00.000Z"),
          },
        ],
      },
      {
        id: "prj-105",
        title: "Depósito vertical almacenamiento 12m³",
        client: "Repsol Química",
        status: "oficina_tecnica",
        createdAt: new Date("2026-09-20T09:30:00.000Z"),
        updatedAt: new Date("2026-09-23T18:10:00.000Z"),
        quotes: [
          {
            id: "qt-5",
            projectId: "prj-105",
            amount: 32500,
            steelKg: 5400,
            estimatedHours: 140,
            createdAt: new Date("2026-09-20T10:30:00.000Z"),
            updatedAt: new Date("2026-09-20T10:30:00.000Z"),
          },
        ],
      },
      {
        id: "prj-106",
        title: "Bastidor mecano-soldado prensa 200T",
        client: "Gestamp Automoción",
        status: "taller",
        createdAt: new Date("2026-09-18T11:00:00.000Z"),
        updatedAt: new Date("2026-09-24T06:00:00.000Z"),
        quotes: [
          {
            id: "qt-6",
            projectId: "prj-106",
            amount: 41800,
            steelKg: 7600,
            estimatedHours: 190,
            createdAt: new Date("2026-09-18T13:00:00.000Z"),
            updatedAt: new Date("2026-09-18T13:00:00.000Z"),
          },
        ],
      },
    ],
  };
}

interface StoredLead {
  id: string;
  client: string | null;
  email: string;
  phone: string;
  message: string;
  status: "nuevo" | "evaluacion" | "descartado";
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface StoredQuote {
  id: string;
  projectId: string;
  amount: number;
  steelKg: number;
  estimatedHours: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface StoredProject {
  id: string;
  title: string;
  client: string | null;
  status: "oficina_tecnica" | "taller" | "facturado";
  createdAt: string | Date;
  updatedAt: string | Date;
  quotes: StoredQuote[];
}

function loadStore(): { leads: LeadRecord[]; projects: ProjectRecord[] } {
  const filePath = getStoreFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(content);
      return {
        leads: (data.leads || []).map((l: StoredLead) => ({
          ...l,
          createdAt: new Date(l.createdAt),
          updatedAt: new Date(l.updatedAt),
        })),
        projects: (data.projects || []).map((p: StoredProject) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
          quotes: (p.quotes || []).map((q: StoredQuote) => ({
            ...q,
            createdAt: new Date(q.createdAt),
            updatedAt: new Date(q.updatedAt),
          })),
        })),
      };
    }
  } catch (error) {
    console.error("Error reading CRM persistent store:", error);
  }

  const initial = getInitialData();
  saveStore(initial);
  return initial;
}

function saveStore(store: { leads: LeadRecord[]; projects: ProjectRecord[] }): void {
  const filePath = getStoreFilePath();
  try {
    const tempFile = `${filePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(store, null, 2), "utf-8");
    fs.renameSync(tempFile, filePath);
  } catch (error) {
    console.error("Error saving CRM persistent store via rename, writing directly:", error);
    try {
      fs.writeFileSync(filePath, JSON.stringify(store, null, 2), "utf-8");
    } catch (fallbackError) {
      console.error("Fallback write failed:", fallbackError);
    }
  }
}

// Data access with Prisma primary (if configured), falling back to persistent disk store
export async function getLeads(): Promise<LeadRecord[]> {
  if (isPrismaConfigured()) {
    try {
      const list = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
      });
      return list as LeadRecord[];
    } catch (err) {
      console.warn("Prisma getLeads failed, using disk store:", err);
    }
  }
  const store = loadStore();
  return store.leads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function createLead(data: {
  client?: string | null;
  email: string;
  phone: string;
  message: string;
  status?: "nuevo" | "evaluacion" | "descartado";
}): Promise<LeadRecord> {
  const status = data.status || "nuevo";
  if (isPrismaConfigured()) {
    try {
      const lead = await prisma.lead.create({
        data: {
          client: data.client || null,
          email: data.email,
          phone: data.phone,
          message: data.message,
          status,
        },
      });
      return lead as LeadRecord;
    } catch (err) {
      console.warn("Prisma createLead failed, using disk store:", err);
    }
  }

  const store = loadStore();
  const newLead: LeadRecord = {
    id: `lead-${Date.now().toString(36)}`,
    client: data.client || null,
    email: data.email,
    phone: data.phone,
    message: data.message,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  store.leads.unshift(newLead);
  saveStore(store);
  return newLead;
}

export async function updateLeadStatus(
  id: string,
  status: "nuevo" | "evaluacion" | "descartado"
): Promise<LeadRecord | null> {
  if (isPrismaConfigured()) {
    try {
      const lead = await prisma.lead.update({
        where: { id },
        data: { status },
      });
      return lead as LeadRecord;
    } catch (err) {
      console.warn("Prisma updateLeadStatus failed, using disk store:", err);
    }
  }

  const store = loadStore();
  const target = store.leads.find((l) => l.id === id);
  if (!target) return null;
  target.status = status;
  target.updatedAt = new Date();
  saveStore(store);
  return target;
}

export async function getProjects(): Promise<ProjectRecord[]> {
  if (isPrismaConfigured()) {
    try {
      const projects = await prisma.project.findMany({
        include: { quotes: true },
        orderBy: { updatedAt: "desc" },
      });
      return projects as ProjectRecord[];
    } catch (err) {
      console.warn("Prisma getProjects failed, using disk store:", err);
    }
  }

  const store = loadStore();
  return store.projects.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export async function createProject(data: {
  title: string;
  client?: string | null;
  status?: "oficina_tecnica" | "taller" | "facturado";
}): Promise<ProjectRecord> {
  const status = data.status || "oficina_tecnica";
  if (isPrismaConfigured()) {
    try {
      const project = await prisma.project.create({
        data: {
          title: data.title,
          client: data.client || null,
          status,
        },
        include: { quotes: true },
      });
      return project as ProjectRecord;
    } catch (err) {
      console.warn("Prisma createProject failed, using disk store:", err);
    }
  }

  const store = loadStore();
  const newProject: ProjectRecord = {
    id: `prj-${Date.now().toString(36)}`,
    title: data.title,
    client: data.client || null,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
    quotes: [],
  };
  store.projects.unshift(newProject);
  saveStore(store);
  return newProject;
}

export async function updateProjectStatus(
  id: string,
  status: "oficina_tecnica" | "taller" | "facturado"
): Promise<ProjectRecord | null> {
  if (isPrismaConfigured()) {
    try {
      const project = await prisma.project.update({
        where: { id },
        data: { status },
        include: { quotes: true },
      });
      return project as ProjectRecord;
    } catch (err) {
      console.warn("Prisma updateProjectStatus failed, using disk store:", err);
    }
  }

  const store = loadStore();
  const target = store.projects.find((p) => p.id === id);
  if (!target) return null;
  target.status = status;
  target.updatedAt = new Date();
  saveStore(store);
  return target;
}

export async function createQuote(data: {
  projectId: string;
  amount: number;
  steelKg: number;
  estimatedHours: number;
}): Promise<QuoteRecord> {
  if (isPrismaConfigured()) {
    try {
      const quote = await prisma.quote.create({
        data: {
          projectId: data.projectId,
          amount: data.amount,
          steelKg: data.steelKg,
          estimatedHours: data.estimatedHours,
        },
      });
      return quote as QuoteRecord;
    } catch (err) {
      console.warn("Prisma createQuote failed, using disk store:", err);
    }
  }

  const store = loadStore();
  const newQuote: QuoteRecord = {
    id: `qt-${Date.now().toString(36)}`,
    projectId: data.projectId,
    amount: data.amount,
    steelKg: data.steelKg,
    estimatedHours: data.estimatedHours,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const project = store.projects.find((p) => p.id === data.projectId);
  if (project) {
    project.quotes.push(newQuote);
    project.updatedAt = new Date();
  }
  saveStore(store);
  return newQuote;
}
