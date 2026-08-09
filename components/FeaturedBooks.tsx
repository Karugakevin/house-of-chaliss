import Link from "next/link";
import supabaseAdmin from "@/lib/supabase-admin";

export default async function FeaturedBooks() {
    const { data: books } = await supabaseAdmin
        .from("books")
        .select("*")
        .eq("published", true)
        .eq("featured", true)
        .order("created_at", { ascending: false });

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-8 sm:pb-10 md:pt-4 md:pb-12">

            {/* SECTION HEADER */}

            <div className="text-center mb-7 sm:mb-8">

                <p className="uppercase tracking-[3px] sm:tracking-[4px] text-amber-700 font-semibold text-xs sm:text-sm">
                    Featured Book
                </p>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2D3D] mt-3">
                    Start Your Journey
                </h2>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-7">
                    Begin the House of Chaliss series with the first installment,
                    available today as an instant digital download.
                </p>

            </div>


            {/* FEATURED BOOK */}

            <div className="grid lg:grid-cols-2 gap-8">

                {(books ?? []).map((book) => (

                    <div
                        key={book.id}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2"
                    >

                        {/* COVER */}

                        <div className="bg-[#F7F2EB] flex items-center justify-center">

                            <img
                                src={book.cover}
                                alt={book.title}
                                className="w-full h-auto max-h-[500px] md:h-full md:min-h-[420px] object-cover"
                            />

                        </div>


                        {/* DETAILS */}

                        <div className="p-6 sm:p-7 md:p-8 flex flex-col justify-center">

                            <span className="inline-flex w-fit px-3 sm:px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-xs sm:text-sm">
                                Available Now
                            </span>


                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 text-[#1F2D3D]">
                                {book.title}
                            </h3>


                            <p className="text-base sm:text-lg text-gray-600 mt-2">
                                {book.subtitle}
                            </p>


                            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-700 leading-7">
                                {book.description}
                            </p>


                            {/* BOOK INFORMATION */}

                            <div className="mt-5 sm:mt-6 space-y-2 text-sm text-gray-700">

                                <p>
                                    <strong>Author:</strong>{" "}
                                    {book.author}
                                </p>

                                <p>
                                    <strong>Price:</strong>{" "}
                                    KES {Number(book.price).toLocaleString()}
                                </p>

                            </div>


                            {/* ACTIONS */}

                            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-7">

                                <Link
                                    href={`/books/${book.slug}`}
                                    className="flex-1 text-center rounded-xl border-2 border-[#1F2D3D] text-[#1F2D3D] py-3 font-semibold hover:bg-gray-100 transition"
                                >
                                    View Details
                                </Link>


                                <Link
                                    href={`/checkout/${book.slug}`}
                                    className="flex-1 text-center rounded-xl bg-amber-700 text-white py-3 font-semibold hover:bg-amber-800 transition"
                                >
                                    Buy Now
                                </Link>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}