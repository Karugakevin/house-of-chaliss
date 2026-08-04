import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { sendPurchaseEmail } from "@/lib/sendPurchaseEmail";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  
  if (error) {
    return error;
  }
  try {
    const body = await req.json();
    const { purchaseId } = body;

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
    const { data: purchase, error: purchaseError } = await supabase
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

    if (purchase.payment_status !== "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "Only paid purchases can receive a new download link.",
        },
        {
          status: 400,
        }
      );
    }

    // Create a brand-new token
    const newToken = uuidv4();

    // New expiry (24 hours)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Check if a token already exists
    const { data: existingToken } = await supabase
      .from("download_tokens")
      .select("*")
      .eq("purchase_id", purchase.id)
      .maybeSingle();

    if (existingToken) {
      // Replace existing token
      const { error: updateError } = await supabase
        .from("download_tokens")
        .update({
          token: newToken,
          downloads: 0,
          expires_at: expiresAt.toISOString(),
        })
        .eq("id", existingToken.id);

      if (updateError) {
        throw updateError;
      }
    } else {
      // Create new token
      const { error: insertError } = await supabase
        .from("download_tokens")
        .insert({
          purchase_id: purchase.id,
          token: newToken,
          downloads: 0,
          expires_at: expiresAt.toISOString(),
        });

      if (insertError) {
        throw insertError;
      }
    }

    // Send customer the fresh download link
    if (purchase.email) {
      await sendPurchaseEmail({
        firstName: purchase.first_name || "Reader",
        email: purchase.email,
        token: newToken,
      });
    }

    // Update purchase
    await supabase
      .from("purchases")
      .update({
        email_sent: true,
      })
      .eq("id", purchase.id);

    return NextResponse.json({
      success: true,
      message: "A new download link has been generated and emailed.",
      token: newToken,
      expires_at: expiresAt.toISOString(),
      download_url: `${process.env.NEXT_PUBLIC_SITE_URL}/download/${newToken}`,
    });

  } catch (error) {
    console.error("Generate Token Error:", error);

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