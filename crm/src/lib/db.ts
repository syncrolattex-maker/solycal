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

// In-memory persistent state during server runtime (fallback if PostgreSQL is unmigrated/unreachable)
const memoryStore = {
  leads: [
    {
      id: "lead-1",
      client: "ArcelorMittal Sagunto",
      email: "oficina.compras@arcelormittal.com",
      phone: "+34 962 698 100",
      message: "Solicitud de oferta para 4 virolas cilíndricas en acero S275JR de 2.200mm de diámetro y espesor 15mm con biselado según norma EN-ISO 9606.",
      status: "nuevo" as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    {
      id: "lead-2",
      client: "Tubos Reunidos S.A.",
      email: "mantenimiento@tubosreunidos.es",
      phone: "+34 945 890 200",
      message: "Fabricación de tolva de descarga para clínker según plano TK-402 en chapa antidesgaste Hardox 450 espesor 12mm.",
      status: "evaluacion" as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
      id: "lead-3",
      client: "Cerámica La Plana",
      email: "planta@ceramicalaplana.es",
      phone: "+34 964 521 300",
      message: "Reparación y encamisado de eje motriz y bastidor en taller.",
      status: "descartado" as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
  ] as LeadRecord[],

  projects: [
    {
      id: "prj-101",
      title: "Tolva de descarga 4.5m³ AISI 304L",
      client: "Celsa Group",
      status: "oficina_tecnica" as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      quotes: [
        {
          id: "qt-1",
          projectId: "prj-101",
          amount: 18450,
          steelKg: 3200,
          estimatedHours: 120,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
        },
      ],
    },
    {
      id: "prj-102",
      title: "Conjunto 2 colectores vapor DN600 P265GH",
      client: "Iberdrola Generación",
      status: "taller" as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      quotes: [
        {
          id: "qt-2",
          projectId: "prj-102",
          amount: 34200,
          steelKg: 5800,
          estimatedHours: 240,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 96),
        },
      ],
    },
    {
      id: "prj-103",
      title: "Pasarela industrial en celosía UNE-EN 1090",
      client: "Fertiberia Sagunto",
      status: "facturado" as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 200),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      quotes: [
        {
          id: "qt-3",
          projectId: "prj-103",
          amount: 26800,
          steelKg: 4600,
          estimatedHours: 160,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 180),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 180),
        },
      ],
    },
  ] as ProjectRecord[],
};

// Data access with Prisma primary, falling back to memoryStore
export async function getLeads(): Promise<LeadRecord[]> {
  try {
    const list = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return list as LeadRecord[];
  } catch {
    return memoryStore.leads.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export async function createLead(data: {
  client?: string | null;
  email: string;
  phone: string;
  message: string;
  status?: "nuevo" | "evaluacion" | "descartado";
}): Promise<LeadRecord> {
  const status = data.status || "nuevo";
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
  } catch {
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
    memoryStore.leads.unshift(newLead);
    return newLead;
  }
}

export async function updateLeadStatus(
  id: string,
  status: "nuevo" | "evaluacion" | "descartado"
): Promise<LeadRecord | null> {
  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: { status },
    });
    return lead as LeadRecord;
  } catch {
    const target = memoryStore.leads.find((l) => l.id === id);
    if (!target) return null;
    target.status = status;
    target.updatedAt = new Date();
    return target;
  }
}

export async function getProjects(): Promise<ProjectRecord[]> {
  try {
    const projects = await prisma.project.findMany({
      include: { quotes: true },
      orderBy: { updatedAt: "desc" },
    });
    return projects as ProjectRecord[];
  } catch {
    return memoryStore.projects.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }
}

export async function createProject(data: {
  title: string;
  client?: string | null;
  status?: "oficina_tecnica" | "taller" | "facturado";
}): Promise<ProjectRecord> {
  const status = data.status || "oficina_tecnica";
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
  } catch {
    const newProject: ProjectRecord = {
      id: `prj-${Date.now().toString(36)}`,
      title: data.title,
      client: data.client || null,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
      quotes: [],
    };
    memoryStore.projects.unshift(newProject);
    return newProject;
  }
}

export async function updateProjectStatus(
  id: string,
  status: "oficina_tecnica" | "taller" | "facturado"
): Promise<ProjectRecord | null> {
  try {
    const project = await prisma.project.update({
      where: { id },
      data: { status },
      include: { quotes: true },
    });
    return project as ProjectRecord;
  } catch {
    const target = memoryStore.projects.find((p) => p.id === id);
    if (!target) return null;
    target.status = status;
    target.updatedAt = new Date();
    return target;
  }
}

export async function createQuote(data: {
  projectId: string;
  amount: number;
  steelKg: number;
  estimatedHours: number;
}): Promise<QuoteRecord> {
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
  } catch {
    const newQuote: QuoteRecord = {
      id: `qt-${Date.now().toString(36)}`,
      projectId: data.projectId,
      amount: data.amount,
      steelKg: data.steelKg,
      estimatedHours: data.estimatedHours,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const project = memoryStore.projects.find((p) => p.id === data.projectId);
    if (project) {
      project.quotes.push(newQuote);
      project.updatedAt = new Date();
    }
    return newQuote;
  }
}
