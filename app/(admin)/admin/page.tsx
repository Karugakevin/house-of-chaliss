import supabaseAdmin from "@/lib/supabase-admin";

import DashboardCard from "./DashboardCard";
import RecentPurchases from "./RecentPurchases";
import TopSellingBooks from "./TopSellingBooks";

export default async function AdminDashboard() {
  const supabase = supabaseAdmin;

  // Purchases
  const { data: purchases } = await supabase
    .from("purchases")
    .select("*")
    .order("purchased_at", {
      ascending: false,
    });

  // Customers
  const { data: customers } = await supabase
    .from("customers")
    .select("*");

  // Books
  const { data: books } = await supabase
    .from("books")
    .select("*");

  const today = new Date();

  const revenueToday = (purchases ?? [])
    .filter((purchase: any) => {
      const date = new Date(purchase.purchased_at);

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce(
      (sum: number, purchase: any) =>
        sum + purchase.amount,
      0
    );

  const revenueThisMonth = (purchases ?? [])
    .filter((purchase: any) => {
      const date = new Date(purchase.purchased_at);

      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce(
      (sum: number, purchase: any) =>
        sum + purchase.amount,
      0
    );

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#1F2D3D]">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of your bookstore.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Revenue Today"
          value={`KES ${revenueToday.toLocaleString()}`}
          color="green"
        />

        <DashboardCard
          title="Revenue This Month"
          value={`KES ${revenueThisMonth.toLocaleString()}`}
          color="amber"
        />

        <DashboardCard
          title="Total Purchases"
          value={purchases?.length ?? 0}
          color="blue"
        />

        <DashboardCard
          title="Customers"
          value={customers?.length ?? 0}
          color="purple"
        />

      </div>

      {/* Recent Purchases */}

      <RecentPurchases
        purchases={(purchases ?? []).slice(0, 10)}
        customers={customers ?? []}
        books={books ?? []}
      />

      {/* Top Selling Books */}

      <TopSellingBooks
        books={books ?? []}
        purchases={purchases ?? []}
      />

    </div>
  );
}