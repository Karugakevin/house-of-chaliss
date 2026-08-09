"use client";

import { useState } from "react";

interface Props {
  id: string;
  pdfUrl: string | null;
}

export default function UploadPdf({
  id,
  pdfUrl,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setMessage("");
    setError("");

    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("bookId", id);

      const response = await fetch(
        "/api/admin/upload-pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message ?? "PDF upload failed."
        );
        return;
      }

      setMessage("PDF uploaded successfully.");

      e.target.value = "";

      // Refresh the page so pdfUrl updates
      window.location.reload();

    } catch (error) {
      console.error(error);

      setError(
        "Unable to upload PDF. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-[#1F2D3D]">
        eBook PDF
      </h3>

      <p className="text-gray-500 mt-2">
        Upload the PDF file customers will receive
        after purchase.
      </p>

      {pdfUrl && (
        <div className="mt-5 rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-green-700 font-semibold">
            ✓ PDF uploaded
          </p>

          <p className="text-sm text-green-600 mt-1">
            {pdfUrl}
          </p>
        </div>
      )}

      <div className="mt-6">
        <label className="block font-medium mb-2">
          Select PDF
        </label>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          disabled={loading}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {loading && (
        <p className="mt-4 text-amber-700 font-medium">
          Uploading PDF...
        </p>
      )}

      {message && (
        <p className="mt-4 text-green-700 font-medium">
          {message}
        </p>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          {error}
        </div>
      )}
    </div>
  );
}