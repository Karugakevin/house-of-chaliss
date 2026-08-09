import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase-admin";
import { generateInvoice } from "@/lib/invoices/generateInvoice";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: Request,
    { params }: Props
) {
    const { id } = await params;

    const { data: purchase, error } =
        await supabaseAdmin
            .from("purchases")
            .select(`
                *,
                customers(*),
                books(*)
            `)
            .eq("id", id)
            .single();

    if (error || !purchase) {
        return NextResponse.json(
            {
                error: "Purchase not found",
            },
            {
                status: 404,
            }
        );
    }

    const pdf = await generateInvoice({
        invoiceId:
            purchase.invoice_id ??
            purchase.id.slice(0, 8),

        customerName:
            purchase.customers?.name ??
            "Unknown Customer",

        customerEmail:
            purchase.customers?.email ??
            "",

        bookTitle:
            purchase.books?.title ??
            "Book",

        amount: purchase.amount,

        currency:
            purchase.currency ??
            "KES",

        transactionId:
            purchase.transaction_id ??
            "-",

        paymentStatus:
            purchase.payment_status ??
            "Unknown",

        purchaseDate: new Date(
            purchase.purchased_at
        ).toLocaleDateString(),
    });

    return new NextResponse(pdf, {
        headers: {
            "Content-Type":
                "application/pdf",

            "Content-Disposition":
                `attachment; filename="Invoice-${purchase.invoice_id ?? purchase.id}.pdf"`,
        },
    });
}