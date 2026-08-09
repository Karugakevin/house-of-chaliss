import Link from "next/link";

const reviews = [
  {
    name: "Sarah W.",
    rating: 5,
    review:
      "I couldn't stop reading. The characters felt incredibly real, and by the final chapter I was already waiting for Book Two.",
  },
  {
    name: "Brian K.",
    rating: 5,
    review:
      "Kevo has a unique gift for writing emotions. Every chapter made me reflect on my own life. It feels authentic from beginning to end.",
  },
  {
    name: "Mercy N.",
    rating: 5,
    review:
      "This story stays with you long after you've finished reading. It's emotional, beautifully written and impossible to put down.",
  },
];

const keywords = [
  "Emotional",
  "Captivating",
  "Authentic",
  "Thought Provoking",
  "Beautifully Written",
  "Page Turner",
  "Memorable Characters",
  "Powerful",
];

export default function Reviews() {
  return (
    <section className="bg-[#F7F2EB] py-12 md:py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-amber-700 font-semibold text-sm">
            Reader Reviews
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2D3D] mt-3">
            Readers Are Loving It
          </h2>

          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-7">
            Early readers describe <strong>House of Chaliss</strong> as
            emotional, captivating and impossible to put down.
          </p>

          <p className="mt-2 text-sm text-gray-500 italic">
            Reviews shown are from advance readers of the House of Chaliss
            manuscript.
          </p>

        </div>


        {/* Rating */}

        <div className="text-center mt-10">

          <div className="text-4xl text-amber-500 tracking-wider">
            ★★★★★
          </div>

          <h3 className="text-5xl font-bold text-[#1F2D3D] mt-2">
            4.9
          </h3>

          <p className="text-gray-600 mt-1">
            Average Reader Rating
          </p>

        </div>


        {/* Reviews */}

        <div className="grid lg:grid-cols-3 gap-6 mt-10">

          {reviews.map((review) => (

            <div
              key={review.name}
              className="bg-white rounded-3xl p-7 shadow hover:shadow-xl transition duration-300"
            >

              <div className="text-amber-500 text-xl">
                {"★★★★★"}
              </div>

              <p className="mt-4 text-gray-700 leading-7 italic">
                "{review.review}"
              </p>

              <div className="mt-6">

                <h4 className="font-bold text-[#1F2D3D]">
                  {review.name}
                </h4>

                <p className="text-green-600 text-sm font-medium mt-1">
                  Verified Early Reader
                </p>

              </div>

            </div>

          ))}

        </div>


        {/* Keywords */}

        <div className="mt-14">

          <h3 className="text-center text-2xl md:text-3xl font-bold text-[#1F2D3D]">
            What Readers Are Saying
          </h3>

          <div className="flex flex-wrap justify-center gap-3 mt-7">

            {keywords.map((word) => (

              <span
                key={word}
                className="px-4 py-2 rounded-full bg-white shadow text-gray-700 font-medium hover:bg-amber-50 transition"
              >
                {word}
              </span>

            ))}

          </div>

        </div>


        {/* CTA */}

        <div className="text-center mt-14">

          <h3 className="text-2xl md:text-3xl font-bold text-[#1F2D3D] max-w-3xl mx-auto">
            Ready to discover why readers are talking about House of Chaliss?
          </h3>

          <p className="mt-3 text-base md:text-lg text-gray-600">
            Start your journey today with Book One.
          </p>

          <Link
            href="/books/house-of-chaliss"
            className="inline-block mt-6 px-10 py-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold transition"
          >
            Read Book One
          </Link>

        </div>

      </div>

    </section>
  );
}