import Link from "next/link";

interface Purchase {
  id: string;
  book_id: string;
  amount: number;
  payment_status: string;
  purchased_at: string;
}

interface Book {
  id: string;
  title: string;
}

interface Props {
  purchases: Purchase[];
  books: Book[];
}

export default function PurchaseHistory({
  purchases,
  books,
}: Props) {

  return (

    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <div className="p-8 border-b">

        <h2 className="text-xl font-semibold">

          Purchase History

        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left px-5 py-4">
              Book
            </th>

            <th className="text-left px-5 py-4">
              Price
            </th>

            <th className="text-left px-5 py-4">
              Status
            </th>

            <th className="text-left px-5 py-4">
              Purchased
            </th>

            <th className="text-center px-5 py-4">
              View
            </th>

          </tr>

        </thead>

        <tbody>

          {purchases.map((purchase) => {

            const book =
              books.find(
                b => b.id === purchase.book_id
              );

            return (

              <tr
                key={purchase.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-5">

                  {book?.title ?? "-"}

                </td>

                <td className="px-5 py-5">

                  KES {purchase.amount}

                </td>

                <td className="px-5 py-5">

                  {purchase.payment_status}

                </td>

                <td className="px-5 py-5">

                  {new Date(
                    purchase.purchased_at
                  ).toLocaleDateString()}

                </td>

                <td className="text-center">

                  <Link
                    href={`/admin/purchases/${purchase.id}`}
                    className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </Link>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );

}