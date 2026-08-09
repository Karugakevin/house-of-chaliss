import Link from "next/link";

interface Props {
    purchases: any[];
}

export default function RecentPurchases({
    purchases,
}: Props) {

    const recent = [...purchases]
        .sort(
            (a, b) =>
                new Date(b.purchased_at).getTime() -
                new Date(a.purchased_at).getTime()
        )
        .slice(0, 10);

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-bold">
                    Recent Purchases
                </h2>

                <Link
                    href="/admin/payments"
                    className="text-amber-700 hover:underline text-sm font-medium"
                >
                    View All
                </Link>

            </div>

            {recent.length === 0 ? (

                <div className="py-10 text-center text-gray-500">

                    No purchases found.

                </div>

            ) : (

                <div className="space-y-4">

                    {recent.map((purchase) => (

                        <div
                            key={purchase.id}
                            className="flex items-center justify-between border-b pb-4"
                        >

                            <div>

                                <p className="font-semibold">

                                    {purchase.customers?.name ??
                                        "Unknown Customer"}

                                </p>

                                <p className="text-sm text-gray-500">

                                    {purchase.books?.title ??
                                        "Unknown Book"}

                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-semibold">

                                    KES{" "}
                                    {Number(
                                        purchase.amount
                                    ).toLocaleString()}

                                </p>

                                <p className="text-xs text-gray-500">

                                    {new Date(
                                        purchase.purchased_at
                                    ).toLocaleDateString()}

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}