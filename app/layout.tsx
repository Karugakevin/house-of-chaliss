import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "House of Chaliss",
  description: "Official website of House of Chaliss",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F2EB] text-[#1F2D3D]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}