export default function FAQ() {
  const faqs = [
    {
      q: "How will I receive the book?",
      a: "Immediately after payment you will receive access to download the eBook."
    },
    {
      q: "What format is the book?",
      a: "PDF. EPUB support will be added later."
    },
    {
      q: "Can I read it on my phone?",
      a: "Yes. The PDF works on Android, iPhone, tablets and computers."
    },
    {
      q: "How much does it cost?",
      a: "KES 650."
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-[#1F2D3D]">
          Frequently Asked Questions
        </h2>

        <div className="mt-16 space-y-6">

          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="border rounded-xl p-6"
            >
              <h3 className="text-xl font-bold">
                {faq.q}
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                {faq.a}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}