import Link from "next/link";
import { notFound } from "next/navigation";
import supabaseAdmin from "@/lib/supabase-admin";
import CopyButton from "@/components/CopyButton";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

function statusBadge(status: string | null) {
    switch (status?.toLowerCase()) {
        case "paid":
            return "bg-green-100 text-green-700";

        case "pending":
            return "bg-yellow-100 text-yellow-700";

        case "failed":
            return "bg-red-100 text-red-700";

        case "refunded":
            return "bg-purple-100 text-purple-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
}

export default async function PaymentDetailsPage({
    params,
}: Props) {

    const { id } = await params;

    const { data: purchase, error } =
        await supabaseAdmin
            .from("purchases")
            .select(`
                *,
                customers(*),
                books(*)
            `)
            .eq("id", id)
            .single();

    if (error || !purchase) {
        notFound();
    }

    return (

        <div className="space-y-8">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-[#1F2D3D]">
                        Payment Details
                    </h1>

                    <div className="flex items-center gap-4 mt-3">

                        <p className="text-gray-500">
                            Payment #{purchase.id.slice(0, 8)}
                        </p>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge(
                                purchase.payment_status
                            )}`}
                        >
                            {purchase.payment_status}
                        </span>

                    </div>

                </div>

                <Link
                    href="/admin/payments"
                    className="rounded-lg bg-gray-200 hover:bg-gray-300 px-5 py-3"
                >
                    ← Back
                </Link>

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Customer */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Customer Information
                    </h2>

                    <div className="space-y-4">

                        <div>

                            <p className="text-gray-500">
                                Name
                            </p>

                            <p className="font-semibold">
                                {purchase.customers?.name ?? "-"}
                            </p>

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Email
                            </p>

                            <p className="font-semibold">
                                {purchase.customers?.email ?? "-"}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Book */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Book Information
                    </h2>

                    <div className="space-y-4">

                        <div>

                            <p className="text-gray-500">
                                Book
                            </p>

                            <p className="font-semibold">
                                {purchase.books?.title}
                            </p>

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Amount Paid
                            </p>

                            <p className="font-bold text-xl">
                                KES {purchase.amount.toLocaleString()}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Payment */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Payment Information
                    </h2>

                    <div className="space-y-5">

                        <div className="flex justify-between">

                            <span>Status</span>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge(
                                    purchase.payment_status
                                )}`}
                            >
                                {purchase.payment_status}
                            </span>

                        </div>

                        <div className="flex justify-between items-center">

                            <span>Transaction ID</span>

                            <div className="flex gap-3 items-center">

                                <span className="font-mono">
                                    {purchase.transaction_id ?? "-"}
                                </span>

                                {purchase.transaction_id && (

                                    <CopyButton
                                        value={purchase.transaction_id}
                                    />

                                )}

                            </div>

                        </div>

                        <div className="flex justify-between">

                            <span>API Reference</span>

                            <span className="font-mono">
                                {purchase.api_ref ?? "-"}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Invoice ID</span>

                            <span>
                                {purchase.invoice_id ?? "-"}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Currency</span>

                            <span>
                                {purchase.currency ?? "KES"}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Invoice Information */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Invoice Information
                    </h2>

                    <div className="space-y-5">

                        <div className="flex justify-between">

                            <span>Invoice Number</span>

                            <span className="font-semibold">
                                {purchase.invoice_id ?? "-"}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Purchase Date</span>

                            <span>
                                {new Date(
                                    purchase.purchased_at
                                ).toLocaleString()}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Amount</span>

                            <span className="font-semibold">
                                KES {purchase.amount.toLocaleString()}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Payment Status</span>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge(
                                    purchase.payment_status
                                )}`}
                            >
                                {purchase.payment_status}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Download Information */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Download Information
                    </h2>

                    <div className="space-y-5">

                        <div className="flex justify-between">

                            <span>Email Sent</span>

                            <span>
                                {purchase.email_sent
                                    ? "✅ Sent"
                                    : "❌ Not Sent"}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Download Available</span>

                            <span>
                                {purchase.download_token
                                    ? "Yes"
                                    : "No"}
                            </span>

                        </div>

                        <div>

                            <p className="text-gray-500 mb-3">
                                Download Token
                            </p>

                            <div className="flex gap-3 items-start">

                                <div className="flex-1 rounded-lg bg-gray-100 p-3 font-mono text-sm break-all">

                                    {purchase.download_token
                                        ? `${purchase.download_token.substring(
                                            0,
                                            40
                                        )}...`
                                        : "-"}

                                </div>

                                {purchase.download_token && (

                                    <CopyButton
                                        value={purchase.download_token}
                                    />

                                )}

                            </div>

                        </div>

                        {purchase.failed_reason && (

                            <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                                <h3 className="font-semibold text-red-700">
                                    Failure Reason
                                </h3>

                                <p className="mt-2 text-red-600">
                                    {purchase.failed_reason}
                                </p>

                            </div>

                        )}

                    </div>

                </div>

                {/* Purchase Timeline */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Purchase Timeline
                    </h2>

                    <div className="space-y-5">

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-gray-500">
                                Purchase Created
                            </span>

                            <span>
                                {new Date(
                                    purchase.purchased_at
                                ).toLocaleString()}
                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-gray-500">
                                Payment Status
                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge(
                                    purchase.payment_status
                                )}`}
                            >
                                {purchase.payment_status}
                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-gray-500">
                                Receipt Email
                            </span>

                            <span>
                                {purchase.email_sent
                                    ? "Sent"
                                    : "Pending"}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">
                                Download Available
                            </span>

                            <span>
                                {purchase.download_token
                                    ? "Available"
                                    : "Unavailable"}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        <CopyButton
                            value={purchase.transaction_id ?? ""}
                        />

                        <CopyButton
                            value={purchase.download_token ?? ""}
                        />

                        <button
                            disabled
                            className="rounded-lg bg-gray-300 py-3 font-semibold text-gray-600 cursor-not-allowed"
                        >
                            Resend Receipt
                        </button>

                        <Link
                            href={`/api/invoice/${purchase.id}`}
                            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 text-center font-semibold transition"
                        >
                            Download Invoice
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );
}
