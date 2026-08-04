import Link from "next/link";
import supabase from "@/lib/supabase";

type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

type Book = {
  id: string;
  title: string;
  subtitle: string | null;
  author: string;
  price: number;
  cover: string | null;
};

type DownloadToken = {
  id: string;
  purchase_id: string;
  token: string;
  downloads: number;
  expires_at: string;
};

type Purchase = {
  id: string;
  customer_id: string;
  book_id: string;
  amount: number;
  payment_status: string;
  transaction_id: string | null;
  download_token: string | null;
  purchased_at: string;
  api_ref: string;
  invoice_id: string | null;
  failed_reason: string | null;
  email_sent: boolean;
};

export default async function PurchasesPage() {

  const { data: purchases, error: purchasesError } =
    await supabase
      .from("purchases")
      .select("*")
      .order("purchased_at", {
        ascending: false,
      });

  const { data: customers } =
    await supabase
      .from("customers")
      .select("*");

  const { data: books } =
    await supabase
      .from("books")
      .select("*");

  const { data: downloadTokens } =
    await supabase
      .from("download_tokens")
      .select("*");

  if (purchasesError) {
    return (
      <div className="p-10">

        <h1 className="text-3xl font-bold text-red-600">
          Unable to load purchases
        </h1>

        <pre className="mt-6">
          {JSON.stringify(
            purchasesError,
            null,
            2
          )}
        </pre>

      </div>
    );
  }

  const purchaseRows = (purchases ?? []).map(
    (purchase: Purchase) => {

      const customer = (customers ?? []).find(
        (customer: Customer) =>
          customer.id === purchase.customer_id
      );

      const book = (books ?? []).find(
        (book: Book) =>
          book.id === purchase.book_id
      );

      const token = (downloadTokens ?? []).find(
        (token: DownloadToken) =>
          token.purchase_id === purchase.id
      );

      return {
        purchase,
        customer,
        book,
        token,
      };
    }
  );

    return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#1F2D3D]">
            Purchases
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage every purchase made in your bookstore.
          </p>

        </div>

        <div className="bg-amber-100 text-amber-900 px-5 py-3 rounded-lg font-medium">
          Total Purchases: {purchaseRows.length}
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Customer
              </th>

              <th className="px-5 py-4 text-left">
                Book
              </th>

              <th className="px-5 py-4 text-left">
                Amount
              </th>

              <th className="px-5 py-4 text-left">
                Status
              </th>

              <th className="px-5 py-4 text-left">
                Downloads
              </th>

              <th className="px-5 py-4 text-left">
                Purchased
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {purchaseRows.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-12 text-gray-500"
                >
                  No purchases found.
                </td>

              </tr>

            )}

            {purchaseRows.map(
              ({
                purchase,
                customer,
                book,
                token,
              }) => {

                const downloadsUsed =
                  token?.downloads ?? 0;

                const downloadsRemaining =
                  Math.max(
                    0,
                    3 - downloadsUsed
                  );

                return (

                  <tr
                    key={purchase.id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="px-5 py-5">

                      <div className="font-semibold">
                        {customer
                          ? `${customer.first_name} ${customer.last_name}`
                          : "Unknown Customer"}
                      </div>

                      <div className="text-sm text-gray-500 mt-1">
                        {customer?.email}
                      </div>

                      <div className="text-sm text-gray-400">
                        {customer?.phone}
                      </div>

                    </td>

                    <td className="px-5 py-5">

                      <div className="font-semibold">
                        {book?.title ?? "-"}
                      </div>

                      <div className="text-sm text-gray-500">
                        {book?.author}
                      </div>

                    </td>

                    <td className="px-5 py-5 font-semibold">
                      KES {purchase.amount}
                    </td>

                    <td className="px-5 py-5">

                      <StatusBadge
                        status={purchase.payment_status}
                      />

                    </td>

                    <td className="px-5 py-5">

                      <div className="font-medium">
                        {downloadsUsed} / 3
                      </div>

                      <div className="text-sm text-gray-500">
                        Remaining:
                        {" "}
                        {downloadsRemaining}
                      </div>

                    </td>

                    <td className="px-5 py-5">

                      {new Date(
                        purchase.purchased_at
                      ).toLocaleString()}

                    </td>

                    <td className="px-5 py-5 text-center">

                      <Link
                        href={`/admin/purchases/${purchase.id}`}
                        className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-lg font-medium transition"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                );

              }
            )}

          </tbody>

        </table>

      </div>
          </div>
  );
}

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({
  status,
}: StatusBadgeProps) {

  let classes =
    "px-3 py-1 rounded-full text-sm font-semibold";

  switch (status.toLowerCase()) {

    case "paid":
      classes +=
        " bg-green-100 text-green-700";
      break;

    case "pending":
      classes +=
        " bg-orange-100 text-orange-700";
      break;

    case "processing":
      classes +=
        " bg-yellow-100 text-yellow-700";
      break;

    case "retry":
      classes +=
        " bg-purple-100 text-purple-700";
      break;

    case "failed":
      classes +=
        " bg-red-100 text-red-700";
      break;

    default:
      classes +=
        " bg-gray-100 text-gray-700";
  }

  return (
    <span className={classes}>
      {status.charAt(0).toUpperCase() +
        status.slice(1)}
    </span>
  );
}