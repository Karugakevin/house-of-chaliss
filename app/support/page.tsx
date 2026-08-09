import Footer from "../../components/Footer";
import Link from "next/link";

export default function SupportPage() {
    return (
        <>
            <main className="min-h-screen bg-[#F7F2EB]">

                {/* HERO */}

                <section className="bg-[#1F2D3D] text-white py-16">
                    <div className="max-w-4xl mx-auto px-6 text-center">

                        <p className="uppercase tracking-[4px] text-amber-400 font-semibold text-sm">
                            Customer Support
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold mt-4">
                            Need Help With Your Order?
                        </h1>

                        <p className="mt-5 text-gray-300 text-lg leading-8">
                            We're here to help with payments, download access and
                            your House of Chaliss eBook.
                        </p>

                    </div>
                </section>


                {/* SUPPORT CONTENT */}

                <section className="max-w-5xl mx-auto px-6 py-14">

                    <div className="bg-white rounded-3xl shadow-lg p-7 md:p-10">

                        <h2 className="text-3xl font-bold text-[#1F2D3D]">
                            Customer Support
                        </h2>

                        <p className="mt-4 text-gray-600 leading-7">
                            If you have successfully completed your payment but
                            haven't received your download access, cannot download
                            your eBook, or are experiencing another purchase-related
                            problem, contact us using the information below.
                        </p>


                        {/* CONTACT OPTIONS */}

                        <div className="grid md:grid-cols-2 gap-6 mt-8">

                            {/* EMAIL */}

                            <div className="bg-[#F7F2EB] rounded-2xl p-6">

                                <div className="text-3xl">
                                    📧
                                </div>

                                <h3 className="font-bold text-xl text-[#1F2D3D] mt-4">
                                    Email Support
                                </h3>

                                <p className="mt-2 text-gray-600">
                                    hello@houseofchaliss.com
                                </p>

                                <a
                                    href="mailto:hello@houseofchaliss.com"
                                    className="inline-block mt-4 text-amber-700 font-semibold hover:underline"
                                >
                                    Contact Support →
                                </a>

                            </div>


                            {/* WHATSAPP */}

                            <div className="bg-[#F7F2EB] rounded-2xl p-6">

                                <div className="text-3xl">
                                    📱
                                </div>

                                <h3 className="font-bold text-xl text-[#1F2D3D] mt-4">
                                    WhatsApp Support
                                </h3>

                                <p className="mt-2 text-gray-600">
                                    Get assistance with payments, downloads and
                                    purchase-related issues.
                                </p>

                                <a
                                    href="https://wa.me/YOURNUMBER"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-green-700 font-semibold hover:underline"
                                >
                                    WhatsApp Us →
                                </a>

                            </div>

                        </div>


                        {/* WHAT TO PROVIDE */}

                        <div className="mt-8 border-t border-gray-200 pt-8">

                            <h3 className="text-xl font-bold text-[#1F2D3D]">
                                When Contacting Support
                            </h3>

                            <p className="mt-3 text-gray-600 leading-7">
                                Please provide the name or email address used during
                                checkout and, where available, your M-Pesa transaction
                                information. This will help us locate your purchase
                                and assist you more quickly.
                            </p>

                            <p className="mt-3 text-gray-600 leading-7">
                                Never send your M-Pesa PIN, password or other
                                confidential security information to our support team.
                            </p>

                        </div>


                        {/* DOWNLOAD INFORMATION */}

                        <div className="mt-8 rounded-2xl bg-amber-50 border border-amber-100 p-6">

                            <h3 className="text-xl font-bold text-[#1F2D3D]">
                                About Your Download Link
                            </h3>

                            <p className="mt-3 text-gray-600 leading-7">
                                Your secure download link is valid for 24 hours after
                                it is issued and allows up to 3 downloads. If your
                                link has expired or you have reached the download
                                limit because of a genuine technical problem, please
                                contact support.
                            </p>

                        </div>


                        {/* HELPFUL LINKS */}

                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                href="/download-policy"
                                className="text-amber-700 font-semibold hover:underline"
                            >
                                Download Policy →
                            </Link>

                            <Link
                                href="/refund-policy"
                                className="text-amber-700 font-semibold hover:underline"
                            >
                                Refund Policy →
                            </Link>

                            <Link
                                href="/terms"
                                className="text-amber-700 font-semibold hover:underline"
                            >
                                Terms & Conditions →
                            </Link>

                            <Link
                                href="/faq"
                                className="text-amber-700 font-semibold hover:underline"
                            >
                                FAQs →
                            </Link>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}