interface PriceTagProps {
  price: number;
}

export default function PriceTag({ price }: PriceTagProps) {
  return (
    <span className="text-3xl font-bold text-amber-700">
      KES {price.toLocaleString()}
    </span>
  );
}