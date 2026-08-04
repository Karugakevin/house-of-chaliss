"use client";

import { useTransition } from "react";
import { updateBook } from "./actions";

interface Props {
  book: any;
}

export default function EditBookForm({
  book,
}: Props) {

  const [pending, startTransition] =
    useTransition();

  return (

    <form
      action={(formData) =>
        startTransition(async () => {
          await updateBook(formData);
        })
      }
      className="bg-white rounded-2xl shadow p-8 space-y-6"
    >

      <input
        type="hidden"
        name="id"
        defaultValue={book.id}
      />

      <h2 className="text-2xl font-semibold">
        Edit Book
      </h2>

      <div>

        <label className="block mb-2 font-medium">
          Title
        </label>

        <input
          name="title"
          defaultValue={book.title}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block mb-2 font-medium">
          Subtitle
        </label>

        <input
          name="subtitle"
          defaultValue={book.subtitle}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block mb-2 font-medium">
          Author
        </label>

        <input
          name="author"
          defaultValue={book.author}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block mb-2 font-medium">
          Price
        </label>

        <input
          type="number"
          step="0.01"
          name="price"
          defaultValue={book.price}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows={8}
          name="description"
          defaultValue={book.description}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={book.published}
        />

        <span>
          Published
        </span>

      </div>

      <button
        disabled={pending}
        className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg"
      >

        {pending
          ? "Saving..."
          : "Save Changes"}

      </button>

    </form>

  );

}