export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  genre: string[];
  ageRating: string;
  price: number;
  cover: string;
  description: string;
  available: boolean;
}

export const books: Book[] = [
  {
    id: "book-1",
    title: "House of Chaliss",
    subtitle: "Experience of Being Kevo",
    author: "Kevo",
    genre: [
      "Romance",
      "Mystery",
      "Young Adult",
      "Thriller",
    ],
    ageRating: "18+",
    price: 650,
    cover: "/cover.jpg",
    description:
      "A captivating journey through love, mystery, hidden truths and unexpected choices.",
    available: true,
  },

  {
    id: "book-2",
    title: "House of Chaliss",
    subtitle: "Book Two",
    author: "Kevo",
    genre: [],
    ageRating: "18+",
    price: 650,
    cover: "/cover2.jpg",
    description: "",
    available: false,
  },

  {
    id: "book-3",
    title: "House of Chaliss",
    subtitle: "Book Three",
    author: "Kevo",
    genre: [],
    ageRating: "18+",
    price: 650,
    cover: "/cover3.jpg",
    description: "",
    available: false,
  },

  {
    id: "book-4",
    title: "House of Chaliss",
    subtitle: "Book Four",
    author: "Kevo",
    genre: [],
    ageRating: "18+",
    price: 650,
    cover: "/cover4.jpg",
    description: "",
    available: false,
  },

  {
    id: "book-5",
    title: "House of Chaliss",
    subtitle: "Book Five",
    author: "Kevo",
    genre: [],
    ageRating: "18+",
    price: 650,
    cover: "/cover5.jpg",
    description: "",
    available: false,
  },
];