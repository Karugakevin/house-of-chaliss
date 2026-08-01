export default function CTA() {
  return (
    <section className="bg-[#1F2D3D] py-24">
      <div className="max-w-5xl mx-auto px-6 text-center text-white">

        <h2 className="text-5xl font-bold">
          Ready to Begin the Journey?
        </h2>

        <p className="mt-8 text-xl leading-9 text-gray-300">
          House of Chaliss is a story of love, mystery, betrayal and
          unforgettable choices. Get your copy today and discover why
          readers won't want to put it down.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6">

          <a
            href="/books/book-1"
            className="bg-amber-600 hover:bg-amber-700 px-10 py-4 rounded-xl text-lg font-semibold transition"
          >
            Buy Now – KES 650
          </a>

          <a
            href="/books/book-1"
            className="border-2 border-white hover:bg-white hover:text-[#1F2D3D] px-10 py-4 rounded-xl text-lg font-semibold transition"
          >
            Learn More
          </a>

        </div>

      </div>
    </section>
  );
}