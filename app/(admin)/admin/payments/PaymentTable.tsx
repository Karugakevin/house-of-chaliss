import Link from "next/link";

interface Purchase {
    id: string;
    amount: number;
    payment_status: string | null;
    transaction_id: string | null;
    purchased_at: string;

    customers: {
        name: string;
        email: string;
    } | null;

    books: {
        title: string;
    } | null;
}

interface Props {
    purchases: Purchase[] | null;
}

function statusColor(status?: string | null) {
    switch (status?.toLowerCase()) {
        case "paid":
            return "bg-green-100 text-green-700";

        case "pending":
            return "bg-yellow-100 text-yellow-700";

        case "failed":
            return "bg-red-100 text-red-700";

        case "refunded":
            return "bg-purple-100 text-purple-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
}

export default function PaymentTable({
    purchases,
}: Props) {
    const paymentList = purchases ?? [];

    return (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full">

                    <thead className="bg-gray-50">
                        <tr className="text-left">

                            <th className="px-6 py-4 font-semibold">
                                Order
                            </th>

                            <th className="px-6 py-4 font-semibold">
                                Customer
                            </th>

                            <th className="px-6 py-4 font-semibold">
                                Book
                            </th>

                            <th className="px-6 py-4 font-semibold">
                                Amount
                            </th>

                            <th className="px-6 py-4 font-semibold">
                                Status
                            </th>

                            <th className="px-6 py-4 font-semibold">
                                Transaction
                            </th>

                            <th className="px-6 py-4 font-semibold">
                                Date
                            </th>

                            <th className="px-6 py-4 font-semibold text-center">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {paymentList.length === 0 && (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center py-12 text-gray-500"
                                >
                                    No payments found.
                                </td>
                            </tr>
                        )}

                        {paymentList.map((purchase) => (
                            <tr
                                key={purchase.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 font-medium">
                                    <Link
                                        href={`/admin/payments/${purchase.id}`}
                                        className="text-amber-700 hover:underline font-semibold"
                                    >
                                        #{purchase.id.slice(0, 8)}
                                    </Link>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="font-medium">
                                        {purchase.customers?.name ??
                                            "Unknown"}
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        {purchase.customers?.email ??
                                            "-"}
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    {purchase.books?.title ??
                                        "-"}
                                </td>

                                <td className="px-6 py-4 font-semibold">
                                    KES {purchase.amount.toLocaleString()}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                                            purchase.payment_status
                                        )}`}
                                    >
                                        {purchase.payment_status ??
                                            "Unknown"}
                                    </span>
                                </td>

                                <td className="px-6 py-4 font-mono text-sm">
                                    {purchase.transaction_id ??
                                        "-"}
                                </td>

                                <td className="px-6 py-4">
                                    {new Date(
                                        purchase.purchased_at
                                    ).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <Link
                                        href={`/admin/payments/${purchase.id}`}
                                        className="inline-flex items-center rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 transition"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
}