"use client";

import { useRef, useState } from "react";

interface Props {
  bookId: string;
  currentCover: string | null;
}

export default function CoverUploader({
  bookId,
  currentCover,
}: Props) {

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function upload() {

    const file =
      inputRef.current?.files?.[0];

    if (!file) return;

    setUploading(true);

    const form = new FormData();

    form.append("bookId", bookId);

    form.append("cover", file);

    const response =
      await fetch(
        "/api/admin/upload-cover",
        {
          method: "POST",
          body: form,
        }
      );

    setUploading(false);

    if (response.ok) {

      location.reload();

    } else {

      alert("Upload failed.");

    }

  }

  return (

    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-semibold mb-6">
        Cover Image
      </h2>

      {currentCover ? (

        <img
          src={currentCover}
          alt=""
          className="w-48 rounded-lg border mb-6"
        />

      ) : (

        <div className="w-48 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6 text-gray-400">

          No Cover

        </div>

      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
      />

      <button
        onClick={upload}
        disabled={uploading}
        className="mt-5 bg-amber-700 hover:bg-amber-800 text-white px-5 py-3 rounded-lg"
      >

        {uploading
          ? "Uploading..."
          : "Upload Cover"}

      </button>

    </div>

  );

}