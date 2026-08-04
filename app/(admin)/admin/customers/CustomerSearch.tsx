"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomerSearch() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    searchParams.get("search") ?? ""
  );

  useEffect(() => {

    const timeout = setTimeout(() => {

      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (value.trim()) {

        params.set("search", value);

      } else {

        params.delete("search");

      }

      router.replace(
        `/admin/customers?${params.toString()}`
      );

    }, 400);

    return () => clearTimeout(timeout);

  }, [value]);

  return (

    <div className="relative max-w-lg">

      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search by name, email or phone..."
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 shadow-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none"
      />

    </div>

  );

}