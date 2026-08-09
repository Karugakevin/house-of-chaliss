import supabaseAdmin from "@/lib/supabase-admin";
import { saveBrandingSettings } from "./actions";
import ColorPicker from "./ColorPicker";

export default async function BrandingSettings() {
    const { data: settings } = await supabaseAdmin
        .from("settings")
        .select("*");

    const getValue = (key: string) =>
        settings?.find((item) => item.key === key)?.value ?? "";

    return (
        <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold mb-8">
                Branding
            </h2>

            <form
                action={saveBrandingSettings}
                className="space-y-8"
            >

                <ColorPicker
                    label="Primary Color"
                    name="primary_color"
                    defaultValue={getValue("primary_color")}
                />

                <ColorPicker
                    label="Secondary Color"
                    name="secondary_color"
                    defaultValue={getValue("secondary_color")}
                />

                <div>

                    <label className="block font-medium mb-3">
                        Footer Text
                    </label>

                    <textarea
                        name="footer_text"
                        defaultValue={getValue("footer_text")}
                        rows={4}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold"
                >
                    Save Branding
                </button>

            </form>

        </div>
    );
}