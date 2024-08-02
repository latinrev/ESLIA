import { parseLearningSyllabus } from "@/utils/plan/parsePlan";

export const getPlan = async (supabase) => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const { data, error } = await supabase
    .from("plans")
    .select(`
      id,
      name,
      generating,
      weeks(
        id,
        number,
        title,
        description
      )
    `)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching plans:", error);
    return { data: null, error };
  }

  // Sort the weeks by the number field
  if (data && data.weeks) {
    data.weeks.sort((a, b) => a.number - b.number);

  }

  return { data, error };
};

export const getWeek = async ({ supabase, weekId }) => {

  const userId = (await supabase.auth.getUser()).data.user?.id;
  const { data, error } = await supabase
    .from("days")
    .select(`*`).eq("week_id", weekId).order('number', { descending: true })

  if (error) {
    console.error("Error fetching plans:", error);
    return { data: null, error };
  }
  return { data, error }
}

export const getDay = async ({ supabase, weekId, dayId }) => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const { data, error, ...props } = await supabase
    .from("days")
    .select(`*`).eq("week_id", weekId).eq("id", dayId).order('number', { descending: true }).single()

  if (error) {
    console.error("Error fetching plans:", error);
    return { data: null, error };
  }
  return { data, error, ...props }
}




