import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPlan } from "@/actions/calls";
import { createClient } from "@/utils/supabase/server";
import Writing from "./writing";

export default async function WritingPage({ params }) {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["plan"],
    queryFn: async () => await getPlan(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Writing weekId={params.id} dayId={params.dayid} />
    </HydrationBoundary>
  );
}
