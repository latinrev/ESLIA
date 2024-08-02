import { vocabularyPrompt, worksheetPrompt } from './../../../../prompts';
import { generateWithPrompt } from "@/utils/ai/generateWithPrompt";
import { parseLearningSyllabus } from "@/utils/plan/parsePlan";
import { createClient } from "@/utils/supabase/server";



export const generatePlan = async ({ reason }) => {
  const supabase = createClient()
  const userId = (await supabase.auth.getUser()).data.user?.id
  const { data: level, error } = await supabase.from('profiles').select('level').eq('id', userId).single()
  const weekAmount = 4

  const result = await generateWithPrompt(
    `Create an ${weekAmount}-week English vocabulary and worksheet plan for a Spanish-speaking ${level}. Use the following semicolon-delimited format:
    PLAN_NAME;WEEK;DAY;TITLE;DESCRIPTION;VOCAB;PHRASES;READING;WRITING;WORKSHEET
    Structure:
    1. Week-level: [Plan name];[Week number];0;[Week title];[Week description];;;;
    2. Day-level: [Plan name];[Week number];[Day number];[Day title];[Day description];[Vocab description];[Phrases description];[Reading description];[Writing description];[Worksheet description]
    Guidelines:
    1. Plan name: Based on the learner's reason for studying (${reason}), Generate an appealing name for the plan
    2. Week title: Include an emoji, in Spanish
    3. Week/day descriptions: Concise, in Spanish
    4. Include all ${weekAmount} weeks and 7 days per week
    5. Day title: Include an emoji, in Spanish
    6. All text in Spanish (except plan name)
    7. THE DAY TITLE HAS TO HAVE AN EMOJI
    8. THE TITLE DAY HAS TO BE RELATED TO WHATERVER THE DAY IS ABOUT
    Provide the complete ${weekAmount}-week plan using this format, focusing on a logical progression of ${level}. Do not include actual exercises or content - this is an outline for future content creation.
    The whole response should be strictly on spanish, and you ARE to return the complete ${weekAmount} week plan `,
  )
  const parsedPlan = parseLearningSyllabus(result)
  await require("fs/promises").writeFile("./ress.json", result);
  const { data, error: err } = await supabase.from('plans').insert({ user_id: userId, name: parsedPlan.plan_name }).select()

  parsedPlan.weeks.forEach(async (week) => {
    const { data: weekData, error: weekError } = await supabase.from('weeks').insert({ plan_id: data[0].id, number: week.number, title: week.title, description: week.description }).select()
    week.days.forEach(async (day) => {

      const vocabularyData = JSON.parse(await generateWithPrompt(vocabularyPrompt({ title: day.title, description: day.description, day: day.number })))
      const vocabulary = vocabularyData.vocabulary.map(({ word }) => word)

      const worksheetData = JSON.parse(await generateWithPrompt(worksheetPrompt({ title: day.title, description: day.description, day: day.number, vocabulary })))

      const days = await supabase.from('days').insert({
        plan_id: data[0].id,
        week_id: weekData[0].id,
        number: day.number,
        title: day.title,
        description: day.description,
        vocabulary: vocabularyData,
        worksheet: worksheetData
      }).select()

      console.log(days)
    })
  })
}

export async function GET() {

  await generatePlan({ reason: 'travel' })
  return Response.json('hey')
}