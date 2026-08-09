import supabaseAdmin from "@/lib/supabase-admin";
import { saveCurrencySettings } from "./actions";

export default async function CurrencySettings() {
    const { data: settings } = await supabaseAdmin
        .from("settings")
        .select("*");

    const currency =
        settings?.find(
            (item) => item.key === "currency"
        )?.value ?? "KES";

    const currencies = [
        "KES",
        "USD",
        "EUR",
        "GBP",
    ];

    return (
        <div
            id="currency"
            className="bg-white rounded-2xl shadow p-8"
        >
            <h2 className="text-2xl font-bold mb-8">
                Currency
            </h2>

            <form
                action={saveCurrencySettings}
                className="space-y-6"
            >
                <select
                    name="currency"
                    defaultValue={currency}
                    className="w-full border rounded-lg px-4 py-3"
                >
                    {currencies.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold"
                >
                    Save Currency
                </button>
            </form>
        </div>
    );
}