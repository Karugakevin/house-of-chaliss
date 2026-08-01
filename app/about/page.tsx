import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F7F2EB] min-h-screen">

        <section className="max-w-6xl mx-auto px-6 py-24">

          <p className="uppercase tracking-[5px] text-amber-700 font-semibold">
            About the Book
          </p>

          <h1 className="text-6xl font-bold mt-4 text-[#1F2D3D]">
            House of Chaliss
          </h1>

          <h2 className="text-3xl mt-4 text-gray-600">
            Book One – Experience of Being Kevo
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 mt-20">

            <div>

              <img
                src="/cover.jpg"
                alt="House of Chaliss"
                className="rounded-2xl shadow-2xl"
              />

            </div>

            <div>

              <h3 className="text-3xl font-bold">
                Story Overview
              </h3>

              <p className="mt-8 leading-9 text-lg text-gray-700">
                Replace this with your official synopsis.
              </p>

              <p className="mt-6 leading-9 text-lg text-gray-700">
                This page will become the official sales page for
                House of Chaliss Book One.
              </p>

              <div className="mt-12">

                <h3 className="text-2xl font-bold">
                  Genres
                </h3>

                <div className="flex flex-wrap gap-4 mt-6">

                  <span className="bg-white px-5 py-3 rounded-full shadow">
                    Romance
                  </span>

                  <span className="bg-white px-5 py-3 rounded-full shadow">
                    Mystery
                  </span>

                  <span className="bg-white px-5 py-3 rounded-full shadow">
                    Thriller
                  </span>

                  <span className="bg-white px-5 py-3 rounded-full shadow">
                    Young Adult
                  </span>

                </div>

                <a
                  href="/checkout"
                  className="inline-block mt-12 bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-xl font-semibold"
                >
                  Buy for KES 650
                </a>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}