import { books } from "../../data/books";
import BookCard from "../../components/BookCard";
import SectionTitle from "../../components/SectionTitle";

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-[#F7F2EB] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <SectionTitle
          subtitle="BOOK COLLECTION"
          title="The House of Chaliss Series"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}

        </div>

      </div>

    </main>
  );
}