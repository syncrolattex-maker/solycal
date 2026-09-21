import { NextRequest, NextResponse } from "next/server";
import { CreateLeadSchema, UpdateLeadStatusSchema } from "@/lib/validations";
import { getLeads, createLead, updateLeadStatus } from "@/lib/db";

// Helper for CORS headers so corporate web can send leads
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(),
  });
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads, {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener leads", details: String(error) },
      { status: 500, headers: corsHeaders() }
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
        { status: 400, headers: corsHeaders() }
      );
    }

    const lead = await createLead(parsed.data);
    return NextResponse.json(
      { message: "Lead registrado", lead },
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor", details: String(error) },
      { status: 500, headers: corsHeaders() }
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
        { status: 400, headers: corsHeaders() }
      );
    }

    const lead = await updateLeadStatus(parsed.data.id, parsed.data.status);
    if (!lead) {
      return NextResponse.json(
        { error: "Lead no encontrado" },
        { status: 404, headers: corsHeaders() }
      );
    }

    return NextResponse.json(
      { message: "Estado de lead actualizado", lead },
      { status: 200, headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor", details: String(error) },
      { status: 500, headers: corsHeaders() }
    );
  }
}
