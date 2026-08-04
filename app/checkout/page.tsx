"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { books } from "../../data/books";
import PriceTag from "../../components/PriceTag";

export default function CheckoutPage() {
  const router = useRouter();

  const book = books.find((book) => book.available);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  if (!book) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          No book is currently available.
        </h1>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please complete all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          amount: book.price,
        }),
      });

      const data = await response.json();

      console.log("Payment Response:", data);

      if (!response.ok) {
        alert(data.message || "Payment failed.");
        return;
      }

      // Works with either your API response or the raw IntaSend response
      const apiRef =
        data.api_ref ||
        data.invoice?.api_ref ||
        data.payment?.invoice?.api_ref;

      if (!apiRef) {
        alert("Payment started, but no payment reference was returned.");
        return;
      }

      // Redirect to success page immediately
      router.push(`/payment/success?api_ref=${apiRef}`);
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong while initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F2EB] py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* Book Summary */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <img
            src={book.cover}
            alt={book.title}
            className="rounded-2xl shadow-lg w-full"
          />

          <h1 className="text-4xl font-bold mt-8">
            {book.title}
          </h1>

          <h2 className="text-xl text-gray-600 mt-3">
            {book.subtitle}
          </h2>

          <p className="mt-6">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="mt-3">
            <strong>Age Rating:</strong> {book.ageRating}
          </p>

          <div className="mt-8">
            <PriceTag price={book.price} />
          </div>

        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Customer Details
          </h2>

          <div className="space-y-6">

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-xl px-5 py-4"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-xl px-5 py-4"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-5 py-4"
            />

            <input
              type="tel"
              name="phone"
              placeholder="2547XXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-xl px-5 py-4"
            />

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              {loading
                ? "Sending STK Push..."
                : `Pay KES ${book.price} with M-Pesa`}
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}