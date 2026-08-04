import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  // Require an authenticated admin
  const { error } = await requireAdmin();

  if (error) {
    return error;
  }

  const { purchaseId } = await request.json();

  if (!purchaseId) {
    return NextResponse.json(
      {
        error: "Missing purchaseId",
      },
      {
        status: 400,
      }
    );
  }

  const { data: token, error: tokenError } = await supabase
    .from("download_tokens")
    .select("id")
    .eq("purchase_id", purchaseId)
    .maybeSingle();

  if (tokenError) {
    return NextResponse.json(
      {
        error: tokenError.message,
      },
      {
        status: 500,
      }
    );
  }

  if (!token) {
    return NextResponse.json(
      {
        error: "Download token not found",
      },
      {
        status: 404,
      }
    );
  }

  const { error: updateError } = await supabase
    .from("download_tokens")
    .update({
      downloads: 0,
    })
    .eq("id", token.id);

  if (updateError) {
    return NextResponse.json(
      {
        error: updateError.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Download count reset successfully.",
  });
}