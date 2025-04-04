import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY, // Use env variable
  dangerouslyAllowBrowser: true, // for Expo apps
});

export const getChemistryAnswer = async (question: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful chemistry tutor. Only answer chemistry-related questions.',
      },
      {
        role: 'user',
        content: question,
      },
    ],
  });

  return response.choices[0].message.content;
};
