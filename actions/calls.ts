import { generateWithPrompt } from "@/utils/ai/generateWithPrompt";
import { parseLearningSyllabus } from "@/utils/plan/parsePlan";
import { createClient } from "@/utils/supabase/server";

export const getWorksheets = async (supabase) => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const { data, error } = await supabase
    .from("worksheets")
    .select(`title,description,id,emoji`)
    .eq("user_id", userId).order('created_at', { ascending: false })
  console.log("FETCHING WORKSHEETS")

  if (error) {
    console.error("Error fetching plans:", error);
    return { data: null, error };
  }
  return { data, error };
};

export const getWorksheet = async ({ supabase, id }) => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const { data, error } = await supabase
    .from("worksheets")
    .select(`*`)
    .eq('id', id)
    .eq("user_id", userId).order('created_at', { ascending: false }).single()
  console.log("FETCHING WORKSHEETS")

  if (error) {
    console.error("Error fetching plans:", error);
    return { data: null, error };
  }
  return { data, error };
};

