import Link from "next/link";
import GeneralSettings from "./GeneralSettings";
import BrandingSettings from "./BrandingSettings";
import CurrencySettings from "./CurrencySettings";
import DownloadSettings from "./DownloadSettings";
import EmailTemplateSettings from "./EmailTemplateSettings";
import PaymentSettings from "./PaymentSettings";

export default function SettingsPage() {
    const sections = [
        {
            name: "General",
            href: "#general",
        },
        {
            name: "Branding",
            href: "#branding",
        },
        {
            name: "Currency",
            href: "#currency",
        },
        {
            name: "Downloads",
            href: "#downloads",
        },
        {
            name: "Email Templates",
            href: "#email",
        },
        {
            name: "Payment",
            href: "#payment",
        },
    ];

    return (
        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold text-[#1F2D3D]">
                    Business Settings
                </h1>

                <p className="text-gray-500 mt-2">
                    Configure every aspect of your bookstore.
                </p>

            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* LEFT SIDEBAR */}

                <div className="col-span-3">

                    <div className="bg-white rounded-2xl shadow p-4">

                        <nav className="space-y-2">

                            {sections.map(section => (

                                <Link
                                    key={section.name}
                                    href={section.href}
                                    className="block rounded-lg px-4 py-3 hover:bg-gray-100 transition"
                                >
                                    {section.name}
                                </Link>

                            ))}

                        </nav>

                    </div>

                </div>

                {/* RIGHT CONTENT */}

                <div className="col-span-9">
                    <GeneralSettings />

                    <BrandingSettings />
                </div>

            </div>

            <div className="col-span-9 space-y-8">

                <div id="general">
                    <GeneralSettings />
                </div>

                <div id="branding">
                    <BrandingSettings />
                </div>

                <CurrencySettings />

                <DownloadSettings />

                <EmailTemplateSettings />

                <PaymentSettings />

            </div>

        </div>
    );
}

