import { NextRequest, NextResponse } from "next/server";
import { collection } from "../../../lib/intasend";
import supabase from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, amount } = await req.json();

    // Generate a unique reference for this payment
    const apiRef = `house-of-chaliss-${Date.now()}`;

    // Save customer
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
      })
      .select()
      .single();

    if (customerError) {
      console.error(customerError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to save customer.",
        },
        {
          status: 500,
        }
      );
    }

    // Save pending purchase
    const { error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        customer_id: customer.id,
        book_id: "book-1",
        amount,
        payment_status: "pending",
        api_ref: apiRef,
      });

    if (purchaseError) {
      console.error(purchaseError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to create purchase.",
        },
        {
          status: 500,
        }
      );
    }

    // Initiate IntaSend STK Push
    const response = await collection.mpesaStkPush({
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
      amount,
      host:
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000",
      api_ref: apiRef,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Payment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Payment failed",
      },
      {
        status: 500,
      }
    );
  }
}