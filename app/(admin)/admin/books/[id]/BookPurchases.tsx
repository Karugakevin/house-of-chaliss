import Link from "next/link";

interface Purchase {
  id: string;
  customer_id: string;
  amount: number;
  payment_status: string;
  purchased_at: string;
}

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface BookPurchasesProps {
  purchases: Purchase[];
  customers: Customer[];
}

export default function BookPurchases({
  purchases,
  customers,
}: BookPurchasesProps) {

  return (

    <div className="bg-white rounded-2xl shadow p-8">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-2xl font-semibold">
          Purchase History
        </h2>

        <span className="text-gray-500">
          {purchases.length} Purchase{purchases.length !== 1 ? "s" : ""}
        </span>

      </div>

      {purchases.length === 0 ? (

        <div className="py-12 text-center text-gray-500">

          No purchases have been made for this book yet.

        </div>

      ) : (

        <div className="overflow-hidden rounded-xl border">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-5 py-4 text-left">
                  Customer
                </th>

                <th className="px-5 py-4 text-left">
                  Email
                </th>

                <th className="px-5 py-4 text-center">
                  Amount
                </th>

                <th className="px-5 py-4 text-center">
                  Status
                </th>

                <th className="px-5 py-4 text-center">
                  Purchased
                </th>

                <th className="px-5 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {purchases.map((purchase) => {

                const customer =
                  customers.find(
                    c => c.id === purchase.customer_id
                  );

                return (

                  <tr
                    key={purchase.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-5 py-5">

                      <div className="font-semibold">

                        {customer
                          ? `${customer.first_name} ${customer.last_name}`
                          : "Unknown Customer"}

                      </div>

                    </td>

                    <td className="px-5 py-5 text-gray-600">

                      {customer?.email ?? "-"}

                    </td>

                    <td className="px-5 py-5 text-center font-semibold text-green-700">

                      KES {purchase.amount.toLocaleString()}

                    </td>

                    <td className="px-5 py-5 text-center">

                      <StatusBadge
                        status={purchase.payment_status}
                      />

                    </td>

                    <td className="px-5 py-5 text-center">

                      {new Date(
                        purchase.purchased_at
                      ).toLocaleDateString()}

                    </td>

                    <td className="px-5 py-5 text-center">

                      <Link
                        href={`/admin/purchases/${purchase.id}`}
                        className="inline-block rounded-lg bg-amber-700 hover:bg-amber-800 px-4 py-2 text-white transition"
                      >
                        View Purchase
                      </Link>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({
  status,
}: StatusBadgeProps) {

  const value = status.toLowerCase();

  let classes =
    "inline-flex rounded-full px-3 py-1 text-sm font-semibold ";

  switch (value) {

    case "paid":
      classes +=
        "bg-green-100 text-green-700";
      break;

    case "pending":
      classes +=
        "bg-yellow-100 text-yellow-700";
      break;

    case "failed":
      classes +=
        "bg-red-100 text-red-700";
      break;

    case "processing":
      classes +=
        "bg-blue-100 text-blue-700";
      break;

    default:
      classes +=
        "bg-gray-100 text-gray-700";

  }

  return (
    <span className={classes}>
      {status}
    </span>
  );

}