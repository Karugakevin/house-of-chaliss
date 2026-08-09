import supabaseAdmin from "@/lib/supabase-admin";
import { saveEmailTemplates } from "./actions";

export default async function EmailTemplateSettings() {
    const { data: settings } =
        await supabaseAdmin
            .from("settings")
            .select("*");

    const getValue = (key: string) =>
        settings?.find(
            item => item.key === key
        )?.value ?? "";

    const templates = [
        {
            key: "email_purchase_receipt",
            label: "Purchase Receipt",
        },
        {
            key: "email_order_confirmation",
            label: "Order Confirmation",
        },
        {
            key: "email_download",
            label: "Download Email",
        },
        {
            key: "email_reminder",
            label: "Download Reminder",
        },
        {
            key: "email_admin_notification",
            label: "Admin Notification",
        },
    ];

    return (
        <div
            id="email"
            className="bg-white rounded-2xl shadow p-8"
        >
            <h2 className="text-2xl font-bold mb-8">
                Email Templates
            </h2>

            <form
                action={saveEmailTemplates}
                className="space-y-8"
            >
                {templates.map((template) => (
                    <div key={template.key}>

                        <label className="block font-medium mb-2">
                            {template.label}
                        </label>

                        <textarea
                            name={template.key}
                            rows={5}
                            defaultValue={getValue(
                                template.key
                            )}
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>
                ))}

                <button
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold"
                >
                    Save Email Templates
                </button>
            </form>
        </div>
    );
}