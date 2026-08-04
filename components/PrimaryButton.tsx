import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function PrimaryButton({
  href,
  children,
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl"
    >
      {children}
    </Link>
  );
}