"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = [
  {
    label: "All Customers",
    value: "all",
  },
  {
    label: "Paying Customers",
    value: "paying",
  },
  {
    label: "No Purchases",
    value: "none",
  },
  {
    label: "Highest Spending",
    value: "highest",
  },
  {
    label: "Newest",
    value: "newest",
  },
];

export default function CustomerFilters() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const current =
    searchParams.get("filter") ?? "all";

  function setFilter(filter: string) {

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }

    router.replace(
      `/admin/customers?${params.toString()}`
    );

  }

  return (

    <div className="flex flex-wrap gap-3">

      {filters.map((filter) => {

        const active =
          current === filter.value;

        return (

          <button
            key={filter.value}
            onClick={() =>
              setFilter(filter.value)
            }
            className={`rounded-full px-5 py-2 font-medium transition ${
              active
                ? "bg-amber-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {filter.label}
          </button>

        );

      })}

    </div>

  );

}