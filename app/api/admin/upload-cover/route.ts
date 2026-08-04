import { NextRequest, NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {

  const formData = await request.formData();

  const file = formData.get("cover") as File;
  const bookId = formData.get("bookId") as string;

  if (!file || !bookId) {

    return NextResponse.json(
      {
        error: "Missing data.",
      },
      {
        status: 400,
      }
    );

  }

  const extension =
    file.name.split(".").pop();

  const filename =
    `${bookId}.${extension}`;

  const bytes =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(bytes);

  const { error: uploadError } =
    await supabaseAdmin.storage
      .from("book-covers")
      .upload(
        filename,
        buffer,
        {
          upsert: true,
          contentType: file.type,
        }
      );

  if (uploadError) {

    return NextResponse.json(
      uploadError,
      {
        status: 500,
      }
    );

  }

  const {
    data: { publicUrl },
  } =
    supabaseAdmin.storage
      .from("book-covers")
      .getPublicUrl(filename);

  const { error: updateError } =
    await supabaseAdmin
      .from("books")
      .update({
        cover: publicUrl,
      })
      .eq("id", bookId);

  if (updateError) {

    return NextResponse.json(
      updateError,
      {
        status: 500,
      }
    );

  }

  return NextResponse.json({
    success: true,
    cover: publicUrl,
  });

}