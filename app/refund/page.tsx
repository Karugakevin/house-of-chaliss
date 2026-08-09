export default function RefundPolicy() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16">

            <p className="uppercase tracking-[4px] text-amber-700 font-semibold text-sm">
                Legal
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2D3D] mt-3">
                Refund Policy
            </h1>

            <p className="mt-4 text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="mt-10 space-y-8 text-gray-700 leading-8">

                <section>
                    <h2 className="text-2xl font-bold text-[#1F2D3D]">
                        Digital Products
                    </h2>

                    <p className="mt-3">
                        House of Chaliss is sold as a digital eBook. Because digital
                        products can be accessed immediately after purchase, all completed
                        purchases are generally final and non-refundable.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[#1F2D3D]">
                        Payment Errors
                    </h2>

                    <p className="mt-3">
                        If you are charged but do not receive access to your purchased
                        eBook, please contact us. We will verify the payment and provide
                        access where the payment has been successfully received.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[#1F2D3D]">
                        Duplicate Payments
                    </h2>

                    <p className="mt-3">
                        If you accidentally make more than one payment for the same
                        purchase, contact us with the relevant payment details. After
                        verification, duplicate payments may be refunded.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[#1F2D3D]">
                        Technical Problems
                    </h2>

                    <p className="mt-3">
                        If you experience a genuine technical problem preventing you from
                        accessing your purchased eBook, please contact support before
                        requesting a refund. We will first try to resolve the problem.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[#1F2D3D]">
                        Contact Support
                    </h2>

                    <p className="mt-3">
                        For payment or download problems, please contact us through our
                        support page and provide your name, email address and payment
                        reference where applicable.
                    </p>
                </section>

            </div>

        </main>
    );
}