import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

    const { data: book } = await supabaseAdmin
        .from("books")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

    if (!book) {
        return {
            title: "Book Not Found | House of Chaliss",
            description:
                "The requested House of Chaliss book could not be found.",
        };
    }

    const title = `${book.title} — ${book.subtitle ?? ""} | House of Chaliss`;

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
                    url: book.cover || "/og-image.jpg",
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
            images: [book.cover || "/og-image.jpg"],
        },
    };
}

// --------------------------------------------------
// BOOK DETAILS PAGE
// --------------------------------------------------

export default async function BookDetailsPage({
    params,
}: Props) {
    const { slug } = await params;

    // --------------------------------------------------
    // LOAD BOOK FROM SUPABASE
    // --------------------------------------------------

    const { data: book, error } = await supabaseAdmin
        .from("books")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

    // --------------------------------------------------
    // BOOK NOT FOUND
    // --------------------------------------------------

    if (error || !book) {
        console.error("Book details error:", error);
        notFound();
    }

    // --------------------------------------------------
    // BOOK DETAILS
    // --------------------------------------------------

    const genres = Array.isArray(book.genre)
        ? book.genre.join(", ")
        : book.genre || "";

    const price = Number(book.price || 0);

    return (
        <main className="min-h-screen bg-[#F7F2EB]">
            <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* --------------------------------------------------
              BOOK COVER
          -------------------------------------------------- */}

                    <div className="flex justify-center">
                        {book.cover ? (
                            <img
                                src={book.cover}
                                alt={`${book.title} - ${book.subtitle ?? "House of Chaliss"}`}
                                className="w-full max-w-[420px] rounded-2xl shadow-2xl"
                            />
                        ) : (
                            <div className="w-full max-w-[420px] h-[560px] rounded-2xl bg-gray-200 flex items-center justify-center text-gray-500">
                                No Cover Available
                            </div>
                        )}
                    </div>

                    {/* --------------------------------------------------
              BOOK INFORMATION
          -------------------------------------------------- */}

                    <div>

                        {/* Availability */}

                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                            ● Available Now
                        </span>

                        {/* Series */}

                        <p className="mt-5 text-sm uppercase tracking-[3px] text-amber-700 font-semibold">
                            House of Chaliss Series
                        </p>

                        {/* Title */}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2D3D] mt-4 leading-tight">
                            {book.title}
                        </h1>

                        {/* Subtitle */}

                        {book.subtitle && (
                            <h2 className="text-xl md:text-2xl text-gray-600 mt-3">
                                {book.subtitle}
                            </h2>
                        )}

                        {/* Author */}

                        {book.author && (
                            <p className="mt-5 text-gray-700">
                                <strong>Author:</strong> {book.author}
                            </p>
                        )}

                        {/* Genres */}

                        {genres && (
                            <p className="mt-2 text-gray-700">
                                <strong>Genres:</strong> {genres}
                            </p>
                        )}

                        {/* Age Rating */}

                        {book.age_rating && (
                            <p className="mt-2 text-gray-700">
                                <strong>Age Rating:</strong> {book.age_rating}
                            </p>
                        )}

                        {/* Description */}

                        {book.description && (
                            <p className="mt-7 text-base md:text-lg text-gray-700 leading-8">
                                {book.description}
                            </p>
                        )}

                        {/* Price */}

                        <p className="mt-8 text-3xl md:text-4xl font-bold text-amber-700">
                            KES {price.toLocaleString()}
                        </p>

                        {/* --------------------------------------------------
                ACTIONS
            -------------------------------------------------- */}

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