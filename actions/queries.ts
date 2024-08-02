'use client'
import { useQuery } from "@tanstack/react-query"
import { getPlan, getDay, getWeek } from "./calls"
import { createClient } from "@/utils/supabase/client"
import { parseLearningSyllabus } from "@/utils/plan/parsePlan"



export const useGetPlan = () => {
  const supabase = createClient()
  return useQuery({
    queryKey: ["plan"],
    queryFn: async () => await getPlan(supabase),
  })
}

export const useGetWeek = ({ weekId }) => {
  const supabase = createClient()
  return useQuery({
    queryKey: ["week"],
    queryFn: async () => await getWeek({ supabase, weekId }),
  })
}

export const useGetDay = ({ weekId, dayId }) => {
  const supabase = createClient()
  return useQuery({
    queryKey: ["day", weekId, dayId],
    queryFn: async () => await getDay({ supabase, weekId, dayId }),
  })
}


// //plan_id
// export const useDayVocabulary = ({ planId, weekId, dayId }) => {
//   const supabase = createClient()
//   return useQuery({
//     queryKey: ["vocabulary", weekId, dayId],
//     queryFn: async () => await getDayVocabulary({ supabase, planId, weekId, dayId }),
//   })
// }