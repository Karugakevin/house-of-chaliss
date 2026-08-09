interface Props {
    purchases: any[];
}

export default function TopBooks({
    purchases,
}: Props) {

    const salesMap = new Map<
        string,
        {
            title: string;
            sales: number;
            revenue: number;
        }
    >();

    purchases
        .filter(
            purchase =>
                purchase.payment_status === "paid"
        )
        .forEach((purchase) => {

            const title =
                purchase.books?.title ??
                "Unknown Book";

            if (!salesMap.has(title)) {

                salesMap.set(title, {
                    title,
                    sales: 0,
                    revenue: 0,
                });

            }

            const book = salesMap.get(title)!;

            book.sales += 1;

            book.revenue += Number(
                purchase.amount
            );

        });

    const topBooks = [...salesMap.values()]
        .sort(
            (a, b) => b.sales - a.sales
        )
        .slice(0, 5);

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">
                Top Selling Books
            </h2>

            {topBooks.length === 0 ? (

                <div className="text-center text-gray-500 py-10">

                    No sales available.

                </div>

            ) : (

                <div className="space-y-5">

                    {topBooks.map(
                        (book, index) => (

                            <div
                                key={book.title}
                                className="flex justify-between items-center border-b pb-4"
                            >

                                <div>

                                    <p className="font-semibold">

                                        #{index + 1}{" "}
                                        {book.title}

                                    </p>

                                    <p className="text-sm text-gray-500">

                                        {book.sales} sale
                                        {book.sales !== 1
                                            ? "s"
                                            : ""}

                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="font-bold">

                                        KES{" "}
                                        {book.revenue.toLocaleString()}

                                    </p>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );

}