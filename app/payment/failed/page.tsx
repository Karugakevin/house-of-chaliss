import Link from "next/link";

export default function PaymentFailedPage() {
    return (
        <main className="min-h-screen bg-[#F7F2EB] flex items-center justify-center px-6 py-16">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">

                <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-4xl">✕</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-[#1F2D3D] mt-6">
                    Payment Unsuccessful
                </h1>

                <p className="text-gray-600 mt-4 leading-7">
                    We were unable to complete your payment for this purchase.
                    Your order has not been marked as paid.
                </p>

                <p className="text-gray-500 mt-3 leading-7">
                    If you were using M-Pesa, please check that you entered the
                    correct PIN and that your account had sufficient funds.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

                    <Link
                        href="/"
                        className="bg-[#1F2D3D] hover:bg-[#162331] text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Back to Store
                    </Link>

                    <Link
                        href="/contact"
                        className="border border-gray-300 hover:bg-gray-50 text-[#1F2D3D] px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Contact Support
                    </Link>

                </div>

                <p className="text-sm text-gray-400 mt-8">
                    If money was deducted from your M-Pesa account but your payment
                    appears unsuccessful, please contact support before making another
                    payment.
                </p>

            </div>
        </main>
    );
}