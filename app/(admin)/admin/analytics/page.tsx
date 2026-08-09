import supabaseAdmin from "@/lib/supabase-admin";

import AnalyticsCards from "./AnalyticsCards";
import RevenueChart from "./RevenueChart";
import TopBooks from "./TopBooks";
import RecentPurchases from "./RecentPurchases";
import PaymentBreakdown from "./PaymentBreakdown";

export default async function AnalyticsPage() {

    const { data: purchases } = await supabaseAdmin
        .from("purchases")
        .select(`
            *,
            books(title),
            customers(name,email)
        `);

    const safePurchases = purchases ?? [];

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold text-[#1F2D3D]">
                    Analytics Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Sales performance, revenue and customer insights.
                </p>

            </div>

            <AnalyticsCards
                purchases={safePurchases}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <RevenueChart
                    purchases={safePurchases}
                />

                <PaymentBreakdown
                    purchases={safePurchases}
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <TopBooks
                    purchases={safePurchases}
                />

                <RecentPurchases
                    purchases={safePurchases}
                />

            </div>

        </div>

    );

}