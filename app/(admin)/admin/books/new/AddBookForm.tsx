"use client";

import { useState } from "react";

export default function AddBookForm() {

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);

    const form =
      new FormData(e.currentTarget);

    const response =
      await fetch(
        "/api/admin/create-book",
        {
          method: "POST",
          body: form,
        }
      );

    setLoading(false);

    if (response.ok) {

      window.location.href =
        "/admin/books";

    } else {

      alert("Unable to create book.");

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-8 space-y-6"
    >

      <input
        name="title"
        placeholder="Title"
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="subtitle"
        placeholder="Subtitle"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="author"
        placeholder="Author"
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        name="description"
        rows={6}
        placeholder="Description"
        className="w-full border rounded-lg p-3"
      />

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          name="published"
        />

        Published

      </label>

      <button
        disabled={loading}
        className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg"
      >

        {loading
          ? "Creating..."
          : "Create Book"}

      </button>

    </form>

  );

}