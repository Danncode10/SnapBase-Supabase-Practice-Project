import { createClient as supabaseCreateClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase configuration missing.");
    redirect("/login?error=Server configuration error");
    return null;
  }

  return supabaseCreateClient(supabaseUrl, supabaseAnonKey);
}