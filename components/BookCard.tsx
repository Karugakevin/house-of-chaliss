import Link from "next/link";
import { Book } from "../data/books";
import PriceTag from "./PriceTag";
import PrimaryButton from "./PrimaryButton";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">

      <div className="bg-red-600 text-white text-4xl p-6">
        THIS IS BOOKCARD
      </div>

      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-[450px] object-cover"
      />

      <div className="p-8">

        <p className="uppercase tracking-[3px] text-amber-700 font-semibold">
          {book.available ? "Now Available" : "Coming Soon"}
        </p>

        <h3 className="text-3xl font-bold mt-3">
          {book.title}
        </h3>

        <p className="text-lg text-gray-600 mt-2">
          {book.subtitle}
        </p>

        {/* Author */}

        <p className="mt-4 text-gray-700">
          <span className="font-semibold">Author:</span>{" "}
          {book.author}
        </p>

        {/* Genres */}

        <p className="mt-3 text-gray-700">
          <span className="font-semibold">Genres:</span>{" "}
          {book.genre.join(", ")}
        </p>

        {/* Age Rating */}

        <p className="mt-3 text-gray-700">
          <span className="font-semibold">Age Rating:</span>{" "}
          {book.ageRating}
        </p>

        <p className="mt-6 text-gray-600 leading-7">
          {book.description || "More details coming soon."}
        </p>

        <div className="mt-8 flex justify-between items-center">

          <PriceTag price={book.price} />

          {book.available ? (
            <PrimaryButton href={`/books/${book.slug}`}>
              View Book
            </PrimaryButton>
          ) : (
            <span className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 font-semibold">
              Coming Soon
            </span>
          )}

        </div>

      </div>

    </div>
  );
}