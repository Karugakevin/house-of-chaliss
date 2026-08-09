"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function BookStatusFilter() {
    const router = useRouter();
    const params = useSearchParams();

    return (
        <select
            defaultValue={params.get("status") ?? "all"}
            className="border rounded-lg px-4 py-3"
            onChange={(e) => {
                const query = new URLSearchParams(params);

                if (e.target.value === "all") {
                    query.delete("status");
                } else {
                    query.set("status", e.target.value);
                }

                router.push(`/admin/books?${query.toString()}`);
            }}
        >
            <option value="all">All Books</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
        </select>
    );
}