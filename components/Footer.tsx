import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1F2D3D] text-white">

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 md:py-12">

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">

          {/* Brand */}

          <div>
            <h2 className="text-2xl font-bold">
              House of Chaliss
            </h2>

            <p className="mt-3 text-sm text-gray-400 leading-6 max-w-sm">
              A six-book series exploring love, identity,
              resilience and the choices that shape our lives.
            </p>
          </div>


          {/* Series */}

          <div>
            <h3 className="font-semibold mb-4">
              The Series
            </h3>

            <ul className="space-y-2 text-sm">

              <li>
                <Link
                  href="/books/house-of-chaliss"
                  className="text-gray-300 hover:text-amber-400 transition"
                >
                  House of Chaliss — Book One
                </Link>
              </li>

              <li>
                <span className="text-gray-500">
                  House of Chaliss — Book Two
                </span>
              </li>

              <li>
                <span className="text-gray-500">
                  House of Chaliss — Book Three
                </span>
              </li>

              <li>
                <span className="text-gray-500">
                  House of Chaliss — Book Four
                </span>
              </li>

              <li>
                <span className="text-gray-500">
                  House of Chaliss — Book Five
                </span>
              </li>

              <li>
                <span className="text-gray-500">
                  House of Chaliss — Book Six
                </span>
              </li>

            </ul>
          </div>


          {/* Explore */}

          <div>

            <h3 className="font-semibold mb-4">
              Explore
            </h3>

            <div className="space-y-2 text-sm">

              <Link
                href="/"
                className="block text-gray-300 hover:text-amber-400 transition"
              >
                Home
              </Link>

              <Link
                href="/books"
                className="block text-gray-300 hover:text-amber-400 transition"
              >
                All Books
              </Link>

              <Link
                href="/about"
                className="block text-gray-300 hover:text-amber-400 transition"
              >
                Author
              </Link>

              <Link
                href="/contact"
                className="block text-gray-300 hover:text-amber-400 transition"
              >
                Contact
              </Link>

            </div>

          </div>

        </div>


        {/* Book One CTA */}

        <div className="mt-10 pt-8 border-t border-white/10">

          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6">

            {/* Book Information */}

            <div className="text-center md:text-left">

              <p className="text-sm text-gray-400">
                Book One is available now
              </p>

              <p className="text-xl font-bold mt-1">
                House of Chaliss
              </p>

              <p className="text-amber-400 font-semibold mt-1">
                KES 650
              </p>

            </div>


            {/* ACTION BUTTONS */}

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">

              {/* BUY NOW */}

              <Link
                href="/checkout/house-of-chaliss"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Buy Now – KES 650
              </Link>


              {/* LEARN MORE */}

              <Link
                href="/books/house-of-chaliss"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Learn More
              </Link>

            </div>

          </div>

        </div>

      </div>


      {/* Copyright */}

      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5">

          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-3 text-center md:text-left">

            <p>
              © {new Date().getFullYear()} House of Chaliss.
              All Rights Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">

              <Link
                href="/privacy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="hover:text-white transition"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/refund-policy"
                className="hover:text-white transition"
              >
                Refund Policy
              </Link>

              <Link
                href="/download-policy"
                className="hover:text-white transition"
              >
                Download Policy
              </Link>

              <Link
                href="/support"
                className="hover:text-white transition"
              >
                Support
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}