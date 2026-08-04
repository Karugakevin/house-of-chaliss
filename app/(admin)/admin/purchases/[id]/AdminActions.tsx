"use client";

import { useState } from "react";

interface Props {
  purchaseId: string;
  downloadToken: string | null;
}

export default function AdminActions({
  purchaseId,
  downloadToken,
}: Props) {

  const [loading, setLoading] = useState("");

  async function callApi(
    endpoint: string,
    successMessage: string
  ) {

    try {

      setLoading(endpoint);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purchaseId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      alert(successMessage);

      window.location.reload();

    } catch (error) {

      alert(
        error instanceof Error
          ? error.message
          : "Unexpected error."
      );

    } finally {

      setLoading("");

    }

  }

  async function copyLink() {

    if (!downloadToken) return;

    const url =
      `${window.location.origin}/download/${downloadToken}`;

    await navigator.clipboard.writeText(url);

    alert("Download link copied.");

  }

  return (

    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-semibold mb-8">
        Admin Actions
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <button
          onClick={() =>
            callApi(
              "/api/admin/resend-email",
              "Email resent successfully."
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
        >
          {loading === "/api/admin/resend-email"
            ? "Sending..."
            : "Resend Email"}
        </button>

        <button
          onClick={() =>
            callApi(
              "/api/admin/reset-downloads",
              "Downloads reset."
            )
          }
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-3"
        >
          {loading === "/api/admin/reset-downloads"
            ? "Resetting..."
            : "Reset Downloads"}
        </button>

        <button
          onClick={() =>
            callApi(
              "/api/admin/generate-new-token",
              "New download token generated."
            )
          }
          className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg py-3"
        >
          {loading === "/api/admin/generate-new-token"
            ? "Generating..."
            : "Generate New Token"}
        </button>

        <button
          onClick={() =>
            callApi(
              "/api/admin/extend-expiry",
              "Expiry extended."
            )
          }
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3"
        >
          {loading === "/api/admin/extend-expiry"
            ? "Updating..."
            : "Extend Expiry"}
        </button>

        <button
          onClick={copyLink}
          className="md:col-span-2 bg-[#1F2D3D] hover:bg-[#17202d] text-white rounded-lg py-3"
        >
          Copy Download Link
        </button>

      </div>

    </div>

  );

}