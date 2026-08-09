interface Purchase {
    amount: number;
    payment_status: string | null;
}

interface Props {
    purchases: Purchase[] | null;
}

export default function PaymentStats({
    purchases,
}: Props) {
    const paymentList = purchases ?? [];

    const totalVolume = paymentList.reduce(
        (sum, purchase) => sum + (purchase.amount ?? 0),
        0
    );

    const paid = paymentList.filter(
        (purchase) =>
            purchase.payment_status?.toLowerCase() ===
            "paid"
    );

    const pending = paymentList.filter(
        (purchase) =>
            purchase.payment_status?.toLowerCase() ===
            "pending"
    );

    const failed = paymentList.filter(
        (purchase) =>
            purchase.payment_status?.toLowerCase() ===
            "failed"
    );

    const refunded = paymentList.filter(
        (purchase) =>
            purchase.payment_status?.toLowerCase() ===
            "refunded"
    );

    const cards = [
        {
            title: "Total Payment Volume",
            value: `KES ${totalVolume.toLocaleString()}`,
            color: "bg-indigo-50 border-indigo-200",
            text: "text-indigo-700",
        },
        {
            title: "Paid",
            value: paid.length,
            color: "bg-green-50 border-green-200",
            text: "text-green-700",
        },
        {
            title: "Pending",
            value: pending.length,
            color: "bg-yellow-50 border-yellow-200",
            text: "text-yellow-700",
        },
        {
            title: "Failed",
            value: failed.length,
            color: "bg-red-50 border-red-200",
            text: "text-red-700",
        },
        {
            title: "Refunded",
            value: refunded.length,
            color: "bg-purple-50 border-purple-200",
            text: "text-purple-700",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className={`rounded-2xl border p-6 shadow-sm ${card.color}`}
                >
                    <p className="text-sm text-gray-500">
                        {card.title}
                    </p>

                    <h2
                        className={`mt-3 text-3xl font-bold ${card.text}`}
                    >
                        {card.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}