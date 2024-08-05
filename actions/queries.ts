'use client'
import { useQuery } from "@tanstack/react-query"
import { getWorksheet, getWorksheets } from "./calls"
import { createClient } from "@/utils/supabase/client"



export const useGetWorksheets = () => {
  const supabase = createClient()
  return useQuery({
    queryKey: ["worksheets"],
    queryFn: async () => await getWorksheets(supabase),
  })
}
export const useGetWorksheet = (id: string) => {
  const supabase = createClient()
  return useQuery({
    queryKey: ["worksheet", id],
    queryFn: async () => await getWorksheet({ supabase, id }),
  })
}
