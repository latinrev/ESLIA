import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDay, getPlan } from "@/actions/calls";
import { createClient } from "@/utils/supabase/server";
import Day from "./day";

export default async function DayPage({ params }) {
  const supabase = createClient();
  const queryClient = new QueryClient();

  console.log(params);
  await queryClient.prefetchQuery({
    queryKey: ["day", params.weekid, params.dayid],
    queryFn: async () => await getDay({ supabase, weekId: params.weekid, dayId: params.dayid }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Day dayId={params.dayid} weekId={params.weekid} />
    </HydrationBoundary>
  );
}
