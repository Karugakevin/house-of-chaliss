import Link from "next/link";
import supabaseAdmin from "@/lib/supabase-admin";
import PublishToggle from "./PublishToggle";

type Book = {
  id: string;
  title: string;
  subtitle: string | null;
  author: string;
  price: number;
  cover: string | null;
  published: boolean;
  created_at: string;
};

type Purchase = {
  id: string;
  book_id: string;
  amount: number;
};

export default async function BooksPage() {
  const supabase = supabaseAdmin;

  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600">
          Unable to load books
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

  const rows = (books ?? []).map((book: Book) => {
    const sales = (purchases ?? []).filter(
      (purchase: Purchase) => purchase.book_id === book.id
    );

    const revenue = sales.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    return {
      book,
      sales: sales.length,
      revenue,
    };
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1F2D3D]">
            Books
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your bookstore catalogue.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-amber-100 text-amber-900 rounded-lg px-5 py-3 font-medium">
            Total Books: {rows.length}
          </div>

          <Link
            href="/admin/books/new"
            className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg font-medium"
          >
            + Add Book
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-4 text-left">
                Cover
              </th>

              <th className="px-5 py-4 text-left">
                Book
              </th>

              <th className="px-5 py-4 text-center">
                Price
              </th>

              <th className="px-5 py-4 text-center">
                Sales
              </th>

              <th className="px-5 py-4 text-center">
                Revenue
              </th>

              <th className="px-5 py-4 text-center">
                Status
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
                  colSpan={7}
                  className="py-12 text-center text-gray-500"
                >
                  No books found.
                </td>
              </tr>
            )}

            {rows.map(({ book, sales, revenue }) => (
              <tr
                key={book.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-5 py-5">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-14 h-20 rounded object-cover border"
                    />
                  ) : (
                    <div className="w-14 h-20 rounded border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                      No Cover
                    </div>
                  )}
                </td>

                <td className="px-5 py-5">
                  <div className="font-semibold">
                    {book.title}
                  </div>

                  {book.subtitle && (
                    <div className="text-sm text-gray-500">
                      {book.subtitle}
                    </div>
                  )}

                  <div className="text-sm text-gray-400 mt-1">
                    {book.author}
                  </div>
                </td>

                <td className="text-center font-semibold">
                  KES {book.price}
                </td>

                <td className="text-center">
                  {sales}
                </td>

                <td className="text-center font-semibold text-green-700">
                  KES {revenue}
                </td>

                <td className="text-center">
                  {book.published ? (
                    <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
                      Published
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
                      Draft
                    </span>
                  )}
                </td>

                <td className="px-5 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/admin/books/${book.id}`}
                      className="bg-amber-700 hover:bg-amber-800 text-white rounded-lg px-4 py-2"
                    >
                      View
                    </Link>

                    <PublishToggle
                      id={book.id}
                      published={book.published}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}