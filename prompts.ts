

export const titlePrompt = ({ topic, level }: { topic: string, level: string }) => `Generate a title for an English(for a native Spanish speaker) with the following details, the instructions should be in Spanish:
Topic: ${topic}
Level: ${level}
{
  "title": "",The title should specify this is for ESL and should specify this is relevant for learning english
  "description": "" // The description should specify this is for ESL and should specify this is a worksheet or "Hoja de ejercicios"
  "emoji: "" // A single emoji character
}
Do not wrap the json codes in JSON markers  
`;


export const vocabularyPrompt = ({ topic, level }: { topic: string, level: string }) => `Generate content for an English(for a native Spanish speaker) lesson with the following details the instructions should be in Spanish:
Topic: ${topic}
Level: ${level}
Provide based 7-10(beginner) or 10-12(intermediate) or 13-15(advanced) key word for the vocabulary section  based on the level:${level} adjust the difficulty for this section. Respond in this JSON format:
{
  "vocabulary": [
    {
      "word": "",
      "transcription": "",
      "translation": "",
      "example": ""
      "exampleTranslation": ""
    }
  ]
}
Do not wrap the json codes in JSON markers  
`;

//
//I really hoped to have enough time for this, but I'm running out of time. I'm sorry.
// {
//   "type": "matching",
//     "data": {
//     "pairs": [
//       { "item": "", "match": "" }, // Item should be in spanish, match should be in english
//       { "item": "", "match": "" },
//       { "item": "", "match": "" },
//       { "item": "", "match": "" }
//     ]
//   }
// },
export const worksheetPrompt = ({
  topic,
  vocabulary,
  level
}: { topic: string, vocabulary: string[], level: string }) => `Generate content for an English lesson with the following details the instructions:
Topic: ${topic}
The vocabulary for this lesson includes: [${vocabulary.join(", ")}]
Level: ${level}
THIS IS FOR AN ESL LESSON WORKSHEET, the worksheet must have exercises related to the vocabulary words, this for a native Spanish speaker learning English, should only have exercises related to the vocabulary words, keep the responses for beginner single worded.
based on the level please do adjust the difficulty accordingly it should reflect the ${level}


Provide 7 exercises for beginner 9 exercises for intermediate and 11 exercises for advanced. related to the lesson theme, choosing from the following types: multipleChoice and fillInTheBlankWithOptions Respond in this JSON format:
{
  "worksheet": [
 
    {
      "type": "fillInTheBlankWithOptions"
      "data": { // There should only be a valid question and a valid answer not multiple per questions
        "sentence": "", // Should be in English // the fill in the blank space should be indicated by {BLANK} only in this property all others should be complete sentences // ONLY A SINGLE BLANK PER QUESTION
        "sentenceTranslation": "", SHOULD BE IN SPANISH, FULL SENTENCE, this has to be a full sentence with no {BLANKS}, NO {BLANKS} NO {BLANKS} NO {BLANKS} DO NOT PUT ANY {BLANKS} IN THIS PROPERTY
        "options": [], // Should in English
        "correctAnswer": "" // should be in english
        "correctAnswerTranslation": "" // should be in spanish,
        example:{
        {
        type: "fillInTheBlankWithOptions",
        data:{
          "sentence": "He is {BLANK} years old",
          "sentenceTranslation": "El tiene cuarenta años", // THIS PROPERTY HAS TO BE COMPLETE, PLEASE PLEASE PLEASE DO NOT INCLUDE ANY BLANKS
          "options": ["twenty", "thirty", "forty", "fifty"],
          "correctAnswer": "forty",
          "correctAnswerTranslation": "cuarenta"
            }
          }
        }
      },
    },
    {
      "type": "multipleChoice",
      "data": {
        "question": "", // Should be in english
        "questionTranslation": "", // Should be in spanish
        "options": ["", "", "", ""], // Should be the english 
        "correctAnswer": "" // Should be the english 
        "correctAnswerTranslation": "" // Should be the spanish
      }
    }
  ]
}

Ensure that the exercises are varied and relevant to the lesson content. Include at least one of each exercise type, and repeat types as needed to reach 7 exercises for beginner 9 exercises for intermediate and 11 exercises for advanced.
Do not wrap the json codes in JSON markers  
`;
