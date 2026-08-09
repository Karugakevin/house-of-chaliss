import { notFound } from "next/navigation";
import supabaseAdmin from "@/lib/supabase-admin";
import CheckoutForm from "./CheckoutForm";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CheckoutPage({
    params,
}: Props) {

    const { slug } = await params;

    const { data: book, error } =
        await supabaseAdmin
            .from("books")
            .select("*")
            .eq("slug", slug)
            .eq("published", true)
            .single();

    if (error || !book) {
        notFound();
    }

    return (

        <main className="max-w-4xl mx-auto px-6 py-16">

            <h1 className="text-4xl font-bold text-[#1F2D3D] mb-10">
                Checkout
            </h1>

            <div className="bg-white rounded-2xl shadow-xl p-8">

                <div className="flex gap-8">

                    <img
                        src="/cover.jpg"
                        alt="House of Chaliss"
                        className="w-20 h-28 object-cover rounded-lg shadow-md"
                    />

                    <div className="flex-1">

                        <h2 className="text-3xl font-bold">
                            {book.title}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {book.author ?? "House of Chaliss"}
                        </p>

                        <p className="text-3xl font-bold text-amber-700 mt-6">
                            {book.currency}{" "}
                            {Number(book.price).toLocaleString()}
                        </p>

                    </div>

                </div>

                <CheckoutForm
                    book={{
                        id: book.id,
                        slug: book.slug,
                        title: book.title,
                        price: book.price,
                        currency: book.currency,
                    }}
                />

            </div>

        </main>

    );

}