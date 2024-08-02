import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Plan from "./plan";
import { getPlan } from "@/actions/calls";
import { createClient } from "@/utils/supabase/server";

export default async function PlanPage() {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["plan"],
    queryFn: async () => await getPlan(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Plan />
    </HydrationBoundary>
  );
}
