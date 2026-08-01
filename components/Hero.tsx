export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
          NOW AVAILABLE
        </span>

        <h1 className="text-6xl md:text-7xl font-extrabold mt-6 leading-tight">
          House of Chaliss
        </h1>

        <h2 className="text-3xl mt-4 text-gray-700">
          Book One – Experience of Being Kevo
        </h2>

        <p className="mt-8 text-lg leading-8 text-gray-600">
          A captivating journey through love, mystery, hidden truths,
          and the defining moments that shape who we become.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/books/book-1"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-lg font-semibold transition"
          >
            Buy Now – KES 650
          </a>

          <button className="border-2 border-amber-700 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-lg font-semibold transition">
            Read Chapter One
          </button>
        </div>

        <div className="mt-10 flex gap-10">
          <div>
            <h3 className="text-2xl font-bold">4</h3>
            <p className="text-gray-600">Genres</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">18+</h3>
            <p className="text-gray-600">Age Rating</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">KES 650</h3>
            <p className="text-gray-600">eBook</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <img
          src="/cover.jpg"
          alt="House of Chaliss Book Cover"
          className="w-[380px] rounded-2xl shadow-2xl hover:scale-105 transition duration-300"
        />
      </div>
    </section>
  );
}