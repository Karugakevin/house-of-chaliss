import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import supabaseAdmin from "@/lib/supabase-admin";
import { collection } from "@/lib/intasend";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { bookId, name, email, phone } = body;

        console.log("Incoming checkout:", body);

        if (!bookId || !name || !email || !phone) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields.",
                },
                {
                    status: 400,
                }
            );
        }

        // ---------------------------------------------------
        // FIND CUSTOMER
        // ---------------------------------------------------

        const {
            data: customers,
            error: customerError,
        } = await supabaseAdmin
            .from("customers")
            .select("*")
            .eq("email", email)
            .order("created_at", { ascending: true });

        if (customerError) {
            console.error(customerError);

            return NextResponse.json(
                {
                    success: false,
                    message: customerError.message,
                },
                {
                    status: 500,
                }
            );
        }

        let customer = customers?.[0] ?? null;

        // ---------------------------------------------------
        // CREATE CUSTOMER
        // ---------------------------------------------------

        if (!customer) {
            const parts = name.trim().split(" ");

            const firstName = parts.shift() ?? "";

            const lastName = parts.join(" ");

            const {
                data: insertedCustomers,
                error: insertCustomerError,
            } = await supabaseAdmin
                .from("customers")
                .insert({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    phone,
                })
                .select();

            if (insertCustomerError) {
                console.error(insertCustomerError);

                return NextResponse.json(
                    {
                        success: false,
                        message: insertCustomerError.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            customer = insertedCustomers?.[0];
        }

        console.log("Customer:", customer);

        // ---------------------------------------------------
        // FIND BOOK
        // ---------------------------------------------------

        const {
            data: books,
            error: bookError,
        } = await supabaseAdmin
            .from("books")
            .select("*")
            .eq("id", bookId);

        if (bookError) {
            console.error(bookError);

            return NextResponse.json(
                {
                    success: false,
                    message: bookError.message,
                },
                {
                    status: 500,
                }
            );
        }

        const book = books?.[0];

        if (!book) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found.",
                },
                {
                    status: 404,
                }
            );
        }

        console.log("Book:", book);

        // ---------------------------------------------------
        // CREATE PURCHASE
        // ---------------------------------------------------

        const apiRef = crypto.randomUUID();

        const downloadToken = crypto.randomUUID();

        const {
            data: purchases,
            error: purchaseError,
        } = await supabaseAdmin
            .from("purchases")
            .insert({
                customer_id: customer.id,
                book_id: book.id,
                amount: book.price,
                currency: book.currency ?? "KES",
                payment_status: "pending",
                api_ref: apiRef,
                transaction_id: null,
                invoice_id: null,
                download_token: downloadToken,
                email_sent: false,
                failed_reason: null,
            })
            .select();

        if (purchaseError) {
            console.error(purchaseError);

            return NextResponse.json(
                {
                    success: false,
                    message: purchaseError.message,
                },
                {
                    status: 500,
                }
            );
        }

        const purchase = purchases?.[0];

        console.log("Purchase created:", purchase);

        // ---------------------------------------------------
        // INTASEND STK PUSH
        // ---------------------------------------------------

        const paymentResponse = await collection.mpesaStkPush({
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone_number: customer.phone,
            amount: book.price,
            host:
                process.env.NEXT_PUBLIC_SITE_URL ??
                "http://localhost:3000",
            api_ref: apiRef,
        });

        console.log("INTASEND RESPONSE");

        console.dir(paymentResponse, { depth: null });

        // ---------------------------------------------------
        // SAVE INTASEND REFERENCES
        // ---------------------------------------------------

        const invoiceId =
            paymentResponse?.invoice?.invoice_id ??
            paymentResponse?.invoice_id ??
            null;

        const returnedApiRef =
            paymentResponse?.invoice?.api_ref ??
            paymentResponse?.api_ref ??
            apiRef;

        const providerRef =
            paymentResponse?.invoice?.provider_ref ??
            null;

        await supabaseAdmin
            .from("purchases")
            .update({
                invoice_id: invoiceId,
                api_ref: returnedApiRef,
                transaction_id: providerRef,
            })
            .eq("id", purchase.id);

        console.log("Purchase updated with IntaSend references:");
        console.log({
            invoiceId,
            returnedApiRef,
            providerRef,
        });

        return NextResponse.json({
            success: true,
            purchase,
            payment: paymentResponse,
        });

    } catch (error) {
        console.error("CHECKOUT ERROR");

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown server error",
            },
            {
                status: 500,
            }
        );
    }
}