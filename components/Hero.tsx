import { books } from "../data/books";
import PrimaryButton from "./PrimaryButton";
import PriceTag from "./PriceTag";

export default function Hero() {
  const featuredBook = books.find((book) => book.available);

  if (!featuredBook) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

      <div>

        <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
          NOW AVAILABLE
        </span>

        <h1 className="text-6xl md:text-7xl font-extrabold mt-6 leading-tight">
          {featuredBook.title}
        </h1>

        <h2 className="text-3xl mt-4 text-gray-700">
          {featuredBook.subtitle}
        </h2>

        <p className="mt-8 text-lg leading-8 text-gray-600">
          {featuredBook.description}
        </p>

        <div className="flex flex-wrap gap-4 mt-10">

          <PrimaryButton href={`/books/${featuredBook.id}`}>
            Buy Now
          </PrimaryButton>

          <a
            href="/books"
            className="inline-flex items-center justify-center border-2 border-amber-700 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-xl font-semibold transition"
          >
            View All Books
          </a>

        </div>

        <div className="mt-12 flex flex-wrap gap-10">

          <div>
            <h3 className="text-2xl font-bold">
              {featuredBook.genre.length}
            </h3>
            <p className="text-gray-600">
              Genres
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              {featuredBook.ageRating}
            </h3>
            <p className="text-gray-600">
              Age Rating
            </p>
          </div>

          <div>
            <PriceTag price={featuredBook.price} />
            <p className="text-gray-600">
              eBook
            </p>
          </div>

        </div>

      </div>

      <div className="flex justify-center">

        <img
          src={featuredBook.cover}
          alt={featuredBook.title}
          className="w-[380px] rounded-2xl shadow-2xl hover:scale-105 transition duration-300"
        />

      </div>

    </section>
  );
}