interface Props {
    purchases: any[];
}

export default function AnalyticsCards({
    purchases,
}: Props) {

    const paidPurchases = purchases.filter(
        p => p.payment_status === "paid"
    );

    const customers = new Set(
        paidPurchases.map(
            p => p.customer_id
        )
    ).size;

    const booksSold = paidPurchases.length;

    const paidSales = paidPurchases.length;

    const revenueByCurrency = paidPurchases.reduce(
        (acc, purchase) => {

            const currency =
                purchase.currency ?? "KES";

            if (!acc[currency]) {
                acc[currency] = 0;
            }

            acc[currency] += Number(
                purchase.amount
            );

            return acc;

        },
        {} as Record<string, number>
    );

    return (

        <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white rounded-2xl shadow p-6">

                    <p className="text-gray-500">
                        Paid Sales
                    </p>

                    <h2 className="text-3xl font-bold mt-3">
                        {paidSales}
                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow p-6">

                    <p className="text-gray-500">
                        Customers
                    </p>

                    <h2 className="text-3xl font-bold mt-3">
                        {customers}
                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow p-6">

                    <p className="text-gray-500">
                        Books Sold
                    </p>

                    <h2 className="text-3xl font-bold mt-3">
                        {booksSold}
                    </h2>

                </div>

            </div>

            <div>

                <h2 className="text-xl font-bold mb-4">
                    Revenue by Currency
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {Object.entries(
                        revenueByCurrency
                    ).map(
                        ([currency, amount]) => (

                            <div
                                key={currency}
                                className="bg-white rounded-2xl shadow p-6"
                            >

                                <p className="text-gray-500">
                                    {currency}
                                </p>

                                <h2 className="text-2xl font-bold mt-3">

                                    {currency}{" "}

                                    {Number(amount).toLocaleString()}

                                </h2>

                            </div>

                        )
                    )}

                    {Object.keys(
                        revenueByCurrency
                    ).length === 0 && (

                            <div className="bg-white rounded-2xl shadow p-6">

                                <p className="text-gray-500">

                                    No revenue yet.

                                </p>

                            </div>

                        )}

                </div>

            </div>

        </div>

    );

}