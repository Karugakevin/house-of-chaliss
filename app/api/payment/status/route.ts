import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const apiRef = req.nextUrl.searchParams.get("api_ref");

    if (!apiRef) {
      return NextResponse.json(
        { message: "Missing api_ref." },
        { status: 400 }
      );
    }

    // Find the purchase
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .select("id, payment_status")
      .eq("api_ref", apiRef)
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json(
        { message: "Purchase not found." },
        { status: 404 }
      );
    }

    // Payment not complete yet
    if (purchase.payment_status !== "paid") {
      return NextResponse.json({
        payment_status: purchase.payment_status,
      });
    }

    // Find the download token
    const { data: tokenRecord, error: tokenError } = await supabase
      .from("download_tokens")
      .select("token")
      .eq("purchase_id", purchase.id)
      .single();

    if (tokenError || !tokenRecord) {
      return NextResponse.json(
        { message: "Download token not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      payment_status: "paid",
      token: tokenRecord.token,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}