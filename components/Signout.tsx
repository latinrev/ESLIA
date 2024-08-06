"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Signout({ children }) {
  const supabase = createClient();
  const router = useRouter();
  return (
  
  );
}
