import { notFound } from "next/navigation";
import { books } from "../../../data/books";
import PriceTag from "../../../components/PriceTag";
import GenreBadge from "../../../components/GenreBadge";
import PrimaryButton from "../../../components/PrimaryButton";

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  const book = books.find((b) => b.id === id);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F2EB] py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">

        <div className="flex justify-center">
          <img
            src={book.cover}
            alt={book.title}
            className="w-[420px] rounded-2xl shadow-2xl"
          />
        </div>

        <div>

          <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">
            {book.available ? "NOW AVAILABLE" : "COMING SOON"}
          </span>

          <h1 className="text-5xl font-bold mt-6">
            {book.title}
          </h1>

          <h2 className="text-2xl text-gray-700 mt-3">
            {book.subtitle}
          </h2>

          <p className="mt-6 text-lg">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="mt-4">
            <strong>Age Rating:</strong> {book.ageRating}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {book.genre.map((genre) => (
              <GenreBadge
                key={genre}
                genre={genre}
              />
            ))}
          </div>

          <div className="mt-10">
            <PriceTag price={book.price} />
          </div>

          <div className="mt-10">
            {book.available ? (
              <PrimaryButton href="/checkout">
                Buy Now
              </PrimaryButton>
            ) : (
              <span className="text-gray-500 text-lg font-semibold">
                This book is coming soon.
              </span>
            )}
          </div>

          <div className="mt-14">
            <h3 className="text-3xl font-bold">
              About this Book
            </h3>

            <p className="mt-6 leading-8 text-gray-700">
              {book.description}
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}