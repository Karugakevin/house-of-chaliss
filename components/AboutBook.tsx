export default function AboutBook() {
  return (
    <section
      id="about"
      className="py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center">
          <p className="uppercase tracking-[5px] text-amber-700 font-semibold">
            About the Book
          </p>

          <h2 className="text-5xl font-bold mt-4 text-[#1F2D3D]">
            Every Secret Has a Price
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg leading-9 text-gray-600">
            <strong>House of Chaliss: Book One – Experience of Being Kevo</strong>
            is a gripping blend of romance, mystery, suspense and emotional
            drama. As Kevo navigates friendship, love and betrayal, every
            decision brings him closer to truths that will change his life
            forever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-20">

          <div className="bg-[#F7F2EB] rounded-2xl p-10 shadow-sm">
            <h3 className="text-3xl font-bold text-[#1F2D3D]">
              What You'll Experience
            </h3>

            <ul className="mt-8 space-y-4 text-lg text-gray-700">
              <li>✓ Unexpected plot twists</li>
              <li>✓ Romance that feels real</li>
              <li>✓ Emotional character growth</li>
              <li>✓ Secrets waiting to be uncovered</li>
              <li>✓ A story that stays with you</li>
            </ul>
          </div>

          <div className="bg-[#1F2D3D] text-white rounded-2xl p-10">
            <h3 className="text-3xl font-bold">
              Book Information
            </h3>

            <div className="mt-8 space-y-5 text-lg">

              <div className="flex justify-between border-b border-gray-600 pb-3">
                <span>Author</span>
                <strong>Kevo</strong>
              </div>

              <div className="flex justify-between border-b border-gray-600 pb-3">
                <span>Genre</span>
                <strong>Romance • Mystery</strong>
              </div>

              <div className="flex justify-between border-b border-gray-600 pb-3">
                <span>Age Rating</span>
                <strong>18+</strong>
              </div>

              <div className="flex justify-between border-b border-gray-600 pb-3">
                <span>Format</span>
                <strong>PDF eBook</strong>
              </div>

              <div className="flex justify-between">
                <span>Price</span>
                <strong className="text-amber-400">
                  KES 650
                </strong>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}