'use client'
import { createClient } from "@/utils/supabase/client"
import { useMutation } from "@tanstack/react-query"



export const useCreateOnboarding = () => {
  return useMutation({
    mutationFn: async (level) => {
      const supabase = await createClient()
      const user = await supabase.auth.getUser()
      const why = await createClient().from('profiles').upsert({ id: user.data.user?.id, level })
      console.log(why)
    }
  })
}