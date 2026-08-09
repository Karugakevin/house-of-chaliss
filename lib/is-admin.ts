import { createClient } from "@/lib/supabase-server";

const ADMIN_EMAIL = "karugakevin@gmail.com";

export async function isAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  return user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}