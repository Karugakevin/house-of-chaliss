import { notFound } from "next/navigation";
import supabaseAdmin from "@/lib/supabase-admin";
import CustomerCard from "./CustomerCard";
import BookCard from "./BookCard";
import PaymentCard from "./PaymentCard";
import DownloadCard from "./DownloadCard";
import AdminActions from "./AdminActions";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PurchaseDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = supabaseAdmin;

  // Get the purchase
  const { data: purchase, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !purchase) {
    notFound();
  }

  // Get the customer
  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", purchase.customer_id)
    .single();

  // Get the book
  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", purchase.book_id)
    .single();

  // Get the download token
  const { data: downloadToken } = await supabase
    .from("download_tokens")
    .select("*")
    .eq("purchase_id", purchase.id)
    .single();

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#1F2D3D]">
          Purchase Details
        </h1>

        <p className="text-gray-500 mt-2">
          View purchase information and manage downloads.
        </p>

      </div>

      {/* Customer Card */}

      <CustomerCard
        customer={customer}
      />

      {/* Book Card */}

      <BookCard
        book={book}
      />

      {/* Payment Card */}

      <PaymentCard
        purchase={purchase}
      />

      {/* Download Card */}

      <DownloadCard
        token={downloadToken}
      />

      {/* Actions Card */}

      <AdminActions
        purchaseId={purchase.id}
        downloadToken={downloadToken?.token ?? null}
      />

    </div>
  );
}