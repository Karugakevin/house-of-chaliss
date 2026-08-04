interface Purchase {
  payment_status: string;
  amount: number;
  transaction_id: string | null;
  api_ref: string;
  invoice_id: string | null;
  purchased_at: string;
  failed_reason: string | null;
}

interface PaymentCardProps {
  purchase: Purchase;
}

export default function PaymentCard({
  purchase,
}: PaymentCardProps) {

  const status = purchase.payment_status.toLowerCase();

  let badge =
    "bg-gray-100 text-gray-700";

  if (status === "paid") {
    badge =
      "bg-green-100 text-green-700";
  }

  if (status === "pending") {
    badge =
      "bg-yellow-100 text-yellow-700";
  }

  if (status === "failed") {
    badge =
      "bg-red-100 text-red-700";
  }

  if (status === "processing") {
    badge =
      "bg-blue-100 text-blue-700";
  }

  return (

    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-semibold mb-8">
        Payment
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Payment Status
          </p>

          <span
            className={`inline-block mt-2 px-4 py-2 rounded-full font-semibold ${badge}`}
          >
            {purchase.payment_status}
          </span>

        </div>

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Amount
          </p>

          <p className="mt-2 text-lg font-semibold text-green-700">
            KES {purchase.amount}
          </p>

        </div>

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Transaction ID
          </p>

          <p className="mt-2 break-all">
            {purchase.transaction_id ?? "-"}
          </p>

        </div>

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Invoice ID
          </p>

          <p className="mt-2 break-all">
            {purchase.invoice_id ?? "-"}
          </p>

        </div>

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            API Reference
          </p>

          <p className="mt-2 break-all">
            {purchase.api_ref}
          </p>

        </div>

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Purchased
          </p>

          <p className="mt-2">
            {new Date(
              purchase.purchased_at
            ).toLocaleString()}
          </p>

        </div>

      </div>

      {purchase.failed_reason && (

        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">

          <p className="font-semibold text-red-700">
            Failure Reason
          </p>

          <p className="mt-2 text-red-600">
            {purchase.failed_reason}
          </p>

        </div>

      )}

    </div>

  );
}