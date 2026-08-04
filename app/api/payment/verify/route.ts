import { NextRequest, NextResponse } from "next/server";
import IntaSend from "intasend-node";

const intasend = new IntaSend(
  process.env.INTASEND_PUBLISHABLE_KEY!,
  process.env.INTASEND_SECRET_KEY!,
  true // true = sandbox, false = production
);

export async function GET(req: NextRequest) {
  try {
    const invoiceId = req.nextUrl.searchParams.get("invoice_id");

    if (!invoiceId) {
      return NextResponse.json(
        { message: "invoice_id is required" },
        { status: 400 }
      );
    }

    const response = await intasend.collection().status(invoiceId);

    return NextResponse.json(response);

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}