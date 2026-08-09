import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/is-admin";
import supabaseAdmin from "@/lib/supabase-admin";

import DashboardCard from "./DashboardCard";
import RecentPurchases from "./RecentPurchases";
import TopSellingBooks from "./TopSellingBooks";
import RevenueChart from "./components/RevenueChart";

export default async function AdminDashboard() {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const supabase = supabaseAdmin;
  const today = new Date();
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
    
  const revenueTotal =
    (purchases ?? []).reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

  const averageOrderValue =
    purchases && purchases.length > 0
      ? revenueTotal / purchases.length
      : 0;

  const revenueThisYear =
    (purchases ?? [])
      .filter((purchase) => {

        const date = new Date(
          purchase.purchased_at
        );

        return (
          date.getFullYear() ===
          today.getFullYear()
        );

      })
      .reduce(
        (sum, purchase) =>
          sum + purchase.amount,
        0
      );

  const revenueThisWeek =
    (purchases ?? [])
      .filter((purchase) => {

        const date = new Date(
          purchase.purchased_at
        );

        const diff =
          today.getTime() -
          date.getTime();

        return (
          diff <=
          7 * 24 * 60 * 60 * 1000
        );

      })
      .reduce(
        (sum, purchase) =>
          sum + purchase.amount,
        0
      );

  const topBooks =
    (books ?? [])
      .map((book) => {

        const sales =
          (purchases ?? []).filter(
            purchase =>
              purchase.book_id === book.id
          );

        const revenue =
          sales.reduce(
            (sum, purchase) =>
              sum + purchase.amount,
            0
          );

        return {
          ...book,
          sales: sales.length,
          revenue,
        };

      })
      .sort(
        (a, b) =>
          b.sales - a.sales
      )
      .slice(0, 5);

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
  
  const revenueByMonth =
    Array.from({ length: 12 }, (_, month) => {

      const revenue =
        (purchases ?? [])
          .filter((purchase: any) => {

            const date =
              new Date(
                purchase.purchased_at
              );

            return (
              date.getMonth() === month &&
              date.getFullYear() ===
              today.getFullYear()
            );

          })
          .reduce(
            (sum: number, purchase: any) =>
              sum + purchase.amount,
            0
          );

      return {

        month: new Date(
          today.getFullYear(),
          month,
          1
        ).toLocaleString(
          "default",
          {
            month: "short",
          }
        ),

        revenue,

      };

    });
  const newCustomersThisMonth =
    (customers ?? []).filter((customer: any) => {
      const date = new Date(customer.created_at);

      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });

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
        <DashboardCard
          title="Revenue This Week"
          value={`KES ${revenueThisWeek.toLocaleString()}`}
          color="orange"
        />
        <DashboardCard
          title="Revenue This Year"
          value={`KES ${revenueThisYear.toLocaleString()}`}
          color="emerald"
        />
        <DashboardCard
          title="Average Order Value"
          value={`KES ${averageOrderValue.toLocaleString()}`}
          color="pink"
        />

        <DashboardCard
          title="Total Revenue"
          value={`KES ${revenueTotal.toLocaleString()}`}
          color="indigo"
        />

      </div>

      <RevenueChart
        data={revenueByMonth}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Revenue Summary */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Revenue Overview
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Revenue</span>

              <span className="font-bold">
                KES {revenueTotal.toLocaleString()}
              </span>

            </div>

            <div className="flex justify-between">

              <span>This Month</span>

              <span className="font-bold">
                KES {revenueThisMonth.toLocaleString()}
              </span>

            </div>

            <div className="flex justify-between">

              <span>This Week</span>

              <span className="font-bold">
                KES {revenueThisWeek.toLocaleString()}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Today</span>

              <span className="font-bold">
                KES {revenueToday.toLocaleString()}
              </span>

            </div>

          </div>

        </div>

        {/* Top Books */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Top Selling Books
          </h2>

          <div className="space-y-4">

            {topBooks.map(book => (

              <div
                key={book.id}
                className="flex justify-between"
              >

                <div>

                  <div className="font-medium">
                    {book.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {book.sales} sales
                  </div>

                </div>

                <div className="font-semibold text-green-700">
                  KES {book.revenue.toLocaleString()}
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Customer Activity */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Customer Activity
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Customers</span>

              <span className="font-bold">
                {customers?.length ?? 0}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Joined This Month</span>

              <span className="font-bold">
                {newCustomersThisMonth.length}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Total Purchases</span>

              <span className="font-bold">
                {purchases?.length ?? 0}
              </span>

            </div>

          </div>

        </div>

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