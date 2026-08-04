interface GenreBadgeProps {
  genre: string;
}

export default function GenreBadge({ genre }: GenreBadgeProps) {
  return (
    <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
      {genre}
    </span>
  );
}