interface SectionTitleProps {
  subtitle: string;
  title: string;
}

export default function SectionTitle({
  subtitle,
  title,
}: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      <p className="uppercase tracking-[5px] text-amber-700 font-semibold">
        {subtitle}
      </p>

      <h2 className="text-5xl font-bold mt-4 text-[#1F2D3D]">
        {title}
      </h2>
    </div>
  );
}