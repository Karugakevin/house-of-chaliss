import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin-auth";

const DEFAULT_EXTENSION_HOURS = 24;

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  
  if (error) {
    return error;
  }

  try {
    const body = await req.json();

    const {
      purchaseId,
      hours = DEFAULT_EXTENSION_HOURS,
    } = body;

    if (!purchaseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Purchase ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Find purchase
    const { data: purchase, error: purchaseError } =
      await supabase
        .from("purchases")
        .select("*")
        .eq("id", purchaseId)
        .single();

    if (purchaseError || !purchase) {
      return NextResponse.json(
        {
          success: false,
          message: "Purchase not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Find token
    const { data: tokenRecord, error: tokenError } =
      await supabase
        .from("download_tokens")
        .select("*")
        .eq("purchase_id", purchase.id)
        .single();

    if (tokenError || !tokenRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Download token not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Extend from whichever is later:
    // current expiry OR current time
    const base =
      new Date(tokenRecord.expires_at) > new Date()
        ? new Date(tokenRecord.expires_at)
        : new Date();

    base.setHours(base.getHours() + Number(hours));

    const { error: updateError } =
      await supabase
        .from("download_tokens")
        .update({
          expires_at: base.toISOString(),
        })
        .eq("id", tokenRecord.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      message: `Download expiry extended by ${hours} hours.`,
      expires_at: base.toISOString(),
      token: tokenRecord.token,
    });

  } catch (error) {
    console.error("Extend Expiry Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}