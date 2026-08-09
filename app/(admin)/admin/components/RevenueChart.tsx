"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

interface Props {
    data: {
        month: string;
        revenue: number;
    }[];
}

export default function RevenueChart({
    data,
}: Props) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">

                Revenue Trend

            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}