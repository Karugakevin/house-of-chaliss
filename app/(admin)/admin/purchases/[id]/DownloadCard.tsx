"use client";

import { useState } from "react";

interface DownloadToken {
  token: string;
  downloads: number;
  expires_at: string;
}

interface DownloadCardProps {
  token: DownloadToken | null;
  maxDownloads?: number;
}

export default function DownloadCard({
  token,
  maxDownloads = 3,
}: DownloadCardProps) {

  const [copied, setCopied] = useState(false);

  if (!token) {
    return (
      <div className="bg-white rounded-2xl shadow p-8">

        <h2 className="text-xl font-semibold mb-6">
          Download
        </h2>

        <p className="text-gray-500">
          No download token available.
        </p>

      </div>
    );
  }

  const downloadsRemaining =
    Math.max(0, maxDownloads - token.downloads);

  const maskedToken =
    token.token.length > 8
      ? "************" + token.token.slice(-8)
      : token.token;

  const downloadUrl =
    `${process.env.NEXT_PUBLIC_SITE_URL}/download/${token.token}`;

  async function copyLink() {

    await navigator.clipboard.writeText(downloadUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  }

  return (

    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-semibold mb-8">
        Download
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Token
          </p>

          <p className="mt-2 font-mono break-all">
            {maskedToken}
          </p>

        </div>

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Expires
          </p>

          <p className="mt-2">
            {new Date(token.expires_at).toLocaleString()}
          </p>

        </div>

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Downloads Used
          </p>

          <p className="mt-2 text-lg font-semibold">
            {token.downloads}
          </p>

        </div>

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-500">
            Downloads Remaining
          </p>

          <p className="mt-2 text-lg font-semibold text-green-700">
            {downloadsRemaining}
          </p>

        </div>

      </div>

      <div className="mt-8">

        <p className="text-sm uppercase tracking-wide text-gray-500 mb-3">
          Secure Download Link
        </p>

        <div className="flex gap-3">

          <input
            readOnly
            value={downloadUrl}
            className="flex-1 rounded-lg border px-4 py-3 bg-gray-50"
          />

          <button
            onClick={copyLink}
            className="bg-[#1F2D3D] hover:bg-[#15212c] text-white px-6 rounded-lg transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

        </div>

      </div>

    </div>

  );
}