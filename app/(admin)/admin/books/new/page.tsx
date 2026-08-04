import AddBookForm from "./AddBookForm";

export default function NewBookPage() {

  return (

    <div className="max-w-4xl mx-auto space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#1F2D3D]">
          Add New Book
        </h1>

        <p className="text-gray-500 mt-2">
          Create a new book for your bookstore.
        </p>

      </div>

      <AddBookForm />

    </div>

  );

}