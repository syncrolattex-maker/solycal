import { NextRequest, NextResponse } from "next/server";
import { CreateProjectSchema, UpdateProjectStatusSchema } from "@/lib/validations";
import { getProjects, createProject, updateProjectStatus, updateLeadStatus } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects, {
      status: 200,
      headers: noCacheHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener proyectos", details: String(error) },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos de proyecto no válidos",
          issues: parsed.error.format(),
        },
        { status: 400, headers: noCacheHeaders }
      );
    }

    const project = await createProject({
      title: parsed.data.title,
      client: parsed.data.client,
      status: parsed.data.status,
    });

    // If converted from a lead, mark the lead as "evaluacion"
    if (parsed.data.leadId) {
      await updateLeadStatus(parsed.data.leadId, "evaluacion");
    }

    return NextResponse.json(
      { message: "Lead convertido a Proyecto", project },
      { status: 201, headers: noCacheHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor", details: String(error) },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = UpdateProjectStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos no válidos",
          issues: parsed.error.format(),
        },
        { status: 400, headers: noCacheHeaders }
      );
    }

    const project = await updateProjectStatus(parsed.data.id, parsed.data.status);
    if (!project) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404, headers: noCacheHeaders }
      );
    }

    return NextResponse.json(
      { message: "Estado de proyecto actualizado", project },
      { status: 200, headers: noCacheHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor", details: String(error) },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
