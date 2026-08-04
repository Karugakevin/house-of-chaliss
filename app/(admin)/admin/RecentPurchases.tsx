import Link from "next/link";

interface Props {
  purchases: any[];
  customers: any[];
  books: any[];
}

export default function RecentPurchases({
  purchases,
  customers,
  books,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold">
          Recent Purchases
        </h2>

        <Link
          href="/admin/purchases"
          className="text-amber-700 hover:underline font-medium"
        >
          View All →
        </Link>

      </div>

      <table className="w-full">

        <thead className="border-b">

          <tr>

            <th className="text-left py-3">Customer</th>

            <th className="text-left py-3">Book</th>

            <th className="text-center py-3">Amount</th>

            <th className="text-center py-3">Status</th>

            <th className="text-right py-3">Date</th>

          </tr>

        </thead>

        <tbody>

          {purchases.map((purchase) => {

            const customer = customers.find(
              (c) => c.id === purchase.customer_id
            );

            const book = books.find(
              (b) => b.id === purchase.book_id
            );

            return (

              <tr
                key={purchase.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">
                  {customer
                    ? `${customer.first_name} ${customer.last_name}`
                    : "Unknown"}
                </td>

                <td>
                  {book?.title ?? "-"}
                </td>

                <td className="text-center font-semibold">
                  KES {purchase.amount}
                </td>

                <td className="text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      purchase.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {purchase.payment_status}
                  </span>

                </td>

                <td className="text-right text-gray-500">
                  {new Date(
                    purchase.purchased_at
                  ).toLocaleDateString()}
                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}