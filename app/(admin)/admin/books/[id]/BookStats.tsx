interface Purchase {
  id: string;
  amount: number;
}

interface DownloadToken {
  id: string;
  book_id?: string;
  purchase_id: string;
  downloads: number;
}

interface BookStatsProps {
  book: any;
  purchases: Purchase[];
  downloadTokens: DownloadToken[];
}

export default function BookStats({
  purchases,
  downloadTokens,
}: BookStatsProps) {

  const totalSales = purchases.length;

  const totalRevenue = purchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0
  );

  const averageSale =
    totalSales > 0
      ? Math.round(totalRevenue / totalSales)
      : 0;

  const uniqueCustomers =
    new Set(
      purchases.map(
        (purchase: any) => purchase.customer_id
      )
    ).size;

  const purchaseIds =
    new Set(
      purchases.map(
        purchase => purchase.id
      )
    );

  const totalDownloads =
    downloadTokens
      .filter(
        token =>
          purchaseIds.has(token.purchase_id)
      )
      .reduce(
        (sum, token) =>
          sum + token.downloads,
        0
      );

  const stats = [

    {
      title: "Sales",
      value: totalSales,
      color: "text-blue-700",
    },

    {
      title: "Revenue",
      value: `KES ${totalRevenue.toLocaleString()}`,
      color: "text-green-700",
    },

    {
      title: "Customers",
      value: uniqueCustomers,
      color: "text-purple-700",
    },

    {
      title: "Downloads",
      value: totalDownloads,
      color: "text-amber-700",
    },

    {
      title: "Average Sale",
      value: `KES ${averageSale.toLocaleString()}`,
      color: "text-indigo-700",
    },

  ];

  return (

    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-2xl font-semibold mb-8">
        Book Statistics
      </h2>

      <div className="grid grid-cols-5 gap-6">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="rounded-xl border p-6 text-center"
          >

            <p className="text-sm text-gray-500">
              {stat.title}
            </p>

            <p
              className={`mt-3 text-3xl font-bold ${stat.color}`}
            >
              {stat.value}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}