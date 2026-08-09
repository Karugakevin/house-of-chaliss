import Link from "next/link";

export default function AboutBook() {
  return (
    <section className="py-10 sm:py-12 md:py-14">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center mb-8 sm:mb-10 md:mb-12">

          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-amber-700 font-semibold text-xs sm:text-sm">
            Inside the Story
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2D3D] mt-3 sm:mt-4">
            House of Chaliss
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mt-2 sm:mt-3">
            Experience of Being Kevo
          </p>

        </div>


        {/* Two Columns */}

        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">

          {/* LEFT — IMAGE */}

          <div className="relative flex justify-center">

            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-amber-100 blur-3xl opacity-70"></div>

            <img
              src="/coverbook1.jpg"
              alt="House of Chaliss Book One - The Experience of Being a Kevo"
              className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] rounded-2xl sm:rounded-3xl shadow-2xl hover:-translate-y-2 transition duration-500"
            />

          </div>


          {/* RIGHT — STORY */}

          <div className="text-center lg:text-left">

            <span className="inline-block px-4 sm:px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
              Available Now
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-5 sm:mt-6 text-[#1F2D3D]">
              This is more than a novel.
            </h3>


            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-gray-700">

              Some stories entertain you.

              <br /><br />

              Some stories challenge you.

              <br /><br />

              Others stay with you long after the final page.

              <br /><br />

              <strong>House of Chaliss</strong> belongs to the last category.

            </p>


            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-gray-700">

              Explore the experiences that makes a 'Kevo' as he navigates love,
              identity, betrayal, family, ambition and the hidden wounds that
              quietly shape every decision.

              <br /><br />

              Every chapter reveals another secret.

              Every relationship carries another lesson.

              Every choice changes everything.

            </p>

          </div>

        </div>


        {/* FEATURES */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 md:mt-16">

          {[
            {
              icon: "❤️",
              title: "Emotional Storytelling",
              text: "Characters that feel wonderfully real.",
            },
            {
              icon: "🔍",
              title: "Mystery & Suspense",
              text: "Every chapter uncovers another secret.",
            },
            {
              icon: "🌱",
              title: "Personal Growth",
              text: "A journey of healing and self-discovery.",
            },
            {
              icon: "💔",
              title: "Romance",
              text: "Love that is beautiful, difficult and unforgettable.",
            },
            {
              icon: "🧠",
              title: "Thought Provoking",
              text: "Questions that remain after the final page.",
            },
            {
              icon: "📖",
              title: "Easy to Read",
              text: "Immersive writing that keeps pages turning.",
            },
          ].map((item) => (

            <div
              key={item.title}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow hover:shadow-xl transition duration-300"
            >

              <div className="text-3xl sm:text-4xl">
                {item.icon}
              </div>

              <h4 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 text-[#1F2D3D]">
                {item.title}
              </h4>

              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-7">
                {item.text}
              </p>

            </div>

          ))}

        </div>


        {/* READER PROMISE */}

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mt-10 sm:mt-12 md:mt-16 shadow-lg">

          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2D3D] mt-3">
            Why Readers Will Love This Book
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-7 sm:mt-8 text-sm sm:text-base md:text-lg text-gray-700">

            <p>✔ A story that keeps you turning pages.</p>

            <p>✔ Characters you'll genuinely care about.</p>

            <p>✔ Unexpected twists.</p>

            <p>✔ Emotional highs and heartbreaking lows.</p>

            <p>✔ Honest conversations about identity and purpose.</p>

            <p>✔ A journey you'll remember long after reading.</p>

          </div>

        </div>


        {/* QUOTE */}

        <div className="text-center mt-10 sm:mt-12 md:mt-16 px-2">

          <blockquote className="text-2xl sm:text-3xl md:text-4xl italic text-[#1F2D3D] leading-relaxed max-w-4xl mx-auto">
            “Some journeys begin with a single page. Others change your life forever.”
          </blockquote>

        </div>


        {/* CTA */}

        <div className="text-center mt-10 sm:mt-12">

          <h2>
            Ready to Begin the Journey?
          </h2>

          <Link
            href="/books/house-of-chaliss"
            className="inline-flex items-center justify-center mt-5 sm:mt-6 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-base sm:text-lg transition"
          >
            Read Book One
          </Link>

        </div>

      </div>

    </section>
  );
}