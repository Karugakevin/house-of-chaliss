import { NextRequest, NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
    try {

        const apiRef =
            req.nextUrl.searchParams.get("api_ref");

        if (!apiRef) {

            return NextResponse.json(
                {
                    status: "missing",
                },
                {
                    status: 400,
                }
            );

        }

        const {
            data: purchase,
            error,
        } = await supabaseAdmin
            .from("purchases")
            .select("*")
            .eq("api_ref", apiRef)
            .maybeSingle();

        if (error || !purchase) {

            return NextResponse.json(
                {
                    status: "not_found",
                },
                {
                    status: 404,
                }
            );

        }

        console.log("Current Purchase Status:", purchase.payment_status);

        return NextResponse.json({
            status: purchase.payment_status,
            invoice_id: purchase.invoice_id,
            transaction_id: purchase.transaction_id,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                status: "error",
            },
            {
                status: 500,
            }
        );

    }
}