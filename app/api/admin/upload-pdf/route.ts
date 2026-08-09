import { NextRequest, NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File | null;
        const bookId = formData.get("bookId") as string | null;

        if (!file || !bookId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "PDF file and book ID are required.",
                },
                { status: 400 }
            );
        }

        if (file.type !== "application/pdf") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Only PDF files are allowed.",
                },
                { status: 400 }
            );
        }

        // Make sure the book exists
        const {
            data: book,
            error: bookError,
        } = await supabaseAdmin
            .from("books")
            .select("id")
            .eq("id", bookId)
            .single();

        if (bookError || !book) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found.",
                },
                { status: 404 }
            );
        }

        // Storage path
        const filePath = `books/${bookId}.pdf`;

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload using SERVICE ROLE
        const {
            error: uploadError,
        } = await supabaseAdmin.storage
            .from("ebooks")
            .upload(filePath, buffer, {
                upsert: true,
                contentType: "application/pdf",
            });

        if (uploadError) {
            console.error("PDF Upload Error:", uploadError);

            return NextResponse.json(
                {
                    success: false,
                    message: uploadError.message,
                },
                { status: 500 }
            );
        }

        // Save Storage path in books table
        const {
            error: databaseError,
        } = await supabaseAdmin
            .from("books")
            .update({
                pdf_url: filePath,
            })
            .eq("id", bookId);

        if (databaseError) {
            console.error(
                "Database Update Error:",
                databaseError
            );

            return NextResponse.json(
                {
                    success: false,
                    message: databaseError.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "PDF uploaded successfully.",
            pdf_url: filePath,
        });

    } catch (error) {
        console.error("PDF Upload Error:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown server error.",
            },
            { status: 500 }
        );
    }
}