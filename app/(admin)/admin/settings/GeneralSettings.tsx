import supabaseAdmin from "@/lib/supabase-admin";

import {
    saveGeneralSettings,
    uploadLogo,
    uploadFavicon,
} from "./actions";

export default async function GeneralSettings() {
    const { data: settings } = await supabaseAdmin
        .from("settings")
        .select("*");

    const getValue = (key: string) =>
        settings?.find((item) => item.key === key)?.value ?? "";

    const logo = getValue("logo");
    const favicon = getValue("favicon");

    const storageUrl =
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/branding`;

    return (
        <div className="bg-white rounded-2xl shadow p-8 space-y-10">

            <h2 className="text-2xl font-bold">
                General Settings
            </h2>

            {/* -------------------------------- */}
            {/* GENERAL INFORMATION */}
            {/* -------------------------------- */}

            <form
                action={saveGeneralSettings}
                className="space-y-6"
            >

                <div>

                    <label className="block font-medium mb-2">
                        Store Name
                    </label>

                    <input
                        type="text"
                        name="store_name"
                        defaultValue={getValue("store_name")}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div>

                    <label className="block font-medium mb-2">
                        Contact Email
                    </label>

                    <input
                        type="email"
                        name="contact_email"
                        defaultValue={getValue("contact_email")}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div>

                    <label className="block font-medium mb-2">
                        Support Email
                    </label>

                    <input
                        type="email"
                        name="support_email"
                        defaultValue={getValue("support_email")}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold"
                >
                    Save General Settings
                </button>

            </form>

            <hr />

            {/* -------------------------------- */}
            {/* LOGO */}
            {/* -------------------------------- */}

            <div className="space-y-5">

                <h3 className="text-xl font-semibold">
                    Store Logo
                </h3>

                {logo && (
                    <img
                        src={`${storageUrl}/${logo}`}
                        alt="Store Logo"
                        className="h-24 rounded-lg border"
                    />
                )}

                <form
                    action={uploadLogo}
                    className="space-y-4"
                >

                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        required
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Upload Logo
                    </button>

                </form>

            </div>

            <hr />

            {/* -------------------------------- */}
            {/* FAVICON */}
            {/* -------------------------------- */}

            <div className="space-y-5">

                <h3 className="text-xl font-semibold">
                    Favicon
                </h3>

                {favicon && (
                    <img
                        src={`${storageUrl}/${favicon}`}
                        alt="Favicon"
                        className="h-12 w-12 rounded border"
                    />
                )}

                <form
                    action={uploadFavicon}
                    className="space-y-4"
                >

                    <input
                        type="file"
                        name="favicon"
                        accept=".ico,image/png,image/svg+xml,image/x-icon"
                        required
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
                    >
                        Upload Favicon
                    </button>

                </form>

            </div>

        </div>
    );
}