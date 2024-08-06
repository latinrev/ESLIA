import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getWorksheets } from "@/actions/calls";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Home from "./home";

export default async function PlanPage() {
  const supabase = createClient();
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
