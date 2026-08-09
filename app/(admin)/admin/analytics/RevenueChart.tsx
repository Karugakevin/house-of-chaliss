"use client";

import { useMemo, useState } from "react";

interface Props {
    purchases: any[];
}

export default function RevenueChart({
    purchases,
}: Props) {

    const currencies = useMemo(() => {

        const unique = new Set<string>();

        purchases.forEach((purchase) => {
            unique.add(
                purchase.currency ?? "KES"
            );
        });

        return [...unique].sort();

    }, [purchases]);

    const [currency, setCurrency] = useState(
        currencies[0] ?? "KES"
    );

    const monthlyRevenue = useMemo(() => {

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const totals = Array(12).fill(0);

        purchases.forEach((purchase) => {

            if (
                purchase.payment_status !== "paid"
            ) {
                return;
            }

            if (
                (purchase.currency ?? "KES") !==
                currency
            ) {
                return;
            }

            const month = new Date(
                purchase.purchased_at
            ).getMonth();

            totals[month] += Number(
                purchase.amount
            );

        });

        return months.map(
            (month, index) => ({
                month,
                revenue: totals[index],
            })
        );

    }, [currency, purchases]);

    const maxRevenue = Math.max(
        ...monthlyRevenue.map(
            item => item.revenue
        ),
        1
    );

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold">
                    Monthly Revenue
                </h2>

                <select
                    value={currency}
                    onChange={(e) =>
                        setCurrency(
                            e.target.value
                        )
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2"
                >

                    {currencies.map(
                        (currency) => (

                            <option
                                key={currency}
                                value={currency}
                            >
                                {currency}
                            </option>

                        )
                    )}

                </select>

            </div>

            <div className="space-y-4">

                {monthlyRevenue.map(
                    (item) => (

                        <div
                            key={item.month}
                        >

                            <div className="flex justify-between mb-1">

                                <span className="text-sm font-medium">
                                    {item.month}
                                </span>

                                <span className="text-sm text-gray-500">

                                    {currency}{" "}

                                    {item.revenue.toLocaleString()}

                                </span>

                            </div>

                            <div className="h-3 rounded-full bg-gray-200">

                                <div
                                    className="h-3 rounded-full bg-amber-700 transition-all"
                                    style={{
                                        width: `${(item.revenue /
                                                maxRevenue) *
                                            100
                                            }%`,
                                    }}
                                />

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>

    );

}