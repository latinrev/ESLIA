import { generateWithPrompt } from "@/utils/ai/generateWithPrompt";
import { parseLearningSyllabus } from "@/utils/plan/parsePlan";
import { createClient } from "@/utils/supabase/server";

export const getWorksheets = async (supabase) => {
  const { data, error } = await supabase
    .from("worksheets")
    .select(`title,description,id,emoji`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching plans:", error);
    return { data: null, error };
  }
  return { data, error };
};

export const getWorksheet = async ({ supabase, id }) => {
  const { data, error } = await supabase
    .from("worksheets")
    .select(`*`)
    .eq('id', id).order('created_at', { ascending: false }).single()

  if (error) {
    console.error("Error fetching plans:", error);
    return { data: null, error };
  }
  return { data, error };
};

