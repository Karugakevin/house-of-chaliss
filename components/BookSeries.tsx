import Link from "next/link";
import { books } from "@/data/books";

export default function BookSeries() {
    const availableBook = books.find((book) => book.available);
    const upcomingBooks = books.filter((book) => !book.available);

    if (!availableBook) return null;

    return (
        <section className="bg-white pt-0 pb-12 sm:pb-16">

            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* SECTION HEADER */}

                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">

                    <p className="uppercase tracking-[3px] sm:tracking-[4px] text-amber-700 font-extrabold text-xs sm:text-sm">
                        The Collection
                    </p>

                    <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F2D3D]">
                        The House of Chaliss Series
                    </h2>

                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-7">
                        Six books. One unfolding story. Discover the complete
                        House of Chaliss journey.
                    </p>

                </div>


                {/* FEATURED BOOK ONE */}

                <div className="grid lg:grid-cols-[280px_1fr] gap-7 lg:gap-8 items-center bg-[#F7F2EB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm">

                    {/* COVER */}

                    <div className="flex justify-center">

                        <img
                            src={availableBook.cover}
                            alt={`${availableBook.title} - House of Chaliss Book One`}
                            className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-full lg:max-w-[260px] h-auto aspect-[3/4] object-cover rounded-xl sm:rounded-2xl shadow-xl"
                        />

                    </div>


                    {/* DETAILS */}

                    <div className="text-center lg:text-left">

                        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">

                            <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold">
                                ● Available Now
                            </span>

                            <span className="text-xs sm:text-sm text-gray-500">
                                Book One
                            </span>

                        </div>


                        <h3 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2D3D]">
                            {availableBook.title}
                        </h3>


                        <p className="mt-2 text-lg sm:text-xl text-gray-600">
                            {availableBook.subtitle}
                        </p>


                        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-700 leading-7 max-w-2xl mx-auto lg:mx-0">
                            {availableBook.description}
                        </p>


                        {/* BOOK DETAILS */}

                        <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-600">

                            <span>
                                <strong className="text-[#1F2D3D]">
                                    Author:
                                </strong>{" "}
                                {availableBook.author}
                            </span>

                            <span>
                                <strong className="text-[#1F2D3D]">
                                    Age:
                                </strong>{" "}
                                {availableBook.ageRating}
                            </span>

                            <span>
                                <strong className="text-[#1F2D3D]">
                                    Format:
                                </strong>{" "}
                                PDF eBook
                            </span>

                        </div>


                        {/* PRICE + BUTTONS */}

                        <div className="mt-6 sm:mt-7">

                            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3">

                                {/* PRICE */}

                                <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 w-full sm:w-auto">
                                    KES {Number(availableBook.price).toLocaleString()}
                                </span>


                                {/* BUY NOW */}

                                <Link
                                    href={`/checkout/${availableBook.slug}`}
                                    className="inline-flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold transition w-full sm:w-auto"
                                >
                                    Buy Now
                                </Link>


                                {/* PHYSICAL COPY PLACEHOLDER */}

                                <button
                                    type="button"
                                    disabled
                                    className="inline-flex items-center justify-center bg-gray-200 text-gray-500 px-5 sm:px-6 py-3 rounded-xl font-semibold cursor-not-allowed w-full sm:w-auto"
                                    title="Physical copies will be available in the future"
                                >
                                    Buy Physical Copy
                                </button>


                                {/* LEARN MORE */}

                                <Link
                                    href={`/books/${availableBook.slug}`}
                                    className="inline-flex items-center justify-center border-2 border-[#1F2D3D] text-[#1F2D3D] hover:bg-white px-5 sm:px-6 py-3 rounded-xl font-semibold transition w-full sm:w-auto"
                                >
                                    Learn More
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* UPCOMING BOOKS */}

                {upcomingBooks.length > 0 && (

                    <div className="mt-10 sm:mt-12">

                        {/* SECTION TITLE */}

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5 sm:mb-6">

                            <div>

                                <h3 className="text-xl sm:text-2xl font-bold text-[#1F2D3D]">
                                    Continue the Journey
                                </h3>

                                <p className="text-sm sm:text-base text-gray-500 mt-1">
                                    More stories from the House of Chaliss are coming soon.
                                </p>

                            </div>


                            {/* DESKTOP VIEW ALL */}

                            <Link
                                href="/books"
                                className="hidden md:inline-flex text-amber-700 font-semibold hover:text-amber-800 transition whitespace-nowrap"
                            >
                                View All Books →
                            </Link>

                        </div>


                        {/* BOOK GRID */}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">

                            {upcomingBooks.map((book, index) => (

                                <div
                                    key={book.id}
                                    className="group bg-[#F7F2EB] rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition"
                                >

                                    {/* COVER */}

                                    <div className="relative">

                                        <img
                                            src={book.cover}
                                            alt={`${book.title} - House of Chaliss series`}
                                            className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-300"
                                        />

                                        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gray-900/75 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full">
                                            Book {index + 2}
                                        </span>

                                    </div>


                                    {/* INFO */}

                                    <div className="p-3 sm:p-4">

                                        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500">
                                            Coming Soon
                                        </p>

                                        <h4 className="mt-1 text-sm sm:text-base font-bold text-[#1F2D3D] line-clamp-2">
                                            {book.title}
                                        </h4>

                                        <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-1">
                                            {book.subtitle}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* MOBILE VIEW ALL */}

                        <div className="mt-6 sm:mt-7 text-center md:hidden">

                            <Link
                                href="/books"
                                className="inline-flex items-center text-sm sm:text-base text-amber-700 font-semibold"
                            >
                                View All Books →
                            </Link>

                        </div>

                    </div>

                )}

            </div>

        </section>
    );
}