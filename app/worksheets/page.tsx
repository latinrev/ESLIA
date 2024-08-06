import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getWorksheets } from "@/actions/calls";
import { createClient } from "@/utils/supabase/server";
import Worksheets from "./worksheets";

export default async function PlanPage() {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["worksheets"],
    queryFn: async () => await getWorksheets(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Worksheets />
    </HydrationBoundary>
  );
}
