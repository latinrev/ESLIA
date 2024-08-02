"use server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const generateWithPrompt = async (prompt) => {
  const { text } = await generateText({
    headers: {},
    model: openai("gpt-4o-mini"),
    prompt,
    temperature: 1,
    maxTokens: 4095,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });

  return text;
};
