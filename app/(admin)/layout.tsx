import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Not logged in → send to admin login
    if (!user) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-[#F7F2EB]">

            {/* Admin Header */}

            <header className="bg-[#1F2D3D] text-white shadow">
                <div className="max-w-7xl mx-auto px-6 py-4">

                    <div className="flex items-center justify-between">

                        <Link
                            href="/admin"
                            className="text-xl font-bold"
                        >
                            House of Chaliss
                            <span className="text-amber-400 ml-2">
                                Admin
                            </span>
                        </Link>

                        <Link
                            href="/"
                            className="text-sm text-gray-300 hover:text-white transition"
                        >
                            View Website →
                        </Link>

                    </div>

                </div>
            </header>

            {/* Admin Navigation */}

            <nav className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex gap-6 overflow-x-auto">

                        <Link
                            href="/admin"
                            className="py-4 text-sm font-medium text-gray-700 hover:text-amber-700"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/books"
                            className="py-4 text-sm font-medium text-gray-700 hover:text-amber-700"
                        >
                            Books
                        </Link>

                        <Link
                            href="/admin/orders"
                            className="py-4 text-sm font-medium text-gray-700 hover:text-amber-700"
                        >
                            Orders
                        </Link>

                        <Link
                            href="/admin/customers"
                            className="py-4 text-sm font-medium text-gray-700 hover:text-amber-700"
                        >
                            Customers
                        </Link>

                        <Link
                            href="/admin/downloads"
                            className="py-4 text-sm font-medium text-gray-700 hover:text-amber-700"
                        >
                            Downloads
                        </Link>

                    </div>

                </div>
            </nav>

            {/* Admin Content */}

            <main className="max-w-7xl mx-auto px-6 py-10">
                {children}
            </main>

        </div>
    );
}