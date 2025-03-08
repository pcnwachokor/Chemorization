import axios from "axios";

const API_KEY = "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"; // 🔹 Replace with your actual OpenAI API key

export const summarizeText = async (text: string): Promise<string> => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful summarization assistant." },
                    { role: "user", content: `Summarize this: ${text}` }
                ],
                max_tokens: 150
            },
            {
                headers: { 
                    "Authorization": `Bearer ${API_KEY}`, 
                    "Content-Type": "application/json" 
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Summarization error:", error);
        return "Error summarizing text.";
    }
};