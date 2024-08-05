'use client'
import { generateWorksheet } from "@/app/worksheets/actions"
import { createClient } from "@/utils/supabase/client"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"



export const useCreateOnboarding = () => {
  return useMutation({
    mutationFn: async (level) => {
      const supabase = createClient()
      const user = await supabase.auth.getUser()
      const why = await createClient().from('profiles').upsert({ id: user.data.user?.id, level })
      console.log(why)
    }
  })
}

export const useGenerateWorksheet = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['generateWorksheet'],
    mutationFn: generateWorksheet,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["worksheets"] })
  })
}