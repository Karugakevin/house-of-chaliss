export interface Book {
    id: string;
    slug: string;
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
        slug: "house-of-chaliss",
        title: "House of Chaliss",
        subtitle: "Book One | Experience of Being Kevo",
        author: "Kevo",
        genre: [
            "Romance",
            "Mystery",
            "Young Adult"
        ],
        ageRating: "18+",
        price: 650,
        cover:
            "https://myvyefgzntuwaznshvyl.supabase.co/storage/v1/object/public/book-covers/book-1.jpg",
        description:
            "A captivating journey through love, mystery, hidden truths, emotional healing, and unexpected choices.",
        available: true,
    },

    {
        id: "book-2",
        slug: "house-of-chaliss-book-2",
        title: "House of Chaliss",
        subtitle: "Book Two",
        author: "Kevo",
        genre: [
            "Romance",
            "Drama",
            "Mystery",
        ],
        ageRating: "18+",
        price: 650,
        cover: "https://myvyefgzntuwaznshvyl.supabase.co/storage/v1/object/public/book-covers/book-2.jpg",
        description:
            "The story continues as new relationships, deeper secrets, and unexpected betrayals reshape the lives.",
        available: false,
    },

    {
        id: "book-3",
        slug: "house-of-chaliss-book-3",
        title: "House of Chaliss",
        subtitle: "Book Three",
        author: "Kevo",
        genre: [
            "Romance",
            "Thriller",
            "Drama",
        ],
        ageRating: "18+",
        price: 650,
        cover: "https://myvyefgzntuwaznshvyl.supabase.co/storage/v1/object/public/book-covers/book-3.jpg",
        description:
            "Old wounds reopen while impossible choices threaten to destroy everything the characters have fought to build.",
        available: false,
    },

    {
        id: "book-4",
        slug: "house-of-chaliss-book-4",
        title: "House of Chaliss",
        subtitle: "Book Four",
        author: "Kevo",
        genre: [
            "Mystery",
            "Drama",
            "Psychological",
        ],
        ageRating: "18+",
        price: 650,
        cover: "https://myvyefgzntuwaznshvyl.supabase.co/storage/v1/object/public/book-covers/book-4.jpg",
        description:
            "Truth finally begins to emerge, but every revelation comes at a painful cost. Resilience and hope.",
        available: false,
    },

    {
        id: "book-5",
        slug: "house-of-chaliss-book-5",
        title: "House of Chaliss",
        subtitle: "Book Five",
        author: "Kevo",
        genre: [
            "Romance",
            "Mystery",
            "Drama",
        ],
        ageRating: "18+",
        price: 650,
        cover: "https://myvyefgzntuwaznshvyl.supabase.co/storage/v1/object/public/book-covers/book-5.jpg",
        description:
            "The epic conclusion to the House of Chaliss saga, where every secret is revealed and every journey reaches its end.",
        available: false,
    },

    {
        id: "book-6",
        slug: "house-of-chaliss-book-5",
        title: "House of Chaliss",
        subtitle: "Book Six",
        author: "Kevo",
        genre: [
            "Romance",
            "Mystery",
            "Drama",
        ],
        ageRating: "18+",
        price: 650,
        cover: "https://myvyefgzntuwaznshvyl.supabase.co/storage/v1/object/public/book-covers/book-6.jpg",
        description:
            "The epic conclusion to the House of Chaliss saga, where every secret is revealed and every journey reaches its end.",
        available: false,
    },
];