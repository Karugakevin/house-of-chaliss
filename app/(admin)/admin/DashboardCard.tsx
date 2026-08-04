interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "amber" | "green" | "blue" | "purple";
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  color = "amber",
}: DashboardCardProps) {
  const colors = {
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
    },
  };

  const theme = colors[color];

  return (
    <div
      className={`${theme.bg} ${theme.border} border rounded-2xl p-6 shadow-sm`}
    >
      <p className="text-sm text-gray-500 font-medium">
        {title}
      </p>

      <h2 className={`text-3xl font-bold mt-3 ${theme.text}`}>
        {value}
      </h2>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}