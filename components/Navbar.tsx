import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#F7F2EB]/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

        <Link
          href="/"
          className="text-2xl font-bold text-[#1F2D3D] hover:text-amber-700 transition"
        >
          House of Chaliss
        </Link>

        <div className="hidden md:flex items-center gap-8 text-lg font-medium">

          <Link href="/" className="hover:text-amber-700 transition">
            Home
          </Link>

          <Link href="/about" className="hover:text-amber-700 transition">
            Author
          </Link>

          <Link href="/books" className="hover:text-amber-700 transition">
            Books
          </Link>

          <Link href="/contact" className="hover:text-amber-700 transition">
            Contact
          </Link>

        </div>

      </div>
    </nav>
  );
}