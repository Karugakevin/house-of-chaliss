"use client";

import { useTransition } from "react";

interface Props {
  id: string;
  published: boolean;
}

export default function PublishToggle({
  id,
  published,
}: Props) {

  const [pending, startTransition] =
    useTransition();

  function toggle() {

    startTransition(async () => {

      await fetch(
        "/api/admin/toggle-book-status",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            published: !published,
          }),
        }
      );

      location.reload();

    });

  }

  return (

    <button
      onClick={toggle}
      disabled={pending}
      className={`px-4 py-2 rounded-lg text-white font-medium ${
        published
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >

      {pending
        ? "Saving..."
        : published
        ? "Unpublish"
        : "Publish"}

    </button>

  );

}