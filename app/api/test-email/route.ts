import { NextResponse } from "next/server";
import { sendPurchaseEmail } from "@/lib/sendPurchaseEmail";

export async function GET() {
  try {
    await sendPurchaseEmail({
      firstName: "Kevin",
      email: "karugakevin@gmail.com",
      token: "test-download-token",
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
        error,
      },
      {
        status: 500,
      }
    );
  }
}