"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function PendingPaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const apiRef = searchParams.get("api_ref");

    const [status, setStatus] = useState("Waiting for payment...");

    useEffect(() => {
        if (!apiRef) return;

        const interval = setInterval(async () => {
            try {
                const response = await fetch(
                    `/api/payment-status?api_ref=${apiRef}`
                );

                const result = await response.json();

                console.log(result);

                if (result.status === "paid") {
                    clearInterval(interval);
                    router.push(`/payment/success?api_ref=${apiRef}`);
                }

                if (
                    result.status === "failed" ||
                    result.status === "retry"
                ) {
                    clearInterval(interval);
                    router.push("/payment/failed");
                }
            } catch (error) {
                console.error("Payment status check failed:", error);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [apiRef, router]);

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-600 mx-auto" />

                <h1 className="text-3xl font-bold mt-8">
                    Complete Payment
                </h1>

                <p className="mt-4 text-gray-600">
                    Check your phone and complete the M-Pesa payment.
                </p>

                <p className="mt-6 text-green-700 font-semibold">
                    {status}
                </p>
            </div>
        </main>
    );
}

export default function PendingPaymentPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-600 mx-auto" />

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