import Link from "next/link";
import Footer from "../../components/Footer";

export default function RefundPolicy() {
    return (
        <>
            <main className="min-h-screen bg-[#F7F2EB]">

                {/* HERO */}
                <section className="bg-[#1F2D3D] text-white py-16 md:py-20">
                    <div className="max-w-4xl mx-auto px-6 text-center">

                        <p className="uppercase tracking-[4px] text-amber-400 font-semibold text-sm">
                            Legal
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold mt-4">
                            Refund Policy
                        </h1>

                        <p className="mt-5 text-gray-300">
                            House of Chaliss
                        </p>

                    </div>
                </section>


                {/* POLICY */}
                <section className="max-w-4xl mx-auto px-6 py-14">

                    <div className="bg-white rounded-3xl shadow-sm p-7 md:p-10 space-y-10">

                        {/* 1 */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                1. Digital Products
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                House of Chaliss is sold as a digital eBook. Because digital
                                products are delivered immediately after successful payment,
                                purchases are generally non-refundable once the download has
                                been made available.
                            </p>
                        </section>


                        {/* 2 */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                2. When We May Offer a Refund
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                We may consider a refund where there has been a verified
                                technical problem that prevents you from accessing the
                                purchased eBook and we are unable to resolve the problem.
                            </p>
                        </section>


                        {/* 3 */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                3. Duplicate Payments
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                If you are accidentally charged more than once for the same
                                purchase, please contact us. After verification, the duplicate
                                payment may be refunded.
                            </p>
                        </section>


                        {/* 4 */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                4. Failed or Incomplete Payments
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                If a payment fails or is not successfully confirmed, access
                                to the digital product will not be provided. If money was
                                deducted from your account despite an unsuccessful payment,
                                please contact support so that the transaction can be
                                investigated.
                            </p>
                        </section>


                        {/* 5 */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                5. How to Request Help
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                If you experience a problem with your purchase, contact us
                                with your name, email address, payment information and a
                                brief description of the problem.
                            </p>

                            <Link
                                href="/support"
                                className="inline-block mt-4 text-amber-700 font-semibold hover:underline"
                            >
                                Contact Customer Support →
                            </Link>
                        </section>


                        {/* 6 */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                6. Refund Processing
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Where a refund is approved, the refund will normally be
                                processed through the appropriate payment method or channel
                                used for the original transaction.
                            </p>

                            <p className="mt-3 text-gray-600 leading-8">
                                Processing times may depend on the payment provider and
                                financial institution involved.
                            </p>
                        </section>


                        {/* 7 */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                7. Policy Changes
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                We reserve the right to update this Refund Policy when
                                necessary. Any changes will be published on this page.
                            </p>
                        </section>


                        {/* SUPPORT */}
                        <section className="border-t border-gray-200 pt-8">

                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                Need Help?
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                For questions about payments, downloads or refunds, please
                                contact our customer support team.
                            </p>

                            <Link
                                href="/support"
                                className="inline-flex mt-5 items-center justify-center bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-xl font-semibold transition"
                            >
                                Contact Support
                            </Link>

                        </section>


                        {/* LAST UPDATED */}
                        <div className="border-t border-gray-200 pt-6">

                            <p className="text-sm text-gray-500">
                                Last updated: August 2026
                            </p>

                        </div>

                    </div>


                    {/* BACK */}
                    <div className="text-center mt-10">

                        <Link
                            href="/"
                            className="text-amber-700 font-semibold hover:underline"
                        >
                            ← Back to House of Chaliss
                        </Link>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}