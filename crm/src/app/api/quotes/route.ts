import { NextRequest, NextResponse } from "next/server";
import { CreateQuoteSchema } from "@/lib/validations";
import { createQuote } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateQuoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos de cotización no válidos",
          issues: parsed.error.format(),
        },
        { status: 400, headers: noCacheHeaders }
      );
    }

    const quote = await createQuote({
      projectId: parsed.data.projectId,
      amount: parsed.data.amount,
      steelKg: parsed.data.steelKg,
      estimatedHours: parsed.data.estimatedHours,
    });

    return NextResponse.json(
      { message: "Presupuesto actualizado", quote },
      { status: 201, headers: noCacheHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor", details: String(error) },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
