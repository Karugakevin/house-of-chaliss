import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/is-admin";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({
  children,
}: LayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!user) {
    redirect("/admin/login");
  }
  
  if (!isAdminEmail(user.email)) {
    redirect("/");
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Purchases",
      href: "/admin/purchases",
    },
    {
      name: "Customers",
      href: "/admin/customers",
    },
    {
      name: "Books",
      href: "/admin/books",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
    },
    {
      name: "Settings",
      href: "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex">

        {/* Sidebar */}

        <aside className="w-72 min-h-screen bg-[#1F2D3D] text-white flex flex-col">

          <div className="p-8 border-b border-white/10">

            <h1 className="text-2xl font-bold">
              House of Chaliss
            </h1>

            <p className="text-sm text-gray-300 mt-2">
              Admin Dashboard
            </p>

          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">

            {navigation.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-4 py-3 hover:bg-white/10 transition"
              >
                {item.name}
              </Link>

            ))}

          </nav>

          <div className="border-t border-white/10 p-6">

            <p className="text-xs text-gray-400">
              Logged in as
            </p>

            <p className="mt-1 font-medium break-all">
              {user.email}
            </p>

            <form
              action="/auth/logout"
              method="post"
              className="mt-5"
            >
              <button
                type="submit"
                className="w-full rounded-lg bg-red-600 hover:bg-red-700 py-3 font-semibold transition"
              >
                Logout
              </button>
            </form>

          </div>

        </aside>

        {/* Main Content */}

        <main className="flex-1 p-10">

          {children}

        </main>

      </div>

    </div>
  );
}