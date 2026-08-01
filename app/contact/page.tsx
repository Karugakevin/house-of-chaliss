import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F2EB]">

        {/* Hero */}
        <section className="bg-[#1F2D3D] text-white py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <p className="uppercase tracking-[5px] text-amber-400 font-semibold">
              Contact
            </p>

            <h1 className="text-6xl font-bold mt-4">
              Get in Touch
            </h1>

            <p className="mt-8 text-xl text-gray-300 leading-9">
              Have a question about the book, your order, or future releases?
              I'd love to hear from you.
            </p>

          </div>
        </section>

        {/* Contact Information */}
        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-16">

            {/* Left Side */}
            <div>

              <h2 className="text-4xl font-bold text-[#1F2D3D]">
                Contact Information
              </h2>

              <p className="mt-8 text-lg leading-8 text-gray-700">
                Feel free to reach out for book inquiries, speaking
                opportunities, interviews, collaborations, or support.
              </p>

              <div className="mt-12 space-y-8">

                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold text-xl">
                    📧 Email
                  </h3>

                  <p className="mt-3 text-gray-600">
                    hello@houseofchaliss.com
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold text-xl">
                    📍 Location
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Nakuru, Kenya
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold text-xl">
                    📚 Book
                  </h3>

                  <p className="mt-3 text-gray-600">
                    House of Chaliss: Book One – Experience of Being Kevo
                  </p>
                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="bg-white rounded-3xl shadow-xl p-10">

              <h2 className="text-3xl font-bold">
                Send a Message
              </h2>

              <form className="mt-10 space-y-6">

                <div>
                  <label className="block mb-2 font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white py-4 rounded-xl text-lg font-semibold transition"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}