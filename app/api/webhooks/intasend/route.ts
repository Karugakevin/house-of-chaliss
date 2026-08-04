import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { sendPurchaseEmail } from "@/lib/sendPurchaseEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("========== INTASEND WEBHOOK ==========");
    console.log(body);
    console.log("======================================");

    const {
      api_ref,
      invoice_id,
      state,
      failed_reason,
      value,
    } = body;

    // Find purchase
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .select("*")
      .eq("api_ref", api_ref)
      .single();

    if (purchaseError || !purchase) {
      console.error("Purchase not found.");

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

    switch (state) {
      case "PENDING":
        await supabase
          .from("purchases")
          .update({
            payment_status: "pending",
            invoice_id,
          })
          .eq("id", purchase.id);

        console.log("🕒 Payment pending...");
        break;

      case "PROCESSING":
        await supabase
          .from("purchases")
          .update({
            payment_status: "processing",
            invoice_id,
          })
          .eq("id", purchase.id);

        console.log("⏳ Payment processing...");
        break;

      case "FAILED":
        await supabase
          .from("purchases")
          .update({
            payment_status: "failed",
            invoice_id,
            failed_reason,
          })
          .eq("id", purchase.id);

        console.log("❌ Payment failed.");
        break;

      case "RETRY":
        await supabase
          .from("purchases")
          .update({
            payment_status: "retry",
            invoice_id,
            failed_reason,
          })
          .eq("id", purchase.id);

        console.log("🔄 Retry requested.");
        break;

      case "COMPLETE": {
        // Update purchase
        await supabase
          .from("purchases")
          .update({
            payment_status: "paid",
            invoice_id,
            amount: Number(value),
          })
          .eq("id", purchase.id);

        // Refresh purchase (gets latest email_sent value)
        const { data: latestPurchase } = await supabase
          .from("purchases")
          .select("*")
          .eq("id", purchase.id)
          .single();

        // Create download token if needed
        const { data: existingToken } = await supabase
          .from("download_tokens")
          .select("*")
          .eq("purchase_id", purchase.id)
          .maybeSingle();

        let token = existingToken?.token;

        if (!existingToken) {
          token = uuidv4();

          const expiresAt = new Date();
          expiresAt.setHours(expiresAt.getHours() + 24);

          const { error: tokenError } = await supabase
            .from("download_tokens")
            .insert({
              purchase_id: purchase.id,
              token,
              downloads: 0,
              expires_at: expiresAt.toISOString(),
            });

          if (tokenError) {
            console.error("Token creation failed:", tokenError);
          } else {
            console.log("✅ Download token created.");
          }
        }

        // Send email only once
        if (!latestPurchase?.email_sent) {
          const { data: customer } = await supabase
            .from("customers")
            .select("first_name,email")
            .eq("id", purchase.customer_id)
            .single();

          if (customer?.email && token) {
            try {
              await sendPurchaseEmail({
                firstName: customer.first_name,
                email: customer.email,
                token,
              });

              await supabase
                .from("purchases")
                .update({
                  email_sent: true,
                })
                .eq("id", purchase.id);

              console.log("📧 Purchase email sent.");
            } catch (err) {
              console.error("Email failed:", err);
            }
          }
        } else {
          console.log("📧 Email already sent. Skipping.");
        }

        console.log("✅ Payment completed.");
        break;
      }

      default:
        console.log(`Unhandled state: ${state}`);
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}