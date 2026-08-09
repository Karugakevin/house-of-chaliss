"use client";

import Papa from "papaparse";

interface Book {
    id: string;
    title: string;
    subtitle: string | null;
    author: string;
    price: number;
    published: boolean;
    created_at: string;
}

interface Props {
    books: Book[];
}

export default function ExportBooksButton({ books }: Props) {
    function exportCSV() {
        const csv = Papa.unparse(
            books.map((book) => ({
                Title: book.title,
                Subtitle: book.subtitle ?? "",
                Author: book.author,
                Price: book.price,
                Published: book.published ? "Yes" : "No",
                Created: new Date(book.created_at).toLocaleDateString(),
            }))
        );

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "books.csv";

        link.click();

        URL.revokeObjectURL(url);
    }

    return (
        <button
            onClick={exportCSV}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium"
        >
            Export CSV
        </button>
    );
}