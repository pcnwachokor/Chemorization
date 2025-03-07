import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

export const generatePDF = async (outputText: string): Promise<void> => {
  const html = `
  <html>
      <body>
        <p>${outputText}</p>
      </body>
  </html>
  `;

  try {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
