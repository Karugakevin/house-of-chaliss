import supabaseAdmin from "@/lib/supabase-admin";

import PaymentStats from "./PaymentStats";
import PaymentFilters from "./PaymentFilters";
import PaymentTable from "./PaymentTable";
import ExportPaymentsButton from "./ExportPaymentsButton";

interface SearchParams {
    search?: string;
    status?: string;
}

export default async function PaymentsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;

    let query = supabaseAdmin
        .from("purchases")
        .select(`
      *,
      customers(name,email),
      books(title)
    `)
        .order("purchased_at", {
            ascending: false,
        });

    if (params.status && params.status !== "all") {
        query = query.eq(
            "payment_status",
            params.status
        );
    }

    const { data } = await query;

    const purchases = data ?? [];

    const filtered =
        params.search
            ? purchases.filter((purchase: any) => {
                const customer =
                    purchase.customers?.name ?? "";

                const email =
                    purchase.customers?.email ?? "";

                const book =
                    purchase.books?.title ?? "";

                return (
                    customer
                        .toLowerCase()
                        .includes(
                            params.search!.toLowerCase()
                        ) ||
                    email
                        .toLowerCase()
                        .includes(
                            params.search!.toLowerCase()
                        ) ||
                    book
                        .toLowerCase()
                        .includes(
                            params.search!.toLowerCase()
                        ) ||
                    purchase.transaction_id
                        ?.toLowerCase()
                        .includes(
                            params.search!.toLowerCase()
                        )
                );
            })
            : purchases;

    return (
        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold text-[#1F2D3D]">
                        Payments
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Monitor every payment made in your bookstore.
                    </p>

                </div>

                <ExportPaymentsButton
                    purchases={filtered}
                />

            </div>

            <PaymentStats
                purchases={filtered}
            />

            <PaymentFilters
                search={params.search}
                status={params.status}
            />

            <PaymentTable
                purchases={filtered}
            />

        </div>
    );
}