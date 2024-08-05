import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getWorksheet, getWorksheets } from "@/actions/calls";
import { createClient } from "@/utils/supabase/server";
import Worksheet from "./worksheet";

export default async function PlanPage({ params }) {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["worksheet", params.id],
    queryFn: async () => await getWorksheet({ supabase, id: params.id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Worksheet id={params.id} />
    </HydrationBoundary>
  );
}
