"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DownloadPage() {
  const { token } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function downloadBook() {
      try {
        const response = await fetch(`/api/download/${token}`);

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Unable to download your eBook.");
          router.push("/");
          return;
        }

        window.location.href = data.url;
      } catch (error) {
        console.error(error);
        alert("Unable to prepare your download.");
        router.push("/");
      }
    }

    downloadBook();
  }, [token, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F2EB]">
      <div className="text-center">
        <div className="text-6xl animate-pulse">📖</div>

        <h1 className="text-4xl font-bold mt-8">
          Preparing your download...
        </h1>

        <p className="mt-4 text-gray-600">
          Please wait while we securely prepare your eBook.
        </p>
      </div>
    </main>
  );
}