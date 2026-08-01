export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          <div>
            <h2 className="text-3xl font-bold">
              House of Chaliss
            </h2>

            <p className="mt-6 text-gray-400 leading-8">
              A captivating book series by Kevo exploring love,
              mystery, courage and the choices that define us.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Books
            </h3>

            <ul className="mt-6 space-y-3 text-gray-400">
              <li>
                <a href="/books/book-1" className="hover:text-white">
                  Book 1 – Experience of Being Kevo
                </a>
              </li>

              <li>Book 2 (Coming Soon)</li>
              <li>Book 3 (Coming Soon)</li>
              <li>Book 4 (Coming Soon)</li>
              <li>Book 5 (Coming Soon)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Author
            </h3>

            <p className="mt-6 text-gray-400">
              Kevo
            </p>

            <p className="mt-3 text-gray-400">
              Kenya
            </p>

            <p className="mt-3 text-gray-400">
              Romance • Mystery • Thriller
            </p>

          </div>

        </div>

        <hr className="my-12 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500">

          <p>
            © {new Date().getFullYear()} Kevo. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-6 md:mt-0">

            <a href="/">Home</a>
            <a href="/books/book-1">Book</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>

          </div>

        </div>

      </div>

    </footer>
  );
}