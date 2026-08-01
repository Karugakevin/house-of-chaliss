import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F7F2EB]/90 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-[#1F2D3D]"
        >
          House of Chaliss
        </Link>

        <div className="hidden lg:flex items-center gap-8 font-medium text-gray-700">

          <Link
            href="/"
            className="hover:text-amber-700 transition"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="hover:text-amber-700 transition"
          >
            About
          </Link>

          <Link
            href="/books"
            className="hover:text-amber-700 transition"
          >
            Books
          </Link>

          <Link
            href="/author"
            className="hover:text-amber-700 transition"
          >
            Author
          </Link>

          <Link
            href="/contact"
            className="hover:text-amber-700 transition"
          >
            Contact
          </Link>

        </div>

        <Link
          href="/checkout"
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Buy Now
        </Link>
      </nav>
    </header>
  );
}