import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import cors from "cors";
import { Request, Response } from "express"; // ✅ Safe to use with Firebase Functions

admin.initializeApp();
const corsHandler = cors({ origin: true });

export const extractText = functions.https.onRequest(
  async (req: Request, res: Response) => {
    return corsHandler(req, res, async () => {
      // ✅ Return the function to fix TS7030
      try {
        if (!req.body.file || !req.body.type) {
          return res.status(400).json({ error: "Missing file data or type" }); // ✅ Return early
        }

        const fileBuffer = Buffer.from(req.body.file, "base64");
        let extractedText = "";

        if (req.body.type === "pdf") {
          const pdfData = await pdfParse(fileBuffer);
          extractedText = pdfData.text;
        } else if (req.body.type === "docx") {
          const extracted = await mammoth.extractRawText({
            buffer: fileBuffer,
          });
          extractedText = extracted.value;
        } else {
          return res.status(400).json({ error: "Unsupported file type" }); // ✅ Return early
        }

        return res.json({ text: extractedText }); // ✅ Ensure return at the end
      } catch (error) {
        console.error("Error processing file:", error);
        return res.status(500).json({ error: "Failed to process file" }); // ✅ Return error response
      }
    });
  }
);
