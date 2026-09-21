import { NextRequest, NextResponse } from "next/server";
import { CreateQuoteSchema } from "@/lib/validations";
import { createQuote } from "@/lib/db";

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
        { status: 400 }
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
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor", details: String(error) },
      { status: 500 }
    );
  }
}
