// filepath: c:\Users\mikee\Again\3444-Espoir\Chemorization-App\components\Summarize.tsx
import Constants from 'expo-constants';

const { OPENAI_API_KEY } = Constants.manifest?.extra || {};
console.log('OPENAI_API_KEY:', OPENAI_API_KEY); // Debugging to ensure the key is loaded

export async function summarizeText(text: string): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You summarize text concisely." },
          { role: "user", content: `Summarize this:\n\n${text}` },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error("API error:", response.status, await response.text());
      return "Error summarizing text.";
    }

    const data = await response.json();
    return data.choices[0]?.message?.content.trim() || "No summary available.";
  } catch (error) {
    console.error("Summarization error:", error);
    return "Error summarizing text.";
  }
}
