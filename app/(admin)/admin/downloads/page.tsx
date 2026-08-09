import supabaseAdmin from "@/lib/supabase-admin";

export default async function DownloadsPage() {
    const { data: downloads, error } = await supabaseAdmin
        .from("download_tokens")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        return (
            <div>
                <h1 className="text-4xl font-bold text-[#1F2D3D]">
                    Download Records
                </h1>

                <p className="mt-6 text-red-600">
                    Unable to load download records.
                </p>

                <pre className="mt-4 bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                    {JSON.stringify(error, null, 2)}
                </pre>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold text-[#1F2D3D]">
                    Download Records
                </h1>

                <p className="text-gray-500 mt-2">
                    Monitor eBook download activity and access tokens.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                <div className="px-6 py-5 border-b">
                    <h2 className="text-xl font-bold">
                        Download Activity
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {downloads?.length ?? 0} download tokens recorded.
                    </p>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="px-5 py-4 text-left">
                                    Token
                                </th>

                                <th className="px-5 py-4 text-center">
                                    Downloads
                                </th>

                                <th className="px-5 py-4 text-center">
                                    Expires
                                </th>

                                <th className="px-5 py-4 text-center">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Created
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {!downloads || downloads.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="py-12 text-center text-gray-500"
                                    >
                                        No download records found.
                                    </td>

                                </tr>

                            ) : (

                                downloads.map((download) => {

                                    const expired =
                                        new Date(download.expires_at) <
                                        new Date();

                                    const downloadsUsed =
                                        download.downloads ?? 0;

                                    const maxDownloads = Number(
                                        process.env.MAX_DOWNLOADS || 3
                                    );

                                    const limitReached =
                                        downloadsUsed >= maxDownloads;

                                    return (

                                        <tr
                                            key={download.id}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            <td className="px-5 py-5">

                                                <div className="font-mono text-xs break-all max-w-[280px]">
                                                    {download.token}
                                                </div>

                                            </td>

                                            <td className="px-5 py-5 text-center">

                                                <span className="font-semibold">
                                                    {downloadsUsed}
                                                </span>

                                                <span className="text-gray-400">
                                                    {" / "}
                                                    {maxDownloads}
                                                </span>

                                            </td>

                                            <td className="px-5 py-5 text-center">

                                                {new Date(
                                                    download.expires_at
                                                ).toLocaleString()}

                                            </td>

                                            <td className="px-5 py-5 text-center">

                                                {expired ? (

                                                    <span className="bg-red-100 text-red-700 rounded-full px-3 py-1 text-sm font-semibold">
                                                        Expired
                                                    </span>

                                                ) : limitReached ? (

                                                    <span className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-sm font-semibold">
                                                        Limit Reached
                                                    </span>

                                                ) : (

                                                    <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
                                                        Active
                                                    </span>

                                                )}

                                            </td>

                                            <td className="px-5 py-5 text-sm text-gray-600">

                                                {new Date(
                                                    download.created_at
                                                ).toLocaleString()}

                                            </td>

                                        </tr>

                                    );

                                })

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}