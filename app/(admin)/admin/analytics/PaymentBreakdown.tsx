interface Props {
    purchases: any[];
}

export default function PaymentBreakdown({
    purchases,
}: Props) {

    const paid = purchases.filter(
        p => p.payment_status === "paid"
    ).length;

    const pending = purchases.filter(
        p => p.payment_status === "pending"
    ).length;

    const failed = purchases.filter(
        p => p.payment_status === "failed"
    ).length;

    const refunded = purchases.filter(
        p => p.payment_status === "refunded"
    ).length;

    const cards = [

        {
            label: "Paid",
            value: paid,
            color: "bg-green-500",
        },

        {
            label: "Pending",
            value: pending,
            color: "bg-yellow-500",
        },

        {
            label: "Failed",
            value: failed,
            color: "bg-red-500",
        },

        {
            label: "Refunded",
            value: refunded,
            color: "bg-purple-500",
        },

    ];

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">
                Payment Breakdown
            </h2>

            <div className="space-y-5">

                {cards.map(card => (

                    <div
                        key={card.label}
                    >

                        <div className="flex justify-between mb-2">

                            <span className="font-medium">
                                {card.label}
                            </span>

                            <span>
                                {card.value}
                            </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3">

                            <div
                                className={`${card.color} h-3 rounded-full`}
                                style={{
                                    width: `${purchases.length === 0
                                            ? 0
                                            : (card.value /
                                                purchases.length) *
                                            100
                                        }%`,
                                }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}