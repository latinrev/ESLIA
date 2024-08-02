import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPlan } from "@/actions/calls";
import { createClient } from "@/utils/supabase/server";
import Vocabulary from "./vocabulary";

export default async function VocabularyPage({ params }) {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["plan"],
    queryFn: async () => await getPlan(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Vocabulary weekId={params.id} dayId={params.dayid} />
    </HydrationBoundary>
  );
}
