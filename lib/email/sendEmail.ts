import { resend } from "@/lib/resend";

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({
    to,
    subject,
    html,
}: SendEmailOptions) {
    const { data, error } = await resend.emails.send({
        from: "House of Chaliss <onboarding@resend.dev>",
        to,
        subject,
        html,
    });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}