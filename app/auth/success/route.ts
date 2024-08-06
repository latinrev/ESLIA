import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Create a Supabase client
  const supabase = createClient();

  // Get the auth code from the URL
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // Exchange the auth code for a session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to the worksheets page
  return NextResponse.redirect(new URL("/worksheets", request.url));
}
