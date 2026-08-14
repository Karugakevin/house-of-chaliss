import Footer from "../../components/Footer";
import Link from "next/link";

export default function DownloadPolicyPage() {
    return (
        <>
            <main className="min-h-screen bg-[#F7F2EB]">

                {/* HERO */}

                <section className="bg-[#1F2D3D] text-white py-16">
                    <div className="max-w-4xl mx-auto px-6 text-center">

                        <p className="uppercase tracking-[4px] text-amber-400 font-semibold text-sm">
                            Digital Products
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold mt-4">
                            Digital Download Policy
                        </h1>

                        <p className="mt-5 text-gray-300">
                            Information about accessing and downloading your eBook.
                        </p>

                    </div>
                </section>


                {/* POLICY */}

                <section className="max-w-4xl mx-auto px-6 py-14">

                    <div className="bg-white rounded-3xl shadow-sm p-7 md:p-10 space-y-10">

                        {/* 1 */}

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                1. Digital Product
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                House of Chaliss is sold as a digital PDF eBook.
                                No physical book is included with a digital purchase.
                            </p>
                        </div>


                        {/* 2 */}

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                2. Download Access
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                After successful payment, you will receive a secure
                                download link for your purchased eBook. Download
                                information may also be sent to the email address
                                provided during checkout.
                            </p>
                        </div>


                        {/* 3 */}

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                3. Download Link Validity
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Your secure download link is valid for 24 hours from
                                the time it is issued after successful payment.
                                Once the 24-hour period has expired, the link will
                                no longer provide access to the eBook.
                            </p>
                        </div>


                        {/* 4 */}

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                4. Download Limit
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Each purchase allows a maximum of 3 downloads during
                                the 24-hour validity period of the download link.
                                Once the maximum number of downloads has been reached,
                                the download link will no longer provide additional
                                downloads.
                            </p>
                        </div>


                        {/* 5 */}

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                5. Expired or Exhausted Download Links
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Download links that have expired or reached the
                                maximum download limit cannot be used to access
                                the eBook. If you were unable to download your
                                purchase because of a genuine technical problem,
                                please contact support for assistance.
                            </p>
                        </div>


                        {/* 6 */}

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                6. Download Problems
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                If you have completed payment but cannot access or
                                download your eBook, please contact our support team.
                                We will make reasonable efforts to help you access
                                your purchased product.
                            </p>
                        </div>


                        {/* 7 */}

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                7. Personal Use
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Your purchased eBook is for your personal use.
                                You may not reproduce, resell, redistribute, share,
                                upload or make the digital file publicly available
                                without permission.
                            </p>
                        </div>


                        {/* 8 */}

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                8. Protect Your Download Link
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Your download link is intended for the purchaser.
                                Please do not share the link with other people.
                                Sharing your link may allow another person to use
                                your available downloads and may cause you to reach
                                your download limit.
                            </p>
                        </div>


                        {/* 9 */}

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                9. Need Help?
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                If you experience a problem with your payment,
                                download link or purchased eBook, please contact
                                our support team.
                            </p>

                            <a
                                href="mailto:chaobliss10@gmail.com"
                                className="inline-block mt-4 text-amber-700 font-semibold hover:underline"
                            >
                                chaobliss10@gmail.com
                            </a>

                            <div className="mt-5">
                                <Link
                                    href="/contact"
                                    className="text-amber-700 font-semibold hover:underline"
                                >
                                    Contact Support →
                                </Link>
                            </div>
                        </div>


                        {/* POLICY NOTE */}

                        <div className="border-t border-gray-200 pt-8">

                            <p className="text-sm text-gray-500 leading-7">
                                This Digital Download Policy forms part of the terms
                                governing purchases made through House of Chaliss.
                                By completing a purchase, you acknowledge and accept
                                the download conditions described above.
                            </p>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}