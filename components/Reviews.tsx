export default function Reviews() {
  return (
    <section className="py-24 bg-[#F7F2EB]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center">
          <p className="uppercase tracking-[5px] text-amber-700 font-semibold">
            Reader Reviews
          </p>

          <h2 className="text-5xl font-bold mt-4 text-[#1F2D3D]">
            What Readers Are Saying
          </h2>

          <p className="mt-6 text-gray-600">
            Reviews will appear here after the book launches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {["Reader One", "Reader Two", "Reader Three"].map((reader) => (
            <div
              key={reader}
              className="bg-white rounded-2xl shadow-md p-8"
            >
              <div className="text-amber-500 text-2xl">
                ★★★★★
              </div>

              <p className="mt-6 text-gray-600 leading-8">
                This section will showcase authentic reviews from readers
                once the book has been released.
              </p>

              <h3 className="mt-8 font-bold">
                {reader}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}