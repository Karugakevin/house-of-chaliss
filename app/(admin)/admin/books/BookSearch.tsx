"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function BookSearch() {
    const router = useRouter();
    const params = useSearchParams();

    const [isPending, startTransition] = useTransition();

    return (
        <input
            type="text"
            defaultValue={params.get("search") ?? ""}
            placeholder="Search books..."
            className="border rounded-lg px-4 py-3 w-80"
            onChange={(e) => {
                const value = e.target.value;

                startTransition(() => {
                    const query = new URLSearchParams(params);

                    if (value) {
                        query.set("search", value);
                    } else {
                        query.delete("search");
                    }

                    router.push(`/admin/books?${query.toString()}`);
                });
            }}
            disabled={isPending}
        />
    );
}