import { NextRequest, NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {

  const { id, published } = await request.json();

  const { error } = await supabaseAdmin
    .from("books")
    .update({
      published,
    })
    .eq("id", id);

  if (error) {

    return NextResponse.json(
      error,
      { status: 500 }
    );

  }

  return NextResponse.json({
    success: true,
  });

}