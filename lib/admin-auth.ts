import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",")
      .map((email) => email.trim().toLowerCase()) ?? [];

  const isAdmin = adminEmails.includes(
    user.email?.toLowerCase() ?? ""
  );

  if (!isAdmin) {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  return {
    user,
    error: null,
  };
}