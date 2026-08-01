import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AuthorPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F2EB]">

        <section className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="flex justify-center">

              <div className="bg-white rounded-3xl shadow-xl p-6">

                <img
                  src="/author.jpg"
                  alt="Author Kevo"
                  className="w-[420px] rounded-2xl"
                />

              </div>

            </div>

            <div>

              <p className="uppercase tracking-[5px] text-amber-700 font-semibold">
                Meet the Author
              </p>

              <h1 className="text-6xl font-bold mt-4 text-[#1F2D3D]">
                Kevo
              </h1>

              <p className="mt-8 text-lg leading-9 text-gray-700">
                Welcome to the world of <strong>House of Chaliss</strong>.
              </p>

              <p className="mt-6 text-lg leading-9 text-gray-700">
                Through this series, I invite readers into stories filled
                with love, mystery, difficult choices and unforgettable
                moments. Every character has a purpose, every chapter
                reveals something new, and every book takes the journey
                even further.
              </p>

              <p className="mt-6 text-lg leading-9 text-gray-700">
                <strong>Experience of Being Kevo</strong> is the beginning
                of a five-book series that explores relationships,
                identity, ambition and the consequences of the choices
                we make.
              </p>

              <div className="mt-12 flex gap-5">

                <a
                  href="/books/book-1"
                  className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-xl font-semibold"
                >
                  Read Book One
                </a>

                <a
                  href="/contact"
                  className="border-2 border-amber-700 text-amber-700 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50"
                >
                  Contact Author
                </a>

              </div>

            </div>

          </div>

          <section className="mt-32">

            <h2 className="text-4xl font-bold text-center text-[#1F2D3D]">
              Why I Write
            </h2>

            <p className="max-w-4xl mx-auto mt-10 text-center text-lg leading-9 text-gray-700">
              Stories have the power to inspire, challenge and transform.
              My goal is to create books that entertain while encouraging
              readers to reflect on relationships, choices and the
              unexpected paths life can take.
            </p>

          </section>

        </section>

      </main>

      <Footer />
    </>
  );
}