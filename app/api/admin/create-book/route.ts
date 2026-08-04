import { NextRequest, NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {

  const formData = await request.formData();

  const title =
    formData.get("title") as string;

  const subtitle =
    formData.get("subtitle") as string;

  const author =
    formData.get("author") as string;

  const description =
    formData.get("description") as string;

  const price =
    Number(formData.get("price"));

  const published =
    formData.get("published") === "on";

  const { error } =
    await supabaseAdmin
      .from("books")
      .insert({
        title,
        subtitle,
        author,
        description,
        price,
        published,
      });

  if (error) {

    return NextResponse.json(
      error,
      {
        status: 500,
      }
    );

  }

  return NextResponse.json({
    success: true,
  });

}