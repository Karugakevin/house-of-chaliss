import Link from "next/link";
import { books } from "@/data/books";

export default function BooksPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center mb-16">
        <p className="uppercase tracking-widest text-amber-700 font-semibold">
          House of Chaliss
        </p>

        <h1 className="text-5xl font-bold mt-4">
          The Complete Series
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Follow the House of Chaliss journey across five books.
          Book One is available today, while the remaining books
          are currently in production.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {books.map((book) => (

          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300"
          >

            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-96 object-cover"
            />

            <div className="p-6">

              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${book.available
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                  }`}
              >
                {book.available ? "Available Now" : "Coming Soon"}
              </span>

              <h2 className="text-2xl font-bold mt-4">
                {book.title}
              </h2>

              <p className="text-gray-600">
                {book.subtitle}
              </p>

              <div className="mt-5 space-y-2 text-sm text-gray-700">

                <p>
                  <strong>Author:</strong> {book.author}
                </p>

                <p>
                  <strong>Genres:</strong> {book.genre.join(", ")}
                </p>

                <p>
                  <strong>Age Rating:</strong> {book.ageRating}
                </p>

              </div>

              <div className="mt-6">

                <span className="text-3xl font-bold text-amber-700">
                  KES {book.price.toLocaleString()}
                </span>

              </div>

              <p className="mt-6 text-gray-600 leading-7">
                {book.description}
              </p>

              {book.available ? (

                <Link
                  href={`/books/${book.slug}`}
                  className="block mt-8 text-center bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg"
                >
                  View Details
                </Link>

              ) : (

                <button
                  disabled
                  className="block w-full mt-8 bg-gray-300 text-gray-600 py-3 rounded-lg cursor-not-allowed"
                >
                  Coming Soon
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}