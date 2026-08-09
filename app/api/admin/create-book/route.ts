import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import supabaseAdmin from "@/lib/supabase-admin";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = String(formData.get("title") || "").trim();
    const subtitle = String(formData.get("subtitle") || "").trim();
    const author = String(formData.get("author") || "").trim();
    const description = String(
      formData.get("description") || ""
    ).trim();

    const price = Number(formData.get("price"));

    const published =
      formData.get("published") === "on";

    if (!title) {
      return NextResponse.json(
        { error: "Book title is required." },
        { status: 400 }
      );
    }

    if (!author) {
      return NextResponse.json(
        { error: "Author is required." },
        { status: 400 }
      );
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        { error: "Please enter a valid price." },
        { status: 400 }
      );
    }

    const slug = createSlug(title);

    // Check for an existing slug
    const { data: existingBook, error: slugError } =
      await supabaseAdmin
        .from("books")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

    if (slugError) {
      console.error("SLUG CHECK ERROR:", slugError);

      return NextResponse.json(
        {
          error: slugError.message,
        },
        { status: 500 }
      );
    }

    if (existingBook) {
      return NextResponse.json(
        {
          error:
            "A book with this title already exists.",
        },
        { status: 409 }
      );
    }

    // Create the book ID
    const id = randomUUID();

    const { data, error } = await supabaseAdmin
      .from("books")
      .insert({
        id,
        title,
        slug,
        subtitle: subtitle || null,
        author,
        description: description || null,
        price,
        published,
      })
      .select()
      .single();

    if (error) {
      console.error("CREATE BOOK ERROR:", error);

      return NextResponse.json(
        {
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      book: data,
    });
  } catch (error) {
    console.error("CREATE BOOK EXCEPTION:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}