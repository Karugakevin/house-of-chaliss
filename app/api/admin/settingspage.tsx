import supabaseAdmin from "@/lib/supabase-admin";

export default async function SettingsPage() {
    const { data: settings } = await supabaseAdmin
        .from("settings")
        .select("*")
        .order("key");

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold text-[#1F2D3D]">
                    Business Settings
                </h1>

                <p className="text-gray-500 mt-2">
                    Configure your bookstore.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">

                <table className="w-full">

                    <thead className="border-b">

                        <tr>

                            <th className="text-left py-3">
                                Setting
                            </th>

                            <th className="text-left py-3">
                                Value
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {(settings ?? []).map((setting) => (

                            <tr
                                key={setting.id}
                                className="border-b"
                            >

                                <td className="py-4 font-medium">
                                    {setting.key}
                                </td>

                                <td className="py-4 text-gray-600">
                                    {setting.value}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}