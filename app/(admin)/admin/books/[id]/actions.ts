"use server";

import { revalidatePath } from "next/cache";
import supabaseAdmin from "@/lib/supabase-admin";

export async function updateBook(formData: FormData) {
  const id = formData.get("id") as string;

  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const author = formData.get("author") as string;
  const description = formData.get("description") as string;

  const price = Number(formData.get("price"));

  const published =
    formData.get("published") === "true";

  const { error } = await supabaseAdmin
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
export async function uploadPdf(formData: FormData) {
  const id = formData.get("id") as string;
  const pdf = formData.get("pdf") as File;

  if (!pdf || pdf.size === 0) {
    throw new Error("No PDF selected.");
  }

  const extension = pdf.name.split(".").pop();

  const path = `books/${id}.${extension}`;

  const { error: uploadError } =
    await supabaseAdmin.storage
      .from("ebooks")
      .upload(path, pdf, {
        upsert: true,
        contentType: "application/pdf",
      });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { error } = await supabaseAdmin
    .from("books")
    .update({
      pdf_url: path,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/books");
  revalidatePath(`/admin/books/${id}`);
}