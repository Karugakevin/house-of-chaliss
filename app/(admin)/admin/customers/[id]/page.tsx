import { notFound } from "next/navigation";
import supabaseAdmin from "@/lib/supabase-admin";

import CustomerProfile from "./CustomerProfile";
import CustomerStats from "./CustomerStats";
import PurchaseHistory from "./PurchaseHistory";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerDetailsPage({
  params,
}: PageProps) {

  const { id } = await params;

  const supabase = supabaseAdmin;

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (!customer) {
    notFound();
  }

  const { data: purchases } = await supabase
    .from("purchases")
    .select("*")
    .eq("customer_id", id)
    .order("purchased_at", {
      ascending: false,
    });

  const { data: books } = await supabase
    .from("books")
    .select("*");

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#1F2D3D]">
          Customer Details
        </h1>

        <p className="text-gray-500 mt-2">
          View customer profile, purchases and statistics.
        </p>

      </div>

      <CustomerProfile customer={customer} />

      <CustomerStats
        purchases={purchases ?? []}
      />

      <PurchaseHistory
        purchases={purchases ?? []}
        books={books ?? []}
      />

    </div>

  );

}