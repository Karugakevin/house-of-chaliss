interface DashboardCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    color?:
    | "amber"
    | "green"
    | "blue"
    | "purple"
    | "orange"
    | "emerald"
    | "pink"
    | "indigo";
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

        orange: {
            bg: "bg-orange-50",
            border: "border-orange-200",
            text: "text-orange-700",
        },

        emerald: {
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            text: "text-emerald-700",
        },

        pink: {
            bg: "bg-pink-50",
            border: "border-pink-200",
            text: "text-pink-700",
        },

        indigo: {
            bg: "bg-indigo-50",
            border: "border-indigo-200",
            text: "text-indigo-700",
        },
    };

    const theme = colors[color];

    return (
        <div
            className={`
        ${theme.bg}
        ${theme.border}
        border
        rounded-2xl
        p-6
        shadow-sm
        hover:shadow-md
        transition
      `}
        >
            <p className="text-sm font-medium text-gray-500">
                {title}
            </p>

            <h2
                className={`text-3xl font-bold mt-3 ${theme.text}`}
            >
                {value}
            </h2>

            {subtitle && (
                <p className="mt-2 text-sm text-gray-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
}