export default function PriceTag({
  price,
}: {
  price: number;
}) {
  return (
    <div>

      <p className="text-sm uppercase tracking-widest text-gray-500">
        Price
      </p>

      <p className="text-5xl font-extrabold text-amber-700">
        KES {price.toLocaleString()}
      </p>

    </div>
  );
}