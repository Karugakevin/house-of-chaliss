"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface Props {
  purchaseId: string;
}

export default function PurchaseActions({
  purchaseId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function runAction(
    endpoint: string,
    body: object
  ) {
    setLoading(endpoint);
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
        return;
      }

      setMessage(data.message);

      // Refresh purchase information
      startTransition(() => {
        router.refresh();
      });

    } catch (error) {
      console.error(error);
      setMessage("Unable to contact the server.");
    } finally {
      setLoading("");
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Admin Actions
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {/* Resend Email */}

        <button
          onClick={() =>
            runAction(
              "/api/admin/resend-email",
              {
                purchaseId,
              }
            )
          }
          disabled={
            loading !== "" || isPending
          }
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg py-4 font-semibold"
        >
          {loading === "/api/admin/resend-email"
            ? "Sending..."
            : "📧 Resend Purchase Email"}
        </button>

        {/* Generate Token */}

        <button
          onClick={() =>
            runAction(
              "/api/admin/generate-new-token",
              {
                purchaseId,
              }
            )
          }
          disabled={
            loading !== "" || isPending
          }
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg py-4 font-semibold"
        >
          {loading === "/api/admin/generate-new-token"
            ? "Generating..."
            : "🔄 Generate New Download Link"}
        </button>

        {/* Reset Downloads */}

        <button
          onClick={() =>
            runAction(
              "/api/admin/reset-downloads",
              {
                purchaseId,
              }
            )
          }
          disabled={
            loading !== "" || isPending
          }
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg py-4 font-semibold"
        >
          {loading === "/api/admin/reset-downloads"
            ? "Resetting..."
            : "♻ Reset Download Counter"}
        </button>

        {/* Extend Expiry */}

        <button
          onClick={() =>
            runAction(
              "/api/admin/extend-expiry",
              {
                purchaseId,
                hours: 24,
              }
            )
          }
          disabled={
            loading !== "" || isPending
          }
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-lg py-4 font-semibold"
        >
          {loading === "/api/admin/extend-expiry"
            ? "Extending..."
            : "⏰ Extend by 24 Hours"}
        </button>

      </div>

      {message && (
        <div className="mt-6 rounded-lg bg-gray-100 border p-4">
          {message}
        </div>
      )}

    </div>
  );
}