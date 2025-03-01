import React, { useState } from "react";
import { View, Button, Text, ScrollView, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import braille from "@/components/braille";

const FileUploader = () => {
  const [fileContent, setFileContent] = useState("");
  const [outputText, setOutputText] = useState("");

  // Function to pick a file
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/plain", // supports text files
      });

      if (result.canceled || !result.assets) return;

      const fileUri = result.assets[0].uri;

      // Read file content
      const content = await FileSystem.readAsStringAsync(fileUri);
      setFileContent(content);
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  // Function to translate text to Braille
  const textToBraille = () => {
    if (!fileContent) return;
    setOutputText(braille.toBraille(fileContent));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Pick a File" onPress={pickDocument} />

      {fileContent ? (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Original Text:</Text>
          <Text style={styles.text}>{fileContent.substring(0, 200)}...</Text>
        </View>
      ) : null}

      <Button title="Convert to Braille" onPress={textToBraille} />

      {outputText ? (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Braille Translation:</Text>
          <Text style={styles.text}>{outputText}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "90%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default FileUploader;
