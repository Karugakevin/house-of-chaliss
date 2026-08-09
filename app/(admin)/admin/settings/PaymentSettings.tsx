import supabaseAdmin from "@/lib/supabase-admin";
import { savePaymentSettings } from "./actions";

export default async function PaymentSettings() {
    const { data: settings } = await supabaseAdmin
        .from("settings")
        .select("*");

    const getValue = (key: string) =>
        settings?.find((item) => item.key === key)?.value ?? "";

    return (
        <div
            id="payment"
            className="bg-white rounded-2xl shadow p-8"
        >
            <h2 className="text-2xl font-bold mb-8">
                Payment Settings
            </h2>

            <form
                action={savePaymentSettings}
                className="space-y-6"
            >
                <div>
                    <label className="block font-medium mb-2">
                        Active Gateway
                    </label>

                    <select
                        name="payment_gateway"
                        defaultValue={getValue("payment_gateway")}
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="pesapal">Pesapal</option>
                        <option value="stripe">Stripe</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Payment Currency
                    </label>

                    <select
                        name="payment_currency"
                        defaultValue={getValue("payment_currency")}
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option>KES</option>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Payment Instructions
                    </label>

                    <textarea
                        name="payment_instructions"
                        rows={4}
                        defaultValue={getValue("payment_instructions")}
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Refund Policy
                    </label>

                    <textarea
                        name="refund_policy"
                        rows={6}
                        defaultValue={getValue("refund_policy")}
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>

                <button
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold"
                >
                    Save Payment Settings
                </button>
            </form>
        </div>
    );
}