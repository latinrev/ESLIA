'use client'
import { generateWorksheet } from "@/app/worksheets/actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"



export const useGenerateWorksheet = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['generateWorksheet'],
    mutationFn: generateWorksheet,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["worksheets"] })
  })
}