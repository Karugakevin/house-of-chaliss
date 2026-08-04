"use server";

import { revalidatePath } from "next/cache";
import supabaseAdmin from "@/lib/supabase-admin";

export async function updateBook(formData: FormData) {

  const id = formData.get("id") as string;

  const title = formData.get("title") as string;

  const subtitle = formData.get("subtitle") as string;

  const author = formData.get("author") as string;

  const description =
    formData.get("description") as string;

  const price = Number(
    formData.get("price")
  );

  const published =
    formData.get("published") === "true";

  const { error } =
    await supabaseAdmin
      .from("books")
      .update({
        title,
        subtitle,
        author,
        description,
        price,
        published,
      })
      .eq("id", id);

  if (error) {

    throw new Error(error.message);

  }

  revalidatePath("/admin/books");

  revalidatePath(`/admin/books/${id}`);

}