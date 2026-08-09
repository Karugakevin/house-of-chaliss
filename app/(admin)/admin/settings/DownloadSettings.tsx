import supabaseAdmin from "@/lib/supabase-admin";
import { saveDownloadSettings } from "./actions";

export default async function DownloadSettings() {

    const { data: settings } =
        await supabaseAdmin
            .from("settings")
            .select("*");

    const getValue = (key: string) =>
        settings?.find(
            item => item.key === key
        )?.value ?? "";

    return (

        <div
            id="downloads"
            className="bg-white rounded-2xl shadow p-8"
        >

            <h2 className="text-2xl font-bold mb-8">
                Downloads
            </h2>

            <form
                action={saveDownloadSettings}
                className="space-y-8"
            >

                <div>

                    <label className="block font-medium mb-2">
                        Download Limit
                    </label>

                    <input
                        type="number"
                        name="download_limit"
                        defaultValue={getValue("download_limit")}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div>

                    <label className="block font-medium mb-2">
                        Link Expiry (minutes)
                    </label>

                    <input
                        type="number"
                        name="link_expiry"
                        defaultValue={getValue("link_expiry")}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div>

                    <label className="block font-medium mb-2">
                        Watermark
                    </label>

                    <select
                        name="watermark"
                        defaultValue={getValue("watermark")}
                        className="w-full border rounded-lg px-4 py-3"
                    >

                        <option value="disabled">
                            Disabled (Future)
                        </option>

                        <option value="enabled">
                            Enabled (Future)
                        </option>

                    </select>

                </div>

                <div>

                    <label className="block font-medium mb-2">
                        File Protection
                    </label>

                    <select
                        name="file_protection"
                        defaultValue={getValue("file_protection")}
                        className="w-full border rounded-lg px-4 py-3"
                    >

                        <option value="enabled">
                            Enabled
                        </option>

                        <option value="disabled">
                            Disabled
                        </option>

                    </select>

                </div>

                <button
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold"
                >
                    Save Download Settings
                </button>

            </form>

        </div>

    );
}