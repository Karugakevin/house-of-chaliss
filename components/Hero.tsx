import Link from "next/link";
import { books } from "@/data/books";
import PrimaryButton from "./PrimaryButton";
import PriceTag from "./PriceTag";

export default function Hero() {
  const featuredBook = books.find((book) => book.available);

  if (!featuredBook) return null;

  return (
    <section className="bg-[#F7F2EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-14 items-center">

          {/* LEFT */}
          <div className="text-center lg:text-left">

            <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-4 py-2 text-xs sm:text-sm font-semibold">
              ● Available Now
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] text-[#1F2D3D]">
              {featuredBook.title}
            </h1>

            <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl text-gray-600">
              {featuredBook.subtitle}
            </h2>

            <p className="mt-5 sm:mt-6 text-base md:text-lg leading-7 md:leading-8 text-gray-700 max-w-xl mx-auto lg:mx-0">
              {featuredBook.description}
            </p>

            {/* Quick Benefits */}
            <div className="mt-6 space-y-2 text-sm sm:text-base text-gray-700">
              <p>✓ Instant PDF Download</p>
              <p>✓ Secure M-Pesa Checkout</p>
              <p>✓ Lifetime Access</p>
            </div>

            {/* Price */}
            <div className="mt-6 sm:mt-7 flex justify-center lg:justify-start">
              <PriceTag price={featuredBook.price} />
            </div>

            {/* Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">

              <PrimaryButton href={`/checkout/${featuredBook.slug}`}>
                Buy Now
              </PrimaryButton>

              <Link
                href="/books"
                className="inline-flex items-center justify-center border-2 border-[#1F2D3D] text-[#1F2D3D] px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                View All Books
              </Link>

            </div>

          </div>

          {/* RIGHT — HERO IMAGE */}
          <div className="flex justify-center lg:justify-end mt-2 lg:mt-0">

            <img
              src={featuredBook.heroImage || featuredBook.cover}
              alt={`${featuredBook.title} - House of Chaliss Book One`}
              className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[560px] h-auto rounded-2xl sm:rounded-3xl shadow-2xl hover:scale-[1.02] transition duration-300"
            />

          </div>

        </div>
      </div>
    </section>
  );
}