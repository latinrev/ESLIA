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

//This is by far a project, defintely a project, I've crunched for about 40 straight at this point and writing this at 2:27am hours before the stream, probably? I'm not sure, its not perfect, its no pretty, I did this in probably 4 days, but hey, i did it, hopefully it doesnt break, next time I'll actually use the whole month like a normal person, thank you, goodnight, I'm going to bed.

//Gracias midu, es increible lo que haces por la comunidad, se te quiere mucho

// -- Joel Castillo 2024
