export default function WhyRead() {
  const reasons = [
    {
      title: "Romance",
      text: "A heartfelt story exploring love, trust and relationships.",
    },
    {
      title: "Mystery",
      text: "Every chapter reveals clues that keep you turning the pages.",
    },
    {
      title: "Thriller",
      text: "Unexpected twists and suspense make the journey unforgettable.",
    },
    {
      title: "Series Begins",
      text: "Book One introduces a world that continues through six books.",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-14">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-amber-700 font-semibold text-xs sm:text-sm">
            Why Read
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2D3D] mt-3">
            Why Readers Will Love This Book
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-7">
            More than just a novel, House of Chaliss takes readers on an
            emotional journey filled with suspense, relationships and
            life-changing decisions.
          </p>

        </div>


        {/* Reasons */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10">

          {reasons.map((reason) => (

            <div
              key={reason.title}
              className="bg-white rounded-2xl shadow-md p-6 sm:p-7 hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1F2D3D]">
                {reason.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-7">
                {reason.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}