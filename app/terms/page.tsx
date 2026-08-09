import Footer from "../../components/Footer";

export default function TermsPage() {
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
                            Terms & Conditions
                        </h1>

                        <p className="mt-5 text-gray-300">
                            Please read these terms before purchasing from House of Chaliss.
                        </p>

                    </div>
                </section>


                {/* CONTENT */}
                <section className="max-w-4xl mx-auto px-6 py-14">

                    <div className="bg-white rounded-3xl shadow-sm p-7 md:p-10 space-y-10">

                        {/* 1 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                1. About House of Chaliss
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                House of Chaliss is a digital book series. The website
                                allows customers to purchase and access digital eBooks
                                published as part of the House of Chaliss series.
                            </p>
                        </div>


                        {/* 2 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                2. Digital Products
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Unless specifically stated otherwise, products sold through
                                this website are digital PDF eBooks. Purchasing a digital
                                product does not include a physical copy of the book.
                            </p>
                        </div>


                        {/* 3 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                3. Purchasing a Book
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                By completing a purchase, you confirm that the information
                                provided during checkout is accurate and that you are
                                authorised to use the payment method provided.
                            </p>

                            <p className="mt-3 text-gray-600 leading-8">
                                The current price of House of Chaliss Book One is displayed
                                on the website and may be changed in the future.
                            </p>
                        </div>


                        {/* 4 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                4. Payment
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Payments may be processed through the payment methods
                                displayed during checkout, including M-Pesa where available.
                                Your order is considered successful once payment has been
                                successfully confirmed by our payment system.
                            </p>
                        </div>


                        {/* 5 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                5. Delivery and Download Access
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                After successful payment, customers will receive access to
                                their purchased digital eBook through the secure download
                                process provided on the website.
                            </p>

                            <p className="mt-3 text-gray-600 leading-8">
                                Each download link is valid for 24 hours from the time it
                                is issued. During this period, the purchased eBook may be
                                downloaded up to a maximum of 3 times.
                            </p>

                            <p className="mt-3 text-gray-600 leading-8">
                                Once the 24-hour period has expired or the maximum number
                                of downloads has been reached, the download link will no
                                longer provide access to the eBook.
                            </p>

                            <p className="mt-3 text-gray-600 leading-8">
                                Customers should keep their download link private and
                                should not share it with other people. If a genuine
                                technical problem prevents you from accessing your
                                purchase, please contact customer support for assistance.
                            </p>
                        </div>

                        {/* 6 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                6. Download Restrictions
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Download links are issued for the purchaser's personal use.
                                A download link must not be copied, shared, sold, published
                                or distributed to another person.
                            </p>

                            <p className="mt-3 text-gray-600 leading-8">
                                House of Chaliss reserves the right to restrict or disable
                                access where a download link appears to be misused or
                                accessed in a manner inconsistent with these Terms.
                            </p>
                        </div>

                        {/* 7 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                7. Personal Use
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Your purchase gives you a personal, non-transferable right
                                to access and read the purchased eBook.
                            </p>

                            <p className="mt-3 text-gray-600 leading-8">
                                You may read the eBook on your personal phone, tablet,
                                laptop, desktop computer or other compatible device.
                            </p>
                        </div>


                        {/* 8 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                8. Copyright and Intellectual Property
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                All books, text, images, designs, logos and other content
                                associated with House of Chaliss are protected by applicable
                                intellectual property and copyright laws.
                            </p>

                            <p className="mt-3 text-gray-600 leading-8">
                                You may not reproduce, resell, redistribute, upload,
                                publicly share or commercially distribute the purchased
                                eBook without prior written permission.
                            </p>
                        </div>


                        {/* 9 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                9. Refunds
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Because digital products can be accessed immediately after
                                purchase, refunds are subject to the conditions set out in
                                our Refund Policy.
                            </p>

                            <a
                                href="/refund-policy"
                                className="inline-block mt-4 text-amber-700 font-semibold hover:underline"
                            >
                                Read our Refund Policy →
                            </a>
                        </div>


                        {/* 10 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                10. Website Availability
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                We aim to keep the website and digital delivery services
                                available and functioning properly. However, temporary
                                interruptions may occur because of maintenance, technical
                                problems, internet connectivity or circumstances beyond
                                our reasonable control.
                            </p>
                        </div>


                        {/* 11 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                11. Customer Responsibility
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                Customers are responsible for providing a correct email
                                address and other necessary information during checkout.
                                Customers are also responsible for maintaining access to
                                their email account and devices used to access their purchase.
                            </p>
                        </div>


                        {/* 12 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                12. Changes to These Terms
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                We may update these Terms & Conditions from time to time.
                                Any updated version will be published on this page.
                            </p>
                        </div>


                        {/* 13 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2D3D]">
                                13. Contact and Support
                            </h2>

                            <p className="mt-3 text-gray-600 leading-8">
                                If you have questions about these terms, your purchase,
                                payment or access to a digital product, please contact us.
                            </p>

                            <a
                                href="/support"
                                className="inline-block mt-4 text-amber-700 font-semibold hover:underline"
                            >
                                Contact Customer Support →
                            </a>
                        </div>


                        {/* LAST UPDATED */}
                        <div className="border-t border-gray-200 pt-6">

                            <p className="text-sm text-gray-500">
                                Last updated: August 2026
                            </p>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}