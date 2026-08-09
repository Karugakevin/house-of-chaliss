import supabaseAdmin from "@/lib/supabase-admin";

export default async function OrdersPage() {
    const supabase = supabaseAdmin;

    const { data: purchases, error } = await supabase
        .from("purchases")
        .select("*")
        .order("purchased_at", {
            ascending: false,
        });

    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold text-[#1F2D3D]">
                        Orders
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View customer purchases and payment information.
                    </p>
                </div>

                <div className="bg-red-50 text-red-700 rounded-xl p-6">
                    <p className="font-semibold">
                        Unable to load orders.
                    </p>

                    <pre className="mt-3 text-sm overflow-auto">
                        {JSON.stringify(error, null, 2)}
                    </pre>
                </div>
            </div>
        );
    }

    const { data: customers } = await supabase
        .from("customers")
        .select("*");

    const { data: books } = await supabase
        .from("books")
        .select("*");

    const { data: downloadTokens } = await supabase
        .from("download_tokens")
        .select("*");

    const customerMap = new Map(
        (customers ?? []).map((customer) => [
            customer.id,
            customer,
        ])
    );

    const bookMap = new Map(
        (books ?? []).map((book) => [
            book.id,
            book,
        ])
    );

    const downloadTokenMap = new Map(
        (downloadTokens ?? []).map((token) => [
            token.purchase_id,
            token,
        ])
    );

    return (
        <div className="space-y-8">

            {/* HEADER */}

            <div>
                <h1 className="text-4xl font-bold text-[#1F2D3D]">
                    Orders
                </h1>

                <p className="text-gray-500 mt-2">
                    View customer purchases, payments and download information.
                </p>
            </div>


            {/* SUMMARY */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white rounded-2xl shadow p-6">
                    <p className="text-gray-500">
                        Total Orders
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        {purchases?.length ?? 0}
                    </p>
                </div>


                <div className="bg-white rounded-2xl shadow p-6">
                    <p className="text-gray-500">
                        Paid Orders
                    </p>

                    <p className="text-3xl font-bold text-green-700 mt-2">
                        {(purchases ?? []).filter(
                            (purchase) =>
                                purchase.payment_status === "paid"
                        ).length}
                    </p>
                </div>


                <div className="bg-white rounded-2xl shadow p-6">
                    <p className="text-gray-500">
                        Pending Orders
                    </p>

                    <p className="text-3xl font-bold text-amber-700 mt-2">
                        {(purchases ?? []).filter(
                            (purchase) =>
                                purchase.payment_status !== "paid"
                        ).length}
                    </p>
                </div>

            </div>


            {/* ORDERS TABLE */}

            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1500px]">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="px-5 py-4 text-left">
                                    Customer
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Book
                                </th>

                                <th className="px-5 py-4 text-right">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-center">
                                    Payment
                                </th>

                                <th className="px-5 py-4 text-left">
                                    IntaSend Reference
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Transaction ID
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Purchase Date
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Download Token
                                </th>

                                <th className="px-5 py-4 text-center">
                                    Email
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {(purchases ?? []).map((purchase) => {

                                const customer =
                                    customerMap.get(
                                        purchase.customer_id
                                    );

                                const book =
                                    bookMap.get(
                                        purchase.book_id
                                    );

                                const downloadToken =
                                    downloadTokenMap.get(
                                        purchase.id
                                    );

                                return (

                                    <tr
                                        key={purchase.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        {/* CUSTOMER */}

                                        <td className="px-5 py-5">

                                            <div className="font-semibold">
                                                {customer
                                                    ? `${customer.first_name ?? ""} ${customer.last_name ?? ""}`.trim()
                                                    : "Unknown Customer"}
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                {customer?.email ?? "No email"}
                                            </div>

                                            <div className="text-sm text-gray-400">
                                                {customer?.phone ?? ""}
                                            </div>

                                        </td>


                                        {/* BOOK */}

                                        <td className="px-5 py-5">

                                            <div className="font-semibold">
                                                {book?.title ?? "Unknown Book"}
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                {book?.author ?? ""}
                                            </div>

                                        </td>


                                        {/* AMOUNT */}

                                        <td className="px-5 py-5 text-right font-semibold">

                                            {purchase.currency ?? "KES"}{" "}
                                            {Number(
                                                purchase.amount ?? 0
                                            ).toLocaleString()}

                                        </td>


                                        {/* PAYMENT STATUS */}

                                        <td className="px-5 py-5 text-center">

                                            {purchase.payment_status === "paid" ? (

                                                <span className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
                                                    Paid
                                                </span>

                                            ) : purchase.payment_status === "failed" ? (

                                                <span className="inline-block bg-red-100 text-red-700 rounded-full px-3 py-1 text-sm font-semibold">
                                                    Failed
                                                </span>

                                            ) : purchase.payment_status === "processing" ? (

                                                <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">
                                                    Processing
                                                </span>

                                            ) : (

                                                <span className="inline-block bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-sm font-semibold">
                                                    {purchase.payment_status ?? "Pending"}
                                                </span>

                                            )}

                                        </td>


                                        {/* INTASEND REFERENCE */}

                                        <td className="px-5 py-5">

                                            <div className="font-mono text-xs break-all">
                                                {purchase.api_ref ?? "—"}
                                            </div>

                                            {purchase.invoice_id && (
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Invoice: {purchase.invoice_id}
                                                </div>
                                            )}

                                        </td>


                                        {/* TRANSACTION ID */}

                                        <td className="px-5 py-5">

                                            <span className="font-mono text-xs">
                                                {purchase.transaction_id ?? "—"}
                                            </span>

                                        </td>


                                        {/* PURCHASE DATE */}

                                        <td className="px-5 py-5 whitespace-nowrap">

                                            {purchase.purchased_at
                                                ? new Date(
                                                    purchase.purchased_at
                                                ).toLocaleString()
                                                : "—"}

                                        </td>


                                        {/* DOWNLOAD TOKEN */}

                                        <td className="px-5 py-5">

                                            {downloadToken ? (

                                                <div>

                                                    <div className="font-mono text-xs break-all">
                                                        {downloadToken.token}
                                                    </div>

                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Downloads:{" "}
                                                        {downloadToken.downloads ?? 0}
                                                    </div>

                                                    <div className="text-xs text-gray-500">
                                                        Expires:{" "}
                                                        {downloadToken.expires_at
                                                            ? new Date(
                                                                downloadToken.expires_at
                                                            ).toLocaleString()
                                                            : "—"}
                                                    </div>

                                                </div>

                                            ) : (

                                                <span className="text-gray-400">
                                                    No token
                                                </span>

                                            )}

                                        </td>


                                        {/* EMAIL STATUS */}

                                        <td className="px-5 py-5 text-center">

                                            {purchase.email_sent ? (

                                                <span className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
                                                    Sent
                                                </span>

                                            ) : (

                                                <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
                                                    Not Sent
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                );

                            })}


                            {(purchases ?? []).length === 0 && (

                                <tr>

                                    <td
                                        colSpan={9}
                                        className="py-16 text-center text-gray-500"
                                    >
                                        No orders found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}