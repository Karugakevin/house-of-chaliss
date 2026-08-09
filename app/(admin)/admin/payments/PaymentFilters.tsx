interface Props {
    search?: string;
    status?: string;
}

export default function PaymentFilters({
    search = "",
    status = "all",
}: Props) {
    return (
        <form
            className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-4"
            method="GET"
        >
            <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search customer, email, book or transaction..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3"
            />

            <select
                name="status"
                defaultValue={status}
                className="rounded-lg border border-gray-300 px-4 py-3"
            >
                <option value="all">
                    All Statuses
                </option>

                <option value="paid">
                    Paid
                </option>

                <option value="pending">
                    Pending
                </option>

                <option value="failed">
                    Failed
                </option>

                <option value="refunded">
                    Refunded
                </option>
            </select>

            <button
                type="submit"
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold"
            >
                Filter
            </button>
        </form>
    );
}