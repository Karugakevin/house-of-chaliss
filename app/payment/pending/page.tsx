"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function PendingPaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const apiRef = searchParams.get("api_ref");

    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState(
        "Check your phone and complete the M-Pesa payment."
    );

    useEffect(() => {
        if (!apiRef) {
            setStatus("error");
            setMessage("Payment reference is missing.");
            return;
        }

        let stopped = false;

        const checkPaymentStatus = async () => {
            try {
                const response = await fetch(
                    `/api/payment-status?api_ref=${encodeURIComponent(apiRef)}`,
                    {
                        cache: "no-store",
                    }
                );

                const result = await response.json();

                console.log("Payment status:", result);

                if (stopped) return;

                const paymentStatus = result.status?.toLowerCase();

                // -----------------------------------------
                // PAYMENT SUCCESSFUL
                // -----------------------------------------

                if (paymentStatus === "paid") {
                    stopped = true;

                    setStatus("paid");
                    setMessage(
                        "Payment received successfully. Preparing your download..."
                    );

                    setTimeout(() => {
                        router.replace(
                            `/payment/success?api_ref=${encodeURIComponent(apiRef)}`
                        );
                    }, 1000);

                    return;
                }

                // -----------------------------------------
                // PAYMENT FAILED / CANCELLED
                // -----------------------------------------

                if (
                    paymentStatus === "failed" ||
                    paymentStatus === "retry"
                ) {
                    stopped = true;

                    setStatus("failed");

                    setMessage(
                        result.failed_reason ||
                        "The M-Pesa payment was cancelled or failed."
                    );

                    setTimeout(() => {
                        router.replace("/payment/failed");
                    }, 1500);

                    return;
                }

                // -----------------------------------------
                // PAYMENT PROCESSING
                // -----------------------------------------

                if (paymentStatus === "processing") {
                    setStatus("processing");

                    setMessage(
                        "Your payment is being processed. Please wait..."
                    );

                    return;
                }

                // -----------------------------------------
                // PAYMENT STILL PENDING
                // -----------------------------------------

                if (paymentStatus === "pending") {
                    setStatus("pending");

                    setMessage(
                        "Check your phone and complete the M-Pesa payment."
                    );

                    return;
                }

            } catch (error) {
                console.error(
                    "Payment status check failed:",
                    error
                );

                if (!stopped) {
                    setStatus("error");
                    setMessage(
                        "We are having trouble checking your payment status. Please wait..."
                    );
                }
            }
        };

        // Check immediately
        checkPaymentStatus();

        // Then check every 3 seconds
        const interval = setInterval(
            checkPaymentStatus,
            3000
        );

        return () => {
            stopped = true;
            clearInterval(interval);
        };

    }, [apiRef, router]);

    // -----------------------------------------
    // UI STATES
    // -----------------------------------------

    const isFailed = status === "failed";
    const isPaid = status === "paid";
    const isError = status === "error";

    return (
        <main className="min-h-screen bg-[#F7F2EB] flex items-center justify-center px-6">

            <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">

                {/* STATUS ICON */}
                <div className="flex justify-center">

                    {isFailed ? (
                        <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-4xl">
                            ✕
                        </div>
                    ) : isPaid ? (
                        <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-4xl">
                            ✓
                        </div>
                    ) : (
                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-green-600" />
                    )}

                </div>

                {/* TITLE */}
                <h1 className="text-3xl font-bold mt-8">

                    {isFailed
                        ? "Payment Cancelled"
                        : isPaid
                            ? "Payment Successful"
                            : isError
                                ? "Checking Payment"
                                : status === "processing"
                                    ? "Processing Payment"
                                    : "Complete Payment"}

                </h1>

                {/* MESSAGE */}
                <p className="mt-5 text-gray-600 leading-relaxed">
                    {message}
                </p>

                {/* PENDING INDICATOR */}
                {!isFailed && !isPaid && (
                    <div className="mt-8">

                        <div className="flex justify-center gap-2">

                            <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" />

                            <span
                                className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                                style={{
                                    animationDelay: "150ms",
                                }}
                            />

                            <span
                                className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                                style={{
                                    animationDelay: "300ms",
                                }}
                            />

                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            We are checking your payment automatically.
                        </p>

                    </div>
                )}

                {/* FAILED BUTTON */}
                {isFailed && (
                    <button
                        onClick={() => router.replace("/checkout")}
                        className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-semibold"
                    >
                        Try Payment Again
                    </button>
                )}

                {/* ERROR BUTTON */}
                {isError && (
                    <button
                        onClick={() => router.replace("/checkout")}
                        className="mt-8 w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-4 rounded-xl font-semibold"
                    >
                        Return to Checkout
                    </button>
                )}

            </div>

        </main>
    );
}

export default function PendingPaymentPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-[#F7F2EB] flex items-center justify-center">
                    <div className="text-center">

                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-green-600 mx-auto" />

                        <h1 className="text-3xl font-bold mt-8">
                            Loading Payment...
                        </h1>

                    </div>
                </main>
            }
        >
            <PendingPaymentContent />
        </Suspense>
    );
}