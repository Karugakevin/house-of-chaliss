"use client";

import Papa from "papaparse";

interface Purchase {
    id: string;
    amount: number;
    payment_status: string | null;
    transaction_id: string | null;
    purchased_at: string;

    customers: {
        name: string;
        email: string;
    } | null;

    books: {
        title: string;
    } | null;
}

interface Props {
    purchases: Purchase[] | null;
}

export default function ExportPaymentsButton({
    purchases,
}: Props) {
    function exportCSV() {
        const rows = (purchases ?? []).map((purchase) => ({
            Order: purchase.id,
            Customer: purchase.customers?.name ?? "",
            Email: purchase.customers?.email ?? "",
            Book: purchase.books?.title ?? "",
            Amount: purchase.amount,
            Status: purchase.payment_status ?? "",
            Transaction: purchase.transaction_id ?? "",
            Date: new Date(
                purchase.purchased_at
            ).toLocaleDateString(),
        }));

        const csv = Papa.unparse(rows);

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "payments.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    return (
        <button
            onClick={exportCSV}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition"
        >
            Export CSV
        </button>
    );
}