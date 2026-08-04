import Link from "next/link";
import { Book } from "../data/books";
import PriceTag from "./PriceTag";
import PrimaryButton from "./PrimaryButton";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-2 transition duration-300">

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

        <p className="mt-6 text-gray-600 leading-7">
          {book.description || "More details coming soon."}
        </p>

        <div className="mt-8 flex justify-between items-center">

          <PriceTag price={book.price} />

          {book.available ? (
            <PrimaryButton href={`/books/${book.id}`}>
              View Book
            </PrimaryButton>
          ) : (
            <span className="text-gray-500 font-semibold">
              Coming Soon
            </span>
          )}

        </div>

      </div>

    </div>
  );
}