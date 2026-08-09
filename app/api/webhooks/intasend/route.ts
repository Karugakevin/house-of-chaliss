import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import supabaseAdmin from "@/lib/supabase-admin";
import { sendPurchaseEmail } from "@/lib/sendPurchaseEmail";

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    console.log("========== WEBHOOK RECEIVED ==========");
    console.dir(body, { depth: null });
    console.log("======================================");

    // Verify webhook challenge
    if (body.challenge !== process.env.INTASEND_WEBHOOK_CHALLENGE) {
      console.error("Invalid webhook challenge:", body.challenge);

      return NextResponse.json(
        {
          success: false,
          message: "Invalid webhook challenge.",
        },
        {
          status: 401,
        }
      );
    }

    const api_ref = body.api_ref;
    const invoice_id = body.invoice_id;
    const state = body.state;
    const value = body.value;
    const failed_reason = body.failed_reason;

    const transaction_id =
      body.mpesa_reference ??
      body.provider_ref ??
      null;

    //--------------------------------------------------
    // Find Purchase
    //--------------------------------------------------

    const {
      data: purchase,
      error: purchaseError,
    } = await supabaseAdmin
      .from("purchases")
      .select("*")
      .eq("api_ref", api_ref)
      .maybeSingle();

    console.log("Webhook api_ref:", api_ref);
    console.log("Purchase lookup result:", purchase);
    console.log("Purchase lookup error:", purchaseError);

    if (purchaseError || !purchase) {
      console.error("Purchase lookup failed.");
      console.error("api_ref:", api_ref);
      console.error("purchase:", purchase);
      console.error("purchaseError:", purchaseError);

      return NextResponse.json(
        {
          success: false,
          message: purchaseError?.message ?? "Purchase not found.",
        },
        {
          status: 400,
        }
      );
    }

    // Prevent duplicate processing
    if (purchase.payment_status === "paid") {
      console.log("Purchase already marked as paid.");

      return NextResponse.json({
        success: true,
      });
    }

    //--------------------------------------------------
    // PAYMENT STATES
    //--------------------------------------------------

    switch (state) {

      case "PENDING":

        await supabaseAdmin
          .from("purchases")
          .update({
            payment_status: "pending",
            invoice_id,
          })
          .eq("id", purchase.id);

        console.log("Payment Pending");

        break;

      case "PROCESSING":

        await supabaseAdmin
          .from("purchases")
          .update({
            payment_status: "processing",
            invoice_id,
          })
          .eq("id", purchase.id);

        console.log("Payment Processing");

        break;

      case "FAILED":

        await supabaseAdmin
          .from("purchases")
          .update({
            payment_status: "failed",
            invoice_id,
            failed_reason,
          })
          .eq("id", purchase.id);

        console.log("Payment Failed");

        break;

      case "RETRY":

        await supabaseAdmin
          .from("purchases")
          .update({
            payment_status: "retry",
            invoice_id,
            failed_reason,
          })
          .eq("id", purchase.id);

        console.log("Retry Requested");

        break;

      case "COMPLETE":

        //--------------------------------------------------
        // Mark Purchase Paid
        //--------------------------------------------------

        await supabaseAdmin
          .from("purchases")
          .update({
            payment_status: "paid",
            invoice_id,
            transaction_id,
            amount: Number(value),
            failed_reason: null,
          })
          .eq("id", purchase.id);

        //--------------------------------------------------
        // Refresh Purchase
        //--------------------------------------------------

        const {
          data: latestPurchase,
        } = await supabaseAdmin
          .from("purchases")
          .select("*")
          .eq("id", purchase.id)
          .single();

        //--------------------------------------------------
        // Create Download Token
        //--------------------------------------------------

        const {
          data: existingToken,
        } = await supabaseAdmin
          .from("download_tokens")
          .select("*")
          .eq("purchase_id", purchase.id)
          .maybeSingle();

        let token = existingToken?.token;

        if (!existingToken) {

          token = uuidv4();

          const expires = new Date();

          expires.setHours(expires.getHours() + 24);

          const { error: tokenError } =
            await supabaseAdmin
              .from("download_tokens")
              .insert({
                purchase_id: purchase.id,
                token,
                downloads: 0,
                expires_at: expires.toISOString(),
              });

          if (tokenError) {
            console.error(tokenError);
          } else {
            console.log("Download token created.");
          }

        }

        //--------------------------------------------------
        // Send Email Once
        //--------------------------------------------------

        if (!latestPurchase?.email_sent && token) {

          const {
            data: customer,
          } = await supabaseAdmin
            .from("customers")
            .select("first_name,email")
            .eq("id", purchase.customer_id)
            .single();

          if (customer?.email) {

            try {

              await sendPurchaseEmail({
                firstName: customer.first_name,
                email: customer.email,
                token,
              });

              await supabaseAdmin
                .from("purchases")
                .update({
                  email_sent: true,
                })
                .eq("id", purchase.id);

              console.log("Purchase Email Sent");

            } catch (err) {

              console.error("Email Error", err);

            }

          }

        } else {

          console.log("Email already sent.");

        }

        console.log("Payment Complete");

        break;

      default:

        console.log("Unhandled State:", state);

    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error("WEBHOOK ERROR");

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      {
        status: 500,
      }
    );

  }

}