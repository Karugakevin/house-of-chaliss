import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { books } from "@/data/books";
import supabaseAdmin from "@/lib/supabase-admin";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// --------------------------------------------------
// SEO METADATA
// --------------------------------------------------

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    let book: any = null;

    // Book One from Supabase
    if (slug === "house-of-chaliss") {
        const { data } = await supabaseAdmin
            .from("books")
            .select("*")
            .eq("slug", slug)
            .single();

        book = data;
    } else {
        // Upcoming books from local data
        book = books.find((b) => b.slug === slug);
    }

    if (!book) {
        return {
            title: "Book Not Found | House of Chaliss",
            description: "The requested House of Chaliss book could not be found.",
        };
    }

    const title = `${book.title} | House of Chaliss`;

    const description =
        book.description ||
        `Discover ${book.title}, part of the House of Chaliss series by Kevo.`;

    return {
        title,
        description,

        alternates: {
            canonical: `/books/${book.slug}`,
        },

        openGraph: {
            title,
            description,
            url: `/books/${book.slug}`,
            siteName: "House of Chaliss",
            type: "book",
            images: [
                {
                    url: "/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: `${book.title} - House of Chaliss`,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/og-image.jpg"],
        },
    };
}


// --------------------------------------------------
// BOOK DETAILS PAGE
// --------------------------------------------------

export default async function BookDetailsPage({ params }: Props) {
    const { slug } = await params;

    // --------------------------------------------------
    // BOOK ONE — LIVE PRODUCT
    // --------------------------------------------------

    if (slug === "house-of-chaliss") {
        const { data: book, error } = await supabaseAdmin
            .from("books")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error || !book) {
            notFound();
        }

        return (
            <main className="min-h-screen bg-[#F7F2EB]">
                <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20">

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                        {/* BOOK COVER */}

                        <div className="flex justify-center">
                            <img
                                src={book.cover}
                                alt={`${book.title} - Book One of the House of Chaliss series`}
                                className="w-full max-w-[420px] rounded-2xl shadow-2xl"
                            />
                        </div>


                        {/* BOOK INFORMATION */}

                        <div>

                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                                ● Available Now
                            </span>

                            <p className="mt-5 text-sm uppercase tracking-[3px] text-amber-700 font-semibold">
                                House of Chaliss Series • Book One
                            </p>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2D3D] mt-4 leading-tight">
                                {book.title}
                            </h1>

                            <h2 className="text-xl md:text-2xl text-gray-600 mt-3">
                                {book.subtitle}
                            </h2>

                            <p className="mt-7 text-base md:text-lg text-gray-700 leading-8">
                                {book.description}
                            </p>

                            <p className="mt-8 text-3xl md:text-4xl font-bold text-amber-700">
                                KES {Number(book.price).toLocaleString()}
                            </p>


                            {/* ACTIONS */}

                            <div className="mt-8 flex flex-col sm:flex-row gap-3">

                                <Link
                                    href={`/checkout/${book.slug}`}
                                    className="inline-flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-xl font-semibold transition"
                                >
                                    Buy Now
                                </Link>

                                <Link
                                    href="/books"
                                    className="inline-flex items-center justify-center border-2 border-[#1F2D3D] text-[#1F2D3D] px-8 py-4 rounded-xl font-semibold hover:bg-white transition"
                                >
                                    Back to Series
                                </Link>

                            </div>

                        </div>

                    </div>

                </section>
            </main>
        );
    }


    // --------------------------------------------------
    // BOOKS 2–6 — COMING SOON
    // --------------------------------------------------

    const upcomingBook = books.find(
        (book) => book.slug === slug
    );

    if (!upcomingBook) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#F7F2EB]">
            <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 lg:py-20">

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* COVER */}

                    <div className="flex justify-center">
                        <img
                            src={upcomingBook.cover}
                            alt={`${upcomingBook.title} - House of Chaliss series`}
                            className="w-full max-w-[420px] rounded-2xl shadow-xl"
                        />
                    </div>


                    {/* INFORMATION */}

                    <div>

                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold text-sm">
                            Coming Soon
                        </span>

                        <p className="mt-5 text-sm uppercase tracking-[3px] text-amber-700 font-semibold">
                            House of Chaliss Series
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold text-[#1F2D3D] mt-4">
                            {upcomingBook.title}
                        </h1>

                        <h2 className="text-xl md:text-2xl text-gray-600 mt-3">
                            {upcomingBook.subtitle}
                        </h2>

                        <p className="mt-7 text-base md:text-lg leading-8 text-gray-700">
                            This book is currently in production. It will become
                            available in the House of Chaliss collection as the
                            story continues.
                        </p>


                        {/* ACTIONS */}

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">

                            <button
                                type="button"
                                disabled
                                className="bg-gray-300 text-gray-600 px-8 py-4 rounded-xl font-semibold cursor-not-allowed"
                            >
                                Coming Soon
                            </button>

                            <Link
                                href="/books"
                                className="inline-flex items-center justify-center border-2 border-[#1F2D3D] text-[#1F2D3D] px-8 py-4 rounded-xl font-semibold hover:bg-white transition"
                            >
                                Back to Series
                            </Link>

                        </div>

                    </div>

                </div>

            </section>
        </main>
    );
}