"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import supabaseAdmin from "@/lib/supabase-admin";
import { isAdmin } from "@/lib/is-admin";

async function requireAdmin() {
  const admin = await isAdmin();

  if (!admin) {
    throw new Error("Unauthorized");
  }
}

export async function updateBook(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const published = formData.get("published") === "true";

  if (!id) {
    throw new Error("Book ID is required.");
  }

  if (!title) {
    throw new Error("Book title is required.");
  }

  if (!author) {
    throw new Error("Author is required.");
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Invalid book price.");
  }

  const { error } = await supabaseAdmin
    .from("books")
    .update({
      title,
      subtitle: subtitle || null,
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
  revalidatePath(`/books/${id}`);
}

export async function uploadPdf(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const pdf = formData.get("pdf");

  if (!id) {
    throw new Error("Book ID is required.");
  }

  if (!(pdf instanceof File) || pdf.size === 0) {
    throw new Error("No PDF selected.");
  }

  if (pdf.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed.");
  }

  // 50 MB maximum
  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  if (pdf.size > MAX_FILE_SIZE) {
    throw new Error("PDF file must be 50 MB or smaller.");
  }

  const path = `books/${id}.pdf`;

  const { error: uploadError } = await supabaseAdmin.storage
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