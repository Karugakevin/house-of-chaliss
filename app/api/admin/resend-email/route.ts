import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
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

    // Find the purchase
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

    // Only paid purchases should receive emails
    if (purchase.payment_status !== "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "Purchase has not been paid.",
        },
        {
          status: 400,
        }
      );
    }

    // Customer must have an email
    if (!purchase.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer email address is missing.",
        },
        {
          status: 400,
        }
      );
    }

    // Find download token
    const { data: tokenRecord, error: tokenError } = await supabase
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

    // Send purchase email
    await sendPurchaseEmail({
      firstName: purchase.first_name || "Reader",
      email: purchase.email,
      token: tokenRecord.token,
    });

    // Update email_sent flag
    const { error: updateError } = await supabase
      .from("purchases")
      .update({
        email_sent: true,
      })
      .eq("id", purchase.id);

    if (updateError) {
      console.error("Failed to update email_sent:", updateError);
    }

    return NextResponse.json({
      success: true,
      message: "Purchase email has been resent successfully.",
    });
  } catch (error) {
    console.error("Resend Email Error:", error);

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