"use server";

import { revalidatePath } from "next/cache";
import supabaseAdmin from "@/lib/supabase-admin";

export async function saveGeneralSettings(
    formData: FormData
) {
    const settings = [
        {
            key: "store_name",
            value: formData.get("store_name") as string,
        },
        {
            key: "contact_email",
            value: formData.get("contact_email") as string,
        },
        {
            key: "support_email",
            value: formData.get("support_email") as string,
        },
    ];

    for (const setting of settings) {
        const { error } = await supabaseAdmin
            .from("settings")
            .update({
                value: setting.value,
            })
            .eq("key", setting.key);

        if (error) {
            throw new Error(error.message);
        }
    }

    revalidatePath("/admin/settings");
}

export async function uploadLogo(formData: FormData) {
    const logo = formData.get("logo") as File;

    if (!logo || logo.size === 0) {
        throw new Error("No logo selected.");
    }

    const extension = logo.name.split(".").pop();

    const filename = `logo-${Date.now()}.${extension}`;

    const { error: uploadError } =
        await supabaseAdmin.storage
            .from("branding")
            .upload(filename, logo, {
                upsert: true,
                contentType: logo.type,
            });

    if (uploadError) {
        throw new Error(uploadError.message);
    }

    const { error } = await supabaseAdmin
        .from("settings")
        .update({
            value: filename,
        })
        .eq("key", "logo");

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/settings");
}

export async function uploadFavicon(
    formData: FormData
) {
    const favicon = formData.get("favicon") as File;

    if (!favicon || favicon.size === 0) {
        throw new Error("No favicon selected.");
    }

    const extension = favicon.name.split(".").pop();

    const filename = `favicon-${Date.now()}.${extension}`;

    const { error: uploadError } =
        await supabaseAdmin.storage
            .from("branding")
            .upload(filename, favicon, {
                upsert: true,
                contentType: favicon.type,
            });

    if (uploadError) {
        throw new Error(uploadError.message);
    }

    const { error } = await supabaseAdmin
        .from("settings")
        .update({
            value: filename,
        })
        .eq("key", "favicon");

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/settings");
}

export async function saveBrandingSettings(
    formData: FormData
) {
    const settings = [
        {
            key: "primary_color",
            value: formData.get("primary_color") as string,
        },
        {
            key: "secondary_color",
            value: formData.get("secondary_color") as string,
        },
        {
            key: "footer_text",
            value: formData.get("footer_text") as string,
        },
    ];

    for (const setting of settings) {
        const { error } = await supabaseAdmin
            .from("settings")
            .update({
                value: setting.value,
            })
            .eq("key", setting.key);

        if (error) {
            throw new Error(error.message);
        }
    }

    revalidatePath("/admin/settings");
}

export async function saveCurrencySettings(
    formData: FormData
) {
    const currency =
        formData.get("currency") as string;

    const { error } = await supabaseAdmin
        .from("settings")
        .update({
            value: currency,
        })
        .eq("key", "currency");

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/settings");
}

export async function saveDownloadSettings(
    formData: FormData
) {
    const settings = [
        {
            key: "download_limit",
            value: formData.get("download_limit") as string,
        },
        {
            key: "link_expiry",
            value: formData.get("link_expiry") as string,
        },
        {
            key: "watermark",
            value: formData.get("watermark") as string,
        },
        {
            key: "file_protection",
            value: formData.get("file_protection") as string,
        },
    ];

    for (const setting of settings) {
        const { error } = await supabaseAdmin
            .from("settings")
            .update({
                value: setting.value,
            })
            .eq("key", setting.key);

        if (error) {
            throw new Error(error.message);
        }
    }

    revalidatePath("/admin/settings");
}

export async function saveEmailTemplates(
    formData: FormData
) {
    const settings = [
        {
            key: "email_purchase_receipt",
            value: formData.get(
                "email_purchase_receipt"
            ) as string,
        },
        {
            key: "email_order_confirmation",
            value: formData.get(
                "email_order_confirmation"
            ) as string,
        },
        {
            key: "email_download",
            value: formData.get(
                "email_download"
            ) as string,
        },
        {
            key: "email_reminder",
            value: formData.get(
                "email_reminder"
            ) as string,
        },
        {
            key: "email_admin_notification",
            value: formData.get(
                "email_admin_notification"
            ) as string,
        },
    ];

    for (const setting of settings) {
        const { error } = await supabaseAdmin
            .from("settings")
            .update({
                value: setting.value,
            })
            .eq("key", setting.key);

        if (error) {
            throw new Error(error.message);
        }
    }

    revalidatePath("/admin/settings");
}

export async function savePaymentSettings(
    formData: FormData
) {
    const settings = [
        {
            key: "payment_gateway",
            value: formData.get("payment_gateway") as string,
        },
        {
            key: "payment_currency",
            value: formData.get("payment_currency") as string,
        },
        {
            key: "payment_instructions",
            value: formData.get("payment_instructions") as string,
        },
        {
            key: "refund_policy",
            value: formData.get("refund_policy") as string,
        },
    ];

    for (const setting of settings) {
        const { error } = await supabaseAdmin
            .from("settings")
            .update({
                value: setting.value,
            })
            .eq("key", setting.key);

        if (error) {
            throw new Error(error.message);
        }
    }

    revalidatePath("/admin/settings");
}