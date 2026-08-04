import Link from "next/link";

interface Props {
  books: any[];
  purchases: any[];
}

export default function TopSellingBooks({
  books,
  purchases,
}: Props) {
  const topBooks = books
    .map((book) => {
      const sales = purchases.filter(
        (purchase) => purchase.book_id === book.id
      );

      const revenue = sales.reduce(
        (sum, purchase) => sum + purchase.amount,
        0
      );

      return {
        ...book,
        sales: sales.length,
        revenue,
      };
    })
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold">
          Top Selling Books
        </h2>

        <Link
          href="/admin/books"
          className="text-amber-700 hover:underline font-medium"
        >
          View All →
        </Link>

      </div>

      <table className="w-full">

        <thead className="border-b">

          <tr>

            <th className="text-left py-3">
              Book
            </th>

            <th className="text-center py-3">
              Sales
            </th>

            <th className="text-right py-3">
              Revenue
            </th>

          </tr>

        </thead>

        <tbody>

          {topBooks.map((book) => (

            <tr
              key={book.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-4">

                <div className="font-semibold">
                  {book.title}
                </div>

                <div className="text-sm text-gray-500">
                  {book.author}
                </div>

              </td>

              <td className="text-center">
                {book.sales}
              </td>

              <td className="text-right font-semibold text-green-700">
                KES {book.revenue.toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}