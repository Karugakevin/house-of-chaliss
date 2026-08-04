interface BookProfileProps {
  book: {
    id: string;
    title: string;
    subtitle: string | null;
    author: string;
    description: string | null;
    cover: string | null;
    price: number;
    published: boolean;
    created_at: string;
  };
}

export default function BookProfile({
  book,
}: BookProfileProps) {

  return (

    <div className="bg-white rounded-2xl shadow p-8">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-2xl font-semibold">
          Book Information
        </h2>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            book.published
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {book.published ? "Published" : "Draft"}
        </span>

      </div>

      <div className="flex gap-10">

        {/* Cover */}

        <div className="flex-shrink-0">

          {book.cover ? (

            <img
              src={book.cover}
              alt={book.title}
              className="w-52 rounded-xl border shadow"
            />

          ) : (

            <div className="w-52 h-72 rounded-xl border bg-gray-100 flex items-center justify-center text-gray-400">
              No Cover
            </div>

          )}

        </div>

        {/* Details */}

        <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-8">

          <div>

            <p className="text-sm text-gray-500">
              Title
            </p>

            <p className="mt-1 text-xl font-semibold">
              {book.title}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Author
            </p>

            <p className="mt-1">
              {book.author}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Subtitle
            </p>

            <p className="mt-1">
              {book.subtitle ?? "—"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Price
            </p>

            <p className="mt-1 text-lg font-semibold text-green-700">
              KES {book.price}
            </p>

          </div>

          <div className="col-span-2">

            <p className="text-sm text-gray-500 mb-2">
              Description
            </p>

            <div className="rounded-xl bg-gray-50 p-5 leading-7 text-gray-700">

              {book.description
                ? book.description
                : "No description available."}

            </div>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Book ID
            </p>

            <p className="mt-1 font-mono text-sm break-all">
              {book.id}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Created
            </p>

            <p className="mt-1">
              {new Date(
                book.created_at
              ).toLocaleString()}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}