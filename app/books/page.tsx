import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BooksPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F2EB]">

        <section className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-center">

            <p className="uppercase tracking-[5px] text-amber-700 font-semibold">
              The Series
            </p>

            <h1 className="text-6xl font-bold mt-4 text-[#1F2D3D]">
              House of Chaliss
            </h1>

            <p className="text-xl text-gray-600 mt-8 max-w-3xl mx-auto leading-9">
              Follow Kevo's journey across five unforgettable books.
              Begin with Book One and continue through a story filled
              with love, mystery, suspense and life-changing choices.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">

            {/* BOOK ONE */}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

              <img
                src="/cover.jpg"
                alt="Book One"
                className="w-full h-[500px] object-cover"
              />

              <div className="p-8">

                <span className="text-amber-700 font-semibold">
                  BOOK ONE
                </span>

                <h2 className="text-3xl font-bold mt-3">
                  Experience of Being Kevo
                </h2>

                <p className="mt-5 text-gray-600 leading-8">
                  Romance, mystery and unexpected twists begin here.
                </p>

                <div className="flex justify-between items-center mt-8">

                  <span className="text-2xl font-bold">
                    KES 650
                  </span>

                  <Link
                    href="/books/book-1"
                    className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg"
                  >
                    View Book
                  </Link>

                </div>

              </div>

            </div>

            {/* BOOK TWO */}

            <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-center items-center">

              <h2 className="text-3xl font-bold">
                Book Two
              </h2>

              <p className="mt-6 text-gray-600 text-center">
                Coming Soon
              </p>

            </div>

            {/* BOOK THREE */}

            <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-center items-center">

              <h2 className="text-3xl font-bold">
                Book Three
              </h2>

              <p className="mt-6 text-gray-600 text-center">
                Coming Soon
              </p>

            </div>

            {/* BOOK FOUR */}

            <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-center items-center">

              <h2 className="text-3xl font-bold">
                Book Four
              </h2>

              <p className="mt-6 text-gray-600 text-center">
                Coming Soon
              </p>

            </div>

            {/* BOOK FIVE */}

            <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-center items-center">

              <h2 className="text-3xl font-bold">
                Book Five
              </h2>

              <p className="mt-6 text-gray-600 text-center">
                Coming Soon
              </p>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}