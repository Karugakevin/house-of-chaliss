import Link from "next/link";
import supabaseAdmin from "@/lib/supabase-admin";
import CustomerSearch from "./CustomerSearch";
import CustomerFilters from "./CustomerFilters";

type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  created_at: string;
};

type Purchase = {
  id: string;
  customer_id: string;
  amount: number;
  book_id: string;
};

interface PageProps {
  searchParams: Promise<{
    search?: string;
    filter?: string;
  }>;
}

export default async function CustomersPage({
  searchParams,
}: PageProps) {

  const {
  search = "",
  filter = "all",
} = await searchParams;

  const supabase = supabaseAdmin;

  const { data: customers, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div className="p-10">

        <h1 className="text-red-600 text-2xl font-bold">
          Unable to load customers
        </h1>

        <pre className="mt-6">
          {JSON.stringify(error, null, 2)}
        </pre>

      </div>
    );
  }

  const { data: purchases } = await supabase
    .from("purchases")
    .select("*");

  const filteredCustomers =
  (customers ?? []).filter((customer) => {

    if (!search) return true;

    const term = search.toLowerCase();

    return (

      customer.first_name
        .toLowerCase()
        .includes(term)

      ||

      customer.last_name
        .toLowerCase()
        .includes(term)

      ||

      customer.email
        .toLowerCase()
        .includes(term)

      ||

      (customer.phone ?? "")
        .toLowerCase()
        .includes(term)

    );

  });

const customerRows = filteredCustomers.map(
  (customer: Customer) => {

    const customerPurchases =
      (purchases ?? []).filter(
        (purchase: Purchase) =>
          purchase.customer_id === customer.id
      );

    const totalSpent =
      customerPurchases.reduce(
        (sum, purchase) => sum + purchase.amount,
        0
      );

    const booksOwned =
      new Set(
        customerPurchases.map(
          purchase => purchase.book_id
        )
      ).size;

    return {
      customer,
      purchases: customerPurchases.length,
      booksOwned,
      totalSpent,
    };

  }
);

let rows = [...customerRows];

switch (filter) {

  case "paying":
    rows = rows.filter(row => row.purchases > 0);
    break;

  case "none":
    rows = rows.filter(row => row.purchases === 0);
    break;

  case "highest":
    rows.sort(
      (a, b) => b.totalSpent - a.totalSpent
    );
    break;

  case "newest":
    rows.sort(
      (a, b) =>
        new Date(b.customer.created_at).getTime() -
        new Date(a.customer.created_at).getTime()
    );
    break;

}
  return (

    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#1F2D3D]">
            Customers
          </h1>

          <p className="text-gray-500 mt-2">
            View every customer and their purchase history.
          </p>

        </div>

        <div className="bg-amber-100 text-amber-900 rounded-lg px-5 py-3 font-medium">

          Total Customers: {rows.length}

        </div>

      </div>

      <CustomerSearch />
      <CustomerFilters />

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Customer
              </th>

              <th className="px-5 py-4 text-center">
                Purchases
              </th>

              <th className="px-5 py-4 text-center">
                Books
              </th>

              <th className="px-5 py-4 text-center">
                Lifetime Value
              </th>

              <th className="px-5 py-4 text-left">
                Joined
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center text-gray-500"
                >
                  No customers found.
                </td>

              </tr>

            )}

            {rows.map(
              ({
                customer,
                purchases,
                booksOwned,
                totalSpent,
              }) => (

                <tr
                  key={customer.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-5">

                    <div className="font-semibold">

                      {customer.first_name}{" "}
                      {customer.last_name}

                    </div>

                    <div className="text-sm text-gray-500">

                      {customer.email}

                    </div>

                    <div className="text-sm text-gray-400">

                      {customer.phone}

                    </div>

                  </td>

                  <td className="text-center">

                    {purchases}

                  </td>

                  <td className="text-center">

                    {booksOwned}

                  </td>

                  <td className="text-center font-semibold text-green-700">

                    KES {totalSpent}

                  </td>

                  <td>

                    {new Date(
                      customer.created_at
                    ).toLocaleDateString()}

                  </td>

                  <td className="text-center">

                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="inline-block bg-amber-700 hover:bg-amber-800 text-white rounded-lg px-5 py-2"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}