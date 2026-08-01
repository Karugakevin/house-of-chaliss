import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F2EB]">

        {/* Hero */}
        <section className="bg-[#1F2D3D] text-white py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <p className="uppercase tracking-[5px] text-amber-400 font-semibold">
              Secure Checkout
            </p>

            <h1 className="text-5xl md:text-6xl font-bold mt-4">
              Complete Your Purchase
            </h1>

            <p className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto leading-9">
              You're just one step away from reading
              <strong> House of Chaliss: Book One – Experience of Being Kevo.</strong>
            </p>

          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-16">

            {/* LEFT */}

            <div>

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                <img
                  src="/cover.jpg"
                  alt="House of Chaliss"
                  className="w-full"
                />

                <div className="p-8">

                  <span className="text-amber-700 font-semibold">
                    BOOK ONE
                  </span>

                  <h2 className="text-4xl font-bold mt-3">
                    House of Chaliss
                  </h2>

                  <p className="text-xl text-gray-600 mt-2">
                    Experience of Being Kevo
                  </p>

                  <div className="mt-8 space-y-3 text-gray-700">

                    <p>✓ PDF eBook</p>

                    <p>✓ Instant Download</p>

                    <p>✓ Read on Phone, Tablet & Computer</p>

                    <p>✓ Lifetime Access</p>

                  </div>

                  <div className="border-t mt-10 pt-8">

                    <div className="flex justify-between text-2xl font-bold">

                      <span>Total</span>

                      <span className="text-amber-700">
                        KES 650
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <div className="bg-white rounded-3xl shadow-xl p-10">

                <h2 className="text-3xl font-bold">
                  Customer Information
                </h2>

                <form className="space-y-6 mt-10">

                  <div>

                    <label className="block mb-2 font-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Your Full Name"
                      className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-amber-600 outline-none"
                    />

                  </div>

                  <div>

                    <label className="block mb-2 font-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-amber-600 outline-none"
                    />

                  </div>

                  <div>

                    <label className="block mb-2 font-semibold">
                      Phone Number (M-Pesa)
                    </label>

                    <input
                      type="tel"
                      placeholder="07XXXXXXXX"
                      className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-amber-600 outline-none"
                    />

                  </div>

                  <hr className="my-8" />

                  <h3 className="text-2xl font-bold">
                    Choose Payment Method
                  </h3>

                  <button
                    type="button"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold mt-6"
                  >
                    Pay with M-Pesa
                  </button>

                  <button
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
                  >
                    Pay with PayPal
                  </button>

                  <p className="text-center text-gray-500 text-sm mt-6">
                    Secure payment processing.
                    Your payment details are never stored on this website.
                  </p>

                </form>

              </div>

            </div>

          </div>

        </section>

        {/* Trust Section */}

        <section className="bg-white py-20">

          <div className="max-w-6xl mx-auto px-6">

            <div className="grid md:grid-cols-3 gap-10 text-center">

              <div>

                <h3 className="text-2xl font-bold">
                  🔒 Secure Payments
                </h3>

                <p className="mt-4 text-gray-600">
                  Protected checkout using trusted payment providers.
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  ⚡ Instant Delivery
                </h3>

                <p className="mt-4 text-gray-600">
                  Receive your eBook immediately after payment.
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  📖 Lifetime Access
                </h3>

                <p className="mt-4 text-gray-600">
                  Download your purchased book anytime.
                </p>

              </div>

            </div>

            <div className="text-center mt-16">

              <Link
                href="/books/book-1"
                className="text-amber-700 font-semibold hover:underline"
              >
                ← Back to Book Details
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}