"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractText = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
const cors_1 = __importDefault(require("cors"));
admin.initializeApp();
const corsHandler = (0, cors_1.default)({ origin: true });
exports.extractText = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        // ✅ Return the function to fix TS7030
        try {
            if (!req.body.file || !req.body.type) {
                return res.status(400).json({ error: "Missing file data or type" }); // ✅ Return early
            }
            const fileBuffer = Buffer.from(req.body.file, "base64");
            let extractedText = "";
            if (req.body.type === "pdf") {
                const pdfData = await (0, pdf_parse_1.default)(fileBuffer);
                extractedText = pdfData.text;
            }
            else if (req.body.type === "docx") {
                const extracted = await mammoth_1.default.extractRawText({
                    buffer: fileBuffer,
                });
                extractedText = extracted.value;
            }
            else {
                return res.status(400).json({ error: "Unsupported file type" }); // ✅ Return early
            }
            return res.json({ text: extractedText }); // ✅ Ensure return at the end
        }
        catch (error) {
            console.error("Error processing file:", error);
            return res.status(500).json({ error: "Failed to process file" }); // ✅ Return error response
        }
    });
});
//# sourceMappingURL=index.js.map