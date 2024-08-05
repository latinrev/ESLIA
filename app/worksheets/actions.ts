'use server'

import { titlePrompt, vocabularyPrompt, worksheetPrompt } from "@/prompts"
import { generateWithPrompt } from "@/utils/ai/generateWithPrompt"
import { createClient } from "@/utils/supabase/server"
import { QueryClient } from "@tanstack/react-query"

// import { createClient } from "@/utils/supabase/server"

export const generateWorksheet = async (formData) => {
  const { topic, level } = Object.fromEntries(formData)
  const { title, description, emoji } = JSON.parse(await generateWithPrompt(titlePrompt({ topic, level })))
  const vocabularyData = JSON.parse(await generateWithPrompt(vocabularyPrompt({ topic: title, level })))
  const vocabulary = vocabularyData.vocabulary.map(({ word }: { word: string }) => word)
  const worksheetData = JSON.parse(await generateWithPrompt(worksheetPrompt({ level, topic: title, vocabulary })))
  const supabase = createClient()
  const userId = (await supabase.auth.getUser()).data.user?.id
  const { data, error } = await supabase.from('worksheets').insert({ title, description, vocabulary: vocabularyData, worksheet: worksheetData, user_id: userId, emoji })


}