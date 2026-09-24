import { NextRequest, NextResponse } from "next/server";
import { CreateLeadSchema, UpdateLeadStatusSchema } from "@/lib/validations";
import { getLeads, createLead, updateLeadStatus } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Helper for CORS and no-cache headers so corporate web can send leads
function responseHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: responseHeaders(),
  });
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads, {
      status: 200,
      headers: responseHeaders(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener leads", details: String(error) },
      { status: 500, headers: responseHeaders() }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateLeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos de lead no válidos",
          issues: parsed.error.format(),
        },
        { status: 400, headers: responseHeaders() }
      );
    }

    const lead = await createLead(parsed.data);
    return NextResponse.json(
      { message: "Lead registrado", lead },
      { status: 201, headers: responseHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor", details: String(error) },
      { status: 500, headers: responseHeaders() }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = UpdateLeadStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos no válidos",
          issues: parsed.error.format(),
        },
        { status: 400, headers: responseHeaders() }
      );
    }

    const lead = await updateLeadStatus(parsed.data.id, parsed.data.status);
    if (!lead) {
      return NextResponse.json(
        { error: "Lead no encontrado" },
        { status: 404, headers: responseHeaders() }
      );
    }

    return NextResponse.json(
      { message: "Estado de lead actualizado", lead },
      { status: 200, headers: responseHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor", details: String(error) },
      { status: 500, headers: responseHeaders() }
    );
  }
}
