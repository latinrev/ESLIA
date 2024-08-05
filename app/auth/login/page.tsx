"use client";
import { createClient } from "@/utils/supabase/client";
import { login, signup } from "./actions";

export default function LoginPage() {
  const supabase = createClient();

  supabase.auth.setSession({})
  return (
    <div>
      <button
        onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "google",
            options:{
              redirectTo:'https://glorious-zebra-qp4655767xjhx5vv-3000.app.github.dev/worksheet',
              skipBrowserRedirect:true
            }
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
