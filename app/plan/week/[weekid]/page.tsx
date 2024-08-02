import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getWeek } from "@/actions/calls";
import { createClient } from "@/utils/supabase/server";
import Week from "./week";

export default async function WeekPage({ params }) {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["week"],
    queryFn: async () => await getWeek({ supabase, weekId: params.weekid }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Week id={params.weekid} />
    </HydrationBoundary>
  );
}
