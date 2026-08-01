export default function WhyRead() {
  const reasons = [
    {
      title: "Romance",
      text: "A heartfelt story exploring love, trust and relationships."
    },
    {
      title: "Mystery",
      text: "Every chapter reveals clues that keep you turning the pages."
    },
    {
      title: "Thriller",
      text: "Unexpected twists and suspense make the journey unforgettable."
    },
    {
      title: "Series Begins",
      text: "Book One introduces a world that continues through five books."
    }
  ];

  return (
    <section className="py-24 bg-[#F7F2EB]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#1F2D3D]">
            Why Readers Will Love This Book
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            More than just a novel, House of Chaliss takes readers on an emotional journey filled with suspense, relationships and life-changing decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-2xl font-bold text-[#1F2D3D]">
                {reason.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {reason.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}