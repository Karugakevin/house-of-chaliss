import Link from "next/link";
import supabaseAdmin from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const { data: books, error } = await supabaseAdmin
    .from("books")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load books:", error);

    return (
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <p className="uppercase tracking-widest text-red-700 font-semibold">
            House of Chaliss
          </p>

          <h1 className="text-4xl font-bold mt-4">
            Unable to Load Books
          </h1>

          <p className="mt-6 text-gray-600">
            We are currently unable to load the book catalogue.
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="uppercase tracking-widest text-amber-700 font-semibold">
          House of Chaliss
        </p>

        <h1 className="text-5xl font-bold mt-4">
          The Complete Series
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Follow the House of Chaliss journey as the story unfolds
          across the series.
        </p>
      </div>

      {/* Books */}
      {books && books.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300"
            >
              {/* Cover */}
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={`${book.title} - ${book.subtitle ?? "House of Chaliss"}`}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Cover Available
                </div>
              )}

              <div className="p-6">
                {/* Availability */}
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                  Available Now
                </span>

                {/* Title */}
                <h2 className="text-2xl font-bold mt-4">
                  {book.title}
                </h2>

                {/* Subtitle */}
                {book.subtitle && (
                  <p className="text-gray-600">
                    {book.subtitle}
                  </p>
                )}

                {/* Details */}
                <div className="mt-5 space-y-2 text-sm text-gray-700">
                  {book.author && (
                    <p>
                      <strong>Author:</strong> {book.author}
                    </p>
                  )}

                  {book.genre && (
                    <p>
                      <strong>Genres:</strong>{" "}
                      {Array.isArray(book.genre)
                        ? book.genre.join(", ")
                        : book.genre}
                    </p>
                  )}

                  {book.age_rating && (
                    <p>
                      <strong>Age Rating:</strong> {book.age_rating}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="mt-6">
                  <span className="text-3xl font-bold text-amber-700">
                    KES {Number(book.price).toLocaleString()}
                  </span>
                </div>

                {/* Description */}
                {book.description && (
                  <p className="mt-6 text-gray-600 leading-7">
                    {book.description}
                  </p>
                )}

                {/* View Details */}
                <Link
                  href={`/books/${book.slug}`}
                  className="block mt-8 text-center bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-700">
            No books available yet
          </h2>

          <p className="mt-4 text-gray-500">
            New books will appear here when they are published.
          </p>
        </div>
      )}
    </main>
  );
}