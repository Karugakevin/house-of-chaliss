import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-14 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Ready to Begin the Journey?
        </h2>

        <p className="mt-5 text-base md:text-lg leading-7 md:leading-8 text-gray-300 max-w-3xl mx-auto">
          House of Chaliss is a story of love, mystery, betrayal and
          unforgettable choices. Get your copy today and discover why
          readers won't want to put it down.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">

          <Link
            href="/checkout/house-of-chaliss"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 px-7 sm:px-8 py-3.5 rounded-xl text-base md:text-lg font-semibold transition"
          >
            Buy Now – KES 650
          </Link>

          <Link
            href="/books/house-of-chaliss"
            className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-[#1F2D3D] px-7 sm:px-8 py-3.5 rounded-xl text-base md:text-lg font-semibold transition"
          >
            Learn More
          </Link>

        </div>

      </div>
    </section>
  );
}