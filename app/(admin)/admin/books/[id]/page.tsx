import { notFound } from "next/navigation";
import supabaseAdmin from "@/lib/supabase-admin";

import BookProfile from "./BookProfile";
import BookStats from "./BookStats";
import BookPurchases from "./BookPurchases";
import EditBookForm from "./EditBookForm";
import CoverUploader from "./CoverUploader";
import UploadPdf from "./UploadPdf";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookDetailsPage({
  params,
}: PageProps) {

  const { id } = await params;

  const supabase = supabaseAdmin;

  // Book

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (!book) {
    notFound();
  }

  // Purchases

  const { data: purchases } = await supabase
    .from("purchases")
    .select("*")
    .eq("book_id", id)
    .order("purchased_at", {
      ascending: false,
    });

  // Customers

  const { data: customers } = await supabase
    .from("customers")
    .select("*");

  // Download Tokens

  const { data: downloadTokens } = await supabase
    .from("download_tokens")
    .select("*");

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#1F2D3D]">
          Book Details
        </h1>

        <p className="text-gray-500 mt-2">
          View sales, downloads and manage this book.
        </p>

      </div>

      <BookProfile
        book={book}
      />

      <BookStats
        book={book}
        purchases={purchases ?? []}
        downloadTokens={downloadTokens ?? []}
      />

      <BookPurchases
        purchases={purchases ?? []}
        customers={customers ?? []}
      />
      <EditBookForm
        book={book}
      />

      <UploadPdf
        id={book.id}
        pdfUrl={book.pdf_url}
      />
      
      <CoverUploader
        bookId={book.id}
        currentCover={book.cover}
       />

    </div>

  );

}