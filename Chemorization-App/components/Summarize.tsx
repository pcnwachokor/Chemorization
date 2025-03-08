import axios from "axios";

const API_KEY = "";

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