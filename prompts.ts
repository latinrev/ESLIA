export const vocabularyPrompt = ({ day, title, description, order }) => `Generate content for an English lesson with the following details:
Day: ${day}
Title: ${title}
Description: ${description}
Order: ${order}

Provide 7-10 key words for the vocabulary section. Respond in this JSON format:
{
  "vocabulary": [
    {
      "word": "",
      "transcription": "",
      "translation": "",
      "example": ""
    }
  ]
}
Do not wrap the json codes in JSON markers  
`;

export const phrasesPrompt = ({
  day,
  title,
  description,
  vocabulary,
  order,
}) => `Generate content for an English lesson with the following details:
Day: ${day}
Title: ${title}
Description: ${description}
The vocabulary for this lesson includes: [${vocabulary.join(", ")}]
Order: ${order}

Provide 5-7 useful phrases, incorporating some of the vocabulary words. Respond in this JSON format:
{
  "phrases": [
    {
      "phrase": "",
      "transcription": "",
      "translation": ""
    }
  ]
}
Do not wrap the json codes in JSON markers  
  
`;

export const grammarPrompt = ({
  day,
  title,
  description,
  vocabulary,
  phrases,
  order,
}) => `Generate content for an English lesson with the following details:
Day: ${day}
Title: ${title}
Description: ${description}
The vocabulary for this lesson includes: [${vocabulary.join(", ")}]
The phrases include: [${phrases.join(", ")}]
Order: ${order}

Provide a grammar point related to the lesson theme, with examples and practice questions. Use the vocabulary and phrases where appropriate. Respond in this JSON format:
{
  "grammar": {
    "topic": "",
    "explanation": "",
    "examples": [
      {
        "spanish": "",
        "english": ""
      }
    ],
    "practice": [
      {
        "question": "",
        "answer": ""
      }
    ]
  }
}
Do not wrap the json codes in JSON markers  
  
`;

export const readingPrompt = ({
  day,
  title,
  description,
  vocabulary,
  phrases,
  grammar,
  order,
}) => `Generate content for an English lesson with the following details:
Day: ${day}
Title: ${title}
Description: ${description}
The vocabulary for this lesson includes: [${vocabulary.join(", ")}]
The phrases include: [${phrases.join(", ")}]
The Grammar include: [${grammar.join(", ")}]
Order: ${order}

Provide 4 short dialogues related to the lesson theme, incorporating the vocabulary and phrases. Include vocabulary and questions for each. Respond in this JSON format:
{
  "reading": [
    {
      "text": "",
      "vocabulary": [
        {
          "word": "",
          "translation": ""
        }
      ],
      "questions": [
        {
          "question": "",
          "answer": ""
        }
      ]
    }
  ]
}
Do not wrap the json codes in JSON markers  
  
`;

export const writingPrompt = ({
  day,
  title,
  description,
  vocabulary,
  phrases,
  grammar,
  reading,
  order,
}) => `Generate content for an English lesson with the following details:
Day: ${day}
Title: ${title}
Description: ${description}
The vocabulary for this lesson includes: [${vocabulary.join(", ")}]
The phrases include: [${phrases.join(", ")}]
The Grammar include: [${grammar.join(", ")}]
The reading include: [${reading.join(", ")}]
Order: ${order}

Provide 3 writing exercises related to the lesson theme, incorporating elements from the previous sections. Respond in this JSON format:
{
  "writing": [
    {
      "type": "",
      "instruction": "",
      "content": "",
      "feedback": ""
    }
  ]
}
Do not wrap the json codes in JSON markers  
  
`;


//The phrases include: [${ phrases.join(", ") }]
// The Grammar include: [${grammar.join(", ")}]
// The reading include: [${reading.join(", ")}]
// The writing include: [${writing.join(", ")}]
export const worksheetPrompt = ({
  day,
  title,
  description,
  vocabulary,
  phrases,
  grammar,
  reading,
  writing,
  order,
}) => `Generate content for an English lesson with the following details:
Day: ${day}
Title: ${title}
Description: ${description}
The vocabulary for this lesson includes: [${vocabulary.join(", ")}]
// 
Order: ${order}

Provide 5-7 exercises related to the lesson theme, choosing from the following types: multipleChoice, fillInTheBlank, and translation. Respond in this JSON format:
{
  "worksheet": [
    {
      "type": "multipleChoice",
      "data": {
        "question": "",
        "options": ["", "", "", ""],
        "correctAnswer": ""
      }
    },
    {
      "type": "fillInTheBlank",
      "data": {
        "sentence": "",
        "answer": ""
      }
    },
    {
      "type": "translation",
      "data": {
        "spanish": "",
        "english": ""
      }
    }
  ]
}

Ensure that the exercises are varied and relevant to the lesson content. Include at least one of each exercise type, and repeat types as needed to reach 5-7 total exercises.
Do not wrap the json codes in JSON markers  

`;
