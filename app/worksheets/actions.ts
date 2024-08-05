'use server'

import { titlePrompt, vocabularyPrompt, worksheetPrompt } from "@/prompts"
import { generateWithPrompt } from "@/utils/ai/generateWithPrompt"
import { createClient } from "@/utils/supabase/server"
import { QueryClient } from "@tanstack/react-query"



interface TitleData {
  title: string;
  description: string;
  emoji: string;
}

interface VocabularyItem {
  word: string;
}

interface WorksheetData {
  // Define the structure of your worksheet data here
  // For example:
  exercises: Array<{
    type: string;
    question: string;
    options?: string[];
    answer: string;
  }>;
}

export const generateWorksheet = async (formData: FormData): Promise<void> => {
  const topic = formData.get('topic') as string;
  const level = formData.get('level') as string;

  if (!topic || !level) {
    throw new Error("Missing required form data");
  }
  const titleData: TitleData = JSON.parse(await generateWithPrompt(titlePrompt({ topic, level })));
  const { title, description, emoji } = titleData;

  const vocabularyData: { vocabulary: VocabularyItem[] } = JSON.parse(await generateWithPrompt(vocabularyPrompt({ topic: title, level })));
  const vocabulary = vocabularyData.vocabulary.map(({ word }: VocabularyItem) => word);

  const worksheetData: WorksheetData = JSON.parse(await generateWithPrompt(worksheetPrompt({ level, topic: title, vocabulary })));

  const supabase = createClient();


  const { data, error } = await supabase.from('worksheets').insert({
    title,
    description,
    vocabulary: vocabularyData,
    worksheet: worksheetData,
    emoji
  });

  if (error) {
    throw new Error(`Error inserting worksheet: ${error.message}`);
  }
}