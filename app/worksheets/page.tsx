import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Plan from "./plan";
import { getWorksheets } from "@/actions/calls";
import { createClient } from "@/utils/supabase/server";

export default async function PlanPage() {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["worksheets"],
    queryFn: async () => await getWorksheets(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Plan />
    </HydrationBoundary>
  );
}
