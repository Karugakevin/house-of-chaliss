import Link from "next/link";

export default function Author() {
  return (
    <section className="py-10 sm:py-12 md:py-14">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center mb-8 sm:mb-10 md:mb-12">

          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-amber-700 font-semibold text-xs sm:text-sm">
            Meet the Author
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2D3D] mt-3 sm:mt-4">
            The Story Behind the Story
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-7">
            Every unforgettable story begins with someone courageous enough
            to tell it.
          </p>

        </div>


        {/* Main Section */}

        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">

          {/* Photo */}

          <div className="relative flex justify-center">

            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-amber-100 blur-3xl opacity-70"></div>

            <img
              src="/author.jpg"
              alt="Kevo, author of the House of Chaliss series"
              className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] rounded-2xl sm:rounded-3xl shadow-2xl object-cover hover:-translate-y-2 transition duration-500"
            />

          </div>


          {/* Story */}

          <div className="text-center lg:text-left">

            <span className="inline-block px-4 sm:px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-xs sm:text-sm">
              Author • Storyteller
            </span>


            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-5 sm:mt-6 text-[#1F2D3D]">
              Kevo
            </h3>


            <p className="mt-5 sm:mt-6 text-lg sm:text-xl italic text-gray-600 leading-8">
              “Stories have always been the language through which I
              understand people.”
            </p>


            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-gray-700">
              Writing <strong>House of Chaliss</strong> was never simply
              about creating fictional characters... It was about creating
              people.
            </p>


            <p className="mt-5 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-gray-700">
              Every chapter carries pieces of real emotions, difficult
              conversations and quiet victories that many readers will
              recognize from their own lives.
            </p>


            <p className="mt-5 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-gray-700">
              My hope is simple: that within these pages, you'll discover
              yourself.
            </p>

          </div>

        </div>


        {/* Feature Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12 md:mt-16">

          {/* Storyteller */}

          <div className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow hover:shadow-xl transition">

            <div className="text-3xl sm:text-4xl">📖</div>

            <h4 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 text-[#1F2D3D]">
              Storyteller
            </h4>

            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-7">
              Creating emotionally authentic stories that stay with readers.
            </p>

          </div>


          {/* Human Experiences */}

          <div className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow hover:shadow-xl transition">

            <div className="text-3xl sm:text-4xl">❤️</div>

            <h4 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 text-[#1F2D3D]">
              Human Experiences
            </h4>

            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-7">
              Exploring love, identity, healing and resilience through
              fiction.
            </p>

          </div>


          {/* Kenyan Voice */}

          <div className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow hover:shadow-xl transition">

            <div className="text-3xl sm:text-4xl">🌍</div>

            <h4 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 text-[#1F2D3D]">
              Kenyan Voice
            </h4>

            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-7">
              Stories rooted in African realities with universal themes.
            </p>

          </div>


          {/* Building a Saga */}

          <div className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow hover:shadow-xl transition">

            <div className="text-3xl sm:text-4xl">✍️</div>

            <h4 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 text-[#1F2D3D]">
              Building a Saga
            </h4>

            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-7">
              Crafting the complete House of Chaliss series, one
              unforgettable story at a time.
            </p>

          </div>

        </div>


        {/* Quote */}

        <div className="mt-10 sm:mt-12 md:mt-16 text-center px-2">

          <blockquote className="text-2xl sm:text-3xl md:text-4xl italic font-light text-[#1F2D3D] leading-relaxed max-w-4xl mx-auto">
            “I don't write stories to tell people what to think.
            I write stories to help people feel.”
          </blockquote>

          <p className="mt-6 sm:mt-7 text-xl sm:text-2xl font-bold text-amber-700">
            — Kevo
          </p>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Author of the House of Chaliss Series
          </p>

        </div>


        {/* CTA */}

        <div className="text-center mt-10 sm:mt-12">

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F2D3D]">
            Begin the Journey
          </h3>

          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Discover the first chapter of the House of Chaliss saga.
          </p>

          <Link
            href="/books/house-of-chaliss"
            className="inline-flex items-center justify-center mt-5 sm:mt-6 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold transition"
          >
            Read Book One
          </Link>

        </div>

      </div>

    </section>
  );
}