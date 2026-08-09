import Link from "next/link";

const faqs = [
  {
    question: "How will I receive my book?",
    answer:
      "Immediately after successful M-Pesa payment, you'll receive a secure download link. A copy of the download information will also be sent to your email address.",
  },
  {
    question: "Can I read it on my phone?",
    answer:
      "Yes. The eBook is provided as a PDF and works on phones, tablets, laptops and desktop computers.",
  },
  {
    question: "How long is my download link valid?",
    answer:
      "Your secure download link is valid for 24 hours from the time it is issued after successful payment.",
  },
  {
    question: "How many times can I download the book?",
    answer:
      "Each purchase allows up to 3 downloads within the 24-hour validity period of your download link.",
  },
  {
    question: "What happens if my download link expires?",
    answer:
      "Once the 24-hour period has ended, the original download link will no longer work. If you experienced a genuine technical problem accessing your purchase, please contact support and we'll help you.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Digital purchases are generally non-refundable once the download has been made available. However, we may consider a refund where a verified technical problem prevents you from accessing your purchased eBook and we are unable to resolve the issue.",
  },
  {
    question: "When will the other books be released?",
    answer:
      "Book One is available now. Books Two to Six will be released progressively as the House of Chaliss story unfolds.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* FAQ CONTENT */}

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* LEFT */}

          <div>
            <p className="uppercase tracking-[3px] sm:tracking-[4px] text-amber-700 font-semibold text-sm">
              FAQ
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2D3D] mt-3 sm:mt-4 leading-tight">
              Everything You Need to Know
            </h2>

            <p className="mt-4 sm:mt-5 text-gray-600 leading-7 sm:leading-8">
              Buying your next favourite book should be simple.
              Here are answers to the questions readers ask most.
            </p>

            {/* HELP BOX */}

            <div className="mt-6 sm:mt-8 rounded-2xl bg-[#F7F2EB] p-5 sm:p-6">

              <h3 className="font-bold text-[#1F2D3D]">
                Need Help?
              </h3>

              <p className="text-gray-600 mt-2 sm:mt-3 leading-7">
                We're happy to help if you experience any issues
                with your purchase or download.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center mt-4 sm:mt-5 text-amber-700 font-semibold hover:underline"
              >
                Contact Support →
              </Link>

            </div>
          </div>

          {/* RIGHT — FAQ ACCORDION */}

          <div className="lg:col-span-2 space-y-3 sm:space-y-4">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden group"
              >

                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 sm:p-6 min-h-[72px]">

                  <h3 className="font-semibold text-base sm:text-lg text-[#1F2D3D] leading-6">
                    {faq.question}
                  </h3>

                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-700 text-xl group-open:rotate-45 transition duration-300">
                    +
                  </span>

                </summary>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6">

                  <p className="text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
                    {faq.answer}
                  </p>

                </div>

              </details>
            ))}

          </div>

        </div>

        {/* TRUST BAR */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">

          <div className="text-center rounded-2xl p-4 sm:p-5">
            <div className="text-3xl">🔒</div>

            <p className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base">
              Secure Payment
            </p>
          </div>

          <div className="text-center rounded-2xl p-4 sm:p-5">
            <div className="text-3xl">⚡</div>

            <p className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base">
              Instant Download
            </p>
          </div>

          <div className="text-center rounded-2xl p-4 sm:p-5">
            <div className="text-3xl">📱</div>

            <p className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base">
              Read Anywhere
            </p>
          </div>

          <div className="text-center rounded-2xl p-4 sm:p-5">
            <div className="text-3xl">⏱️</div>

            <p className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base">
              24-Hour Download
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}