"use client";

import { useState, useTransition } from "react";
import { uploadPdf } from "./actions";

interface Props {
  id: string;
  pdfUrl: string | null;
}

export default function UploadPdf({
  id,
  pdfUrl,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  const [file, setFile] =
    useState<File | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-semibold mb-6">
        Book PDF
      </h2>

      {pdfUrl && (

        <a
          href={pdfUrl}
          target="_blank"
          className="text-amber-700 underline"
        >
          View Current PDF
        </a>

      )}

      <input
        type="file"
        accept=".pdf"
        className="mt-6 block"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] ?? null
          )
        }
      />

      <button
        disabled={pending || !file}
        onClick={() =>
          startTransition(async () => {

            if (!file) return;

            const formData =
              new FormData();

            formData.append("id", id);
            formData.append("pdf", file);

            await uploadPdf(formData);

          })
        }
        className="mt-6 bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {pending
          ? "Uploading..."
          : "Upload PDF"}
      </button>

    </div>
  );
}