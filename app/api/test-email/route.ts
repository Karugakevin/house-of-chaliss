import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendEmail";

export async function GET() {
    await sendEmail({
        to: "karugakevin@gmail.com",
        subject: "House of Chaliss Test",
        html: `
      <h1>Email system is working!</h1>

      <p>
        This is your first email sent from the bookstore.
      </p>
    `,
    });

    return NextResponse.json({
        success: true,
    });
}