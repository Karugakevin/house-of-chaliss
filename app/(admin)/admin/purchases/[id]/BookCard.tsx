interface Book {
  id: string;
  title: string;
  subtitle: string | null;
  author: string;
  price: number;
  cover: string | null;
}

interface BookCardProps {
  book: Book | null;
}

export default function BookCard({
  book,
}: BookCardProps) {
  if (!book) {
    return (
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-xl font-semibold mb-6">
          Book
        </h2>

        <p className="text-gray-500">
          Book information unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-semibold mb-8">
        Book
      </h2>

      <div className="flex gap-8">

        <div className="w-44 flex-shrink-0">

          {book.cover ? (

            <img
              src={book.cover}
              alt={book.title}
              className="rounded-xl shadow border w-full"
            />

          ) : (

            <div className="w-full h-64 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
              No Cover
            </div>

          )}

        </div>

        <div className="grid md:grid-cols-2 gap-6 flex-1">

          <div>

            <p className="text-sm uppercase tracking-wide text-gray-500">
              Title
            </p>

            <p className="font-semibold text-lg mt-1">
              {book.title}
            </p>

          </div>

          <div>

            <p className="text-sm uppercase tracking-wide text-gray-500">
              Subtitle
            </p>

            <p className="mt-1">
              {book.subtitle ?? "-"}
            </p>

          </div>

          <div>

            <p className="text-sm uppercase tracking-wide text-gray-500">
              Author
            </p>

            <p className="mt-1">
              {book.author}
            </p>

          </div>

          <div>

            <p className="text-sm uppercase tracking-wide text-gray-500">
              Price
            </p>

            <p className="font-semibold text-green-700 mt-1">
              KES {book.price}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}