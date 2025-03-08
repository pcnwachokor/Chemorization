export async function summarizeText(text: string): Promise<string> {
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `Summarize this text: ${text}`,
          max_tokens: 100,
        }),
      });
  
      const data = await response.json();
      return data.choices[0]?.text.trim() || "No summary available.";
    } catch (error) {
      console.error("Summarization error:", error);
      return "Error summarizing text.";
    }
  }