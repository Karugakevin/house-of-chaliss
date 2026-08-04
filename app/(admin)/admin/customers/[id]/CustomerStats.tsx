interface Purchase {
  amount: number;
  book_id: string;
}

interface Props {
  purchases: Purchase[];
}

export default function CustomerStats({
  purchases,
}: Props) {

  const totalSpent =
    purchases.reduce(
      (sum, purchase) =>
        sum + purchase.amount,
      0
    );

  const books =
    new Set(
      purchases.map(
        purchase => purchase.book_id
      )
    ).size;

  return (

    <div className="grid md:grid-cols-3 gap-6">

      <StatCard
        title="Purchases"
        value={purchases.length}
      />

      <StatCard
        title="Books Owned"
        value={books}
      />

      <StatCard
        title="Lifetime Value"
        value={`KES ${totalSpent}`}
      />

    </div>

  );

}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {

  return (

    <div className="bg-white rounded-2xl shadow p-8">

      <p className="text-gray-500">

        {title}

      </p>

      <h2 className="text-4xl font-bold mt-4">

        {value}

      </h2>

    </div>

  );

}