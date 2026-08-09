"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const apiRef = searchParams.get("api_ref");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("Checking your payment...");

  useEffect(() => {
    if (!apiRef) {
      setLoading(false);
      setMessage("Missing payment reference.");
      return;
    }

    let interval: NodeJS.Timeout;

    async function checkPayment() {
      try {
        const response = await fetch(
          `/api/payment/status?api_ref=${apiRef}`
        );

        const data = await response.json();

        if (!response.ok) {
          setLoading(false);
          setMessage(data.message || "Unable to verify payment.");
          return;
        }

        setStatus(data.payment_status);

        switch (data.payment_status) {
          case "paid":
            setToken(data.token);
            setLoading(false);
            setMessage("Your payment was successful!");
            clearInterval(interval);
            break;

          case "processing":
            setMessage("Waiting for payment confirmation...");
            break;

          case "pending":
            setMessage("Waiting for payment...");
            break;

          case "retry":
            setLoading(false);
            setMessage(
              "Your payment needs to be retried. Please initiate the payment again."
            );
            clearInterval(interval);
            break;

          case "failed":
            setLoading(false);
            setMessage("Your payment failed. Please try again.");
            clearInterval(interval);
            break;

          default:
            setLoading(false);
            setMessage("Unknown payment status.");
            clearInterval(interval);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setMessage("Unable to connect to the server.");
        clearInterval(interval);
      }
    }

    checkPayment();

    interval = setInterval(checkPayment, 5000);

    return () => clearInterval(interval);
  }, [apiRef]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-6xl">
          {status === "paid" ? "🎉" : "📖"}
        </div>

        <h1 className="text-5xl font-bold text-[#1F2D3D] mt-6">
          House of Chaliss
        </h1>

        <p className="mt-8 text-lg text-gray-700">
          {message}
        </p>

        {loading && (
          <div className="mt-10">
            <div className="animate-pulse text-5xl">⏳</div>
          </div>
        )}

        {!loading && token && (
          <Link
            href={`/download/${token}`}
            className="inline-block mt-10 bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-xl font-semibold transition"
          >
            Download Your eBook
          </Link>
        )}

        <Link
          href="/"
          className="block mt-10 text-amber-700 hover:underline"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-pulse text-5xl">⏳</div>

            <h1 className="text-3xl font-bold text-[#1F2D3D] mt-6">
              Checking Payment...
            </h1>
          </div>
        </main>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}