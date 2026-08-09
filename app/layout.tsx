import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "House of Chaliss | The Experience of Being a Kevo",
    template: "%s | House of Chaliss",
  },

  description:
    "Discover House of Chaliss: The Experience of Being a Kevo, Book One of a six-book series exploring love, identity, betrayal, resilience and the choices that shape our lives.",

  keywords: [
    "House of Chaliss",
    "The Experience of Being a Kevo",
    "Kevo",
    "House of Chaliss Book One",
    "Kenyan author",
    "Kenyan fiction",
    "African fiction",
    "romance novel",
    "mystery novel",
    "thriller novel",
    "Kenyan books",
    "eBooks Kenya",
  ],

  authors: [
    {
      name: "Kevo",
    },
  ],

  creator: "Kevo",
  publisher: "House of Chaliss",

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "/",
    siteName: "House of Chaliss",

    title: "House of Chaliss | The Experience of Being a Kevo",

    description:
      "Discover House of Chaliss: The Experience of Being a Kevo, Book One of a six-book series exploring love, identity, betrayal, resilience and unforgettable choices.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "House of Chaliss — The Experience of Being a Kevo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "House of Chaliss | The Experience of Being a Kevo",

    description:
      "Discover House of Chaliss: The Experience of Being a Kevo, Book One of a six-book series.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F7F2EB]">

        {/* FIXED SITE NAVIGATION */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="pt-20">
          {children}
        </main>

      </body>
    </html>
  );
}