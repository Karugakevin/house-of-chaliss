import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <>
      <main className="bg-[#F7F2EB] min-h-screen">

        <section className="max-w-6xl mx-auto px-6 py-24">

          <p className="uppercase tracking-[5px] text-amber-700 font-semibold">
            Meet the Author
          </p>

          <h1 className="text-6xl font-bold mt-4 text-[#1F2D3D]">
            Kevo
          </h1>

          <div className="grid lg:grid-cols-2 gap-16 mt-20 items-center">

            <div className="flex justify-center">
              <img
                src="/author.jpg"
                alt="Kevo"
                className="w-[420px] rounded-2xl shadow-2xl"
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                About Kevo
              </h2>

              <p className="mt-8 leading-9 text-lg text-gray-700">
                Kevo is a Kenyan author passionate about telling stories that
                explore love, identity, resilience, and the hidden struggles
                that shape who we become. Through emotionally rich characters
                and gripping plots, he creates stories that stay with readers
                long after the final page.
              </p>

              <p className="mt-6 leading-9 text-lg text-gray-700">
                <strong>House of Chaliss: Book One – Experience of Being Kevo</strong>; 
                marks the beginning of a larger series that blends romance,
                mystery, suspense, and personal transformation into an
                unforgettable reading experience.
              </p>

              <p className="mt-6 leading-9 text-lg text-gray-700">
                Beyond writing, Kevo is passionate about youth empowerment,
                public participation, leadership, and inspiring meaningful
                conversations through storytelling.
              </p>

              <a
                href="/books"
                className="inline-block mt-10 bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-xl font-semibold"
              >
                Explore the Books
              </a>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}