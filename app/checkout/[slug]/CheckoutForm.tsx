"use client";

import { useState } from "react";

interface Book {
    id: string;
    slug: string;
    title: string;
    price: number;
    currency: string;
}

interface Props {
    book: Book;
}

export default function CheckoutForm({ book }: Props) {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);

        try {

            console.log("Book ID:", book.id);

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookId: book.id,
                    name,
                    email,
                    phone,
                }),
            });

            const result = await response.json();

            console.log(result);

            if (!response.ok) {
                alert(result.message ?? "Something went wrong.");
                return;
            }

            window.location.href =
                `/payment/pending?api_ref=${result.purchase.api_ref}`;

            return;

            const apiRef = result.purchase.api_ref;

            let paid = false;

            while (!paid) {

                await new Promise(resolve => setTimeout(resolve, 3000));

                const statusResponse = await fetch(
                    `/api/payment-status?api_ref=${apiRef}`
                );

                const statusResult = await statusResponse.json();

                console.log(statusResult);

                if (statusResult.status === "paid") {

                    paid = true;

                    window.location.href = `/payment/success?api_ref=${apiRef}`;

                }

                if (
                    statusResult.status === "failed" ||
                    statusResult.status === "retry"
                ) {

                    alert("Payment failed.");

                    return;

                }

            }

        } catch (error) {
            console.error(error);
            alert("Server error.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
        >
            <div>
                <label className="block mb-2 font-semibold">
                    Full Name
                </label>

                <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    className="w-full border rounded-lg p-4"
                />
            </div>

            <div>
                <label className="block mb-2 font-semibold">
                    Email
                </label>

                <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full border rounded-lg p-4"
                />
            </div>

            <div>
                <label className="block mb-2 font-semibold">
                    M-Pesa Phone
                </label>

                <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                    placeholder="2547XXXXXXXX"
                    className="w-full border rounded-lg p-4"
                />
            </div>

            <button
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 text-lg font-bold"
            >
                {loading
                    ? "Processing..."
                    : `Pay ${book.currency} ${book.price}`}
            </button>
        </form>
    );
}