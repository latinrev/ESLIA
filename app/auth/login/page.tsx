"use client";
import { createClient } from "@/utils/supabase/client";
import { login, signup } from "./actions";

export default function LoginPage() {
  const supabase = createClient();

  return (
    <div>
      <button
        onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "google",
          });
        }}>
        GOOGLE
      </button>
      <button
        onClick={() => {
          supabase.auth.signOut({});
        }}>
        LOGOUT
      </button>
    </div>
  );
}
