export default function Author() {
  return (
    <section id="author" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        <div className="flex justify-center">
          <div className="w-80 h-80 rounded-full bg-gray-200 flex items-center justify-center shadow-xl">
            <span className="text-gray-500 text-lg">
              Author Photo
            </span>
          </div>
        </div>

        <div>

          <p className="uppercase tracking-[5px] text-amber-700 font-semibold">
            Meet the Author
          </p>

          <h2 className="text-5xl font-bold mt-4 text-[#1F2D3D]">
            Kevo
          </h2>

          <p className="mt-8 text-lg leading-9 text-gray-600">
            Kevo is the creator of the <strong>House of Chaliss</strong>
            series. Through compelling storytelling, memorable characters,
            and unexpected twists, he invites readers into a world where
            love, mystery and difficult choices collide.
          </p>

          <p className="mt-6 text-lg leading-9 text-gray-600">
            <em>Experience of Being Kevo</em> is the first book in a
            five-book series that explores identity, relationships,
            resilience and the consequences of every decision.
          </p>

          <a
            href="/books/book-1"
            className="inline-block mt-10 bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-xl font-semibold transition"
          >
            Read the First Book
          </a>

        </div>

      </div>
    </section>
  );
}