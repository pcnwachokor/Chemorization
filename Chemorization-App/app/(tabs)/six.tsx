import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { summarizeText } from "@/components/Summarize"; // ✅ Ensure this exists
import { PDF_API_KEY, OCR_API_KEY } from "@env"; // ✅ Ensure these API keys exist in `.env`

const SummarizerScreen = () => {
  const [inputText, setInputText] = useState("");  // ✅ Added state for text input
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Summarize Manually Typed Text
  const handleTextSummarize = async () => {
    if (inputText.trim() === "") return;
    setLoading(true);
    const result = await summarizeText(inputText);
    setSummary(result);
    setLoading(false);
  };

  const extractTextFromPDF = async (base64Pdf: string): Promise<string> => {
    try {
        const response = await fetch("https://api.pdf.co/v1/pdf/convert/to/text", {
            method: "POST",
            headers: {
                "x-api-key": PDF_API_KEY, // ✅ Secure API Key
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ file: `data:application/pdf;base64,${base64Pdf}` }),
        });

        const data = await response.json();
        return data.body || "No text extracted";
    } catch (error) {
        console.error("PDF extraction error:", error);
        return "Error extracting text.";
    }
};
  
    

  
  // ✅ Pick and Process a PDF
  const handlePdfUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
      if (result.canceled) return;

      const fileUri = result.assets[0].uri;
      const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

      // Extract text using PDF API
      const extractedText = await extractTextFromPDF(fileContent);
      setLoading(true);
      const summarizedText = await summarizeText(extractedText);
      setSummary(summarizedText);
      setLoading(false);
    } catch (error) {
      console.error("Error processing PDF:", error);
      setLoading(false);
    }
  };

  // ✅ Pick and Process an Image (OCR)
  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (result.canceled) return;

      const imageBase64 = result.assets[0].base64;
      const extractedText = await extractTextFromImage(imageBase64);
      setLoading(true);
      const summarizedText = await summarizeText(extractedText);
      setSummary(summarizedText);
      setLoading(false);
    } catch (error) {
      console.error("Error processing image:", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Summarizer</Text>

      {/* ✅ Text Input for User to Enter Text */}
      <TextInput
        style={styles.input}
        placeholder="Type or paste text here..."
        multiline
        value={inputText}
        onChangeText={setInputText}
      />
      <TouchableOpacity style={styles.button} onPress={handleTextSummarize} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Summarizing..." : "Summarize Text"}</Text>
      </TouchableOpacity>

      {/* ✅ PDF Upload Button */}
      <TouchableOpacity style={styles.pdfButton} onPress={handlePdfUpload} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Processing PDF..." : "Upload PDF"}</Text>
      </TouchableOpacity>

      {/* ✅ Image Upload Button */}
      <TouchableOpacity style={styles.imageButton} onPress={handleImageUpload} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Processing Image..." : "Upload Image"}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="white" />}

      {/* ✅ Summary Output */}
      <ScrollView style={styles.resultContainer}>
        {summary ? <Text style={styles.result}>Summary: {summary}</Text> : <Text style={styles.placeholderText}>No summary yet.</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006400",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: "top", // ✅ Ensures input starts from top
  },
  button: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  pdfButton: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#d35400",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  imageButton: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "darkgreen",
    fontSize: 16,
  },
  resultContainer: {
    width: "100%",
    marginTop: 20,
  },
  result: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
  },
  placeholderText: {
    color: "gray",
    fontSize: 16,
    marginTop: 20,
  },
});

export default SummarizerScreen;